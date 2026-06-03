# API 接口文档

**Base URL**：`http://localhost:3001`（可通过环境变量 `PORT` 修改）

**通用响应**：成功时多为 `{ data: ... }`；错误时 `{ error, message }` 及 HTTP 状态码。

---

## 健康检查

### GET `/api/health`

```json
{ "status": "ok", "message": "Car Master API is running" }
```

---

## 零部件 `/api/parts`

### GET `/api/parts/categories`

零部件系统分类列表。

**响应字段**：`id`, `name`, `icon`, `sortOrder`

### GET `/api/parts`

零部件列表。

| 参数 | 类型 | 说明 |
|------|------|------|
| categoryId | number | 可选，按分类筛选 |

**响应字段**：`id`, `name`, `description`, `location`, `faultSymptoms`, `imageUrl`, `categoryId`, `categoryName`

### GET `/api/parts/search`

| 参数 | 类型 | 说明 |
|------|------|------|
| keyword | string | 搜索关键词（名称/描述/位置） |

### GET `/api/parts/:id`

单个零部件详情。

### GET `/api/parts/:id/related-faults`

根据零件名称匹配相关故障案例（最多 10 条）。

**响应**：`{ data: [...], partName }`

---

## 故障 `/api/faults`

### GET `/api/faults/categories`

故障分类列表。

### GET `/api/faults`

| 参数 | 类型 | 说明 |
|------|------|------|
| categoryId | number | 可选 |

**响应字段**：`id`, `title`, `symptoms`, `causes[]`, `relatedParts[]`, `solutions[]`, `dangerLevel`, `categoryId`, `categoryName`

### GET `/api/faults/search`

| 参数 | keyword | 搜索标题/现象/原因 |

### GET `/api/faults/match`

症状诊断匹配。

| 参数 | 类型 | 说明 |
|------|------|------|
| tags | string | 逗号分隔的症状 tag id 或 label |

**示例**：`/api/faults/match?tags=shake,noise`

### GET `/api/faults/:id`

故障详情。

---

## 综合搜索 `/api/search`

### GET `/api/search`

同时搜索零部件与故障。

| 参数 | keyword |

**响应**：

```json
{
  "data": {
    "parts": [],
    "faults": [],
    "keyword": "火花塞"
  }
}
```

---

## 首页 `/api/home`

### GET `/api/home/recommendations`

随机推荐 4 个零件 + 3 个故障 + 热门搜索词。

```json
{
  "data": {
    "parts": [],
    "faults": [],
    "hotKeywords": ["火花塞", "刹车片", "..."]
  }
}
```

---

## 养车指南 `/api/guides`

### GET `/api/guides`

指南列表（slug、title、tag、type）。

### GET `/api/guides/symptoms`

症状诊断标签（供小程序症状页使用）。

### GET `/api/guides/:slug`

单篇指南内容。

| slug | 说明 |
|------|------|
| beginner | 新手养车指南 |
| classroom | 维修知识课堂 |
| inspection | 年检自查清单 |
| lights | 指示灯解读 |

---

## 问小汽 AI `/api/ai`

> 当前为 **模拟回答**，`mock: true`。后续可替换为真实大模型。

### GET `/api/ai/suggestions`

推荐问题列表。

### POST `/api/ai/chat`

**Body**：

```json
{ "question": "机油多久换一次？" }
```

**汽车相关问题**：

```json
{
  "data": {
    "allowed": true,
    "reply": "...",
    "mock": true
  }
}
```

**非汽车问题**：

```json
{
  "data": {
    "allowed": false,
    "reply": "抱歉，小汽只能回答与汽车相关的问题...",
    "mock": true
  }
}
```

---

## 静态资源

### GET `/images/parts/:filename.png`

零部件图片，与 `imageUrl` 字段对应（如 `/images/parts/spark_plug.png`）。

---

## 错误码

| 状态码 | 说明 |
|--------|------|
| 400 | 参数错误（如 AI 问题为空） |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
