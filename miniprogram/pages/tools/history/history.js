const { getList, remove, clear } = require('../../../utils/history');
const api = require('../../../utils/api');

Page({
  data: { tab: 'all', list: [], filtered: [] },

  onShow() { this.refresh(); },

  refresh() {
    const list = getList().map((i) => ({
      ...i,
      key: `${i.type}-${i.id}`,
      imageUrlFull: i.imageUrl ? api.resolveImageUrl(i.imageUrl) : '',
      timeStr: this.formatTime(i.viewedAt)
    }));
    this.setData({ list });
    this.applyFilter(list, this.data.tab);
  },

  formatTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return '今天';
    return `${d.getMonth() + 1}/${d.getDate()}`;
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ tab });
    this.applyFilter(this.data.list, tab);
  },

  applyFilter(list, tab) {
    const filtered = tab === 'all' ? list : list.filter((i) => i.type === tab);
    this.setData({ filtered });
  },

  goItem(e) {
    const { type, id } = e.currentTarget.dataset.item;
    const url = type === 'part'
      ? `/pages/parts/detail/detail?id=${id}`
      : `/pages/faults/detail/detail?id=${id}`;
    wx.navigateTo({ url });
  },

  remove(e) {
    remove(e.currentTarget.dataset.type, e.currentTarget.dataset.id);
    this.refresh();
  },

  clearAll() {
    wx.showModal({
      title: '确认清空',
      content: '将删除全部浏览记录',
      success: (res) => {
        if (res.confirm) {
          clear();
          this.refresh();
        }
      }
    });
  }
});
