const bundledProducts = [
  { id: "lg-ultragear-27", brand: "LG", name: "UltraGear 27″ QHD Gaming Monitor", category: "Monitors", icon: "▱", art: "art-monitor", imageUrl: "https://media.us.lg.com/transform/ecomm-PDPGalleryThumbnail-350x350/9baa8ae0-659f-4d9f-ac9a-8dd5e4ce806a/Monitor_27GS75Q-B_gallery_01_5000x5000", imageSource: "https://www.lg.com/us/monitors/lg-27gs75q-b-gaming-monitor", specs: "27″ QHD · up to 200Hz (overclocked) · IPS · Adaptive Sync" },
  { id: "razer-deathadder-v3", brand: "RAZER", name: "DeathAdder V3 Pro Wireless Mouse", category: "Accessories", icon: "◉", art: "art-mouse", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/a0427959a82f1f5d1c27c2463008e5a8/razer-deathadder-v3-og.jpg", imageSource: "https://www.razer.com/gaming-mice/razer-deathadder-v3-pro", specs: "Ergonomic wireless · 30K sensor · Up to 90-hour battery" },
  { id: "steam-deck-oled", brand: "VALVE", name: "Steam Deck OLED 512GB", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://cdn.fastly.steamstatic.com/steamdeck/images/oled/social_media_image.jpg", imageSource: "https://www.steamdeck.com/en/", specs: "7.4″ HDR OLED · 512GB NVMe · Wi-Fi 6E" },
  { id: "switch-oled-white", brand: "NINTENDO", name: "Nintendo Switch OLED Model", category: "Gaming", icon: "▣", art: "art-console", imageUrl: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/products/hardware/nintendo-switch-oled-model-white-set/115461-switch-oled-white-boxart-1200x675", imageSource: "https://www.nintendo.com/us/store/products/nintendo-switch-oled-model-white-set/", imageCreator: "Nintendo Switch OLED Model White product image", specs: "7″ OLED screen · 64GB · White Joy-Con controllers" },
  { id: "rog-ally-x", brand: "ASUS ROG", name: "ROG Ally X Handheld Gaming PC", category: "Gaming", icon: "▣", art: "art-console", imageUrl: "https://dlcdnwebimgs.asus.com/gain/F12D7B4D-DC78-4228-8426-D2C474B7BD0D", imageSource: "https://rog.asus.com/us/gaming-handhelds/rog-ally/rog-ally-x-2024/", imageCreator: "ASUS ROG Ally X official product image", specs: "7″ 120Hz · Ryzen Z1 Extreme · 24GB RAM · 1TB SSD" },
  { id: "razer-blackwidow-v4", brand: "RAZER", name: "BlackWidow V4 Mechanical Gaming Keyboard", category: "Accessories", icon: "▦", art: "art-keyboard", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/2eebfd7a585f70e30afa1bf2b242fa22/razer-blackwidow-v4-ogimage-1200x630.jpg", imageSource: "https://www.razer.com/gaming-keyboards/razer-blackwidow-v4", imageCreator: "Razer BlackWidow V4 official product image", specs: "Full-size mechanical · Razer Chroma RGB · Dedicated media controls" },
  { id: "razer-huntsman-v3-pro", brand: "RAZER", name: "Huntsman V3 Pro Analog Gaming Keyboard", category: "Accessories", icon: "▦", art: "art-keyboard", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/f2ba430b48cc45a90075a905e0eac073/razer-huntsman-v3-pro-ogimage-1200x630-v2.webp", imageSource: "https://www.razer.com/gaming-keyboards/razer-huntsman-v3-pro", imageCreator: "Razer Huntsman V3 Pro official product image", specs: "Analog optical switches · Adjustable actuation · Rapid Trigger" },
  { id: "razer-viper-v3-pro", brand: "RAZER", name: "Viper V3 Pro Wireless Gaming Mouse", category: "Accessories", icon: "◉", art: "art-mouse", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/24970f67be4ba9644e28720377d91cfb/razer-viper-v3-pro-1200x630.webp", imageSource: "https://www.razer.com/gaming-mice/razer-viper-v3-pro", imageCreator: "Razer Viper V3 Pro official product image", specs: "Ultra-light wireless · 35K DPI sensor · 8,000Hz polling capable" },
  { id: "razer-deathadder-v3-hyperspeed", brand: "RAZER", name: "DeathAdder V3 HyperSpeed Wireless Mouse", category: "Accessories", icon: "◉", art: "art-mouse", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/846248a215ecc26cf0ad3f7cf62691bd/razer-deathadder-v3-hyperspeed-ogimage-1200x630.webp", imageSource: "https://www.razer.com/gaming-mice/razer-deathadder-v3-hyperspeed", imageCreator: "Razer DeathAdder V3 HyperSpeed official product image", specs: "Ergonomic wireless · 26K DPI sensor · Up to 100-hour battery" },
  { id: "razer-blackshark-v2-pro", brand: "RAZER", name: "BlackShark V2 Pro Wireless Gaming Headset", category: "Audio", icon: "◖", art: "art-headphones", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/0de78efe3441114d8a92590145fff4c8/razer-blackshark-v2-pro-2023_ogimage-1200x630.jpg", imageSource: "https://www.razer.com/gaming-headsets/razer-blackshark-v2-pro", imageCreator: "Razer BlackShark V2 Pro official product image", specs: "Wireless esports headset · Detachable microphone · 70-hour battery" },
  { id: "razer-kraken-v4", brand: "RAZER", name: "Kraken V4 Wireless Gaming Headset", category: "Audio", icon: "◖", art: "art-headphones", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/54336b9e31510b5983cfc72dbec14c34/kraken-v4-1200x630-og.webp", imageSource: "https://www.razer.com/gaming-headsets/razer-kraken-v4", imageCreator: "Razer Kraken V4 official product image", specs: "Wireless gaming headset · Retractable microphone · Chroma RGB" },
  { id: "steelseries-arctis-nova-7p", brand: "STEELSERIES", name: "Arctis Nova 7P Wireless Gaming Headset", category: "Audio", icon: "◖", art: "art-headphones", imageUrl: "https://images.ctfassets.net/hmm5mo4qf4mf/656blOm98ncSC8GsJv9QUN/853167c9ec252f79986681b6da4ca64e/arctis_nova_7p_black_pdp_img_buy_01.png__1920x1080_crop-fit_optimize_subsampling-2-190.png?w=1200&h=600&fit=fill&fm=jpg&q=85", imageSource: "https://steelseries.com/gaming-headsets/arctis-nova-7", imageCreator: "SteelSeries Arctis Nova 7P official product image", specs: "2.4GHz wireless and Bluetooth · USB-C · PlayStation-focused controls" },
  { id: "nzxt-player-two-prime", brand: "NZXT", name: "Player Two Prime Gaming PC", category: "Computers", icon: "⌁", art: "art-computer", imageUrl: "https://nzxt.com/cdn/shop/files/PlayerTwoPrime_hero_black_bagde_260527_43d11dd5-c1bf-434f-925d-64e4e419c973.png?v=1786045573&width=2048", imageSource: "https://nzxt.com/product/player-two-prime", imageCreator: "NZXT Player Two Prime official product image", specs: "AMD Ryzen 9 9900X · GeForce RTX 5070 Ti · 32GB RAM · 2TB SSD" },
  { id: "nzxt-player-two", brand: "NZXT", name: "Player Two Gaming PC", category: "Computers", icon: "⌁", art: "art-computer", imageUrl: "https://nzxt.com/cdn/shop/files/PlayerTwoBase_hero_black_badge_9804c25b-a61f-4b02-ae9b-6ad4afdd408c.png?v=1786049042&width=2048", imageSource: "https://nzxt.com/product/player-two", imageCreator: "NZXT Player Two official product image", specs: "Intel Core Ultra 7 270K Plus · GeForce RTX 5070 · 32GB RAM · 1TB SSD" },
  { id: "xbox-wireless-controller", brand: "XBOX", name: "Xbox Wireless Controller", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://assets.xboxservices.com/assets/99/9b/999b6ab0-6ae1-432d-bed3-494bc3dfb138.jpg?n=111101_Sharing_200x200.jpg", imageSource: "https://www.xbox.com/en-US/accessories/controllers/xbox-wireless-controller", imageCreator: "Xbox Wireless Controller official product image", specs: "Wireless controller · Bluetooth · Xbox and Windows compatible" },
  { id: "dualsense-edge-controller", brand: "PLAYSTATION", name: "DualSense Edge Wireless Controller", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-edge-listing-thumb-01-en-23aug22?$facebook$", imageSource: "https://www.playstation.com/en-us/accessories/dualsense-edge-wireless-controller/", imageCreator: "PlayStation DualSense Edge official product image", specs: "Customizable controls · Replaceable stick modules · Back buttons" },
  { id: "elgato-4k-x", brand: "ELGATO", name: "4K X External Game Capture Card", category: "Gaming", icon: "▰", art: "art-storage", imageUrl: "https://images.ctfassets.net/h50kqpe25yx1/4f6jo2deHdLdmaxkWo3VKv/2056b061f7644d9003e4304dd373c0ce/4K-X-Social-Graph.jpg", imageSource: "https://www.elgato.com/us/en/p/game-capture-4k-x", imageCreator: "Elgato 4K X official product image", specs: "External USB capture · Up to 4K144 passthrough · HDMI 2.1" },
  { id: "corsair-k70-pro-rgb", brand: "CORSAIR", name: "K70 PRO RGB Mechanical Gaming Keyboard", category: "Accessories", icon: "▦", art: "art-keyboard", imageUrl: "https://res.cloudinary.com/corsair-pwa/image/upload/c_scale%2Cq_auto%2Cw_1200/products/Gaming-Keyboards/CH-910941A-NA/Gallery/K70_PRO_OPX_PBT_01.png", imageSource: "https://www.corsair.com/us/en/p/gaming-keyboards/ch-910941a-na/k70-rgb-pro-mechanical-gaming-keyboard-ch-910941a-na", imageCreator: "Corsair K70 PRO RGB official product image", specs: "Optical-mechanical switches · PBT keycaps · Tournament switch" },
  { id: "corsair-m75-air", brand: "CORSAIR", name: "M75 AIR Wireless Gaming Mouse", category: "Accessories", icon: "◉", art: "art-mouse", imageUrl: "https://assets.corsair.com/image/upload/c_scale%2Cq_auto%2Cw_1200/products/Gaming-Mice/CH-931D100/M75_AIR_BLACK_RENDER_01.png", imageSource: "https://www.corsair.com/us/en/p/gaming-mice/ch-931d100-na/m75-air-wireless-ultra-lightweight-gaming-mouse-ch-931d100-na", imageCreator: "Corsair M75 AIR official product image", specs: "Ultra-light wireless · 26,000 DPI sensor · Up to 100-hour battery" },
  { id: "corsair-virtuoso-rgb-wireless-se", brand: "CORSAIR", name: "Virtuoso RGB Wireless SE Gaming Headset", category: "Audio", icon: "◖", art: "art-headphones", imageUrl: "https://res.cloudinary.com/corsair-pwa/image/upload/c_scale%2Cq_auto%2Cw_1200/products/Gaming-Headsets/CA-9011180-NA/Gallery/VIRTUOSO_SE_01.png", imageSource: "https://www.corsair.com/us/en/p/gaming-headsets/ca-9011180-na/virtuoso-rgb-wireless-se-high-fidelity-gaming-headset-ca-9011180-na", imageCreator: "Corsair Virtuoso RGB Wireless SE official product image", specs: "Wireless gaming headset · Detachable broadcast microphone · 7.1 surround sound" },
  { id: "dualsense-wireless-controller", brand: "PLAYSTATION", name: "DualSense Wireless Controller", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-controller-product-thumbnail-01-en-14sep21?$facebook$", imageSource: "https://www.playstation.com/en-us/accessories/dualsense-wireless-controller/", imageCreator: "PlayStation DualSense official product image", specs: "Haptic feedback · Adaptive triggers · Built-in microphone" },
  { id: "playstation-5-pro", brand: "PLAYSTATION", name: "PlayStation 5 Pro Console", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-dualsense-image-block-01-en-16aug24?$facebook$", imageSource: "https://www.playstation.com/en-us/ps5/ps5-pro/", imageCreator: "PlayStation 5 Pro official product image", specs: "2TB SSD · Advanced ray tracing · 4K gaming up to 120fps" },
  { id: "xbox-series-x", brand: "XBOX", name: "Xbox Series X Console", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://assets.xboxservices.com/assets/18/30/1830806b-d41d-40ce-a846-792df7d14e1d.jpg?n=Xbox-Series-X_Sharing_200x200_02.jpg", imageSource: "https://www.xbox.com/en-US/consoles/xbox-series-x", imageCreator: "Xbox Series X official product image", specs: "1TB SSD · 4K gaming · Up to 120fps · UHD Blu-ray" },
  { id: "playstation-vr2", brand: "PLAYSTATION", name: "PlayStation VR2 Headset", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/PSVR2-thumbnail-01-en-22feb22?$facebook$", imageSource: "https://www.playstation.com/en-us/ps-vr2/", imageCreator: "PlayStation VR2 official product image", specs: "4K HDR OLED · Eye tracking · 3D audio · Sense controllers" },
  { id: "meta-quest-3", brand: "META", name: "Quest 3 512GB VR Headset", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://lookaside.fbsbx.com/elementpath/media/?media_id=157327897433582&version=1790053480&transcode_extension=webp", imageSource: "https://www.meta.com/quest/quest-3/", imageCreator: "Meta Quest 3 official product image", specs: "Mixed reality · 512GB storage · 4K+ Infinite Display · Hand tracking" },
  { id: "geforce-rtx-5070-ti", brand: "NVIDIA", name: "GeForce RTX 5070 Ti Graphics Card", category: "Components", icon: "▰", art: "art-storage", imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/50-series/5070-family/geforce-rtx-5070-ti-og-image.jpg", imageSource: "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/", imageCreator: "NVIDIA GeForce RTX 5070 Ti official product image", specs: "16GB GDDR7 · DLSS 4 · PCI Express 5.0" }
];

const productCandidates = bundledProducts
  .concat(Array.isArray(window.TECH_IT_MORE_PRODUCTS) ? window.TECH_IT_MORE_PRODUCTS : [])
  .concat(Array.isArray(window.TECH_IT_MORE_GAMING_PRODUCTS) ? window.TECH_IT_MORE_GAMING_PRODUCTS : [])
  .filter(product => product && typeof product.id === "string" && typeof product.name === "string" && typeof product.imageUrl === "string" && product.imageUrl.length > 0 && typeof product.imageSource === "string" && product.imageSource.length > 0);
const productsById = new Map();
for (const product of productCandidates) {
  if (!productsById.has(product.id)) productsById.set(product.id, product);
}
function kindOf(product) {
  const art = product.art || "";
  if (art === "art-mouse") return "Mice";
  if (art === "art-keyboard") return "Keyboards";
  if (art === "art-headphones") return /mic|seiren|speaker|soundbar/i.test(product.name) ? "Audio" : "Headsets";
  if (art === "art-monitor") return "Monitors";
  if (art === "art-computer") return "PCs & laptops";
  if (art === "art-storage") return "Components";
  return /controller|gamepad|wheel|stick|joy-con|pad\b/i.test(product.name) ? "Controllers" : "Consoles & handhelds";
}
const products = Array.from(productsById.values()).map(product => ({
  ...product,
  imageUrl: product.imageCreator === "Generic illustration, not a product photo" ? "" : product.imageUrl,
  category: kindOf(product)
}));

const STORE_SEARCH_URLS = {
  "Amazon": "https://www.amazon.com/s",
  "Dell": "https://www.dell.com/en-us/search",
  "Apple Store": "https://www.apple.com/shop/buy",
  "Google Store": "https://store.google.com/us/search",
  "Micro Center": "https://www.microcenter.com/search/search_results.aspx",
  "Best Buy": "https://www.bestbuy.com/site/searchpage.jsp",
  "Walmart": "https://www.walmart.com/search",
  "Newegg": "https://www.newegg.com/p/pl",
  "B&H Photo": "https://www.bhphotovideo.com/c/search",
  "Target": "https://www.target.com/s",
  "GameStop": "https://www.gamestop.com/search/?q=",
  "eBay": "https://www.ebay.com/sch/i.html",
  "Steam": "https://store.steampowered.com/search/",
  "Nintendo": "https://www.nintendo.com/us/search/",
  "PlayStation": "https://direct.playstation.com/en-us/search?q=",
  "Xbox": "https://www.xbox.com/en-US/search?q=",
  "LG": "https://www.lg.com/us/search",
  "Meta": "https://www.meta.com/search/",
  "NVIDIA": "https://www.nvidia.com/en-us/search/",
  "NZXT": "https://nzxt.com/search",
  "Elgato": "https://www.elgato.com/us/en/search",
  "GameSir": "https://gamesir.com/search",
  "Hyperkin": "https://hyperkin.com/catalogsearch/result/",
  "ASUS Store": "https://www.asus.com/us/search/",
  "Samsung Store": "https://www.samsung.com/us/search/",
  "Razer": "https://www.razer.com/search/",
  "Corsair": "https://www.corsair.com/us/en/search/",
  "SteelSeries": "https://steelseries.com/search",
  "Logitech G": "https://www.logitechg.com/en-us/search.html",
  "Anker Store": "https://www.anker.com/search",
  "Sonos": "https://www.sonos.com/en-us/search"
};
const BRAND_RETAILER_STORES = {
  "ASUS ROG": ["ASUS Store", "Amazon", "Best Buy", "Newegg", "Micro Center"],
  "CORSAIR": ["Corsair", "Amazon", "Best Buy", "Newegg", "Micro Center"],
  "ELGATO": ["Elgato", "Amazon", "Best Buy", "Newegg"],
  "GAMESIR": ["GameSir", "Amazon", "Best Buy"],
  "HYPERKIN": ["Hyperkin", "Amazon", "eBay"],
  "LG": ["LG", "Amazon", "Best Buy", "Newegg", "Micro Center"],
  "META": ["Meta", "Amazon", "Best Buy", "Walmart", "Target"],
  "NVIDIA": ["NVIDIA", "Amazon", "Best Buy", "Newegg", "Micro Center"],
  "NZXT": ["NZXT", "Amazon", "Best Buy", "Newegg", "Micro Center"],
  "NINTENDO": ["Nintendo", "Amazon", "Best Buy", "Walmart", "Target", "GameStop"],
  "PLAYSTATION": ["PlayStation", "Amazon", "Best Buy", "Walmart", "Target", "GameStop"],
  "RAZER": ["Razer", "Amazon", "Best Buy", "Newegg", "Micro Center"],
  "STEELSERIES": ["SteelSeries", "Amazon", "Best Buy", "Newegg"],
  "VALVE": ["Steam", "Amazon", "Best Buy"],
  "XBOX": ["Xbox", "Amazon", "Best Buy", "Walmart", "Target", "GameStop"]
};
const DEFAULT_RETAILER_STORES = ["Amazon", "eBay"];
const productRetailerStores = new Map(products.map(product => [
  product.id,
  BRAND_RETAILER_STORES[product.brand.trim().toUpperCase()] || DEFAULT_RETAILER_STORES
]));
const databaseName = "techscout-preview";
const databaseVersion = 5;
const categoryOrder = ["Consoles & handhelds", "Controllers", "Keyboards", "Mice", "Headsets", "Audio", "Monitors", "PCs & laptops", "Components"];
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
let database;
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

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, databaseVersion);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("products")) {
        const productStore = db.createObjectStore("products", { keyPath: "id" });
        productStore.createIndex("category", "category", { unique: false });
      }
      if (!db.objectStoreNames.contains("priceHistory")) {
        db.createObjectStore("priceHistory", { keyPath: ["productId", "date"] });
      }
      const historyStore = request.transaction.objectStore("priceHistory");
      if (!historyStore.indexNames.contains("productId")) historyStore.createIndex("productId", "productId", { unique: false });
      if (!db.objectStoreNames.contains("offers")) {
        const offerStore = db.createObjectStore("offers", { keyPath: ["productId", "store"] });
        offerStore.createIndex("productId", "productId", { unique: false });
      }
      if (!db.objectStoreNames.contains("settings")) db.createObjectStore("settings", { keyPath: "key" });
      if (!db.objectStoreNames.contains("alerts")) {
        const alertStore = db.createObjectStore("alerts", { keyPath: "productId" });
        alertStore.createIndex("targetPrice", "targetPrice", { unique: false });
      }
    };
    request.onblocked = () => reject(new Error("Close other Tech It More tabs so the local database can be upgraded."));
    request.onsuccess = () => {
      request.result.onversionchange = () => request.result.close();
      resolve(request.result);
    };
    request.onerror = () => reject(request.error || new Error("Unable to open the local product database."));
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error("The local database transaction failed."));
    transaction.onabort = () => reject(transaction.error || new Error("The local database transaction was aborted."));
  });
}

async function seedDatabaseIfNeeded() {
  const write = database.transaction("products", "readwrite");
  const productStore = write.objectStore("products");
  for (const product of products) {
    productStore.put(product);
  }
  await transactionDone(write);
}

async function pruneDatabaseToGamingCatalog() {
  if (await readSetting("catalogScope") === "shopping-gateway-v2") return;
  const allowedIds = new Set(products.map(product => product.id));
  const transaction = database.transaction(["products", "offers", "priceHistory", "alerts", "settings"], "readwrite");
  const done = transactionDone(transaction);
  for (const storeName of ["products", "offers", "priceHistory", "alerts"]) {
    const store = transaction.objectStore(storeName);
    const request = store.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      const productId = storeName === "products" ? cursor.value.id : cursor.value.productId;
      if (storeName === "offers" || storeName === "priceHistory" || !allowedIds.has(productId)) cursor.delete();
      cursor.continue();
    };
  }
  const settingsStore = transaction.objectStore("settings");
  const watchlistRequest = settingsStore.get("watchlist");
  watchlistRequest.onsuccess = () => {
    const existingWatchlist = watchlistRequest.result?.value;
    if (!Array.isArray(existingWatchlist)) return;
    const retainedWatchlist = existingWatchlist.filter(productId => allowedIds.has(productId));
    if (retainedWatchlist.length !== existingWatchlist.length) {
      settingsStore.put({ key: "watchlist", value: retainedWatchlist });
    }
  };
  settingsStore.put({ key: "catalogScope", value: "shopping-gateway-v2" });
  await done;
}

function readProducts() {
  return new Promise((resolve, reject) => {
    const request = database.transaction("products", "readonly").objectStore("products").getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Unable to load products from the local database."));
  });
}

function readSetting(key) {
  return new Promise((resolve, reject) => {
    const request = database.transaction("settings", "readonly").objectStore("settings").get(key);
    request.onsuccess = () => resolve(request.result ? request.result.value : undefined);
    request.onerror = () => reject(request.error || new Error("Unable to load the saved appearance setting."));
  });
}

function saveSetting(key, value) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("settings", "readwrite");
    transaction.objectStore("settings").put({ key, value });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Unable to save the appearance setting."));
    transaction.onabort = () => reject(transaction.error || new Error("The appearance setting change was cancelled."));
  });
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

function readAllRecords(storeName) {
  return new Promise((resolve, reject) => {
    const request = database.transaction(storeName, "readonly").objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error(`Unable to export ${storeName} from the local database.`));
  });
}

async function exportLocalData() {
  const [savedProducts, settings] = await Promise.all([
    readAllRecords("products"),
    readAllRecords("settings")
  ]);
  const data = {
    exportedAt: new Date().toISOString(),
    notice: "Store links open retailer searches.",
    products: savedProducts,
    settings,
    watchlist: [...watchlist]
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "tech-it-more-data.json";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Local catalog and watchlist exported as JSON.");
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeToggle.querySelector(".theme-icon").innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${isDark ? '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>' : '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'}</svg>`;
  themeToggle.querySelector(".theme-label").textContent = isDark ? "Light mode" : "Dark mode";
  document.querySelector("#theme-color").content = isDark ? "#0d1218" : "#eff2f6";
}

function reviewSearchUrl(product) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${product.brand} ${product.name} review`)}`;
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
  "Audio": '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/>',
  "Monitors": '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  "PCs & laptops": '<rect x="5" y="5" width="14" height="10" rx="1.6"/><path d="M2.5 19h19"/>',
  "Components": '<rect x="7" y="7" width="10" height="10" rx="1.6"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>'
};
function categoryIcon(category) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[category] || ICON_PATHS["All products"]}</svg>`;
}
const HEART_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';
const BRAND_NAMES = {
  "8BITDO": "8BitDo", "ASUS": "ASUS", "ASUS ROG": "ASUS ROG", "ASUS TUF": "ASUS TUF", "BENQ": "BenQ", "GAMESIR": "GameSir", "HYPERX": "HyperX", "LOGITECH G": "Logitech G",
  "NZXT": "NZXT", "PLAYSTATION": "PlayStation", "POWERA": "PowerA", "STEELSERIES": "SteelSeries", "WD BLACK": "WD Black", "XBOX": "Xbox"
};
function brandLabel(brand) {
  const raw = String(brand || "").trim();
  const key = raw.toUpperCase();
  if (BRAND_NAMES[key]) return BRAND_NAMES[key];
  if (raw !== key) return raw;
  return raw.split(" ").map(word => (word.length <= 3 ? word : word.charAt(0) + word.slice(1).toLowerCase())).join(" ");
}
const CATEGORY_WORDS = {
  "Consoles & handhelds": "console handheld", "Controllers": "controller gamepad", "Keyboards": "keyboard", "Mice": "mouse",
  "Headsets": "headset headphones", "Audio": "audio microphone", "Monitors": "monitor display", "PCs & laptops": "pc laptop computer", "Components": "component gpu cpu ssd"
};
function isWireless(product) {
  return /wireless|lightspeed|hyperspeed|bluetooth|2\.4\s?ghz/i.test(`${product.name} ${product.specs || ""}`);
}
function specText(product) {
  const specs = String(product.specs || "").trim();
  return /not listed|check the/i.test(specs) ? "" : specs;
}
function firstSpec(product) {
  return specText(product).split(" · ").slice(0, 2).join(" · ");
}
function matchesTerms(product, terms) {
  const haystack = `${brandLabel(product.brand)} ${product.name} ${product.category} ${CATEGORY_WORDS[product.category] || ""} ${specText(product)}`.toLocaleLowerCase();
  return terms.every(term => haystack.includes(term));
}
function savedOnly() {
  return watchlistFilter.getAttribute("aria-pressed") === "true";
}
function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function scrollToCatalog() {
  document.querySelector("#catalog").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}
function setWireless(value) {
  wirelessOnly = value;
  wirelessToggle.setAttribute("aria-pressed", String(value));
}
function updateSearchState() {
  searchWrap.classList.toggle("has-text", searchInput.value.length > 0);
}

function searchableProducts(allProducts) {
  const terms = searchInput.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const onlySaved = savedOnly();
  const visible = allProducts.filter(product => {
    if (sharedIds && !sharedIds.includes(product.id)) return false;
    if (activeCategory !== "All products" && product.category !== activeCategory) return false;
    if (activeBrand !== "All brands" && brandLabel(product.brand) !== activeBrand) return false;
    if (wirelessOnly && !isWireless(product)) return false;
    if (onlySaved && !watchlist.has(product.id)) return false;
    return !terms.length || matchesTerms(product, terms);
  });
  if (sortSelect.value === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
  if (sortSelect.value === "brand") visible.sort((a, b) => brandLabel(a.brand).localeCompare(brandLabel(b.brand)) || a.name.localeCompare(b.name));
  return visible;
}

function cardMarkup(product) {
  const name = escapeHtml(product.name);
  const brand = escapeHtml(brandLabel(product.brand));
  const kind = escapeHtml(product.category);
  const productId = escapeHtml(product.id);
  const saved = watchlist.has(product.id);
  const spec = firstSpec(product);
  const icon = categoryIcon(product.category);
  const media = product.imageUrl
    ? `<img class="tm-photo" src="${escapeHtml(product.imageUrl)}" alt="${brand} ${name}" loading="lazy" decoding="async"><span class="tm-icon" aria-hidden="true" hidden>${icon}</span>`
    : `<span class="tm-icon" aria-hidden="true">${icon}</span>`;
  return `<article class="tm-card" data-kind="${kind}">
    <button class="tm-open" type="button" data-product-id="${productId}" aria-label="${brand} ${name}: see where to buy">
      <span class="tm-tile">${media}${isWireless(product) ? '<span class="tm-pill">Wireless</span>' : ""}</span>
      <span class="tm-body"><span class="tm-brand">${brand}</span><span class="tm-name">${name}</span>${spec ? `<span class="tm-spec">${escapeHtml(spec)}</span>` : ""}</span>
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
          ? `Only the main photo is available here. <a href="${escapeHtml(product.imageSource)}" target="_blank" rel="noopener noreferrer">View the product photo gallery ↗</a>`
          : "Only the main photo is available for this product.";
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
      });
      const slideshowButton = dialogContent.querySelector("#gallery-slideshow-toggle");
      if (slideshowButton) slideshowButton.disabled = allPhotos.length < 2;
      const counter = dialogContent.querySelector("#photo-gallery-counter");
      if (counter) counter.textContent = `${defaultIndex + 1} / ${allPhotos.length}`;
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
  if (savedOnly()) chips.push(["saved", "Saved only"]);
  const html = chips.map(([kind, label]) => `<button type="button" class="tm-chip" data-clear="${kind}" aria-label="Remove filter: ${escapeHtml(label)}">${escapeHtml(label)} <span aria-hidden="true">×</span></button>`);
  if (chips.length > 1) html.push(`<button type="button" class="tm-link" data-clear="all">Clear all</button>`);
  activeFiltersEl.innerHTML = html.join("");
}

function clearFilter(kind) {
  if (kind === "query" || kind === "all") searchInput.value = "";
  if (kind === "category" || kind === "all") activeCategory = "All products";
  if (kind === "brand" || kind === "all") activeBrand = "All brands";
  if (kind === "wireless" || kind === "all") setWireless(false);
  if (kind === "saved" || kind === "all") setWatchlistFilter(false);
  updateSearchState();
  renderCategories();
  renderCatalog();
}

function renderRecent() {
  const home = !searchInput.value.trim() && activeCategory === "All products" && activeBrand === "All brands" && !wirelessOnly && !savedOnly() && !sharedIds;
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
  const visible = searchableProducts(catalogProducts);
  const alreadyRendered = append ? grid.children.length : 0;
  if (!append) grid.innerHTML = "";
  grid.insertAdjacentHTML("beforeend", visible.slice(alreadyRendered, alreadyRendered + catalogPageSize).map(cardMarkup).join(""));
  const rendered = Math.min(visible.length, alreadyRendered + catalogPageSize);
  resultsCount.textContent = `${visible.length} ${visible.length === 1 ? "product" : "products"}`;
  catalogTitle.textContent = sharedIds ? "Shared list" : activeCategory === "All products" ? "All gear" : activeCategory;
  emptyState.textContent = savedOnly() && !watchlist.size
    ? "Nothing saved yet. Tap the heart on any product to save it here."
    : "No products match. Try a different search or clear a filter.";
  emptyState.hidden = visible.length !== 0;
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

function retailerSearchUrl(store, productName) {
  const baseUrl = STORE_SEARCH_URLS[store];
  if (!baseUrl) return "#";
  const url = new URL(baseUrl);
  const queryParam = {
    "Amazon": "k",
    "Dell": "q",
    "Apple Store": "q",
    "Google Store": "q",
    "Micro Center": "Ntt",
    "Best Buy": "st",
    "Walmart": "q",
    "Newegg": "d",
    "B&H Photo": "Ntt",
    "Target": "searchTerm",
    "eBay": "_nkw",
    "Steam": "term",
    "Nintendo": "q",
    "ASUS Store": "q",
    "Samsung Store": "q",
    "Anker Store": "q",
    "Sonos": "q"
  }[store];
  if (queryParam) url.searchParams.set(queryParam, productName);
  else url.searchParams.set("q", productName);
  return url.href;
}

async function openProduct(productId, { fromHistory = false } = {}) {
  const requestId = ++productDialogRequest;
  try {
    const product = catalogProducts.find(item => item.id === productId);
    if (!product) throw new Error(`Product "${productId}" was not found in the local database.`);
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
    const specs = escapeHtml(product.specs || "Product specifications are not listed; check the linked product record.");
    const icon = escapeHtml(product.icon);
    const productIdAttribute = escapeHtml(product.id);
    const artClass = product.art ? ` ${escapeHtml(product.art)}` : "";
    const photoCredit = `<p class="photo-credit"><span id="photo-credit-label">Product photo: </span><a id="photo-credit-link" href="${escapeHtml(product.imageSource || product.productSource || "https://commons.wikimedia.org/")}" target="_blank" rel="noopener noreferrer">${escapeHtml(product.imageCreator || (product.imageSource ? "manufacturer source" : "photo source"))} ↗</a>${product.productSource ? ` · <a href="${escapeHtml(product.productSource)}" target="_blank" rel="noopener noreferrer">product record ↗</a>` : ""}</p>`;
    const rows = (product.retailerSearchStores || [])
      .filter((storeName, index, stores) => STORE_SEARCH_URLS[storeName] && stores.indexOf(storeName) === index)
      .map(storeName => {
        const store = escapeHtml(storeName);
        return `<a class="store-gateway-link" href="${escapeHtml(retailerSearchUrl(storeName, `${product.brand} ${product.name}`))}" target="_blank" rel="noopener noreferrer">
          <span class="store-icon" aria-hidden="true">${escapeHtml(storeName.charAt(0))}</span>
          <span>${store}</span>
          <span aria-hidden="true">Search ↗</span>
        </a>`;
      }).join("") || `<p class="gateway-disclosure">No product-specific retailer searches are listed for this item yet.</p>`;
    const offersHeading = "Find this product at retailers";
    const offersNotice = "(opens each store's own search)";
    const offerNote = `<p class="gateway-disclosure">Each link opens the store's own search page for this product.</p>`;
    dialogContent.innerHTML = `<div class="detail-content" data-product-id="${productIdAttribute}" data-kind="${category}">
      <div class="detail-top">
        <span class="product-art detail-art${artClass}" aria-hidden="true">${categoryIcon(product.category)}</span>
        <div class="detail-title-wrap"><p class="product-brand">${brand} · ${category}</p><h2 id="detail-name">${productName}</h2><p class="detail-subtitle">${specs}</p></div>
      </div>
      <div class="product-photo-gallery" id="product-photo-gallery" data-selected-index="0">
        <div class="detail-photo-wrap">
          <button class="photo-gallery-arrow previous" type="button" data-photo-step="-1" aria-label="Show previous product photo" disabled>‹</button>
        <img class="detail-photo" id="gallery-main-photo" src="${escapeHtml(product.imageUrl || "")}" alt="${brand} ${productName} ${/\.svg(\?|$)/.test(product.imageUrl) ? "illustration" : "product photo"}" role="button" tabindex="0" aria-label="Open ${productName} photo full screen" decoding="async" ${product.imageUrl ? "" : "hidden"}>
        <div class="photo-unavailable detail-photo-unavailable"${product.imageUrl ? " hidden" : ""}><span class="product-art detail-art${artClass}" aria-hidden="true">${categoryIcon(product.category)}</span><span>Official product photo unavailable</span></div>
          <span class="photo-gallery-counter" id="photo-gallery-counter" aria-live="polite">1 / 1</span>
          <button class="photo-gallery-arrow next" type="button" data-photo-step="1" aria-label="Show next product photo" disabled>›</button>
        </div>
        <div class="photo-gallery-thumbnails" id="photo-gallery-thumbnails" role="group" aria-label="Product photos" hidden></div>
        <button class="gallery-slideshow-toggle" id="gallery-slideshow-toggle" type="button" aria-pressed="false" aria-label="Play photo slideshow" disabled>▶ Play</button>
        <p class="photo-gallery-status" id="photo-gallery-status" role="status">Loading additional product photos…</p>
      </div>
      <div class="detail-info-column">
        ${photoCredit}
        <h3 class="offers-heading">${offersHeading} <span class="offers-notice">${offersNotice}</span></h3>
        <div class="offer-list store-gateway-list">${rows}</div>
        ${offerNote}
        <div class="review-feature">
          <span class="review-feature-icon" aria-hidden="true">▶</span>
          <span><strong>Watch before you buy</strong><small>See video reviews for this exact product</small></span>
          <a class="review-link" href="${reviewSearchUrl(product)}" target="_blank" rel="noopener noreferrer">Find reviews <span aria-hidden="true">↗</span></a>
        </div>
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
});
exportButton.addEventListener("click", () => {
  exportLocalData().catch(error => showError("Could not export local database data.", error));
});
dialogContent.addEventListener("click", event => {
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
    const url = new URL(window.location.href);
    url.hash = `product=${encodeURIComponent(shareButton.dataset.shareProduct)}`;
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
  if (!("indexedDB" in window)) {
    throw new Error("This browser does not support IndexedDB, which is required for the local product database.");
  }
  database = await openDatabase();
  await pruneDatabaseToGamingCatalog();
  await seedDatabaseIfNeeded();
  const retailerSearchStoresByProduct = productRetailerStores;
  catalogProducts = (await readProducts()).map(product => ({
    ...product,
    retailerSearchStores: retailerSearchStoresByProduct.get(product.id) || []
  }));
  watchlist = new Set(await readSetting("watchlist") || []);
  watchlistCount.textContent = String(watchlist.size);
  applyTheme(await readSetting("theme") || (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  recentIds = (await readSetting("recent") || []).filter(id => catalogProducts.some(product => product.id === id));
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
  const notice = document.querySelector("#data-note");
  const icon = document.createElement("span");
  icon.className = "notice-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "!";
  const message = document.createElement("p");
  const heading = document.createElement("strong");
  heading.textContent = "Database unavailable:";
  message.append(heading, ` ${error.message}. Try opening this page in a recent browser and check local storage permissions.`);
  notice.replaceChildren(icon, message);
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