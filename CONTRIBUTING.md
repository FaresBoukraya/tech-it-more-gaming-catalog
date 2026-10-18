# Contributing to Tech It More

Thanks for wanting to help! Tech It More is a small static site (plain HTML, CSS and JavaScript), so contributing is simple.

## Ways to help

- Report a bug or a broken store link
- Suggest a product for the catalog
- Improve design, accessibility or speed
- Fix typos or improve the docs

For anything big, please open an issue first so we can agree on the idea before you spend time on it.

## Run it locally

There is no install. You need Node 18+ to rebuild the generated files:

```bash
npm run build
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Adding or editing products

Products live in `data/products.json`. The README has a full example; here are the rules.

**Every published product needs:**

- `id`, `brand`, `name`, `category`, `specs`, `imageUrl`
- `summary`: 9 words or fewer, shown on the card
- `verdict.bestFor`, `verdict.downside`, `verdict.skipIf` (finishes "Skip it if ..."), and `verdict.tier` (Budget, Mid-range or Premium)
- `alts`: up to three `{ "id": "...", "why": "..." }` in the same category, each with a short reason
- `imageSource` (and `imageCreator` where a license needs credit) for every photo

**And always:**

- **No prices, currency, sales or stock information.**
- **Only popular gear less than 10 years old.**
- **Don't guess specs.** If the source doesn't list them, leave them out.
- **`category` must match a label in `data/categories.json`.**
- **`checked`** (`YYYY-MM-DD`) is optional. Set it only after comparing the entry with the manufacturer's page.
- **Photo hosts** must be listed in `img-src` in `_headers`. `npm run build` fails if one isn't.
- **Not complete yet?** Put it in `data/backlog.json`. Only finished entries go in `products.json`.

## After changing files

Run `npm run build` and commit the generated files together with your change. `npm run check` tells you if anything is stale.

## Submitting a pull request

1. Fork the repository and create a branch for your change.
2. Make your change and test it on mobile and desktop, in light and dark themes.
3. Run `npm run build` and `npm run check`.
4. Open a pull request and fill in the template.

## Security

Never commit API keys, passwords or personal data. To report a security problem, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Code of conduct

By taking part, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
