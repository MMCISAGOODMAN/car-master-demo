# 小程序功能与页面说明

> 逐项功能说明见 **[FEATURES.md](FEATURES.md)**

## 应用信息

| 项 | 值 |
|----|-----|
| 启动品牌名 | 汽车百科 |
| AI 助手 | 小汽 |
| 首页导航标题 | 首页 |
| 默认 API | `miniprogram/utils/config.js` → `apiBaseUrl` |

---

## 页面路由

| 路径 | 说明 |
|------|------|
| `pages/splash/splash` | 启动页，约 2s 后跳转首页 |
| `pages/index/index` | 首页：搜索、推荐、工具入口 |
| `pages/parts/categories` | 零部件 11 大系统分类 |
| `pages/parts/list` | 分类下零件列表 |
| `pages/parts/detail` | 零件详情、收藏、相关故障、分享 |
| `pages/parts/search` | 零件搜索 |
| `pages/faults/categories` | 故障六大分类 |
| `pages/faults/list` | 故障列表 |
| `pages/faults/detail` | 故障详情、收藏、涉及零件跳转、分享 |
| `pages/faults/search` | 故障搜索 |
| `pages/search/unified` | 综合搜索（零件+故障） |
| `pages/tools/scan` | 扫码/手动输入查零件 |
| `pages/tools/voice` | 快速查询（故障/零件关键词） |
| `pages/tools/maintain` | 保养提醒（本地存储+到期高亮） |
| `pages/tools/vin` | VIN 17 位解码 |
| `pages/tools/oil` | 油液更换周期参考 |
| `pages/tools/tire` | 胎压标准参考 |
| `pages/tools/fuel` | 油耗记录与百公里计算 |
| `pages/tools/shop` | 定位/选点 + 维修渠道参考 |
| `pages/tools/rescue` | 122/120/110 等一键拨号 |
| `pages/tools/favorite` | 零件/故障收藏 |
| `pages/tools/diagnose` | 多症状匹配故障 |
| `pages/tools/garage` | 我的爱车档案 |
| `pages/tools/history` | 浏览历史 |
| `pages/tools/ai` | 问小汽（流式模拟回复） |
| `pages/guide/beginner` | 新手养车指南 |
| `pages/guide/classroom` | 维修知识课堂 |
| `pages/guide/inspection` | 年检自查清单 |
| `pages/guide/lights` | 指示灯解读 |

---

## 首页结构

首页（`pages/index/index`）自上而下 **10 个区块**，详见 [FEATURES.md §1.2](FEATURES.md#12-首页index)。

| # | 区块 | 要点 |
|---|------|------|
| ① | 保养到期横幅 | 过期红 / 今日橙；点击→保养页；每日首次 Toast |
| ② | 综合搜索栏 | 点击→统一搜索（零件+故障） |
| ③ | 热门关键词 | API 热词 chip，点击→带词搜索 |
| ④ | 快捷入口 ×4 | 问小汽 / 综合搜索 / 症状诊断 / 扫码识件 |
| ⑤ | 数据概览 | 106 零件 · 24 故障 · 11 分类（实时 API） |
| ⑥ | 今日推荐 | 横滑 4 零件 + 3 故障（随机 API） |
| ⑦ | 最近浏览 | 本地 5 条；「全部」→浏览历史 |
| ⑧ | 核心功能 ×2 | 零部件科普 / 汽车故障分析 |
| ⑨ | 常用工具 ×12 | 4×3 宫格；「全部」→5 项快捷菜单 |
| ⑩ | 推荐服务 ×4 | 横滑养车指南卡片 |

**刷新**：下拉刷新重载 API；每次显示页面更新浏览历史与保养横幅。

### 首页快捷入口明细

| 名称 | page 键 | 目标路径 |
|------|---------|----------|
| 问小汽 | ai | `/pages/tools/ai/ai` |
| 综合搜索 | unifiedSearch | `/pages/search/unified/unified` |
| 症状诊断 | diagnose | `/pages/tools/diagnose/diagnose` |
| 扫码识件 | scan | `/pages/tools/scan/scan` |

### 首页工具宫格明细（12 项）

配置于 `utils/home-config.js` → `TOOLS` 数组，顺序与界面一致：保养提醒、症状诊断、问小汽、VIN 解码、我的爱车、油液对照、胎压参考、油耗记录、浏览历史、附近维修、道路救援、我的收藏。

### 首页「全部」菜单（ActionSheet）

问小汽 · 症状诊断 · 我的爱车 · 浏览历史 · 我的收藏

### 首页推荐服务明细（4 项）

新手养车指南 · 维修知识课堂 · 年检自查清单 · 指示灯解读（内容来自 `/api/guides/:slug`）

---

## 本地存储（wx.storage）

| Key | 模块 | 说明 |
|-----|------|------|
| `car_favorites` | favorites.js | 零件/故障收藏 |
| `car_maintain` | local-data.js | 保养提醒列表 |
| `car_fuel` | local-data.js | 油耗记录 |
| `car_garage` | garage.js | 我的爱车 |
| `car_history` | history.js | 浏览历史（最多 30 条） |
| `maintain_tip_*` | index.js | 保养 Toast 每日一次 |

---

## 权限说明

| 权限 | 用途 |
|------|------|
| `scope.userLocation` | 附近维修页定位 |
| `chooseLocation` | 地图选点 |

---

## 视觉规范（与首页一致）

| 用途 | 色值 |
|------|------|
| 页面背景 | `#f7f8fa` |
| 主色/强调 | `#e94560` |
| 辅色 | `#0f3460` |
| 标题文字 | `#1a1a2e` |
| 卡片边框 | `#eef0f3` |

---

## 配置项

```javascript
// miniprogram/utils/config.js
module.exports = {
  apiBaseUrl: 'http://localhost:3001'
};
```

真机调试时必须改为局域网 IP，且手机与电脑同一 WiFi。
