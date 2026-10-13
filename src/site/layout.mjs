// HTML layout shared by every page (build time only).
export const SITE = {
  origin: 'https://outils.vread.fr',
  base: '/kit-gpsr-vendeurs',
  repo: 'https://github.com/VREAD-corp/kit-gpsr-vendeurs',
  issues: 'https://github.com/VREAD-corp/kit-gpsr-vendeurs/issues',
  contact: 'octave@vread.fr',
  releases: 'https://github.com/VREAD-corp/kit-gpsr-vendeurs/releases/latest',
  version: '1.0.0',
  updated: '2026-10-11',
};

export const BRAND = { fr: 'Kit GPSR Vendeurs', en: 'GPSR Seller Kit' };

// Sitemap <lastmod> per page and language when it differs from SITE.updated
// (2026-10-12: B2B terms, VAT franchise, sales opening, pack JSON-LD and SEO;
// 2026-10-13: copy rewrite, titles, breadcrumbs and Article schema of the generator, pack and obligations pages).
const D1012 = { fr: '2026-10-12', en: '2026-10-12' };
const D1013 = { fr: '2026-10-13', en: '2026-10-13' };
const LASTMOD = { tool: D1013, obligations: D1013, pack: D1013, legal: D1012, privacy: D1012, terms: D1012 };
export const lastmod = (key, lang) => LASTMOD[key]?.[lang] ?? SITE.updated;

/**
 * schema.org reference to the publisher. The full Organization node (logo, founders, SIREN, sameAs) lives only on
 * the hub https://outils.vread.fr/; every page here points at it by @id instead of repeating it.
 */
export const ORG_ID = 'https://outils.vread.fr/#org';
export const ORG_REF = { '@type': 'Organization', '@id': ORG_ID, name: 'READ FRANCE SAS' };

// Each logical page has a path per language; used for nav, hreflang and the sitemap.
export const PAGES = {
  tool: { fr: '/', en: '/en/' },
  obligations: { fr: '/obligations.html', en: '/en/obligations.html' },
  pack: { fr: '/pack.html', en: '/en/pack.html' },
  legal: { fr: '/mentions-legales.html', en: '/en/legal-notice.html' },
  privacy: { fr: '/confidentialite.html', en: '/en/privacy.html' },
  terms: { fr: '/cgv-pro.html', en: '/en/terms.html' },
};

const NAV = {
  fr: [['tool', 'Générateur'], ['obligations', 'Obligations'], ['pack', 'Pack GPSR']],
  en: [['tool', 'Generator'], ['obligations', 'Obligations'], ['pack', 'GPSR pack']],
};
const FOOT = {
  fr: [['legal', 'Mentions légales'], ['privacy', 'Confidentialité'], ['terms', 'CGV professionnels']],
  en: [['legal', 'Legal notice'], ['privacy', 'Privacy'], ['terms', 'Terms of sale (B2B)']],
};

export const url = (key, lang) => SITE.base + PAGES[key][lang];
export const abs = (key, lang) => SITE.origin + url(key, lang);
/** French long date: '2026-10-11' -> '11 octobre 2026' (English: '11 October 2026'). */
export function longDate(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = lang === 'fr'
    ? ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d === 1 && lang === 'fr' ? '1er' : d} ${months[m - 1]} ${y}`;
}

/** Visible breadcrumb (generator > page) and its schema.org BreadcrumbList. */
export function breadcrumb(lang, key, label) {
  const home = lang === 'fr' ? 'Générateur GPSR' : 'GPSR generator';
  return {
    html: `<nav class="crumbs" aria-label="${lang === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'}"><a href="${url('tool', lang)}">${home}</a> <span aria-hidden="true">›</span> <span>${label}</span></nav>`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: home, item: abs('tool', lang) },
        { '@type': 'ListItem', position: 2, name: label, item: abs(key, lang) },
      ],
    },
  };
}

// « Autres outils READ FRANCE »: the same footer block on every outils.vread.fr site (hub + the 4 paid offers).
const NETWORK = {
  fr: ['Autres outils READ FRANCE', [
    ['Tous les outils', 'https://outils.vread.fr/'],
    ['Kit Qualiopi V10', 'https://outils.vread.fr/kit-qualiopi-v10/'],
    ['Pack documentation GPSR', 'https://outils.vread.fr/kit-gpsr-vendeurs/pack.html'],
    ['Alertes appels d’offres formation', 'https://outils.vread.fr/veille-ao-formation/alertes/'],
    ['Audit d’accessibilité', 'https://outils.vread.fr/declaration-accessibilite/audit/'],
  ]],
  en: ['Other READ FRANCE tools', [
    ['All tools', 'https://outils.vread.fr/'],
    ['Qualiopi V10 kit (in French)', 'https://outils.vread.fr/kit-qualiopi-v10/', 'fr'],
    ['GPSR documentation pack', 'https://outils.vread.fr/kit-gpsr-vendeurs/en/pack.html'],
    ['Public training tender alerts (in French)', 'https://outils.vread.fr/veille-ao-formation/alertes/', 'fr'],
    ['Accessibility audit', 'https://outils.vread.fr/declaration-accessibilite/en/audit/'],
  ]],
};
function networkHtml(lang) {
  const [title, links] = NETWORK[lang] ?? NETWORK.fr;
  const items = links.map(([label, href, hl]) => `<li><a href="${href}"${hl ? ` hreflang="${hl}"` : ''}>${label}</a></li>`).join('\n');
  return `<nav class="rf-network" aria-label="${title}">\n<p class="rf-network-title">${title}</p>\n<ul>\n${items}\n</ul>\n</nav>`;
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// cro.js (octave-checkout/gas/web/cro.js, byte-identical): aggregate behaviour counters, same France backend as mesure.js.
// Primary CTA: the order links / pay button, and the free generator's « Générer » button.
export const CRO_API = 'https://script.google.com/macros/s/AKfycbzD1IRL8QALluKGZxgGiORFP6-DkC_qFJYR9aOxZiimxa06nbCqpzUI-9iLblp6V2VY/exec';
const CRO_CTA = 'a[href*=commander],#pay-button,#btn-generate';

const LOGO = `<svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="7" fill="#0f5c6e"/><path d="M9 16.5l4.5 4.5L23 11" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/**
 * @param {{lang:'fr'|'en', key:string, title:string, description:string, body:string, scripts?:string[], jsonld?:object, noindex?:boolean, csp?:string, path?:string, head?:string, tail?:string, bodyClass?:string}} p
 * `path` (FR-only pages such as the buy pages): canonical path without language alternates.
 */
export function layout(p) {
  const { lang, key } = p;
  const other = lang === 'fr' ? 'en' : 'fr';
  const brand = BRAND[lang];
  const canonical = p.path ? SITE.origin + SITE.base + p.path : abs(key, lang);
  const csp = p.csp ?? "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src https://script.google.com; form-action 'none'; base-uri 'self'; object-src 'none'";
  const nav = NAV[lang].map(([k, label]) => `<a href="${url(k, lang)}"${k === key ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const foot = FOOT[lang].map(([k, label]) => `<a href="${url(k, lang)}"${k === key ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const switchLabel = lang === 'fr' ? 'English' : 'Français';
  const t = lang === 'fr'
    ? { skip: 'Aller au contenu', product: 'un produit de READ FRANCE SAS', info: 'Outil d’information : ce site ne fournit pas de conseil juridique et READ FRANCE SAS n’agit jamais comme « personne responsable », mandataire ou représentant autorisé.', src: 'Code source', ver: 'Version' }
    : { skip: 'Skip to content', product: 'a product of READ FRANCE SAS', info: 'Information tool: this site does not give legal advice and READ FRANCE SAS never acts as a “responsible person”, authorised representative or agent.', src: 'Source code', ver: 'Version' };
  const scripts = (p.scripts ?? []).map((s) => `<script type="module" src="${SITE.base}${s}"></script>`).join('\n');
  const jsonld = p.jsonld ? `<script type="application/ld+json">${JSON.stringify(p.jsonld).replace(/</g, '\\u003c')}</script>` : '';
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="referrer" content="no-referrer">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${canonical}">
${p.path ? '' : `<link rel="alternate" hreflang="${lang}" href="${canonical}">
<link rel="alternate" hreflang="${other}" href="${abs(key, other)}">
<link rel="alternate" hreflang="x-default" href="${abs(key, 'fr')}">`}
<link rel="icon" href="${SITE.base}/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${SITE.base}/assets/app.css">
<script src="${SITE.base}/mesure.js" defer></script>
<script src="${SITE.base}/cro.js" data-site="kit-gpsr-vendeurs" data-api="${CRO_API}" data-hosts="outils.vread.fr" data-cta="${CRO_CTA}" defer></script>
<script src="${SITE.base}/cro-goals.js" defer></script>
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(brand)}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.origin}${SITE.base}/assets/og.png">
<meta property="og:locale" content="${lang === 'fr' ? 'fr_FR' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0f5c6e">
${jsonld}${p.head ?? ''}
</head>
<body${p.bodyClass ? ` class="${p.bodyClass}"` : ''}>
<a class="skip" href="#main">${t.skip}</a>
<header class="site"><div class="wrap">
<a class="brand" href="${url('tool', lang)}">${LOGO}<span>${brand}</span></a>
<nav class="top" aria-label="${lang === 'fr' ? 'Navigation principale' : 'Main navigation'}">${nav}<a href="${url(key, other)}" hreflang="${other}" lang="${other}">${switchLabel}</a></nav>
</div></header>
<main id="main"><div class="wrap">
${p.body}
</div></main>
<footer class="site"><div class="wrap">
${networkHtml(lang)}
<nav aria-label="${lang === 'fr' ? 'Informations légales' : 'Legal information'}">${foot}<a href="mailto:${SITE.contact}">${lang === 'fr' ? 'Contact\u00a0:' : 'Contact:'} ${SITE.contact}</a><a href="${SITE.repo}">${t.src}</a></nav>
<p>${t.info}</p>
<p>${brand}, ${t.product}. ${t.ver} ${SITE.version}, ${lang === 'fr' ? 'contenu vérifié le' : 'content checked on'} ${SITE.updated}.</p>
</div></footer>
${scripts}${p.tail ?? ''}
</body>
</html>
`;
}
