# Fonts

The font is self-hosted (no Google Fonts requests) and licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/).

| Font | Used for | Files | Source |
|---|---|---|---|
| **Carlito** | All text, including headings and the logo | `carlito-regular.woff`, `carlito-bold.woff` | Copyright 2013 The Carlito Project Authors, https://github.com/googlefonts/carlito |

Both files are Latin subsets. They were subset from the TrueType originals with fontTools (`pyftsubset`), keeping Latin, punctuation, arrows and the inch mark (″).

The font files are served with long-lived caching (see `_headers`), so if you replace one, rename it too.
