// schema.org JSON-LD: the pack page carries a Product + Offer (only while SALES_OPEN is true) and the
// publisher Organization (SIREN); the home page keeps its WebApplication and adds the same Organization.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const repoConfig = JSON.parse(readFileSync(join(ROOT, 'sales.config.json'), 'utf8'));
const tmp = mkdtempSync(join(tmpdir(), 'jsonld-'));
const ORG_ID = 'https://outils.vread.fr/#org';

function build(config, env = {}) {
  const cfg = join(tmp, `cfg-${Math.random().toString(36).slice(2)}.json`);
  writeFileSync(cfg, JSON.stringify(config));
  const out = join(tmp, `out-${Math.random().toString(36).slice(2)}`);
  execFileSync(process.execPath, ['scripts/build-site.mjs'], { cwd: ROOT, env: { ...process.env, SALES_CONFIG: cfg, OUT_DIR: out, ...env }, stdio: 'pipe' });
  return out;
}

/** Every JSON-LD node of a page (blocks may hold one object or an array). Throws if a block does not parse. */
function jsonld(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  return blocks.flatMap((b) => (Array.isArray(b) ? b : [b]));
}
const byType = (nodes, type) => nodes.filter((n) => n['@type'] === type);

function assertOrganization(nodes) {
  const [org] = byType(nodes, 'Organization');
  assert.ok(org, 'Organization node');
  assert.equal(org['@context'], 'https://schema.org');
  assert.equal(org['@id'], ORG_ID);
  assert.equal(org.name, 'READ FRANCE SAS');
  assert.equal(org.legalName, 'READ FRANCE');
  assert.equal(org.url, 'https://outils.vread.fr/');
  assert.deepEqual(org.address, { '@type': 'PostalAddress', streetAddress: '11 rue Rouvet', postalCode: '75019', addressLocality: 'Paris', addressCountry: 'FR' });
  assert.deepEqual(org.identifier, { '@type': 'PropertyValue', propertyID: 'SIREN', value: '988741773' });
}

const OPEN_CFG = { ...repoConfig, SALES_OPEN: true, amount: 2900, VAT: 'franchise293B', endpoint: 'https://octave-test.invalid/exec', publishableKey: 'pk_test_fakeForJsonLdTest123' };
const open = build(OPEN_CFG, { SALES_ALLOW_TEST: '1' });

for (const [file, lang] of [['pack.html', 'fr'], ['en/pack.html', 'en']]) {
  test(`${file} (SALES_OPEN=true): parseable Product JSON-LD with a 29.00 EUR InStock offer sold by the SIREN organization`, () => {
    const nodes = jsonld(readFileSync(join(open, file), 'utf8'));
    assertOrganization(nodes);
    const products = byType(nodes, 'Product');
    assert.equal(products.length, 1, 'exactly one Product');
    const p = products[0];
    assert.equal(p['@context'], 'https://schema.org');
    assert.equal(p.name, 'Pack documentation GPSR');
    assert.equal(p.sku, 'pack-gpsr');
    assert.deepEqual(p.brand, { '@type': 'Brand', name: 'Kit GPSR Vendeurs' });
    assert.equal(p.url, `https://outils.vread.fr/kit-gpsr-vendeurs/${lang === 'fr' ? '' : 'en/'}pack.html`);
    assert.equal(p.image, 'https://outils.vread.fr/kit-gpsr-vendeurs/assets/og.png');
    assert.ok(p.description.length > 50);
    const o = p.offers;
    assert.equal(o['@type'], 'Offer');
    assert.equal(o.price, '29.00');
    assert.equal(o.priceCurrency, 'EUR');
    assert.equal(o.availability, 'https://schema.org/InStock');
    assert.equal(o.itemCondition, 'https://schema.org/NewCondition');
    assert.equal(o.url, 'https://outils.vread.fr/kit-gpsr-vendeurs/commander.html');
    assert.deepEqual(o.seller, { '@id': ORG_ID });
    assert.ok(!('valueAddedTaxIncluded' in o), 'no valueAddedTaxIncluded');
  });
}

test('offer price follows sales.config.json amount (cents)', () => {
  const nodes = jsonld(readFileSync(join(build({ ...OPEN_CFG, amount: 3450 }, { SALES_ALLOW_TEST: '1' }), 'pack.html'), 'utf8'));
  assert.equal(byType(nodes, 'Product')[0].offers.price, '34.50');
});

test('SALES_OPEN=false: no Product JSON-LD on the pack pages', () => {
  const closed = build({ ...repoConfig, SALES_OPEN: false });
  for (const f of ['pack.html', 'en/pack.html']) {
    const nodes = jsonld(readFileSync(join(closed, f), 'utf8'));
    assert.equal(byType(nodes, 'Product').length, 0, f);
    assertOrganization(nodes);
  }
});

test('home pages: Organization added, free WebApplication kept, visible pack link with the net price', () => {
  for (const [file, re] of [['index.html', /<a href="\/kit-gpsr-vendeurs\/pack\.html">Pack documentation GPSR – 29 € net<\/a>/], ['en/index.html', /<a href="\/kit-gpsr-vendeurs\/en\/pack\.html">GPSR documentation pack – €29 net<\/a>/]]) {
    const html = readFileSync(join(open, file), 'utf8');
    const nodes = jsonld(html);
    assertOrganization(nodes);
    const [app] = byType(nodes, 'WebApplication');
    assert.ok(app, 'WebApplication kept');
    assert.equal(app.isAccessibleForFree, true);
    assert.deepEqual(app.offers, { '@type': 'Offer', price: '0', priceCurrency: 'EUR' });
    assert.equal(byType(nodes, 'FAQPage').length, 1);
    assert.match(html, re);
  }
});

test('pack pages: SEO title/description lengths, net price with the art. 293 B mention, no HT/TTC wording', () => {
  for (const [file, vat] of [['pack.html', /29 € net, TVA non applicable, art\. 293 B du CGI/], ['en/pack.html', /€29 net, VAT not applicable, art\. 293 B of the French tax code/]]) {
    const html = readFileSync(join(open, file), 'utf8');
    const title = html.match(/<title>([^<]*)<\/title>/)[1];
    const desc = html.match(/<meta name="description" content="([^"]*)"/)[1];
    assert.ok(title.length <= 65, `${file} title ${title.length}`);
    assert.ok(desc.length <= 158, `${file} description ${desc.length}`);
    assert.match(title, /GPSR/);
    assert.match(title, /Etsy/);
    assert.match(desc, vat);
    assert.doesNotMatch(html, /\bHT\b|TTC|hors taxe|excl\. VAT|incl\. VAT/);
  }
});
