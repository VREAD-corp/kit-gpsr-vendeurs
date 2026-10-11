import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { DOC_KEYS, EXAMPLE, effectiveHazards, generateAll, normalise, warningLines } from '../../src/lib/generate.js';
import { toDocx, toMarkdown, plain, runs } from '../../src/lib/render.js';
import { S, CATEGORY_RULES, HAZARD_INFO, MARKETPLACE_INFO, EPR_INFO } from '../../src/lib/content.js';
import { CATEGORIES, HAZARDS, MARKETPLACES, EPR_STREAMS, SECTIONS, missingRequired } from '../../src/lib/schema.js';

const date = new Date('2026-10-11T12:00:00Z');
const allText = (doc) => toMarkdown(doc);

test('every category, hazard, marketplace and EPR stream has bilingual content', () => {
  for (const c of CATEGORIES) {
    const r = CATEGORY_RULES[c.id];
    assert.ok(r, `rule for ${c.id}`);
    assert.ok(r.pointers.fr.length && r.pointers.en.length === r.pointers.fr.length, c.id);
  }
  for (const h of HAZARDS) assert.ok(HAZARD_INFO[h.id]?.scenario.fr && HAZARD_INFO[h.id]?.measures.en, h.id);
  for (const m of MARKETPLACES) assert.ok(MARKETPLACE_INFO[m.id]?.checklist.fr.length, m.id);
  for (const e of EPR_STREAMS) assert.ok(EPR_INFO.streams[e.id]?.fr, e.id);
});

test('every cited source is an official or primary https URL', () => {
  const allowed = /^https:\/\/(eur-lex\.europa\.eu|webgate\.ec\.europa\.eu|ec\.europa\.eu|www\.legifrance\.gouv\.fr|rappel\.conso\.gouv\.fr|www\.ecologie\.gouv\.fr|filieres-rep\.ademe\.fr|media-pro\.refashion\.fr|help\.etsy\.com|developer-docs\.amazon|sellercentral\.amazon\.de|www\.vinted\.fr|www\.boutique\.afnor\.org)\//;
  for (const [k, s] of Object.entries(S)) for (const lang of ['fr', 'en']) assert.match(s.url[lang], allowed, `${k}.${lang}`);
});

test('the example generates four documents in both languages, with GPSR citations', () => {
  for (const lang of ['fr', 'en']) {
    const docs = generateAll(EXAMPLE[lang], lang, date);
    assert.deepEqual(Object.keys(docs), DOC_KEYS);
    for (const k of DOC_KEYS) {
      const md = allText(docs[k]);
      assert.ok(md.includes('CELEX:32023R0988'), `${lang}/${k} cites the GPSR`);
      assert.ok(/READ FRANCE SAS/.test(md), `${lang}/${k} has the disclaimer`);
      assert.ok(toDocx(docs[k], { lang }).length > 2000);
    }
  }
});

test('Article 19 listing block contains manufacturer, RP, identifier and warnings', () => {
  const docs = generateAll(EXAMPLE.en, 'en', date);
  const md = allText(docs.label);
  assert.match(md, /Example Studio Ltd/);
  assert.match(md, /EU responsible person/);
  assert.match(md, /CAND-LAV-200/);
  assert.match(md, /Never leave a burning candle unattended/);
  assert.match(md, /Art\. 19/);
});

test('EU manufacturer: no responsible-person rows; non-EU: RP rows and Art. 16 item', () => {
  const eu = generateAll(EXAMPLE.fr, 'fr', date);
  assert.ok(!allText(eu.sheet).includes('Personne responsable dans l’UE (nom)'));
  assert.match(allText(eu.label), /Sans objet \(fabricant établi dans l’UE\)/);
  const nonEu = generateAll({ ...EXAMPLE.fr, makerInEU: 'no', rpName: 'RP SARL' }, 'fr', date);
  assert.match(allText(nonEu.sheet), /RP SARL/);
  assert.match(allText(nonEu.checklist), /art\. 16/);
});

test('blank answers keep blank lines to fill and flag the RP as conditional', () => {
  const docs = generateAll({}, 'fr', date);
  const md = allText(docs.label);
  assert.match(md, /…………/);
  assert.match(md, /si fabricant hors UE/);
  assert.ok(!md.includes('Sans objet'));
});

test('category implies hazards and specific redirects (toy, cosmetic, food)', () => {
  const a = normalise({ category: 'candle', users: ['adults'] });
  assert.deepEqual(effectiveHazards(a), ['flame', 'chemicals', 'heat']);
  const kids = normalise({ category: 'decor', users: ['under3'] });
  assert.ok(effectiveHazards(kids).includes('small_parts'));
  assert.ok(warningLines(kids, 'fr').some((w) => /moins de 3 ans/.test(w)));
  for (const [cat, re] of [['toy', /2009\/48/], ['cosmetic', /1223\/2009/], ['food', /exclus du GPSR/]]) {
    const md = allText(generateAll({ category: cat }, 'fr', date).sheet);
    assert.match(md, re, cat);
  }
});

test('French EPR section appears only when selling to France, with streams table and UIDs', () => {
  const yes = generateAll({ ...EXAMPLE.fr, epr: ['packaging', 'textile'], uids: 'Emballages : FR000000_01ABCD' }, 'fr', date);
  const md = allText(yes.checklist);
  assert.match(md, /REP France/);
  assert.match(md, /Refashion/);
  assert.match(md, /FR000000\\?_01ABCD/);
  const no = generateAll({ ...EXAMPLE.fr, sellsFrance: 'no' }, 'fr', date);
  assert.ok(!allText(no.checklist).includes('## 4. REP France'));
});

test('normalise drops unknown values and truncates long strings (imported JSON is untrusted)', () => {
  const a = normalise({ role: 'hacker', category: '<script>', hazards: ['flame', 'nope'], productName: 'x'.repeat(5000), users: 'adults' });
  assert.equal(a.role, '');
  assert.equal(a.category, '');
  assert.deepEqual(a.hazards, ['flame']);
  assert.equal(a.productName.length, 2000);
  assert.deepEqual(a.users, []);
});

test('the kit never offers to act as responsible person', () => {
  for (const lang of ['fr', 'en']) {
    const md = DOC_KEYS.map((k) => allText(generateAll(EXAMPLE[lang], lang, date)[k])).join('\n');
    assert.ok(!/nous (sommes|agissons comme) (votre )?personne responsable/i.test(md));
    assert.ok(!/we (act|can act|will act) as (your )?(EU )?responsible person/i.test(md));
  }
});

test('missingRequired respects conditional fields', () => {
  const ids = SECTIONS.flatMap((s) => s.fields).filter((f) => f.required).map((f) => f.id);
  assert.deepEqual(missingRequired({}), ids);
  assert.ok(!missingRequired(EXAMPLE.fr).length);
});

test('runs/plain helpers', () => {
  assert.equal(plain(['a', { text: 'b', b: true }]), 'ab');
  assert.deepEqual(runs(null), []);
});

test('client code makes no network calls and uses no storage (privacy promise)', async () => {
  const files = ['src/app.js', ...(await readdir('src/lib')).map((f) => `src/lib/${f}`)];
  for (const f of files) {
    const code = await readFile(f, 'utf8');
    assert.ok(!/\bfetch\(|XMLHttpRequest|sendBeacon|WebSocket|localStorage|sessionStorage|indexedDB|document\.cookie/.test(code), f);
  }
});
