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

GIT_BACKUP=""
if [ -d "$OUT/.git" ]; then
  GIT_BACKUP="$(mktemp -d)/car-master-demo.git"
  mv "$OUT/.git" "$GIT_BACKUP"
fi

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
rm -f "$OUT/backend/database/guides-data.js"

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

# 应用演示版功能覆盖（页面、首页配置、精简后端）
if [ -d "$ROOT/demo-overlay" ]; then
  cp -R "$ROOT/demo-overlay/." "$OUT/"
fi
rm -rf "$OUT/demo-overlay"

# 删除演示版未开放的页面与后端模块
DEMO_REMOVE_PATHS=(
  miniprogram/pages/tools/ai
  miniprogram/pages/tools/diagnose
  miniprogram/pages/tools/vin
  miniprogram/pages/tools/oil
  miniprogram/pages/tools/tire
  miniprogram/pages/tools/fuel
  miniprogram/pages/tools/shop
  miniprogram/pages/tools/rescue
  miniprogram/pages/tools/garage
  miniprogram/pages/tools/history
  miniprogram/pages/tools/scan
  miniprogram/pages/tools/voice
  miniprogram/pages/guide/classroom
  miniprogram/pages/guide/inspection
  miniprogram/pages/guide/lights
  miniprogram/pages/parts/search
  miniprogram/pages/faults/search
  backend/src/routes/ai.js
  backend/src/ai-mock.js
  backend/src/license.js
)
for rel in "${DEMO_REMOVE_PATHS[@]}"; do
  rm -rf "$OUT/$rel"
done

cat > "$OUT/README.md" << 'EOF'
# Car Master Demo

微信原生小程序 + Node.js / Express / SQLite **公开演示仓库**。

演示版在完整版基础上**精简功能与样本数据**，用于本地预览与技术展示。

## 演示版包含

| 模块 | 说明 |
|------|------|
| 零部件科普 | 分类 → 列表 → 详情 |
| 故障分析 | 分类 → 列表 → 详情 |
| 综合搜索 | 零件 + 故障统一搜索 |
| 保养提醒 | 本地记录与到期提示 |
| 我的收藏 | 零件/故障收藏 |
| 新手养车指南 | 1 篇样本指南 |

## 演示版不含（完整版才有）

问小汽 AI · 症状诊断 · VIN 解码 · 扫码识件 · 我的爱车 · 油液/胎压参考 · 油耗记录 · 浏览历史 · 附近维修 · 道路救援 · 其余 3 篇指南 · 106 零件全量数据

## 数据规模

| 项 | 演示版 | 完整版 |
|----|--------|--------|
| 零件 | 10 | 106 |
| 故障 | 6 | 24 |
| 指南 | 1 | 4 |
| 工具 | 2 | 12 |
| 配图 | 10 张 | 106 张 |

---

## 快速开始

```bash
cd backend
npm install
npm run init-db:demo
npm start
```

微信开发者工具导入 `miniprogram/`，配置 `utils/config.js` 中 `apiBaseUrl` 为 `http://localhost:3001`。

---

## 技术栈

微信小程序原生 · Node.js 18+ · Express · SQLite
EOF

echo "完成。可将 $OUT 作为独立 Git 仓库公开推送。"

if [ -n "$GIT_BACKUP" ]; then
  mv "$GIT_BACKUP" "$OUT/.git"
fi
