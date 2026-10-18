import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { unzip } from '../../src/lib/zip.js';
import { GUIDES } from '../../src/site/guides/index.mjs';

// Our checks are not visits: mesure.js sends them to the excluded counters (octave_notrack=1, reason notrack).
test.beforeEach(async ({ page }) => { await page.addInitScript(() => { try { localStorage.setItem('octave_notrack', '1'); } catch {} }); });

// FR guides (since 2026-10-17): same render, SEO, no-scroll, tracking and link checks as the other pages.
const GUIDE_PAGES = ['guides.html', ...GUIDES.map((g) => `${g.slug}.html`)];
const PAGES = ['', 'en/', 'obligations.html', 'en/obligations.html', 'pack.html', 'en/pack.html', 'mentions-legales.html', 'en/legal-notice.html', 'confidentialite.html', 'en/privacy.html', 'cgv-pro.html', 'cgv.html', 'en/terms.html', ...GUIDE_PAGES];

function watch(page) {
  const errors = [];
  const foreign = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (!['http:', 'https:'].includes(u.protocol)) return; // blob:/data: downloads stay local
    const base = new URL(test.info().project.use.baseURL);
    // On the live host mesure.js still sends its own hit flagged excluded:'notrack' (by design): not a leak.
    if (u.host === 'script.google.com' && u.search === '?action=track') return;
    if (u.host !== base.host) foreign.push(r.url());
  });
  return { errors, foreign };
}

for (const path of PAGES) {
  test(`page ${path || '/'} renders cleanly with SEO tags and no horizontal scroll`, async ({ page }) => {
    const w = watch(page);
    const res = await page.goto(path);
    expect(res.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.title()).toMatch(/GPSR|CGV|Terms|Mentions|Legal|Confidentialit|Privacy/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/gpsr\.jalonel\.com\//);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('footer')).toContainText(/Une marque Jalonel|A Jalonel brand/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
    expect(w.errors).toEqual([]);
    expect(w.foreign).toEqual([]);
  });
}

// cro.js (aggregate behaviour counters, shared France backend): loaded on every page, nothing sent from our tests.
const CRO_API = 'https://script.google.com/macros/s/AKfycbzD1IRL8QALluKGZxgGiORFP6-DkC_qFJYR9aOxZiimxa06nbCqpzUI-9iLblp6V2VY/exec';
test('every page loads cro.js (site, api, hosts, CTA) and exposes window.octaveCro; no A/B experiment', async ({ page }) => {
  test.setTimeout(180_000); // 28 pages since the guides (2026-10-17)
  const w = watch(page);
  const cro = []; // cro.js batches ({kind:'cro'}); mesure.js still sends its own hit flagged excluded:'notrack' (by design)
  page.on('request', (r) => { if (/"kind":"cro"/.test(r.postData() || '')) cro.push(r.url()); });
  for (const path of [...PAGES, ...(SALES_OPEN ? ['commander.html'] : [])]) {
    const res = await page.goto(path);
    expect(res.status(), path).toBe(200);
    const s = page.locator('script[src="/cro.js"]');
    await expect(s, path).toHaveCount(1);
    await expect(s).toHaveAttribute('data-site', 'kit-gpsr-vendeurs');
    await expect(s).toHaveAttribute('data-api', CRO_API);
    await expect(s).toHaveAttribute('data-hosts', 'gpsr.jalonel.com');
    await expect(s).toHaveAttribute('data-cta', 'a[href*=commander],#pay-button,#btn-generate');
    await page.waitForFunction(() => !!window.octaveCro);
    expect(await page.evaluate(() => [typeof window.octaveCro.goal, window.octaveCro.v('price'), window.OCTAVE_XP])).toEqual(['function', undefined, undefined]);
    expect(await page.evaluate(() => [...document.documentElement.attributes].filter((a) => a.name.startsWith('data-xp-')).length)).toBe(0);
  }
  // The FR tool page: measurable sections and FAQ ids.
  await page.goto('');
  for (const id of ['hero', 'changements', 'faq', 'qui', 'sources']) await expect(page.locator(`section#${id}`)).toHaveCount(1);
  await expect(page.locator('section[data-section="questionnaire"]')).toHaveCount(1);
  await expect(page.locator('#faq details#faq-1')).toHaveCount(1);
  expect(await page.evaluate(() => localStorage.getItem('octave_notrack'))).toBe('1');
  expect(w.errors).toEqual([]);
  await page.goto('pack.html'); // pagehide of the previous page: cro.js would flush here if it were not disabled
  expect(cro).toEqual([]);
});

test('all internal links resolve (200)', async ({ page, request }) => {
  test.setTimeout(180_000);
  const seen = new Set();
  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
    const host = new URL(test.info().project.use.baseURL).host;
    for (const h of hrefs) if (new URL(h).host === host && !h.startsWith('mailto:') && !h.includes('#')) seen.add(h.split('#')[0]);
  }
  const base = test.info().project.use.baseURL;
  for (const u of [...seen, ...['sitemap.xml', 'robots.txt', 'assets/og.png', 'assets/favicon.svg'].map((p) => new URL(p, base).href)]) {
    const r = await request.get(u);
    expect(r.status(), u).toBe(200);
  }
});

// Sales gate: the pack page follows sales.config.json (SALES_OPEN).
const SALES_OPEN = JSON.parse(readFileSync(new URL('../../sales.config.json', import.meta.url), 'utf8')).SALES_OPEN === true;

test('pack page, sales OPEN: Commander link to the B2B order page', async ({ page }) => {
  test.skip(!SALES_OPEN, 'sales closed');
  await page.goto('pack.html');
  expect(await page.locator('a[href$="/commander.html"]').count()).toBeGreaterThanOrEqual(1);
  await expect(page.locator('main a[href$="/commander.html"]').first()).toBeVisible(); // hero CTA, above the fold
  await expect(page.locator('body')).not.toContainText('Pas encore en vente');
  await expect(page.locator('details')).not.toHaveCount(0); // buyer FAQ
  await expect(page.locator('.gallery img')).toHaveCount(4); // real pack previews
  // EN page: buying needs a French SIREN, said before any buy link.
  await page.goto('en/pack.html');
  await expect(page.locator('.hero')).toContainText('French businesses only');
});

test('FR generator: upsell shown only with the results, EN generator has no paid CTA', async ({ page }) => {
  test.skip(!SALES_OPEN, 'sales closed');
  await page.goto('');
  await expect(page.locator('.upsell')).toBeHidden();
  await page.click('#btn-example');
  await expect(page.locator('#results .upsell')).toBeVisible();
  await expect(page.locator('#results .upsell')).toContainText('Vos documents sont prêts');
  await expect(page.locator('#results .upsell a[href$="/pack.html"]')).toHaveCount(1);
  await page.goto('en/');
  await expect(page.locator('a[href$="/commander.html"], .upsell')).toHaveCount(0);
  await expect(page.locator('body')).toContainText('French businesses only (FR)');
});

test('pack page is honest: coming soon, no payment link', async ({ page }) => {
  test.skip(SALES_OPEN, 'sales open');
  await page.goto('pack.html');
  await expect(page.locator('body')).toContainText('Pas encore en vente');
  await expect(page.locator('a[href*="stripe"], a[href*="checkout"], form')).toHaveCount(0);
  await expect(page.locator('a[href*="commander"], a[href*="commande"], script[src*="stripe"]')).toHaveCount(0);
  await page.goto('en/pack.html');
  await expect(page.locator('body')).toContainText('Not on sale yet');
});

test('FR generator: example -> 4 documents, tabs, downloads, no data leaves the browser', async ({ page }) => {
  const w = watch(page);
  await page.goto('');
  await page.click('#btn-example');
  await expect(page.locator('#results')).toBeVisible();
  await expect(page.locator('#status')).toContainText('Documents générés');
  await expect(page.locator('#panel-sheet')).toContainText('Bougie parfumée Lavande 200 g');
  await expect(page.locator('#panel-sheet')).toContainText('Règlement (UE) 2023/988');
  // keyboard tab navigation
  await page.focus('#tab-sheet');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-label')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#panel-label')).toContainText('Ne jamais laisser une bougie allumée sans surveillance');
  await page.click('#tab-risk');
  await expect(page.locator('#panel-risk table.doc-table tbody tr')).toHaveCount(6);
  await page.click('#tab-checklist');
  await expect(page.locator('#panel-checklist')).toContainText('Etsy');
  await expect(page.locator('#panel-checklist')).toContainText('REP France');

  const [docx] = await Promise.all([page.waitForEvent('download'), page.click('#btn-docx')]);
  expect(docx.suggestedFilename()).toBe('bougie-parfumee-lavande-200-g-checklists.docx');
  const docxBytes = new Uint8Array(await (await docx.createReadStream()).toArray().then((c) => Buffer.concat(c)));
  expect(Object.keys(unzip(docxBytes))).toContain('word/document.xml');

  const [md] = await Promise.all([page.waitForEvent('download'), page.click('#btn-md')]);
  expect(md.suggestedFilename()).toMatch(/\.md$/);

  const [z] = await Promise.all([page.waitForEvent('download'), page.click('#btn-zip')]);
  const zipBytes = new Uint8Array(Buffer.concat(await (await z.createReadStream()).toArray()));
  const names = Object.keys(unzip(zipBytes));
  expect(names.filter((n) => n.endsWith('.docx'))).toHaveLength(4);
  expect(names.filter((n) => n.endsWith('.md'))).toHaveLength(4);
  expect(names.some((n) => n.endsWith('.json'))).toBe(true);

  expect(w.errors).toEqual([]);
  expect(w.foreign).toEqual([]);
});

test('typing updates the documents live; conditional RP fields appear for non-EU makers', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('[data-field="rpName"]')).toBeHidden();
  await page.check('#f-makerInEU-no');
  await expect(page.locator('[data-field="rpName"]')).toBeVisible();
  await page.fill('#f-productName', 'Collier perles');
  await page.selectOption('#f-category', 'jewellery');
  await expect(page.locator('#category-redirect')).toContainText('nickel');
  await page.click('#btn-generate');
  await expect(page.locator('#status')).toContainText('champ(s) obligatoire(s)');
  await expect(page.locator('#panel-sheet')).toContainText('Collier perles');
  await page.fill('#f-rpName', 'Mandataire Exemple');
  await expect(page.locator('#panel-sheet')).toContainText('Mandataire Exemple');
});

test('save answers to JSON and load them back', async ({ page }, info) => {
  await page.goto('');
  await page.click('#btn-example');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#btn-save')]);
  const file = info.outputPath('answers.json');
  await dl.saveAs(file);
  await page.click('#btn-reset');
  await expect(page.locator('#f-productName')).toHaveValue('');
  await page.setInputFiles('#file-load', file);
  await expect(page.locator('#f-productName')).toHaveValue('Bougie parfumée Lavande 200 g');
  await expect(page.locator('#status')).toContainText('Réponses chargées');
});

test('EN generator works and toy category shows the redirect', async ({ page }) => {
  await page.goto('en/');
  await page.selectOption('#f-category', 'toy');
  await expect(page.locator('#category-redirect')).toContainText('2009/48/EC');
  await page.click('#btn-example');
  await expect(page.locator('#panel-sheet')).toContainText('Product safety information sheet');
  await expect(page.locator('#panel-sheet')).toContainText('EU responsible person');
});

test('print stylesheet hides the form and shows the document', async ({ page }) => {
  await page.goto('');
  await page.click('#btn-example');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('#gpsr-form')).toBeHidden();
  await expect(page.locator('#panel-sheet')).toBeVisible();
  await expect(page.locator('header.site')).toBeHidden();
});
