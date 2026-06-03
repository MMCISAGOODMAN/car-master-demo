const api = require('../../../utils/api');

Page({
  data: {
    categoryId: '',
    categoryName: '',
    parts: [],
    loading: true
  },

  onLoad(options) {
    const categoryId = options.categoryId || '';
    const categoryName = decodeURIComponent(options.categoryName || '零部件列表');
    this.setData({ categoryId, categoryName });
    wx.setNavigationBarTitle({ title: categoryName });
    this.loadParts(categoryId);
  },

  async loadParts(categoryId) {
    this.setData({ loading: true });
    try {
      const res = await api.getParts(categoryId);
      const parts = res.data.map((item) => ({
        ...item,
        imageUrlFull: api.resolveImageUrl(item.imageUrl)
      }));
      this.setData({ parts, loading: false });
    } catch (e) {
      this.setData({ loading: false });
      wx.showToast({ title: e.message || '加载失败', icon: 'none' });
    }
  },

  goDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/parts/detail/detail?id=${id}` });
  },

  onPullDownRefresh() {
    this.loadParts(this.data.categoryId).then(() => wx.stopPullDownRefresh());
  }
});
