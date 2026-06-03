const api = require('../../../utils/api');

Page({
  data: { tags: [], results: [], loading: false, searched: false },

  onLoad() {
    this.loadTags();
  },

  async loadTags() {
    try {
      const res = await api.getSymptomTags();
      this.setData({
        tags: (res.data || []).map((t) => ({ ...t, selected: false }))
      });
    } catch (e) {
      wx.showToast({ title: '加载症状标签失败', icon: 'none' });
    }
  },

  toggleTag(e) {
    const id = e.currentTarget.dataset.id;
    const tags = this.data.tags.map((t) =>
      t.id === id ? { ...t, selected: !t.selected } : t
    );
    this.setData({ tags });
  },

  async diagnose() {
    const selected = this.data.tags.filter((t) => t.selected).map((t) => t.id);
    if (!selected.length) {
      return wx.showToast({ title: '请至少选择一个症状', icon: 'none' });
    }
    this.setData({ loading: true, searched: true });
    try {
      const res = await api.matchFaults(selected);
      this.setData({ results: res.data || [], loading: false });
    } catch (e) {
      this.setData({ loading: false });
      wx.showToast({ title: e.message || '诊断失败', icon: 'none' });
    }
  },

  goFault(e) {
    wx.navigateTo({ url: `/pages/faults/detail/detail?id=${e.currentTarget.dataset.id}` });
  }
});
