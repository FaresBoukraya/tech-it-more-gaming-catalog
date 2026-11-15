# Fonts

The font is self-hosted, so the site makes no Google Fonts requests. Both are licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/).

| Font | Used for | Files | Source |
|---|---|---|---|
| **Carlito** | All text, including headings and the logo | `carlito-regular.woff`, `carlito-bold.woff` | Copyright 2013 The Carlito Project Authors, https://github.com/googlefonts/carlito |

Both files are Latin subsets. They were subset from the TrueType originals with fontTools (`pyftsubset`), keeping Latin, punctuation, arrows and the inch mark (″).

Fonts are cached for a long time (see `_headers`) and are saved by the service worker. If you replace one, give the new file a new name, and add it to the shell list in `scripts/build.mjs` if the page uses it on first load.
