// Builds the static site into dist/ (GitHub Pages). No bundler: ES modules are copied as-is.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, PAGES, SITE, abs } from '../src/site/layout.mjs';
import { toolPage } from '../src/site/tool-page.mjs';
import { obligationsPage } from '../src/site/obligations-page.mjs';
import { legalPage, packPage, privacyPage, termsPage } from '../src/site/legal-pages.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
const builders = { tool: toolPage, obligations: obligationsPage, pack: packPage, legal: legalPage, privacy: privacyPage, terms: termsPage };

await rm(out, { recursive: true, force: true });
await mkdir(join(out, 'assets', 'lib'), { recursive: true });

for (const [key, paths] of Object.entries(PAGES)) {
  for (const lang of ['fr', 'en']) {
    const p = builders[key](lang);
    const html = layout({ lang, key, ...p });
    const rel = paths[lang].endsWith('/') ? paths[lang] + 'index.html' : paths[lang];
    const file = join(out, rel);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
  }
}

// 404 page (FR/EN)
await writeFile(
  join(out, '404.html'),
  layout({
    lang: 'fr', key: 'tool', noindex: true,
    title: 'Page introuvable — Kit GPSR Vendeurs', description: 'Page introuvable.',
    body: `<h1>Page introuvable</h1><p><a href="${SITE.base}/">Retour au générateur</a> · <a href="${SITE.base}/en/" lang="en">Back to the generator</a></p>`,
  }),
);

await cp(join(root, 'src', 'app.js'), join(out, 'assets', 'app.js'));
await cp(join(root, 'src', 'lib'), join(out, 'assets', 'lib'), { recursive: true });
await cp(join(root, 'src', 'site', 'app.css'), join(out, 'assets', 'app.css'));
await cp(join(root, 'src', 'site', 'favicon.svg'), join(out, 'assets', 'favicon.svg'));
await cp(join(root, 'src', 'site', 'og.png'), join(out, 'assets', 'og.png')).catch(() => console.warn('og.png missing (run scripts/make-og.mjs)'));

const urls = Object.keys(PAGES).filter((k) => k !== 'terms').flatMap((k) => ['fr', 'en'].map((l) => abs(k, l)));
await writeFile(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${SITE.updated}</lastmod></url>`).join('\n')}\n</urlset>\n`,
);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.origin}${SITE.base}/sitemap.xml\n`);
await writeFile(join(out, '.nojekyll'), '');
console.log('built 12 pages + 404 into dist/');
