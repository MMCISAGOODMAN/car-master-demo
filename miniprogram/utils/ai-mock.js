/** 前端离线兜底（与 backend/src/ai-mock.js 保持一致） */
const CAR_KEYWORDS = [
  '车', '汽车', '养车', '保养', '维修', '机油', '刹车', '发动机', '轮胎',
  '故障', '异响', '抖动', '油耗', '电瓶', '变速箱', '冷却', '空调', '年检', 'VIN', '驾驶'
];

const REJECT_REPLY =
  '抱歉，小汽只能回答与汽车相关的问题（保养、故障、零件、驾驶、年检等）。请换个与汽车有关的问题试试～';

const DEFAULT_REPLY =
  '根据您的问题，建议先明确具体现象。可使用「症状诊断」或「综合搜索」匹配故障案例；涉及安全请尽快进厂检查。';

const MOCK_REPLIES = [
  { keys: ['机油', '保养'], reply: '矿物油约 5000km/6 个月，全合成约 10000km/12 个月，以保养手册为准。' },
  { keys: ['刹车', '制动'], reply: '制动异常请检查刹车片、刹车盘和制动液，踏板发软切勿继续行驶。' },
  { keys: ['抖动', '怠速'], reply: '常见原因：火花塞/点火线圈、进气漏气、机脚胶老化，建议读码排查缺缸。' },
  { keys: ['水温', '过热'], reply: '水温高应停车检查冷却液、节温器、水泵，勿继续行驶。' }
];

function isCarRelated(text) {
  const q = text.toLowerCase();
  return CAR_KEYWORDS.some((kw) => q.includes(kw.toLowerCase()));
}

function mockReply(question) {
  const q = question.toLowerCase();
  for (const item of MOCK_REPLIES) {
    if (item.keys.some((k) => q.includes(k))) return item.reply;
  }
  return DEFAULT_REPLY;
}

module.exports = { isCarRelated, mockReply, REJECT_REPLY };
