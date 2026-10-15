

https://github.com/user-attachments/assets/8ae8f166-75e0-4b03-b687-7e0bb9d67245

# 🎮 Tech It More

**Find gaming gear worth buying, then jump straight to the store.**

Tech It More is a fast, friendly catalog of **253 gaming products** across 9 categories: consoles, controllers, keyboards, mice, headsets, monitors, laptops, PCs and parts. Pick a product, and it opens ready-made searches at the major US retailers. There are no accounts, no checkout, and no backend, just a static site that loads instantly.

> Tech It More doesn't sell anything and doesn't show prices, currency, sales or stock. Each store link opens that retailer's own search page, and that page is where you see the real price.

---

## ✨ Highlights

| | What you get |
|---|---|
| 🔎 **Instant search** | Live suggestions as you type, with arrow-key and Enter support. Search by brand, model or product type ("razer mouse" works). |
| 🧭 **Category tiles** | Nine color-coded tiles with icons and product counts. One click filters the whole catalog. |
| 🏷️ **Brand and wireless filters** | A brand menu that only lists brands in the current category, plus a one-tap "Wireless only" toggle. |
| ❤️ **Saved list** | Tap the heart on any product. Everything stays in your browser. |
| 🔗 **Shareable everything** | Filters live in the address bar, and **Copy link to saved list** gives friends a link to your picks, with a button to save them all. |
| 🕘 **Recently viewed** | The last eight products you opened, one tap away. |
| 🎲 **Surprise me** | Opens a random product from whatever you're currently browsing. |
| 🌗 **Light and dark themes** | Follows your system setting and remembers your choice. |
| 📱 **Works everywhere** | Responsive from phones to wide desktops, with visible keyboard focus and reduced-motion support. |

## ⌨️ Keyboard shortcuts

| Keys | Action |
|---|---|
| `/` or `Ctrl`/`⌘` + `K` | Jump to search from anywhere |
| `↑` `↓` then `Enter` | Pick a search suggestion |
| `Esc` | Close suggestions, clear the search, or close a product |

## 🗂️ What's in the box

```
index.html              the page
site.css                the one stylesheet: logo, header, hero, category tiles, cards, filters, product dialog, photo gallery, footer, dark theme
app.js                  all behavior: search, filters, saved list, sharing, local database
gaming-products.js      the main product list (data only, no prices)
catalog-products.js     a few extra products (data only)
_headers                security headers for Cloudflare Pages
tiles/, favicon.svg     artwork
robots.txt, sitemap.xml search-engine files
```

## 🚀 Run it locally

There is no install and no build step. Serve the folder with any static server and open the address it prints:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

You need an internet connection for product photos and for the retailer links to open.

## 🌍 Put it online for free

Cloudflare Pages can host this at a free `*.pages.dev` address over HTTPS, with no domain purchase needed.

1. Create a GitHub repository (private is fine) and upload everything in this folder.
2. In Cloudflare, go to **Workers & Pages → Create application → Pages → Connect to Git** and pick the repository.
3. Choose **no framework preset**, leave the build command empty (or use `exit 0`), and set the build output directory to `.`.
4. Keep `_headers` next to `index.html` at the repository root.

Cloudflare redeploys automatically whenever the repository changes.

## 🧱 Editing the catalog

Products are plain objects in `gaming-products.js` (and `catalog-products.js`). A product looks like this:

```js
{ id: "tim-example-product", brand: "LOGITECH G", name: "Example Gaming Mouse",
  category: "Mice", icon: "◉", art: "art-mouse",
  imageUrl: "", specs: "Wireless · 25,000 DPI",
  productSource: "https://example.com/product" }
```

- **No prices.** The data holds no price fields, and the site would ignore them anyway.
- **Photos are optional.** Leave `imageUrl` empty and the card shows a color-coded category icon.
- **Store links come from the brand.** Add or adjust a brand's retailers in `BRAND_RETAILER_STORES` inside `app.js`. Older or uncommon products fall back to Amazon and eBay searches.
- **Specs are never guessed.** If a source doesn't list specs, the product page says so.

Two housekeeping steps after changing files:

- **Bump the cache tag.** Change the `?v=` number on the `.css` and `.js` files in `index.html` so returning visitors load the new files.
- **Remove products cleanly.** Change the `shopping-gateway-v2` catalog marker in `app.js` (it appears twice) so browsers that already stored the old catalog clean themselves up on the next visit.

## 🔒 Privacy and security

- **Everything stays in the browser.** Your saved list, recently viewed products and theme live in this browser's IndexedDB (`techscout-preview`). Nothing is uploaded, and clearing browser data clears them. **Export my data** in the footer saves a JSON copy.
- **Strict security headers.** `_headers` sets a Content Security Policy, forces HTTPS, blocks clickjacking and MIME sniffing, uses a restrictive referrer policy, and switches off unused browser permissions. The policy allows only the Wikimedia Commons API for extra-photo lookups. These headers apply on hosts like Cloudflare Pages, not when you open the files straight from your computer.
- **No secrets in the code.** There is no server, no payments and no accounts. Never put API keys in this public code.
- **Review third-party links before launch.** Store, image and photo-source links point to other websites.

## 🔧 Under the hood

- **Plain HTML, CSS and JavaScript.** No framework, no bundler, no dependencies.
- **Fast first paint.** Cards render 36 at a time with lazy-loaded images.
- **Your data doubles as a local database.** On load, the product list is stored in IndexedDB. Legacy price tables from earlier versions are kept empty so existing browsers upgrade smoothly.
- **Product pages** open in a full-screen layout. Browser Back closes them and Forward reopens them. Extra photos come from official Corsair images and Wikimedia Commons (with source and license links), and the main photo opens in a full-screen viewer.

## ⚠️ Good to know

- Store links search by brand and model. They can't confirm that a store carries an item or has it in stock.
- Most products currently show a category icon instead of a photo, because no official photo has been added for them yet.
- Gear that is 10 or more years old has been removed from the catalog.

---

*© 2026 Tech It More. Not affiliated with the brands or stores shown; names and photos belong to their owners.*
