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
// (2026-10-12: B2B terms, VAT franchise, sales opening, pack JSON-LD and SEO).
const D1012 = { fr: '2026-10-12', en: '2026-10-12' };
const LASTMOD = { tool: D1012, obligations: D1012, pack: D1012, legal: D1012, privacy: D1012, terms: D1012 };
export const lastmod = (key, lang) => LASTMOD[key]?.[lang] ?? SITE.updated;

/** schema.org Organization of the publisher (same @id on every page that references it). */
export const ORG_ID = 'https://outils.vread.fr/#org';
export const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'READ FRANCE SAS',
  legalName: 'READ FRANCE',
  url: 'https://outils.vread.fr/',
  address: { '@type': 'PostalAddress', streetAddress: '11 rue Rouvet', postalCode: '75019', addressLocality: 'Paris', addressCountry: 'FR' },
  identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: '988741773' },
};

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
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

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
<nav aria-label="${lang === 'fr' ? 'Informations légales' : 'Legal information'}">${foot}<a href="mailto:${SITE.contact}">${lang === 'fr' ? 'Contact\u00a0:' : 'Contact:'} ${SITE.contact}</a><a href="${SITE.repo}">${t.src}</a></nav>
<p>${t.info}</p>
<p>${brand} — ${t.product}. ${t.ver} ${SITE.version}, ${lang === 'fr' ? 'contenu vérifié le' : 'content checked on'} ${SITE.updated}.</p>
</div></footer>
${scripts}${p.tail ?? ''}
</body>
</html>
`;
}
