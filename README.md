# Kit GPSR Vendeurs / GPSR Seller Kit

Free, in-browser helper for small marketplace sellers (Etsy, Vinted Pro, Amazon Handmade, Shopify) who sell consumer products into the EU. It covers the General Product Safety Regulation, **Regulation (EU) 2023/988 (GPSR)**, plus the French **REP/EPR** rules.

- Live, FR: https://outils.vread.fr/kit-gpsr-vendeurs/
- Live, EN: https://outils.vread.fr/kit-gpsr-vendeurs/en/
- Free template pack (ZIP, FR + EN, DOCX + Markdown): see [Releases](https://github.com/VREAD-corp/kit-gpsr-vendeurs/releases/latest).

A product of READ FRANCE SAS.

> **Information tool, not legal advice.** You remain responsible for your products and documents. READ FRANCE SAS never acts as, and does not offer to act as, an EU "responsible person", authorised representative, importer or French EPR agent.

## What it does

You answer a questionnaire about the manufacturer, the product, its hazards and the platforms you sell on. The tool then generates four documents:

1. **Product safety information sheet**: identification, economic operators, intended use, warnings, instructions, and complaint and recall channels. Cites Art. 6, 9, 11, 12, 16 and 20.
2. **Label / packaging text and online listing block**: the four items of Art. 19 (a) to (d), where to enter them on each platform, and the French Triman and UID reminders.
3. **Risk-analysis template**: hazards, scenarios, a severity × probability grid, measures, the Art. 6 checkpoints and the contents of the technical documentation (Art. 9(2) and 9(3)).
4. **Checklists**: GPSR, the product category, each marketplace and French EPR (streams, approved organisations, UIDs).

Exports: print / PDF, DOCX, Markdown, or all four documents as a ZIP. You can also save your answers to JSON and load them back.

**Privacy:** there is no backend, no cookies, no storage and no trackers. A CSP with `connect-src 'none'` blocks every outgoing request, and a unit test checks that the client code uses no network or storage APIs.

## Develop

```bash
npm ci
npm test               # unit tests (node:test): renderers, ZIP/DOCX, generator, sources, privacy guard
npm run build          # static site -> dist/
npm run templates      # free template pack -> dist-templates/*.zip (uploaded as a Release asset)
npx playwright test    # e2e on a local server (desktop + 390 px)
BASE_URL=https://outils.vread.fr/kit-gpsr-vendeurs/ npx playwright test   # same checks on the live site
```

There is no bundler and only one dev dependency (`@playwright/test`). The DOCX and ZIP writers are small in-house modules (`src/lib/render.js`, `src/lib/zip.js`).

## Sources (checked 2026-10-11)

Every claim in the generated documents links to its source (`src/lib/content.js`).

**Verified on the full official text:**
- Regulation (EU) 2023/988 (EUR-Lex, FR and EN).
- Commission guidelines C/2025/6233.
- Implementing Regulation (EU) 2024/1435 (recall notice template).
- Regulation (EU) 2019/1020, Art. 4.
- Directive 2009/48/EC and Regulation (EU) 2025/2509 (toys).
- Regulation (EC) 1223/2009 (cosmetics).
- Regulation (EU) 1007/2011 (textile labelling).
- REACH Annex XVII entries 23, 27, 43 and 63, as introduced by the amending regulations.
- Directive (EU) 2024/2853 (product liability).
- Code de la consommation L421-1 to L421-3 and L423-3, and RappelConso.
- Loi Toubon, Art. 2.
- Code de l'environnement L541-10, L541-10-1, L541-10-9, L541-10-13 and R541-173.
- Loi n° 2026-602.
- ADEME pages on UIDs, the FAQ and approved organisations.
- Refashion's 2026 guide.
- Etsy help articles on GPSR, economic operators and French EPR.
- Amazon SP-API GPSR attributes.

**Partial:**
- Vinted Pro: fields observed in the interface only; no help article was found.
- Amazon Seller Central help needs a login.
- Standards (EN 15494, EN 14682, EN 12586) are paid, so only their AFNOR catalogue titles are cited.
- The DGCCRF website blocks automated access with an anti-bot challenge, which we did not bypass. Légifrance and RappelConso are cited instead.

Report errors in [issues](https://github.com/VREAD-corp/kit-gpsr-vendeurs/issues).

## Licence

- Code: MIT.
- Texts and templates: CC BY 4.0.

See [LICENSE](LICENSE).

## Sales (B2B): the `SALES_OPEN` switch

`sales.config.json` controls the paid pack. With `"SALES_OPEN": false` (the current value), the build emits **no** buy UI: no order page, no Stripe.js and no sitemap entry, and the pack page keeps "Pas encore en vente". `tests/unit/sales-gate.test.js` checks this.

The French B2B terms are in `cgv-pro.html` (version of 12 October 2026, to be reviewed by a lawyer); `en/terms.html` is an English summary.

Sales are opened only by `octave-checkout/gas/scripts/go-live.sh`. It sets `SALES_OPEN: true` together with the Apps Script `/exec` URL and a `pk_live_` key.

`src/checkout/pay.js` and `src/checkout/order.js` are exact copies of `octave-checkout/gas/web/`, and `scripts/checkout-pages.mjs` is shared with kit-qualiopi-v10. These two copied files are not covered by the privacy guard, which applies only to the free generator.
