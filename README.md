# Tech It More

**Find gaming gear worth buying, then jump straight to the store.**

Tech It More is a fast, friendly catalog of **253 gaming products** across 9 categories: consoles, controllers, keyboards, mice, headsets, monitors, laptops, PCs and parts. Pick a product, and it opens ready-made searches at the major US retailers. There are no accounts, no checkout, and no backend, just a static site that loads instantly.

> Tech It More doesn't sell anything and doesn't quote prices, sales or stock itself. Each store link opens that retailer's own search page, and that page is where you see the real price.

---

## Highlights

| | What you get |
|---|---|
| **Instant search** | Live suggestions as you type, with arrow-key and Enter support. Search by brand, model or product type ("razer mouse" works). |
| **Category tiles** | Nine color-coded tiles with icons and product counts. One click filters the whole catalog. |
| **Brand and wireless filters** | A brand menu that only lists brands in the current category, plus a one-tap "Wireless only" toggle. |
| **Saved list** | Tap the heart on any product. Everything stays in your browser. |
| **Shareable everything** | Filters live in the address bar, and **Copy link to saved list** gives friends a link to your picks, with a button to save them all. |
| **Recently viewed** | The last eight products you opened, one tap away. |
| **Surprise me** | Opens a random product from whatever you're currently browsing. |
| **Light and dark themes** | Follows your system setting and remembers your choice. |
| **Works everywhere** | Responsive from phones to wide desktops, with visible keyboard focus and reduced-motion support. |

## ⌨Keyboard shortcuts

| Keys | Action |
|---|---|
| `/` or `Ctrl`/`⌘` + `K` | Jump to search from anywhere |
| `↑` `↓` then `Enter` | Pick a search suggestion |
| `Esc` | Close suggestions, clear the search, or close a product |

## What's in the box

```
data/products.json      THE catalog. The only file you edit to add or fix products
data/categories.json    category labels, intros and buying tips (used on the category pages)
data/stores.json        retailer search URLs, plus which stores each brand/category links to
data/brands.json        display names for brands written in capitals
scripts/build.mjs       turns the data into everything below (no dependencies)
scripts/fetch-images.mjs  optional: downloads product photos so you can host them yourself

index.html              the app page (a few blocks inside it are generated)
site.css, app.js        styles and behavior
theme-init.js           applies the saved theme before first paint
products.js             GENERATED: the data the app loads
p/<id>/index.html       GENERATED: one static page per product
c/<slug>/index.html     GENERATED: one buying-guide page per category
sitemap.xml             GENERATED
data/missing-data.csv   GENERATED: products that still need a photo or specs
_headers, robots.txt    security headers and crawler rules
tiles/, favicon.svg, og-image.png   artwork
```

## Run it locally

You only need Node 18+ to rebuild the generated files; there is nothing to install. Serve the folder with any static server:

```bash
npm run build                 # regenerate products.js, product pages, category pages, sitemap
python3 -m http.server 8000   # then visit http://localhost:8000
```

`npm run check` fails if the generated files are out of date (handy before committing).

## Put it online for free

Cloudflare Pages can host this at a free `*.pages.dev` address over HTTPS, with no domain purchase needed.

1. Create a GitHub repository (private is fine) and upload everything in this folder.
2. In Cloudflare, go to **Workers & Pages → Create application → Pages → Connect to Git** and pick the repository.
3. Choose **no framework preset**, leave the build command empty, and set the build output directory to `.`. The generated files are committed, so Cloudflare just serves them.
4. Keep `_headers` next to `index.html` at the repository root.

Cloudflare redeploys automatically whenever the repository changes.

## Editing the catalog

Edit `data/products.json`, run `npm run build`, commit everything. A product looks like this:

```json
{ "id": "logitech-example-mouse", "brand": "LOGITECH G", "name": "Example Gaming Mouse",
  "category": "Mice", "specs": "Wireless · 25,000 DPI",
  "imageUrl": "https://example.com/photo.jpg", "imageSource": "https://example.com/product",
  "imageCreator": "Example official product image" }
```

- **`category` must be one of the labels in `data/categories.json`.** It is used as written; nothing is guessed from the name any more.
- **No prices.** The data holds no price fields. Add `"checked": "YYYY-MM-DD"` only after you have really compared the entry with the manufacturer's page; products without it show "Not yet re-checked".
- **Photos and specs are optional, but they matter.** A product without specs gets a `noindex` page and is left out of the sitemap until specs are added, so thin pages do not hurt the site in search. `data/missing-data.csv` lists what still needs filling in.
- **Never guess specs.** If a source doesn't list them, leave them out.
- **Store links** come from `brandStores` in `data/stores.json`, falling back to `categoryStores`. Add new retailers under `stores` (URL plus the query parameter its search uses).
- **Cache busting is automatic.** The build puts a content hash on the CSS/JS URLs.

### Hosting product photos yourself

Photos are currently loaded from the manufacturers' own sites, which can break at any time. To host copies instead (only for images you are allowed to use, such as press-kit images):

```bash
npm run images                 # downloads into assets/products/<id>.<ext>
npm i -D sharp && npm run images   # optional: also resizes to 800px WebP
npm run build                  # the build prefers a local file when one exists
```

Once everything is local you can tighten `img-src` in `_headers` to `'self'`.

## Privacy and security

- **Everything stays in the browser.** Your saved list, recently viewed products and theme live in this browser's localStorage (keys starting with `tim:`). Lists saved by older versions in IndexedDB are copied across automatically. Nothing is uploaded, and clearing browser data clears them. **Export my data** in the footer saves a JSON copy.
- **Strict security headers.** `_headers` sets a Content Security Policy, forces HTTPS, blocks clickjacking and MIME sniffing, uses a restrictive referrer policy, and switches off unused browser permissions. The policy has no inline scripts or styles, and allows only the Wikimedia Commons API for extra-photo lookups. These headers apply on hosts like Cloudflare Pages, not when you open the files straight from your computer.
- **No secrets in the code.** There is no server, no payments and no accounts. Never put API keys in this public code.
- **Review third-party links before launch.** Store, image and photo-source links point to other websites.

## Under the hood

- **Plain HTML, CSS and JavaScript.** No framework, no bundler, no dependencies.
- **Fast first paint.** Cards render 36 at a time with lazy-loaded images.
- **Static pages for search engines.** Every product and category has its own crawlable page with structured data, and the app links to them. The app itself loads the same data from `products.js`.
- **Product pages** open in a full-screen layout. Browser Back closes them and Forward reopens them. Extra photos come from official Corsair images and Wikimedia Commons (with source and license links), and the main photo opens in a full-screen viewer.

## Good to know

- Store links search by brand and model. They can't confirm that a store carries an item or has it in stock.
- Most products still show a category icon and no specs, because no official photo or spec list has been added for them yet (see `data/missing-data.csv`).
- Gear that is 10 or more years old has been removed from the catalog.

---

*© 2026 Tech It More. Not affiliated with the brands or stores shown; names and photos belong to their owners.*

## Catalog data

Published products live in `data/products.json` and must have specs, a photo and a verdict (best for, the catch, price tier). Anything thinner sits in `data/backlog.json` and is not built into the site. Move an entry across once it is complete; `npm run build` validates it. Old URLs of cut products redirect to their category through `_redirects`.

## Footer links

`data/site.json` holds `discordUrl` (leave it empty to hide the Discord button) and `contactEmail` (used for every mailto link, including the "Suggest a product" buttons on empty results). Edit it and run `npm run build`.
