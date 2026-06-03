const TOOL_PAGES = {
  maintain: '/pages/tools/maintain/maintain',
  favorite: '/pages/tools/favorite/favorite',
  unifiedSearch: '/pages/search/unified/unified',
  parts: '/pages/parts/categories/categories',
  faults: '/pages/faults/categories/categories',
  beginner: '/pages/guide/beginner/beginner'
};

const QUICK_ACTIONS = [
  { id: 'unifiedSearch', icon: '🔍', name: '综合搜索', bg: '#fff0f3', page: 'unifiedSearch' },
  { id: 'parts', icon: '⚙', name: '零件科普', bg: '#eef4ff', page: 'parts' },
  { id: 'faults', icon: '🔧', name: '故障分析', bg: '#f0fdf4', page: 'faults' },
  { id: 'favorite', icon: '⭐', name: '我的收藏', bg: '#fefce8', page: 'favorite' }
];

const TOOLS = [
  { id: 'maintain', icon: '📅', name: '保养提醒', desc: '到期提醒', bg: '#eef4ff', page: 'maintain', badge: 'HOT' },
  { id: 'favorite', icon: '⭐', name: '我的收藏', desc: '零件/故障', bg: '#fefce8', page: 'favorite' }
];

const SERVICES = [
  { id: 's1', icon: '📖', name: '新手养车指南', desc: '演示版仅含本篇', tag: '入门', bg: '#eef4ff', page: 'beginner' }
];

module.exports = { TOOL_PAGES, QUICK_ACTIONS, TOOLS, SERVICES };
