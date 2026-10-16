// cro.js (aggregate behaviour counters + A/B): vendored byte-identical from octave-checkout/gas/web/cro.js.
// Runs the portable check shipped with it, and checks that every built page loads it with this site's settings.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const CRO = join(ROOT, 'src', 'site', 'cro.js');
const TAG = '<script src="/cro.js" data-site="kit-gpsr-vendeurs" data-api="https://script.google.com/macros/s/AKfycbzD1IRL8QALluKGZxgGiORFP6-DkC_qFJYR9aOxZiimxa06nbCqpzUI-9iLblp6V2VY/exec" data-hosts="gpsr.jalonel.com outils.vread.fr" data-cta="a[href*=commander],#pay-button,#btn-generate" defer></script>\n<script src="/cro-goals.js" defer></script>';

test('cro.js passes the portable cro.check.mjs', () => {
  execFileSync(process.execPath, [join(ROOT, 'tests', 'unit', 'cro.check.mjs'), CRO], { stdio: 'pipe' });
});

test('every built page (FR, EN, 404, order pages) loads cro.js after mesure.js; cro.js is copied byte-identical', () => {
  const out = mkdtempSync(join(tmpdir(), 'cro-build-'));
  execFileSync(process.execPath, ['scripts/build-site.mjs'], { cwd: ROOT, env: { ...process.env, OUT_DIR: out }, stdio: 'pipe' });
  const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
  assert.equal(sha(join(out, 'cro.js')), sha(CRO));
  const pages = readdirSync(out, { recursive: true }).map(String).filter((f) => f.endsWith('.html'));
  assert.ok(pages.length >= 14 && pages.includes('404.html') && pages.includes('en/index.html'));
  for (const f of pages) {
    const html = readFileSync(join(out, f), 'utf8');
    assert.ok(html.includes('<script src="/mesure.js" defer></script>\n' + TAG), `${f} loads cro.js`);
    assert.doesNotMatch(html, /OCTAVE_XP/, `${f}: no A/B experiment on this site`);
  }
});
