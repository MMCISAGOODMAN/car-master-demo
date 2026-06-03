const express = require('express');
const { getDb } = require('../db');
const { formatFault } = require('./faults-utils');

const router = express.Router();

router.get('/', (req, res) => {
  const keyword = (req.query.keyword || '').trim();
  if (!keyword) {
    return res.json({ data: { parts: [], faults: [], keyword } });
  }

  const like = `%${keyword}%`;
  const db = getDb();
  try {
    const parts = db
      .prepare(
        `SELECT p.id, p.name, p.description, p.location, p.fault_symptoms AS faultSymptoms,
                p.image_url AS imageUrl, c.id AS categoryId, c.name AS categoryName
         FROM parts p
         JOIN part_categories c ON p.category_id = c.id
         WHERE p.name LIKE ? OR p.description LIKE ? OR p.location LIKE ? OR p.fault_symptoms LIKE ?
         ORDER BY p.name ASC
         LIMIT 30`
      )
      .all(like, like, like, like);

    const faultsRaw = db
      .prepare(
        `SELECT f.id, f.title, f.symptoms, f.causes, f.related_parts AS relatedParts,
                f.solutions, f.danger_level AS dangerLevel,
                c.id AS categoryId, c.name AS categoryName
         FROM faults f
         JOIN fault_categories c ON f.category_id = c.id
         WHERE f.title LIKE ? OR f.symptoms LIKE ? OR f.causes LIKE ? OR f.related_parts LIKE ?
         ORDER BY f.title ASC
         LIMIT 20`
      )
      .all(like, like, like, like);

    res.json({
      data: {
        parts,
        faults: faultsRaw.map(formatFault),
        keyword
      }
    });
  } finally {
    db.close();
  }
});

module.exports = router;
