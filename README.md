# Car Master Demo

微信原生小程序 + Node.js / Express / SQLite **演示仓库**。

与完整版共用同一套代码结构；本仓库仅包含**样本数据**（10 个零件、6 个故障案例、1 篇指南及对应配图），用于本地运行与功能预览。

| 项 | 演示版 | 完整版（私有仓库） |
|----|--------|-------------------|
| 零件 | 10 | 106 |
| 故障 | 6 | 24 |
| 指南 | 1 | 4 |
| 零件配图 | 10 张 | 106 张 |

---

## 快速开始

### 后端

```bash
cd backend
npm install
npm run init-db:demo
npm start
# → http://localhost:3001
```

### 小程序

1. 微信开发者工具导入 `miniprogram/`
2. 勾选 **不校验合法域名**
3. `miniprogram/utils/config.js` 中设置 `apiBaseUrl`

```javascript
module.exports = {
  apiBaseUrl: 'http://localhost:3001',
};
```

---

## 数据档位

演示库使用环境变量 `CAR_MASTER_DATA=sample`（`npm run init-db:demo` 已内置）。

样本数据文件：

- `backend/database/parts-data.sample.js`
- `backend/database/guides-data.sample.js`

---

## 文档

| 文档 | 说明 |
|------|------|
| [docs/API.md](docs/API.md) | REST API |
| [docs/FEATURES.md](docs/FEATURES.md) | 功能说明 |
| [docs/MINIPROGRAM.md](docs/MINIPROGRAM.md) | 页面路由 |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | 架构与部署 |

---

## 技术栈

微信小程序原生 · Node.js 18+ · Express · SQLite
