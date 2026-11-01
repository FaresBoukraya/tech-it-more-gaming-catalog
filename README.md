<div align="center">

# Tech It More

**Find gaming gear worth buying, then jump straight to the store.**

An independent, no-accounts catalog of gaming gear with a short, plain verdict on every product.
Static site. No backend. No dependencies.

[**Live site**](https://tech-it-more-gaming-catalog.pages.dev) · [How we choose](https://tech-it-more-gaming-catalog.pages.dev/how-we-choose/) · [Report a bug](../../issues/new?template=bug_report.md) · [Suggest a product](../../issues/new?template=feature_request.md)

</div>

> Tech It More sells nothing and quotes no prices, sales or stock. Every store link opens that retailer's own search page, and that page is where you see the real price.

---

## What it is

Open a product to see its specs, a photo and a three-line verdict: **best for**, **the catch** and **skip it if**. Each product also gets a rough price tier (Budget, Mid-range, Premium) and up to three alternatives. These are buying notes, not lab reviews. [How we choose](https://tech-it-more-gaming-catalog.pages.dev/how-we-choose/) explains what goes into a verdict.

**Today:** 52 products in 7 categories (Consoles & handhelds, Controllers, Keyboards, Mice, Headsets, Streaming & audio, PC hardware). A product is only published once it has specs, a photo and a verdict.

## Features

**Finding things**
- **Search** by brand, model or type ("razer mouse"), with live suggestions.
- **Command menu** (`Ctrl`/`⌘` + `K`): products, categories and actions in one box.
- **Filters:** category tiles, price tier, wireless or wired, brand and sort. They live in the address bar, so a filtered view can be shared.
- **Saved list:** tap the heart. It stays in your browser, can be shared by link, and every removal can be undone.
- **Compare:** tick up to three products and see them side by side.
- **Store regions:** United States, United Kingdom, Canada and Europe. The choice is remembered.
- **Recently viewed** and **Surprise me**.

**On a phone**
- A bottom bar with **Browse, Search, Saved, Compare and Guides**. Compare shows a live count.
- The search bar opens when you tap Search and closes again when left empty.
- Sheets (product, filters, compare) can be dragged down to close, and the Back gesture closes them instead of leaving the page.
- The comparison fits the screen with no sideways scrolling.

**Speed and reliability**
- Skeleton rows while the list loads, photos that fade in, and saving that responds instantly.
- Repeat visits load from a saved copy and refresh quietly in the background. Visited pages also work offline (service worker, HTTPS only).
- The next page is prepared as you reach for it (Speculation Rules) and pages cross-fade in browsers that support it.
- Phones start with 16 products and add more on request. Desktop starts with 36.

**Other**
- Light and dark themes, following the system setting.
- Accessible: skip link, visible keyboard focus, reduced-motion support, 44 px touch targets.
- Crawlable: a static page for every product and category, with structured data and a sitemap.

### Keyboard shortcuts

| Keys | Action |
|---|---|
| `/` | Focus search |
| `Ctrl`/`⌘` + `K` | Command menu |
| `T` | Switch theme |
| `C` | Open the comparison (two or more ticked) |
| `↑` `↓` then `Enter` | Pick a suggestion or menu row |
| `Esc` | Close suggestions, the menu or a sheet |
| `←` `→` | Move through photos in the full-screen viewer |

## Quick start

You only need **Node 18+** to rebuild the generated files. There is nothing to install.

```bash
npm run build                 # regenerate everything derived from data/
python3 -m http.server 8000   # then open http://localhost:8000
```

| Command | What it does |
|---|---|
| `npm run build` | Regenerates products.js, product and category pages, the sitemap and sw.js |
| `npm run check` | Fails if a generated file is stale. Run it before committing. |
| `npm run images` | Optional: downloads product photos so you can host them yourself |

The service worker only registers on HTTPS (or localhost), so open the site through a server, not from a folder, to see it.

## Project layout

```
data/
  products.json        THE catalog. The main file you edit
  backlog.json         entries not yet complete enough to publish
  categories.json      category labels, intros and buying tips
  stores.json          US retailer search URLs and which stores each brand/category uses
  regions.json         UK, Canada and Europe retailers
  brands.json          display names for brands written in capitals
  site.json            contact email, Discord link, Meta verification code
  missing-data.csv     GENERATED: what still needs a photo or specs

scripts/
  build.mjs            builds every generated file (no dependencies)
  fetch-images.mjs     optional photo downloader

index.html             the app page (some blocks inside are generated)
site.css, app.js       styles and behavior
theme-init.js          applies the saved theme before first paint
mail.js                the "Email us" buttons
how-we-choose/         methodology page
products.js            GENERATED: the data the app loads
p/<id>/index.html      GENERATED: one page per product
c/<slug>/index.html    GENERATED: one buying guide per category
sitemap.xml, sw.js     GENERATED

speculation-rules.json   which pages the browser may prepare in advance
_headers, _redirects, robots.txt   hosting config (security headers, old-URL redirects, crawlers)
googlee2df556a608b5016.html        Google Search Console ownership file (keep it)
tiles/, fonts/, favicon.svg, favicon-48.png, apple-touch-icon.png, icon-192.png, og-image.png
```

Never edit a file marked GENERATED by hand. Change the data, run `npm run build`, and commit the result.

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

- **`category` must match a label in `data/categories.json`.**
- **No prices, currency, sales or stock.** The data has no price fields on purpose.
- **Never guess specs.** If the manufacturer doesn't list it, leave it out.
- **`alts`** are up to three products from the same category.
- **`checked`** (`YYYY-MM-DD`) is optional. Add it only after comparing the entry with the manufacturer's page. Without it, the product shows "Not yet re-checked".
- **`blurhash`** is optional. A [BlurHash](https://blurha.sh) string shows a soft color preview while the photo loads.
- **Photo hosts must be allow-listed.** Add the host to `img-src` in `_headers`, or `npm run build` fails.
- **Only popular gear less than 10 years old.**
- **Incomplete entries go in `data/backlog.json`.** Move one across once it has specs, a photo and a verdict.
- **Removing a product?** Add a redirect to its category in `_redirects` so old links keep working.

**Store links** come from `brandStores` in `data/stores.json`, falling back to `categoryStores`. To add a retailer, list it under `stores` with its search URL and query parameter. **Other regions** are set up in `data/regions.json` the same way.

**`data/site.json`** holds `contactEmail`, `discordUrl` (empty hides the button), `metaDomainVerification` (the code from Meta Business Suite, emitted as a meta tag on every page when set).

### Hosting product photos yourself

Photos currently load from the manufacturers' own sites, which can change at any time. To host copies instead (only images you are allowed to use, such as press-kit images):

```bash
npm run images                     # downloads into assets/products/<id>.<ext>
npm i -D sharp && npm run images   # optional: also resizes to 800px WebP
npm run build                      # the build prefers a local file when one exists
```

Once everything is local, tighten `img-src` in `_headers` to `'self'`.

## Deploy for free

Cloudflare Pages serves this on a free `*.pages.dev` address over HTTPS.

1. Push this folder to a GitHub repository.
2. In Cloudflare: **Workers & Pages → Create application → Pages → Connect to Git**, and choose the repo.
3. Pick **no framework preset**, leave the build command empty, and set the output directory to `.`. The generated files are committed, so Cloudflare just serves them.
4. Keep `_headers` and `_redirects` at the repository root next to `index.html`.

Every push to `main` redeploys. After the first deploy:

- In Google Search Console, add the site (the verification file is already included) and submit `sitemap.xml`.
- Run URL Inspection, then Test live URL, on the home page and a product page.
- Reload the site once and check that the browser's developer tools list a service worker.

If you move to your own domain, change `SITE` at the top of `scripts/build.mjs` and rebuild.

## Privacy and security

- **Everything stays in your browser.** Your saved list, recently viewed products, region and theme live in localStorage (keys start with `tim:`). The service worker keeps copies of pages you opened, under `tim-<version>`. Nothing is uploaded. **Export my data** in the footer saves a JSON copy.
- **Strict headers.** `_headers` sets a Content Security Policy with no inline scripts or styles, forces HTTPS, blocks clickjacking and MIME sniffing, and switches off unused browser permissions.
- **No secrets.** There is no server, payment flow or account system. Never put API keys in this public code.
- **Found a vulnerability?** Follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Under the hood

- Plain HTML, CSS and JavaScript. No framework, no bundler, no dependencies.
- Self-hosted fonts (Carlito and Lora), so no third-party font requests. See [fonts/FONTS.md](fonts/FONTS.md).
- Product pages and category pages are pre-built, so they work without JavaScript.
- Product sheets open full screen. Browser Back closes them and Forward reopens them.

## Good to know

- Store links search by brand and model. They can't confirm a store carries an item or has it in stock.
- Verdicts are buying notes, not lab tests, and products get replaced over time.
- Gear that is 10 or more years old is not listed.

## Contributing

Bug reports, product suggestions, accessibility and speed fixes are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first and follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 2026 Fares. Tech It More is not affiliated with the brands or stores shown. Names and photos belong to their owners.
