const fs = require('fs');
const path = require('path');
const { parts } = require('../database/parts-data');

const ORIG = new Set(
  'engine_block,piston,crankshaft,camshaft,spark_plug,air_filter,fuel_injector,turbocharger,brake_disc,brake_pad,brake_caliper,master_cylinder,brake_line,abs_sensor,shock_absorber,control_arm,ball_joint,tie_rod,wheel_bearing,stabilizer_bar,battery,alternator,starter,fuse_box,headlight,wiper_motor,transmission,clutch,flywheel,cv_joint,radiator,water_pump,thermostat,coolant_hose,fan'.split(
    ','
  )
);
const ASSETS = path.join(
  process.env.HOME,
  '.cursor/projects/Users-simon-ma-ownproject-ai-car-master/assets'
);
const OUT = path.join(__dirname, '..', 'public', 'images', 'parts');
const MIN = 500000;

let n = 0;
for (const p of parts.filter((x) => !ORIG.has(x.key))) {
  const src = path.join(ASSETS, `${p.key}.png`);
  const dst = path.join(OUT, `${p.key}.png`);
  if (!fs.existsSync(src) || fs.statSync(src).size < MIN) continue;
  fs.copyFileSync(src, dst);
  n++;
  console.log('synced', p.key);
}
console.log('total synced', n);
