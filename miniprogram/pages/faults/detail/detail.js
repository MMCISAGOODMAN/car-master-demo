const api = require('../../../utils/api');
const { isFaultFavorite, toggleFault } = require('../../../utils/favorites');
const { add: addHistory } = require('../../../utils/history');

const DANGER_CLASS = {
  '低': 'danger-low',
  '中': 'danger-medium',
  '高': 'danger-high',
  '极高': 'danger-critical'
};

Page({
  data: {
    fault: null,
    loading: true,
    isFavorite: false
  },

  onLoad(options) {
    if (options.id) {
      this.loadFault(options.id);
    }
  },

  onShareAppMessage() {
    const { fault } = this.data;
    return {
      title: fault ? `故障分析：${fault.title}` : '汽车故障分析',
      path: fault ? `/pages/faults/detail/detail?id=${fault.id}` : '/pages/index/index'
    };
  },

  async loadFault(id) {
    this.setData({ loading: true });
    try {
      const res = await api.getFaultDetail(id);
      const fault = {
        ...res.data,
        dangerClass: DANGER_CLASS[res.data.dangerLevel] || 'danger-medium'
      };
      addHistory({
        type: 'fault',
        id: fault.id,
        title: fault.title,
        subtitle: fault.categoryName
      });
      this.setData({ fault, loading: false, isFavorite: isFaultFavorite(fault.id) });
      wx.setNavigationBarTitle({ title: fault.title });
    } catch (e) {
      this.setData({ loading: false, fault: null });
      wx.showToast({ title: e.message || '加载失败', icon: 'none' });
    }
  },

  toggleFavorite() {
    const { fault } = this.data;
    if (!fault) return;
    const added = toggleFault(fault);
    this.setData({ isFavorite: added });
    wx.showToast({ title: added ? '已收藏' : '已取消', icon: 'success' });
  },

  searchPart(e) {
    const name = e.currentTarget.dataset.name;
    wx.navigateTo({ url: `/pages/search/unified/unified?keyword=${encodeURIComponent(name)}` });
  }
});
