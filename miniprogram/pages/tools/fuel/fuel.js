const { getFuelList, addFuel, removeFuel } = require('../../../utils/local-data');

Page({
  data: { list: [], form: { mileage: '', liters: '', cost: '' }, avgConsumption: '' },
  onShow() { this.refresh(); },
  refresh() {
    const list = getFuelList().map((i) => ({
      ...i,
      dateStr: new Date(i.id).toLocaleDateString()
    }));
    let avg = '';
    if (list.length >= 2) {
      const a = list[1], b = list[0];
      const dist = Number(b.mileage) - Number(a.mileage);
      const liters = Number(b.liters);
      if (dist > 0 && liters > 0) avg = ((liters / dist) * 100).toFixed(1);
    }
    this.setData({ list, avgConsumption: avg });
  },
  onMileage(e) { this.setData({ 'form.mileage': e.detail.value }); },
  onLiters(e) { this.setData({ 'form.liters': e.detail.value }); },
  onCost(e) { this.setData({ 'form.cost': e.detail.value }); },
  addRecord() {
    const { mileage, liters, cost } = this.data.form;
    if (!mileage || !liters) return wx.showToast({ title: '请填写里程和油量', icon: 'none' });
    addFuel({ mileage, liters, cost: cost || '0' });
    this.setData({ form: { mileage: '', liters: '', cost: '' } });
    this.refresh();
    wx.showToast({ title: '已保存', icon: 'success' });
  },
  remove(e) {
    removeFuel(e.currentTarget.dataset.id);
    this.refresh();
  }
});
