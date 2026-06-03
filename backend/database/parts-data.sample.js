/**
 * 演示版样本数据（公开仓库用）
 * 完整 106 条见 parts-data.js（完整版，需商业授权）
 */
module.exports = {
  categories: [
    { name: '发动机系统', icon: 'engine', sortOrder: 1 },
    { name: '制动系统', icon: 'brake', sortOrder: 2 },
    { name: '电气系统', icon: 'electric', sortOrder: 3 },
  ],

  parts: [
    { category: 1, key: 'spark_plug', name: '火花塞', description: '点燃混合气，汽油机点火核心件。', location: '缸盖火花塞孔', faultSymptoms: '积碳点火不良；电极烧蚀加速无力' },
    { category: 1, key: 'air_filter', name: '空气滤清器', description: '过滤进气灰尘，保护气缸。', location: '进气管前端', faultSymptoms: '堵塞进气不足、油耗高' },
    { category: 1, key: 'oil_filter', name: '机油滤清器', description: '过滤机油金属屑与杂质。', location: '油底壳附近', faultSymptoms: '堵塞润滑不良；密封圈漏油' },
    { category: 1, key: 'radiator', name: '散热器', description: '冷却液散热，维持发动机工作温度。', location: '发动机舱前部', faultSymptoms: '堵塞水温高；漏水液位降' },
    { category: 2, key: 'brake_pad', name: '刹车片', description: '与刹车盘摩擦产生制动力。', location: '刹车卡钳内', faultSymptoms: '磨损到极限尖叫；制动力下降' },
    { category: 2, key: 'brake_disc', name: '刹车盘', description: '与刹车片摩擦减速。', location: '轮毂内侧', faultSymptoms: '沟槽抖动；过薄需更换' },
    { category: 2, key: 'abs_pump', name: 'ABS液压泵', description: '防抱死制动系统液压控制单元。', location: '发动机舱', faultSymptoms: '故障灯亮；制动辅助失效' },
    { category: 3, key: 'battery', name: '蓄电池', description: '启动与供电储能。', location: '发动机舱', faultSymptoms: '亏电无法启动；寿命到期' },
    { category: 3, key: 'alternator', name: '发电机', description: '发动机驱动发电，为整车供电并充电。', location: '发动机前端', faultSymptoms: '不充电蓄电池亏电；轴承异响' },
    { category: 3, key: 'starter', name: '起动机', description: '拖动飞轮启动发动机。', location: '变速箱接合处', faultSymptoms: '咔咔声不转；齿轮磨损' },
  ],
};
