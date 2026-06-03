Page({
  data: {
    email: 'hellomamingcong@163.com',
    wechat: '19895596575',
  },

  copyEmail() {
    wx.setClipboardData({ data: this.data.email });
  },

  copyWechat() {
    wx.setClipboardData({ data: this.data.wechat });
  },
});
