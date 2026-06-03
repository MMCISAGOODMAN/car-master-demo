Page({
  data: {
    keywords: ['发动机抖动', '烧机油', '刹车异响', '启动困难', '水温过高', '空调不制冷', '怠速不稳', '加速无力', '漏油', '方向盘异响'],
    partKeywords: ['火花塞', '刹车片', '机油滤清器', '蓄电池', '减震器', '正时皮带', '氧传感器', '变速箱']
  },
  search(e) {
    wx.navigateTo({ url: `/pages/faults/search/search?keyword=${encodeURIComponent(e.currentTarget.dataset.kw)}` });
  },
  searchPart(e) {
    wx.navigateTo({ url: `/pages/parts/search/search?keyword=${encodeURIComponent(e.currentTarget.dataset.kw)}` });
  }
});
