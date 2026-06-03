const { wrap } = require('./part-svgs');

module.exports = {
  cylinder_head: () => wrap('气缸盖', `
    <path d="M200 220 L600 220 L620 280 L600 400 L200 400 L180 280 Z" fill="url(#castIron)" stroke="#333" stroke-width="2"/>
    <circle cx="280" cy="300" r="22" fill="#1a1a1a" stroke="#666"/><circle cx="400" cy="300" r="22" fill="#1a1a1a" stroke="#666"/>
    <circle cx="520" cy="300" r="22" fill="#1a1a1a" stroke="#666"/><circle cx="340" cy="360" r="22" fill="#1a1a1a" stroke="#666"/>
    <circle cx="460" cy="360" r="22" fill="#1a1a1a" stroke="#666"/>
    <rect x="350" y="240" width="100" height="40" rx="4" fill="#555"/>
  `),
  piston_ring: () => wrap('活塞环', `
    <ellipse cx="400" cy="280" rx="120" ry="35" fill="none" stroke="url(#metal)" stroke-width="12"/>
    <ellipse cx="400" cy="320" rx="115" ry="32" fill="none" stroke="#aaa" stroke-width="10"/>
    <ellipse cx="400" cy="360" rx="110" ry="30" fill="none" stroke="#888" stroke-width="8"/>
    <ellipse cx="400" cy="240" rx="125" ry="38" fill="none" stroke="#ccc" stroke-width="14"/>
  `),
  connecting_rod: () => wrap('连杆', `
    <rect x="360" y="160" width="80" height="50" rx="20" fill="url(#metal)" stroke="#777"/>
    <rect x="385" y="210" width="30" height="180" fill="url(#metalDark)" stroke="#666"/>
    <circle cx="400" cy="420" r="45" fill="url(#metal)" stroke="#777" stroke-width="2"/>
    <circle cx="400" cy="420" r="18" fill="#444"/>
  `),
  valve: () => wrap('气门', `
    <rect x="320" y="120" width="24" height="280" fill="url(#metal)" stroke="#888"/>
    <rect x="456" y="120" width="24" height="280" fill="url(#metal)" stroke="#888"/>
    <ellipse cx="332" cy="110" rx="40" ry="20" fill="#ddd" stroke="#999"/>
    <ellipse cx="468" cy="110" rx="40" ry="20" fill="#ccc" stroke="#999"/>
    <path d="M332 400 L292 440 L372 440 Z" fill="#888"/><path d="M468 400 L428 440 L508 440 Z" fill="#888"/>
  `),
  timing_belt: () => wrap('正时皮带', `
    <ellipse cx="280" cy="280" rx="60" ry="60" fill="none" stroke="#222" stroke-width="24"/>
    <ellipse cx="520" cy="280" rx="60" ry="60" fill="none" stroke="#222" stroke-width="24"/>
    <path d="M340 220 L460 220 L460 340 L340 340 Z" fill="none" stroke="#111" stroke-width="20"/>
    <rect x="370" y="250" width="60" height="8" fill="#333" transform="rotate(-15 400 254)"/>
    <rect x="370" y="290" width="60" height="8" fill="#333" transform="rotate(15 400 294)"/>
  `),
  timing_chain: () => wrap('正时链条', `
    <path d="M250 280 L550 280" stroke="none" fill="url(#metalDark)"/>
    <rect x="250" y="265" width="300" height="30" fill="#555" stroke="#777"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${260 + i * 24}" y="268" width="12" height="24" rx="2" fill="#888"/>`).join('')}
    <circle cx="250" cy="280" r="45" fill="none" stroke="#666" stroke-width="8"/>
    <circle cx="550" cy="280" r="45" fill="none" stroke="#666" stroke-width="8"/>
  `),
  intake_manifold: () => wrap('进气歧管', `
    <path d="M220 320 L580 320 L560 200 L240 200 Z" fill="#444" stroke="#666" stroke-width="2"/>
    <rect x="280" y="160" width="50" height="50" rx="6" fill="#555"/><rect x="375" y="160" width="50" height="50" rx="6" fill="#555"/>
    <rect x="470" y="160" width="50" height="50" rx="6" fill="#555"/>
    <ellipse cx="400" cy="360" rx="80" ry="30" fill="#333" stroke="#555"/>
  `),
  exhaust_manifold: () => wrap('排气歧管', `
    <path d="M240 380 L360 220 L400 220 L440 380 Z" fill="url(#castIron)" stroke="#444"/>
    <path d="M400 220 L480 200 L560 380 L440 380 Z" fill="#4a4a4a" stroke="#444"/>
    <path d="M400 220 L520 240 L600 400 L480 380 Z" fill="#555" stroke="#444"/>
    <circle cx="400" cy="400" r="35" fill="#333" stroke="#666"/>
  `),
  throttle_body: () => wrap('节气门', `
    <rect x="300" y="200" width="200" height="160" rx="12" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <circle cx="400" cy="280" r="55" fill="none" stroke="#888" stroke-width="6"/>
    <ellipse cx="400" cy="280" rx="45" ry="20" fill="#666"/>
    <rect x="340" y="120" width="120" height="60" rx="8" fill="#444" stroke="#666"/>
  `),
  ignition_coil: () => wrap('点火线圈', `
    <rect x="340" y="180" width="120" height="200" rx="8" fill="#222" stroke="#444" stroke-width="2"/>
    <rect x="360" y="200" width="80" height="120" rx="4" fill="#333"/>
    <rect x="385" y="380" width="30" height="60" fill="url(#metal)" stroke="#888"/>
    <path d="M370 120 L430 120 L420 180 L380 180 Z" fill="url(#metalDark)"/>
  `),
  oil_pan: () => wrap('油底壳', `
    <path d="M220 260 L580 260 L600 340 L580 420 L220 420 L200 340 Z" fill="url(#castIron)" stroke="#333" stroke-width="2"/>
    <rect x="360" y="380" width="80" height="20" rx="4" fill="#555"/>
    <circle cx="250" cy="340" r="12" fill="#666"/><circle cx="550" cy="340" r="12" fill="#666"/>
  `),
  oil_pump: () => wrap('机油泵', `
    <circle cx="400" cy="300" r="70" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <circle cx="400" cy="300" r="45" fill="#444"/>
    <rect x="385" y="180" width="30" height="50" fill="url(#metal)"/>
    <path d="M400 370 L400 430 L380 450 L420 450 Z" fill="#666"/>
  `),
  engine_mount: () => wrap('发动机机脚胶', `
    <rect x="280" y="200" width="240" height="80" rx="8" fill="#333" stroke="#555"/>
    <rect x="300" y="280" width="80" height="120" rx="12" fill="#1a1a1a" stroke="#444"/>
    <rect x="420" y="280" width="80" height="120" rx="12" fill="#1a1a1a" stroke="#444"/>
    <ellipse cx="340" cy="400" rx="50" ry="25" fill="#222"/><ellipse cx="460" cy="400" rx="50" ry="25" fill="#222"/>
  `),
  oxygen_sensor: () => wrap('氧传感器', `
    <rect x="385" y="200" width="30" height="180" fill="url(#metal)" stroke="#888"/>
    <circle cx="400" cy="180" r="35" fill="#fff" stroke="#ccc" stroke-width="3"/>
    <path d="M400 380 L400 450 L385 470 L415 470 Z" fill="#888"/>
    <rect x="200" y="270" width="180" height="20" rx="10" fill="#666"/>
  `),
  knock_sensor: () => wrap('爆震传感器', `
    <rect x="350" y="220" width="100" height="60" rx="6" fill="#333" stroke="#555"/>
    <circle cx="400" cy="320" r="25" fill="url(#metal)" stroke="#777"/>
    <rect x="385" y="345" width="30" height="80" fill="#444"/>
    <path d="M250 300 L350 300" stroke="#666" stroke-width="4"/>
  `),
  crank_sensor: () => wrap('曲轴位置传感器', `
    <rect x="320" y="240" width="160" height="80" rx="8" fill="#222" stroke="#444"/>
    <rect x="370" y="200" width="60" height="40" fill="#444"/>
    <circle cx="400" cy="360" r="40" fill="none" stroke="#888" stroke-width="3"/>
    <rect x="390" y="320" width="20" height="30" fill="#c62828"/>
  `),
  cam_sensor: () => wrap('凸轮轴位置传感器', `
    <rect x="340" y="220" width="120" height="50" rx="6" fill="#333" stroke="#555"/>
    <ellipse cx="400" cy="320" rx="50" ry="30" fill="url(#metal)" stroke="#777"/>
    <rect x="385" y="350" width="30" height="70" fill="#555"/>
  `),
  egr_valve: () => wrap('EGR阀', `
    <rect x="300" y="220" width="200" height="140" rx="10" fill="url(#metalDark)" stroke="#555"/>
    <circle cx="400" cy="290" r="40" fill="#555" stroke="#777"/>
    <rect x="250" y="270" width="50" height="40" rx="4" fill="#444"/><rect x="500" y="270" width="50" height="40" rx="4" fill="#444"/>
  `),
  fuel_tank: () => wrap('油箱', `
    <path d="M200 280 Q200 180 400 160 Q600 180 600 280 Q600 380 400 400 Q200 380 200 280" fill="#1a1a1a" stroke="#333" stroke-width="3"/>
    <rect x="380" y="140" width="40" height="50" rx="4" fill="url(#metal)" stroke="#888"/>
    <ellipse cx="400" cy="280" rx="150" ry="60" fill="#222" opacity="0.5"/>
  `),
  fuel_pump: () => wrap('燃油泵', `
    <circle cx="400" cy="300" r="60" fill="url(#metalDark)" stroke="#555"/>
    <rect x="370" y="180" width="60" height="80" rx="6" fill="#333"/>
    <rect x="385" y="360" width="30" height="80" fill="url(#metal)"/>
    <path d="M350 300 L250 300" stroke="#666" stroke-width="6"/>
  `),
  fuel_filter: () => wrap('燃油滤清器', `
    <rect x="340" y="160" width="120" height="240" rx="20" fill="url(#metal)" stroke="#888" stroke-width="2"/>
    <rect x="355" y="180" width="90" height="200" rx="12" fill="#fff" stroke="#ddd"/>
    <line x1="370" y1="200" x2="430" y2="200" stroke="#ccc"/><line x1="370" y1="240" x2="430" y2="240" stroke="#ccc"/>
    <line x1="370" y1="280" x2="430" y2="280" stroke="#ccc"/>
  `),
  fuel_rail: () => wrap('燃油轨', `
    <rect x="180" y="260" width="440" height="40" rx="8" fill="url(#metalDark)" stroke="#555"/>
    ${[220, 300, 380, 460, 540].map((x) => `<rect x="${x}" y="200" width="24" height="60" rx="4" fill="#444"/>`).join('')}
    <rect x="160" y="270" width="40" height="20" rx="4" fill="#666"/><rect x="600" y="270" width="40" height="20" rx="4" fill="#c62828"/>
  `),
  charcoal_canister: () => wrap('碳罐', `
    <rect x="280" y="200" width="240" height="160" rx="16" fill="#333" stroke="#555" stroke-width="2"/>
    <rect x="300" y="220" width="200" height="120" rx="8" fill="#444"/>
    <rect x="320" y="360" width="40" height="40" rx="4" fill="url(#metal)"/>
    <rect x="440" y="360" width="40" height="40" rx="4" fill="url(#metal)"/>
  `),
  fuel_pressure_regulator: () => wrap('燃油压力调节器', `
    <rect x="320" y="240" width="160" height="100" rx="8" fill="url(#metalDark)" stroke="#555"/>
    <circle cx="400" cy="290" r="30" fill="#555" stroke="#777"/>
    <rect x="200" y="275" width="120" height="30" rx="6" fill="#666"/>
    <path d="M480 290 L580 290" stroke="#888" stroke-width="8"/>
  `),
  catalytic_converter: () => wrap('三元催化器', `
    <ellipse cx="400" cy="280" rx="180" ry="50" fill="url(#metal)" stroke="#777" stroke-width="3"/>
    <ellipse cx="400" cy="280" rx="150" ry="38" fill="#b8860b" opacity="0.6"/>
    <rect x="160" y="265" width="60" height="30" rx="6" fill="#666"/><rect x="580" y="265" width="60" height="30" rx="6" fill="#666"/>
    <path d="M220 280 L580 280" stroke="#888" stroke-width="4" opacity="0.3"/>
  `),
  exhaust_pipe: () => wrap('排气管', `
    <path d="M120 300 Q300 200 500 280 T680 220" fill="none" stroke="url(#metalDark)" stroke-width="28" stroke-linecap="round"/>
    <path d="M120 300 Q300 200 500 280 T680 220" fill="none" stroke="url(#metal)" stroke-width="16" stroke-linecap="round"/>
    <ellipse cx="120" cy="300" rx="20" ry="20" fill="#555"/><ellipse cx="680" cy="220" rx="20" ry="20" fill="#555"/>
  `),
  muffler: () => wrap('消音器', `
    <ellipse cx="400" cy="280" rx="200" ry="55" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <ellipse cx="400" cy="280" rx="170" ry="42" fill="#444"/>
    <rect x="160" y="265" width="50" height="30" rx="6" fill="#666"/><rect x="590" y="265" width="50" height="30" rx="6" fill="#666"/>
  `),
  resonator: () => wrap('排气共鸣器', `
    <ellipse cx="400" cy="280" rx="140" ry="45" fill="url(#metal)" stroke="#777"/>
    <ellipse cx="400" cy="280" rx="110" ry="32" fill="#555"/>
    <rect x="220" y="268" width="360" height="24" rx="12" fill="none" stroke="#888" stroke-width="4"/>
  `),
  expansion_tank: () => wrap('膨胀水箱', `
    <path d="M300 200 L500 200 L520 380 L280 380 Z" fill="#fff" stroke="#ccc" stroke-width="2" opacity="0.9"/>
    <rect x="320" y="240" width="160" height="100" rx="4" fill="#4fc3f7" opacity="0.4"/>
    <rect x="370" y="160" width="60" height="50" rx="6" fill="#333" stroke="#555"/>
    <circle cx="480" cy="220" r="8" fill="#c62828"/>
  `),
  heater_core: () => wrap('暖风水箱', `
    <rect x="260" y="200" width="280" height="180" rx="8" fill="url(#metal)" stroke="#777"/>
    ${Array.from({ length: 14 }, (_, i) => `<line x1="${280 + i * 18}" y1="210" x2="${280 + i * 18}" y2="370" stroke="#aaa" stroke-width="2"/>`).join('')}
    <rect x="220" y="270" width="40" height="40" rx="4" fill="#666"/><rect x="540" y="270" width="40" height="40" rx="4" fill="#666"/>
  `),
  oil_filter: () => wrap('机油滤清器', `
    <rect x="350" y="140" width="100" height="260" rx="50" fill="url(#metal)" stroke="#888" stroke-width="2"/>
    <rect x="365" y="160" width="70" height="220" rx="35" fill="#fff" stroke="#ddd"/>
    <rect x="385" y="400" width="30" height="40" fill="#666"/>
  `),
  oil_cooler: () => wrap('机油冷却器', `
    <rect x="280" y="220" width="240" height="120" rx="8" fill="url(#metal)" stroke="#777"/>
    ${Array.from({ length: 10 }, (_, i) => `<line x1="${300 + i * 22}" y1="230" x2="${300 + i * 22}" y2="330" stroke="#bbb"/>`).join('')}
    <circle cx="250" cy="280" r="25" fill="#555"/><circle cx="550" cy="280" r="25" fill="#555"/>
  `),
  half_shaft: () => wrap('半轴', `
    <rect x="200" y="275" width="400" height="30" rx="8" fill="url(#metalDark)" stroke="#555"/>
    <circle cx="200" cy="290" r="35" fill="url(#metal)" stroke="#777"/>
    <path d="M600 290 L650 250 L650 330 Z" fill="url(#metal)" stroke="#666"/>
    <path d="M520 260 Q560 290 520 320" fill="none" stroke="#888" stroke-width="12"/>
  `),
  drive_shaft: () => wrap('传动轴', `
    <rect x="180" y="270" width="440" height="40" rx="10" fill="url(#metalDark)" stroke="#555"/>
    <circle cx="200" cy="290" r="30" fill="#555"/><circle cx="600" cy="290" r="30" fill="#555"/>
    <rect x="380" y="250" width="40" height="80" rx="4" fill="#666"/>
  `),
  differential: () => wrap('差速器', `
    <ellipse cx="400" cy="300" rx="160" ry="80" fill="url(#castIron)" stroke="#444" stroke-width="2"/>
    <circle cx="280" cy="300" r="35" fill="#555" stroke="#777"/><circle cx="520" cy="300" r="35" fill="#555" stroke="#777"/>
    <circle cx="400" cy="300" r="50" fill="#333" stroke="#666"/>
  `),
  transfer_case: () => wrap('分动箱', `
    <rect x="260" y="220" width="280" height="140" rx="10" fill="url(#castIron)" stroke="#333"/>
    <circle cx="320" cy="290" r="30" fill="#555"/><circle cx="480" cy="290" r="30" fill="#555"/>
    <rect x="370" y="250" width="60" height="80" fill="#444"/>
    <path d="M200 290 L260 290 M540 290 L600 290" stroke="#666" stroke-width="8"/>
  `),
  propeller_shaft: () => wrap('传动轴', `
    <rect x="150" y="275" width="500" height="35" rx="8" fill="url(#metal)" stroke="#777"/>
    <circle cx="180" cy="292" r="28" fill="#555"/><circle cx="620" cy="292" r="28" fill="#555"/>
    <g transform="translate(400,292)"><rect x="-20" y="-50" width="40" height="100" rx="4" fill="#666"/></g>
  `),
  brake_booster: () => wrap('真空助力器', `
    <circle cx="400" cy="300" r="100" fill="#333" stroke="#555" stroke-width="2"/>
    <circle cx="400" cy="300" r="70" fill="#444"/>
    <rect x="500" y="270" width="80" height="60" rx="6" fill="url(#metalDark)"/>
    <rect x="220" y="285" width="60" height="30" rx="4" fill="#666"/>
  `),
  abs_pump: () => wrap('ABS泵', `
    <rect x="260" y="200" width="280" height="180" rx="10" fill="url(#metalDark)" stroke="#555"/>
    <rect x="290" y="230" width="80" height="120" fill="#333"/><rect x="430" y="230" width="80" height="120" fill="#333"/>
    ${[300, 340, 380, 420, 460].map((x) => `<rect x="${x}" y="360" width="24" height="20" fill="#c62828"/>`).join('')}
  `),
  brake_drum: () => wrap('刹车鼓', `
    <circle cx="400" cy="280" r="130" fill="url(#metal)" stroke="#777" stroke-width="4"/>
    <circle cx="400" cy="280" r="90" fill="#333" stroke="#666"/>
    <circle cx="400" cy="280" r="35" fill="#222"/>
  `),
  brake_shoe: () => wrap('刹车蹄', `
    <path d="M280 320 Q400 200 520 320 Q400 400 280 320" fill="#c45c26" stroke="#a04020"/>
    <path d="M300 310 Q400 230 500 310 Q400 360 300 310" fill="#333"/>
    <circle cx="400" cy="280" r="60" fill="none" stroke="#999" stroke-width="4" opacity="0.5"/>
  `),
  parking_brake: () => wrap('手刹机构', `
    <rect x="350" y="180" width="100" height="200" rx="8" fill="#333" stroke="#555"/>
    <path d="M400 380 L400 450" stroke="#666" stroke-width="4"/>
    <path d="M300 400 Q400 350 500 400" fill="none" stroke="#888" stroke-width="3"/>
    <circle cx="400" cy="160" r="25" fill="url(#metal)"/>
  `),
  steering_rack: () => wrap('转向机', `
    <rect x="180" y="270" width="440" height="60" rx="8" fill="url(#metalDark)" stroke="#555"/>
    <rect x="360" y="240" width="80" height="120" rx="6" fill="#444"/>
    <path d="M200 300 L120 300 M680 300 L600 300" stroke="url(#metal)" stroke-width="12"/>
    <circle cx="120" cy="300" r="20" fill="#555"/><circle cx="680" cy="300" r="20" fill="#555"/>
  `),
  power_steering_pump: () => wrap('转向助力泵', `
    <circle cx="300" cy="280" r="55" fill="url(#metal)" stroke="#777"/>
    <rect x="340" y="230" width="200" height="100" rx="8" fill="url(#metalDark)" stroke="#555"/>
    <line x1="360" y1="250" x2="520" y2="250" stroke="#666"/><line x1="360" y1="280" x2="520" y2="280" stroke="#666"/>
    <line x1="360" y1="310" x2="520" y2="310" stroke="#666"/>
  `),
  steering_column: () => wrap('转向管柱', `
    <rect x="385" y="120" width="30" height="320" rx="4" fill="url(#metalDark)" stroke="#555"/>
    <ellipse cx="400" cy="120" rx="60" ry="25" fill="#333" stroke="#555"/>
    <rect x="340" y="400" width="120" height="40" rx="6" fill="#444"/>
    <circle cx="400" cy="250" r="40" fill="none" stroke="#888" stroke-width="2" stroke-dasharray="6 4"/>
  `),
  power_steering_hose: () => wrap('助力油管', `
    <path d="M150 350 Q300 180 450 300 T650 200" fill="none" stroke="#333" stroke-width="16" stroke-linecap="round"/>
    <path d="M150 350 Q300 180 450 300 T650 200" fill="none" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
    <circle cx="150" cy="350" r="12" fill="url(#metal)"/><circle cx="650" cy="200" r="12" fill="url(#metal)"/>
  `),
  coil_spring: () => wrap('螺旋弹簧', `
    <path d="M360 400 Q380 360 400 400 Q420 360 440 400 Q420 320 400 360 Q380 320 360 360 Q380 280 400 320 Q420 280 440 320 Q420 240 400 280 Q380 240 360 280 Q380 200 400 240 Q420 200 440 240 Q420 160 400 200" fill="none" stroke="url(#metal)" stroke-width="8"/>
    <rect x="370" y="400" width="60" height="30" rx="4" fill="#666"/>
  `),
  strut_mount: () => wrap('减震顶胶', `
    <circle cx="400" cy="320" r="80" fill="#1a1a1a" stroke="#444" stroke-width="2"/>
    <circle cx="400" cy="320" r="40" fill="#333"/>
    <rect x="385" y="180" width="30" height="100" fill="url(#metal)"/>
    <ellipse cx="400" cy="180" rx="70" ry="20" fill="url(#metalDark)" stroke="#555"/>
  `),
  subframe: () => wrap('副车架', `
    <path d="M200 300 L400 220 L600 300 L600 380 L200 380 Z" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <rect x="240" y="320" width="80" height="40" fill="#444"/><rect x="480" y="320" width="80" height="40" fill="#444"/>
    <line x1="400" y1="220" x2="400" y2="380" stroke="#666" stroke-width="4"/>
  `),
  hub: () => wrap('轮毂', `
    <circle cx="400" cy="280" r="120" fill="url(#metal)" stroke="#888" stroke-width="3"/>
    <circle cx="400" cy="280" r="50" fill="#333"/>
    ${[0, 60, 120, 180, 240, 300].map((deg) => {
      const r = 85;
      const x = 400 + r * Math.cos((deg * Math.PI) / 180);
      const y = 280 + r * Math.sin((deg * Math.PI) / 180);
      return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="12" fill="#555" stroke="#777"/>`;
    }).join('')}
  `),
  tire: () => wrap('轮胎', `
    <circle cx="400" cy="280" r="130" fill="#1a1a1a" stroke="#333" stroke-width="8"/>
    <circle cx="400" cy="280" r="90" fill="#333"/>
    <path d="M270 280 Q400 200 530 280 Q400 360 270 280" fill="none" stroke="#444" stroke-width="2"/>
    <text x="400" y="290" font-size="20" fill="#666" text-anchor="middle">205/55R16</text>
  `),
  tpms_sensor: () => wrap('胎压传感器', `
    <rect x="360" y="200" width="80" height="50" rx="6" fill="#333" stroke="#555"/>
    <circle cx="400" cy="320" r="15" fill="url(#metal)"/>
    <rect x="392" y="250" width="16" height="70" fill="#666"/>
    <path d="M380 180 L420 180 L410 200 L390 200 Z" fill="#c62828"/>
  `),
  relay: () => wrap('继电器', `
    <rect x="320" y="220" width="160" height="140" rx="6" fill="#222" stroke="#444"/>
    <rect x="340" y="240" width="50" height="100" fill="#333"/>
    <rect x="410" y="240" width="50" height="100" fill="#333"/>
    <text x="400" y="300" font-size="14" fill="#888" text-anchor="middle">RELAY</text>
  `),
  ecu: () => wrap('发动机ECU', `
    <rect x="260" y="200" width="280" height="180" rx="8" fill="#1a1a1a" stroke="#333" stroke-width="2"/>
    <rect x="280" y="220" width="240" height="140" rx="4" fill="#222"/>
    ${Array.from({ length: 24 }, (_, i) => `<rect x="${290 + (i % 8) * 28}" y="${230 + Math.floor(i / 8) * 40}" width="20" height="8" fill="#c62828"/>`).join('')}
    <text x="400" y="310" font-size="16" fill="#666" text-anchor="middle">ECU</text>
  `),
  tail_light: () => wrap('尾灯', `
    <path d="M280 200 L520 200 L540 380 L260 380 Z" fill="#8b0000" stroke="#333" stroke-width="2"/>
    <circle cx="340" cy="290" r="35" fill="#ff5252" opacity="0.8"/><circle cx="460" cy="290" r="25" fill="#fff" opacity="0.9"/>
    <rect x="300" y="220" width="180" height="40" rx="4" fill="#ffeb3b" opacity="0.7"/>
  `),
  fog_light: () => wrap('雾灯', `
    <circle cx="400" cy="280" r="70" fill="#fffde7" stroke="#ffc107" stroke-width="4"/>
    <circle cx="400" cy="280" r="45" fill="#ffeb3b" opacity="0.6"/>
    <rect x="320" y="360" width="160" height="40" rx="8" fill="#333"/>
  `),
  horn: () => wrap('喇叭', `
    <path d="M300 280 L380 220 L480 220 L560 280 L480 340 L380 340 Z" fill="url(#metal)" stroke="#777"/>
    <circle cx="280" cy="280" r="30" fill="#333"/>
    <path d="M560 280 L620 260 L620 300 Z" fill="#666"/>
  `),
  window_motor: () => wrap('车窗电机', `
    <rect x="300" y="240" width="200" height="120" rx="8" fill="#333" stroke="#555"/>
    <circle cx="400" cy="300" r="40" fill="#444" stroke="#666"/>
    <rect x="380" y="360" width="40" height="50" fill="url(#metal)"/>
    <path d="M250 300 L300 300" stroke="#888" stroke-width="6"/>
  `),
  instrument_cluster: () => wrap('组合仪表', `
    <path d="M200 350 Q400 120 600 350 L580 400 L220 400 Z" fill="#111" stroke="#333" stroke-width="2"/>
    <circle cx="300" cy="300" r="55" fill="#222" stroke="#666"/><circle cx="500" cy="300" r="55" fill="#222" stroke="#666"/>
    <rect x="350" y="280" width="100" height="40" rx="4" fill="#1a1a1a"/>
  `),
  backup_camera: () => wrap('倒车影像', `
    <rect x="320" y="240" width="160" height="100" rx="8" fill="#111" stroke="#333"/>
    <circle cx="400" cy="290" r="35" fill="#1a237e" stroke="#666"/>
    <circle cx="400" cy="290" r="20" fill="#333"/>
    <rect x="360" y="340" width="80" height="30" rx="4" fill="#444"/>
  `),
  parking_sensor: () => wrap('倒车雷达', `
    <circle cx="400" cy="280" r="25" fill="#333" stroke="#555" stroke-width="2"/>
    <circle cx="400" cy="280" r="12" fill="#1a1a1a"/>
    <path d="M400 255 L400 220 M385 265 L360 240 M415 265 L440 240" stroke="#666" stroke-width="2"/>
    <rect x="280" y="320" width="240" height="20" rx="10" fill="#444"/>
  `),
  ac_compressor: () => wrap('空调压缩机', `
    <circle cx="280" cy="280" r="50" fill="url(#metal)" stroke="#777"/>
    <rect x="310" y="230" width="220" height="100" rx="8" fill="url(#metalDark)" stroke="#555"/>
    <rect x="540" y="260" width="60" height="40" rx="4" fill="#444"/>
    <path d="M330 250 L500 250 L500 310 L330 310 Z" fill="#555" opacity="0.5"/>
  `),
  ac_condenser: () => wrap('空调冷凝器', `
    <rect x="200" y="180" width="400" height="200" rx="6" fill="#888" stroke="#999"/>
    ${Array.from({ length: 18 }, (_, i) => `<line x1="${220 + i * 20}" y1="190" x2="${220 + i * 20}" y2="370" stroke="#bbb" stroke-width="2"/>`).join('')}
    <rect x="180" y="260" width="30" height="40" fill="#555"/><rect x="590" y="260" width="30" height="40" fill="#555"/>
  `),
  evaporator: () => wrap('蒸发器', `
    <rect x="240" y="200" width="320" height="160" rx="6" fill="url(#metal)" stroke="#777"/>
    ${Array.from({ length: 14 }, (_, i) => `<line x1="${260 + i * 22}" y1="210" x2="${260 + i * 22}" y2="350" stroke="#ccc"/>`).join('')}
    <rect x="300" y="360" width="200" height="30" rx="4" fill="#4fc3f7" opacity="0.3"/>
  `),
  expansion_valve: () => wrap('膨胀阀', `
    <rect x="340" y="240" width="120" height="100" rx="6" fill="url(#metalDark)" stroke="#555"/>
    <path d="M360 290 L440 290 M400 260 L400 320" stroke="#888" stroke-width="4"/>
    <rect x="280" y="275" width="60" height="30" rx="4" fill="#666"/><rect x="460" y="275" width="60" height="30" rx="4" fill="#666"/>
  `),
  cabin_air_filter: () => wrap('空调滤芯', `
    <rect x="260" y="180" width="280" height="220" rx="12" fill="#fff" stroke="#ddd" stroke-width="2"/>
    ${Array.from({ length: 16 }, (_, i) => `<line x1="${280 + i * 16}" y1="200" x2="${280 + i * 16}" y2="380" stroke="#e0d0c0" stroke-width="3"/>`).join('')}
    <rect x="300" y="400" width="200" height="30" rx="4" fill="#333"/>
  `),
  blower_motor: () => wrap('鼓风机', `
    <circle cx="400" cy="280" r="35" fill="#333"/>
    <g transform="translate(400,280)">
      ${[0, 72, 144, 216, 288].map((d) => `<path d="M0 -70 L12 -20 L0 -10 L-12 -20 Z" fill="#555" transform="rotate(${d})"/>`).join('')}
    </g>
    <rect x="340" y="320" width="120" height="60" rx="6" fill="url(#metalDark)" stroke="#555"/>
  `),
  seat_belt: () => wrap('安全带', `
    <rect x="360" y="160" width="80" height="50" rx="6" fill="#333" stroke="#555"/>
    <path d="M400 210 L400 420" stroke="#c62828" stroke-width="14" stroke-linecap="round"/>
    <rect x="370" y="400" width="60" height="40" rx="4" fill="url(#metal)"/>
  `),
  airbag: () => wrap('安全气囊', `
    <circle cx="400" cy="280" r="90" fill="#fff" stroke="#ddd" stroke-width="2"/>
    <path d="M400 190 Q320 280 400 370 Q480 280 400 190" fill="#f5f5f5" stroke="#ccc"/>
    <text x="400" y="290" font-size="18" fill="#999" text-anchor="middle">AIRBAG</text>
  `),
  airbag_sensor: () => wrap('气囊传感器', `
    <rect x="330" y="240" width="140" height="80" rx="6" fill="#333" stroke="#555"/>
    <rect x="360" y="260" width="80" height="40" fill="#222"/>
    <path d="M250 280 L330 280 M470 280 L550 280" stroke="#666" stroke-width="3"/>
    <circle cx="400" cy="200" r="20" fill="url(#metal)"/>
  `),
  abs_control_unit: () => wrap('ESP控制单元', `
    <rect x="270" y="210" width="260" height="160" rx="8" fill="url(#metalDark)" stroke="#555"/>
    <text x="400" y="290" font-size="20" fill="#ccc" text-anchor="middle">ESP/ABS</text>
    ${[290, 330, 370, 410, 450, 490].map((x) => `<rect x="${x}" y="340" width="20" height="16" fill="#333"/>`).join('')}
  `),
};
