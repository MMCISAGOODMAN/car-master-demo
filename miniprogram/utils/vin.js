/** VIN 第1位地区 + 常见 WMI 前三位 */
const WMI_MAP = {
  LFV: '一汽-大众',
  LSV: '上汽大众',
  LHG: '广汽本田',
  LGB: '东风日产',
  LDC: '东风雪铁龙',
  LBE: '北京奔驰',
  LBV: '华晨宝马',
  LGX: '比亚迪',
  LFP: '一汽奔腾',
  LZW: '上汽通用五菱',
  LSJ: '上汽集团',
  LVS: '长安福特',
  LJD: '东风悦达起亚',
  LFM: '一汽丰田',
  LGW: '长城汽车',
  LNB: '北汽新能源',
  WBA: '宝马(进口)',
  WDB: '奔驰(进口)',
  JHM: '本田(进口)',
  JT: '丰田(进口)'
};

const REGION_MAP = {
  L: '中国',
  W: '德国',
  J: '日本',
  K: '韩国',
  '1': '美国',
  '2': '加拿大',
  '3': '墨西哥',
  V: '法国/西班牙',
  S: '英国',
  Z: '意大利'
};

function validateVin(vin) {
  if (!vin || vin.length !== 17) return 'VIN 必须为 17 位';
  if (/[IOQ]/i.test(vin)) return 'VIN 不能包含 I、O、Q';
  if (!/^[A-HJ-NPR-Z0-9]+$/i.test(vin)) return 'VIN 格式不正确';
  return null;
}

function decodeVin(vin) {
  const v = vin.toUpperCase();
  const err = validateVin(v);
  if (err) return { error: err };

  const wmi3 = v.slice(0, 3);
  const wmi2 = v.slice(0, 2);
  let manufacturer = WMI_MAP[wmi3] || WMI_MAP[wmi2] || '未知厂商（可对照 WMI 表查询）';
  for (const key of Object.keys(WMI_MAP)) {
    if (v.startsWith(key)) {
      manufacturer = WMI_MAP[key];
      break;
    }
  }

  const region = REGION_MAP[v[0]] || '其他地区';
  const yearCode = v[9];
  const yearMap = {
    A: 2010, B: 2011, C: 2012, D: 2013, E: 2014, F: 2015, G: 2016, H: 2017,
    J: 2018, K: 2019, L: 2020, M: 2021, N: 2022, P: 2023, R: 2024, S: 2025
  };
  const modelYear = yearMap[yearCode] || `代号 ${yearCode}（需查对照表）`;

  return {
    vin: v,
    region,
    manufacturer,
    wmi: v.slice(0, 3),
    vds: v.slice(3, 9),
    vis: v.slice(9),
    modelYear,
    assemblyPlant: v[10],
    serial: v.slice(11)
  };
}

module.exports = { validateVin, decodeVin, WMI_MAP };
