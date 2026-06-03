const api = require('../../../utils/api');

Page({
  data: {
    keyword: '',
    tab: 'all',
    parts: [],
    faults: [],
    hotKeywords: ['火花塞', '刹车片', '发动机抖动', '烧机油', 'ABS'],
    loading: false,
    searched: false,
    showEmpty: false,
    autoFocus: true
  },

  onLoad(options) {
    if (options.keyword) {
      const keyword = decodeURIComponent(options.keyword);
      this.setData({ keyword });
      this.doSearch(keyword);
    }
    this.loadHotKeywords();
  },

  async loadHotKeywords() {
    try {
      const res = await api.getRecommendations();
      if (res.data.hotKeywords) {
        this.setData({ hotKeywords: res.data.hotKeywords });
      }
    } catch (e) { /* ignore */ }
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value });
  },

  switchTab(e) {
    this.setData({ tab: e.currentTarget.dataset.tab });
  },

  searchHot(e) {
    const keyword = e.currentTarget.dataset.word;
    this.setData({ keyword });
    this.doSearch(keyword);
  },

  async doSearch(preset) {
    const keyword = (preset || this.data.keyword).trim();
    if (!keyword) {
      wx.showToast({ title: '请输入关键词', icon: 'none' });
      return;
    }
    this.setData({ keyword, loading: true, searched: true });
    try {
      const res = await api.unifiedSearch(keyword);
      const parts = (res.data.parts || []).map((p) => ({
        ...p,
        imageUrlFull: api.resolveImageUrl(p.imageUrl)
      }));
      const faults = res.data.faults || [];
      this.setData({
        parts,
        faults,
        loading: false,
        showEmpty: parts.length === 0 && faults.length === 0
      });
    } catch (e) {
      this.setData({ loading: false });
      wx.showToast({ title: e.message || '搜索失败', icon: 'none' });
    }
  },

  goPart(e) {
    wx.navigateTo({ url: `/pages/parts/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  goFault(e) {
    wx.navigateTo({ url: `/pages/faults/detail/detail?id=${e.currentTarget.dataset.id}` });
  }
});
