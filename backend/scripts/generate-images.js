const fs = require('fs');
const path = require('path');
const { parts } = require('../database/parts-data');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'parts');
const BASE_URL = '/images/parts';

const PART_KEYS = [...new Set(parts.map((p) => p.key))];

function generateImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const imageMap = {};
  const missing = [];

  for (const key of PART_KEYS) {
    const filename = `${key}.png`;
    const filepath = path.join(IMAGES_DIR, filename);
    if (!fs.existsSync(filepath)) {
      missing.push(filename);
    }
    imageMap[key] = `${BASE_URL}/${filename}`;
  }

  if (missing.length > 0) {
    console.warn(`共 ${PART_KEYS.length} 个零件，缺失 ${missing.length} 张 PNG：`);
    missing.slice(0, 10).forEach((f) => console.warn('  -', f));
    if (missing.length > 10) console.warn(`  ... 还有 ${missing.length - 10} 个`);
  } else {
    console.log(`已就绪 ${PART_KEYS.length} 个零部件 PNG 图片`);
  }

  return imageMap;
}

module.exports = { generateImages, PART_IMAGES: PART_KEYS };

if (require.main === module) {
  generateImages();
}
