#!/usr/bin/env node
/*
  Downloads each product's remote photo into assets/products/<id>.<ext> so the site can host its own copy.
  The build (scripts/build.mjs) automatically prefers a local file when one exists.

  Only use this for images you are allowed to host (for example manufacturer press-kit images
  or Creative Commons images with attribution). Keep imageSource / imageCreator filled in.

  Usage:  node scripts/fetch-images.mjs [--only id1,id2] [--limit 20] [--force] [--dry-run]
          [--data path/to/products.json] [--out path/to/dir]
  Optional: `npm i -D sharp` makes it also resize to max 800px WebP.
*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = name => args.includes(`--${name}`);
const value = name => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };

const dataFile = path.resolve(value('data') || path.join(root, 'data', 'products.json'));
const outDir = path.resolve(value('out') || path.join(root, 'assets', 'products'));
const only = value('only') ? new Set(value('only').split(',')) : null;
const limit = Number(value('limit') || Infinity);
const MAX_BYTES = 6 * 1024 * 1024;
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' };

let sharp = null;
try { sharp = (await import('sharp')).default; } catch { /* optional */ }

const products = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
const exists = id => fs.readdirSync(outDir).some(f => f.startsWith(`${id}.`));

let done = 0, skipped = 0, failed = 0;
for (const p of products) {
  if (done >= limit) break;
  if (!p.imageUrl || (only && !only.has(p.id))) continue;
  if (!flag('force') && exists(p.id)) { skipped++; continue; }
  if (flag('dry-run')) { console.log(`would fetch ${p.id}`); done++; continue; }
  try {
    const res = await fetch(p.imageUrl, { headers: { 'user-agent': 'TechItMore-image-fetch/1.0' }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (!EXT[type]) throw new Error(`unsupported content-type "${type}"`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > MAX_BYTES) throw new Error(`too large (${buf.length} bytes)`);
    let data = buf, ext = EXT[type];
    if (sharp) {
      data = await sharp(buf).resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
      ext = 'webp';
    }
    for (const f of fs.readdirSync(outDir)) if (f.startsWith(`${p.id}.`)) fs.rmSync(path.join(outDir, f));
    fs.writeFileSync(path.join(outDir, `${p.id}.${ext}`), data);
    console.log(`ok   ${p.id}.${ext} (${Math.round(data.length / 1024)} KB)`);
    done++;
  } catch (error) {
    console.warn(`FAIL ${p.id}: ${error.message}`);
    failed++;
  }
}
console.log(`\nDownloaded ${done}, skipped ${skipped} already local, failed ${failed}.${sharp ? '' : ' (Install sharp to resize/convert to WebP.)'}`);
if (done && !flag('dry-run')) console.log('Now run: npm run build');
