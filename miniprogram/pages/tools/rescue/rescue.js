Page({
  data: {
    hotlines: [
      { name: '交通事故报警', phone: '122', desc: '道路交通事故、交通拥堵' },
      { name: '医疗急救', phone: '120', desc: '人员受伤需紧急救治' },
      { name: '公安报警', phone: '110', desc: '治安、刑事案件' },
      { name: '火警', phone: '119', desc: '车辆起火等火情' },
      { name: '高速公路救援', phone: '12122', desc: '高速抛锚、事故求助' },
      { name: '道路救援（通用）', phone: '12328', desc: '交通运输服务监督' }
    ]
  },
  call(e) {
    wx.makePhoneCall({ phoneNumber: e.currentTarget.dataset.phone });
  }
});
