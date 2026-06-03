/**
 * 为缺失的零部件批量下载 AI 实拍风格图片（Pollinations API）
 * 已有大尺寸 AI 图（>200KB）或 assets 中的图会跳过
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const PROMPTS = require('./ai-part-prompts.json');
const ASSETS = path.join(
  process.env.HOME,
  '.cursor/projects/Users-simon-ma-ownproject-ai-car-master/assets'
);
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'parts');
const MIN_AI_BYTES = 50000;
const CONCURRENCY = 1;
const DELAY_MS = 6000;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'CarMaster/1.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

function buildUrls(desc) {
  const prompt = encodeURIComponent(
    `Professional product photography of ${desc}, isolated on clean white studio background, photorealistic, high detail, soft shadow, automotive parts catalog, no text no watermark`
  );
  const seed = Math.floor(Math.random() * 99999);
  return [
    `https://image.pollinations.ai/prompt/${prompt}?width=800&height=600&nologo=true&model=flux&seed=${seed}`,
    `https://image.pollinations.ai/prompt/${prompt}?width=800&height=600&nologo=true&seed=${seed}`,
  ];
}

async function saveAsPng(buffer, outPath) {
  await sharp(buffer).png({ quality: 90 }).toFile(outPath);
}

async function tryCopyFromAssets(key, outPath) {
  const src = path.join(ASSETS, `${key}.png`);
  if (!fs.existsSync(src)) return false;
  const stat = fs.statSync(src);
  if (stat.size < MIN_AI_BYTES) return false;
  fs.copyFileSync(src, outPath);
  return true;
}

async function generateOne(key, desc) {
  const outPath = path.join(OUT_DIR, `${key}.png`);

  if (fs.existsSync(outPath)) {
    const size = fs.statSync(outPath).size;
    if (size >= MIN_AI_BYTES) {
      return { key, status: 'skip', size };
    }
  }

  if (await tryCopyFromAssets(key, outPath)) {
    return { key, status: 'assets' };
  }

  const urls = buildUrls(desc);
  for (let attempt = 0; attempt < 6; attempt++) {
    const url = urls[attempt % urls.length];
    try {
      const buf = await download(url);
      if (buf.length < 10000) throw new Error('响应过小');
      await saveAsPng(buf, outPath);
      return { key, status: 'ok', size: buf.length };
    } catch (e) {
      if (e.message.includes('402')) await sleep(15000);
      else await sleep(4000 * (attempt + 1));
      if (attempt === 5) return { key, status: 'fail', error: e.message };
    }
  }
}

async function runPool(keys, concurrency) {
  let ok = 0;
  let skip = 0;
  let fail = 0;
  let index = 0;

  async function worker() {
    while (index < keys.length) {
      const i = index++;
      const key = keys[i];
      const r = await generateOne(key, PROMPTS[key]);
      if (r.status === 'ok') {
        ok++;
        console.log(`[${i + 1}/${keys.length}] OK ${key}.png`);
      } else if (r.status === 'skip') {
        skip++;
        console.log(`[${i + 1}/${keys.length}] 跳过 ${key}`);
      } else if (r.status === 'assets') {
        ok++;
        console.log(`[${i + 1}/${keys.length}] assets ${key}.png`);
      } else {
        fail++;
        console.error(`[${i + 1}/${keys.length}] 失败 ${key}: ${r.error}`);
      }
      await sleep(DELAY_MS);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return { ok, skip, fail };
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  let keys = Object.keys(PROMPTS);
  if (process.argv.includes('--only-missing')) {
    keys = keys.filter((k) => {
      const f = path.join(OUT_DIR, `${k}.png`);
      return !fs.existsSync(f) || fs.statSync(f).size < MIN_AI_BYTES;
    });
  }
  console.log(`开始生成 ${keys.length} 个零部件 AI 图片（并发 ${CONCURRENCY}）...`);

  const { ok, skip, fail } = await runPool(keys, CONCURRENCY);

  console.log(`\n完成: 成功 ${ok}, 跳过 ${skip}, 失败 ${fail}`);
  if (fail > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
