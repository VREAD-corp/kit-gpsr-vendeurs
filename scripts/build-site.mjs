// Builds the static site into dist/ (GitHub Pages). No bundler: ES modules are copied as-is.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, PAGES, SITE, abs, lastmod } from '../src/site/layout.mjs';
import { toolPage } from '../src/site/tool-page.mjs';
import { obligationsPage } from '../src/site/obligations-page.mjs';
import { legalPage, legacyTermsPage, privacyPage, termsPage, ORDER_DONE_PATH, ORDER_PATH, PAY_LABEL } from '../src/site/legal-pages.mjs';
import { packPage } from '../src/site/pack-page.mjs';
import { checkoutConfigJs, checkoutCsp, loadSalesConfig, orderCsp, orderFormHtml, orderPageBody, prices } from './checkout-pages.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// OUT_DIR: test builds only (GitHub Pages publishes dist/).
const out = process.env.OUT_DIR ? resolve(process.env.OUT_DIR) : join(root, 'dist');
// Sales gate: with SALES_OPEN=false (sales.config.json) the build emits no buy UI at all.
const SALES = loadSalesConfig(root);
const OPEN = SALES.SALES_OPEN === true;
// Quote / bank-transfer form (sales.config.json quotesEnabled): block + devis.js tag only when true.
const builders = { tool: toolPage, obligations: obligationsPage, pack: packPage, legal: legalPage, privacy: privacyPage, terms: termsPage };

await rm(out, { recursive: true, force: true });
await mkdir(join(out, 'assets', 'lib'), { recursive: true });

for (const [key, paths] of Object.entries(PAGES)) {
  for (const lang of ['fr', 'en']) {
    const p = builders[key](lang, SALES);
    const html = layout({ lang, key, ...p });
    const rel = paths[lang].endsWith('/') ? paths[lang] + 'index.html' : paths[lang];
    const file = join(out, rel);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
  }
}

// 404 page (FR/EN)
await writeFile(
  join(out, '404.html'),
  layout({
    lang: 'fr', key: 'tool', noindex: true,
    title: 'Page introuvable — Kit GPSR Vendeurs', description: 'Page introuvable.',
    body: `<h1>Page introuvable</h1><p><a href="${SITE.base}/">Retour au générateur</a> · <a href="${SITE.base}/en/" lang="en">Back to the generator</a></p>`,
  }),
);

// Old consumer-terms URL: short notice pointing to the B2B terms (noindex).
await writeFile(join(out, 'cgv.html'), layout({ lang: 'fr', key: 'terms', path: '/cgv.html', ...legacyTermsPage() }));

if (OPEN) {
  const pr = prices(SALES);
  const assets = `${SITE.base}/assets/checkout`;
  await writeFile(
    join(out, ORDER_PATH.slice(1)),
    layout({
      lang: 'fr', key: 'pack', path: ORDER_PATH, noindex: true, csp: checkoutCsp(SALES),
      title: 'Commander le Pack documentation GPSR — professionnels',
      description: `Commande du Pack documentation GPSR par les entreprises (SIREN) : ${pr.sentence}, paiement par carte avec Stripe, fichier et facture par e-mail.`,
      body: `<p><a href="${SITE.base}/pack.html">Pack documentation GPSR</a> › Commander</p>
<h1>Commander le Pack documentation GPSR</h1>
<p class="lead">Modèles étendus par catégorie, procédure de rappel, registre des incidents, questionnaire fournisseur (FR/EN). ${pr.sentence}.</p>
${orderFormHtml({ config: SALES, productName: 'Pack documentation GPSR', cgvUrl: `${SITE.base}/cgv-pro.html`, payLabel: PAY_LABEL })}`,
      tail: `<script src="${assets}/checkout-config.js"></script>\n<script src="https://js.stripe.com/v3/"></script>\n<script src="${assets}/pay.js"></script>\n${SALES.quotesEnabled ? `<script src="${assets}/devis.js"></script>\n` : ''}`,
    }),
  );
  await writeFile(
    join(out, ORDER_DONE_PATH.slice(1)),
    layout({
      lang: 'fr', key: 'pack', path: ORDER_DONE_PATH, noindex: true, csp: orderCsp(SALES),
      title: 'Votre commande — Kit GPSR Vendeurs',
      description: 'Confirmation de la commande du Pack documentation GPSR : envoi du fichier et de la facture par e-mail.',
      body: `${orderPageBody()}\n<p class="hint">Une question ? Répondez à l’e-mail de livraison. <a href="${SITE.base}/pack.html">Retour au pack</a></p>`,
      head: '\n<meta name="referrer" content="no-referrer">',
      tail: `<script src="${assets}/checkout-config.js"></script>\n<script src="${assets}/order.js"></script>\n`,
    }),
  );
  await mkdir(join(out, 'assets', 'checkout'), { recursive: true });
  for (const f of ['pay.js', 'order.js', 'devis.js']) await cp(join(root, 'src', 'checkout', f), join(out, 'assets', 'checkout', f));
  await writeFile(join(out, 'assets', 'checkout', 'checkout-config.js'), checkoutConfigJs(SALES, { termsUrl: `${SITE.origin}${SITE.base}/cgv-pro.html`, orderPage: `${SITE.base}${ORDER_DONE_PATH}`, payLabel: PAY_LABEL }));
}

await cp(join(root, 'src', 'app.js'), join(out, 'assets', 'app.js'));
await cp(join(root, 'src', 'lib'), join(out, 'assets', 'lib'), { recursive: true });
await cp(join(root, 'src', 'site', 'app.css'), join(out, 'assets', 'app.css'));
await cp(join(root, 'src', 'site', 'favicon.svg'), join(out, 'assets', 'favicon.svg'));
await cp(join(root, 'src', 'site', 'mesure.js'), join(out, 'mesure.js')); // anonymous audience measurement (shared snippet, byte-identical)
await cp(join(root, 'src', 'site', 'img'), join(out, 'assets', 'img'), { recursive: true }); // sales-page previews (WebP, rendered from the pack)
await cp(join(root, 'src', 'site', 'og.png'), join(out, 'assets', 'og.png')).catch(() => console.warn('og.png missing (run scripts/make-og.mjs)'));

const urls = Object.keys(PAGES).filter((k) => OPEN || k !== 'terms').flatMap((k) => ['fr', 'en'].map((l) => [abs(k, l), lastmod(k, l)]));
await writeFile(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([u, d]) => `  <url><loc>${u}</loc><lastmod>${d}</lastmod></url>`).join('\n')}\n</urlset>\n`,
);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.origin}${SITE.base}/sitemap.xml\n`);
await writeFile(join(out, '.nojekyll'), '');
console.log(`built ${OPEN ? 14 : 12} pages + cgv.html + 404 into ${out} (sales ${OPEN ? 'OPEN' : 'closed'})`);
