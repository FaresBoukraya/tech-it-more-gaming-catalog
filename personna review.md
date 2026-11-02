# Tech It More — persona and website review

**Review date:** 2026-11-02

## Audience persona

**Primary audience:** A gamer comparing gear before buying, usually on a phone, who wants a short and candid explanation rather than a full lab review. They may know the category but need help understanding trade-offs, compatibility, and which retailer to check.

**Typical needs**

- Compare products by category, brand, connection type, and rough price tier.
- Quickly understand who a product suits, its main drawback, and when to skip it.
- Find retailer searches for the United States, United Kingdom, Canada, or Europe.
- Save or compare a few options without creating an account.
- Trust that prices and stock are not invented or presented as live data.

**Secondary audience:** A more experienced PC or console player checking specs, compatibility, or alternatives before replacing or upgrading equipment.

**Product fit:** The independent, no-account catalog and plain-language verdicts fit these needs well. The clearest opportunity is to make the shortlisting workflow and the language coverage feel equally complete on every page.

## Review scope and limits

The repository contains 127 tracked files, including 62 HTML pages. I reviewed the shared application, stylesheet, data and page-generation flow, service worker, hosting headers, and representative generated product/category pages. I also ran the generator's consistency check across its outputs. This is not a live-browser/Lighthouse run, a click-through of every external retailer URL, or a formal security audit.

## Findings

| Priority | Finding | Status |
|---|---|---|
| Medium | The local English/French/Arabic/Spanish selector translates shared interface text and common labels, but product-specific summaries, verdicts, specifications, guide prose, and SEO metadata remain English. This does not yet meet a full-content translation scope or provide indexable localized URLs. | Open |
| Fixed | When offline, navigating to a page that had not been cached returned the home page under the requested URL. That could show unrelated content and confuse visitors. | Fixed: unvisited offline navigations now show a dedicated offline notice. |
| Fixed | Opening a Corsair product probed nine candidate gallery images concurrently, despite only needing a few additional photos. | Fixed: the probe is capped at four candidates. |
| Fixed | The versioned language script was missing the immutable cache rule used by the other versioned assets. | Fixed: `/language.js` now receives the same one-year immutable cache policy. |
| Low | Product images are served directly from manufacturers. The site already lazy-loads catalog images and reserves card-image space, but image payload sizes depend on each remote host. | Monitor; use permitted, optimized local copies where practical. |

No blocking defect was found in the shared application or generated-page consistency check. External image availability and retailer links can still change independently of this repository.

## Performance and reliability

### Improvements in this change

- Reduced Corsair gallery image probes from nine concurrent requests to four, a maximum reduction of five candidate requests per gallery lookup.
- Added the versioned language script to the one-year immutable caching rules, matching the rest of the versioned application assets.
- Added a cached offline notice rather than serving the home page for an uncached offline route.
- Kept translations local and opt-in; the language feature does not add a translation-provider request.
- Included the language script in generated asset hashes and the service-worker shell so deployments and offline visits receive the same version.

### Existing strengths

- The catalog renders a smaller initial set on phones and supports loading more products.
- Product-card images use lazy loading; only the first few visible images are promoted.
- The stylesheet already uses content visibility for long-page sections, and repeat visits use a service worker.
- Product/category pages are statically generated, avoiding a runtime server dependency.

### Recommended next steps

1. Complete and review French, Arabic, and Spanish translations for product summaries/verdicts, category tips, FAQs, and buying-guide prose. Keep model names and technical standards intact where translating them would reduce clarity. Consider localized static routes and metadata if search indexing in each language is important.
2. Measure representative mobile pages with Lighthouse or WebPageTest before making further performance changes; no score or Core Web Vitals result was measured in this review.
3. Consider locally hosting optimized product images only when the image license/source permits it.
4. Add browser-level smoke tests for language persistence, right-to-left layout, offline navigation, and product interactions.

## Validation

- `node scripts/build.mjs` — passed; regenerated 52 product pages, 7 category pages, and shared generated assets.
- `node scripts/build.mjs --check` — passed; generated files are current.
- `node --check language.js`, `node --check scripts/build.mjs`, and `node --check app.js` — passed.
- Local language-switch smoke test — passed for French, Spanish, Arabic direction, returning to English, and saved preference.
- Internal relative-reference audit — passed; 63 HTML pages checked with no missing local links, scripts, images, or fallbacks.
- Versioned language asset cache-rule check — passed.
- Browser performance profiling and live external-link checks — not run.
