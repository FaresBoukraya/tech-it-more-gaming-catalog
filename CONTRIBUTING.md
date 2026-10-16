# Contributing to Tech It More

Thanks for wanting to help! Tech It More is a small static website (plain HTML, CSS and JavaScript), so contributing is simple.

## Ways to help

- Report a bug or broken store link by opening an issue
- Suggest a product that should be in the catalog
- Improve the design, accessibility or speed
- Fix typos or improve the README

For anything big, please open an issue first so we can agree on the idea before you spend time on it.

## Run the site locally

There is no install and no build step:

    python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

## Adding or editing products

Products live in `gaming-products.js` and `catalog-products.js`. A product looks like this:

    { id: "tim-example-product", brand: "LOGITECH G", name: "Example Gaming Mouse",
      category: "Mice", icon: "◉", art: "art-mouse",
      imageUrl: "", specs: "Wireless · 25,000 DPI",
      productSource: "https://example.com/product" }

Please follow these rules:

- **No prices, currency, sales or stock information.**
- **Only popular gear that is less than 10 years old.**
- **Don't guess specs.** If a source doesn't list them, leave them out.
- **Photos are optional.** Leave `imageUrl` empty unless you have a photo you're allowed to use.

## After changing files

- If you changed a `.css` or `.js` file, bump the `?v=` number in `index.html` so returning visitors get the new version.
- If you removed products, change the `shopping-gateway-v2` catalog marker in `app.js` (it appears twice).

## Submitting a pull request

1. Fork the repository and create a branch for your change.
2. Make your change and test it locally on mobile and desktop, in light and dark themes.
3. Open a pull request and fill in the template.

## Security

Never commit API keys, passwords or personal data. To report a security problem, follow the steps in [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Code of conduct

By taking part, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).