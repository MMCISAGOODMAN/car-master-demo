const TOOL_PAGES = {
  scan: '/pages/tools/scan/scan',
  voice: '/pages/tools/voice/voice',
  maintain: '/pages/tools/maintain/maintain',
  vin: '/pages/tools/vin/vin',
  oil: '/pages/tools/oil/oil',
  tire: '/pages/tools/tire/tire',
  fuel: '/pages/tools/fuel/fuel',
  shop: '/pages/tools/shop/shop',
  rescue: '/pages/tools/rescue/rescue',
  favorite: '/pages/tools/favorite/favorite',
  diagnose: '/pages/tools/diagnose/diagnose',
  garage: '/pages/tools/garage/garage',
  history: '/pages/tools/history/history',
  ai: '/pages/tools/ai/ai',
  unifiedSearch: '/pages/search/unified/unified',
  beginner: '/pages/guide/beginner/beginner',
  classroom: '/pages/guide/classroom/classroom',
  inspection: '/pages/guide/inspection/inspection',
  lights: '/pages/guide/lights/lights'
};

const QUICK_ACTIONS = [
  { id: 'ai', icon: '🤖', name: '问小汽', bg: '#eef4ff', page: 'ai' },
  { id: 'unifiedSearch', icon: '🔍', name: '综合搜索', bg: '#fff0f3', page: 'unifiedSearch' },
  { id: 'diagnose', icon: '🩺', name: '症状诊断', bg: '#f0fdf4', page: 'diagnose' },
  { id: 'scan', icon: '📷', name: '扫码识件', bg: '#fff7ed', page: 'scan' }
];

const TOOLS = [
  { id: 'maintain', icon: '📅', name: '保养提醒', desc: '到期提醒', bg: '#eef4ff', page: 'maintain', badge: 'HOT' },
  { id: 'diagnose', icon: '🩺', name: '症状诊断', desc: '智能匹配', bg: '#fef2f2', page: 'diagnose', badge: 'NEW' },
  { id: 'ai', icon: '🤖', name: '问小汽', desc: 'AI 汽车问答', bg: '#eef4ff', page: 'ai', badge: 'AI' },
  { id: 'vin', icon: '🔢', name: 'VIN解码', desc: '查车辆配置', bg: '#f5f3ff', page: 'vin' },
  { id: 'garage', icon: '🚗', name: '我的爱车', desc: '车辆档案', bg: '#ecfeff', page: 'garage' },
  { id: 'oil', icon: '🛢', name: '油液对照', desc: '型号查询', bg: '#fff7ed', page: 'oil' },
  { id: 'tire', icon: '🛞', name: '胎压参考', desc: '标准值', bg: '#f0fdf4', page: 'tire' },
  { id: 'fuel', icon: '⛽', name: '油耗记录', desc: '行车账本', bg: '#fef2f2', page: 'fuel' },
  { id: 'history', icon: '🕐', name: '浏览历史', desc: '最近查看', bg: '#f5f3ff', page: 'history' },
  { id: 'shop', icon: '📍', name: '附近维修', desc: '地图查找', bg: '#ecfeff', page: 'shop' },
  { id: 'rescue', icon: '🆘', name: '道路救援', desc: '一键呼叫', bg: '#fff1f2', page: 'rescue' },
  { id: 'favorite', icon: '⭐', name: '我的收藏', desc: '零件/故障', bg: '#fefce8', page: 'favorite' }
];

const SERVICES = [
  { id: 's1', icon: '📖', name: '新手养车指南', desc: '从保养到故障自查', tag: '入门', bg: '#eef4ff', page: 'beginner' },
  { id: 's2', icon: '🎓', name: '维修知识课堂', desc: '图文+案例学习', tag: '学习', bg: '#fff5f7', page: 'classroom' },
  { id: 's3', icon: '📋', name: '年检自查清单', desc: '上线前自检项目', tag: '实用', bg: '#f0fdf4', page: 'inspection' },
  { id: 's4', icon: '💡', name: '指示灯解读', desc: '警告灯含义', tag: '百科', bg: '#fff7ed', page: 'lights' }
];

module.exports = { TOOL_PAGES, QUICK_ACTIONS, TOOLS, SERVICES };
