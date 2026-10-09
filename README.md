# Tech It More

A compact, browser-only shopping gateway for gaming gear. Open `index.html` in a recent browser; no package installation, build step, retailer API, or backend is needed. Internet access is needed to load product photos and open retailer searches.

## Features

- Search and filter a multiple product gaming catalog by name, category, or watchlist.
- Open product-specific search pages at major US retailers to check current prices, stock, and sale availability on the stores' own sites.
- Browse gaming PCs, handhelds, consoles, monitors, keyboards, mice, headsets, controllers, capture gear, and accessories.
- Open product details with retailer search and video-review links.
- Save products to a local watchlist, switch between light and dark themes, share product links, and export local data as JSON.
- Browse product details in a full-screen layout with a scrollable retailer column on desktop and scrollable details on phones. Browser Back closes an opened product and Forward reopens it. The compact product gallery can autoplay with a pause control; click the main photo for a full-screen viewer that preserves its displayed size and offers a scroll hint for taller photos.

Tech It More is a gateway: it does not fetch or claim to know current prices, sale status, or stock. Store-search links take shoppers to retailer websites to check. No synthetic offers or generated histories are presented as real prices.

Product details show searches for the product's brand store and relevant retailers, rather than unrelated brand stores. Older and uncommon products use marketplace searches. Search terms include the product brand and model; results do not verify current availability or confirm that a store carries the item.

## Local data

The product catalog, watchlist, theme, and preferences are stored in this browser's IndexedDB database (`techscout-preview`, schema version 5). Product and watchlist data stay local to this browser profile; there is no shared or remotely backed-up database.

The local schema includes `products`, `offers`, `priceHistory`, `alerts`, and `settings` stores. On startup, legacy generated offers and histories are cleared so preview data cannot be mistaken for current retailer listings. Products outside the gaming catalog, alerts for removed products, and watchlist entries for removed products are also pruned.

## Catalog and images

The catalog contains 126 gaming products with product photos. Product details keep the original product photo and show available extra views in a selectable thumbnail gallery. Corsair product galleries are checked for additional official images; related Wikimedia Commons photos are also loaded when available, with source and license links. Some products have fewer additional photos available than others. Wikimedia Commons-backed products link to their [Wikidata product records](https://www.wikidata.org/) and Commons file pages.

Product-specific specs are not inferred when the source record does not provide them. Retailer links open store search pages; they do not confirm that a product is in stock.

## Free hosting and security

This is a static, browser-only site, so it can be hosted free without buying a domain. Cloudflare Pages can give it a free `*.pages.dev` address and serve it over HTTPS. To deploy, create a GitHub repository (it can be private), upload the files in this folder, then connect that repository under **Workers & Pages → Create application → Pages → Connect to Git** in Cloudflare. Use no framework preset, leave the build command empty (or use `exit 0`), and set the build output directory to `.`. Keep `_headers` alongside `index.html` at the repository root. Cloudflare will redeploy when the repository changes.

The `_headers` file configures a Content Security Policy, HTTPS upgrades, clickjacking and MIME-sniffing protections, a restrictive referrer policy, and disables unused browser permissions. The policy permits the Wikimedia Commons API for extra-photo lookups. If you later configure a live price API on another host, add only that API's exact HTTPS origin to `connect-src` in `_headers`; do not put API keys or other secrets in this public browser code.

This site has no server, user accounts, payments, or shared database. Watchlists and preferences remain in each visitor's browser, so hosting does not make them public or back them up. Review third-party image and retailer links before launch. `_headers` takes effect on compatible static hosts such as Cloudflare Pages; opening the files directly on your computer does not apply HTTP security headers.

## Feature research

- [Google Shopping: Track product prices](https://support.google.com/googleshopping/answer/13971184?hl=en) documents variant-specific tracking, target prices, and price notifications. Tech It More instead directs shoppers to retailer pages to verify current prices and availability.
- [Keepa's mobile app](https://play.google.com/store/apps/details?id=com.keepa.mobile) and [browser extension](https://chromewebstore.google.com/detail/keepa-amazon-price-tracke/neebplgakaahbhdphmkckjjcegoiijjo) describe interactive history charts, price lows, target-price alerts, and restock alerts; live price tracking is not included in this gateway.
- [Slickdeals' app listing](https://play.google.com/store/apps/details?id=net.slickdeals.android) describes deal alerts and community voting; a community deal feed and voting system are not part of this browser-based gateway.
