const api = require('../../../utils/api');
const { CLASSROOM } = require('../../../utils/guide-data');

Page({
  data: { sections: [], loading: true },

  onLoad() {
    this.loadGuide('classroom', CLASSROOM);
  },

  async loadGuide(slug, fallback) {
    try {
      const res = await api.getGuide(slug);
      this.setData({ sections: res.data.sections || fallback, loading: false });
    } catch (e) {
      this.setData({ sections: fallback, loading: false });
    }
  }
});
