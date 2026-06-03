const api = require('../../../utils/api');

const DANGER_CLASS = {
  '低': 'danger-low',
  '中': 'danger-medium',
  '高': 'danger-high',
  '极高': 'danger-critical'
};

Page({
  data: {
    categoryId: '',
    categoryName: '',
    faults: [],
    loading: true
  },

  onLoad(options) {
    const categoryId = options.categoryId || '';
    const categoryName = decodeURIComponent(options.categoryName || '故障列表');
    this.setData({ categoryId, categoryName });
    wx.setNavigationBarTitle({ title: categoryName });
    this.loadFaults(categoryId);
  },

  async loadFaults(categoryId) {
    this.setData({ loading: true });
    try {
      const res = await api.getFaults(categoryId);
      const faults = res.data.map((item) => ({
        ...item,
        dangerClass: DANGER_CLASS[item.dangerLevel] || 'danger-medium'
      }));
      this.setData({ faults, loading: false });
    } catch (e) {
      this.setData({ loading: false });
      wx.showToast({ title: e.message || '加载失败', icon: 'none' });
    }
  },

  goDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/faults/detail/detail?id=${id}` });
  },

  onPullDownRefresh() {
    this.loadFaults(this.data.categoryId).then(() => wx.stopPullDownRefresh());
  }
});
