const express = require('express');
const { getDb } = require('../db');
const { formatFault } = require('./faults-utils');
const { symptomTags } = require('../../database/guides-data');

const router = express.Router();

router.get('/categories', (req, res) => {
  const db = getDb();
  try {
    const categories = db
      .prepare(
        `SELECT id, name, icon, sort_order AS sortOrder
         FROM fault_categories
         ORDER BY sort_order ASC`
      )
      .all();
    res.json({ data: categories });
  } finally {
    db.close();
  }
});

router.get('/search', (req, res) => {
  const keyword = (req.query.keyword || '').trim();
  if (!keyword) {
    return res.json({ data: [], keyword });
  }

  const db = getDb();
  try {
    const faults = db
      .prepare(
        `SELECT f.id, f.title, f.symptoms, f.causes, f.related_parts AS relatedParts,
                f.solutions, f.danger_level AS dangerLevel,
                c.id AS categoryId, c.name AS categoryName
         FROM faults f
         JOIN fault_categories c ON f.category_id = c.id
         WHERE f.title LIKE ? OR f.symptoms LIKE ? OR f.causes LIKE ?
         ORDER BY f.title ASC`
      )
      .all(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
    res.json({ data: faults.map(formatFault) });
  } finally {
    db.close();
  }
});

router.get('/match', (req, res) => {
  const tags = (req.query.tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  if (!tags.length) {
    return res.json({ data: [], tags });
  }

  const selected = symptomTags.filter((t) => tags.includes(t.id) || tags.includes(t.label));
  const keywords = [...new Set(selected.flatMap((t) => t.keywords))];
  if (!keywords.length) {
    return res.json({ data: [], tags });
  }

  const db = getDb();
  try {
    const conditions = keywords.map(() =>
      '(f.title LIKE ? OR f.symptoms LIKE ? OR f.causes LIKE ? OR f.related_parts LIKE ?)'
    ).join(' OR ');
    const params = keywords.flatMap((k) => {
      const like = `%${k}%`;
      return [like, like, like, like];
    });

    const faults = db
      .prepare(
        `SELECT f.id, f.title, f.symptoms, f.causes, f.related_parts AS relatedParts,
                f.solutions, f.danger_level AS dangerLevel,
                c.id AS categoryId, c.name AS categoryName
         FROM faults f
         JOIN fault_categories c ON f.category_id = c.id
         WHERE ${conditions}
         GROUP BY f.id
         ORDER BY f.title ASC`
      )
      .all(...params);

    res.json({ data: faults.map(formatFault), tags, keywords });
  } finally {
    db.close();
  }
});

router.get('/', (req, res) => {
  const categoryId = req.query.categoryId;
  const db = getDb();
  try {
    let faults;
    if (categoryId) {
      faults = db
        .prepare(
          `SELECT f.id, f.title, f.symptoms, f.causes, f.related_parts AS relatedParts,
                  f.solutions, f.danger_level AS dangerLevel,
                  c.id AS categoryId, c.name AS categoryName
           FROM faults f
           JOIN fault_categories c ON f.category_id = c.id
           WHERE f.category_id = ?
           ORDER BY f.title ASC`
        )
        .all(categoryId);
    } else {
      faults = db
        .prepare(
          `SELECT f.id, f.title, f.symptoms, f.causes, f.related_parts AS relatedParts,
                  f.solutions, f.danger_level AS dangerLevel,
                  c.id AS categoryId, c.name AS categoryName
           FROM faults f
           JOIN fault_categories c ON f.category_id = c.id
           ORDER BY c.sort_order ASC, f.title ASC`
        )
        .all();
    }
    res.json({ data: faults.map(formatFault) });
  } finally {
    db.close();
  }
});

router.get('/:id', (req, res) => {
  const db = getDb();
  try {
    const fault = db
      .prepare(
        `SELECT f.id, f.title, f.symptoms, f.causes, f.related_parts AS relatedParts,
                f.solutions, f.danger_level AS dangerLevel,
                c.id AS categoryId, c.name AS categoryName
         FROM faults f
         JOIN fault_categories c ON f.category_id = c.id
         WHERE f.id = ?`
      )
      .get(req.params.id);

    if (!fault) {
      return res.status(404).json({ error: 'Not Found', message: '故障不存在' });
    }
    res.json({ data: formatFault(fault) });
  } finally {
    db.close();
  }
});

module.exports = router;
