const TIM = window.TIM || { products: [], stores: {}, categories: [], brandNames: {} };
const products = TIM.products;
const BRAND_NAMES = TIM.brandNames;
const categoryOrder = TIM.categories.map(category => category.label);
const categories = ["All products", ...[...new Set(products.map(product => product.category))].sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b))];
const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const categoryList = document.querySelector("#category-list");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const brandSelect = document.querySelector("#brand-select");
const wirelessToggle = document.querySelector("#wireless-toggle");
const activeFiltersEl = document.querySelector("#active-filters");
const recentRow = document.querySelector("#recent-row");
const suggestionsBox = document.querySelector("#search-suggestions");
const searchWrap = document.querySelector("#search-wrap");
const searchClear = document.querySelector("#search-clear");
const shareListButton = document.querySelector("#share-list");
const clearSavedButton = document.querySelector("#clear-saved");
let clearSavedTimer;
const catalogTitle = document.querySelector("#catalog-title");
const sharedBanner = document.querySelector("#shared-banner");
const backToTop = document.querySelector("#back-to-top");
let activeBrand = "All brands";
let wirelessOnly = false;
let sharedIds = null;
let recentIds = [];
let suggestionItems = [];
let suggestionIndex = -1;
const loadMoreButton = document.querySelector("#load-more");
const dialog = document.querySelector("#product-dialog");
const dialogContent = document.querySelector("#dialog-content");
const dialogBackdrop = document.querySelector("#dialog-backdrop");
const photoLightbox = document.querySelector("#photo-lightbox");
const photoLightboxImage = document.querySelector("#photo-lightbox-image");
const photoLightboxCaption = document.querySelector("#photo-lightbox-caption");
const photoLightboxScroll = document.querySelector("#photo-lightbox-scroll");
const toast = document.querySelector("#toast");
let activeCategory = "All products";
const themeToggle = document.querySelector("#theme-toggle");
let toastTimer;
let previouslyFocusedElement;
const sortSelect = document.querySelector("#sort-select");
const watchlistFilter = document.querySelector("#watchlist-filter");
const watchlistCount = document.querySelector("#watchlist-count");
const exportButton = document.querySelector("#export-button");
let watchlist = new Set();
let catalogProducts = [];
const productPhotoCache = new Map();
let gallerySlideTimer;
let gallerySlideshowPlaying = false;
let gallerySlideInterval = 4500;
let handlingProductHistory = false;
let productDialogRequest = 0;
const catalogPageSize = 36;

const STORAGE_PREFIX = "tim:";
const memoryStore = new Map();
function storageGet(key) {
  if (memoryStore.has(key)) return memoryStore.get(key);
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch (error) {
    return undefined;
  }
}
function storageSet(key, value) {
  memoryStore.set(key, value);
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    /* Storage is blocked or full: the value stays in memory for this visit. */
  }
}
function readSetting(key) {
  return Promise.resolve(storageGet(key));
}
function saveSetting(key, value) {
  storageSet(key, value);
  return Promise.resolve();
}

async function toggleWatchlist(productId) {
  const next = new Set(watchlist);
  if (next.has(productId)) next.delete(productId);
  else next.add(productId);
  await saveSetting("watchlist", [...next]);
  watchlist = next;
  renderWatchlistPanel();
  if (savedOnly()) {
    renderCatalog();
    return;
  }
  const saved = watchlist.has(productId);
  grid.querySelectorAll("[data-watch-id]").forEach(button => {
    if (button.dataset.watchId !== productId) return;
    const name = button.closest(".tm-card")?.querySelector(".tm-name")?.textContent || "product";
    button.classList.toggle("saved", saved);
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${name} ${saved ? "from" : "to"} your saved list`);
  });
}

async function exportLocalData() {
  const data = {
    exportedAt: new Date().toISOString(),
    notice: "Your saved list, recently viewed items and theme from this browser. Store links open retailer searches.",
    watchlist: [...watchlist],
    recent: recentIds,
    theme: document.documentElement.dataset.theme
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "tech-it-more-data.json";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Your saved list was exported as JSON.");
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeToggle.querySelector(".theme-icon").innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${isDark ? '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>' : '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'}</svg>`;
  themeToggle.querySelector(".theme-label").textContent = isDark ? "Light mode" : "Dark mode";
  document.querySelector("#theme-color").content = isDark ? "#0e1117" : "#f3f2fa";
}

function reviewSearchUrl(product) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${fullProductName(product)} review`)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function safeExternalUrl(value, fallback) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : fallback;
  } catch {
    return fallback;
  }
}

const ICON_PATHS = {
  "All products": '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
  "Consoles & handhelds": '<rect x="2.5" y="6" width="19" height="12" rx="3"/><rect x="8.5" y="8.5" width="7" height="7" rx="1.2"/><path d="M5.2 10.5v3M3.9 12h2.6"/><circle cx="18.6" cy="11" r=".8" fill="currentColor"/>',
  "Controllers": '<path d="M7 8h10a4 4 0 0 1 3.9 4.9l-.8 3.6a2 2 0 0 1-3.4 1l-1.8-2.1H9.1l-1.8 2.1a2 2 0 0 1-3.4-1l-.8-3.6A4 4 0 0 1 7 8z"/><path d="M8.5 10.8v3M7 12.3h3"/><circle cx="15.5" cy="11.6" r=".8" fill="currentColor"/><circle cx="17.3" cy="13.4" r=".8" fill="currentColor"/>',
  "Keyboards": '<rect x="2" y="6" width="20" height="12" rx="2.2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7.5 14h9"/>',
  "Mice": '<rect x="6.5" y="3" width="11" height="18" rx="5.5"/><path d="M12 3v6"/>',
  "Headsets": '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.6"/><rect x="17" y="14" width="4" height="6" rx="1.6"/>',
  "Streaming & audio": '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/>',
  "PC hardware": '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
};
function categoryIcon(category) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[category] || ICON_PATHS["All products"]}</svg>`;
}
const HEART_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';
function fullProductName(product) {
  const brand = brandLabel(product.brand);
  return product.name.toLowerCase().startsWith(brand.toLowerCase()) ? product.name : `${brand} ${product.name}`;
}
function brandLabel(brand) {
  const raw = String(brand || "").trim();
  const key = raw.toUpperCase();
  if (BRAND_NAMES[key]) return BRAND_NAMES[key];
  if (raw !== key) return raw;
  return raw.split(" ").map(word => (word.length <= 3 ? word : word.charAt(0) + word.slice(1).toLowerCase())).join(" ");
}
const CATEGORY_WORDS = {
  "Consoles & handhelds": "console handheld", "Controllers": "controller gamepad", "Keyboards": "keyboard", "Mice": "mouse",
  "Headsets": "headset headphones", "Streaming & audio": "audio microphone streaming capture webcam", "PC hardware": "pc laptop computer monitor display component gpu cpu ssd"
};
function isWireless(product) {
  return /wireless|lightspeed|hyperspeed|bluetooth|2\.4\s?ghz/i.test(`${product.name} ${product.specs || ""}`);
}
function specText(product) {
  const specs = String(product.specs || "").trim();
  return /not listed|check the/i.test(specs) ? "" : specs;
}
function matchesTerms(product, terms) {
  const haystack = `${brandLabel(product.brand)} ${product.name} ${product.category} ${CATEGORY_WORDS[product.category] || ""} ${specText(product)}`.toLocaleLowerCase();
  return terms.every(term => haystack.includes(term));
}
// Typo help: closest brand/product word within a small edit distance.
function editDistance(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 3;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = row;
  }
  return prev[b.length];
}
function didYouMean(query) {
  const vocab = new Map();
  catalogProducts.forEach(product => {
    const brand = brandLabel(product.brand);
    vocab.set(brand.toLocaleLowerCase(), brand);
    `${product.name} ${product.category}`.split(/[\s/&-]+/).forEach(word => {
      const w = word.toLocaleLowerCase();
      if (w.length >= 4 && !/\d/.test(w)) vocab.set(w, word);
    });
  });
  const words = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let changed = false;
  const fixed = words.map(word => {
    if (word.length < 4 || vocab.has(word)) return word;
    let best = null, bestDistance = word.length >= 6 ? 2 : 1;
    vocab.forEach((label, key) => {
      const d = editDistance(word, key);
      if (d <= bestDistance && (!best || d < best.d)) best = { d, label: key };
    });
    if (best) { changed = true; return best.label; }
    return word;
  });
  if (!changed) return "";
  const result = fixed.join(" ");
  return catalogProducts.some(product => matchesTerms(product, fixed)) ? result : "";
}
function savedOnly() {
  return watchlistFilter.getAttribute("aria-pressed") === "true";
}
function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function scrollToCatalog() {
  // Scroll to the category row (not the product heading) so the tiles stay visible under the sticky header.
  const target = document.querySelector("#category-list") || document.querySelector("#catalog");
  const header = document.querySelector(".tm-header");
  const offset = (header ? header.offsetHeight : 0) + 12;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion() ? "auto" : "smooth" });
}
function setWireless(value) {
  wirelessOnly = value;
  wirelessToggle.setAttribute("aria-pressed", String(value));
}
function updateSearchState() {
  searchWrap.classList.toggle("has-text", searchInput.value.length > 0);
}

// "Featured" puts products that have a photo and specs ahead of bare listings.
function featuredScore(product) {
  return (product.imageUrl ? 2 : 0) + (specText(product) ? 1 : 0);
}

function searchableProducts(allProducts, { ignoreTier = false, ignoreWireless = false } = {}) {
  const terms = searchInput.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const onlySaved = savedOnly();
  const visible = allProducts.filter(product => {
    if (sharedIds && !sharedIds.includes(product.id)) return false;
    if (activeCategory !== "All products" && product.category !== activeCategory) return false;
    if (activeBrand !== "All brands" && brandLabel(product.brand) !== activeBrand) return false;
    if (wirelessOnly && !ignoreWireless && !isWireless(product)) return false;
    if (!ignoreTier && activeTier !== "All tiers" && tierOf(product) !== activeTier) return false;
    if (onlySaved && !watchlist.has(product.id)) return false;
    return !terms.length || matchesTerms(product, terms);
  });
  if (sortSelect.value === "popular") visible.sort((a, b) => featuredScore(b) - featuredScore(a));
  if (sortSelect.value === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
  if (sortSelect.value === "brand") visible.sort((a, b) => brandLabel(a.brand).localeCompare(brandLabel(b.brand)) || a.name.localeCompare(b.name));
  return visible;
}

const tierOf = product => (product.verdict && product.verdict.tier) || "";
function checkedDate(value) {
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
function verdictMarkup(product) {
  const v = product.verdict;
  if (!v) return "";
  const checked = product.checked && checkedDate(product.checked);
  return `<dl class="tm-verdict"><dt>Best for</dt><dd>${escapeHtml(v.bestFor)}</dd><dt>The catch</dt><dd>${escapeHtml(v.downside)}</dd>${v.skipIf ? `<dt>Skip it if</dt><dd>${escapeHtml(v.skipIf)}.</dd>` : ""}<dt>Typical price tier</dt><dd>${escapeHtml(v.tier)}. A rough guide, not a quote.</dd><dt>Last checked</dt><dd>${checked ? `${escapeHtml(checked)}, against the manufacturer's page.` : "Not yet re-checked against the manufacturer's page. Confirm key specs with the store or maker."}</dd></dl>`;
}
function quickFactsMarkup(product) {
  const v = product.verdict || {};
  const checked = product.checked && checkedDate(product.checked);
  const rows = [];
  if (v.tier) rows.push(`<div><dt>Price tier</dt><dd>${escapeHtml(v.tier)}</dd></div>`);
  rows.push(`<div><dt>Last checked</dt><dd>${checked ? escapeHtml(checked) : "Not yet re-checked"}</dd></div>`);
  return `<dl class="detail-quick-facts">${rows.join("")}</dl>${reviewMarkup(product)}`;
}
function alternativesMarkup(product) {
  const picks = (product.alts || []).map(alt => ({ why: alt.why, other: products.find(item => item.id === alt.id) })).filter(alt => alt.other);
  if (!picks.length) return "";
  return `<div class="tm-alts"><h3>If not this, consider</h3><ul>${picks.map(({ other, why }) => `<li><a href="/p/${escapeHtml(other.id)}/" data-open-product="${escapeHtml(other.id)}"><span class="tm-alt-text"><strong>${escapeHtml(other.name)}</strong><span class="tm-alt-why">${escapeHtml(why)}</span><small>${escapeHtml(brandLabel(other.brand))}${other.verdict && other.verdict.tier ? ` · ${escapeHtml(other.verdict.tier)}` : ""}</small></span><span class="tm-alt-go" aria-hidden="true">›</span></a></li>`).join("")}</ul></div>`;
}
const YT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="m10 9 5 3-5 3z" fill="#fff"/></svg>';
function reviewMarkup(product) {
  return `<p class="tm-review-row"><a class="tm-review" href="${escapeHtml(reviewSearchUrl(product))}" target="_blank" rel="noopener noreferrer nofollow">${YT_ICON}<span>Watch reviews on YouTube</span><span aria-hidden="true">↗</span></a><small>Opens a YouTube search. Reviews are made by other people.</small></p>`;
}
function renderSpotlight() {
  const box = document.querySelector("#spotlight");
  const pool = products.filter(p => p.verdict && p.verdict.downside);
  if (!box || !pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  const name = escapeHtml(fullProductName(pick));
  const best = pick.verdict.bestFor ? `<p class="tm-spot-best">Best for: ${escapeHtml(pick.verdict.bestFor.charAt(0).toLowerCase() + pick.verdict.bestFor.slice(1))}.</p>` : "";
  box.innerHTML = `<p class="tm-spot-label">Before you buy <span class="tm-spot-random">· a random pick each visit</span> <button type="button" class="tm-spot-again" data-spot-again>Another</button></p><p class="tm-spot-name">${name}</p><p class="tm-spot-catch"><span class="tm-spot-tag">The catch:</span> ${escapeHtml(pick.verdict.downside)}.</p>${best}<a class="tm-spot-link" href="/p/${escapeHtml(pick.id)}/">Read the full verdict<span class="sr-only"> for ${name}</span></a>`;
}
let activeTier = "All tiers";

function cardMarkup(product) {
  const name = escapeHtml(product.name);
  const brand = escapeHtml(brandLabel(product.brand));
  const kind = escapeHtml(product.category);
  const productId = escapeHtml(product.id);
  const saved = watchlist.has(product.id);
  const icon = categoryIcon(product.category);
  const media = product.imageUrl
    ? `<img class="tm-photo" src="${escapeHtml(product.imageUrl)}" alt="${brand} ${name}" loading="lazy" decoding="async"><span class="tm-icon" aria-hidden="true" hidden>${icon}</span>`
    : `<span class="tm-icon" aria-hidden="true">${icon}</span>`;
  return `<article class="tm-card" data-kind="${kind}">
    <button class="tm-open" type="button" data-product-id="${productId}" aria-label="${brand} ${name}: see where to buy">
      <span class="tm-tile">${media}${isWireless(product) ? '<span class="tm-pill">Wireless</span>' : ""}</span>
      <span class="tm-body"><span class="tm-brand">${brand}</span><span class="tm-name">${name}</span>${product.summary ? `<span class="tm-summary">${escapeHtml(product.summary)}</span>` : ""}${product.verdict && product.verdict.tier ? `<span class="tm-tier">${escapeHtml(product.verdict.tier)}</span>` : ""}</span>
    </button>
    <button class="tm-heart${saved ? " saved" : ""}" type="button" data-watch-id="${productId}" aria-pressed="${saved}" aria-label="${saved ? "Remove" : "Save"} ${name} ${saved ? "from" : "to"} your saved list">${HEART_ICON}</button>
  </article>`;
}

function getAdditionalProductPhotos(product) {
  if (productPhotoCache.has(product.id)) return productPhotoCache.get(product.id);
  const photosPromise = (async () => {
    const primaryUrl = product.imageUrl ? product.imageUrl.split("?")[0].replace(/\/+$/, "") : "";
    const additionalPhotos = [];
    if (/corsair/i.test(product.brand) && product.imageUrl) {
      const corsairImage = product.imageUrl.match(/^(.*_)(\d{2})(\.[a-z0-9]+)(\?.*)?$/i);
      if (corsairImage) {
        const candidates = Array.from({ length: 9 }, (_, index) => {
          const number = String(index + 2).padStart(2, "0");
          return {
            title: `${product.name} photo ${number}`,
            imageUrl: `${corsairImage[1].replace("w_1200", "w_800")}${number}${corsairImage[3]}${corsairImage[4] || ""}`,
            sourceUrl: product.imageSource,
            credit: "Official Corsair product photo"
          };
        });
        const checkedPhotos = await Promise.all(candidates.map(photo => new Promise(resolve => {
          const image = new Image();
          image.onload = () => resolve(photo);
          image.onerror = () => resolve(null);
          image.src = photo.imageUrl;
        })));
        additionalPhotos.push(...checkedPhotos.filter(Boolean).slice(0, 3));
      }
    }
    if (additionalPhotos.length >= 3) return additionalPhotos;

    const url = new URL("https://commons.wikimedia.org/w/api.php");
    url.search = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `${product.brand} ${product.name}`,
      gsrnamespace: "6",
      gsrlimit: "12",
      prop: "imageinfo",
      iiprop: "url",
      iiurlwidth: "500",
      format: "json",
      origin: "*"
    }).toString();
    let commonsPhotos = [];
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Wikimedia Commons returned HTTP ${response.status}.`);
      const payload = await response.json();
      const pages = payload && typeof payload === "object" && payload.query && payload.query.pages
        ? Object.values(payload.query.pages)
        : [];
      const productTerms = `${product.brand} ${product.name}`.toLowerCase().match(/[a-z0-9]+/g) || [];
      const distinctiveTerms = productTerms.filter(term => term.length > 2
        && !["gaming", "wireless", "mechanical", "official", "product", "edition", "model", "corsair"].includes(term));
      commonsPhotos = pages
        .map(page => {
          const image = page.imageinfo?.[0];
          if (!image || typeof image.thumburl !== "string" || typeof image.descriptionurl !== "string") return null;
          return {
            title: typeof page.title === "string" ? page.title.replace(/^File:/, "") : product.name,
            imageUrl: image.thumburl,
            sourceUrl: image.descriptionurl,
            credit: "Wikimedia Commons · author and license"
          };
        })
        .filter(photo => photo
          && photo.imageUrl.split("?")[0].replace(/\/+$/, "") !== primaryUrl
          && !additionalPhotos.some(item => item.imageUrl.split("?")[0] === photo.imageUrl.split("?")[0])
          && distinctiveTerms.some(term => photo.title.toLowerCase().includes(term)))
        .filter((photo, index, photos) => photos.findIndex(item => item.imageUrl === photo.imageUrl) === index);
    } catch (error) {
      console.error(`Could not search Wikimedia Commons for "${product.id}".`, error);
    }
    return [...additionalPhotos, ...commonsPhotos].slice(0, 5);
  })();
  const cachedPromise = photosPromise.catch(error => {
    productPhotoCache.delete(product.id);
    throw error;
  });
  productPhotoCache.set(product.id, cachedPromise);
  return cachedPromise;
}

function renderAdditionalProductPhotos(product) {
  const status = dialogContent.querySelector("#photo-gallery-status");
  const thumbnails = dialogContent.querySelector("#photo-gallery-thumbnails");
  const gallery = dialogContent.querySelector("#product-photo-gallery");
  if (!status || !thumbnails || !gallery) return;
  getAdditionalProductPhotos(product)
    .then(photos => {
      const detail = dialogContent.querySelector(".detail-content");
      if (!detail || detail.dataset.productId !== product.id) return;
      if (!photos.length) {
        stopGallerySlideshow();
        thumbnails.hidden = true;
        const slideshowButton = dialogContent.querySelector("#gallery-slideshow-toggle");
        if (slideshowButton) slideshowButton.disabled = true;
        status.innerHTML = product.imageSource
          ? `<a href="${escapeHtml(product.imageSource)}" target="_blank" rel="noopener noreferrer">More photos on the maker's page ↗</a>`
          : "";
        return;
      }
      const allPhotos = [{
        title: `${product.brand} ${product.name}`,
        imageUrl: product.imageUrl || "",
        sourceUrl: product.imageSource || product.productSource || "https://commons.wikimedia.org/",
        credit: product.imageCreator || "Product photo"
      }, ...photos];
      const defaultIndex = /corsair/i.test(product.brand) && photos.length ? 1 : 0;
      thumbnails.innerHTML = allPhotos.map((photo, index) => {
        const title = escapeHtml(photo.title);
        const imageUrl = escapeHtml(photo.imageUrl);
        const sourceUrl = escapeHtml(photo.sourceUrl);
        const credit = escapeHtml(photo.credit || "Photo source");
        return `<div class="photo-thumb-item">
          <button class="photo-thumb${index === defaultIndex ? " selected" : ""}" type="button" data-gallery-index="${index}" data-photo-url="${imageUrl}" data-photo-title="${title}" data-photo-credit="${credit}" data-photo-source="${sourceUrl}" aria-label="Show photo ${index + 1} of ${allPhotos.length}: ${title}" aria-pressed="${index === defaultIndex}">
            <img src="${imageUrl}" alt="" loading="lazy" decoding="async">
          </button>
        </div>`;
      }).join("");
      thumbnails.hidden = false;
      gallery.dataset.selectedIndex = String(defaultIndex);
      dialogContent.querySelectorAll("[data-photo-step]").forEach(button => {
        button.disabled = false;
        button.hidden = false;
      });
      const slideshowButton = dialogContent.querySelector("#gallery-slideshow-toggle");
      if (slideshowButton) { slideshowButton.disabled = allPhotos.length < 2; slideshowButton.hidden = false; }
      const counter = dialogContent.querySelector("#photo-gallery-counter");
      if (counter) { counter.textContent = `${defaultIndex + 1} / ${allPhotos.length}`; counter.hidden = false; }
      selectProductGalleryPhoto(defaultIndex);
      status.textContent = `${allPhotos.length} photos`;
      startGallerySlideshow();
    })
    .catch(error => {
      console.error(`Could not load additional photos for "${product.id}".`, error);
      stopGallerySlideshow();
      const detail = dialogContent.querySelector(".detail-content");
      if (detail && detail.dataset.productId === product.id) {
        status.textContent = "Additional photos couldn't be loaded. The main product photo is still available above.";
      }
    });
}

function selectProductGalleryPhoto(index) {
  const gallery = dialogContent.querySelector("#product-photo-gallery");
  const buttons = [...dialogContent.querySelectorAll("[data-gallery-index]")];
  const button = buttons[index];
  if (!gallery || !button) return;
  const mainPhoto = dialogContent.querySelector("#gallery-main-photo");
  const creditLink = dialogContent.querySelector("#photo-credit-link");
  const creditLabel = dialogContent.querySelector("#photo-credit-label");
  const counter = dialogContent.querySelector("#photo-gallery-counter");
  if (!mainPhoto || !creditLink || !creditLabel || !counter) return;
  mainPhoto.src = button.dataset.photoUrl;
  mainPhoto.alt = `${button.dataset.photoTitle} product photo`;
  mainPhoto.hidden = false;
  mainPhoto.nextElementSibling.hidden = true;
  const photoSource = button.dataset.photoSource;
  if (photoSource) {
    creditLink.href = photoSource;
    creditLink.textContent = `${button.dataset.photoCredit} ↗`;
    creditLabel.textContent = "Photo source: ";
  }
  gallery.dataset.selectedIndex = String(index);
  counter.textContent = `${index + 1} / ${buttons.length}`;
  buttons.forEach((item, buttonIndex) => {
    item.setAttribute("aria-pressed", String(buttonIndex === index));
    item.classList.toggle("selected", buttonIndex === index);
  });
  if (gallerySlideshowPlaying && photoLightbox.hidden) scheduleGallerySlide();
  if (!photoLightbox.hidden) updatePhotoLightbox(button);
}

function updatePhotoLightbox(photoButton) {
  photoLightboxImage.onload = fitPhotoLightboxImage;
  photoLightboxImage.src = photoButton.dataset.photoUrl;
  photoLightboxImage.alt = `${photoButton.dataset.photoTitle} product photo`;
  photoLightboxCaption.textContent = photoButton.dataset.photoTitle;
  photoLightbox.scrollTop = 0;
  if (photoLightboxImage.complete) fitPhotoLightboxImage();
}

function fitPhotoLightboxImage() {
  const mainPhoto = dialogContent.querySelector("#gallery-main-photo");
  if (!mainPhoto || !photoLightboxImage.naturalWidth || !photoLightboxImage.naturalHeight) return;
  const photoBounds = mainPhoto.getBoundingClientRect();
  const photoStyle = getComputedStyle(mainPhoto);
  const availableWidth = photoBounds.width - parseFloat(photoStyle.paddingLeft) - parseFloat(photoStyle.paddingRight);
  const availableHeight = photoBounds.height - parseFloat(photoStyle.paddingTop) - parseFloat(photoStyle.paddingBottom);
  if (availableWidth <= 0 || availableHeight <= 0) return;
  const scale = Math.min(
    availableWidth / photoLightboxImage.naturalWidth,
    availableHeight / photoLightboxImage.naturalHeight
  );
  photoLightboxImage.style.width = `${Math.round(photoLightboxImage.naturalWidth * scale)}px`;
  photoLightboxImage.style.height = `${Math.round(photoLightboxImage.naturalHeight * scale)}px`;
  updatePhotoLightboxScrollButton();
}

function updatePhotoLightboxScrollButton() {
  const hasMoreBelow = photoLightbox.scrollTop + photoLightbox.clientHeight < photoLightbox.scrollHeight - 2;
  photoLightboxScroll.hidden = !hasMoreBelow;
}

function openPhotoLightbox() {
  const gallery = dialogContent.querySelector("#product-photo-gallery");
  const selectedPhoto = gallery?.querySelector(`[data-gallery-index="${gallery.dataset.selectedIndex}"]`)
    || dialogContent.querySelector("#gallery-main-photo");
  if (!selectedPhoto) return;
  window.clearTimeout(gallerySlideTimer);
  const hasMultiplePhotos = dialogContent.querySelectorAll("[data-gallery-index]").length > 1;
  photoLightbox.querySelectorAll("[data-lightbox-step]").forEach(button => {
    button.disabled = !hasMultiplePhotos;
  });
  if (selectedPhoto.dataset.photoUrl) {
    updatePhotoLightbox(selectedPhoto);
  } else {
    photoLightboxImage.onload = fitPhotoLightboxImage;
    photoLightboxImage.src = selectedPhoto.currentSrc || selectedPhoto.src;
    photoLightboxImage.alt = selectedPhoto.alt;
    photoLightboxCaption.textContent = selectedPhoto.alt;
    if (photoLightboxImage.complete) fitPhotoLightboxImage();
  }
  photoLightbox.hidden = false;
  photoLightbox.setAttribute("aria-hidden", "false");
  photoLightbox.classList.add("visible");
  window.requestAnimationFrame(() => {
    fitPhotoLightboxImage();
    updatePhotoLightboxScrollButton();
  });
  document.querySelector("#photo-lightbox-close").focus();
}

function closePhotoLightbox() {
  if (photoLightbox.hidden) return;
  photoLightbox.hidden = true;
  photoLightbox.setAttribute("aria-hidden", "true");
  photoLightbox.classList.remove("visible");
  const selectedPhoto = dialogContent.querySelector(`[data-gallery-index="${dialogContent.querySelector("#product-photo-gallery")?.dataset.selectedIndex}"]`)
    || dialogContent.querySelector("#gallery-main-photo");
  selectedPhoto?.focus();
  if (gallerySlideshowPlaying) scheduleGallerySlide();
}

function updateGallerySlideshowButton() {
  const button = dialogContent.querySelector("#gallery-slideshow-toggle");
  if (!button) return;
  button.setAttribute("aria-pressed", String(gallerySlideshowPlaying));
  button.setAttribute("aria-label", gallerySlideshowPlaying ? "Pause photo slideshow" : "Play photo slideshow");
  button.textContent = gallerySlideshowPlaying ? "Ⅱ" : "▶";
}

function scheduleGallerySlide() {
  window.clearTimeout(gallerySlideTimer);
  if (!gallerySlideshowPlaying || !dialog.classList.contains("visible") || !photoLightbox.hidden || document.hidden) return;
  gallerySlideTimer = window.setTimeout(() => {
    const buttons = dialogContent.querySelectorAll("[data-gallery-index]");
    if (buttons.length < 2) {
      stopGallerySlideshow();
      return;
    }
    const gallery = dialogContent.querySelector("#product-photo-gallery");
    const currentIndex = Number(gallery.dataset.selectedIndex);
    selectProductGalleryPhoto((currentIndex + 1) % buttons.length);
  }, gallerySlideInterval);
}

function startGallerySlideshow() {
  window.clearTimeout(gallerySlideTimer);
  const buttons = dialogContent.querySelectorAll("[data-gallery-index]");
  if (buttons.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gallerySlideshowPlaying = false;
    updateGallerySlideshowButton();
    return;
  }
  gallerySlideshowPlaying = true;
  updateGallerySlideshowButton();
  scheduleGallerySlide();
}

function stopGallerySlideshow() {
  gallerySlideshowPlaying = false;
  window.clearTimeout(gallerySlideTimer);
  updateGallerySlideshowButton();
}

function renderWatchlistPanel() {
  watchlistCount.textContent = String(watchlist.size);
  updateShareButton();
}

function resetClearSaved() {
  window.clearTimeout(clearSavedTimer);
  clearSavedButton.classList.remove("confirming");
  clearSavedButton.textContent = "Clear saved list";
}

function updateShareButton() {
  const show = savedOnly() && watchlist.size > 0;
  shareListButton.hidden = !show;
  clearSavedButton.hidden = !show;
  if (!show) resetClearSaved();
}

function updateSharedUi() {
  updateShareButton();
  sharedBanner.hidden = !sharedIds;
  if (sharedIds) document.querySelector("#shared-text").textContent = `Shared list: ${sharedIds.length} ${sharedIds.length === 1 ? "product" : "products"}`;
}

function renderBrandSelect() {
  const counts = new Map();
  catalogProducts
    .filter(product => (!sharedIds || sharedIds.includes(product.id)) && (activeCategory === "All products" || product.category === activeCategory))
    .forEach(product => counts.set(brandLabel(product.brand), (counts.get(brandLabel(product.brand)) || 0) + 1));
  if (activeBrand !== "All brands" && !counts.has(activeBrand)) activeBrand = "All brands";
  const names = [...counts.keys()].sort((a, b) => a.localeCompare(b));
  brandSelect.innerHTML = [`<option value="All brands">All brands</option>`, ...names.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)} (${counts.get(name)})</option>`)].join("");
  brandSelect.value = activeBrand;
}

function renderActiveFilters() {
  const chips = [];
  const query = searchInput.value.trim();
  if (query) chips.push(["query", `Search: “${query}”`]);
  if (activeCategory !== "All products") chips.push(["category", activeCategory]);
  if (activeBrand !== "All brands") chips.push(["brand", activeBrand]);
  if (wirelessOnly) chips.push(["wireless", "Wireless only"]);
  if (activeTier !== "All tiers") chips.push(["tier", `Tier: ${activeTier}`]);
  if (savedOnly()) chips.push(["saved", "Saved only"]);
  const html = chips.map(([kind, label]) => `<button type="button" class="tm-chip" data-clear="${kind}" aria-label="Remove filter: ${escapeHtml(label)}">${escapeHtml(label)} <span aria-hidden="true">×</span></button>`);
  if (chips.length > 1) html.push(`<button type="button" class="tm-link" data-clear="all">Clear all</button>`);
  activeFiltersEl.innerHTML = html.join("");
}

function renderWirelessCount() {
  const base = searchableProducts(catalogProducts, { ignoreWireless: true });
  const count = base.filter(isWireless).length;
  wirelessToggle.textContent = `Wireless only (${count})`;
  wirelessToggle.title = "Show only products that connect without a cable";
  wirelessToggle.disabled = count === 0 && !wirelessOnly;
}

function renderTierSelect() {
  const select = document.querySelector("#tier-select");
  if (!select) return;
  const base = searchableProducts(catalogProducts, { ignoreTier: true });
  const counts = { Budget: 0, "Mid-range": 0, Premium: 0 };
  base.forEach(product => { if (counts[tierOf(product)] !== undefined) counts[tierOf(product)]++; });
  select.innerHTML = [`<option value="All tiers">All tiers (${base.length})</option>`,
    ...Object.keys(counts).map(tier => `<option value="${tier}"${counts[tier] === 0 && tier !== activeTier ? " disabled" : ""}>${tier} (${counts[tier]})</option>`)].join("");
  select.value = activeTier;
}

const CATEGORY_HINTS = [
  [/mouse|mice/i, "Mice"], [/keyboard|keypad/i, "Keyboards"], [/headset|headphone|earbud/i, "Headsets"],
  [/controller|gamepad|joystick/i, "Controllers"], [/console|handheld|\bvr\b|playstation|xbox|switch/i, "Consoles & handhelds"],
  [/capture|webcam|camera|microphone|\bmic\b|speaker|soundbar|stream/i, "Streaming & audio"], [/monitor|gpu|graphics|\bpc\b|desktop|laptop/i, "PC hardware"]
];

function mailtoLink(subject, body) {
  const address = TIM.contact || "";
  return address ? `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : "";
}

function renderEmptyState(visibleCount) {
  emptyState.hidden = visibleCount !== 0;
  if (visibleCount !== 0) { emptyState.innerHTML = ""; return; }
  const query = searchInput.value.trim();
  const otherFilters = activeCategory !== "All products" || activeBrand !== "All brands" || wirelessOnly || activeTier !== "All tiers" || savedOnly();
  const button = (action, label, primary) => `<button type="button" class="${primary ? "tm-primary" : "tm-btn"} tm-empty-btn" data-empty-action="${escapeHtml(action)}">${escapeHtml(label)}</button>`;
  if (savedOnly() && !watchlist.size) {
    emptyState.innerHTML = `<p class="tm-empty-title">Nothing saved yet.</p><p>Tap the heart on any product to save it here.</p><div class="tm-empty-actions">${button("clear-saved-filter", "Browse all gear", true)}</div>`;
    return;
  }
  const actions = [];
  let title, body = "";
  const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const existsElsewhere = query && catalogProducts.some(product => matchesTerms(product, terms));
  if (query && existsElsewhere) {
    title = `No results for “${escapeHtml(query)}” with these filters.`;
    body = "<p>The search does match other products in the catalog.</p>";
    actions.push(button("clear-filters", "Clear filters, keep search", true));
    actions.push(button("clear-query", "Clear search"));
  } else if (query) {
    const suggestion = didYouMean(query);
    title = suggestion ? `No results for “${escapeHtml(query)}”. Did you mean “${escapeHtml(suggestion)}”?` : `We don't have “${escapeHtml(query)}” yet.`;
    if (suggestion) actions.push(button(`query:${suggestion}`, `Search “${suggestion}”`, true));
    const brands = new Map();
    catalogProducts.forEach(product => brands.set(brandLabel(product.brand), (brands.get(brandLabel(product.brand)) || 0) + 1));
    const covered = [...brands.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name);
    body = `<p>It may be spelled differently, or it isn't in the catalog yet. We cover ${escapeHtml(covered.slice(0, -1).join(", "))} and ${escapeHtml(covered[covered.length - 1])} so far.</p>`;
    const hint = CATEGORY_HINTS.find(([pattern]) => pattern.test(query));
    if (suggestion) {
      actions.push(button("clear-query", "Browse all gear"));
    } else if (hint && catalogProducts.some(product => product.category === hint[1])) {
      const count = catalogProducts.filter(product => product.category === hint[1]).length;
      actions.push(button(`category:${hint[1]}`, `Browse ${hint[1].toLowerCase()} (${count})`, true));
    } else {
      actions.push(button("clear-query", "Browse all gear", true));
    }
    const suggest = mailtoLink("Tech It More: please add a product", `I searched for "${query}" and didn't find it. Please consider adding it.`);
    if (suggest) actions.push(`<a class="tm-btn tm-empty-btn" href="${escapeHtml(suggest)}">Suggest “${escapeHtml(query.slice(0, 40))}”</a>`);
    if (otherFilters) actions.push(button("clear-filters", "Clear filters, keep search"));
  } else if (activeTier !== "All tiers" && searchableProducts(catalogProducts, { ignoreTier: true }).length) {
    const others = searchableProducts(catalogProducts, { ignoreTier: true }).length;
    const what = activeCategory === "All products" ? "products" : activeCategory.toLowerCase();
    title = `No ${activeTier.toLowerCase()} ${escapeHtml(what)} yet.`;
    body = `<p>${others} matching ${others === 1 ? "product sits" : "products sit"} in other tiers.</p>`;
    actions.push(button("clear-tier", "Show all tiers", true));
    const suggest = mailtoLink(`Tech It More: ${activeTier.toLowerCase()} pick suggestion`, `I'd like to see a ${activeTier.toLowerCase()} ${what} pick. My suggestion: `);
    if (suggest) actions.push(`<a class="tm-btn tm-empty-btn" href="${escapeHtml(suggest)}">Suggest one</a>`);
  } else {
    title = otherFilters ? "No products match these filters." : "No products to show.";
    body = otherFilters ? "<p>Try removing a filter.</p>" : "";
    if (otherFilters) actions.push(button("clear-all", "Clear all filters", true));
  }
  emptyState.innerHTML = `<p class="tm-empty-title">${title}</p>${body}<div class="tm-empty-actions">${actions.join("")}</div>`;
}

function setTier(value) {
  activeTier = value;
  const select = document.querySelector("#tier-select");
  if (select) select.value = value;
}

function clearFilter(kind) {
  if (kind === "query" || kind === "all") searchInput.value = "";
  if (kind === "category" || kind === "all") activeCategory = "All products";
  if (kind === "brand" || kind === "all") activeBrand = "All brands";
  if (kind === "wireless" || kind === "all") setWireless(false);
  if (kind === "tier" || kind === "all") setTier("All tiers");
  if (kind === "saved" || kind === "all") setWatchlistFilter(false);
  updateSearchState();
  renderCategories();
  renderCatalog();
}

function renderRecent() {
  const home = !searchInput.value.trim() && activeCategory === "All products" && activeBrand === "All brands" && activeTier === "All tiers" && !wirelessOnly && !savedOnly() && !sharedIds;
  const items = recentIds.map(id => catalogProducts.find(product => product.id === id)).filter(Boolean);
  recentRow.hidden = !(home && items.length);
  if (recentRow.hidden) return;
  recentRow.innerHTML = `<div class="tm-recent-head"><h3>Recently viewed</h3><button type="button" class="tm-link" data-clear-recent>Clear</button></div>
    <div class="tm-recent-list">${items.map(product => `<button type="button" class="tm-mini" data-kind="${escapeHtml(product.category)}" data-product-id="${escapeHtml(product.id)}"><span class="tm-mini-icon">${categoryIcon(product.category)}</span><span><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(brandLabel(product.brand))}</small></span></button>`).join("")}</div>`;
}

function rememberRecent(productId) {
  recentIds = [productId, ...recentIds.filter(id => id !== productId)].slice(0, 8);
  Promise.resolve(saveSetting("recent", recentIds)).catch(() => {});
  renderRecent();
}

function syncUrl() {
  const params = new URLSearchParams();
  const query = searchInput.value.trim();
  if (query) params.set("q", query);
  if (activeCategory !== "All products") params.set("cat", activeCategory);
  if (activeBrand !== "All brands") params.set("brand", activeBrand);
  if (wirelessOnly) params.set("wireless", "1");
  if (activeTier !== "All tiers") params.set("tier", activeTier);
  if (sortSelect.value !== "popular") params.set("sort", sortSelect.value);
  if (sharedIds) params.set("list", sharedIds.join(","));
  const search = params.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`);
}

function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("q")) searchInput.value = params.get("q");
  if (categories.includes(params.get("cat"))) activeCategory = params.get("cat");
  if (params.get("brand")) activeBrand = params.get("brand");
  if (params.get("wireless") === "1") setWireless(true);
  if (["Budget", "Mid-range", "Premium"].includes(params.get("tier"))) setTier(params.get("tier"));
  if ([...sortSelect.options].some(option => option.value === params.get("sort"))) sortSelect.value = params.get("sort");
  if (params.get("list")) {
    const ids = params.get("list").split(",").filter(id => catalogProducts.some(product => product.id === id));
    sharedIds = ids.length ? ids : null;
  }
  updateSearchState();
}

function closeSuggestions() {
  suggestionItems = [];
  suggestionIndex = -1;
  suggestionsBox.hidden = true;
  suggestionsBox.innerHTML = "";
  searchInput.setAttribute("aria-expanded", "false");
  searchInput.removeAttribute("aria-activedescendant");
}

function renderSuggestions() {
  const text = searchInput.value.trim();
  if (text.length < 2) return closeSuggestions();
  const matches = catalogProducts.filter(product => matchesTerms(product, text.toLocaleLowerCase().split(/\s+/)));
  suggestionItems = matches.slice(0, 6);
  suggestionIndex = -1;
  if (!suggestionItems.length) return closeSuggestions();
  suggestionsBox.innerHTML = suggestionItems.map((product, index) => `<button type="button" role="option" id="suggest-${index}" aria-selected="false" class="tm-suggest" data-kind="${escapeHtml(product.category)}" data-suggest-id="${escapeHtml(product.id)}"><span class="tm-suggest-icon">${categoryIcon(product.category)}</span><span><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(brandLabel(product.brand))} · ${escapeHtml(product.category)}</small></span></button>`).join("")
    + (matches.length > suggestionItems.length ? `<p class="tm-suggest-foot">${matches.length - suggestionItems.length} more in the results below</p>` : "");
  suggestionsBox.hidden = false;
  searchInput.setAttribute("aria-expanded", "true");
}

function moveSuggestion(delta) {
  if (!suggestionItems.length) return;
  suggestionIndex = (suggestionIndex + delta + suggestionItems.length) % suggestionItems.length;
  suggestionsBox.querySelectorAll(".tm-suggest").forEach((item, index) => {
    item.classList.toggle("active", index === suggestionIndex);
    item.setAttribute("aria-selected", String(index === suggestionIndex));
  });
  searchInput.setAttribute("aria-activedescendant", `suggest-${suggestionIndex}`);
}

function renderCatalog(append = false) {
  if (!append) renderBrandSelect();
  if (!append) renderTierSelect();
  if (!append) renderWirelessCount();
  const visible = searchableProducts(catalogProducts);
  const alreadyRendered = append ? grid.children.length : 0;
  if (!append) grid.innerHTML = "";
  grid.insertAdjacentHTML("beforeend", visible.slice(alreadyRendered, alreadyRendered + catalogPageSize).map(cardMarkup).join(""));
  const rendered = Math.min(visible.length, alreadyRendered + catalogPageSize);
  resultsCount.textContent = `${visible.length} ${visible.length === 1 ? "product" : "products"}`;
  catalogTitle.textContent = sharedIds ? "Shared list" : activeCategory === "All products" ? "All gear" : activeCategory;
  renderEmptyState(visible.length);
  loadMoreButton.hidden = rendered >= visible.length;
  if (!loadMoreButton.hidden) {
    const remaining = visible.length - rendered;
    loadMoreButton.textContent = `Show ${Math.min(catalogPageSize, remaining)} more products`;
  }
  if (!append) {
    renderActiveFilters();
    renderRecent();
    updateSharedUi();
    syncUrl();
  }
}

function renderCategories() {
  categoryList.innerHTML = categories.map(category => {
    const count = category === "All products" ? catalogProducts.length : catalogProducts.filter(product => product.category === category).length;
    const selected = category === activeCategory;
    const label = escapeHtml(category);
    const shown = category === "Consoles & handhelds" ? "Consoles" : label;
    return `<button type="button" class="tm-cat${selected ? " selected" : ""}" data-kind="${label}" aria-pressed="${selected}" data-category="${label}"><span class="tm-cat-icon">${categoryIcon(category)}</span><span class="tm-cat-name">${shown}</span><span class="tm-cat-count">${count}</span></button>`;
  }).join("");
}

const STORE_HINTS = {
  Amazon: "Wide selection", "Best Buy": "Local pickup", Newegg: "PC specialist", "Micro Center": "In-store pickup",
  Walmart: "Everyday retailer", Target: "Everyday retailer", GameStop: "Trade-ins", eBay: "Used & open-box"
};
const storeHint = name => STORE_HINTS[name] || "Official store";
function retailerSearchUrl(store, productName) {
  const config = TIM.stores[store];
  if (!config) return "#";
  const url = new URL(config.url);
  url.searchParams.set(config.param || "q", productName);
  return url.href;
}

async function openProduct(productId, { fromHistory = false } = {}) {
  const requestId = ++productDialogRequest;
  stopGallerySlideshow();
  try {
    const product = catalogProducts.find(item => item.id === productId);
    if (!product) throw new Error(`Product "${productId}" was not found in the catalog.`);
    if (!fromHistory && !handlingProductHistory) {
      const currentProductId = new URLSearchParams(window.location.hash.slice(1)).get("product");
      if (currentProductId !== productId) {
        const state = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
        window.history.pushState({ ...state, productDialog: true }, "", `#product=${encodeURIComponent(productId)}`);
      }
    }
    if (requestId !== productDialogRequest) return;
    const productName = escapeHtml(product.name);
    const brand = escapeHtml(product.brand);
    const category = escapeHtml(product.category);
    const specs = escapeHtml(product.specs || "Specifications are not listed yet. Check the store pages for details.");
    const icon = escapeHtml(product.icon);
    const productIdAttribute = escapeHtml(product.id);
    const artClass = product.art ? ` ${escapeHtml(product.art)}` : "";
    const photoCredit = `<p class="photo-credit"><span id="photo-credit-label">Product photo: </span><a id="photo-credit-link" href="${escapeHtml(product.imageSource || product.productSource || "https://commons.wikimedia.org/")}" target="_blank" rel="noopener noreferrer">${escapeHtml(product.imageCreator || (product.imageSource ? "manufacturer source" : "photo source"))} ↗</a>${product.productSource ? ` · <a href="${escapeHtml(product.productSource)}" target="_blank" rel="noopener noreferrer">product record ↗</a>` : ""}</p>`;
    const rows = (product.retailerSearchStores || [])
      .slice().sort((a, b) => (STORE_HINTS[a] ? 1 : 0) - (STORE_HINTS[b] ? 1 : 0))
      .filter((storeName, index, stores) => TIM.stores[storeName] && stores.indexOf(storeName) === index)
      .map(storeName => {
        const store = escapeHtml(storeName);
        return `<a class="store-gateway-link" href="${escapeHtml(retailerSearchUrl(storeName, fullProductName(product)))}" target="_blank" rel="noopener noreferrer">
          <span class="store-icon" aria-hidden="true">${escapeHtml(storeName.charAt(0))}</span>
          <span>${store}</span>
          <span class="store-hint">${escapeHtml(storeHint(storeName))} ↗</span>
        </a>`;
      }).join("") || `<p class="gateway-disclosure">No product-specific retailer searches are listed for this item yet.</p>`;
    const offersHeading = "Find this product at retailers";
    const offersNotice = "(opens each store's own search)";
    const offerNote = `<p class="gateway-disclosure">Each link opens the store's own search results for this product, so you can pick the exact model and seller yourself. Tech It More doesn't quote prices.</p>`;
    dialogContent.innerHTML = `<div class="detail-content" data-product-id="${productIdAttribute}" data-kind="${category}">
      <div class="detail-top">
        <span class="product-art detail-art${artClass}" aria-hidden="true">${categoryIcon(product.category)}</span>
        <div class="detail-title-wrap"><p class="product-brand">${brand} · ${category}</p><h2 id="detail-name">${productName}</h2><p class="detail-subtitle">${specs}</p><button class="tm-where" type="button" data-scroll-offers>Where to buy ↓</button></div>
      </div>
      <div class="product-photo-gallery" id="product-photo-gallery" data-selected-index="0">
        <div class="detail-photo-wrap">
          <button class="photo-gallery-arrow previous" type="button" data-photo-step="-1" aria-label="Show previous product photo" disabled hidden>‹</button>
        <img class="detail-photo" id="gallery-main-photo" src="${escapeHtml(product.imageUrl || "")}" alt="${brand} ${productName} ${/\.svg(\?|$)/.test(product.imageUrl) ? "illustration" : "product photo"}" role="button" tabindex="0" aria-label="Open ${productName} photo full screen" decoding="async" ${product.imageUrl ? "" : "hidden"}>
        <div class="photo-unavailable detail-photo-unavailable"${product.imageUrl ? " hidden" : ""}><span class="product-art detail-art${artClass}" aria-hidden="true">${categoryIcon(product.category)}</span><span>Official product photo unavailable</span></div>
          <span class="photo-gallery-counter" id="photo-gallery-counter" aria-live="polite" hidden>1 / 1</span>
          <button class="photo-gallery-arrow next" type="button" data-photo-step="1" aria-label="Show next product photo" disabled hidden>›</button>
        </div>
        <div class="photo-gallery-thumbnails" id="photo-gallery-thumbnails" role="group" aria-label="Product photos" hidden></div>
        <button class="gallery-slideshow-toggle" id="gallery-slideshow-toggle" type="button" aria-pressed="false" aria-label="Play photo slideshow" disabled hidden>▶ Play</button>
        <p class="photo-gallery-status" id="photo-gallery-status" role="status"></p>
        <div class="detail-quick">${quickFactsMarkup(product)}</div>
      </div>
      <div class="detail-info-column">
        ${verdictMarkup(product)}
        ${photoCredit}
        <h3 class="offers-heading" id="offers-heading">${offersHeading} <span class="offers-notice">${offersNotice}</span></h3>
        <div class="offer-list store-gateway-list">${rows}</div>
        ${offerNote}
        ${reviewMarkup(product)}
        ${alternativesMarkup(product)}
        <button class="share-product" type="button" data-share-product="${product.id}">↗ Share this product</button>
      </div>
    </div>`;
    if (dialog.hidden) previouslyFocusedElement = document.activeElement;
    dialog.hidden = false;
    dialog.classList.add("visible");
    dialog.setAttribute("aria-hidden", "false");
    dialogBackdrop.classList.add("visible");
    document.body.style.overflow = "hidden";
    document.querySelector("#dialog-close").focus();
    renderAdditionalProductPhotos(product);
    rememberRecent(product.id);
  } catch (error) {
    if (requestId === productDialogRequest) showError("Could not open product details.", error);
  }
}

function closeDialog({ fromHistory = false } = {}) {
  productDialogRequest++;
  if (dialog.hidden) return;
  if (!fromHistory && !handlingProductHistory) {
    if (history.state?.productDialog) {
      history.back();
      return;
    }
    if (new URLSearchParams(window.location.hash.slice(1)).has("product")) {
      history.replaceState(history.state, "", `${window.location.pathname}${window.location.search}`);
    }
  }
  stopGallerySlideshow();
  closePhotoLightbox();
  dialog.hidden = true;
  dialog.classList.remove("visible");
  dialog.setAttribute("aria-hidden", "true");
  dialogBackdrop.classList.remove("visible");
  document.body.style.overflow = "";
  if (previouslyFocusedElement instanceof HTMLElement && previouslyFocusedElement.isConnected) previouslyFocusedElement.focus();
}

function showError(message, error) {
  console.error(message, error);
  showToast(message);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 5000);
}

function setWatchlistFilter(selected) {
  watchlistFilter.setAttribute("aria-pressed", String(selected));
  watchlistFilter.classList.toggle("selected", selected);
}

document.addEventListener("error", event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;
  if (image.matches(".photo-thumb img")) {
    image.closest(".photo-thumb-item").hidden = true;
  } else if (image.matches(".product-photo, .tm-photo, #gallery-main-photo")) {
    image.hidden = true;
    if (image.nextElementSibling instanceof HTMLElement) image.nextElementSibling.hidden = false;
  }
}, true);

categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderCatalog();
  scrollToCatalog();
});

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-product-id]");
  const watchButton = event.target.closest("[data-watch-id]");
  if (watchButton) {
    event.preventDefault();
    event.stopPropagation();
    toggleWatchlist(watchButton.dataset.watchId).catch(error => showError("Could not update your watchlist.", error));
  } else if (button) {
    openProduct(button.dataset.productId);
  }
});

searchInput.addEventListener("input", () => {
  updateSearchState();
  renderCatalog();
  renderSuggestions();
});
loadMoreButton.addEventListener("click", () => renderCatalog(true));
sortSelect.addEventListener("change", () => renderCatalog());
watchlistFilter.addEventListener("click", () => {
  const selected = watchlistFilter.getAttribute("aria-pressed") === "true";
  setWatchlistFilter(!selected);
  renderCatalog();
  window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
});
exportButton.addEventListener("click", () => {
  exportLocalData().catch(error => showError("Could not export your data.", error));
});
dialogContent.addEventListener("click", event => {
  const altLink = event.target.closest("[data-open-product]");
  if (altLink && !(event.metaKey || event.ctrlKey || event.shiftKey || event.button)) {
    event.preventDefault();
    openProduct(altLink.dataset.openProduct).then(() => {
      const scroller = dialogContent.querySelector(".detail-content");
      if (scroller) scroller.scrollTop = 0;
      const info = dialogContent.querySelector(".detail-info-column");
      if (info) info.scrollTop = 0;
    });
    return;
  }
  if (event.target.closest("[data-scroll-offers]")) {
    const heading = dialogContent.querySelector("#offers-heading");
    if (heading) heading.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    return;
  }
  if (event.target.matches("#gallery-main-photo")) {
    openPhotoLightbox();
    return;
  }
  const photoButton = event.target.closest("[data-gallery-index]");
  if (photoButton) {
    selectProductGalleryPhoto(Number(photoButton.dataset.galleryIndex));
    return;
  }
  const photoStepButton = event.target.closest("[data-photo-step]");
  if (photoStepButton) {
    const buttons = dialogContent.querySelectorAll("[data-gallery-index]");
    const currentIndex = Number(dialogContent.querySelector("#product-photo-gallery").dataset.selectedIndex);
    const nextIndex = (currentIndex + Number(photoStepButton.dataset.photoStep) + buttons.length) % buttons.length;
    selectProductGalleryPhoto(nextIndex);
    return;
  }
  const shareButton = event.target.closest("[data-share-product]");
  if (shareButton) {
    const url = new URL(`/p/${encodeURIComponent(shareButton.dataset.shareProduct)}/`, window.location.origin);
    if (navigator.share) {
      navigator.share({ title: "Tech It More product", text: "See this product and find it at US retailers.", url: url.href })
        .catch(error => {
          if (error.name !== "AbortError") showError("Could not share this product.", error);
        });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url.href)
        .then(() => showToast("Product link copied."))
        .catch(error => showError("Could not copy the product link.", error));
    } else {
      showError("Sharing is unavailable in this browser.", new Error("Neither the share nor clipboard API is available."));
    }
    return;
  }
  const slideshowButton = event.target.closest("#gallery-slideshow-toggle");
  if (slideshowButton) {
    if (gallerySlideshowPlaying) stopGallerySlideshow();
    else {
      gallerySlideshowPlaying = true;
      updateGallerySlideshowButton();
      scheduleGallerySlide();
    }
    return;
  }
});
dialogContent.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("#gallery-main-photo")) {
    event.preventDefault();
    openPhotoLightbox();
  }
});
document.querySelector("#dialog-close").addEventListener("click", closeDialog);
document.querySelector("#photo-lightbox-close").addEventListener("click", closePhotoLightbox);
photoLightboxScroll.addEventListener("click", () => {
  photoLightbox.scrollBy({ top: Math.max(200, Math.floor(window.innerHeight * 0.8)), behavior: "smooth" });
});
photoLightbox.addEventListener("click", event => {
  const stepButton = event.target.closest("[data-lightbox-step]");
  if (stepButton) {
    const buttons = dialogContent.querySelectorAll("[data-gallery-index]");
    if (buttons.length < 2) return;
    const gallery = dialogContent.querySelector("#product-photo-gallery");
    const currentIndex = Number(gallery.dataset.selectedIndex);
    const nextIndex = (currentIndex + Number(stepButton.dataset.lightboxStep) + buttons.length) % buttons.length;
    selectProductGalleryPhoto(nextIndex);
    return;
  }
  if (event.target === photoLightbox) closePhotoLightbox();
});
photoLightbox.addEventListener("scroll", updatePhotoLightboxScrollButton, { passive: true });
dialogBackdrop.addEventListener("click", closeDialog);
dialog.addEventListener("click", event => {
  if (event.target === dialog) closeDialog();
});
document.addEventListener("keydown", event => {
  if (!photoLightbox.hidden && event.key === "Escape") {
    event.preventDefault();
    closePhotoLightbox();
    return;
  }
  if (!photoLightbox.hidden && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    const buttons = dialogContent.querySelectorAll("[data-gallery-index]");
    if (buttons.length < 2) return;
    event.preventDefault();
    const gallery = dialogContent.querySelector("#product-photo-gallery");
    const currentIndex = Number(gallery.dataset.selectedIndex);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    selectProductGalleryPhoto((currentIndex + direction + buttons.length) % buttons.length);
    return;
  }
  if (!photoLightbox.hidden && event.key === "Tab") {
    const focusable = [...photoLightbox.querySelectorAll("button:not([disabled])")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
    return;
  }
  if (!photoLightbox.hidden) return;
  if (event.key === "Escape" && !dialog.hidden) {
    event.preventDefault();
    closeDialog();
    return;
  }
  if (event.key === "Tab" && !dialog.hidden) {
    const focusable = [...dialog.querySelectorAll("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
    searchInput.select();
  } else if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && dialog.hidden
    && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "")) {
    event.preventDefault();
    searchInput.focus();
  }
});
window.addEventListener("popstate", () => {
  const productId = new URLSearchParams(window.location.hash.slice(1)).get("product");
  handlingProductHistory = true;
  if (productId) {
    const currentProduct = dialogContent.querySelector(".detail-content")?.dataset.productId;
    if (currentProduct !== productId) openProduct(productId, { fromHistory: true });
  } else {
    closeDialog({ fromHistory: true });
  }
  handlingProductHistory = false;
});
document.addEventListener("visibilitychange", () => {
  if (!gallerySlideshowPlaying) return;
  if (document.hidden) window.clearTimeout(gallerySlideTimer);
  else scheduleGallerySlide();
});

async function start() {
  catalogProducts = products.map(product => ({ ...product, retailerSearchStores: product.stores || [] }));
  const knownIds = new Set(catalogProducts.map(product => product.id));
  watchlist = new Set((await readSetting("watchlist") || []).filter(id => knownIds.has(id)));
  watchlistCount.textContent = String(watchlist.size);
  applyTheme(await readSetting("theme") || (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  recentIds = (await readSetting("recent") || []).filter(id => knownIds.has(id));
  readUrlState();
  renderCategories();
  renderWatchlistPanel();
  renderCatalog();
  document.querySelector("#hero-count").textContent = String(catalogProducts.length);
  const productId = new URLSearchParams(window.location.hash.slice(1)).get("product");
  if (productId) await openProduct(productId, { fromHistory: true });
}

themeToggle.addEventListener("click", async () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    await saveSetting("theme", nextTheme);
  } catch (error) {
    applyTheme(nextTheme === "dark" ? "light" : "dark");
    showError("Could not save your appearance setting.", error);
  }
});

start().catch(error => {
  console.error("Tech It More could not start.", error);
  emptyState.textContent = "Sorry, the catalog could not load. Try reloading the page.";
  emptyState.hidden = false;
});

// Show the matching shortcut hint on Apple devices.
if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
  const shortcutHint = document.querySelector(".tm-search kbd");
  if (shortcutHint) shortcutHint.textContent = "⌘ K";
}

searchInput.addEventListener("keydown", event => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (suggestionsBox.hidden) renderSuggestions();
    moveSuggestion(1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    moveSuggestion(-1);
  } else if (event.key === "Enter") {
    if (suggestionIndex >= 0) {
      event.preventDefault();
      const productId = suggestionItems[suggestionIndex].id;
      closeSuggestions();
      openProduct(productId);
    } else {
      closeSuggestions();
      scrollToCatalog();
    }
  } else if (event.key === "Escape") {
    if (!suggestionsBox.hidden) {
      event.preventDefault();
      closeSuggestions();
    } else if (searchInput.value) {
      searchInput.value = "";
      updateSearchState();
      renderCatalog();
    }
  }
});
searchInput.addEventListener("blur", () => window.setTimeout(closeSuggestions, 120));
searchInput.addEventListener("focus", () => {
  if (searchInput.value.trim().length >= 2) renderSuggestions();
});
suggestionsBox.addEventListener("mousedown", event => event.preventDefault());
suggestionsBox.addEventListener("click", event => {
  const item = event.target.closest("[data-suggest-id]");
  if (!item) return;
  closeSuggestions();
  openProduct(item.dataset.suggestId);
});
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  updateSearchState();
  closeSuggestions();
  renderCatalog();
  searchInput.focus();
});

brandSelect.addEventListener("change", () => {
  activeBrand = brandSelect.value;
  renderCatalog();
});
wirelessToggle.addEventListener("click", () => {
  setWireless(!wirelessOnly);
  renderCatalog();
});
emptyState.addEventListener("click", event => {
  const button = event.target.closest("[data-empty-action]");
  if (!button) return;
  const action = button.dataset.emptyAction;
  if (action === "clear-query") clearFilter("query");
  else if (action === "clear-tier") clearFilter("tier");
  else if (action === "clear-all") clearFilter("all");
  else if (action === "clear-saved-filter") clearFilter("saved");
  else if (action === "clear-filters") {
    activeCategory = "All products"; activeBrand = "All brands"; setWireless(false); setTier("All tiers"); setWatchlistFilter(false);
    renderCategories(); renderCatalog();
  } else if (action.startsWith("query:")) {
    searchInput.value = action.slice("query:".length);
    updateSearchState(); renderCatalog(); searchInput.focus();
  } else if (action.startsWith("category:")) {
    searchInput.value = ""; activeBrand = "All brands"; setWireless(false); setTier("All tiers"); setWatchlistFilter(false);
    activeCategory = action.slice("category:".length);
    updateSearchState(); renderCategories(); renderCatalog(); scrollToCatalog();
  }
});
activeFiltersEl.addEventListener("click", event => {
  const button = event.target.closest("[data-clear]");
  if (button) clearFilter(button.dataset.clear);
});
recentRow.addEventListener("click", event => {
  if (event.target.closest("[data-clear-recent]")) {
    recentIds = [];
    Promise.resolve(saveSetting("recent", recentIds)).catch(() => {});
    renderRecent();
    return;
  }
  const button = event.target.closest("[data-product-id]");
  if (button) openProduct(button.dataset.productId);
});

document.querySelector("#surprise-button").addEventListener("click", () => {
  const pool = searchableProducts(catalogProducts);
  const choices = pool.length ? pool : catalogProducts;
  if (choices.length) openProduct(choices[Math.floor(Math.random() * choices.length)].id);
});

shareListButton.addEventListener("click", async () => {
  const url = new URL(window.location.href);
  url.hash = "";
  url.search = "";
  url.searchParams.set("list", [...watchlist].join(","));
  const link = url.toString();
  try {
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      await navigator.share({ title: "My Tech It More list", url: link });
    } else {
      await navigator.clipboard.writeText(link);
      showToast("Link to your saved list copied.");
    }
  } catch (error) {
    if (error?.name !== "AbortError") window.prompt("Copy this link to share your saved list:", link);
  }
});
document.querySelector("#shared-save").addEventListener("click", async () => {
  if (!sharedIds) return;
  try {
    const next = new Set([...watchlist, ...sharedIds]);
    await saveSetting("watchlist", [...next]);
    watchlist = next;
    renderWatchlistPanel();
    renderCatalog();
    showToast(`Saved ${sharedIds.length} ${sharedIds.length === 1 ? "product" : "products"} to your list.`);
  } catch (error) {
    showError("Could not save the shared list.", error);
  }
});
document.querySelector("#shared-exit").addEventListener("click", () => {
  sharedIds = null;
  renderCategories();
  renderCatalog();
});

window.addEventListener("scroll", () => backToTop.classList.toggle("visible", window.scrollY > 900), { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" }));

// Footer quick links: search for a product type from anywhere on the page.
document.querySelectorAll("[data-query]").forEach(button => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.query;
    activeCategory = "All products";
    activeBrand = "All brands";
    sharedIds = null;
    setWireless(false);
    setWatchlistFilter(false);
    updateSearchState();
    renderCategories();
    renderCatalog();
    scrollToCatalog();
  });
});

// The logo takes you back to the start of the page. It never loads another page.
document.querySelectorAll(".brand").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    sharedIds = null;
    clearFilter("all");
    closeSuggestions();
    window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
  });
});

// Clearing the saved list takes two clicks so it can't happen by accident.
clearSavedButton.addEventListener("click", async () => {
  if (!clearSavedButton.classList.contains("confirming")) {
    clearSavedButton.classList.add("confirming");
    clearSavedButton.textContent = `Remove all ${watchlist.size}? Click again`;
    clearSavedTimer = window.setTimeout(resetClearSaved, 4000);
    return;
  }
  resetClearSaved();
  try {
    await saveSetting("watchlist", []);
    watchlist = new Set();
    renderWatchlistPanel();
    renderCatalog();
    showToast("Saved list cleared.");
  } catch (error) {
    showError("Could not clear your saved list.", error);
  }
});
document.querySelectorAll(".social-email").forEach(link => {
  link.addEventListener("click", event => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    event.preventDefault();
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=techitmore.contact@gmail.com&su=Tech%20It%20More%20Gaming%20Catalog",
      "_blank",
      "noopener,noreferrer"
    );
  });
});

const tierSelect = document.querySelector("#tier-select");
if (tierSelect) tierSelect.addEventListener("change", () => { setTier(tierSelect.value); renderCatalog(); });
renderSpotlight();
document.addEventListener("click", event => {
  if (event.target.closest("[data-spot-again]")) renderSpotlight();
});

// On phones the "Before you buy" box moves below the product list so the first screen shows products.
(function placeSpotlight() {
  const box = document.querySelector("#spotlight");
  const rail = document.querySelector("#category-list");
  const how = document.querySelector("#how-it-works");
  if (!box || !rail || !how || !window.matchMedia) return;
  const query = window.matchMedia("(max-width: 760px)");
  const place = () => {
    if (query.matches) { how.parentNode.insertBefore(box, how); box.classList.add("tm-spot-moved"); }
    else { rail.parentNode.insertBefore(box, rail); box.classList.remove("tm-spot-moved"); }
  };
  place();
  if (query.addEventListener) query.addEventListener("change", place);
})();
