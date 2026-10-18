# Fonts

Both fonts are self-hosted (no Google Fonts requests) and licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/).

| Font | Used for | Files | Source |
|---|---|---|---|
| **Carlito** | Body text | `carlito-regular.woff`, `carlito-bold.woff` | Copyright 2013 The Carlito Project Authors, https://github.com/googlefonts/carlito |
| **Lora** | Headings and logo | `lora-latin.woff` | https://fonts.google.com/specimen/Lora |

All files are Latin subsets. The Carlito files were subset from the TrueType originals with fontTools (`pyftsubset`), keeping Latin, punctuation, arrows and the inch mark (″).

The font files are served with long-lived caching (see `_headers`), so if you replace one, rename it too.
