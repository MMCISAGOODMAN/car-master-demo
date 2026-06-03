const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDb } = require('./db');
const { assertLicensedOnBoot, licenseMiddleware, CONTACT } = require('./license');
const partsRouter = require('./routes/parts');
const faultsRouter = require('./routes/faults');
const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const guidesRouter = require('./routes/guides');
const aiRouter = require('./routes/ai');

assertLicensedOnBoot();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(licenseMiddleware);

app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Car Master API is running' });
});

app.get('/api/license', (req, res) => {
  res.json({
    product: CONTACT.product,
    message: '商业部署与小程序上线需作者授权',
    contact: CONTACT,
  });
});

app.use('/api/parts', partsRouter);
app.use('/api/faults', faultsRouter);
app.use('/api/home', homeRouter);
app.use('/api/search', searchRouter);
app.use('/api/guides', guidesRouter);
app.use('/api/ai', aiRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: '接口不存在' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', message: '服务器内部错误' });
});

function ensureDatabase() {
  const db = getDb();
  const tableExists = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='parts'")
    .get();
  db.close();

  if (!tableExists) {
    console.log('数据库未初始化，正在执行 init-db...');
    require('../scripts/init-db');
  }
}

ensureDatabase();

const server = app.listen(PORT, () => {
  console.log(`Car Master API 运行在 http://localhost:${PORT}`);
  console.log(`图片资源: http://localhost:${PORT}/images/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n端口 ${PORT} 已被占用。可尝试：`);
    console.error(`  PORT=3002 npm start`);
    console.error(`  或关闭占用进程: lsof -i :${PORT}\n`);
    process.exit(1);
  }
  throw err;
});
