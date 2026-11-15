# Tests

Browser tests and audits for the built site. They open the pages in headless Chromium at phone and desktop sizes, click through the real interface, and check layout, contrast and links.

```
npm run build                              # the tests read the built files
pip install playwright && playwright install chromium
npm test                                   # or: python3 tests/run.py
```

| File | Covers |
|---|---|
| `catalog.py` | search, filters, categories, save, compare, theme, languages, product view |
| `saved_compare.py` | Saved and Compare from inside a product and from the static pages |
| `states.py` | dialogs, Escape, scroll lock, empty states, FAQ, keyboard shortcut, Arabic |
| `mobile_nav.py` | phone top bar and menu: icons, menu, search, language and theme, pinned bar |
| `product_actions.py` | Buy / Save / Compare visible and tappable on five phone sizes |
| `links.py` | every local link and asset resolves; no sideways scroll |
| `a11y.py` | text contrast in light and dark, headings, labels, alt text |
| `layout_sweep.py` | no sideways scroll from 320 to 768 px on every page |

Product photos load from other companies' servers, so they do not load in these tests. The tests do not depend on them.

A few tests use real product ids (`razer-deathadder-v3`, `razer-huntsman-v3-pro`). If you rename or remove those products, update the ids in the tests.
