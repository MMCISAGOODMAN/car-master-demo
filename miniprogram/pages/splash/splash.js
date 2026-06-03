Page({
  data: {
    show: false,
    fadeOut: false
  },

  onLoad() {
    setTimeout(() => this.setData({ show: true }), 80);

    // 展示约 2 秒后淡出并进入首页
    setTimeout(() => {
      this.setData({ fadeOut: true });
      setTimeout(() => {
        wx.redirectTo({ url: '/pages/index/index' });
      }, 400);
    }, 2200);
  }
});
