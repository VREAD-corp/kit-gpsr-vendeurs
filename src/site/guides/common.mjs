// Shared building blocks of the French guide pages (SEO plan seo/gpsr.md §4, built 2026-10-17).
// Every legal claim links to its article; the sources list of each page gives the date it was checked.
import { S } from '../../lib/content.js';
import { generateAll } from '../../lib/generate.js';
import { plain } from '../../lib/render.js';
import { ORG_REF, SITE, abs, longDate, url } from '../layout.mjs';

/** Date the texts cited in the guides were re-read (EUR-Lex via the Publications Office, Légifrance, help centres). */
export const CHECKED = '2026-10-17';
export const HUB = { path: '/guides.html', label: 'Guides GPSR' };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
/** French typography: no-break space before « : ; ? ! », inside « », and between a number and « € » or « % ». */
export const nbsp = (html) =>
  String(html)
    .replace(/ ([:;?!»])/g, '\u00a0$1')
    .replace(/« /g, '«\u00a0')
    .replace(/(\d) (€|%)/g, '$1\u00a0$2');
const strip = (html) => String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** Link to an article of the GPSR (EUR-Lex FR, anchor #art_n). art(19) -> « art. 19 ». */
export const art = (n, text) => `<a href="${S.gpsr.url.fr}#art_${String(n).split(/\D/)[0]}">${text ?? `art. ${n}`}</a>`;
/** Link to a registry source of content.js, with optional visible text. */
export const src = (key, text) => `<a href="${S[key].url.fr}">${text ?? S[key].label.fr}</a>`;
export const link = (href, text) => `<a href="${href}">${text}</a>`;
/** Internal link to a guide (or any site path). */
export const go = (path, text) => `<a href="${SITE.base}${path}">${text}</a>`;
export const TOOL = `${SITE.base}${url('tool', 'fr')}`;
export const PACK = `${SITE.base}${url('pack', 'fr')}`;
export const OBLIG = `${SITE.base}${url('obligations', 'fr')}`;

/**
 * A worked example produced by the free generator itself (same code as the browser), rendered at build time from
 * its « Étiquette, emballage et annonce » document: the label text verbatim in a <pre> (text to copy onto a label),
 * the Art. 19 listing block as a table (multi-part values on separate lines), and the platform blocks if any.
 */
export function example(answers, { caption }) {
  const doc = generateAll(answers, 'fr', new Date(`${CHECKED}T12:00:00Z`)).label;
  const out = [];
  let section = 0;
  for (const b of doc.blocks) {
    if (b.t === 'h2') { section++; out.push(`<p class="ex-h">${esc(plain(b.text))}</p>`); }
    else if (b.t === 'label') out.push(`<pre class="doc-label">${b.lines.map((l) => esc(plain(l))).join('\n')}</pre>`);
    else if (b.t === 'kv') out.push(`<table class="doc-kv"><tbody>${b.rows.map(([k, v]) => `<tr><th scope="row">${esc(plain(k))}</th><td>${esc(plain(v)).split(' — ').join('<br>')}</td></tr>`).join('')}</tbody></table>`);
    else if (b.t === 'h3') out.push(`<p class="ex-sub">${esc(plain(b.text))}</p>`);
    else if (b.t === 'ul' && section >= 3) out.push(`<ul>${b.items.map((i) => `<li>${esc(plain(i))}</li>`).join('')}</ul>`);
  }
  return `<figure class="example">
<figcaption>${caption}</figcaption>
<div class="example-doc">
${out.join('\n')}
</div>
</figure>`;
}

/** Base answers of a fictitious French maker (the generator's own example, without the platform blocks). */
export const MAKER = {
  role: 'maker', makerName: 'Atelier Exemple (EI)', makerAddress: '1 rue de l’Exemple\n75000 Paris, France', makerContact: 'contact@atelier-exemple.example', makerInEU: 'yes',
  users: ['adults'], hazards: [], warnings: '', instructions: '', marketplaces: [], sellsFrance: 'no', epr: [], uids: '',
};

/**
 * @param {object} g guide definition (see index.mjs): slug, title, description, h1, crumb, lead, body, faq, sources,
 *   related, cta, citation (content.js keys), published, modified, group.
 * @param {(slug:string)=>object} find registry lookup for related links.
 */
export function guidePage(g, find) {
  const path = g.slug === 'guides' ? HUB.path : `/${g.slug}.html`;
  const canonical = `${SITE.origin}${SITE.base}${path}`;
  const isHub = g.slug === 'guides';
  const crumbs = isHub
    ? [['Générateur GPSR', abs('tool', 'fr'), url('tool', 'fr')], [HUB.label, canonical]]
    : [['Générateur GPSR', abs('tool', 'fr'), url('tool', 'fr')], [HUB.label, `${SITE.origin}${SITE.base}${HUB.path}`, HUB.path], [g.crumb, canonical]];
  const crumbHtml = `<nav class="crumbs" aria-label="Fil d’Ariane">${crumbs
    .map(([label, , href], i) => (i < crumbs.length - 1 ? `<a href="${SITE.base}${href}">${label}</a> <span aria-hidden="true">›</span> ` : `<span>${label}</span>`))
    .join('')}</nav>`;

  const cta = g.cta
    ? `<aside class="cta-box" aria-label="${esc(g.cta.aria ?? 'Passer à l’action')}">
<p class="cta-title">${g.cta.title}</p>
${g.cta.text ? `<p>${g.cta.text}</p>` : ''}
<p><a class="btn btn-lg" href="${g.cta.href}">${g.cta.label}</a></p>
${g.cta.note ? `<p class="small muted">${g.cta.note}</p>` : ''}
</aside>`
    : '';
  const faq = g.faq?.length
    ? `<section class="faq" id="faq" aria-labelledby="faq-h">
<h2 id="faq-h">Questions fréquentes</h2>
${g.faq.map(([q, a], i) => `<details id="faq-${i + 1}"><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
</section>`
    : '';
  const related = g.related?.length
    ? `<nav class="related" aria-labelledby="related-h">
<h2 id="related-h">À lire aussi</h2>
<ul>${g.related.map((s) => (s.startsWith('/') ? s : find(s))).map((r) => (typeof r === 'string' ? r : `<li><a href="${SITE.base}/${r.slug}.html">${r.crumb}</a><br><small>${r.teaser}</small></li>`)).join('')}
<li><a href="${OBLIG}">Obligations GPSR et REP, article par article</a><br><small>Le tableau des obligations du règlement, avec le texte de chaque ligne.</small></li>
</ul>
</nav>`
    : '';
  const sources = g.sources?.length
    ? `<section class="sources" id="sources" aria-labelledby="sources-h">
<h2 id="sources-h">Sources</h2>
<ol>${g.sources.map(([text, href]) => `<li><a href="${href}">${text}</a></li>`).join('')}</ol>
<p>Textes et pages consultés le ${longDate(g.modified ?? CHECKED, 'fr')}.</p>
</section>`
    : '';
  const about = `<div class="about-page small muted">
<p>Page rédigée par Jalonel (READ FRANCE SAS) avec l’aide d’Octave, notre assistant IA, à partir des textes cités, relus le ${longDate(g.modified ?? CHECKED, 'fr')}. Information générale, pas un conseil juridique : en cas de doute, le texte publié au Journal officiel fait foi. READ FRANCE SAS n’agit jamais comme personne responsable, mandataire ou importateur. Directeur de la publication : Tanguy Warsmann. Une erreur, un texte paru depuis ? Écrivez à <a href="mailto:${SITE.contact}">${SITE.contact}</a>.</p>
</div>`;

  const body = nbsp(`${crumbHtml}
<article class="guide">
<h1>${g.h1}</h1>
<p class="meta">Mis à jour le <time datetime="${g.modified ?? CHECKED}">${longDate(g.modified ?? CHECKED, 'fr')}</time> · Jalonel (READ FRANCE SAS)</p>
<div class="lead-block">${g.lead}</div>
${g.body}
${cta}
${faq}
${related}
${sources}
${about}
</article>`);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  };
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': isHub ? 'CollectionPage' : 'Article',
    headline: strip(g.h1),
    description: g.description,
    ...(isHub ? {} : { datePublished: g.published ?? CHECKED }),
    dateModified: g.modified ?? CHECKED,
    inLanguage: 'fr',
    mainEntityOfPage: canonical,
    url: canonical,
    image: `${SITE.origin}${SITE.base}/assets/og.png`,
    author: ORG_REF,
    publisher: ORG_REF,
    ...(g.citation?.length ? { citation: g.citation.map((k) => ({ '@type': 'Legislation', name: S[k].label.fr, url: S[k].url.fr })) } : {}),
  };
  const faqLd = g.faq?.length
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: g.faq.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) }
    : null;

  return {
    path,
    lastmod: g.modified ?? CHECKED,
    props: {
      lang: 'fr', key: 'tool', navKey: 'guides', path, switchHref: `${SITE.base}${url('tool', 'en')}`, checked: g.modified ?? CHECKED,
      title: g.title, description: g.description, body,
      jsonld: [articleLd, breadcrumbLd, ...(faqLd ? [faqLd] : []), ...(g.extraLd ?? [])],
    },
  };
}
