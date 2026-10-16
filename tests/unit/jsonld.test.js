// schema.org JSON-LD: the pack page carries a Product + Offer (only while SALES_OPEN is true) sold by the
// hub Organization; pages reference that Organization by @id (https://jalonel.com/#org) and never repeat it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const repoConfig = JSON.parse(readFileSync(join(ROOT, 'sales.config.json'), 'utf8'));
const tmp = mkdtempSync(join(tmpdir(), 'jsonld-'));
const ORG_ID = 'https://jalonel.com/#org';

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

const ORG_REF = { '@type': 'Organization', '@id': ORG_ID, name: 'Jalonel', url: 'https://jalonel.com/', parentOrganization: { '@type': 'Organization', name: 'READ FRANCE SAS', identifier: 'SIREN 988741773' } };

/** The full Organization node lives on the hub only: no page here may repeat it. */
function assertNoOrganizationCopy(nodes) {
  assert.equal(byType(nodes, 'Organization').length, 0, 'no standalone Organization node');
  assert.doesNotMatch(JSON.stringify(nodes), /"legalName"|"PostalAddress"|"SIREN"/);
}

const OPEN_CFG = { ...repoConfig, SALES_OPEN: true, amount: 2900, VAT: 'franchise293B', endpoint: 'https://octave-test.invalid/exec', publishableKey: 'pk_test_fakeForJsonLdTest123' };
const open = build(OPEN_CFG, { SALES_ALLOW_TEST: '1' });

for (const [file, lang] of [['pack.html', 'fr'], ['en/pack.html', 'en']]) {
  test(`${file} (SALES_OPEN=true): parseable Product JSON-LD with a 29.00 EUR InStock offer sold by the SIREN organization`, () => {
    const nodes = jsonld(readFileSync(join(open, file), 'utf8'));
    assertNoOrganizationCopy(nodes);
    const products = byType(nodes, 'Product');
    assert.equal(products.length, 1, 'exactly one Product');
    const p = products[0];
    assert.equal(p['@context'], 'https://schema.org');
    assert.equal(p.name, 'Pack documentation GPSR');
    assert.equal(p.sku, 'pack-gpsr');
    assert.deepEqual(p.brand, { '@type': 'Brand', name: 'Kit GPSR Vendeurs' });
    assert.equal(p.url, `https://gpsr.jalonel.com/${lang === 'fr' ? '' : 'en/'}pack.html`);
    assert.equal(p.image, 'https://gpsr.jalonel.com/assets/og.png');
    assert.ok(p.description.length > 50);
    const o = p.offers;
    assert.equal(o['@type'], 'Offer');
    assert.equal(o.price, '29.00');
    assert.equal(o.priceCurrency, 'EUR');
    assert.equal(o.availability, 'https://schema.org/InStock');
    assert.equal(o.itemCondition, 'https://schema.org/NewCondition');
    assert.equal(o.url, 'https://gpsr.jalonel.com/commander.html');
    assert.deepEqual(o.seller, { '@id': ORG_ID });
    assert.ok(!('valueAddedTaxIncluded' in o), 'no valueAddedTaxIncluded');
    assert.equal(o.shippingDetails.shippingRate.value, '0');
    assert.equal(o.shippingDetails.shippingDestination.addressCountry, 'FR');
    assert.equal(o.hasMerchantReturnPolicy.returnPolicyCategory, 'https://schema.org/MerchantReturnNotPermitted');
    assert.equal(o.hasMerchantReturnPolicy.applicableCountry, 'FR');
    assert.match(o.hasMerchantReturnPolicy.merchantReturnLink, /^https:\/\/gpsr\.jalonel\.com\/.+/);
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
    assertNoOrganizationCopy(nodes);
  }
});

test('home pages: free WebApplication published by the hub Organization (@id), visible pack link with the net price', () => {
  for (const [file, re] of [['index.html', /<a href="\/pack\.html">Pack documentation GPSR, 29 € net<\/a>/], ['en/index.html', /<a href="\/en\/pack\.html">GPSR documentation pack, €29 net<\/a>/]]) {
    const html = readFileSync(join(open, file), 'utf8');
    const nodes = jsonld(html);
    assertNoOrganizationCopy(nodes);
    const [app] = byType(nodes, 'WebApplication');
    assert.ok(app, 'WebApplication kept');
    assert.equal(app.isAccessibleForFree, true);
    assert.deepEqual(app.offers, { '@type': 'Offer', price: '0', priceCurrency: 'EUR' });
    assert.deepEqual(app.publisher, ORG_REF);
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

test('pack and obligations pages: BreadcrumbList (generator > page); obligations: Article with dates, author, citations', () => {
  for (const [file, lang] of [['pack.html', 'fr'], ['en/pack.html', 'en'], ['obligations.html', 'fr'], ['en/obligations.html', 'en']]) {
    const nodes = jsonld(readFileSync(join(open, file), 'utf8'));
    const [bc] = byType(nodes, 'BreadcrumbList');
    assert.ok(bc, `${file} BreadcrumbList`);
    assert.equal(bc.itemListElement.length, 2);
    assert.equal(bc.itemListElement[0].item, `https://gpsr.jalonel.com/${lang === 'fr' ? '' : 'en/'}`);
    assert.equal(bc.itemListElement[1].item, `https://gpsr.jalonel.com/${lang === 'fr' ? '' : 'en/'}${file.replace(/^en\//, '')}`);
    if (!file.includes('obligations')) continue;
    assertNoOrganizationCopy(nodes);
    const [art] = byType(nodes, 'Article');
    assert.match(art.datePublished, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(art.dateModified >= art.datePublished);
    assert.deepEqual(art.author, ORG_REF);
    assert.deepEqual(art.publisher, ORG_REF);
    assert.equal(art.mainEntityOfPage, bc.itemListElement[1].item);
    assert.ok(art.citation.length >= 10 && art.citation.every((c) => c['@type'] === 'Legislation' && /^https:\/\//.test(c.url)));
  }
});
