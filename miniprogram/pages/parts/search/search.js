const api = require('../../../utils/api');

Page({
  data: { keyword: '', results: [], loading: false, searched: false },

  onLoad(options) {
    if (options.keyword) {
      const keyword = decodeURIComponent(options.keyword);
      this.setData({ keyword });
      this.doSearch(keyword);
    }
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value });
  },

  async doSearch(preset) {
    const keyword = (preset || this.data.keyword).trim();
    if (!keyword) {
      wx.showToast({ title: '请输入搜索关键词', icon: 'none' });
      return;
    }
    this.setData({ keyword, loading: true, searched: true });
    try {
      const res = await api.searchParts(keyword);
      const results = res.data.map((item) => ({
        ...item,
        imageUrlFull: api.resolveImageUrl(item.imageUrl)
      }));
      this.setData({ results, loading: false });
    } catch (e) {
      this.setData({ loading: false });
      wx.showToast({ title: e.message || '搜索失败', icon: 'none' });
    }
  },

  goDetail(e) {
    wx.navigateTo({ url: `/pages/parts/detail/detail?id=${e.currentTarget.dataset.id}` });
  }
});
