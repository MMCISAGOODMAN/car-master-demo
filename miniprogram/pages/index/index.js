const api = require('../../utils/api');
const { QUICK_ACTIONS, TOOLS, SERVICES, TOOL_PAGES } = require('../../utils/home-config');
const { getList } = require('../../utils/history');
const { getMaintainAlerts } = require('../../utils/local-data');

Page({
  data: {
    stats: null,
    loading: true,
    quickActions: QUICK_ACTIONS,
    tools: TOOLS,
    services: SERVICES,
    recommendations: null,
    hotKeywords: [],
    recentHistory: [],
    maintainAlert: null
  },

  onLoad() {
    this.loadAll();
  },

  onShow() {
    this.loadRecentHistory();
    this.checkMaintainAlert();
  },

  onPullDownRefresh() {
    this.loadAll().then(() => wx.stopPullDownRefresh());
  },

  async loadAll() {
    this.setData({ loading: true });
    this.loadRecentHistory();
    try {
      const [partsRes, faultsRes, catRes, recRes] = await Promise.all([
        api.getParts(),
        api.getFaults(),
        api.getPartCategories(),
        api.getRecommendations().catch(() => null)
      ]);

      const recommendations = recRes ? {
        parts: (recRes.data.parts || []).map((p) => ({
          ...p,
          imageUrlFull: api.resolveImageUrl(p.imageUrl)
        })),
        faults: recRes.data.faults || []
      } : null;

      this.setData({
        stats: {
          partsCount: partsRes.data.length,
          faultsCount: faultsRes.data.length,
          categoryCount: catRes.data.length
        },
        recommendations,
        hotKeywords: recRes?.data?.hotKeywords || [],
        loading: false
      });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  loadRecentHistory() {
    const recentHistory = getList().slice(0, 5).map((i) => ({
      ...i,
      imageUrlFull: i.imageUrl ? api.resolveImageUrl(i.imageUrl) : ''
    }));
    this.setData({ recentHistory });
  },

  checkMaintainAlert() {
    const alerts = getMaintainAlerts();
    if (!alerts.hasAlert) {
      this.setData({ maintainAlert: null });
      return;
    }

    const items = [...alerts.overdue, ...alerts.today];
    const message = items.slice(0, 2).map((i) => i.title).join('、');
    const suffix = items.length > 2 ? ` 等 ${items.length} 项` : '';

    this.setData({
      maintainAlert: {
        count: alerts.alertCount,
        message: `${message}${suffix}`,
        hasOverdue: alerts.overdue.length > 0
      }
    });

    const tipKey = `maintain_tip_${new Date().toDateString()}`;
    if (!wx.getStorageSync(tipKey) && alerts.hasAlert) {
      wx.setStorageSync(tipKey, true);
      wx.showToast({
        title: alerts.overdue.length ? '有保养项目已过期' : '有保养项目今日到期',
        icon: 'none',
        duration: 2500
      });
    }
  },

  goMaintain() {
    wx.navigateTo({ url: '/pages/tools/maintain/maintain' });
  },

  goParts() {
    wx.navigateTo({ url: '/pages/parts/categories/categories' });
  },

  goFaults() {
    wx.navigateTo({ url: '/pages/faults/categories/categories' });
  },

  goUnifiedSearch() {
    wx.navigateTo({ url: '/pages/search/unified/unified' });
  },

  goAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  goHotSearch(e) {
    const word = e.currentTarget.dataset.word;
    wx.navigateTo({ url: `/pages/search/unified/unified?keyword=${encodeURIComponent(word)}` });
  },

  goHistory() {
    wx.navigateTo({ url: '/pages/tools/history/history' });
  },

  goHistoryItem(e) {
    const { type, id } = e.currentTarget.dataset.item;
    const url = type === 'part'
      ? `/pages/parts/detail/detail?id=${id}`
      : `/pages/faults/detail/detail?id=${id}`;
    wx.navigateTo({ url });
  },

  goPartDetail(e) {
    wx.navigateTo({ url: `/pages/parts/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  goFaultDetail(e) {
    wx.navigateTo({ url: `/pages/faults/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  onQuickTap(e) {
    this.navigateFeature(e.currentTarget.dataset.item);
  },

  onToolTap(e) {
    this.navigateFeature(e.currentTarget.dataset.item);
  },

  onServiceTap(e) {
    this.navigateFeature(e.currentTarget.dataset.item);
  },

  onMoreTools() {
    wx.showActionSheet({
      itemList: ['问小汽', '症状诊断', '我的爱车', '浏览历史', '我的收藏'],
      success: (res) => {
        const pages = ['ai', 'diagnose', 'garage', 'history', 'favorite'];
        this.navigateFeature({ page: pages[res.tapIndex] });
      }
    });
  },

  navigateFeature(item) {
    if (!item) return;
    const url = TOOL_PAGES[item.page];
    if (url) wx.navigateTo({ url });
  }
});
