const fs = require('fs');
const path = require('path');
const { parts } = require('../database/parts-data');

const ORIG = new Set(
  'engine_block,piston,crankshaft,camshaft,spark_plug,air_filter,fuel_injector,turbocharger,brake_disc,brake_pad,brake_caliper,master_cylinder,brake_line,abs_sensor,shock_absorber,control_arm,ball_joint,tie_rod,wheel_bearing,stabilizer_bar,battery,alternator,starter,fuse_box,headlight,wiper_motor,transmission,clutch,flywheel,cv_joint,radiator,water_pump,thermostat,coolant_hose,fan'.split(
    ','
  )
);
const DIR = path.join(__dirname, '..', 'public', 'images', 'parts');
const MIN = 50000;

const missing = parts
  .filter((p) => !ORIG.has(p.key))
  .filter((p) => {
    const f = path.join(DIR, `${p.key}.png`);
    return !fs.existsSync(f) || fs.statSync(f).size < MIN;
  })
  .map((p) => p.key);

console.log(JSON.stringify(missing));
