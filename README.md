<div align="center">

# Tech It More

**Find gaming gear worth buying, then jump straight to the store.**

An independent, no-accounts catalog of gaming gear with a short, plain verdict on every product.
Static site. No backend. No dependencies.

[**Live site**](https://tech-it-more-gaming-catalog.pages.dev) · [How we choose](https://tech-it-more-gaming-catalog.pages.dev/how-we-choose/) · [Report a bug](../../issues/new?template=bug_report.md) · [Suggest a product](../../issues/new?template=feature_request.md)

</div>

> Tech It More doesn't sell anything and doesn't quote prices, sales or stock. Every store link opens that retailer's own search page, and that page is where you see the real price.

---

## What it is

Pick a product and you get its specs, a photo, and a verdict in three lines: **best for**, **the catch**, and **skip it if**. Each product also shows a rough price tier (Budget, Mid-range, Premium) and up to three alternatives. Then one tap opens ready-made searches at US retailers such as Amazon, Best Buy, Newegg, Micro Center, Walmart, Target, GameStop and eBay, or at the manufacturer's own store. Shopping from the UK, Canada or Europe? A region switch on each product swaps in local retailers.

These are buying notes, not tested reviews. See [How we choose](https://tech-it-more-gaming-catalog.pages.dev/how-we-choose/) for exactly what goes into a verdict and what doesn't.

**Current catalog:** 52 published products across 7 categories: Consoles & handhelds, Controllers, Keyboards, Mice, Headsets, Streaming & audio, and PC hardware. A product is only published once it has specs, a photo and a verdict. Thinner entries wait in `data/backlog.json`.

## Features

| | |
|---|---|
| **Phone-friendly search** | On phones the search bar stays pinned while you scroll. Tapping an empty search box offers category and brand shortcuts, a category rail sits above the results, and cards are compact (heart and compare in a slim column, the catch as a two-line teaser). The hero steps aside once you search or pick a category. |
| **Instant search** | Live suggestions as you type, with arrow-key and Enter support. Works by brand, model or product type ("razer mouse"). |
| **Category tiles** | Color-coded tiles with product counts. One click filters the catalog. |
| **Quick filters** | One-tap price tier (Budget, Mid-range, Premium) and connection (Wireless, Wired) chips above the results, each with a live count. The same filters are in the side panel, along with a brand menu and sort options. |
| **Spec highlights** | Each card shows the few numbers buyers compare first (weight, sensor, battery, polling rate, switch type, storage and so on), picked from the spec line. |
| **Store regions** | Switch a product's store list between United States, United Kingdom, Canada and Europe. The choice is remembered in this browser. Static product pages list every region in a collapsed section. |
| **Saved list** | Tap the heart on any product. It stays in your browser. |
| **Shareable** | Filters live in the address bar. **Copy link to saved list** gives a friend your picks, with a button to save them all. |
| **Recently viewed** | The last eight products you opened. |
| **Surprise me** | Opens a random product from whatever you're currently browsing. |
| **Light and dark themes** | Follows your system setting and remembers your choice. |
| **Accessible** | Responsive from phones to wide desktops, skip link, visible keyboard focus, reduced-motion support. |
| **Crawlable** | A static page for every product and category, with structured data. |

### Keyboard shortcuts

| Keys | Action |
|---|---|
| `/` or `Ctrl`/`⌘` + `K` | Jump to search |
| `↑` `↓` then `Enter` | Pick a search suggestion |
| `Esc` | Close suggestions, clear the search, or close a product |
| `←` `→` | Move through photos in the full-screen viewer |

## Quick start

You need **Node 18+** only to rebuild the generated files. There is nothing to install.

```bash
npm run build                 # regenerate products.js, product and category pages, sitemap
python3 -m http.server 8000   # then open http://localhost:8000
```

| Command | What it does |
|---|---|
| `npm run build` | Regenerates everything derived from `data/` |
| `npm run check` | Fails if generated files are stale. Run it before committing. |
| `npm run images` | Optional: downloads product photos so you can host them yourself |

## Project layout

```
data/
  products.json        THE catalog. The main file you edit
  backlog.json         entries not yet complete enough to publish
  categories.json      category labels, intros and buying tips
  stores.json          US retailer search URLs and which stores each brand/category uses
  regions.json         UK, Canada and Europe retailers and which ones each kind of product shows
  brands.json          display names for brands written in capitals
  site.json            contact email and optional Discord link
  missing-data.csv     GENERATED: what still needs a photo or specs

scripts/
  build.mjs            builds all generated files (no dependencies)
  fetch-images.mjs     optional photo downloader

index.html             the app page (some blocks inside are generated)
site.css, app.js       styles and behavior
theme-init.js          applies the saved theme before first paint
how-we-choose/         methodology page
products.js            GENERATED: the data the app loads
p/<id>/index.html      GENERATED: one page per product
c/<slug>/index.html    GENERATED: one buying guide per category
sitemap.xml            GENERATED

_headers, _redirects, robots.txt   hosting config (security headers, old-URL redirects, crawlers)
tiles/, fonts/, favicon.svg, og-image.png   artwork and self-hosted fonts
```

Never edit files marked GENERATED by hand. Change the data, run `npm run build`, and commit the result.

## Editing the catalog

A published product needs `id`, `brand`, `name`, `category`, `specs` and `imageUrl`, plus a summary, a verdict and alternatives:

```json
{
  "id": "razer-deathadder-v3",
  "brand": "RAZER",
  "name": "DeathAdder V3 Pro Wireless Mouse",
  "category": "Mice",
  "specs": "Ergonomic wireless · 30K sensor · Up to 90-hour battery",
  "imageUrl": "https://assets2.razerzone.com/images/…/razer-deathadder-v3-og.jpg",
  "imageSource": "https://www.razer.com/gaming-mice/razer-deathadder-v3-pro",
  "summary": "Nine words or fewer, shown on the card",
  "verdict": {
    "bestFor": "…",
    "downside": "…",
    "skipIf": "… (finishes the sentence \"Skip it if …\")",
    "tier": "Premium"
  },
  "alts": [{ "id": "another-product-id", "why": "Short reason" }]
}
```

Rules that keep the catalog trustworthy:

- **`category` must match a label in `data/categories.json`.** It is used exactly as written.
- **No prices, currency, sales or stock.** The data has no price fields on purpose.
- **Never guess specs.** If the manufacturer doesn't list it, leave it out.
- **`alts`** are up to three products in the same category.
- **`checked`** (`YYYY-MM-DD`) is optional. Add it only after comparing the entry with the manufacturer's page. Without it, the product shows "Not yet re-checked".
- **Photo hosts must be allow-listed.** Add the host to `img-src` in `_headers`, or `npm run build` fails.
- **Only popular gear less than 10 years old.**
- **Incomplete entries go in `data/backlog.json`.** Move one across once it has specs, a photo and a verdict. The build validates it.
- **Removing a product?** Add a redirect to its category in `_redirects` so old links don't break.

**Store links** come from `brandStores` in `data/stores.json`, falling back to `categoryStores`. To add a retailer, list it under `stores` with its search URL and query parameter. Cache busting is automatic: the build puts a content hash on the CSS and JS URLs.

**Other regions:** `data/regions.json` lists each region's stores (search URL, query parameter, short hint) and `byGroup`, which picks the stores for consoles and controllers, peripherals, or PC hardware. Brand official stores stay US-only. The build checks that every store named exists.

**Footer links:** `data/site.json` holds `contactEmail` and `discordUrl` (leave it empty to hide the Discord button). Every page gets the same simple "Email us" button, and it fills in the page name and address so messages arrive with context. `mail.js` is a small safety net: if clicking an email link opens no mail app, it copies the address and says so.

### Hosting product photos yourself

Photos currently load from the manufacturers' own sites, which can change at any time. To host copies instead (only for images you're allowed to use, such as press-kit images):

```bash
npm run images                 # downloads into assets/products/<id>.<ext>
npm i -D sharp && npm run images   # optional: also resizes to 800px WebP
npm run build                  # the build prefers a local file when one exists
```

Once everything is local, tighten `img-src` in `_headers` to `'self'`.

## Deploy for free

Cloudflare Pages hosts this on a free `*.pages.dev` address over HTTPS.

1. Push this folder to a GitHub repository.
2. In Cloudflare, go to **Workers & Pages → Create application → Pages → Connect to Git** and choose the repo.
3. Pick **no framework preset**, leave the build command empty, and set the output directory to `.`. The generated files are committed, so Cloudflare just serves them.
4. Keep `_headers` and `_redirects` at the repository root, next to `index.html`.

Every push to `main` redeploys automatically.

## Privacy and security

- **Everything stays in your browser.** Your saved list, recently viewed products and theme live in localStorage (keys start with `tim:`). Nothing is uploaded. **Export my data** in the footer saves a JSON copy.
- **Strict headers.** `_headers` sets a Content Security Policy with no inline scripts or styles, forces HTTPS, blocks clickjacking and MIME sniffing, and switches off unused browser permissions. These apply on hosts like Cloudflare Pages, not when opening files straight from disk.
- **No secrets.** There is no server, payment flow or account system. Never put API keys in this public code.
- **Found a vulnerability?** Please follow [SECURITY.md](SECURITY.md) rather than opening a public issue.

## Under the hood

- Plain HTML, CSS and JavaScript. No framework, no bundler, no dependencies.
- Self-hosted fonts (Carlito and Lora), so no third-party font requests. See [fonts/FONTS.md](fonts/FONTS.md).
- Cards render 36 at a time with lazy-loaded images.
- Product pages open full-screen. Browser Back closes them and Forward reopens them.

## Good to know

- Store links search by brand and model. They can't confirm a store carries an item or has it in stock.
- Verdicts are buying notes, not lab tests, and products get replaced over time.
- Gear that is 10 or more years old is not listed.

## Contributing

Contributions are welcome: bug reports, product suggestions, accessibility and speed fixes. Read [CONTRIBUTING.md](CONTRIBUTING.md) first, and please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 2026 Fares. Tech It More is not affiliated with the brands or stores shown; names and photos belong to their owners.
