const fs = require('fs');
const path = require('path');
const { getDb, DB_PATH } = require('../src/db');

const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
const seedPath = path.join(__dirname, '..', 'database', 'seed.js');

function initDatabase() {
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
    console.log('已删除旧数据库');
  }

  const db = getDb();
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);
  console.log('数据库表结构创建完成');

  const seed = require(seedPath);
  seed(db);

  db.close();
  console.log('数据库初始化完成:', DB_PATH);
}

initDatabase();
