const api = require('../../utils/api');
const { QUICK_ACTIONS, TOOLS, SERVICES, TOOL_PAGES } = require('../../utils/home-config');
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
    maintainAlert: null
  },

  onLoad() {
    this.loadAll();
  },

  onShow() {
    this.checkMaintainAlert();
  },

  onPullDownRefresh() {
    this.loadAll().then(() => wx.stopPullDownRefresh());
  },

  async loadAll() {
    this.setData({ loading: true });
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

  checkMaintainAlert() {
    const alerts = getMaintainAlerts();
    if (!alerts.hasAlert) {
      this.setData({ maintainAlert: null });
      return;
    }

    const names = alerts.items.slice(0, 2).map((i) => i.name).join('、');
    const suffix = alerts.items.length > 2 ? `等 ${alerts.items.length} 项` : '';
    this.setData({
      maintainAlert: {
        hasOverdue: alerts.hasOverdue,
        message: names + suffix
      }
    });
  },

  goParts() {
    wx.navigateTo({ url: '/pages/parts/categories/categories' });
  },

  goFaults() {
    wx.navigateTo({ url: '/pages/faults/categories/categories' });
  },

  goMaintain() {
    wx.navigateTo({ url: '/pages/tools/maintain/maintain' });
  },

  goUnifiedSearch() {
    wx.navigateTo({ url: '/pages/search/unified/unified' });
  },

  goHotSearch(e) {
    const word = e.currentTarget.dataset.word;
    wx.navigateTo({ url: `/pages/search/unified/unified?keyword=${encodeURIComponent(word)}` });
  },

  goAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
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

  navigateFeature(item) {
    if (!item) return;
    const url = TOOL_PAGES[item.page];
    if (url) wx.navigateTo({ url });
  }
});
