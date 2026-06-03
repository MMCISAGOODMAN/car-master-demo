const { decodeVin } = require('../../../utils/vin');

Page({
  data: { vin: '', result: null },
  onInput(e) { this.setData({ vin: e.detail.value.toUpperCase() }); },
  decode() {
    this.setData({ result: decodeVin(this.data.vin) });
  }
});
