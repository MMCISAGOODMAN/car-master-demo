const api = require('../../../utils/api');
const { LIGHTS } = require('../../../utils/guide-data');

Page({
  data: { lights: [], loading: true },

  onLoad() {
    this.loadGuide('lights', LIGHTS);
  },

  async loadGuide(slug, fallback) {
    try {
      const res = await api.getGuide(slug);
      this.setData({ lights: res.data.items || fallback, loading: false });
    } catch (e) {
      this.setData({ lights: fallback, loading: false });
    }
  }
});
