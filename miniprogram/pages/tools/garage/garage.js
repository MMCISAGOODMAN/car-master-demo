const { getCar, saveCar, clearCar } = require('../../../utils/garage');

Page({
  data: {
    car: null,
    form: { model: '', plate: '', mileage: '', vin: '' },
    oilTypes: ['矿物油 5000km', '半合成 7500km', '全合成 10000km'],
    oilIndex: 2
  },

  onShow() {
    const car = getCar();
    if (car) {
      const oilIndex = this.data.oilTypes.findIndex((t) => t.startsWith((car.oilType || '').split(' ')[0]));
      this.setData({
        car,
        form: {
          model: car.model || '',
          plate: car.plate || '',
          mileage: car.mileage || '',
          vin: car.vin || ''
        },
        oilIndex: oilIndex >= 0 ? oilIndex : 2
      });
    }
  },

  onField(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onOil(e) {
    this.setData({ oilIndex: Number(e.detail.value) });
  },

  save() {
    const { form, oilTypes, oilIndex } = this.data;
    if (!form.model.trim()) {
      return wx.showToast({ title: '请填写车型', icon: 'none' });
    }
    const car = saveCar({
      ...form,
      oilType: oilTypes[oilIndex]
    });
    this.setData({ car });
    wx.showToast({ title: '已保存', icon: 'success' });
  },

  clear() {
    clearCar();
    this.setData({
      car: null,
      form: { model: '', plate: '', mileage: '', vin: '' },
      oilIndex: 2
    });
    wx.showToast({ title: '已清除', icon: 'none' });
  }
});
