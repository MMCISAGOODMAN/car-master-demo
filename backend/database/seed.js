const { generateImages } = require('../scripts/generate-images');
const { partsData, isSample } = require('./data-profile');
const { categories, parts } = partsData;

module.exports = function seed(db) {
  const images = generateImages();

  const insertPartCategory = db.prepare(
    'INSERT INTO part_categories (name, icon, sort_order) VALUES (?, ?, ?)'
  );
  const insertPart = db.prepare(
    `INSERT INTO parts (category_id, name, description, location, fault_symptoms, image_url)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  const insertFaultCategory = db.prepare(
    'INSERT INTO fault_categories (name, icon, sort_order) VALUES (?, ?, ?)'
  );
  const insertFault = db.prepare(
    `INSERT INTO faults (category_id, title, symptoms, causes, related_parts, solutions, danger_level)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  const seedAll = db.transaction(() => {
    categories.forEach((c) => insertPartCategory.run(c.name, c.icon, c.sortOrder));

    parts.forEach((p) => {
      const imageUrl = images[p.key];
      if (!imageUrl) {
        console.warn(`缺少图片映射: ${p.key} (${p.name})`);
      }
      insertPart.run(
        p.category,
        p.name,
        p.description,
        p.location,
        p.faultSymptoms,
        imageUrl || `/images/parts/${p.key}.png`
      );
    });

    const faultCategories = [
      ['发动机故障', 'engine_fault', 1],
      ['刹车故障', 'brake_fault', 2],
      ['异响', 'noise', 3],
      ['漏油', 'oil_leak', 4],
      ['启动困难', 'start_difficulty', 5],
      ['电器故障', 'electric_fault', 6],
    ];
    faultCategories.forEach((c) => insertFaultCategory.run(...c));

    const json = (arr) => JSON.stringify(arr);

    const faults = [
      [1, '发动机抖动', '怠速时车身明显抖动，方向盘和座椅有震感，加速时抖动加剧', json(['火花塞积碳或损坏', '点火线圈故障', '发动机机脚胶老化', '某缸不工作']), json(['火花塞', '点火线圈', '发动机机脚']), json(['检查并更换火花塞', '检测点火线圈电阻', '更换老化的发动机机脚胶', '读取故障码排查缺缸']), '中'],
      [1, '加速无力', '深踩油门时车辆提速缓慢，感觉动力输出不足', json(['空气滤清器堵塞', '燃油压力不足', '涡轮增压器故障', '三元催化器堵塞']), json(['空气滤清器', '燃油泵', '涡轮增压器', '三元催化器']), json(['更换空气滤清器', '检测燃油系统压力', '检查涡轮是否正常工作', '检查排气是否通畅']), '中'],
      [1, '烧机油', '排气管冒蓝烟，机油消耗量明显增大，需频繁添加机油', json(['活塞环磨损', '气门油封老化', '涡轮增压器油封损坏', '缸体磨损']), json(['活塞', '气门油封', '涡轮增压器', '发动机缸体']), json(['检测缸压判断磨损程度', '更换气门油封', '检查涡轮油封', '严重磨损需大修发动机']), '高'],
      [1, '水温过高', '水温表指针进入红色区域，或出现水温报警灯', json(['冷却液不足', '节温器故障', '水泵损坏', '散热器堵塞']), json(['冷却液', '节温器', '水泵', '散热器']), json(['检查冷却液液位并补充', '更换故障节温器', '检查水泵是否运转', '清洗或更换散热器']), '高'],
      [2, '制动距离变长', '踩下刹车踏板后车辆减速明显变慢', json(['刹车片磨损严重', '刹车盘磨损', '制动液含水量过高', '刹车总泵故障']), json(['刹车片', '刹车盘', '制动液', '制动总泵']), json(['检查刹车片厚度并更换', '检测刹车盘厚度', '更换制动液', '检测制动总泵']), '高'],
      [2, '刹车跑偏', '制动时车辆向一侧偏移', json(['左右刹车片磨损不均', '刹车分泵卡滞', '轮胎气压不一致', '悬架部件损坏']), json(['刹车片', '刹车卡钳', '轮胎', '控制臂']), json(['检查并更换刹车片', '检修卡钳活塞', '调整轮胎气压', '检查悬架定位']), '高'],
      [2, '刹车踏板发软', '踩下踏板感觉行程过长、力度不足', json(['制动系统进气', '制动液泄漏', '刹车总泵内泄', '刹车分泵故障']), json(['制动油管', '制动总泵', '刹车卡钳', '制动液']), json(['对制动系统排气', '检查各管路接头', '更换总泵或分泵', '补充制动液']), '极高'],
      [2, 'ABS故障灯亮', '仪表盘ABS警告灯常亮', json(['ABS传感器损坏', 'ABS模块故障', '传感器线路断路']), json(['ABS传感器', 'ABS液压泵']), json(['读取故障码定位问题', '检查传感器及线路', '必要时更换模块']), '中'],
      [3, '发动机舱异响', '发动机运转时金属敲击声、嘶嘶声或嗡嗡声', json(['正时链条/皮带松弛', '发电机轴承损坏', '水泵轴承磨损', '皮带张紧轮故障']), json(['正时皮带', '发电机', '水泵']), json(['检查正时系统张紧度', '听诊定位异响源', '更换损坏的轴承或皮带']), '中'],
      [3, '底盘异响', '过减速带时咯噔、嘎吱异响', json(['减震器损坏', '稳定杆胶套老化', '控制臂胶套磨损', '球头松旷']), json(['减震器', '稳定杆', '控制臂', '球头']), json(['检查减震器是否漏油', '更换老化的胶套', '检查球头间隙']), '低'],
      [3, '刹车异响', '制动时尖锐金属摩擦声', json(['刹车片磨损到极限', '刹车盘沟槽', '异物']), json(['刹车片', '刹车盘']), json(['检查刹车片厚度', '打磨或更换刹车盘', '清理卡钳异物']), '中'],
      [3, '转向异响', '转动方向盘咔咔声或摩擦声', json(['转向拉杆球头磨损', '转向机磨损', '助力泵缺油']), json(['转向拉杆', '转向机', '转向助力泵']), json(['检查拉杆球头间隙', '检查助力油液位', '检修转向机']), '中'],
      [4, '发动机漏油', '发动机底部或侧面油渍', json(['气门室盖垫老化', '曲轴油封损坏', '油底壳垫损坏']), json(['气门室盖', '曲轴油封', '油底壳']), json(['检查漏油位置', '更换密封垫/油封']), '中'],
      [4, '变速箱漏油', '变速箱底部油渍', json(['油封老化', '放油螺丝垫片损坏']), json(['变速箱', '油封']), json(['检查油液液位', '更换油封']), '高'],
      [4, '制动液泄漏', '制动液液位下降，踏板变软', json(['制动油管破裂', '分泵密封圈损坏', '总泵内泄']), json(['制动油管', '刹车卡钳', '制动总泵']), json(['立即检修', '更换损坏件', '排气补充制动液']), '极高'],
      [5, '冷车启动困难', '长时间停放后需多次打火', json(['蓄电池电量不足', '火花塞性能下降', '燃油压力不足']), json(['蓄电池', '火花塞', '燃油泵']), json(['检测蓄电池电压', '更换火花塞', '检测燃油压力']), '中'],
      [5, '热车启动困难', '行驶后熄火难启动', json(['喷油嘴滴漏', '点火线圈热衰减', '碳罐电磁阀故障']), json(['喷油嘴', '点火线圈', '碳罐']), json(['清洗喷油嘴', '更换点火线圈', '检查碳罐系统']), '中'],
      [5, '启动时咔咔声', '只听到咔咔声发动机不转', json(['蓄电池严重亏电', '起动机齿轮损坏', '飞轮齿圈磨损']), json(['蓄电池', '起动机', '飞轮']), json(['搭电或充电', '检修起动机', '检查飞轮齿圈']), '中'],
      [5, '完全无法启动', '无反应或启动即熄火', json(['燃油泵不工作', '曲轴传感器故障', '防盗锁止']), json(['燃油泵', '曲轴位置传感器']), json(['读取故障码', '检查燃油泵继电器']), '高'],
      [6, '蓄电池频繁亏电', '停放数天后无法启动', json(['蓄电池老化', '发电机不充电', '漏电']), json(['蓄电池', '发电机']), json(['检测容量与充电电压', '排查漏电']), '中'],
      [6, '灯光不亮或闪烁', '大灯、尾灯等不亮', json(['灯泡烧坏', '保险丝熔断', '线路接触不良']), json(['大灯', '尾灯', '保险丝盒']), json(['更换灯泡', '更换保险丝', '检查线路']), '低'],
      [6, '仪表盘故障灯亮', '发动机/ABS/气囊灯亮', json(['传感器故障', '控制模块异常', '线路问题']), json(['氧传感器', 'ECU', 'ABS模块']), json(['诊断仪读码', '按码检修']), '中'],
      [6, '空调不制冷', '出自然风或冷风不足', json(['制冷剂泄漏', '压缩机故障', '冷凝器堵塞']), json(['空调压缩机', '冷凝器']), json(['测压查漏', '检查压缩机离合器']), '低'],
    ];
    const faultRows = isSample ? faults.slice(0, 6) : faults;
    faultRows.forEach((f) => insertFault.run(...f));

    return faultRows.length;
  });

  const faultCount = seedAll();
  const mode = isSample ? '演示版 sample' : '完整版 full';
  console.log(`种子数据写入完成 (${mode}): ${categories.length} 个分类, ${parts.length} 个零部件, ${faultCount} 个故障`);
};
