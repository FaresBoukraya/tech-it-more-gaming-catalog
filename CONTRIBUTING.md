# Contributing to Tech It More

Thanks for wanting to help! Tech It More is a small static website (plain HTML, CSS and JavaScript), so contributing is simple.

## Ways to help

- Report a bug or broken store link by opening an issue
- Suggest a product that should be in the catalog
- Improve the design, accessibility or speed
- Fix typos or improve the README

For anything big, please open an issue first so we can agree on the idea before you spend time on it.

## Run the site locally

There is no install. To rebuild the generated files you need Node 18+:

    npm run build
    python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

## Adding or editing products

Products live in `data/products.json`. A product looks like this:

    { "id": "logitech-example-mouse", "brand": "LOGITECH G", "name": "Example Gaming Mouse",
      "category": "Mice", "specs": "Wireless · 25,000 DPI" }

Please follow these rules:

- **No prices, currency, sales or stock information.**
- **Only popular gear that is less than 10 years old.**
- **Don't guess specs.** If a source doesn't list them, leave them out.
- **Photos are optional.** Leave out `imageUrl` unless you have a photo you're allowed to use, and fill in `imageSource` and `imageCreator` when you add one.

## After changing files

Run `npm run build` and commit the generated files together with your change. `npm run check` tells you if anything is stale.

## Submitting a pull request

1. Fork the repository and create a branch for your change.
2. Make your change and test it locally on mobile and desktop, in light and dark themes.
3. Open a pull request and fill in the template.

## Security

Never commit API keys, passwords or personal data. To report a security problem, follow the steps in [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Code of conduct

By taking part, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Adding or editing a product (data/products.json)

Every published product needs: `id`, `brand`, `name`, `category`, `specs`, `imageUrl`, and:

- `summary`: 9 words or fewer, shown on the card.
- `verdict.bestFor`, `verdict.downside`, `verdict.skipIf` (finishes "Skip it if ..."), `verdict.tier` (Budget, Mid-range or Premium).
- `alts`: up to three `{ "id": "...", "why": "..." }` in the same category, each with a short reason.
- `checked` (optional, `YYYY-MM-DD`): set it only after comparing the entry with the manufacturer's page. It shows as "Last checked".

The photo's host must also be listed in `img-src` in `_headers`; `npm run build` fails if it is not.
