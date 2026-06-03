const config = require('./config');

function getBaseUrl() {
  return wx.getStorageSync('apiBaseUrl') || config.apiBaseUrl;
}

function resolveImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const base = getBaseUrl().replace(/\/$/, '');
  return `${base}${url.startsWith('/') ? url : '/' + url}`;
}

function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${getBaseUrl()}${url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || `请求失败 (${res.statusCode})`));
        }
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络请求失败'));
      }
    });
  });
}

const api = {
  getPartCategories() {
    return request('/api/parts/categories');
  },
  getParts(categoryId) {
    const query = categoryId ? `?categoryId=${categoryId}` : '';
    return request(`/api/parts${query}`);
  },
  getPartDetail(id) {
    return request(`/api/parts/${id}`);
  },
  searchParts(keyword) {
    return request(`/api/parts/search?keyword=${encodeURIComponent(keyword)}`);
  },
  getFaultCategories() {
    return request('/api/faults/categories');
  },
  getFaults(categoryId) {
    const query = categoryId ? `?categoryId=${categoryId}` : '';
    return request(`/api/faults${query}`);
  },
  getFaultDetail(id) {
    return request(`/api/faults/${id}`);
  },
  searchFaults(keyword) {
    return request(`/api/faults/search?keyword=${encodeURIComponent(keyword)}`);
  },
  unifiedSearch(keyword) {
    return request(`/api/search?keyword=${encodeURIComponent(keyword)}`);
  },
  getRecommendations() {
    return request('/api/home/recommendations');
  },
  getGuides() {
    return request('/api/guides');
  },
  getGuide(slug) {
    return request(`/api/guides/${slug}`);
  },
  getSymptomTags() {
    return request('/api/guides/symptoms');
  },
  matchFaults(tags) {
    const q = Array.isArray(tags) ? tags.join(',') : tags;
    return request(`/api/faults/match?tags=${encodeURIComponent(q)}`);
  },
  getRelatedFaults(partId) {
    return request(`/api/parts/${partId}/related-faults`);
  },
  getAiSuggestions() {
    return request('/api/ai/suggestions');
  },
  askAi(question) {
    return request('/api/ai/chat', { method: 'POST', data: { question } });
  },
  resolveImageUrl
};

module.exports = api;
