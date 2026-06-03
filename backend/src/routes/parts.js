const express = require('express');
const { getDb } = require('../db');

const router = express.Router();

router.get('/categories', (req, res) => {
  const db = getDb();
  try {
    const categories = db
      .prepare(
        `SELECT id, name, icon, sort_order AS sortOrder
         FROM part_categories
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
    const parts = db
      .prepare(
        `SELECT p.id, p.name, p.description, p.location, p.fault_symptoms AS faultSymptoms,
                p.image_url AS imageUrl, c.id AS categoryId, c.name AS categoryName
         FROM parts p
         JOIN part_categories c ON p.category_id = c.id
         WHERE p.name LIKE ? OR p.description LIKE ? OR p.location LIKE ?
         ORDER BY p.name ASC`
      )
      .all(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
    res.json({ data: parts, keyword });
  } finally {
    db.close();
  }
});

router.get('/', (req, res) => {
  const categoryId = req.query.categoryId;
  const db = getDb();
  try {
    let parts;
    if (categoryId) {
      parts = db
        .prepare(
          `SELECT p.id, p.name, p.description, p.location, p.fault_symptoms AS faultSymptoms,
                  p.image_url AS imageUrl, c.id AS categoryId, c.name AS categoryName
           FROM parts p
           JOIN part_categories c ON p.category_id = c.id
           WHERE p.category_id = ?
           ORDER BY p.name ASC`
        )
        .all(categoryId);
    } else {
      parts = db
        .prepare(
          `SELECT p.id, p.name, p.description, p.location, p.fault_symptoms AS faultSymptoms,
                  p.image_url AS imageUrl, c.id AS categoryId, c.name AS categoryName
           FROM parts p
           JOIN part_categories c ON p.category_id = c.id
           ORDER BY c.sort_order ASC, p.name ASC`
        )
        .all();
    }
    res.json({ data: parts });
  } finally {
    db.close();
  }
});

router.get('/:id/related-faults', (req, res) => {
  const db = getDb();
  try {
    const part = db.prepare('SELECT id, name FROM parts WHERE id = ?').get(req.params.id);
    if (!part) {
      return res.status(404).json({ error: 'Not Found', message: '零件不存在' });
    }

    const like = `%${part.name}%`;
    const faults = db
      .prepare(
        `SELECT f.id, f.title, f.symptoms, f.danger_level AS dangerLevel, c.name AS categoryName
         FROM faults f
         JOIN fault_categories c ON f.category_id = c.id
         WHERE f.related_parts LIKE ? OR f.symptoms LIKE ? OR f.causes LIKE ?
         ORDER BY f.title ASC
         LIMIT 10`
      )
      .all(like, like, like);

    res.json({ data: faults, partName: part.name });
  } finally {
    db.close();
  }
});

router.get('/:id', (req, res) => {
  const db = getDb();
  try {
    const part = db
      .prepare(
        `SELECT p.id, p.name, p.description, p.location, p.fault_symptoms AS faultSymptoms,
                p.image_url AS imageUrl, c.id AS categoryId, c.name AS categoryName
         FROM parts p
         JOIN part_categories c ON p.category_id = c.id
         WHERE p.id = ?`
      )
      .get(req.params.id);

    if (!part) {
      return res.status(404).json({ error: 'Not Found', message: '零件不存在' });
    }
    res.json({ data: part });
  } finally {
    db.close();
  }
});

module.exports = router;
