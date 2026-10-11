import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crc32, unzip, zip } from '../../src/lib/zip.js';
import { toDocx, toHtml, toMarkdown } from '../../src/lib/render.js';

const dec = new TextDecoder();

test('crc32 matches the reference value', () => {
  assert.equal(crc32(new TextEncoder().encode('123456789')), 0xcbf43926);
});

test('zip round-trips and is deterministic', () => {
  const files = [{ name: 'a.txt', data: 'hello' }, { name: 'dossier/é.md', data: '# titre' }];
  const a = zip(files);
  const b = zip(files);
  assert.deepEqual(a, b);
  const out = unzip(a);
  assert.equal(dec.decode(out['a.txt']), 'hello');
  assert.equal(dec.decode(out['dossier/é.md']), '# titre');
});

const doc = {
  title: 'Fiche <test> & "co"',
  subtitle: 'v1',
  blocks: [
    { t: 'h2', text: 'Section' },
    { t: 'p', text: [{ text: 'gras', b: true }, ' et ', { text: 'lien', href: 'https://eur-lex.europa.eu/' }] },
    { t: 'note', text: 'Attention' },
    { t: 'ul', items: ['un', 'deux'] },
    { t: 'check', items: ['à faire'] },
    { t: 'kv', rows: [['Nom', 'Atelier'], ['Vide', '']] },
    { t: 'table', head: ['A', 'B'], rows: [['1', '2'], ['3']] },
    { t: 'label', lines: ['Ligne 1', 'Ligne 2'] },
  ],
};

test('markdown renders every block type and escapes markup', () => {
  const md = toMarkdown(doc);
  assert.match(md, /^# Fiche \\<test\\> & "co"/);
  assert.match(md, /\*\*gras\*\* et \[lien\]\(https:\/\/eur-lex\.europa\.eu\/\)/);
  assert.match(md, /- \[ \] à faire/);
  assert.match(md, /\| \*\*Vide\*\* \| &nbsp; \|/);
  assert.match(md, /```text\nLigne 1\nLigne 2\n```/);
});

test('html escapes user content and only links http(s) urls', () => {
  const html = toHtml({ title: '<script>alert(1)</script>', blocks: [{ t: 'p', text: { text: 'x', href: 'javascript:alert(1)' } }] });
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('javascript:'));
  assert.match(toHtml(doc), /<a href="https:\/\/eur-lex\.europa\.eu\/"/);
});

test('docx is a valid OOXML package with escaped XML', () => {
  const bytes = toDocx(doc, { lang: 'fr' });
  const parts = unzip(bytes);
  for (const p of ['[Content_Types].xml', '_rels/.rels', 'word/document.xml', 'word/styles.xml', 'word/_rels/document.xml.rels', 'docProps/core.xml']) {
    assert.ok(parts[p], `missing ${p}`);
  }
  const xml = dec.decode(parts['word/document.xml']);
  assert.match(xml, /Fiche &lt;test&gt; &amp; &quot;co&quot;/);
  assert.match(xml, /<w:tbl>/);
  assert.match(xml, /<w:hyperlink r:id="rIdL1"[^>]*><w:r>.*?lien<\/w:t><\/w:r><\/w:hyperlink>/);
  const rels = dec.decode(parts['word/_rels/document.xml.rels']);
  assert.match(rels, /Id="rIdL1"[^>]*Target="https:\/\/eur-lex\.europa\.eu\/" TargetMode="External"/);
  // every opened paragraph is closed
  assert.equal((xml.match(/<w:p>/g) || []).length + (xml.match(/<w:p\/>/g) || []).length, (xml.match(/<w:p>|<w:p\/>/g) || []).length);
  assert.equal((xml.match(/<w:p>/g) || []).length, (xml.match(/<\/w:p>/g) || []).length);
});
