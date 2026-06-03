/**
 * 每个零部件独立的写实风格 SVG 插图
 * 采用产品图/维修手册风格的金属质感与真实外形
 */

function wrap(label, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eef1f5"/>
      <stop offset="100%" stop-color="#d8dde4"/>
    </linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f0f0f0"/>
      <stop offset="40%" stop-color="#c8c8c8"/>
      <stop offset="100%" stop-color="#8a8a8a"/>
    </linearGradient>
    <linearGradient id="metalDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9e9e9e"/>
      <stop offset="100%" stop-color="#5a5a5a"/>
    </linearGradient>
    <linearGradient id="castIron" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6d6d6d"/>
      <stop offset="50%" stop-color="#4a4a4a"/>
      <stop offset="100%" stop-color="#333"/>
    </linearGradient>
    <linearGradient id="rubber" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#111"/>
    </linearGradient>
    <radialGradient id="shadow" cx="50%" cy="80%" r="40%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <ellipse cx="400" cy="480" rx="220" ry="30" fill="url(#shadow)"/>
  <g filter="url(#softShadow)">${body}</g>
  <text x="400" y="560" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="22" fill="#555" text-anchor="middle">${label}</text>
</svg>`;
}

const DRAWINGS = {
  engine_block: () => wrap('发动机缸体', `
    <!-- V型缸体俯视 -->
    <path d="M220 180 L580 180 L600 220 L600 380 L580 420 L220 420 L200 380 L200 220 Z" fill="url(#castIron)" stroke="#222" stroke-width="2"/>
    <path d="M240 200 L360 200 L360 400 L240 400 Z" fill="#3a3a3a" stroke="#555" stroke-width="1"/>
    <path d="M440 200 L560 200 L560 400 L440 400 Z" fill="#3a3a3a" stroke="#555" stroke-width="1"/>
    <circle cx="300" cy="260" r="28" fill="#1a1a1a" stroke="#666" stroke-width="2"/>
    <circle cx="300" cy="340" r="28" fill="#1a1a1a" stroke="#666" stroke-width="2"/>
    <circle cx="500" cy="260" r="28" fill="#1a1a1a" stroke="#666" stroke-width="2"/>
    <circle cx="500" cy="340" r="28" fill="#1a1a1a" stroke="#666" stroke-width="2"/>
    <rect x="370" y="240" width="60" height="120" rx="4" fill="#555" stroke="#777"/>
    <path d="M200 300 L160 280 L160 320 Z" fill="#444"/>
    <path d="M600 300 L640 280 L640 320 Z" fill="#444"/>
    <text x="400" y="155" font-size="14" fill="#666" text-anchor="middle">气缸孔</text>
  `),

  piston: () => wrap('活塞', `
    <!-- 活塞侧面剖视 -->
    <rect x="330" y="120" width="140" height="200" rx="8" fill="url(#metal)" stroke="#888" stroke-width="2"/>
    <rect x="335" y="160" width="130" height="8" fill="#aaa" stroke="#999"/>
    <rect x="335" y="180" width="130" height="8" fill="#aaa" stroke="#999"/>
    <rect x="335" y="200" width="130" height="8" fill="#aaa" stroke="#999"/>
    <ellipse cx="400" cy="120" rx="70" ry="18" fill="url(#metal)" stroke="#888" stroke-width="2"/>
    <ellipse cx="400" cy="320" rx="65" ry="15" fill="#777" stroke="#666"/>
    <circle cx="400" cy="260" r="12" fill="#444" stroke="#666" stroke-width="2"/>
    <rect x="396" y="260" width="8" height="80" fill="#555"/>
    <rect x="370" y="340" width="60" height="30" rx="4" fill="url(#metalDark)"/>
    <text x="480" y="200" font-size="13" fill="#666">活塞环</text>
    <text x="480" y="270" font-size="13" fill="#666">活塞销</text>
  `),

  crankshaft: () => wrap('曲轴', `
    <!-- 曲轴侧面 -->
    <g transform="translate(400,300)">
      <rect x="-240" y="-12" width="480" height="24" rx="12" fill="url(#metalDark)"/>
      <circle cx="-180" cy="0" r="45" fill="url(#metal)" stroke="#666" stroke-width="2"/>
      <circle cx="-180" cy="0" r="20" fill="#444"/>
      <circle cx="-60" cy="0" r="45" fill="url(#metal)" stroke="#666" stroke-width="2"/>
      <circle cx="-60" cy="55" r="30" fill="url(#metal)" stroke="#666" stroke-width="2"/>
      <circle cx="60" cy="0" r="45" fill="url(#metal)" stroke="#666" stroke-width="2"/>
      <circle cx="60" cy="-55" r="30" fill="url(#metal)" stroke="#666" stroke-width="2"/>
      <circle cx="180" cy="0" r="45" fill="url(#metal)" stroke="#666" stroke-width="2"/>
      <circle cx="180" cy="0" r="20" fill="#444"/>
      <line x1="-60" y1="0" x2="-60" y2="55" stroke="#888" stroke-width="16"/>
      <line x1="60" y1="0" x2="60" y2="-55" stroke="#888" stroke-width="16"/>
    </g>
    <text x="400" y="130" font-size="14" fill="#666" text-anchor="middle">曲柄 + 平衡块</text>
  `),

  camshaft: () => wrap('凸轮轴', `
    <rect x="120" y="280" width="560" height="20" rx="10" fill="url(#metalDark)"/>
    <ellipse cx="180" cy="270" rx="18" ry="28" fill="url(#metal)" stroke="#777"/>
    <ellipse cx="260" cy="310" rx="18" ry="28" fill="url(#metal)" stroke="#777"/>
    <ellipse cx="340" cy="270" rx="18" ry="28" fill="url(#metal)" stroke="#777"/>
    <ellipse cx="420" cy="310" rx="18" ry="28" fill="url(#metal)" stroke="#777"/>
    <ellipse cx="500" cy="270" rx="18" ry="28" fill="url(#metal)" stroke="#777"/>
    <ellipse cx="580" cy="310" rx="18" ry="28" fill="url(#metal)" stroke="#777"/>
    <circle cx="120" cy="290" r="25" fill="url(#metal)" stroke="#666" stroke-width="2"/>
    <circle cx="680" cy="290" r="20" fill="#555" stroke="#777" stroke-width="2"/>
    <path d="M680 270 L720 250 L720 330 L680 310 Z" fill="#666"/>
    <text x="400" y="180" font-size="14" fill="#666" text-anchor="middle">凸轮凸角（控制气门开闭）</text>
  `),

  spark_plug: () => wrap('火花塞', `
    <!-- 火花塞 -->
    <rect x="370" y="80" width="60" height="100" rx="4" fill="#f5f5f5" stroke="#ccc" stroke-width="2"/>
    <path d="M355 180 L445 180 L435 220 L365 220 Z" fill="url(#metal)" stroke="#888"/>
    <rect x="385" y="220" width="30" height="80" fill="url(#metalDark)" stroke="#666"/>
    <path d="M380 300 L420 300 L415 340 L385 340 Z" fill="#888" stroke="#666"/>
    <rect x="392" y="340" width="16" height="60" fill="#bbb" stroke="#999"/>
    <line x1="400" y1="400" x2="400" y2="430" stroke="#666" stroke-width="3"/>
    <path d="M388 430 L400 450 L412 430 Z" fill="#888"/>
    <rect x="350" y="90" width="20" height="30" rx="2" fill="#333"/>
    <text x="480" y="150" font-size="13" fill="#666">陶瓷绝缘体</text>
    <text x="480" y="280" font-size="13" fill="#666">螺纹</text>
    <text x="480" y="420" font-size="13" fill="#666">电极</text>
  `),

  air_filter: () => wrap('空气滤清器', `
    <rect x="220" y="160" width="360" height="220" rx="16" fill="#222" stroke="#444" stroke-width="3"/>
    <rect x="240" y="180" width="320" height="180" rx="8" fill="#e8dcc8" stroke="#c4b896"/>
    <line x1="260" y1="190" x2="260" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="285" y1="190" x2="285" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="310" y1="190" x2="310" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="335" y1="190" x2="335" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="360" y1="190" x2="360" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="385" y1="190" x2="385" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="410" y1="190" x2="410" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="435" y1="190" x2="435" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="460" y1="190" x2="460" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="485" y1="190" x2="485" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="510" y1="190" x2="510" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <line x1="535" y1="190" x2="535" y2="350" stroke="#d4c4a8" stroke-width="3"/>
    <circle cx="280" cy="270" r="30" fill="#333" stroke="#555" stroke-width="2"/>
    <text x="400" y="130" font-size="14" fill="#666" text-anchor="middle">褶皱滤纸滤芯</text>
  `),

  fuel_injector: () => wrap('喷油嘴', `
    <rect x="360" y="100" width="80" height="60" rx="6" fill="#333" stroke="#555" stroke-width="2"/>
    <rect x="375" y="70" width="50" height="30" rx="4" fill="#444" stroke="#666"/>
    <rect x="385" y="160" width="30" height="100" rx="4" fill="url(#metalDark)" stroke="#666"/>
    <path d="M375 260 L425 260 L420 300 L380 300 Z" fill="url(#metal)" stroke="#888"/>
    <path d="M388 300 L412 300 L408 340 L392 340 Z" fill="#888"/>
    <line x1="400" y1="340" x2="400" y2="380" stroke="#666" stroke-width="4"/>
    <circle cx="400" cy="390" r="6" fill="#999"/>
    <path d="M390 395 Q400 420 410 395" fill="none" stroke="#4fc3f7" stroke-width="2" opacity="0.7"/>
    <path d="M385 400 Q400 430 415 400" fill="none" stroke="#4fc3f7" stroke-width="1.5" opacity="0.5"/>
    <text x="480" y="200" font-size="13" fill="#666">电磁线圈</text>
    <text x="480" y="320" font-size="13" fill="#666">喷油嘴</text>
  `),

  turbocharger: () => wrap('涡轮增压器', `
    <!-- 涡轮增压器 -->
    <circle cx="320" cy="280" r="90" fill="url(#metal)" stroke="#666" stroke-width="3"/>
    <circle cx="320" cy="280" r="70" fill="#444" stroke="#888" stroke-width="2"/>
    <circle cx="320" cy="280" r="15" fill="#666"/>
    <path d="M320 190 L320 130 L280 110 L360 110 Z" fill="url(#metalDark)" stroke="#555"/>
    <path d="M410 280 C480 220 520 240 540 280 C520 320 480 340 410 280" fill="url(#castIron)" stroke="#444" stroke-width="2"/>
    <circle cx="500" cy="280" r="55" fill="url(#metal)" stroke="#666" stroke-width="2"/>
    <circle cx="500" cy="280" r="38" fill="#555"/>
    <path d="M555 280 L620 260 L620 300 Z" fill="#666"/>
    <path d="M230 280 L170 260 L170 300 Z" fill="#666"/>
    <text x="320" y="400" font-size="13" fill="#666" text-anchor="middle">压气机</text>
    <text x="500" y="400" font-size="13" fill="#666" text-anchor="middle">涡轮</text>
  `),

  brake_disc: () => wrap('刹车盘', `
    <circle cx="400" cy="270" r="150" fill="url(#metal)" stroke="#777" stroke-width="4"/>
    <circle cx="400" cy="270" r="50" fill="#555" stroke="#666" stroke-width="2"/>
    <circle cx="400" cy="270" r="20" fill="#333"/>
    <circle cx="400" cy="150" r="8" fill="#888"/>
    <circle cx="400" cy="390" r="8" fill="#888"/>
    <circle cx="280" cy="270" r="8" fill="#888"/>
    <circle cx="520" cy="270" r="8" fill="#888"/>
    <circle cx="330" cy="180" r="8" fill="#888"/>
    <circle cx="470" cy="180" r="8" fill="#888"/>
    <circle cx="330" cy="360" r="8" fill="#888"/>
    <circle cx="470" cy="360" r="8" fill="#888"/>
    <path d="M350 270 A50 50 0 0 1 450 270" fill="none" stroke="#999" stroke-width="20" opacity="0.3"/>
    <text x="400" y="460" font-size="13" fill="#666" text-anchor="middle">通风打孔刹车盘</text>
  `),

  brake_pad: () => wrap('刹车片', `
    <path d="M250 320 Q400 180 550 320 L530 380 Q400 260 270 380 Z" fill="#333" stroke="#222" stroke-width="2"/>
    <path d="M270 330 Q400 210 530 330 L515 365 Q400 255 285 365 Z" fill="#c45c26" stroke="#a04020" stroke-width="1"/>
    <rect x="370" y="370" width="60" height="15" rx="3" fill="url(#metal)" stroke="#888"/>
    <rect x="355" y="385" width="90" height="25" rx="4" fill="#555" stroke="#666"/>
    <text x="400" y="150" font-size="14" fill="#666" text-anchor="middle">摩擦材料（橙色）</text>
    <text x="400" y="450" font-size="13" fill="#666" text-anchor="middle">背板 + 消音片</text>
  `),

  brake_caliper: () => wrap('刹车卡钳', `
    <circle cx="400" cy="280" r="100" fill="none" stroke="#999" stroke-width="8" opacity="0.5"/>
    <path d="M280 200 L520 200 L540 280 L520 360 L280 360 L260 280 Z" fill="#c62828" stroke="#8b0000" stroke-width="2"/>
    <rect x="300" y="220" width="40" height="120" rx="4" fill="#333" stroke="#555"/>
    <rect x="460" y="220" width="40" height="120" rx="4" fill="#333" stroke="#555"/>
    <circle cx="320" cy="280" r="18" fill="url(#metalDark)" stroke="#666"/>
    <circle cx="480" cy="280" r="18" fill="url(#metalDark)" stroke="#666"/>
    <rect x="370" y="260" width="60" height="40" rx="4" fill="#a02020"/>
    <text x="400" y="160" font-size="14" fill="#666" text-anchor="middle">红色制动卡钳</text>
  `),

  master_cylinder: () => wrap('制动总泵', `
    <rect x="300" y="200" width="200" height="80" rx="8" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <rect x="320" y="120" width="160" height="80" rx="8" fill="#333" stroke="#555" stroke-width="2"/>
    <rect x="330" y="130" width="140" height="60" rx="4" fill="#444"/>
    <circle cx="370" cy="160" r="8" fill="#888"/>
    <rect x="350" y="280" width="30" height="60" rx="4" fill="url(#metal)" stroke="#777"/>
    <rect x="420" y="280" width="30" height="60" rx="4" fill="url(#metal)" stroke="#777"/>
    <line x1="365" y1="340" x2="365" y2="400" stroke="#666" stroke-width="6"/>
    <line x1="435" y1="340" x2="435" y2="400" stroke="#666" stroke-width="6"/>
    <text x="400" y="100" font-size="13" fill="#666" text-anchor="middle">储液罐</text>
  `),

  brake_line: () => wrap('制动油管', `
    <path d="M150 350 Q250 200 400 280 T650 220" fill="none" stroke="#666" stroke-width="18" stroke-linecap="round"/>
    <path d="M150 350 Q250 200 400 280 T650 220" fill="none" stroke="#888" stroke-width="12" stroke-linecap="round"/>
    <path d="M150 350 Q250 200 400 280 T650 220" fill="none" stroke="url(#metal)" stroke-width="6"/>
    <circle cx="150" cy="350" r="15" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <circle cx="650" cy="220" r="15" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <path d="M130 340 L150 350 L140 370" fill="none" stroke="#555" stroke-width="3"/>
    <path d="M660 210 L650 220 L670 225" fill="none" stroke="#555" stroke-width="3"/>
    <text x="400" y="420" font-size="13" fill="#666" text-anchor="middle">金属制动硬管 / 软管</text>
  `),

  abs_sensor: () => wrap('ABS传感器', `
    <circle cx="400" cy="280" r="100" fill="none" stroke="#999" stroke-width="6"/>
    <rect x="480" y="250" width="80" height="30" rx="4" fill="#222" stroke="#444" stroke-width="2"/>
    <rect x="490" y="255" width="20" height="20" rx="2" fill="#555"/>
    <line x1="560" y1="265" x2="640" y2="200" stroke="#333" stroke-width="4"/>
    <line x1="560" y1="265" x2="640" y2="330" stroke="#333" stroke-width="3"/>
    <circle cx="400" cy="280" r="60" fill="none" stroke="#666" stroke-width="2" stroke-dasharray="8 4"/>
    <text x="400" y="420" font-size="13" fill="#666" text-anchor="middle">轮速磁感应传感器</text>
  `),

  shock_absorber: () => wrap('减震器', `
    <rect x="370" y="120" width="60" height="200" rx="6" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <rect x="355" y="320" width="90" height="80" rx="6" fill="#444" stroke="#666" stroke-width="2"/>
    <path d="M340 140 Q320 200 340 260 Q360 320 340 380" fill="none" stroke="#888" stroke-width="3"/>
    <path d="M460 140 Q480 200 460 260 Q440 320 460 380" fill="none" stroke="#888" stroke-width="3"/>
    <line x1="340" y1="160" x2="460" y2="160" stroke="#999" stroke-width="2"/>
    <line x1="335" y1="200" x2="465" y2="200" stroke="#999" stroke-width="2"/>
    <line x1="340" y1="240" x2="460" y2="240" stroke="#999" stroke-width="2"/>
    <line x1="335" y1="280" x2="465" y2="280" stroke="#999" stroke-width="2"/>
    <line x1="340" y1="320" x2="460" y2="320" stroke="#999" stroke-width="2"/>
    <rect x="385" y="400" width="30" height="40" rx="4" fill="url(#metal)" stroke="#777"/>
    <text x="520" y="250" font-size="13" fill="#666">螺旋弹簧</text>
  `),

  control_arm: () => wrap('控制臂', `
    <path d="M200 350 L400 200 L600 350" fill="none" stroke="url(#metalDark)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M200 350 L400 200 L600 350" fill="none" stroke="url(#metal)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="200" cy="350" r="25" fill="#333" stroke="#666" stroke-width="2"/>
    <circle cx="600" cy="350" r="25" fill="#333" stroke="#666" stroke-width="2"/>
    <circle cx="400" cy="200" r="20" fill="#444" stroke="#666" stroke-width="2"/>
    <circle cx="200" cy="350" r="10" fill="#666"/>
    <circle cx="600" cy="350" r="10" fill="#666"/>
    <text x="400" y="430" font-size="13" fill="#666" text-anchor="middle">A形下摆臂</text>
  `),

  ball_joint: () => wrap('球头', `
    <path d="M300 380 L300 280 Q300 220 360 200 L440 200 Q500 220 500 280 L500 380" fill="url(#rubber)" stroke="#111" stroke-width="2"/>
    <circle cx="400" cy="240" r="45" fill="url(#metal)" stroke="#777" stroke-width="2"/>
    <circle cx="400" cy="240" r="25" fill="#888"/>
    <rect x="370" y="120" width="60" height="80" rx="6" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <path d="M355 200 L445 200 L440 220 L360 220 Z" fill="#666"/>
    <text x="400" y="440" font-size="13" fill="#666" text-anchor="middle">球头销 + 防尘罩</text>
  `),

  tie_rod: () => wrap('转向拉杆', `
    <rect x="150" y="265" width="350" height="20" rx="10" fill="url(#metalDark)" stroke="#555"/>
    <path d="M500 275 L580 275" stroke="#888" stroke-width="4" stroke-dasharray="2 2"/>
    <path d="M580 240 Q620 275 580 310 Q540 275 580 240" fill="url(#metal)" stroke="#666" stroke-width="2"/>
    <circle cx="580" cy="275" r="12" fill="#555"/>
    <rect x="120" y="250" width="40" height="50" rx="6" fill="#444" stroke="#666" stroke-width="2"/>
    <circle cx="140" cy="275" r="8" fill="#666"/>
    <text x="400" y="200" font-size="13" fill="#666" text-anchor="middle">拉杆 + 转向球头</text>
  `),

  wheel_bearing: () => wrap('轮毂轴承', `
    <circle cx="400" cy="270" r="120" fill="url(#metal)" stroke="#777" stroke-width="3"/>
    <circle cx="400" cy="270" r="90" fill="#555" stroke="#666" stroke-width="2"/>
    <circle cx="400" cy="270" r="40" fill="#333"/>
    <circle cx="400" cy="150" r="12" fill="url(#metalDark)" stroke="#666"/>
    <circle cx="400" cy="390" r="12" fill="url(#metalDark)" stroke="#666"/>
    <circle cx="280" cy="270" r="12" fill="url(#metalDark)" stroke="#666"/>
    <circle cx="520" cy="270" r="12" fill="url(#metalDark)" stroke="#666"/>
    <circle cx="340" cy="190" r="10" fill="#888"/>
    <circle cx="460" cy="190" r="10" fill="#888"/>
    <circle cx="340" cy="350" r="10" fill="#888"/>
    <circle cx="460" cy="350" r="10" fill="#888"/>
    <text x="400" y="430" font-size="13" fill="#666" text-anchor="middle">双列滚珠轮毂轴承</text>
  `),

  stabilizer_bar: () => wrap('稳定杆', `
    <path d="M150 300 Q150 180 400 180 Q650 180 650 300" fill="none" stroke="url(#metalDark)" stroke-width="16" stroke-linecap="round"/>
    <path d="M150 300 Q150 180 400 180 Q650 180 650 300" fill="none" stroke="url(#metal)" stroke-width="10" stroke-linecap="round"/>
    <line x1="150" y1="300" x2="150" y2="380" stroke="url(#metalDark)" stroke-width="12" stroke-linecap="round"/>
    <line x1="650" y1="300" x2="650" y2="380" stroke="url(#metalDark)" stroke-width="12" stroke-linecap="round"/>
    <circle cx="150" cy="390" r="15" fill="#444" stroke="#666" stroke-width="2"/>
    <circle cx="650" cy="390" r="15" fill="#444" stroke="#666" stroke-width="2"/>
    <text x="400" y="450" font-size="13" fill="#666" text-anchor="middle">横向防倾稳定杆</text>
  `),

  battery: () => wrap('蓄电池', `
    <rect x="250" y="160" width="300" height="220" rx="8" fill="#1a1a1a" stroke="#333" stroke-width="3"/>
    <rect x="260" y="170" width="280" height="200" rx="4" fill="#222"/>
    <rect x="290" y="120" width="30" height="50" rx="4" fill="url(#metal)" stroke="#888" stroke-width="2"/>
    <rect x="480" y="120" width="30" height="50" rx="4" fill="url(#metal)" stroke="#888" stroke-width="2"/>
    <text x="305" y="155" font-size="16" fill="#c62828" font-weight="bold">+</text>
    <text x="495" y="155" font-size="16" fill="#333" font-weight="bold">−</text>
    <rect x="280" y="200" width="240" height="60" rx="4" fill="#333" stroke="#444"/>
    <text x="400" y="240" font-size="18" fill="#888" text-anchor="middle" font-weight="bold">12V 60Ah</text>
    <text x="400" y="420" font-size="13" fill="#666" text-anchor="middle">铅酸蓄电池</text>
  `),

  alternator: () => wrap('发电机', `
    <circle cx="280" cy="280" r="55" fill="url(#metal)" stroke="#777" stroke-width="2"/>
    <circle cx="280" cy="280" r="35" fill="#555"/>
    <rect x="310" y="220" width="250" height="120" rx="8" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <line x1="330" y1="240" x2="540" y2="240" stroke="#666" stroke-width="2"/>
    <line x1="330" y1="260" x2="540" y2="260" stroke="#666" stroke-width="2"/>
    <line x1="330" y1="280" x2="540" y2="280" stroke="#666" stroke-width="2"/>
    <line x1="330" y1="300" x2="540" y2="300" stroke="#666" stroke-width="2"/>
    <line x1="330" y1="320" x2="540" y2="320" stroke="#666" stroke-width="2"/>
    <rect x="560" y="250" width="40" height="60" rx="4" fill="#333" stroke="#555"/>
    <text x="400" y="400" font-size="13" fill="#666" text-anchor="middle">交流发电机</text>
  `),

  starter: () => wrap('起动机', `
    <rect x="280" y="230" width="200" height="100" rx="8" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <circle cx="480" cy="280" r="40" fill="url(#metal)" stroke="#666" stroke-width="2"/>
    <circle cx="480" cy="280" r="15" fill="#444"/>
    <rect x="200" y="250" width="80" height="60" rx="6" fill="#333" stroke="#555" stroke-width="2"/>
    <rect x="210" y="265" width="30" height="30" rx="4" fill="#444"/>
    <rect x="300" y="200" width="20" height="40" rx="2" fill="url(#metal)" stroke="#777"/>
    <rect x="440" y="200" width="20" height="40" rx="2" fill="url(#metal)" stroke="#777"/>
    <text x="400" y="400" font-size="13" fill="#666" text-anchor="middle">直流起动机</text>
  `),

  fuse_box: () => wrap('保险丝盒', `
    <rect x="220" y="140" width="360" height="240" rx="10" fill="#333" stroke="#555" stroke-width="2"/>
    <rect x="240" y="160" width="320" height="200" rx="6" fill="#444"/>
    <rect x="260" y="180" width="25" height="60" rx="2" fill="#c62828"/>
    <rect x="295" y="180" width="25" height="60" rx="2" fill="#1565c0"/>
    <rect x="330" y="180" width="25" height="60" rx="2" fill="#f9a825"/>
    <rect x="365" y="180" width="25" height="60" rx="2" fill="#2e7d32"/>
    <rect x="400" y="180" width="25" height="60" rx="2" fill="#c62828"/>
    <rect x="435" y="180" width="25" height="60" rx="2" fill="#1565c0"/>
    <rect x="470" y="180" width="25" height="60" rx="2" fill="#f9a825"/>
    <rect x="505" y="180" width="25" height="60" rx="2" fill="#2e7d32"/>
    <rect x="260" y="260" width="270" height="80" rx="4" fill="#555" stroke="#666"/>
    <text x="400" y="430" font-size="13" fill="#666" text-anchor="middle">保险丝 / 继电器盒</text>
  `),

  headlight: () => wrap('大灯', `
    <path d="M200 280 Q200 180 400 160 Q600 180 600 280 Q600 380 400 400 Q200 380 200 280" fill="#222" stroke="#444" stroke-width="3"/>
    <ellipse cx="400" cy="280" rx="140" ry="100" fill="#e8e8e8" stroke="#ccc" stroke-width="2"/>
    <ellipse cx="400" cy="280" rx="80" ry="60" fill="#fff" stroke="#ddd" stroke-width="1"/>
    <circle cx="400" cy="280" r="30" fill="#f5f5f5" stroke="#bbb"/>
    <circle cx="400" cy="280" r="12" fill="#ddd"/>
    <circle cx="520" cy="220" r="15" fill="#ffeb3b" opacity="0.8"/>
    <text x="400" y="450" font-size="13" fill="#666" text-anchor="middle">前大灯总成</text>
  `),

  wiper_motor: () => wrap('雨刮电机', `
    <rect x="280" y="240" width="160" height="100" rx="8" fill="#333" stroke="#555" stroke-width="2"/>
    <circle cx="360" cy="290" r="30" fill="#444" stroke="#666" stroke-width="2"/>
    <rect x="440" y="270" width="120" height="12" rx="4" fill="url(#metalDark)" stroke="#555"/>
    <rect x="540" y="250" width="12" height="80" rx="2" fill="url(#metal)" stroke="#777"/>
    <path d="M546 250 L600 180 L610 185 L556 255 Z" fill="#666" stroke="#555"/>
    <rect x="300" y="340" width="20" height="30" rx="2" fill="#555"/>
    <rect x="400" y="340" width="20" height="30" rx="2" fill="#555"/>
    <text x="400" y="420" font-size="13" fill="#666" text-anchor="middle">雨刮电机 + 连杆</text>
  `),

  transmission: () => wrap('变速箱', `
    <path d="M220 200 L580 200 L620 280 L580 360 L220 360 L180 280 Z" fill="url(#castIron)" stroke="#333" stroke-width="2"/>
    <rect x="240" y="220" width="340" height="120" rx="4" fill="#3a3a3a" stroke="#555"/>
    <circle cx="300" cy="280" r="30" fill="#555" stroke="#777" stroke-width="2"/>
    <circle cx="400" cy="280" r="30" fill="#555" stroke="#777" stroke-width="2"/>
    <circle cx="500" cy="280" r="30" fill="#555" stroke="#777" stroke-width="2"/>
    <rect x="580" y="260" width="60" height="40" rx="4" fill="url(#metalDark)" stroke="#555"/>
    <text x="400" y="170" font-size="14" fill="#666" text-anchor="middle">齿轮变速箱壳体</text>
  `),

  clutch: () => wrap('离合器', `
    <circle cx="400" cy="270" r="130" fill="url(#metal)" stroke="#777" stroke-width="3"/>
    <circle cx="400" cy="270" r="100" fill="#555" stroke="#666" stroke-width="2"/>
    <circle cx="400" cy="270" r="40" fill="#333"/>
    <circle cx="400" cy="150" r="6" fill="#888"/>
    <circle cx="400" cy="390" r="6" fill="#888"/>
    <circle cx="280" cy="270" r="6" fill="#888"/>
    <circle cx="520" cy="270" r="6" fill="#888"/>
    <path d="M310 200 Q400 230 490 200" fill="none" stroke="#c45c26" stroke-width="8"/>
    <path d="M310 340 Q400 310 490 340" fill="none" stroke="#c45c26" stroke-width="8"/>
    <text x="400" y="440" font-size="13" fill="#666" text-anchor="middle">离合器摩擦片</text>
  `),

  flywheel: () => wrap('飞轮', `
    <circle cx="400" cy="270" r="140" fill="url(#castIron)" stroke="#444" stroke-width="3"/>
    <circle cx="400" cy="270" r="110" fill="#555" stroke="#666" stroke-width="2"/>
    <circle cx="400" cy="270" r="30" fill="#333"/>
    <rect x="385" y="120" width="30" height="20" rx="2" fill="#666"/>
    <rect x="385" y="400" width="30" height="20" rx="2" fill="#666"/>
    <rect x="260" y="255" width="20" height="30" rx="2" fill="#666"/>
    <rect x="520" y="255" width="20" height="30" rx="2" fill="#666"/>
    <path d="M270 140 A130 130 0 0 1 530 140" fill="none" stroke="#777" stroke-width="8"/>
    <path d="M270 400 A130 130 0 0 0 530 400" fill="none" stroke="#777" stroke-width="8"/>
    <text x="400" y="450" font-size="13" fill="#666" text-anchor="middle">飞轮 + 齿圈</text>
  `),

  cv_joint: () => wrap('万向节', `
    <path d="M280 380 L280 260 Q280 200 340 180 L460 180 Q520 200 520 260 L520 380" fill="url(#rubber)" stroke="#111" stroke-width="2"/>
    <rect x="200" y="250" width="80" height="30" rx="4" fill="url(#metalDark)" stroke="#555"/>
    <rect x="520" y="250" width="80" height="30" rx="4" fill="url(#metalDark)" stroke="#555"/>
    <circle cx="400" cy="270" r="50" fill="url(#metal)" stroke="#777" stroke-width="2"/>
    <circle cx="400" cy="270" r="25" fill="#666"/>
    <path d="M360 230 L440 230 L430 310 L370 310 Z" fill="#888" opacity="0.5"/>
    <text x="400" y="440" font-size="13" fill="#666" text-anchor="middle">CV 万向节 + 防尘套</text>
  `),

  radiator: () => wrap('散热器', `
    <rect x="180" y="160" width="60" height="240" rx="6" fill="#555" stroke="#666" stroke-width="2"/>
    <rect x="560" y="160" width="60" height="240" rx="6" fill="#555" stroke="#666" stroke-width="2"/>
    <rect x="240" y="170" width="320" height="220" rx="4" fill="#888" stroke="#999"/>
    <line x1="260" y1="180" x2="260" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="285" y1="180" x2="285" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="310" y1="180" x2="310" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="335" y1="180" x2="335" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="360" y1="180" x2="360" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="385" y1="180" x2="385" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="410" y1="180" x2="410" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="435" y1="180" x2="435" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="460" y1="180" x2="460" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="485" y1="180" x2="485" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="510" y1="180" x2="510" y2="380" stroke="#aaa" stroke-width="2"/>
    <line x1="535" y1="180" x2="535" y2="380" stroke="#aaa" stroke-width="2"/>
    <text x="400" y="140" font-size="13" fill="#666" text-anchor="middle">铝制散热芯 + 水室</text>
  `),

  water_pump: () => wrap('水泵', `
    <circle cx="280" cy="280" r="50" fill="url(#metal)" stroke="#666" stroke-width="2"/>
    <circle cx="280" cy="280" r="30" fill="#555"/>
    <rect x="310" y="240" width="180" height="80" rx="8" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <circle cx="450" cy="280" r="35" fill="url(#metal)" stroke="#666" stroke-width="2"/>
    <path d="M450 245 L450 230 L470 230 L470 245" fill="#666"/>
    <path d="M450 315 L450 330 L470 330 L470 315" fill="#666"/>
    <path d="M415 280 L400 280 L400 260 L415 260" fill="#666"/>
    <path d="M485 280 L500 280 L500 260 L485 260" fill="#666"/>
    <rect x="490" y="265" width="40" height="30" rx="4" fill="#444" stroke="#555"/>
    <text x="400" y="400" font-size="13" fill="#666" text-anchor="middle">冷却水泵 + 叶轮</text>
  `),

  thermostat: () => wrap('节温器', `
    <rect x="280" y="200" width="240" height="160" rx="10" fill="url(#metalDark)" stroke="#555" stroke-width="2"/>
    <circle cx="400" cy="280" r="50" fill="#555" stroke="#777" stroke-width="2"/>
    <circle cx="400" cy="280" r="30" fill="#888"/>
    <rect x="370" y="250" width="60" height="60" rx="4" fill="url(#metal)" stroke="#666"/>
    <rect x="200" y="260" width="80" height="40" rx="6" fill="#444" stroke="#555"/>
    <rect x="520" y="260" width="80" height="40" rx="6" fill="#444" stroke="#555"/>
    <path d="M390 270 L410 270 L405 290 L395 290 Z" fill="#c62828"/>
    <text x="400" y="420" font-size="13" fill="#666" text-anchor="middle">蜡式节温器阀</text>
  `),

  coolant_hose: () => wrap('冷却水管', `
    <path d="M120 380 Q200 200 400 260 Q600 320 680 200" fill="none" stroke="#333" stroke-width="40" stroke-linecap="round"/>
    <path d="M120 380 Q200 200 400 260 Q600 320 680 200" fill="none" stroke="#444" stroke-width="30" stroke-linecap="round"/>
    <path d="M120 380 Q200 200 400 260 Q600 320 680 200" fill="none" stroke="#555" stroke-width="22" stroke-linecap="round"/>
    <rect x="100" y="365" width="40" height="20" rx="2" fill="url(#metal)" stroke="#777"/>
    <rect x="660" y="185" width="40" height="20" rx="2" fill="url(#metal)" stroke="#777"/>
    <text x="400" y="450" font-size="13" fill="#666" text-anchor="middle">橡胶冷却软管 + 卡箍</text>
  `),

  fan: () => wrap('冷却风扇', `
    <circle cx="400" cy="270" r="30" fill="#333" stroke="#555" stroke-width="2"/>
    <g transform="translate(400,270)">
      <path d="M0 -100 L15 -30 L0 -20 L-15 -30 Z" fill="#444" stroke="#555" transform="rotate(0)"/>
      <path d="M0 -100 L15 -30 L0 -20 L-15 -30 Z" fill="#444" stroke="#555" transform="rotate(60)"/>
      <path d="M0 -100 L15 -30 L0 -20 L-15 -30 Z" fill="#444" stroke="#555" transform="rotate(120)"/>
      <path d="M0 -100 L15 -30 L0 -20 L-15 -30 Z" fill="#444" stroke="#555" transform="rotate(180)"/>
      <path d="M0 -100 L15 -30 L0 -20 L-15 -30 Z" fill="#444" stroke="#555" transform="rotate(240)"/>
      <path d="M0 -100 L15 -30 L0 -20 L-15 -30 Z" fill="#444" stroke="#555" transform="rotate(300)"/>
    </g>
    <circle cx="400" cy="270" r="110" fill="none" stroke="#666" stroke-width="3"/>
    <text x="400" y="430" font-size="13" fill="#666" text-anchor="middle">六叶冷却风扇</text>
  `),
};

module.exports = { DRAWINGS, wrap };
