App({
  onLaunch() {
    const apiBaseUrl = wx.getStorageSync('apiBaseUrl');
    if (!apiBaseUrl) {
      wx.setStorageSync('apiBaseUrl', 'http://localhost:3001');
    }
  },
  globalData: {
    apiBaseUrl: 'http://localhost:3001'
  }
});
