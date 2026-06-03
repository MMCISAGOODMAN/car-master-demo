Page({
  data: {
    loading: false,
    location: null,
    locError: '',
    shops: [
      { name: '品牌4S店', desc: '原厂配件、质保完善，适合保修期内车辆', phone: '' },
      { name: '连锁快修店', desc: '保养换油、轮胎、常规维修，价格透明', phone: '' },
      { name: '综合修理厂', desc: '钣金喷漆、底盘、电路等综合维修', phone: '' },
      { name: '轮胎专修', desc: '补胎、动平衡、四轮定位', phone: '' }
    ]
  },
  onShow() { this.refreshLoc(); },
  refreshLoc() {
    this.setData({ loading: true, locError: '' });
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          loading: false,
          location: { latitude: res.latitude.toFixed(5), longitude: res.longitude.toFixed(5) }
        });
      },
      fail: (err) => {
        this.setData({
          loading: false,
          locError: err.errMsg.includes('auth') ? '请授权位置权限后重试' : '定位失败，请检查权限'
        });
      }
    });
  },
  chooseLoc() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          location: {
            latitude: res.latitude.toFixed(5),
            longitude: res.longitude.toFixed(5),
            address: res.name || res.address
          }
        });
      }
    });
  },
  call(e) {
    const phone = e.currentTarget.dataset.phone;
    if (!phone) return wx.showToast({ title: '暂无电话', icon: 'none' });
    wx.makePhoneCall({ phoneNumber: phone });
  },
  openMap(e) {
    const name = e.currentTarget.dataset.name;
    const loc = this.data.location;
    if (!loc) return wx.showToast({ title: '请先获取位置', icon: 'none' });
    wx.openLocation({
      latitude: Number(loc.latitude),
      longitude: Number(loc.longitude),
      name: name,
      address: loc.address || '附近维修',
      scale: 15
    });
  }
});
