const bundledProducts = [
  { id: "lg-ultragear-27", brand: "LG", name: "UltraGear 27″ QHD Gaming Monitor", category: "Monitors", icon: "▱", art: "art-monitor", imageUrl: "https://media.us.lg.com/transform/ecomm-PDPGalleryThumbnail-350x350/9baa8ae0-659f-4d9f-ac9a-8dd5e4ce806a/Monitor_27GS75Q-B_gallery_01_5000x5000", imageSource: "https://www.lg.com/us/monitors/lg-27gs75q-b-gaming-monitor", specs: "27″ QHD · up to 200Hz (overclocked) · IPS · Adaptive Sync", basePrice: 349.99, lowPrice: 229.99, retailers: [["Micro Center", 229.99], ["Amazon", 249.99], ["Newegg", 239.99], ["Best Buy", 279.99]] },
  { id: "razer-deathadder-v3", brand: "RAZER", name: "DeathAdder V3 Pro Wireless Mouse", category: "Accessories", icon: "◉", art: "art-mouse", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/a0427959a82f1f5d1c27c2463008e5a8/razer-deathadder-v3-og.jpg", imageSource: "https://www.razer.com/gaming-mice/razer-deathadder-v3-pro", specs: "Ergonomic wireless · 30K sensor · Up to 90-hour battery", basePrice: 149.99, lowPrice: 99.99, retailers: [["Micro Center", 99.99], ["Amazon", 109.99], ["Newegg", 119.99], ["Best Buy", 129.99]] },
  { id: "steam-deck-oled", brand: "VALVE", name: "Steam Deck OLED 512GB", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://cdn.fastly.steamstatic.com/steamdeck/images/oled/social_media_image.jpg", imageSource: "https://www.steamdeck.com/en/", specs: "7.4″ HDR OLED · 512GB NVMe · Wi-Fi 6E", basePrice: 549.00, lowPrice: 499.00, retailers: [["Steam", 549.00], ["Amazon", 519.99], ["Best Buy", 499.00], ["Newegg", 529.00]] },
  { id: "switch-oled-white", brand: "NINTENDO", name: "Nintendo Switch OLED Model", category: "Gaming", icon: "▣", art: "art-console", imageUrl: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/products/hardware/nintendo-switch-oled-model-white-set/115461-switch-oled-white-boxart-1200x675", imageSource: "https://www.nintendo.com/us/store/products/nintendo-switch-oled-model-white-set/", imageCreator: "Nintendo Switch OLED Model White product image", specs: "7″ OLED screen · 64GB · White Joy-Con controllers", basePrice: 349.99, lowPrice: 319.99, retailers: [["Best Buy", 339.99], ["Amazon", 319.99], ["Walmart", 339.00], ["Target", 339.99]] },
  { id: "rog-ally-x", brand: "ASUS ROG", name: "ROG Ally X Handheld Gaming PC", category: "Gaming", icon: "▣", art: "art-console", imageUrl: "https://dlcdnwebimgs.asus.com/gain/F12D7B4D-DC78-4228-8426-D2C474B7BD0D", imageSource: "https://rog.asus.com/us/gaming-handhelds/rog-ally/rog-ally-x-2024/", imageCreator: "ASUS ROG Ally X official product image", specs: "7″ 120Hz · Ryzen Z1 Extreme · 24GB RAM · 1TB SSD", basePrice: 799.99, lowPrice: 699.99, retailers: [["Best Buy", 699.99], ["Amazon", 749.99], ["Newegg", 729.99], ["ASUS Store", 799.99]] },
  { id: "razer-blackwidow-v4", brand: "RAZER", name: "BlackWidow V4 Mechanical Gaming Keyboard", category: "Accessories", icon: "▦", art: "art-keyboard", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/2eebfd7a585f70e30afa1bf2b242fa22/razer-blackwidow-v4-ogimage-1200x630.jpg", imageSource: "https://www.razer.com/gaming-keyboards/razer-blackwidow-v4", imageCreator: "Razer BlackWidow V4 official product image", specs: "Full-size mechanical · Razer Chroma RGB · Dedicated media controls", basePrice: 229.99, lowPrice: 179.99, retailers: [["Amazon", 179.99], ["Best Buy", 199.99], ["Newegg", 189.99], ["Micro Center", 209.99]] },
  { id: "razer-huntsman-v3-pro", brand: "RAZER", name: "Huntsman V3 Pro Analog Gaming Keyboard", category: "Accessories", icon: "▦", art: "art-keyboard", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/f2ba430b48cc45a90075a905e0eac073/razer-huntsman-v3-pro-ogimage-1200x630-v2.webp", imageSource: "https://www.razer.com/gaming-keyboards/razer-huntsman-v3-pro", imageCreator: "Razer Huntsman V3 Pro official product image", specs: "Analog optical switches · Adjustable actuation · Rapid Trigger", basePrice: 249.99, lowPrice: 199.99, retailers: [["Amazon", 199.99], ["Best Buy", 219.99], ["Newegg", 229.99], ["Micro Center", 239.99]] },
  { id: "razer-viper-v3-pro", brand: "RAZER", name: "Viper V3 Pro Wireless Gaming Mouse", category: "Accessories", icon: "◉", art: "art-mouse", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/24970f67be4ba9644e28720377d91cfb/razer-viper-v3-pro-1200x630.webp", imageSource: "https://www.razer.com/gaming-mice/razer-viper-v3-pro", imageCreator: "Razer Viper V3 Pro official product image", specs: "Ultra-light wireless · 35K DPI sensor · 8,000Hz polling capable", basePrice: 159.99, lowPrice: 129.99, retailers: [["Amazon", 129.99], ["Best Buy", 139.99], ["Newegg", 149.99], ["Micro Center", 154.99]] },
  { id: "razer-deathadder-v3-hyperspeed", brand: "RAZER", name: "DeathAdder V3 HyperSpeed Wireless Mouse", category: "Accessories", icon: "◉", art: "art-mouse", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/846248a215ecc26cf0ad3f7cf62691bd/razer-deathadder-v3-hyperspeed-ogimage-1200x630.webp", imageSource: "https://www.razer.com/gaming-mice/razer-deathadder-v3-hyperspeed", imageCreator: "Razer DeathAdder V3 HyperSpeed official product image", specs: "Ergonomic wireless · 26K DPI sensor · Up to 100-hour battery", basePrice: 99.99, lowPrice: 69.99, retailers: [["Amazon", 69.99], ["Best Buy", 79.99], ["Newegg", 89.99], ["Micro Center", 94.99]] },
  { id: "razer-blackshark-v2-pro", brand: "RAZER", name: "BlackShark V2 Pro Wireless Gaming Headset", category: "Audio", icon: "◖", art: "art-headphones", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/0de78efe3441114d8a92590145fff4c8/razer-blackshark-v2-pro-2023_ogimage-1200x630.jpg", imageSource: "https://www.razer.com/gaming-headsets/razer-blackshark-v2-pro", imageCreator: "Razer BlackShark V2 Pro official product image", specs: "Wireless esports headset · Detachable microphone · 70-hour battery", basePrice: 199.99, lowPrice: 159.99, retailers: [["Amazon", 159.99], ["Best Buy", 169.99], ["Newegg", 179.99], ["Micro Center", 189.99]] },
  { id: "razer-kraken-v4", brand: "RAZER", name: "Kraken V4 Wireless Gaming Headset", category: "Audio", icon: "◖", art: "art-headphones", imageUrl: "https://assets2.razerzone.com/images/pnx.assets/54336b9e31510b5983cfc72dbec14c34/kraken-v4-1200x630-og.webp", imageSource: "https://www.razer.com/gaming-headsets/razer-kraken-v4", imageCreator: "Razer Kraken V4 official product image", specs: "Wireless gaming headset · Retractable microphone · Chroma RGB", basePrice: 179.99, lowPrice: 139.99, retailers: [["Amazon", 139.99], ["Best Buy", 149.99], ["Newegg", 159.99], ["Micro Center", 169.99]] },
  { id: "steelseries-arctis-nova-7p", brand: "STEELSERIES", name: "Arctis Nova 7P Wireless Gaming Headset", category: "Audio", icon: "◖", art: "art-headphones", imageUrl: "https://images.ctfassets.net/hmm5mo4qf4mf/656blOm98ncSC8GsJv9QUN/853167c9ec252f79986681b6da4ca64e/arctis_nova_7p_black_pdp_img_buy_01.png__1920x1080_crop-fit_optimize_subsampling-2-190.png?w=1200&h=600&fit=fill&fm=jpg&q=85", imageSource: "https://steelseries.com/gaming-headsets/arctis-nova-7", imageCreator: "SteelSeries Arctis Nova 7P official product image", specs: "2.4GHz wireless and Bluetooth · USB-C · PlayStation-focused controls", basePrice: 179.99, lowPrice: 139.99, retailers: [["Amazon", 139.99], ["Best Buy", 149.99], ["Newegg", 159.99], ["Walmart", 169.99]] },
  { id: "nzxt-player-two-prime", brand: "NZXT", name: "Player Two Prime Gaming PC", category: "Computers", icon: "⌁", art: "art-computer", imageUrl: "https://nzxt.com/cdn/shop/files/PlayerTwoPrime_hero_black_bagde_260527_43d11dd5-c1bf-434f-925d-64e4e419c973.png?v=1786045573&width=2048", imageSource: "https://nzxt.com/product/player-two-prime", imageCreator: "NZXT Player Two Prime official product image", specs: "AMD Ryzen 9 9900X · GeForce RTX 5070 Ti · 32GB RAM · 2TB SSD", basePrice: 2999.99, lowPrice: 2699.99, retailers: [["Amazon", 2699.99], ["Best Buy", 2799.99], ["Newegg", 2899.99], ["Micro Center", 2949.99]] },
  { id: "nzxt-player-two", brand: "NZXT", name: "Player Two Gaming PC", category: "Computers", icon: "⌁", art: "art-computer", imageUrl: "https://nzxt.com/cdn/shop/files/PlayerTwoBase_hero_black_badge_9804c25b-a61f-4b02-ae9b-6ad4afdd408c.png?v=1786049042&width=2048", imageSource: "https://nzxt.com/product/player-two", imageCreator: "NZXT Player Two official product image", specs: "Intel Core Ultra 7 270K Plus · GeForce RTX 5070 · 32GB RAM · 1TB SSD", basePrice: 2199.99, lowPrice: 1899.99, retailers: [["Amazon", 1899.99], ["Best Buy", 1999.99], ["Newegg", 2099.99], ["Micro Center", 2149.99]] },
  { id: "xbox-wireless-controller", brand: "XBOX", name: "Xbox Wireless Controller", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://assets.xboxservices.com/assets/99/9b/999b6ab0-6ae1-432d-bed3-494bc3dfb138.jpg?n=111101_Sharing_200x200.jpg", imageSource: "https://www.xbox.com/en-US/accessories/controllers/xbox-wireless-controller", imageCreator: "Xbox Wireless Controller official product image", specs: "Wireless controller · Bluetooth · Xbox and Windows compatible", basePrice: 64.99, lowPrice: 49.99, retailers: [["Amazon", 49.99], ["Best Buy", 54.99], ["Walmart", 59.99], ["Target", 59.99]] },
  { id: "dualsense-edge-controller", brand: "PLAYSTATION", name: "DualSense Edge Wireless Controller", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-edge-listing-thumb-01-en-23aug22?$facebook$", imageSource: "https://www.playstation.com/en-us/accessories/dualsense-edge-wireless-controller/", imageCreator: "PlayStation DualSense Edge official product image", specs: "Customizable controls · Replaceable stick modules · Back buttons", basePrice: 199.99, lowPrice: 179.99, retailers: [["Amazon", 179.99], ["Best Buy", 189.99], ["Walmart", 189.99], ["Target", 189.99]] },
  { id: "elgato-4k-x", brand: "ELGATO", name: "4K X External Game Capture Card", category: "Gaming", icon: "▰", art: "art-storage", imageUrl: "https://images.ctfassets.net/h50kqpe25yx1/4f6jo2deHdLdmaxkWo3VKv/2056b061f7644d9003e4304dd373c0ce/4K-X-Social-Graph.jpg", imageSource: "https://www.elgato.com/us/en/p/game-capture-4k-x", imageCreator: "Elgato 4K X official product image", specs: "External USB capture · Up to 4K144 passthrough · HDMI 2.1", basePrice: 229.99, lowPrice: 199.99, retailers: [["Amazon", 199.99], ["Best Buy", 209.99], ["Newegg", 219.99], ["B&H Photo", 224.99]] },
  { id: "corsair-k70-pro-rgb", brand: "CORSAIR", name: "K70 PRO RGB Mechanical Gaming Keyboard", category: "Accessories", icon: "▦", art: "art-keyboard", imageUrl: "https://res.cloudinary.com/corsair-pwa/image/upload/c_scale%2Cq_auto%2Cw_1200/products/Gaming-Keyboards/CH-910941A-NA/Gallery/K70_PRO_OPX_PBT_01.png", imageSource: "https://www.corsair.com/us/en/p/gaming-keyboards/ch-910941a-na/k70-rgb-pro-mechanical-gaming-keyboard-ch-910941a-na", imageCreator: "Corsair K70 PRO RGB official product image", specs: "Optical-mechanical switches · PBT keycaps · Tournament switch", basePrice: 179.99, lowPrice: 129.99, retailers: [["Amazon", 129.99], ["Best Buy", 149.99], ["Newegg", 159.99], ["Micro Center", 169.99]] },
  { id: "corsair-m75-air", brand: "CORSAIR", name: "M75 AIR Wireless Gaming Mouse", category: "Accessories", icon: "◉", art: "art-mouse", imageUrl: "https://assets.corsair.com/image/upload/c_scale%2Cq_auto%2Cw_1200/products/Gaming-Mice/CH-931D100/M75_AIR_BLACK_RENDER_01.png", imageSource: "https://www.corsair.com/us/en/p/gaming-mice/ch-931d100-na/m75-air-wireless-ultra-lightweight-gaming-mouse-ch-931d100-na", imageCreator: "Corsair M75 AIR official product image", specs: "Ultra-light wireless · 26,000 DPI sensor · Up to 100-hour battery", basePrice: 129.99, lowPrice: 79.99, retailers: [["Amazon", 79.99], ["Best Buy", 99.99], ["Newegg", 109.99], ["Micro Center", 119.99]] },
  { id: "corsair-virtuoso-rgb-wireless-se", brand: "CORSAIR", name: "Virtuoso RGB Wireless SE Gaming Headset", category: "Audio", icon: "◖", art: "art-headphones", imageUrl: "https://res.cloudinary.com/corsair-pwa/image/upload/c_scale%2Cq_auto%2Cw_1200/products/Gaming-Headsets/CA-9011180-NA/Gallery/VIRTUOSO_SE_01.png", imageSource: "https://www.corsair.com/us/en/p/gaming-headsets/ca-9011180-na/virtuoso-rgb-wireless-se-high-fidelity-gaming-headset-ca-9011180-na", imageCreator: "Corsair Virtuoso RGB Wireless SE official product image", specs: "Wireless gaming headset · Detachable broadcast microphone · 7.1 surround sound", basePrice: 269.99, lowPrice: 219.99, retailers: [["Amazon", 219.99], ["Best Buy", 239.99], ["Newegg", 249.99], ["Micro Center", 259.99]] },
  { id: "dualsense-wireless-controller", brand: "PLAYSTATION", name: "DualSense Wireless Controller", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-controller-product-thumbnail-01-en-14sep21?$facebook$", imageSource: "https://www.playstation.com/en-us/accessories/dualsense-wireless-controller/", imageCreator: "PlayStation DualSense official product image", specs: "Haptic feedback · Adaptive triggers · Built-in microphone", basePrice: 74.99, lowPrice: 59.99, retailers: [["Amazon", 59.99], ["Best Buy", 64.99], ["Walmart", 69.99], ["Target", 69.99]] },
  { id: "playstation-5-pro", brand: "PLAYSTATION", name: "PlayStation 5 Pro Console", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-dualsense-image-block-01-en-16aug24?$facebook$", imageSource: "https://www.playstation.com/en-us/ps5/ps5-pro/", imageCreator: "PlayStation 5 Pro official product image", specs: "2TB SSD · Advanced ray tracing · 4K gaming up to 120fps", basePrice: 699.99, lowPrice: 649.99, retailers: [["Amazon", 649.99], ["Best Buy", 679.99], ["Walmart", 689.99], ["Target", 699.99]] },
  { id: "xbox-series-x", brand: "XBOX", name: "Xbox Series X Console", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://assets.xboxservices.com/assets/18/30/1830806b-d41d-40ce-a846-792df7d14e1d.jpg?n=Xbox-Series-X_Sharing_200x200_02.jpg", imageSource: "https://www.xbox.com/en-US/consoles/xbox-series-x", imageCreator: "Xbox Series X official product image", specs: "1TB SSD · 4K gaming · Up to 120fps · UHD Blu-ray", basePrice: 499.99, lowPrice: 449.99, retailers: [["Amazon", 449.99], ["Best Buy", 479.99], ["Walmart", 489.99], ["Target", 499.99]] },
  { id: "playstation-vr2", brand: "PLAYSTATION", name: "PlayStation VR2 Headset", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/PSVR2-thumbnail-01-en-22feb22?$facebook$", imageSource: "https://www.playstation.com/en-us/ps-vr2/", imageCreator: "PlayStation VR2 official product image", specs: "4K HDR OLED · Eye tracking · 3D audio · Sense controllers", basePrice: 549.99, lowPrice: 399.99, retailers: [["Amazon", 399.99], ["Best Buy", 449.99], ["Walmart", 499.99], ["Target", 499.99]] },
  { id: "meta-quest-3", brand: "META", name: "Quest 3 512GB VR Headset", category: "Gaming", icon: "◈", art: "art-console", imageUrl: "https://lookaside.fbsbx.com/elementpath/media/?media_id=157327897433582&version=1790053480&transcode_extension=webp", imageSource: "https://www.meta.com/quest/quest-3/", imageCreator: "Meta Quest 3 official product image", specs: "Mixed reality · 512GB storage · 4K+ Infinite Display · Hand tracking", basePrice: 499.99, lowPrice: 429.99, retailers: [["Amazon", 429.99], ["Best Buy", 449.99], ["Walmart", 479.99], ["Target", 479.99]] },
  { id: "geforce-rtx-5070-ti", brand: "NVIDIA", name: "GeForce RTX 5070 Ti Graphics Card", category: "Components", icon: "▰", art: "art-storage", imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/50-series/5070-family/geforce-rtx-5070-ti-og-image.jpg", imageSource: "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/", imageCreator: "NVIDIA GeForce RTX 5070 Ti official product image", specs: "16GB GDDR7 · DLSS 4 · PCI Express 5.0", basePrice: 749.99, lowPrice: 699.99, retailers: [["Amazon", 699.99], ["Best Buy", 729.99], ["Newegg", 719.99], ["Micro Center", 709.99]] }
];

const productCandidates = bundledProducts
  .concat(Array.isArray(window.TECH_IT_MORE_PRODUCTS) ? window.TECH_IT_MORE_PRODUCTS : [])
  .concat(Array.isArray(window.TECH_IT_MORE_GAMING_PRODUCTS) ? window.TECH_IT_MORE_GAMING_PRODUCTS : [])
  .filter(product => product && typeof product.id === "string" && typeof product.name === "string" && typeof product.imageUrl === "string" && product.imageUrl.length > 0 && typeof product.imageSource === "string" && product.imageSource.length > 0 && Number.isFinite(product.basePrice) && Number.isFinite(product.lowPrice));
const productsById = new Map();
for (const product of productCandidates) {
  if (!productsById.has(product.id)) productsById.set(product.id, product);
}
const products = Array.from(productsById.values()).map(product => ({
  ...product,
  retailers: Array.isArray(product.retailers) && product.retailers.length > 0
    ? product.retailers
    : [
        ["Amazon", product.lowPrice],
        ["Best Buy", Math.round(product.lowPrice * 1.05 * 100) / 100],
        ["Walmart", Math.round(product.lowPrice * 1.1 * 100) / 100],
        ["Newegg", Math.round(product.lowPrice * 1.15 * 100) / 100]
      ]
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
const priceApiBase = document.querySelector('meta[name="price-api-base"]')?.content.trim().replace(/\/$/, "") || "";
const categories = ["All products", ...new Set(products.map(product => product.category))];
const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const categoryList = document.querySelector("#category-list");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const watchlistPanel = document.querySelector("#watchlist-panel");
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
const currencySelect = document.querySelector("#currency-select");
const currencyControl = document.querySelector("#currency-control");
let watchlist = new Set();
let catalogProducts = [];
const productPhotoCache = new Map();
let livePriceServiceAvailable = false;
let livePriceRefreshTimer;
let gallerySlideTimer;
let gallerySlideshowPlaying = false;
let gallerySlideInterval = 4500;
let handlingProductHistory = false;
let productDialogRequest = 0;
const catalogPageSize = 36;
const EXCHANGE_RATES = { USD: 1, CAD: 1.36, EUR: 0.92, GBP: 0.79, AUD: 1.53, JPY: 149 };
const CURRENCY_NAMES = { USD: "US dollar", CAD: "Canadian dollar", EUR: "euro", GBP: "British pound", AUD: "Australian dollar", JPY: "Japanese yen" };
let displayCurrency = "USD";

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
  if (await readSetting("catalogScope") === "shopping-gateway-v1") return;
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
  settingsStore.put({ key: "catalogScope", value: "shopping-gateway-v1" });
  await done;
}

function readProducts() {
  return new Promise((resolve, reject) => {
    const request = database.transaction("products", "readonly").objectStore("products").getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Unable to load products from the local database."));
  });
}

async function loadLiveOffers() {
  if (!priceApiBase) return;
  const response = await fetch(`${priceApiBase}/prices`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Live price service returned HTTP ${response.status}.`);
  const payload = await response.json();
  if (!payload || !Array.isArray(payload.offers)) throw new Error("Live price service returned an invalid offers response.");
  const offersByProduct = new Map();
  for (const offer of payload.offers) {
    if (!offer || typeof offer.productId !== "string" || typeof offer.store !== "string"
      || typeof offer.price !== "number" || !Number.isFinite(offer.price) || offer.price <= 0
      || ![0, 1, true, false].includes(offer.isOnSale)
      || typeof offer.checkedAt !== "string" || Number.isNaN(Date.parse(offer.checkedAt))) continue;
    const offers = offersByProduct.get(offer.productId) || [];
    offers.push({ ...offer, isOnSale: Boolean(offer.isOnSale) });
    offersByProduct.set(offer.productId, offers);
  }
  for (const product of catalogProducts) {
    if (typeof product.demoLowPrice !== "number") {
      product.demoLowPrice = product.lowPrice;
      product.demoRetailers = product.retailers;
    }
    product.liveOffers = (offersByProduct.get(product.id) || []).sort((a, b) => a.price - b.price);
    if (product.liveOffers.length) {
      product.lowPrice = product.liveOffers[0].price;
      product.retailers = product.liveOffers.map(offer => [offer.store, offer.price]);
    } else {
      product.lowPrice = product.demoLowPrice;
      product.retailers = product.demoRetailers;
    }
  }
  livePriceServiceAvailable = true;
  const liveOfferCount = catalogProducts.reduce((count, product) => count + product.liveOffers.length, 0);
  if (liveOfferCount > 0) {
    document.querySelector("#price-data-heading").textContent = "Live US prices:";
    document.querySelector("#price-data-copy").textContent = "Live offers are marked on product cards; all other prices remain illustrative. Prices may change at checkout. Other currencies use fixed demo conversion rates.";
    document.querySelector("#integration-note").textContent = "Live retailer prices are supplied by the configured feed and refreshed every six hours.";
    document.querySelector("#footer-price-status").textContent = "Live prices · US retailers";
    document.querySelector("#header-price-status").lastChild.textContent = " Live US prices";
  } else {
    document.querySelector("#price-data-heading").textContent = "Feed connected:";
    document.querySelector("#price-data-copy").textContent = "No current retailer offers are available yet. Use store links to check current prices and sale availability.";
    document.querySelector("#integration-note").textContent = "Tech It More works as a shopping gateway without an API; live comparison is optional.";
    document.querySelector("#footer-price-status").textContent = "Shop US retailers";
    document.querySelector("#header-price-status").lastChild.textContent = " Shop US stores";
  }
}

function updatePriceControls() {
  const hasAnyLiveOffers = catalogProducts.some(product => product.liveOffers?.length);
  currencyControl.hidden = !hasAnyLiveOffers;
  for (const option of sortSelect.options) {
    if (option.value === "price-asc" || option.value === "discount") option.disabled = !hasAnyLiveOffers;
  }
  if (!hasAnyLiveOffers && (sortSelect.value === "price-asc" || sortSelect.value === "discount")) {
    sortSelect.value = "popular";
  }
}

function refreshCatalogAfterLivePrices() {
  const displayedCount = grid.children.length;
  updatePriceControls();
  renderWatchlistPanel();
  renderCatalog();
  while (grid.children.length < displayedCount && !loadMoreButton.hidden) renderCatalog(true);
  const detail = dialogContent.querySelector(".detail-content");
  if (!dialog.hidden && detail) openProduct(detail.dataset.productId);
}

async function refreshLivePriceData() {
  try {
    await loadLiveOffers();
    refreshCatalogAfterLivePrices();
    if (!livePriceRefreshTimer) {
      livePriceRefreshTimer = window.setInterval(refreshLivePriceData, 15 * 60 * 1000);
    }
  } catch (error) {
    console.warn("Live prices are unavailable; retailer links are available without an API or feed.", error);
    if (!livePriceServiceAvailable) return;
    livePriceServiceAvailable = false;
    for (const product of catalogProducts) {
      product.liveOffers = [];
      product.lowPrice = product.demoLowPrice;
      product.retailers = product.demoRetailers;
    }
    document.querySelector("#price-data-heading").textContent = "Check prices at stores:";
    document.querySelector("#price-data-copy").textContent = "Open a retailer search to see its current price, stock, and sale availability. Tech It More does not fetch store prices in gateway mode.";
    document.querySelector("#integration-note").textContent = "This site works as a shopping gateway without an API. Optional live price comparison requires an approved retailer feed.";
    document.querySelector("#footer-price-status").textContent = "Shop US retailers";
    document.querySelector("#header-price-status").lastChild.textContent = " Shop US stores";
    refreshCatalogAfterLivePrices();
  }
}

async function readLiveHistory(productId, days = 365) {
  if (!livePriceServiceAvailable) return [];
  const response = await fetch(`${priceApiBase}/prices/${encodeURIComponent(productId)}/history?days=${days}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Live price history returned HTTP ${response.status}.`);
  const payload = await response.json();
  if (!payload || !Array.isArray(payload.history)) throw new Error("Live price history returned an invalid response.");
  return payload.history.filter(point => point && /^\d{4}-\d{2}-\d{2}$/.test(point.date)
    && typeof point.price === "number" && Number.isFinite(point.price) && point.price > 0);
}

function readAlert(productId) {
  return new Promise((resolve, reject) => {
    const request = database.transaction("alerts", "readonly").objectStore("alerts").get(productId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error(`Unable to load the saved price target for "${productId}".`));
  });
}

function saveAlert(productId, targetPrice) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("alerts", "readwrite");
    transaction.objectStore("alerts").put({ productId, targetPrice, currency: "USD", createdAt: new Date().toISOString() });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Unable to save the price target."));
    transaction.onabort = () => reject(transaction.error || new Error("Saving the price target was cancelled."));
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
  watchlistCount.textContent = String(watchlist.size);
  renderWatchlistPanel();
  renderCatalog();
}

function readAllRecords(storeName) {
  return new Promise((resolve, reject) => {
    const request = database.transaction(storeName, "readonly").objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error(`Unable to export ${storeName} from the local database.`));
  });
}

async function exportLocalData() {
  const [savedProducts, offers, history, alerts, settings] = await Promise.all([
    readAllRecords("products"),
    readAllRecords("offers"),
    readAllRecords("priceHistory"),
    readAllRecords("alerts"),
    readAllRecords("settings")
  ]);
  const data = {
    exportedAt: new Date().toISOString(),
    notice: "Prices and history are included only when supplied by the connected live feed; store links open retailer searches.",
    currencyConversionRatesPerUSD: EXCHANGE_RATES,
    products: savedProducts,
    offers,
    priceHistory: history,
    alerts,
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
  showToast("Local catalog and history exported as JSON.");
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
  themeToggle.querySelector(".theme-label").textContent = isDark ? "Light mode" : "Dark mode";
  document.querySelector("#theme-color").content = isDark ? "#171b24" : "#f7f8fa";
}

function setCurrency(currency) {
  if (!Object.hasOwn(EXCHANGE_RATES, currency)) throw new Error(`Unsupported display currency: ${currency}`);
  displayCurrency = currency;
  currencySelect.value = currency;
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: displayCurrency,
    maximumFractionDigits: ["JPY"].includes(displayCurrency) ? 0 : 2
  }).format(value * EXCHANGE_RATES[displayCurrency]);
}

function currencySymbol() {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: displayCurrency })
    .formatToParts(1)
    .find(part => part.type === "currency").value;
}

function usdFromDisplayCurrency(value) {
  return value / EXCHANGE_RATES[displayCurrency];
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

function searchableProducts(allProducts) {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const visible = allProducts.filter(product => {
    const matchesCategory = activeCategory === "All products" || product.category === activeCategory;
    const matchesQuery = !query || `${product.brand} ${product.name} ${product.category} ${product.specs}`.toLocaleLowerCase().includes(query);
    const matchesWatchlist = watchlistFilter.getAttribute("aria-pressed") !== "true" || watchlist.has(product.id);
    return matchesCategory && matchesQuery && matchesWatchlist;
  });
  if (sortSelect.value === "price-asc") {
    visible.sort((a, b) => (a.liveOffers?.length ? a.lowPrice : Infinity) - (b.liveOffers?.length ? b.lowPrice : Infinity));
  }
  if (sortSelect.value === "discount") {
    const savingsRate = product => {
      const saleOffers = (product.liveOffers || []).filter(offer => offer.isOnSale && offer.regularPrice > offer.price);
      if (saleOffers.length) return Math.max(...saleOffers.map(offer => (offer.regularPrice - offer.price) / offer.regularPrice));
      if (product.liveOffers?.length) return 0;
      return 0;
    };
    visible.sort((a, b) => savingsRate(b) - savingsRate(a));
  }
  if (sortSelect.value === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
  return visible;
}

function cardMarkup(product) {
  const bestOffer = product.liveOffers?.[0];
  const saving = bestOffer
    ? bestOffer.isOnSale && bestOffer.regularPrice > bestOffer.price
      ? Math.round((1 - bestOffer.price / bestOffer.regularPrice) * 100)
      : 0
    : 0;
  const badge = bestOffer
    ? bestOffer.isOnSale && bestOffer.regularPrice > bestOffer.price ? `SALE −${saving}%` : "LIVE PRICE"
    : "CHECK STORES";
  const priceLabel = bestOffer
    ? bestOffer.isOnSale ? "Lowest live sale price" : "Lowest live price"
    : "Retailer prices";
  const trendLabel = bestOffer
    ? `Checked ${new Date(bestOffer.checkedAt).toLocaleString()}`
    : "Current price and sale at retailer";
  const trendValue = bestOffer
    ? `${product.liveOffers.length} live ${product.liveOffers.length === 1 ? "store" : "stores"}`
    : "Search ↗";
  const name = escapeHtml(product.name);
  const brand = escapeHtml(product.brand);
  const category = escapeHtml(product.category);
  const icon = escapeHtml(product.icon);
  const artClass = product.art ? ` ${escapeHtml(product.art)}` : "";
  const productId = escapeHtml(product.id);
  return `<article class="product-card">
    <button class="card-open" type="button" data-product-id="${productId}" aria-label="Compare ${brand} ${name}">
      <div class="product-image">
        <span class="deal-badge">${badge}</span>
        <span class="compare-hint">${bestOffer ? "VIEW LIVE PRICES ↗" : "FIND AT RETAILERS ↗"}</span>
        ${product.imageUrl
      ? `<img class="product-photo" src="${escapeHtml(product.imageUrl)}" alt="${brand} ${name} product photo" loading="lazy" decoding="async"><span class="product-art${artClass}" aria-hidden="true" hidden>${icon}</span>`
      : `<div class="photo-unavailable"><span class="product-art${artClass}" aria-hidden="true">${icon}</span><span>Official product photo unavailable</span></div>`}
      </div>
      <div class="product-info">
        <p class="product-brand">${brand} · ${category}</p>
        <h3 class="product-name">${name}</h3>
        <div class="product-meta">
          <span class="price-block"><span class="price-label">${bestOffer ? priceLabel : "Retailer prices"}</span><strong class="price-value">${bestOffer ? money(product.lowPrice) : "Check stores"}</strong></span>
          <span class="retailer-count">${bestOffer ? `${product.liveOffers.length} ${product.liveOffers.length === 1 ? "store" : "stores"}` : "US retailers"}</span>
        </div>
        <div class="trend-row"><span>${trendLabel}</span><span class="${bestOffer?.isOnSale ? "trend-down" : ""}">${trendValue}</span></div>
      </div>
    </button>
    <button class="watch-toggle${watchlist.has(product.id) ? " watching" : ""}" type="button" data-watch-id="${productId}" aria-pressed="${watchlist.has(product.id)}" aria-label="${watchlist.has(product.id) ? "Remove" : "Add"} ${name} ${watchlist.has(product.id) ? "from" : "to"} watchlist">${watchlist.has(product.id) ? "♥" : "♡"}</button>
    <a class="card-review-link" href="${reviewSearchUrl(product)}" target="_blank" rel="noopener noreferrer" aria-label="Find video reviews for ${name}"><span aria-hidden="true">▶</span> Video reviews</a>
  </article>`;
}

function watchlistItemMarkup(product) {
  const name = escapeHtml(product.name);
  const brand = escapeHtml(product.brand);
  const productId = escapeHtml(product.id);
  const icon = escapeHtml(product.icon);
  const photo = product.imageUrl
    ? `<img src="${escapeHtml(product.imageUrl)}" alt="" loading="lazy" decoding="async"><span class="watchlist-item-art" aria-hidden="true" hidden>${icon}</span>`
    : `<span class="watchlist-item-art" aria-hidden="true">${icon}</span>`;
  return `<button class="watchlist-item" type="button" data-product-id="${productId}">
    ${photo}<span class="watchlist-item-copy"><small>${brand}</small><strong>${name}</strong><span>${product.liveOffers?.length ? money(product.lowPrice) : "Check stores"}</span></span>
  </button>`;
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
  const savedProducts = [...watchlist]
    .reverse()
    .map(productId => catalogProducts.find(product => product.id === productId))
    .filter(Boolean);
  const savedMarkup = savedProducts.length
    ? savedProducts.slice(0, 8).map(watchlistItemMarkup).join("")
    : `<p class="watchlist-empty">Save products with the heart button and they’ll appear here.</p>`;
  watchlistPanel.innerHTML = `<div class="watchlist-panel-heading"><div><p class="eyebrow">SAVED FOR LATER</p><h3>Your watchlist</h3></div><span class="watchlist-panel-count">${savedProducts.length}</span></div>
    <div class="watchlist-items">${savedMarkup}</div>
    ${savedProducts.length > 8 ? `<button class="watchlist-view-all" type="button" data-view-watchlist>View all ${savedProducts.length} saved products</button>` : ""}`;
}

function renderCatalog(append = false) {
  const visible = searchableProducts(catalogProducts);
  const alreadyRendered = append ? grid.children.length : 0;
  if (!append) grid.innerHTML = "";
  grid.insertAdjacentHTML("beforeend", visible.slice(alreadyRendered, alreadyRendered + catalogPageSize).map(cardMarkup).join(""));
  const rendered = Math.min(visible.length, alreadyRendered + catalogPageSize);
  resultsCount.textContent = `${visible.length} ${visible.length === 1 ? "product" : "products"}`;
  emptyState.hidden = visible.length !== 0;
  loadMoreButton.hidden = rendered >= visible.length;
  if (!loadMoreButton.hidden) {
    const remaining = visible.length - rendered;
    loadMoreButton.textContent = `Show ${Math.min(catalogPageSize, remaining)} more products`;
  }
}

function renderCategories() {
  categoryList.innerHTML = categories.map(category => `<button type="button" class="category-button${category === activeCategory ? " selected" : ""}" aria-pressed="${category === activeCategory}" data-category="${category}">${category}</button>`).join("");
}

function chartMarkup(history, range = 365, source = "Illustrative") {
  const points = history.sort((a, b) => a.date.localeCompare(b.date)).slice(-range);
  const width = 590;
  const height = 168;
  const pad = { top: 11, right: 9, bottom: 27, left: 45 };
  const prices = points.map(point => point.price);
  const min = Math.min(...prices) * 0.96;
  const max = Math.max(...prices) * 1.04;
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const coordinates = points.map((point, index) => ({
    x: pad.left + (index / Math.max(points.length - 1, 1)) * plotWidth,
    y: pad.top + ((max - point.price) / (max - min || 1)) * plotHeight
  }));
  const line = coordinates.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  const area = `${line} L ${coordinates[coordinates.length - 1].x.toFixed(2)} ${pad.top + plotHeight} L ${coordinates[0].x.toFixed(2)} ${pad.top + plotHeight} Z`;
  const ticks = [0, 1, 2, 3].map(index => {
    const y = pad.top + (plotHeight / 3) * index;
    const price = max - ((max - min) / 3) * index;
    return `<line class="chart-gridline" x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}"></line><text class="chart-tick" x="0" y="${y + 3}">${money(price)}</text>`;
  }).join("");
  const start = new Date(points[0].date).toLocaleDateString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
  const end = new Date(points[points.length - 1].date).toLocaleDateString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
  return `<svg class="price-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${source} daily price history for ${points.length} days, from ${money(prices[0])} to ${money(prices[prices.length - 1])}">
    <defs><linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#7167ee" stop-opacity=".2"></stop><stop offset="100%" stop-color="#7167ee" stop-opacity="0"></stop></linearGradient></defs>
    ${ticks}<path class="chart-area" d="${area}"></path><path class="chart-line" d="${line}"></path>
    <text class="chart-tick" x="${pad.left}" y="${height - 5}">${start}</text>
    <text class="chart-tick" x="${width - pad.right}" y="${height - 5}" text-anchor="end">${end}</text>
  </svg>`;
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
    const hasLiveOffers = Boolean(product.liveOffers?.length);
    let history;
    let offers;
    const alertPromise = readAlert(productId);
    if (hasLiveOffers) {
      [history, offers] = await Promise.all([readLiveHistory(productId), Promise.resolve(product.liveOffers)]);
    } else {
      history = [];
      offers = [];
    }
    const alert = await alertPromise;
    if (requestId !== productDialogRequest) return;
    const productName = escapeHtml(product.name);
    const brand = escapeHtml(product.brand);
    const category = escapeHtml(product.category);
    const specs = escapeHtml(product.specs || "Product specifications are not listed; check the linked product record.");
    const icon = escapeHtml(product.icon);
    const productIdAttribute = escapeHtml(product.id);
    const artClass = product.art ? ` ${escapeHtml(product.art)}` : "";
    const retailers = offers.sort((a, b) => a.price - b.price);
    const bestOffer = retailers[0];
    const photoCredit = `<p class="photo-credit"><span id="photo-credit-label">Product photo: </span><a id="photo-credit-link" href="${escapeHtml(product.imageSource || product.productSource || "https://commons.wikimedia.org/")}" target="_blank" rel="noopener noreferrer">${escapeHtml(product.imageCreator || (product.imageSource ? "manufacturer source" : "photo source"))} ↗</a>${product.productSource ? ` · <a href="${escapeHtml(product.productSource)}" target="_blank" rel="noopener noreferrer">product record ↗</a>` : ""}</p>`;
    const rows = hasLiveOffers
      ? retailers.map(offer => {
          const store = escapeHtml(offer.store);
          const sale = Boolean(offer.isOnSale && offer.regularPrice > offer.price);
          const checkedAt = offer.checkedAt ? new Date(offer.checkedAt).toLocaleString() : "";
          const productUrl = safeExternalUrl(
            offer.productUrl,
            retailerSearchUrl(offer.store, `${product.brand} ${product.name}`)
          );
          return `<div class="offer-row">
          <span class="store-icon" aria-hidden="true">${store.charAt(0)}</span>
          <span class="store-info"><strong>${store}</strong><span>${sale ? "Sale listing" : "Feed listing"} · checked ${escapeHtml(checkedAt)}</span></span>
          <span class="offer-price">${money(offer.price)}${sale ? `<small>was ${money(offer.regularPrice)}</small>` : ""}</span>
          <a class="offer-link" href="${escapeHtml(productUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${productName} listing at ${store}">Shop ↗</a>
        </div>`;
        }).join("")
      : (product.retailerSearchStores || [])
        .filter((storeName, index, stores) => STORE_SEARCH_URLS[storeName] && stores.indexOf(storeName) === index)
        .map(storeName => {
          const store = escapeHtml(storeName);
          return `<a class="store-gateway-link" href="${escapeHtml(retailerSearchUrl(storeName, `${product.brand} ${product.name}`))}" target="_blank" rel="noopener noreferrer">
            <span class="store-icon" aria-hidden="true">${escapeHtml(storeName.charAt(0))}</span>
            <span>${store}</span>
            <span aria-hidden="true">Search ↗</span>
          </a>`;
        }).join("") || `<p class="gateway-disclosure">No product-specific retailer searches are listed for this item yet.</p>`;
    const historySource = "Feed-reported";
    const historyPanel = history.length
      ? `<section class="chart-panel" aria-label="${historySource} price history">
        <div class="chart-head"><strong>Price history <span id="chart-period">· past 365 days</span></strong><span class="chart-legend"><i></i>${historySource} · ${displayCurrency}</span></div>
        <div class="range-row" role="group" aria-label="Price history range">
          <button type="button" class="range-button" data-days="30">30D</button>
          <button type="button" class="range-button" data-days="90">90D</button>
          <button type="button" class="range-button selected" data-days="365">1Y</button>
        </div>
        <div class="chart-visual">${chartMarkup(history, 365, historySource)}</div>
        <div class="price-stats"><span><small>${history.length === 365 ? "365D LOW" : "RECORDED LOW"}</small><strong>${money(Math.min(...history.map(point => point.price)))}</strong></span><span><small>${history.length === 365 ? "365D AVG" : "RECORDED AVG"}</small><strong>${money(history.reduce((sum, point) => sum + point.price, 0) / history.length)}</strong></span><span><small>${history.length === 365 ? "365D HIGH" : "RECORDED HIGH"}</small><strong>${money(Math.max(...history.map(point => point.price)))}</strong></span></div>
      </section>`
      : hasLiveOffers
        ? `<section class="chart-panel" aria-label="Feed-reported price history"><div class="chart-head"><strong>Price history</strong></div><p class="sample-price-note">No price history has been collected for this product yet. History begins when the connected feed records its first price.</p></section>`
        : "";
    const bestPriceDescription = hasLiveOffers
      ? `${bestOffer.isOnSale ? "lowest feed-reported sale price" : "lowest feed-reported current price"} from ${retailers.length} US ${retailers.length === 1 ? "store" : "stores"}`
      : "Check retailer pages for current prices and sale availability.";
    const offersHeading = hasLiveOffers ? "Current US retailer prices" : "Search this product at retailers";
    const offersNotice = hasLiveOffers ? "(from connected feed)" : "(check availability on store sites)";
    const detailPrice = hasLiveOffers
      ? `<div class="detail-price-line"><strong>${money(product.lowPrice)}</strong><span>${bestPriceDescription}</span></div>`
      : `<div class="gateway-price-note">${bestPriceDescription}</div>`;
    const offerNote = hasLiveOffers
      ? `<p class="sample-price-note">Retailer prices are captured from the connected feed; displayed currency conversions use a fixed demo rate.</p>`
      : `<p class="gateway-disclosure">Prices and sale availability are shown by each retailer. Tech It More does not fetch or verify store prices in gateway mode.</p>`;
    const alertForm = hasLiveOffers
      ? `<form class="alert-form" id="alert-form" data-alert-product="${productIdAttribute}">
        <label for="alert-price">Desired price target</label>
        <div><span>${currencySymbol()}</span><input id="alert-price" name="targetPrice" type="number" inputmode="decimal" min="1" step="${displayCurrency === "JPY" ? "1" : "0.01"}" required value="${alert ? (alert.targetPrice * EXCHANGE_RATES[displayCurrency]).toFixed(displayCurrency === "JPY" ? 0 : 2) : ""}" placeholder="Enter target price"><button type="submit">Save target</button></div>
        <small>Enter a target in ${displayCurrency}. Saved on this device; live price alerts aren't connected.</small>
      </form>`
      : "";
    dialogContent.innerHTML = `<div class="detail-content" data-product-id="${productIdAttribute}" data-history-source="${hasLiveOffers ? "live" : "gateway"}">
      <div class="detail-top">
        <span class="product-art detail-art${artClass}" aria-hidden="true">${icon}</span>
        <div class="detail-title-wrap"><p class="product-brand">${brand} · ${category}</p><h2 id="detail-name">${productName}</h2><p class="detail-subtitle">${specs}</p></div>
      </div>
      <div class="product-photo-gallery" id="product-photo-gallery" data-selected-index="0">
        <div class="detail-photo-wrap">
          <button class="photo-gallery-arrow previous" type="button" data-photo-step="-1" aria-label="Show previous product photo" disabled>‹</button>
        <img class="detail-photo" id="gallery-main-photo" src="${escapeHtml(product.imageUrl || "")}" alt="${brand} ${productName} product photo" role="button" tabindex="0" aria-label="Open ${productName} photo full screen" decoding="async" ${product.imageUrl ? "" : "hidden"}>
        <div class="photo-unavailable detail-photo-unavailable"${product.imageUrl ? " hidden" : ""}><span class="product-art detail-art${artClass}" aria-hidden="true">${icon}</span><span>Official product photo unavailable</span></div>
          <span class="photo-gallery-counter" id="photo-gallery-counter" aria-live="polite">1 / 1</span>
          <button class="photo-gallery-arrow next" type="button" data-photo-step="1" aria-label="Show next product photo" disabled>›</button>
        </div>
        <div class="photo-gallery-thumbnails" id="photo-gallery-thumbnails" role="group" aria-label="Product photos" hidden></div>
        <button class="gallery-slideshow-toggle" id="gallery-slideshow-toggle" type="button" aria-pressed="false" aria-label="Play photo slideshow" disabled>▶ Play</button>
        <p class="photo-gallery-status" id="photo-gallery-status" role="status">Loading additional product photos…</p>
      </div>
      <div class="detail-info-column">
        ${photoCredit}
        ${detailPrice}
        <h3 class="offers-heading">${offersHeading} <span class="offers-notice">${offersNotice}</span></h3>
        <div class="offer-list${hasLiveOffers ? "" : " store-gateway-list"}">${rows}</div>
        ${offerNote}
        <div class="review-feature">
          <span class="review-feature-icon" aria-hidden="true">▶</span>
          <span><strong>Watch before you buy</strong><small>See video reviews for this exact product</small></span>
          <a class="review-link" href="${reviewSearchUrl(product)}" target="_blank" rel="noopener noreferrer">Find reviews <span aria-hidden="true">↗</span></a>
        </div>
        ${historyPanel}
        ${alertForm}
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
  } else if (image.matches(".product-photo, .watchlist-item img, #gallery-main-photo")) {
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
});

watchlistPanel.addEventListener("click", event => {
  if (event.target.closest("[data-view-watchlist]")) {
    activeCategory = "All products";
    renderCategories();
    searchInput.value = "";
    setWatchlistFilter(true);
    renderCatalog();
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
    grid.querySelector(".card-open")?.focus();
    return;
  }
  const productButton = event.target.closest("[data-product-id]");
  if (productButton) openProduct(productButton.dataset.productId);
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
  renderCatalog();
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
      navigator.share({ title: "Tech It More product", text: shareButton.closest(".detail-content").dataset.historySource === "live" ? "See this product's current retailer prices and recorded price history." : "See this product and check its price at retailers.", url: url.href })
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
  const rangeButton = event.target.closest("[data-days]");
  if (!rangeButton) return;
  const detail = dialogContent.querySelector(".detail-content");
  if (detail.dataset.historySource !== "live") return;
  const productId = detail.dataset.productId;
  const range = Number(rangeButton.dataset.days);
  readLiveHistory(productId, range).then(history => {
    const chartVisual = dialogContent.querySelector(".chart-visual");
    chartVisual.innerHTML = history.length
      ? chartMarkup(history, range, dialogContent.querySelector(".detail-content").dataset.historySource === "live" ? "Feed-reported" : "Illustrative")
      : `<p class="sample-price-note">No price records were collected during the past ${range} days.</p>`;
    dialogContent.querySelector("#chart-period").textContent = `· past ${range} days`;
    dialogContent.querySelectorAll(".range-button").forEach(button => button.classList.toggle("selected", button === rangeButton));
  }).catch(error => showError("Could not change the price-history range.", error));
});
dialogContent.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("#gallery-main-photo")) {
    event.preventDefault();
    openPhotoLightbox();
  }
});
dialogContent.addEventListener("submit", event => {
  if (event.target.id !== "alert-form") return;
  event.preventDefault();
  const form = event.target;
  const input = form.elements.targetPrice;
  input.setCustomValidity("");
  const targetPrice = usdFromDisplayCurrency(Number(input.value));
  if (!Number.isFinite(targetPrice) || targetPrice <= 0) {
    input.setCustomValidity("Enter a price greater than zero.");
    form.reportValidity();
    return;
  }
  saveAlert(form.dataset.alertProduct, targetPrice).then(() => {
    showToast("Price target saved on this device. Live alert checks are not connected.");
  }).catch(error => showError("Could not save your price target.", error));
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
  applyTheme(await readSetting("theme") || "light");
  const savedCurrency = await readSetting("currency");
  setCurrency(savedCurrency || "USD");
  renderCategories();
  renderWatchlistPanel();
  renderCatalog();
  updatePriceControls();
  if (priceApiBase) refreshLivePriceData();
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

currencySelect.addEventListener("change", async () => {
  const previousCurrency = displayCurrency;
  const selected = currencySelect.value;
  try {
    await saveSetting("currency", selected);
    setCurrency(selected);
    await renderCatalog();
    const detail = dialogContent.querySelector(".detail-content");
    if (!dialog.hidden && detail) await openProduct(detail.dataset.productId);
    showToast(`Prices now shown in ${CURRENCY_NAMES[selected]} using a fixed demo rate.`);
  } catch (error) {
    setCurrency(previousCurrency);
    showError("Could not change the display currency.", error);
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
