Page({
  data: { code: '' },
  onInput(e) { this.setData({ code: e.detail.value }); },
  doScan() {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        const code = (res.result || '').trim();
        if (code) this.goSearch(code);
      },
      fail: () => wx.showToast({ title: '扫描取消', icon: 'none' })
    });
  },
  searchByCode() {
    const code = this.data.code.trim();
    if (!code) return wx.showToast({ title: '请输入编号', icon: 'none' });
    this.goSearch(code);
  },
  goSearch(keyword) {
    wx.navigateTo({ url: `/pages/parts/search/search?keyword=${encodeURIComponent(keyword)}` });
  }
});
