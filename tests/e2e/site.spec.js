import { test, expect } from '@playwright/test';
import { unzip } from '../../src/lib/zip.js';

const PAGES = ['', 'en/', 'obligations.html', 'en/obligations.html', 'pack.html', 'en/pack.html', 'mentions-legales.html', 'en/legal-notice.html', 'confidentialite.html', 'en/privacy.html', 'cgv.html', 'en/terms.html'];

function watch(page) {
  const errors = [];
  const foreign = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (!['http:', 'https:'].includes(u.protocol)) return; // blob:/data: downloads stay local
    const base = new URL(test.info().project.use.baseURL);
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
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/vread-corp\.github\.io\/kit-gpsr-vendeurs\//);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('footer')).toContainText('READ FRANCE SAS');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
    expect(w.errors).toEqual([]);
    expect(w.foreign).toEqual([]);
  });
}

test('all internal links resolve (200)', async ({ page, request }) => {
  const seen = new Set();
  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
    for (const h of hrefs) if (h.includes('/kit-gpsr-vendeurs/') && !h.includes('#')) seen.add(h.split('#')[0]);
  }
  const base = test.info().project.use.baseURL;
  for (const u of [...seen, ...['sitemap.xml', 'robots.txt', 'assets/og.png', 'assets/favicon.svg'].map((p) => new URL(p, base).href)]) {
    const r = await request.get(u);
    expect(r.status(), u).toBe(200);
  }
});

test('pack page is honest: coming soon, no payment link', async ({ page }) => {
  await page.goto('pack.html');
  await expect(page.locator('body')).toContainText('Pas encore en vente');
  await expect(page.locator('a[href*="stripe"], a[href*="checkout"], form')).toHaveCount(0);
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
