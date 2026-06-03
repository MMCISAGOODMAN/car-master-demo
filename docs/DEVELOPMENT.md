# 开发指南

## 环境要求

- Node.js 18+
- 微信开发者工具（稳定版）
- macOS / Windows / Linux

---

## 架构说明

```
┌─────────────────┐      HTTP JSON      ┌──────────────────┐
│  微信小程序       │ ◄─────────────────► │  Express API     │
│  miniprogram/   │      图片 /images    │  backend/        │
└─────────────────┘                     └────────┬─────────┘
                                                   │
                                          ┌────────▼─────────┐
                                          │  SQLite          │
                                          │  car_master.db   │
                                          └──────────────────┘
```

- **零件/故障/推荐/指南/AI 模拟**：后端 API + SQLite
- **收藏/保养/油耗/车库/历史**：小程序本地 `wx.storage`
- **零件图片**：`backend/public/images/parts/*.png`，通过 `/images/` 静态服务

---

## 后端脚本

| 命令 | 说明 |
|------|------|
| `npm start` | 启动 API（默认 3001） |
| `npm run init-db` | 执行 schema + seed |
| `npm run generate-images` | 生成图片映射 |
| `npm run render-pngs` | 缺失项 SVG 转 PNG |
| `npm run generate-ai-pngs` | AI 批量生成 PNG |

### 修改零件数据

1. 编辑 `backend/database/parts-data.js`
2. 在 `backend/public/images/parts/` 放置对应 `{key}.png`
3. 运行 `npm run init-db`

### 修改故障数据

编辑 `backend/database/seed.js` 中 `faults` 数组，然后 `npm run init-db`。

### 修改指南 / 症状标签

编辑 `backend/database/guides-data.js`，无需改库表（指南走内存/API）。

---

## 对接真实 AI

替换 `backend/src/routes/ai.js` 中 `POST /chat` 逻辑：

1. 保留 `isCarRelated()` 校验（`backend/src/ai-mock.js`）
2. 调用大模型 API 获取 `reply`
3. 若需流式：可改为 SSE，小程序端用 `wx.request` + `enableChunked` 或 WebSocket

小程序 `pages/tools/ai/ai.js` 中 `streamText()` 已支持逐字展示，只需改数据来源。

---

## 小程序扩展新工具页

1. 在 `pages/tools/xxx/` 创建四件套（wxml/js/wxss/json）
2. 注册 `app.json` pages
3. 在 `utils/home-config.js` 的 `TOOL_PAGES` / `TOOLS` 添加入口
4. 首页 `index.js` 的 `navigateFeature` 已通过 `TOOL_PAGES` 自动跳转

---

## 生产部署建议

1. 后端部署至云服务器，配置 HTTPS 域名
2. 微信公众平台配置 **request 合法域名**、**uploadFile**（若需要）
3. 小程序 `config.js` 改为生产 API 地址
4. 图片可继续走 API 同域 `/images/`，或迁移至 CDN
5. SQLite 可迁移 PostgreSQL/MySQL（需改 `db.js` 与 SQL 方言）

---

## 常见问题

### 小程序请求失败

- 检查后端是否启动、`apiBaseUrl` 是否正确
- 开发阶段勾选「不校验合法域名」
- 真机不能用 `localhost`，需局域网 IP

### 图片不显示

- 确认 `imageUrl` 与 `api.resolveImageUrl()` 拼接正确
- 确认 `backend/public/images/parts/` 下文件存在

### init-db 后数据不对

- 删除 `backend/data/car_master.db` 后重新 `npm run init-db`
