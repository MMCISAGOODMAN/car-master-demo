const express = require('express');
const { isCarRelated, mockReply, REJECT_REPLY, SUGGESTIONS } = require('../ai-mock');

const router = express.Router();

router.get('/suggestions', (req, res) => {
  res.json({ data: SUGGESTIONS });
});

router.post('/chat', (req, res) => {
  const question = (req.body.question || '').trim();

  if (!question) {
    return res.status(400).json({ error: 'Bad Request', message: '请输入问题' });
  }

  if (question.length > 500) {
    return res.status(400).json({ error: 'Bad Request', message: '问题过长，请控制在 500 字以内' });
  }

  if (!isCarRelated(question)) {
    return res.json({
      data: {
        allowed: false,
        reply: REJECT_REPLY,
        mock: true
      }
    });
  }

  // 模拟 AI 思考延迟由前端处理；后端直接返回
  res.json({
    data: {
      allowed: true,
      reply: mockReply(question),
      mock: true
    }
  });
});

module.exports = router;
