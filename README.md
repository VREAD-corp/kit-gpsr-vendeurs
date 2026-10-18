# Kit GPSR Vendeurs / GPSR Seller Kit

Free, in-browser helper for small marketplace sellers (Etsy, Vinted Pro, Amazon Handmade, Shopify) who sell consumer products into the EU. It covers the General Product Safety Regulation, **Regulation (EU) 2023/988 (GPSR)**, plus the French **REP/EPR** rules.

- Live, FR: https://gpsr.jalonel.com/
- Live, EN: https://gpsr.jalonel.com/en/
- Free template pack (ZIP, FR + EN, DOCX + Markdown): served by the site at https://gpsr.jalonel.com/telechargements/kit-gpsr-modeles-gratuits-v1.0.0.zip (built by `scripts/build-templates.mjs`, written into `dist/telechargements/` by the site build; `npm run templates` also writes `dist-templates/`).

A Jalonel brand (https://jalonel.com/). Jalonel is a brand of READ FRANCE SAS.

2026-10-16: moved to https://gpsr.jalonel.com/ (brand Jalonel, a brand of READ FRANCE SAS). The old address https://outils.vread.fr/kit-gpsr-vendeurs/ redirects (301) to the new one. GitHub Pages custom domain `gpsr.jalonel.com` (workflow build; the build also writes `dist/CNAME` and the IndexNow key file).

> **Information tool, not legal advice.** You remain responsible for your products and documents. READ FRANCE SAS never acts as, and does not offer to act as, an EU "responsible person", authorised representative, importer or French EPR agent.

## What it does

You answer a questionnaire about the manufacturer, the product, its hazards and the platforms you sell on. The tool then generates four documents:

1. **Product safety information sheet**: identification, economic operators, intended use, warnings, instructions, and complaint and recall channels. Cites Art. 6, 9, 11, 12, 16 and 20.
2. **Label / packaging text and online listing block**: the four items of Art. 19 (a) to (d), where to enter them on each platform, and the French Triman and UID reminders.
3. **Risk-analysis template**: hazards, scenarios, a severity × probability grid, measures, the Art. 6 checkpoints and the contents of the technical documentation (Art. 9(2) and 9(3)).
4. **Checklists**: GPSR, the product category, each marketplace and French EPR (streams, approved organisations, UIDs).

Exports: print / PDF, DOCX, Markdown, or all four documents as a ZIP. You can also save your answers to JSON and load them back.

**Privacy:** there is no backend, no cookies, no storage and no trackers; your answers never leave the browser. The only outgoing requests are the cookieless, anonymous audience measurement (`src/site/mesure.js`, served as `/mesure.js`) and the aggregate behaviour counters / A/B framework (`src/site/cro.js`, byte-identical copy of `octave-checkout/gas/web/cro.js`, goals in `src/site/cro-goals.js`; scroll, sections, CTA timing, form field *names* never values, FAQ, errors, Core Web Vitals), daily totals only, both honour Do Not Track / GPC; the CSP limits `connect-src` to `https://script.google.com`, and a unit test checks that the generator code (`src/app.js`, `src/lib/`) uses no network or storage APIs.

## Guides (FR, since 2026-10-17)

15 French guide pages built from `src/site/guides/` (registry in `index.mjs`): hub `/guides.html`, personne responsable, candle labelling and « fiche de sécurité », Etsy, Amazon, Vinted Pro, Shopify, document templates, 4 category pages (jewellery, textiles, ceramics and decor, children's items that are not toys) and 2 orientation pages (toys, cosmetics; no pack call to action). Each cites its articles and sources with the date checked; worked examples are rendered at build time by the generator itself (`example()` in `common.mjs`). FR-only: canonical without hreflang, Article/FAQPage/BreadcrumbList JSON-LD, sitemap lastmod = content date. Tests: `tests/unit/guides.test.js`, and every guide is in the e2e page list.

## Develop

```bash
npm ci
npm test               # unit tests (node:test): renderers, ZIP/DOCX, generator, sources, privacy guard
npm run build          # static site -> dist/
npm run templates      # free template pack -> dist-templates/*.zip (uploaded as a Release asset)
npx playwright test    # e2e on a local server (desktop + 390 px)
BASE_URL=https://gpsr.jalonel.com/ npx playwright test   # same checks on the live site
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

Report errors to contact@jalonel.com.

## Licence

- Code: MIT.
- Texts and templates: CC BY 4.0.

See [LICENSE](LICENSE).

## Sales (B2B): the `SALES_OPEN` switch

`sales.config.json` controls the paid pack. With `"SALES_OPEN": false` (the current value), the build emits **no** buy UI: no order page, no Stripe.js and no sitemap entry, and the pack page keeps "Pas encore en vente". `tests/unit/sales-gate.test.js` checks this.

The French B2B terms are in `cgv-pro.html` (version of 12 October 2026, to be reviewed by a lawyer); `en/terms.html` is an English summary.

Sales are opened only by `octave-checkout/gas/scripts/go-live.sh`. It sets `SALES_OPEN: true` together with the Apps Script `/exec` URL and a `pk_live_` key.

`src/checkout/pay.js`, `src/checkout/order.js` and `src/checkout/devis.js` are exact copies of `octave-checkout/gas/web/`, and `scripts/checkout-pages.mjs` is shared with kit-qualiopi-v10. These copied files are not covered by the privacy guard, which applies only to the free generator.
