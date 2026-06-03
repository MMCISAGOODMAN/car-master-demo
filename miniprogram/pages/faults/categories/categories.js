const api = require('../../../utils/api');

const ICONS = {
  engine_fault: '🔥',
  brake_fault: '🛑',
  noise: '🔊',
  oil_leak: '💧',
  start_difficulty: '🔑',
  electric_fault: '⚡'
};

const DANGER_CLASS = {
  '低': 'danger-low',
  '中': 'danger-medium',
  '高': 'danger-high',
  '极高': 'danger-critical'
};

Page({
  data: {
    categories: [],
    loading: true,
    icons: ICONS,
    dangerClass: DANGER_CLASS
  },

  onLoad() {
    this.loadCategories();
  },

  async loadCategories() {
    this.setData({ loading: true });
    try {
      const res = await api.getFaultCategories();
      this.setData({ categories: res.data, loading: false });
    } catch (e) {
      this.setData({ loading: false });
      wx.showToast({ title: e.message || '加载失败', icon: 'none' });
    }
  },

  goList(e) {
    const { id, name } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/faults/list/list?categoryId=${id}&categoryName=${encodeURIComponent(name)}`
    });
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/faults/search/search' });
  },

  onPullDownRefresh() {
    this.loadCategories().then(() => wx.stopPullDownRefresh());
  }
});
