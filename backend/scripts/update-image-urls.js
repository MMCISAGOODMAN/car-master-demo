const { getDb } = require('../src/db');

const db = getDb();
const result = db
  .prepare("UPDATE parts SET image_url = REPLACE(image_url, '.svg', '.png')")
  .run();
db.close();

console.log(`已将 ${result.changes} 条零件图片 URL 更新为 PNG 格式`);
