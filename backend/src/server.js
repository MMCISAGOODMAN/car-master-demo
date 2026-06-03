const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDb } = require('./db');
const partsRouter = require('./routes/parts');
const faultsRouter = require('./routes/faults');
const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const guidesRouter = require('./routes/guides');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Car Master Demo API is running', mode: 'demo' });
});

app.use('/api/parts', partsRouter);
app.use('/api/faults', faultsRouter);
app.use('/api/home', homeRouter);
app.use('/api/search', searchRouter);
app.use('/api/guides', guidesRouter);

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
  console.log(`Car Master Demo API 运行在 http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n端口 ${PORT} 已被占用。可尝试 PORT=3002 npm start\n`);
    process.exit(1);
  }
  throw err;
});
