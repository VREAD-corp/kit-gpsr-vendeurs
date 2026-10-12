// Shared blocks of the sales pages (home + pack): sources, "Qui sommes-nous", sticky CTA, document previews.
// Every fact shown in a hero or "what changes" block cites one of SOURCES (checked 2026-10-12).
import { S } from '../lib/content.js';
import { SITE } from './layout.mjs';
import { COMPANY } from './legal-pages.mjs';

export const CONTACT_EMAIL = SITE.contact;
export const mailto = (lang) => `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;

/**
 * Verified sources (opened 2026-10-12):
 *  - gpsr: Regulation (EU) 2023/988, Art. 9(12) register of complaints/recalls, Art. 19 distance sales,
 *    Art. 36–37 recall notice and remedies, Art. 52 "applicable from 13 December 2024" (EUR-Lex / Publications Office).
 *  - amazon: SP-API changelog: "Selling partners who sell non-food products in EU-based stores must prove their
 *    GPSR compliance by December 13, 2024" (stores incl. France).
 *  - etsy: Etsy Help "What is the GPSR?" (updated 2026-10-11): sellers selling into the EEA add an economic
 *    operator / manufacturer and the "Product safety info" field in their listing forms.
 */
export const SOURCES = {
  gpsr: S.gpsr,
  amazon: { label: { fr: 'Amazon Selling Partner API, journal des modifications : conformité GPSR des boutiques UE (en anglais)', en: 'Amazon Selling Partner API changelog: GPSR compliance in EU stores' }, url: S.amazonGpsr.url },
  etsy: { label: { fr: 'Aide Etsy : Qu’est-ce que le Règlement relatif à la sécurité générale des produits (RSGP) ?', en: 'Etsy Help: What is the General Product Safety Regulation (GPSR)?' }, url: S.etsyGpsr.url },
  cgv: null, // set per page (internal link)
};

/** Numbered source list + references: ref('gpsr') -> <sup>[1]</sup>. */
export function sourceList(lang, keys) {
  const n = Object.fromEntries(keys.map((k, i) => [k, i + 1]));
  const ref = (k) => `<sup class="ref"><a href="#src-${k}" aria-label="${lang === 'fr' ? 'source' : 'source'} ${n[k]}">[${n[k]}]</a></sup>`;
  const html = `<ol>${keys.map((k) => `<li id="src-${k}"><a href="${SOURCES[k].url[lang]}">${SOURCES[k].label[lang]}</a></li>`).join('')}</ol>`;
  return { ref, html };
}

/** Founders (facts from vread.fr/presse and Vincent Cance's CV; same block on every outils.vread.fr site). */
const FOUNDERS = [
  {
    name: 'Tanguy Warsmann', photo: 'tanguy-warsmann.webp',
    role: { fr: 'Fondateur &amp; CEO', en: 'Founder &amp; CEO' },
    bio: {
      fr: 'Formé aux lettres à la Sorbonne puis à emlyon business school, il a travaillé chez Cartier, puis chez AR/Factory, où il a piloté la stratégie de contenus shopping de médias comme Ouest-France, 20 Minutes et Le Figaro.',
      en: 'After studying literature at the Sorbonne and then at emlyon business school, he worked at Cartier and then at AR/Factory, where he led the shopping-content strategy of media such as Ouest-France, 20 Minutes and Le Figaro.',
    },
  },
  {
    name: 'Vincent Cance', photo: 'vincent-cance.webp',
    role: { fr: 'Cofondateur &amp; CTO', en: 'Co-founder &amp; CTO' },
    bio: {
      fr: 'Développeur full stack web et mobile, il a été cofondateur et CTO de Genipatient, un logiciel de gestion de cabinet pour ostéopathes.',
      en: 'A full-stack web and mobile developer, he was co-founder and CTO of Genipatient, practice-management software for osteopaths.',
    },
  },
];

export function aboutBlock(lang) {
  const fr = lang === 'fr';
  const founders = FOUNDERS.map((f) => `<li class="founder">
<img class="founder-photo" src="${img(f.photo)}" width="112" height="112" alt="${fr ? 'Portrait de' : 'Portrait of'} ${f.name}" loading="lazy" decoding="async">
<div><h3 class="founder-name">${f.name}</h3><p class="founder-role">${f.role[lang]}</p></div>
<p class="founder-bio">${f.bio[lang]}</p>
</li>`).join('\n');
  return `<section class="section" aria-labelledby="about-h">
<div class="card about">
<div class="about-intro">
<span class="kicker">${fr ? 'Qui sommes-nous' : 'About us'}</span>
<h2 id="about-h">${COMPANY.name}, Paris</h2>
<p>${fr
    ? 'Nous éditons outils.vread.fr : des outils gratuits et des modèles documentaires qui aident les petites entreprises à appliquer leurs obligations réglementaires.'
    : 'We publish outils.vread.fr: free tools and document templates that help small businesses meet their regulatory obligations.'}</p>
</div>
<ul class="founders" aria-label="${fr ? 'Fondateurs' : 'Founders'}">
${founders}
</ul>
<div class="about-foot">
<p class="muted"><strong>${COMPANY.name}</strong>, Paris — SIREN ${COMPANY.siren}. ${fr ? 'Une question avant d’acheter, une erreur à signaler ?' : 'A question before buying, or an error to report?'} ${mailto(lang)}</p>
<p><a class="btn secondary" href="mailto:${CONTACT_EMAIL}">${fr ? 'Nous écrire' : 'Email us'}</a></p>
</div>
</div>
</section>`;
}

/** Mobile-only sticky bar: « {offre} {prix} → Commander ». */
export function stickyCta(label, href, action) {
  return `<div class="sticky-cta no-print"><span>${label}</span><a class="btn" href="${href}">${action}</a></div>`;
}

const IMG = `${SITE.base}/assets/img`;
export const PREVIEWS = {
  fr: [
    ['pack-procedure-rappel.webp', 'Procédure de rappel', 'Calendrier jour par jour, avis de rappel (art. 36), remèdes (art. 37).'],
    ['pack-registre-incidents.webp', 'Registre des réclamations', 'Le registre interne exigé par l’art. 9 §12, en DOCX et CSV.'],
    ['pack-modele-bougies.webp', 'Modèle catégorie : bougies', 'Textes spécifiques et analyse de risques remplie (exemple fictif).'],
    ['pack-methode-risques.webp', 'Méthode d’analyse de risques', 'Grilles de gravité et de probabilité, matrice de décision.'],
  ],
  en: [
    ['pack-en-recall-procedure.webp', 'Recall procedure', 'Day-by-day timeline, recall notice (Art. 36), remedies (Art. 37).'],
    ['pack-en-incident-register.webp', 'Complaints register', 'The internal register required by Art. 9(12), as DOCX and CSV.'],
    ['pack-en-candles-template.webp', 'Category template: candles', 'Specific rules and a filled-in risk analysis (fictitious example).'],
    ['pack-en-risk-method.webp', 'Risk-analysis method', 'Severity and probability scales, decision matrix.'],
  ],
};
export const img = (file) => `${IMG}/${file}`;

/** Tilted stack of 3 real pages (first = front). */
export function docStack(files, alts, tag) {
  // DOM order: back-left, back-right, front (CSS rotates each).
  const order = [1, 2, 0];
  return `<div class="stack">${order.map((i) => `<img src="${img(files[i])}" alt="${alts[i]}" width="720" height="1018" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`).join('')}${tag ? `<span class="tag">${tag}</span>` : ''}</div>`;
}

export function gallery(lang) {
  return `<div class="gallery">${PREVIEWS[lang].map(([f, t, d]) => `<figure><a href="${img(f)}"><img src="${img(f)}" alt="${lang === 'fr' ? 'Aperçu de la première page : ' : 'Preview of the first page: '}${t}" width="720" height="1018" loading="lazy" decoding="async"></a><figcaption><strong>${t}</strong>${d}</figcaption></figure>`).join('')}</div>`;
}

/** « Ce qui a changé » : three sourced facts. `ref` from sourceList(lang, ['gpsr', 'amazon', 'etsy']). */
export function factsBlock(lang, ref) {
  const fr = lang === 'fr';
  const items = fr
    ? [
        ['Vos annonces affichent 4 mentions', `Fabricant et ses coordonnées, personne responsable si le fabricant est hors UE, identification du produit avec une image, avertissements de sécurité. Obligatoire pour toute offre en ligne visant l’UE depuis le 13 décembre 2024.`, `Règlement (UE) 2023/988, art. 19 et 52 ${ref('gpsr')}`],
        ['Les plateformes les demandent', `Amazon exige la preuve de conformité GPSR pour vendre des produits non alimentaires sur ses boutiques UE, dont amazon.fr. Etsy demande le fabricant ou l’opérateur économique et les « informations concernant la sécurité du produit » dans vos fiches.`, `Amazon ${ref('amazon')} · Etsy ${ref('etsy')}`],
        ['Un incident se gère par écrit', `Le fabricant examine chaque réclamation et tient un registre des réclamations, des rappels et des mesures correctives. En cas de rappel, l’avis a un contenu imposé et le client a le choix entre au moins deux remèdes.`, `Règlement (UE) 2023/988, art. 9 §12, art. 36 et 37 ${ref('gpsr')}`],
      ]
    : [
        ['Your listings show 4 items', `Manufacturer and contact details, EU responsible person if the manufacturer is outside the EU, product identification with a picture, safety warnings. Required for every online offer targeting the EU since 13 December 2024.`, `Regulation (EU) 2023/988, Art. 19 and 52 ${ref('gpsr')}`],
        ['Marketplaces ask for them', `Amazon requires proof of GPSR compliance to sell non-food products in its EU stores. Etsy asks for the manufacturer or economic operator and the “Product safety info” field in your listings.`, `Amazon ${ref('amazon')} · Etsy ${ref('etsy')}`],
        ['Incidents are handled in writing', `Manufacturers investigate complaints and keep a register of complaints, recalls and corrective measures. In a recall, the notice has mandatory content and customers choose between at least two remedies.`, `Regulation (EU) 2023/988, Art. 9(12), 36 and 37 ${ref('gpsr')}`],
      ];
  return `<div class="grid grid-3">${items.map(([h, p, s], i) => `<div class="card fact"><span class="num" aria-hidden="true">${i + 1}</span><h3>${h}</h3><p>${p}</p><p class="src">${s}</p></div>`).join('')}</div>`;
}

export function sourcesSection(lang, list, extra = '') {
  const fr = lang === 'fr';
  return `<section class="section sources" aria-labelledby="sources-h">
<h2 id="sources-h">${fr ? 'Sources' : 'Sources'}</h2>
${list}
${extra}
</section>`;
}
