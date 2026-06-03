const express = require('express');
const { guides, symptomTags } = require('../../database/data-profile').guidesData;

const router = express.Router();

router.get('/', (req, res) => {
  const list = guides.map(({ slug, title, tag, type }) => ({ slug, title, tag, type }));
  res.json({ data: list });
});

router.get('/symptoms', (req, res) => {
  res.json({ data: symptomTags });
});

router.get('/:slug', (req, res) => {
  const guide = guides.find((g) => g.slug === req.params.slug);
  if (!guide) {
    return res.status(404).json({ error: 'Not Found', message: '指南不存在' });
  }
  res.json({ data: guide });
});

module.exports = router;
