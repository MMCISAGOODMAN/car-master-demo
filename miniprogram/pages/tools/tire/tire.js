Page({
  data: {
    index: 0,
    types: [
      { name: '紧凑型轿车', front: 230, rear: 230, full: 250 },
      { name: '中型轿车', front: 240, rear: 240, full: 260 },
      { name: 'SUV', front: 250, rear: 250, full: 280 },
      { name: 'MPV', front: 240, rear: 260, full: 280 },
      { name: '性能车', front: 260, rear: 280, full: 300 }
    ]
  },
  onPick(e) { this.setData({ index: Number(e.detail.value) }); }
});
