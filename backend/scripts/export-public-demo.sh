#!/usr/bin/env bash
# 导出「公开演示版」目录，可单独推送到 GitHub 公开仓库
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="${1:-$ROOT/../car-master-demo}"

SAMPLE_IMAGES=(
  spark_plug air_filter oil_filter radiator
  brake_pad brake_disc abs_pump
  battery alternator starter
)

echo "导出公开演示版 → $OUT"
rm -rf "$OUT"

rsync -a --exclude node_modules --exclude backend/data --exclude .git --exclude .idea \
  --exclude docs/miniprogram-intro-135editor.html \
  --exclude docs/screenshots --exclude docs/screenshot-pages \
  --exclude docs/scripts --exclude docs/node_modules \
  --exclude docs/package.json --exclude docs/package-lock.json \
  --exclude docs/PUBLIC_RELEASE.md \
  --exclude LICENSE \
  "$ROOT/" "$OUT/"

# 移除完整数据（演示仓库不应包含）
rm -f "$OUT/backend/database/parts-data.js"

# 仅保留样本配图
PARTS_DIR="$OUT/backend/public/images/parts"
if [ -d "$PARTS_DIR" ]; then
  for f in "$PARTS_DIR"/*.png; do
    base="$(basename "$f" .png)"
    keep=false
    for key in "${SAMPLE_IMAGES[@]}"; do
      if [ "$base" = "$key" ]; then keep=true; break; fi
    done
    if [ "$keep" = false ]; then rm -f "$f"; fi
  done
fi

cat > "$OUT/README.md" << 'EOF'
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
EOF

echo "完成。可将 $OUT 作为独立 Git 仓库公开推送。"
