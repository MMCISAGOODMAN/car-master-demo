const { getAll, removePart, removeFault } = require('../../../utils/favorites');
const api = require('../../../utils/api');

Page({
  data: { tab: 'parts', parts: [], faults: [] },
  onShow() { this.refresh(); },
  refresh() {
    const { parts, faults } = getAll();
    this.setData({
      parts: parts.map((p) => ({
        ...p,
        imageUrlFull: api.resolveImageUrl(p.imageUrl)
      })),
      faults
    });
  },
  switchTab(e) { this.setData({ tab: e.currentTarget.dataset.tab }); },
  goPart(e) {
    wx.navigateTo({ url: `/pages/parts/detail/detail?id=${e.currentTarget.dataset.id}` });
  },
  goFault(e) {
    wx.navigateTo({ url: `/pages/faults/detail/detail?id=${e.currentTarget.dataset.id}` });
  },
  removePart(e) {
    removePart(e.currentTarget.dataset.id);
    this.refresh();
  },
  removeFault(e) {
    removeFault(e.currentTarget.dataset.id);
    this.refresh();
  }
});
