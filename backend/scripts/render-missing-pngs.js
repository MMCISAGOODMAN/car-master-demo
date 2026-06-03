/**
 * 将缺失零件的 SVG 渲染为 PNG（保留已有 AI 实拍 PNG）
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { parts } = require('../database/parts-data');
const { DRAWINGS: baseDrawings } = require('./part-svgs');
const missingDrawings = require('./missing-part-svgs');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'parts');
const allDrawings = { ...baseDrawings, ...missingDrawings };

const nameMap = Object.fromEntries(parts.map((p) => [p.key, p.name]));
const keys = [...new Set(parts.map((p) => p.key))];

async function renderOne(key) {
  const outPath = path.join(IMAGES_DIR, `${key}.png`);
  if (fs.existsSync(outPath)) return { key, status: 'skip' };

  const draw = allDrawings[key];
  if (!draw) {
    console.warn(`无 SVG 模板: ${key} (${nameMap[key]})`);
    return { key, status: 'no-template' };
  }

  const svg = draw();
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  return { key, status: 'ok' };
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (const key of keys) {
    const r = await renderOne(key);
    if (r.status === 'ok') {
      ok++;
      console.log(`PNG: ${key}.png`);
    } else if (r.status === 'skip') skip++;
    else fail++;
  }

  console.log(`完成: 新生成 ${ok}, 已存在 ${skip}, 无模板 ${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
