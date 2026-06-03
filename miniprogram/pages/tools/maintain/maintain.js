const { getMaintainListEnriched, addMaintain, removeMaintain } = require('../../../utils/local-data');

Page({
  data: {
    list: [],
    summary: { overdue: 0, today: 0, soon: 0 },
    form: { title: '', mileage: '', date: '' }
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const list = getMaintainListEnriched();
    this.setData({
      list,
      summary: {
        overdue: list.filter((i) => i.status === 'overdue').length,
        today: list.filter((i) => i.status === 'today').length,
        soon: list.filter((i) => i.status === 'soon').length
      }
    });
  },

  onTitle(e) { this.setData({ 'form.title': e.detail.value }); },
  onMileage(e) { this.setData({ 'form.mileage': e.detail.value }); },
  onDate(e) { this.setData({ 'form.date': e.detail.value }); },

  addItem() {
    const { title, mileage, date } = this.data.form;
    if (!title.trim()) return wx.showToast({ title: '请输入保养项目', icon: 'none' });
    if (!date) return wx.showToast({ title: '请选择日期', icon: 'none' });
    addMaintain({ title: title.trim(), mileage: mileage || '-', date });
    this.setData({ form: { title: '', mileage: '', date: '' } });
    this.refresh();
    wx.showToast({ title: '已添加', icon: 'success' });
  },

  remove(e) {
    removeMaintain(e.currentTarget.dataset.id);
    this.refresh();
  }
});
