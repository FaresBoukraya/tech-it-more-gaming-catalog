# Fonts

Both fonts are self-hosted, so the site makes no Google Fonts requests. Both are licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/).

| Font | Used for | Files | Source |
|---|---|---|---|
| **Carlito** | Body text | `carlito-regular.woff`, `carlito-bold.woff` | Copyright 2013 The Carlito Project Authors, https://github.com/googlefonts/carlito |
| **Lora** | Headings and logo | `lora-latin.woff` | https://fonts.google.com/specimen/Lora |

All files are Latin subsets. The Carlito files were subset from the TrueType originals with fontTools (`pyftsubset`), keeping Latin, punctuation, arrows and the inch mark (″).

Fonts are cached for a long time (see `_headers`) and are saved by the service worker. If you replace one, give the new file a new name, and add it to the shell list in `scripts/build.mjs` if the page uses it on first load.
