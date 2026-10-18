// French guide pages (since 2026-10-17): SEO tags, JSON-LD, sitemap, quality gate of the category pages,
// and no pack call to action on the toy and cosmetics orientation pages.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { GUIDES } from '../../src/site/guides/index.mjs';

const ROOT = resolve(import.meta.dirname, '..', '..');
const out = join(mkdtempSync(join(tmpdir(), 'guides-')), 'dist');
execFileSync(process.execPath, ['scripts/build-site.mjs'], { cwd: ROOT, env: { ...process.env, OUT_DIR: out }, stdio: 'pipe' });

const ORIGIN = 'https://gpsr.jalonel.com';
const ORG_ID = 'https://jalonel.com/#org';
const read = (f) => readFileSync(join(out, f), 'utf8');
const jsonld = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => [JSON.parse(m[1])].flat());
const byType = (nodes, t) => nodes.filter((n) => n['@type'] === t);
const article = (html) => html.slice(html.indexOf('<article class="guide">'), html.indexOf('</article>', html.indexOf('<article class="guide">')));
const PAGES = [{ slug: 'guides', file: 'guides.html' }, ...GUIDES.map((g) => ({ ...g, file: `${g.slug}.html` }))];
const sitemap = read('sitemap.xml');

test('the registry has the 14 guides of the plan, with unique slugs', () => {
  assert.equal(GUIDES.length, 14);
  assert.equal(new Set(GUIDES.map((g) => g.slug)).size, GUIDES.length);
});

for (const p of PAGES) {
  test(`${p.file}: title, description, canonical without hreflang, one h1, sitemap entry, tracking scripts`, () => {
    assert.ok(existsSync(join(out, p.file)), p.file);
    const html = read(p.file);
    const title = html.match(/<title>([^<]*)<\/title>/)[1];
    const desc = html.match(/<meta name="description" content="([^"]*)"/)[1];
    assert.ok(title.length >= 30 && title.length <= 65, `title ${title.length}: ${title}`);
    assert.ok(desc.length >= 100 && desc.length <= 158, `description ${desc.length}: ${desc}`);
    assert.match(title, /GPSR/);
    assert.match(html, new RegExp(`<link rel="canonical" href="${ORIGIN}/${p.file}">`));
    assert.doesNotMatch(html, /hreflang="en" href=/, 'FR-only page: no hreflang alternates');
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
    assert.match(sitemap, new RegExp(`<loc>${ORIGIN}/${p.file}</loc><lastmod>\\d{4}-\\d{2}-\\d{2}</lastmod>`));
    assert.match(html, /<script src="\/mesure\.js" defer><\/script>/);
    assert.match(html, /<script src="\/cro\.js" data-site="kit-gpsr-vendeurs"/);
    assert.match(html, /aria-current="page">Guides</);
  });

  test(`${p.file}: JSON-LD Article (or CollectionPage) by the hub Organization, 2- or 3-level BreadcrumbList, FAQPage matching the page`, () => {
    const html = read(p.file);
    const nodes = jsonld(html);
    const [a] = [...byType(nodes, 'Article'), ...byType(nodes, 'CollectionPage')];
    assert.ok(a, 'Article node');
    assert.equal(a.author['@id'], ORG_ID);
    assert.equal(a.publisher['@id'], ORG_ID);
    assert.equal(a.mainEntityOfPage, `${ORIGIN}/${p.file}`);
    assert.match(a.dateModified, /^2026-\d{2}-\d{2}$/);
    if (a['@type'] === 'Article') {
      assert.match(a.datePublished, /^2026-\d{2}-\d{2}$/);
      assert.ok(a.citation.length >= 2 && a.citation.every((c) => c['@type'] === 'Legislation' && c.url.startsWith('https://')));
    }
    const [bc] = byType(nodes, 'BreadcrumbList');
    assert.equal(bc.itemListElement.at(-1).item, `${ORIGIN}/${p.file}`);
    assert.equal(bc.itemListElement.length, p.slug === 'guides' ? 2 : 3);
    const faq = byType(nodes, 'FAQPage')[0];
    const details = (article(html).match(/<details id="faq-/g) || []).length;
    assert.equal(faq ? faq.mainEntity.length : 0, details);
    assert.equal(byType(nodes, 'Organization').length, 0);
    assert.doesNotMatch(JSON.stringify(nodes), /"aggregateRating"|"review"/);
  });
}

test('every guide: dated, sourced, signed (AI assistance and publication director), links to the hub and the generator', () => {
  for (const g of GUIDES) {
    const body = article(read(`${g.slug}.html`));
    assert.match(body, /Mis à jour le <time datetime="2026-\d{2}-\d{2}">/, g.slug);
    assert.match(body, /<h2 id="sources-h">Sources<\/h2>/, g.slug);
    assert.match(body, /avec l’aide d’Octave, notre assistant IA/, g.slug);
    assert.match(body, /Directeur de la publication\u00a0: Tanguy Warsmann/, g.slug);
    assert.match(read(`${g.slug}.html`), /<a href="\/guides\.html">Guides GPSR<\/a>/, g.slug);
    assert.ok((body.match(/class="btn btn-lg"/g) || []).length <= 1, `${g.slug}: one call to action at most`);
    assert.match(body, /href="\/"/, `${g.slug}: link to the generator`);
  }
});

test('category pages pass the quality gate: own intro, worked example from the generator, at least 3 FAQ answers', () => {
  for (const g of GUIDES.filter((x) => x.group === 'categories')) {
    const body = article(read(`${g.slug}.html`));
    assert.match(body, /<figure class="example">/, g.slug);
    assert.match(body, /Sans objet \(fabricant établi dans l’UE\)/, g.slug);
    assert.ok((body.match(/<details id="faq-/g) || []).length >= 3, g.slug);
    assert.ok(g.lead.length > 500, `${g.slug} intro`);
  }
});

test('toy and cosmetics orientation pages: no pack call to action, no order link in the page body', () => {
  for (const slug of ['jouet-ou-pas-jouet', 'savons-cosmetiques-gpsr']) {
    const body = article(read(`${slug}.html`));
    assert.doesNotMatch(body, /pack\.html|commander/, slug);
  }
});

test('the generator and obligations pages (FR) link to the guides', () => {
  assert.match(read('index.html'), /<a class="text-link" href="\/guides\.html">Tous les guides<\/a>/);
  assert.match(read('obligations.html'), /href="\/gpsr-etsy\.html"/);
  assert.doesNotMatch(read('en/index.html'), /guides\.html/);
});
