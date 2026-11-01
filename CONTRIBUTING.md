# Contributing to Tech It More

Thanks for helping! This is a small static site (plain HTML, CSS and JavaScript), so contributing is simple.

## Ways to help

- Report a bug or a broken store link
- Suggest a product for the catalog
- Improve design, accessibility or speed
- Fix typos or improve the docs

For anything big, open an issue first so we can agree on the idea before you spend time on it.

## Run it locally

You need Node 18+ to rebuild the generated files. There is nothing to install.

```bash
npm run build
python3 -m http.server 8000
```

Open http://localhost:8000. Use a server rather than opening the file directly, so the service worker and fonts behave as they do online.

## Adding or editing products

Products live in `data/products.json`. The [README](README.md) has a full example. The rules:

**Every published product needs**

- `id`, `brand`, `name`, `category`, `specs`, `imageUrl`
- `summary`: 9 words or fewer, shown on the card
- `verdict.bestFor`, `verdict.downside`, `verdict.skipIf` (finishes "Skip it if ...") and `verdict.tier` (Budget, Mid-range or Premium)
- `alts`: up to three `{ "id": "...", "why": "..." }` in the same category, each with a short reason
- `imageSource` (and `imageCreator` where a license needs credit) for every photo

**Always**

- No prices, currency, sales or stock information.
- Only popular gear less than 10 years old.
- Don't guess specs. If the source doesn't list them, leave them out.
- `category` must match a label in `data/categories.json`.
- `checked` (`YYYY-MM-DD`) is optional. Set it only after comparing with the manufacturer's page.
- Photo hosts must be listed in `img-src` in `_headers`. `npm run build` fails if one isn't.
- Not complete yet? Put it in `data/backlog.json`.

## Before you open a pull request

1. Fork the repository and create a branch.
2. Make your change.
3. Run `npm run build`, then `npm run check`, and commit the generated files with your change.
4. Test on a phone-sized screen and on desktop, in light and dark themes. On a phone, check the bottom bar, the filters sheet, a product sheet and Compare.
5. Open a pull request and fill in the template.

## Don't edit generated files

`products.js`, `sw.js`, `sitemap.xml`, `p/` and `c/` are produced by `scripts/build.mjs`. Change the data or the script, then rebuild.

## Security

Never commit API keys, passwords or personal data. To report a security problem, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Code of conduct

By taking part, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
