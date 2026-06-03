const api = require('../../../utils/api');
const { isPartFavorite, togglePart } = require('../../../utils/favorites');
const { add: addHistory } = require('../../../utils/history');

Page({
  data: {
    part: null,
    loading: true,
    isFavorite: false,
    relatedFaults: []
  },

  onLoad(options) {
    if (options.id) {
      this.loadPart(options.id);
    }
  },

  onShareAppMessage() {
    const { part } = this.data;
    return {
      title: part ? `零件百科：${part.name}` : '汽车零部件科普',
      path: part ? `/pages/parts/detail/detail?id=${part.id}` : '/pages/index/index'
    };
  },

  async loadPart(id) {
    this.setData({ loading: true });
    try {
      const [res, relRes] = await Promise.all([
        api.getPartDetail(id),
        api.getRelatedFaults(id).catch(() => ({ data: [] }))
      ]);
      const part = {
        ...res.data,
        imageUrlFull: api.resolveImageUrl(res.data.imageUrl)
      };
      addHistory({
        type: 'part',
        id: part.id,
        title: part.name,
        subtitle: part.categoryName,
        imageUrl: part.imageUrl
      });
      this.setData({
        part,
        relatedFaults: relRes.data || [],
        loading: false,
        isFavorite: isPartFavorite(part.id)
      });
      wx.setNavigationBarTitle({ title: part.name });
    } catch (e) {
      this.setData({ loading: false, part: null });
      wx.showToast({ title: e.message || '加载失败', icon: 'none' });
    }
  },

  toggleFavorite() {
    const { part } = this.data;
    if (!part) return;
    const added = togglePart(part);
    this.setData({ isFavorite: added });
    wx.showToast({ title: added ? '已收藏' : '已取消', icon: 'success' });
  },

  goFault(e) {
    wx.navigateTo({ url: `/pages/faults/detail/detail?id=${e.currentTarget.dataset.id}` });
  }
});
