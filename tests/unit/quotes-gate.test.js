// Quote / bank-transfer form gate (sales.config.json quotesEnabled).
//  - quotesEnabled=false (the committed value): the Commander page has NO quote block and NO devis.js tag;
//    checkout-config.js still says quotesEnabled:false (devis.js keeps the box hidden anyway).
//  - quotesEnabled=true (test builds only, never committed): the block is emitted once, right after
//    form#octave-pay, devis.js is loaded right after pay.js, and every id on the page stays unique.
//  - The vendored checkout scripts are byte-identical to octave-checkout gas/web/ when that checkout exists.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { checkoutConfigJs, devisFormHtml, loadSalesConfig, orderFormHtml } from '../../scripts/checkout-pages.mjs';

const ROOT = resolve(import.meta.dirname, '..', '..');
const repoConfig = JSON.parse(readFileSync(join(ROOT, 'sales.config.json'), 'utf8'));
const OPEN_CFG = { ...repoConfig, SALES_OPEN: true, endpoint: 'https://octave-test.invalid/exec', publishableKey: 'pk_test_fakeForGateTest123' };
const tmp = mkdtempSync(join(tmpdir(), 'quotes-gate-'));
// Sibling checkout of octave-checkout (also found from a worktree under ../worktrees/); OCTAVE_CHECKOUT overrides.
const OCTAVE_WEB = [process.env.OCTAVE_CHECKOUT, resolve(ROOT, '..', 'octave-checkout'), resolve(ROOT, '..', '..', 'octave-checkout')]
  .filter(Boolean).map((d) => join(d, 'gas', 'web')).find((d) => existsSync(join(d, 'devis.js'))) ?? '';

function build(config) {
  const cfg = join(tmp, `cfg-${Math.random().toString(36).slice(2)}.json`);
  writeFileSync(cfg, JSON.stringify(config));
  const out = join(tmp, `out-${Math.random().toString(36).slice(2)}`);
  execFileSync(process.execPath, ['scripts/build-site.mjs'], { cwd: ROOT, env: { ...process.env, SALES_CONFIG: cfg, OUT_DIR: out, SALES_ALLOW_TEST: '1' }, stdio: 'pipe' });
  return out;
}
const ids = (html) => [...html.replace(/<!--[\s\S]*?-->/g, '').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const dupes = (list) => list.filter((x, i) => list.indexOf(x) !== i);

test('committed config: quotesEnabled is present and false', () => {
  assert.equal(repoConfig.quotesEnabled, false);
});

test('config validation: quotesEnabled must be a boolean (absent = false)', () => {
  const cfgFile = (c) => {
    const f = join(tmp, `v-${Math.random().toString(36).slice(2)}.json`);
    writeFileSync(f, JSON.stringify(c));
    return f;
  };
  const load = (c) => {
    const prev = process.env.SALES_CONFIG;
    process.env.SALES_CONFIG = cfgFile(c);
    try {
      return loadSalesConfig(ROOT);
    } finally {
      if (prev === undefined) delete process.env.SALES_CONFIG;
      else process.env.SALES_CONFIG = prev;
    }
  };
  assert.throws(() => load({ ...repoConfig, quotesEnabled: 'yes' }), /quotesEnabled/);
  const { quotesEnabled, ...noFlag } = repoConfig;
  assert.notEqual(load(noFlag).quotesEnabled, true);
  assert.equal(load({ ...repoConfig, quotesEnabled: true }).quotesEnabled, true);
});

test('quotesEnabled=false: Commander page has no quote block, no devis.js tag; config says false', () => {
  const out = build({ ...OPEN_CFG, quotesEnabled: false });
  const cmd = readFileSync(join(out, 'commander.html'), 'utf8');
  assert.match(cmd, /id="octave-pay"/);
  assert.doesNotMatch(cmd, /octave-devis/);
  assert.doesNotMatch(cmd, /devis\.js/);
  const conf = readFileSync(join(out, 'assets/checkout/checkout-config.js'), 'utf8');
  assert.match(conf, /"quotesEnabled":false/);
  assert.deepEqual(dupes(ids(cmd)), []);
});

test('quotesEnabled=true (test build): block once right after #octave-pay, devis.js after pay.js, unique ids', () => {
  const out = build({ ...OPEN_CFG, quotesEnabled: true });
  const cmd = readFileSync(join(out, 'commander.html'), 'utf8');
  assert.equal(cmd.match(/id="octave-devis-box"/g)?.length, 1);
  assert.equal(cmd.match(/<form id="octave-devis"/g)?.length, 1);
  assert.match(cmd, /<form id="octave-pay"[\s\S]*?<\/form>\s*<details id="octave-devis-box" class="card devis-box" hidden>/);
  assert.match(cmd, /<script src="\/assets\/checkout\/pay\.js"><\/script>\s*<script src="\/assets\/checkout\/devis\.js"><\/script>/);
  assert.equal(cmd.match(/devis\.js/g)?.length, 1);
  const box = cmd.slice(cmd.indexOf('<details id="octave-devis-box"'), cmd.indexOf('</details>') + 10);
  for (const name of ['email', 'company', 'siren', 'addressLine1', 'addressLine2', 'postalCode', 'city', 'buyerRef', 'website', 'terms']) assert.match(box, new RegExp(`name="${name}"`), name);
  assert.match(box, /<div class="hp" aria-hidden="true">/);
  assert.match(box, /class="terms-link" href="\/cgv-pro\.html"/); // same CGV link as the card form
  assert.match(box, /\(version du 13 octobre 2026\)/);
  assert.doesNotMatch(box, /\{\{|\}\}/);
  assert.deepEqual(dupes(ids(cmd)), []);
  assert.match(readFileSync(join(out, 'assets/checkout/checkout-config.js'), 'utf8'), /"quotesEnabled":true/);
  assert.match(readFileSync(join(out, 'assets/app.css'), 'utf8'), /\.hp\{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden\}/);
  for (const f of ['pay.js', 'order.js', 'devis.js']) assert.equal(readFileSync(join(out, 'assets/checkout', f), 'utf8'), readFileSync(join(ROOT, 'src/checkout', f), 'utf8'), f);
});

test('extra fields duplicated in the quote form (devisExtraFieldsHtml, « -devis » ids) keep ids unique', () => {
  const extra = '  <label class="field" for="x-region"><span>Région</span><input id="x-region" name="region" data-octave-extra aria-describedby="x-help"></label>\n';
  const devisExtra = extra.replace(/(for|id|aria-describedby)="([^"]+)"/g, '$1="$2-devis"');
  const html = orderFormHtml({ config: { ...OPEN_CFG, quotesEnabled: true }, productName: 'P', cgvUrl: '/cgv-pro.html', extraFieldsHtml: extra, devisExtraFieldsHtml: devisExtra });
  assert.match(devisFormHtml({ cgvUrl: '/c', extraFieldsHtml: devisExtra }), /<form id="octave-devis"[\s\S]*for="x-region-devis"[\s\S]*id="x-region-devis"/);
  assert.deepEqual(dupes(ids(html)), []);
  assert.equal(html.match(/data-octave-extra/g).length, 2);
});

test('checkout-config.js always carries a boolean quotesEnabled', () => {
  const opts = { termsUrl: 'https://x/cgv-pro.html', orderPage: '/commande.html' };
  assert.match(checkoutConfigJs({ ...OPEN_CFG, quotesEnabled: false }, opts), /"quotesEnabled":false/);
  assert.match(checkoutConfigJs({ ...OPEN_CFG, quotesEnabled: true }, opts), /"quotesEnabled":true/);
  assert.match(checkoutConfigJs({ ...OPEN_CFG, quotesEnabled: undefined }, opts), /"quotesEnabled":false/);
});

test('vendored pay.js / devis.js / order.js are identical to octave-checkout gas/web/', { skip: !OCTAVE_WEB && 'octave-checkout checkout not present' }, () => {
  for (const f of ['pay.js', 'devis.js', 'order.js']) assert.equal(readFileSync(join(ROOT, 'src/checkout', f), 'utf8'), readFileSync(join(OCTAVE_WEB, f), 'utf8'), f);
});

test('browser (quotesEnabled=true, stubbed endpoint): box shown, posts action "quote" with all B2B fields', async () => {
  const { createServer } = await import('node:http');
  const { chromium } = await import('@playwright/test');
  const out = build({ ...OPEN_CFG, quotesEnabled: true });
  const server = createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+kit-gpsr-vendeurs\/?/, '');
    if (!p || p.endsWith('/')) p += 'index.html';
    if (p.includes('..')) return res.writeHead(400).end();
    try {
      const body = readFileSync(join(out, p));
      res.writeHead(200, { 'content-type': p.endsWith('.js') ? 'text/javascript' : p.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8' });
      res.end(body);
    } catch {
      res.writeHead(404).end('404');
    }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const posts = [];
    await page.route('https://js.stripe.com/**', (r) => r.fulfill({ contentType: 'text/javascript', body: 'window.Stripe=function(){return{elements:function(){return{create:function(){return{on:function(){},mount:function(){}}}}}}}' }));
    await page.route('https://octave-test.invalid/**', async (r) => {
      if (r.request().method() === 'GET') return r.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, amount: OPEN_CFG.amount, currency: 'eur', termsVersion: 'cgv-pro-2026-10-13' }) });
      const body = JSON.parse(r.request().postData());
      posts.push(body);
      return r.fulfill({ contentType: 'application/json', body: JSON.stringify(body.action === 'quote' ? { ok: true, quote: 'D-2026-0001', email_masked: 'a***@entreprise.example' } : { ok: false, message: 'stub' }) });
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/commander.html?octave_notrack=1`);
    await page.waitForSelector('#octave-devis-box:not([hidden])');
    await page.click('#octave-devis-box summary');
    const f = (n, v) => page.fill(`#octave-devis input[name="${n}"]`, v);
    await f('email', 'achat@entreprise.example');
    await f('company', 'Organisme Exemple SAS');
    await f('siren', '732 829 320');
    await f('addressLine1', '1 place Exemple');
    await f('postalCode', '75011');
    await f('city', 'Paris');
    await f('buyerRef', 'BC-42');
    await page.check('#octave-devis input[name="terms"]');
    await page.click('#devis-button');
    await page.waitForSelector('#devis-ok:not([hidden])');
    const quotes = posts.filter((p) => p.action === 'quote');
    assert.equal(quotes.length, 1);
    assert.deepEqual({ ...quotes[0], attempt: 'x' }, { action: 'quote', product: 'kit-gpsr-pack', email: 'achat@entreprise.example', company: 'Organisme Exemple SAS', siren: '732829320', addressLine1: '1 place Exemple', addressLine2: '', postalCode: '75011', city: 'Paris', buyerRef: 'BC-42', website: '', termsAccepted: true, termsVersion: 'cgv-pro-2026-10-13', expectedAmount: OPEN_CFG.amount, attempt: 'x' });
    assert.match(await page.textContent('#devis-ok'), /D-2026-0001/);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
    server.close();
  }
});
