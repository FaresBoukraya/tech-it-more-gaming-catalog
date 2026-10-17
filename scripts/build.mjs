#!/usr/bin/env node
/*
  Tech It More build script (no dependencies, Node 18+).

  Source of truth:  data/products.json, data/categories.json, data/stores.json, data/brands.json
  Generated files:  products.js, p/<id>/index.html, c/<slug>/index.html, sitemap.xml,
                    data/missing-data.csv, plus the marked blocks and cache-busting
                    hashes inside index.html.

  Run `npm run build` after editing data. `npm run check` fails if generated files are stale.
*/
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const SITE = 'https://tech-it-more-gaming-catalog.pages.dev';
const SITE_NAME = 'Tech It More';
const IMAGE_EXTS = ['webp', 'avif', 'jpg', 'jpeg', 'png'];

const readJson = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const readText = file => fs.readFileSync(path.join(root, file), 'utf8');
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const jsonLd = obj => JSON.stringify(obj).replace(/</g, '\\u003c');
const sha = text => crypto.createHash('sha1').update(text).digest('hex').slice(0, 8);

/* ---------- load + validate ---------- */
const categories = readJson('data/categories.json');
const storesData = readJson('data/stores.json');
const brandNames = readJson('data/brands.json');
const rawProducts = readJson('data/products.json');
const siteData = readJson('data/site.json'); /* discordUrl: leave empty to hide the Discord button; contactEmail is used for all mailto links */
const MAIL = siteData.contactEmail || 'techitmore.contact@gmail.com';
const backlog = readJson('data/backlog.json'); /* thin entries: never published until they have specs, a photo and a verdict */
const TIERS = ['Budget', 'Mid-range', 'Premium'];
const categoryByLabel = new Map(categories.map(c => [c.label, c]));
const httpsUrl = value => typeof value === 'string' && /^https:\/\/[^\s"'<>]+$/.test(value);

const seenIds = new Set();
const problems = [];
for (const p of rawProducts) {
  if (!/^[a-z0-9-]+$/.test(p.id || '')) problems.push(`bad id: ${p.id}`);
  if (seenIds.has(p.id)) problems.push(`duplicate id: ${p.id}`);
  seenIds.add(p.id);
  if (!p.name || !p.brand) problems.push(`${p.id}: name and brand are required`);
  if (!p.specs || !p.imageUrl) problems.push(`${p.id}: published products need specs and a photo (move it to data/backlog.json)`);
  if (!p.verdict || !p.verdict.bestFor || !p.verdict.downside || !TIERS.includes(p.verdict.tier)) problems.push(`${p.id}: needs verdict.bestFor, verdict.downside and verdict.tier (${TIERS.join('/')})`);
  if (!categoryByLabel.has(p.category)) problems.push(`${p.id}: unknown category "${p.category}"`);
  if (!p.summary || p.summary.split(/\s+/).length > 9) problems.push(`${p.id}: needs a card summary of 9 words or fewer`);
  if (!p.verdict || !p.verdict.skipIf) problems.push(`${p.id}: needs verdict.skipIf (finishes "Skip it if ...")`);
  if (p.checked !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(p.checked)) problems.push(`${p.id}: checked must be YYYY-MM-DD`);
  for (const a of p.alts || []) {
    const other = rawProducts.find(o => o.id === a.id);
    if (!other || a.id === p.id) problems.push(`${p.id}: alternative "${a.id}" is not another published product`);
    else if (other.category !== p.category) problems.push(`${p.id}: alternative "${a.id}" is in a different category`);
    if (!a.why) problems.push(`${p.id}: alternative "${a.id}" needs a reason (alts[].why)`);
  }
  for (const key of ['imageUrl', 'imageSource', 'productSource']) {
    if (p[key] !== undefined && !httpsUrl(p[key])) problems.push(`${p.id}: ${key} must be an https URL`);
  }
}
/* every photo host must be allowed by the Content-Security-Policy in _headers, or the photo silently fails */
{
  const cspImg = ((readText('_headers').match(/img-src ([^;\n]*)/) || [, ''])[1]).split(/\s+/);
  for (const p of rawProducts) {
    const host = new URL(p.imageUrl).hostname;
    if (!cspImg.includes(`https://${host}`)) problems.push(`${p.id}: photo host ${host} is not in img-src in _headers`);
  }
}
for (const [brand, list] of Object.entries(storesData.brandStores)) {
  for (const s of list) if (!storesData.stores[s]) problems.push(`brandStores ${brand}: unknown store ${s}`);
}
for (const [cat, list] of Object.entries(storesData.categoryStores)) {
  if (!categoryByLabel.has(cat)) problems.push(`categoryStores: unknown category ${cat}`);
  for (const s of list) if (!storesData.stores[s]) problems.push(`categoryStores ${cat}: unknown store ${s}`);
}
if (problems.length) {
  console.error('Data problems:\n - ' + problems.join('\n - '));
  process.exit(1);
}

/* ---------- helpers shared with the app ---------- */
function brandLabel(brand) {
  const raw = String(brand).trim();
  const key = raw.toUpperCase();
  if (brandNames[key]) return brandNames[key];
  if (raw !== key) return raw;
  return raw.split(' ').map(w => (w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(' ');
}
const isWireless = p => /wireless|lightspeed|hyperspeed|bluetooth|2\.4\s?ghz/i.test(`${p.name} ${p.specs || ''}`);
function storesFor(p) {
  return storesData.brandStores[p.brand.trim().toUpperCase()] || storesData.categoryStores[p.category] || ['Amazon'];
}
function storeUrl(store, query) {
  const s = storesData.stores[store];
  const url = new URL(s.url);
  url.searchParams.set(s.param || 'q', query);
  return url.href;
}
const localImage = id => {
  for (const ext of IMAGE_EXTS) {
    if (fs.existsSync(path.join(root, 'assets', 'products', `${id}.${ext}`))) return `/assets/products/${id}.${ext}`;
  }
  return '';
};

const products = rawProducts.map(p => {
  const cat = categoryByLabel.get(p.category);
  const local = localImage(p.id);
  const out = { id: p.id, brand: p.brand, name: p.name, category: p.category, art: cat.art, icon: cat.icon };
  if (p.specs) out.specs = p.specs;
  if (local || p.imageUrl) out.imageUrl = local || p.imageUrl;
  if (p.imageSource) out.imageSource = p.imageSource;
  if (p.imageCreator) out.imageCreator = p.imageCreator;
  if (p.productSource) out.productSource = p.productSource;
  out.summary = p.summary;
  out.verdict = p.verdict;
  out.alts = p.alts || [];
  if (p.checked) out.checked = p.checked;
  out.stores = storesFor(p);
  return out;
});
/* Featured order: round-robin across brands so no single brand fills the first screen */
{
  const byBrand = new Map();
  for (const p of products) byBrand.set(p.brand, [...(byBrand.get(p.brand) || []), p]);
  const lists = [...byBrand.values()].sort((a, b) => b.length - a.length), mixed = [];
  while (lists.some(l => l.length)) for (const l of lists) if (l.length) mixed.push(l.shift());
  products.splice(0, products.length, ...mixed);
}

/* ---------- output collection ---------- */
const outputs = new Map();
const put = (rel, content) => outputs.set(rel, content);

/* products.js (data for the app) */
const productsJs =
  '/* GENERATED by scripts/build.mjs from data/*.json. Do not edit by hand. */\n' +
  'window.TIM = {\n' +
  `"brandNames": ${JSON.stringify(brandNames)},\n` +
  `"contact": ${JSON.stringify(MAIL)},\n` +
  `"stores": ${JSON.stringify(storesData.stores)},\n` +
  `"categories": ${JSON.stringify(categories.map(({ label, slug, art, icon }) => ({ label, slug, art, icon })))},\n` +
  '"products": [\n' + products.map(p => JSON.stringify(p)).join(',\n') + '\n]\n};\n';
put('products.js', productsJs);

/* cache-busting hashes for assets referenced by pages */
const assetHash = {
  'site.css': sha(readText('site.css')),
  'app.js': sha(readText('app.js')),
  'products.js': sha(productsJs),
  'theme-init.js': sha(readText('theme-init.js'))
};
const asset = name => `/${name}?v=${assetHash[name]}`;

/* ---------- static pages ---------- */
const TILE = {
  'art-console': 'console', 'art-mouse': 'mouse', 'art-keyboard': 'keyboard', 'art-headphones': 'headset',
  'art-monitor': 'monitor', 'art-computer': 'computer', 'art-storage': 'storage'
};
const tileFor = cat => (cat.label === 'Controllers' ? 'controller' : TILE[cat.art]);
const SINGULAR = {
  'Consoles & handhelds': 'gaming console, handheld or VR product', Controllers: 'gaming controller',
  Keyboards: 'gaming keyboard', Mice: 'gaming mouse', Headsets: 'gaming headset', Audio: 'audio product',
  Monitors: 'gaming monitor', 'PCs & laptops': 'gaming PC or laptop', Components: 'PC component', 'PC hardware': 'PC, monitor or component', 'Streaming & audio': 'streaming or audio product'
};
const productUrl = p => `/p/${p.id}/`;
const categoryUrl = c => `/c/${c.slug}/`;
const fullName = p => {
  const b = brandLabel(p.brand);
  return p.name.toLowerCase().startsWith(b.toLowerCase()) ? p.name : `${b} ${p.name}`;
};
const countBy = label => products.filter(p => p.category === label).length;
const indexable = p => Boolean(p.specs);
/* search results cut titles near 60 characters and descriptions near 155 */
const fitText = (text, max) => (text.length <= max ? text : text.slice(0, max - 1).replace(/[\s,;:.-]+\S*$/, '') + '…');
const fitTitle = (candidates, max = 60) => candidates.find(t => t.length <= max) || fitText(candidates[candidates.length - 1], max);
const lower1 = text => text.charAt(0).toLowerCase() + text.slice(1);
const TIER_ORDER = ['Budget', 'Mid-range', 'Premium'];
const checkedLine = p => (p.checked
  ? `<p class="tm-note">Last checked against the manufacturer's page: ${new Date(p.checked + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}.</p>`
  : `<p class="tm-note">Not yet re-checked against the manufacturer's page, so confirm key specs with the store or maker. <a href="/how-we-choose/#last-checked">What this means</a></p>`);

function head({ title, description, path: pagePath, robots, extraLd = [] }) {
  const url = SITE + pagePath;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
${robots ? `<meta name="robots" content="${robots}">\n` : ''}<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Tech It More: find gaming gear and where to buy it in the US">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/fonts/lora-latin.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="/fonts/carlito-regular.woff" as="font" type="font/woff" crossorigin>
<script src="${asset('theme-init.js')}"></script>
<link rel="stylesheet" href="${asset('site.css')}">
${extraLd.map(ld => `<script type="application/ld+json">${jsonLd(ld)}</script>`).join('\n')}
</head>
<body class="tm-static">
<a class="skip-link" href="#main">Skip to content</a>
<header class="tm-header">
  <div class="tm-header-inner">
    <a class="brand" href="/" aria-label="Tech It More home"><span class="brand-mark" aria-hidden="true">t</span><span>tech<span class="brand-it">it</span><span class="brand-light">more</span></span></a>
    <nav class="tm-topnav" aria-label="Main"><a href="/">Search all gear</a>${categories.map(c => `<a href="${categoryUrl(c)}">${esc(c.label)}</a>`).join('')}</nav>
  </div>
</header>
<main class="tm-main tm-page" id="main">
`;
}
const social = (href, label, path, ext) => `<a class="social-button" href="${href}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="${label}" title="${label}"><svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg></a>`;
const footerHtml = app => `<footer class="tm-footer">
  <div class="tm-footer-inner">
    <div class="tm-footer-grid">
      <div>
        <a class="brand" href="/" aria-label="Tech It More home"><span class="brand-mark" aria-hidden="true">t</span><span>tech<span class="brand-it">it</span><span class="brand-light">more</span></span></a>
        <p>An independent catalog of gaming gear. Every product here has specs, a photo and a plain verdict. We link to US retailers so you can compare where to buy.</p>
      </div>
      <nav class="tm-footer-browse" aria-label="Browse gear"><h2>Browse</h2>
${categories.map(c => `        <a href="${categoryUrl(c)}">${esc(c.label)}</a>`).join('\n')}
      </nav>
      <nav aria-label="About"><h2>About</h2>
        <a href="/how-we-choose/">How we choose</a>
        <a href="/#how-it-works">How it works</a>
        <a href="/#faq">Questions</a>
        <a href="mailto:${MAIL}?subject=Tech%20It%20More%3A%20wrong%20link%20or%20product%20suggestion">Report a wrong link or suggest a product</a>
${app ? '        <button type="button" id="export-button">Export my data</button>\n' : ''}      </nav>
    </div>
    <div class="footer-socials" aria-label="Contact and code">
      ${social(`mailto:${MAIL}?subject=Tech%20It%20More`, 'Send an email', '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7.5 12 13.5l8.5-6"/>', false)}
      ${siteData.discordUrl ? social(siteData.discordUrl, 'Join the Discord', '<path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>', true) : ''}
      ${social('https://github.com/FaresBoukraya/tech-it-more-gaming-catalog', 'Source code on GitHub', '<path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-4.8 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.7-2.3 4.5-4.5 4.8.4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"/>', true)}
    </div>
    <div class="tm-legal"><p>© 2026 Tech It More. Independent and not affiliated with the brands or stores shown; names and photos belong to their owners. Photos load from manufacturers' servers; opening a product may also load extra photos from Wikimedia Commons. Store links open each retailer's own search page.</p></div>
  </div>
</footer>
`;
const foot = `</main>\n${footerHtml(false)}</body>\n</html>\n`;

const breadcrumbLd = items => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + url }))
});

function productPage(p) {
  const cat = categoryByLabel.get(p.category);
  const name = fullName(p);
  const query = fullName(p);
  const noun = SINGULAR[p.category];
  const lede = `Best for: ${p.verdict.bestFor.charAt(0).toLowerCase() + p.verdict.bestFor.slice(1)}.`;
  const desc = `${name} is a ${noun} from ${brandLabel(p.brand)}.` + (p.specs ? ` Key details: ${p.specs}.` : '') + ` Find it at US retailers.`;
  const metaDesc = fitText(`${name}: ${p.summary}. Specs, the catch, and where to find it at US stores.`, 155);
  const byId = new Map(products.map(o => [o.id, o]));
  const alts = (p.alts || []).map(a => ({ ...a, product: byId.get(a.id) })).filter(a => a.product);
  const related = products
    .filter(o => o.category === p.category && o.id !== p.id)
    .sort((a, b) => (b.brand === p.brand) - (a.brand === p.brand) || Boolean(b.specs) - Boolean(a.specs) || a.name.localeCompare(b.name))
    .slice(0, 6);
  const media = p.imageUrl
    ? `<img src="${esc(p.imageUrl)}" alt="${esc(name)}" referrerpolicy="no-referrer" decoding="async" data-fallback="/tiles/${tileFor(cat)}.svg">`
    : `<img class="tm-tile-art" src="/tiles/${tileFor(cat)}.svg" alt="" width="160" height="160">`;
  const credit = p.imageUrl && p.imageSource
    ? `<p class="tm-credit">Photo: <a href="${esc(p.imageSource)}" target="_blank" rel="noopener noreferrer">${esc(p.imageCreator || 'Photo source')}</a></p>` : '';
  const specList = p.specs ? `<ul class="tm-specs">${p.specs.split(' · ').map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : '';
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name, brand: { '@type': 'Brand', name: brandLabel(p.brand) },
    category: p.category, description: desc, url: SITE + productUrl(p),
    ...(p.imageUrl ? { image: p.imageUrl.startsWith('/') ? SITE + p.imageUrl : p.imageUrl } : {})
  };
  return head({
    title: fitTitle([`${name}: buying notes | ${SITE_NAME}`, `${name} | ${SITE_NAME}`, name]), description: metaDesc, path: productUrl(p),
    robots: indexable(p) ? '' : 'noindex,follow',
    extraLd: [ld, breadcrumbLd([['Home', '/'], [cat.label, categoryUrl(cat)], [name, productUrl(p)]])]
  }) + `<nav class="tm-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">›</span><a href="${categoryUrl(cat)}">${esc(cat.label)}</a><span aria-hidden="true">›</span><span aria-current="page">${esc(p.name)}</span></nav>
<article class="tm-product-page">
  <div class="tm-product-media">${media}${credit}</div>
  <div class="tm-product-info">
    <p class="tm-eyebrow">${esc(brandLabel(p.brand))} · ${esc(p.category)}</p>
    <h1>${esc(p.name)}</h1>
    <p class="tm-lead-text">${esc(lede)}</p>
    <dl class="tm-verdict"><dt>The catch</dt><dd>${esc(p.verdict.downside)}.</dd><dt>Skip it if</dt><dd>${esc(p.verdict.skipIf)}.</dd><dt>Typical price tier</dt><dd>${esc(p.verdict.tier)} for ${esc(p.category.toLowerCase())}. A rough guide, not a quote; the store shows the real price.</dd></dl>
    ${specList}
    ${checkedLine(p)}
    <h2>Find it at US retailers</h2>
    <ul class="tm-store-list">${p.stores.map(s => `<li><a href="${esc(storeUrl(s, query))}" target="_blank" rel="noopener noreferrer nofollow"><span>${esc(s)}</span><span aria-hidden="true">Search ↗</span></a></li>`).join('')}</ul>
    <p class="tm-note">Each link opens the store's own search results for this product, so you can pick the exact model and seller yourself. Tech It More does not quote prices or confirm stock; the store does.</p>
    <p class="tm-review-row"><a class="tm-review" href="https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' review')}" target="_blank" rel="noopener noreferrer nofollow"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="m10 9 5 3-5 3z" fill="#fff"/></svg><span>Watch reviews on YouTube</span><span aria-hidden="true">↗</span></a><small>Opens a YouTube search. Reviews are made by other people.</small></p>
    <p><a class="tm-primary tm-inline-primary" href="/#product=${encodeURIComponent(p.id)}">Open in the catalog</a></p>
  </div>
</article>
${alts.length ? `<section class="tm-section">
  <h2>If not this, consider</h2>
  <ul class="tm-related">${alts.map(a => `<li><a href="${productUrl(a.product)}"><strong>${esc(a.product.name)}</strong><span>${esc(a.why)}</span></a></li>`).join('')}</ul>
</section>
` : ''}<section class="tm-section">
  <p><a href="${categoryUrl(cat)}">Read the ${esc(cat.label.toLowerCase())} buying guide</a> · <a href="/how-we-choose/">How we choose</a></p>
</section>
${related.length ? `<section class="tm-section">
  <h2>More ${esc(cat.label.toLowerCase())}</h2>
  <ul class="tm-related">${related.map(o => `<li><a href="${productUrl(o)}"><strong>${esc(o.name)}</strong><span>${esc(brandLabel(o.brand))}</span></a></li>`).join('')}</ul>
</section>
` : ''}` + foot;
}

function categoryPage(cat) {
  const list = products.filter(p => p.category === cat.label)
    .sort((a, b) => Boolean(b.specs) - Boolean(a.specs) || brandLabel(a.brand).localeCompare(brandLabel(b.brand)) || a.name.localeCompare(b.name));
  const title = fitTitle([`${cat.title}: buying guide | ${SITE_NAME}`, `${cat.title} | ${SITE_NAME}`, cat.title]);
  const description = fitText(`${cat.intro} ${list.length} products, each with a plain verdict and store links.`, 155);
  const row = p => `<li><a href="${productUrl(p)}">${p.imageUrl ? `<img src="${esc(p.imageUrl)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" width="72" height="72" data-fallback="/tiles/${tileFor(cat)}.svg">` : `<img class="tm-tile-art" src="/tiles/${tileFor(cat)}.svg" alt="" loading="lazy" width="72" height="72">`}<span><strong>${esc(p.name)}</strong><small>${esc(brandLabel(p.brand))} · ${esc(p.summary)}</small><small class="tm-row-catch">Catch: ${esc(lower1(p.verdict.downside))}</small></span></a></li>`;
  const tierGroups = TIER_ORDER.map(t => [t, list.filter(p => p.verdict.tier === t)]).filter(([, g]) => g.length);
  const ld = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: cat.title, description: cat.intro, url: SITE + categoryUrl(cat),
    mainEntity: { '@type': 'ItemList', numberOfItems: list.length, itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + productUrl(p), name: fullName(p) })) }
  };
  return head({
    title, description, path: categoryUrl(cat),
    extraLd: [ld, breadcrumbLd([['Home', '/'], [cat.label, categoryUrl(cat)]])]
  }) + `<nav class="tm-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">›</span><span aria-current="page">${esc(cat.label)}</span></nav>
<h1>${esc(cat.title)}</h1>
<p class="tm-lead-text">${esc(cat.intro)}</p>
<section class="tm-section">
  <h2>What to check before you buy</h2>
  <ul class="tm-tips">${cat.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
</section>
<section class="tm-section">
  <h2>${list.length} ${esc(cat.label.toLowerCase())} in the catalog</h2>
  <p><a href="/?cat=${encodeURIComponent(cat.label)}">Search and filter these in the catalog</a></p>
  ${tierGroups.map(([t, g]) => `<h3 class="tm-tier-heading">${esc(t)} <span>${g.length}</span></h3>\n  <ul class="tm-listing">${g.map(row).join('')}</ul>`).join('\n  ')}
</section>
<section class="tm-section">
  <h2>Other categories</h2>
  <ul class="tm-related">${categories.filter(c => c !== cat).map(c => `<li><a href="${categoryUrl(c)}"><strong>${esc(c.label)}</strong><span>${countBy(c.label)} products</span></a></li>`).join('')}</ul>
</section>
` + foot;
}

function howPage() {
  const mail = `mailto:${MAIL}?subject=Tech%20It%20More%3A%20correction`;
  return head({
    title: fitTitle([`How we choose | ${SITE_NAME}`]), description: 'What a Tech It More verdict is made from, what the price tiers mean, and what we do not do.',
    path: '/how-we-choose/', extraLd: [breadcrumbLd([['Home', '/'], ['How we choose', '/how-we-choose/']])]
  }) + `<nav class="tm-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">›</span><span aria-current="page">How we choose</span></nav>
<h1>How we choose</h1>
<p class="tm-lead-text">Tech It More is a catalog of gaming gear with a short, plain verdict on each product. These are buying notes, not tested reviews. Here is what goes into one, and what does not.</p>
<section class="tm-section tm-prose">
  <h2>What each entry contains</h2>
  <ul class="tm-tips">
    <li>Specs taken from the manufacturer's own product page.</li>
    <li>A photo from the manufacturer's site, with a link back to the source.</li>
    <li><strong>Best for</strong>: the kind of player or setup the product suits.</li>
    <li><strong>The catch</strong>: the main trade-off to know before you pay.</li>
    <li><strong>Skip it if</strong>: the situation where another product is the better buy.</li>
    <li>Up to three alternatives, each with the reason it is on the list.</li>
  </ul>
</section>
<section class="tm-section tm-prose">
  <h2>What the price tiers mean</h2>
  <p>Budget, Mid-range and Premium are relative to other gear in the same category. A Premium mouse and a Premium console are very different amounts of money. The tier is a rough guide, not a quote; the retailer shows the real price.</p>
</section>
<section class="tm-section tm-prose">
  <h2>What we do not do</h2>
  <ul class="tm-tips">
    <li>We do not test products, score them or rank them.</li>
    <li>We do not quote prices or confirm stock ourselves. Each store link is a plain search on that retailer's own site.</li>
    <li>We do not claim a verdict is final. Products get replaced and prices move.</li>
  </ul>
</section>
<section class="tm-section tm-prose">
  <h2 id="last-checked">Last checked</h2>
  <p>When a product shows a "Last checked" date, its specs and claims were compared with the manufacturer's page on that date. A product marked "Not yet re-checked" has not had that pass yet, so confirm key specs with the store or the maker.</p>
</section>
<section class="tm-section tm-prose">
  <h2>What is still missing</h2>
  <p>The catalog is small, and some brands are better covered than others. Budget picks are thin in several categories. We would rather say so than hide it, and we are adding products category by category.</p>
</section>
<section class="tm-section tm-prose">
  <h2>Spotted a mistake?</h2>
  <p><a href="${mail}">Email us a correction</a> with the product name and what is wrong, and we will fix it.</p>
</section>
` + foot;
}
put('how-we-choose/index.html', howPage());
for (const p of products) put(`p/${p.id}/index.html`, productPage(p));
for (const c of categories) put(`c/${c.slug}/index.html`, categoryPage(c));

/* sitemap: home, category guides, and product pages that have real details */
const urls = ['/', '/how-we-choose/', ...categories.map(categoryUrl), ...products.filter(indexable).map(productUrl)];
put('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);

/* data to-do list */
const csvCell = v => `"${String(v).replace(/"/g, '""')}"`;
put('data/missing-data.csv', ['id,brand,name,category,has_photo,has_specs']
  .concat(backlog
    .sort((a, b) => a.category.localeCompare(b.category) || a.brand.localeCompare(b.brand))
    .map(p => [p.id, p.brand, p.name, p.category, p.imageUrl ? 'yes' : 'no', p.specs ? 'yes' : 'no'].map(csvCell).join(','))).join('\n') + '\n');

const OLD_CAT = { Audio: 'Streaming & audio', Monitors: 'PC hardware', 'PCs & laptops': 'PC hardware', Components: 'PC hardware' };
const OLD_CATEGORY_URLS = '/c/audio/ /c/streaming-audio/ 301\n/c/monitors/ /c/pc-hardware/ 301\n/c/pcs-laptops/ /c/pc-hardware/ 301\n/c/components/ /c/pc-hardware/ 301\n';
/* old product URLs that were cut now land on their category guide */
put('_redirects', OLD_CATEGORY_URLS + backlog.map(p => `/p/${p.id}/ ${categoryUrl(categories.find(c => c.label === (OLD_CAT[p.category] || p.category)) || categories[0])} 301`).join('\n') + '\n');

/* ---------- index.html: marked blocks, counts, cache-busting ---------- */
let indexHtml = readText('index.html');
const block = (name, inner) => {
  const re = new RegExp(`(<!--build:${name}-->)[\\s\\S]*?(<!--/build:${name}-->)`);
  if (!re.test(indexHtml)) throw new Error(`index.html is missing the build:${name} markers`);
  indexHtml = indexHtml.replace(re, (_, a, b) => `${a}\n${inner}\n${b}`);
};
block('footer', footerHtml(true));
block('noscript', `    <noscript><div class="tm-noscript"><p><strong>Search and filters need JavaScript.</strong> You can still browse by category:</p><ul>${categories.map(c => `<li><a href="${categoryUrl(c)}">${esc(c.label)}</a></li>`).join('')}</ul></div></noscript>`);
indexHtml = indexHtml
  .replace(/(id="hero-count">)\d+(<)/, `$1${products.length}$2`)
  .replace(/(id="results-count"[^>]*>)\d+ products(<)/, `$1${products.length} products$2`)
  .replace(/(Browse )\d+( gaming products)/, `$1${products.length}$2`);
for (const [name, hash] of Object.entries(assetHash)) {
  const re = new RegExp(`((?:src|href)="/?${name.replace('.', '\\.')})\\?v=[^"]*(")`, 'g');
  indexHtml = indexHtml.replace(re, `$1?v=${hash}$2`);
}
put('index.html', indexHtml);

/* ---------- write or check ---------- */
const stale = [];
for (const [rel, content] of outputs) {
  const file = path.join(root, rel);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (existing === content) continue;
  stale.push(rel);
  if (!CHECK) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
}
/* remove generated pages for products/categories that no longer exist */
for (const [dir, valid] of [['p', new Set(products.map(p => p.id))], ['c', new Set(categories.map(c => c.slug))]]) {
  const base = path.join(root, dir);
  if (!fs.existsSync(base)) continue;
  for (const entry of fs.readdirSync(base)) {
    if (valid.has(entry)) continue;
    stale.push(`${dir}/${entry}/ (removed)`);
    if (!CHECK) fs.rmSync(path.join(base, entry), { recursive: true, force: true });
  }
}
if (CHECK) {
  if (stale.length) {
    console.error(`Generated files are out of date (${stale.length}). Run "npm run build".\n - ` + stale.slice(0, 20).join('\n - '));
    process.exit(1);
  }
  console.log('Generated files are up to date.');
} else {
  const thin = products.filter(p => !indexable(p)).length;
  console.log(`Built ${products.length} product pages (${products.length - thin} indexable, ${thin} noindex until specs are added), ${categories.length} category pages. ${stale.length} files changed.`);
}
