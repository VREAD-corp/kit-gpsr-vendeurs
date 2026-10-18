// Jalonel brand separation: nothing served mentions Vread, the GitHub repository or a « code source » link, the
// contact is contact@jalonel.com, and the free template pack is served by the site itself (no GitHub Releases link).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { unzip } from '../../src/lib/zip.js';
import { FREE_PACK } from '../../src/site/layout.mjs';

const ROOT = resolve(import.meta.dirname, '..', '..');

test('built site: no Vread / GitHub repository / source-code link; free pack served locally with its tracking', () => {
  const out = mkdtempSync(join(tmpdir(), 'brand-build-'));
  execFileSync(process.execPath, ['scripts/build-site.mjs'], { cwd: ROOT, env: { ...process.env, OUT_DIR: out }, stdio: 'pipe' });
  const files = readdirSync(out, { recursive: true }).map(String).filter((f) => /\.(html|js|css|json|xml|txt)$/.test(f));
  let downloads = 0;
  for (const f of files) {
    const s = readFileSync(join(out, f), 'utf8');
    assert.doesNotMatch(s, /vread|octave@|github\.com\/VREAD|\/issues|code source|source code/i, f);
    if (f.endsWith('.html')) {
      assert.doesNotMatch(s, /releases\/(latest|download)/, f);
      downloads += (s.match(new RegExp(`href="${FREE_PACK}" data-mesure="free_download"`, 'g')) || []).length;
    }
  }
  assert.ok(downloads >= 4, 'free pack links keep data-mesure="free_download"');
  const zipFile = readFileSync(join(out, FREE_PACK));
  const entries = unzip(new Uint8Array(zipFile));
  const readme = entries['LISEZ-MOI_README.md'];
  assert.ok(readme && Object.keys(entries).length >= 33, 'pack complete');
  assert.doesNotMatch(Buffer.from(readme).toString('utf8'), /vread|github/i);
  assert.match(readFileSync(join(out, 'index.html'), 'utf8'), /href="mailto:contact@jalonel\.com"/);
});
