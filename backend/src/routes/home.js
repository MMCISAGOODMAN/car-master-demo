const express = require('express');
const { getDb } = require('../db');
const { hotKeywords } = require('../../database/guides-data');

const router = express.Router();

router.get('/recommendations', (req, res) => {
  const db = getDb();
  try {
    const parts = db
      .prepare(
        `SELECT p.id, p.name, p.description, p.image_url AS imageUrl,
                c.name AS categoryName
         FROM parts p
         JOIN part_categories c ON p.category_id = c.id
         ORDER BY RANDOM()
         LIMIT 4`
      )
      .all();

    const faults = db
      .prepare(
        `SELECT f.id, f.title, f.danger_level AS dangerLevel, c.name AS categoryName
         FROM faults f
         JOIN fault_categories c ON f.category_id = c.id
         ORDER BY RANDOM()
         LIMIT 3`
      )
      .all();

    res.json({ data: { parts, faults, hotKeywords } });
  } finally {
    db.close();
  }
});

module.exports = router;
