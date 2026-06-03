const api = require('../../../utils/api');

const ICONS = {
  engine: '🔥',
  fuel: '⛽',
  exhaust: '💨',
  cooling: '❄️',
  transmission: '⚙️',
  brake: '🛑',
  steering: '🎯',
  chassis: '🏗️',
  electric: '⚡',
  ac: '🌡️',
  safety: '🛡️'
};

Page({
  data: {
    categories: [],
    loading: true,
    icons: ICONS
  },

  onLoad() {
    this.loadCategories();
  },

  async loadCategories() {
    this.setData({ loading: true });
    try {
      const res = await api.getPartCategories();
      this.setData({ categories: res.data, loading: false });
    } catch (e) {
      this.setData({ loading: false });
      wx.showToast({ title: e.message || '加载失败', icon: 'none' });
    }
  },

  goList(e) {
    const { id, name } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/parts/list/list?categoryId=${id}&categoryName=${encodeURIComponent(name)}`
    });
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/parts/search/search' });
  },

  onPullDownRefresh() {
    this.loadCategories().then(() => wx.stopPullDownRefresh());
  }
});
