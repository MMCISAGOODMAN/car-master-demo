Page({
  data: {
    items: [
      { name: '发动机机油', specs: [{ label: '矿物油', value: '5000km / 6个月' }, { label: '半合成', value: '7500km / 8个月' }, { label: '全合成', value: '10000km / 12个月' }], tip: '具体粘度请参考保养手册，常见 5W-30、0W-20' },
      { name: '制动液', specs: [{ label: 'DOT4', value: '2年或4万km更换' }, { label: 'DOT5.1', value: '高性能车型' }], tip: '吸水后沸点下降，需定期更换' },
      { name: '冷却液', specs: [{ label: '乙二醇型', value: '4-6年或6-8万km' }, { label: '冰点', value: '需低于当地最低温 10°C' }], tip: '不同颜色/品牌勿随意混加' },
      { name: '变速箱油', specs: [{ label: 'AT自动', value: '4-6万km' }, { label: 'MT手动', value: '6-8万km' }, { label: 'CVT', value: '按手册，通常4-6万km' }], tip: '建议重力换油或循环机换油' }
    ]
  }
});
