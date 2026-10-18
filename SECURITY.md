# Security Policy

Tech It More is a static website with no accounts, payments, backend or stored user data. Saved lists and preferences stay in each visitor's own browser. Even so, security reports are taken seriously.

## Supported versions

Only the latest version on the `main` branch, which is the live site at https://tech-it-more-gaming-catalog.pages.dev, is supported.

| Version         | Supported |
| --------------- | --------- |
| Latest (`main`) | Yes       |
| Older commits   | No        |

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Report it privately:

1. Open the **Security** tab of this repository.
2. Click **Report a vulnerability**.
3. Describe what you found, how to reproduce it, and the impact you think it has.

Helpful details: the page or file affected, steps or a short proof of concept, and your browser and device.

## What to expect

- Acknowledgement within **7 days**.
- Updates while the report is investigated and fixed.
- Credit once it's fixed, if you'd like it.

## In scope

- Cross-site scripting (XSS) or content injection
- Weaknesses in the security headers or Content Security Policy
- Secrets or private data accidentally committed to the repository
- Broken or malicious outbound links

## Out of scope

- Missing prices, stock or product details (the site leaves them out by design)
- Problems on third-party retailer sites the catalog links to
- Reports that need physical access to someone's device
- Automated scanner output with no demonstrated impact

Thank you for helping keep Tech It More safe.
