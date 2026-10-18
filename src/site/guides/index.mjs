// Registry of the French guides (SEO plan seo/gpsr.md §4). build-site.mjs writes one page per entry plus the
// hub /guides.html, and adds each URL to the sitemap with its content date as lastmod.
import { HUB, OBLIG, PACK, TOOL, guidePage } from './common.mjs';
import { CATEGORY_GUIDES } from './categories.mjs';
import { GENERAL_GUIDES } from './general.mjs';
import { ORIENTATION_GUIDES } from './orientation.mjs';
import { PLATFORM_GUIDES } from './platforms.mjs';
import { CANDLE_GUIDES } from './candles.mjs';

const MODULES = [
  ...GENERAL_GUIDES,
  ...CANDLE_GUIDES,
  ...PLATFORM_GUIDES,
  ...CATEGORY_GUIDES,
  ...ORIENTATION_GUIDES,
];

// Order and grouping of the hub page.
const GROUPS = [
  ['general', 'Qui est responsable de quoi'],
  ['bougies', 'Bougies et fondants'],
  ['plateformes', 'Plateformes de vente'],
  ['categories', 'Par catégorie de produit'],
  ['modeles', 'Modèles de documents'],
  ['orientation', 'Produits soumis à d’autres règles'],
];

export const GUIDES = MODULES;
const find = (slug) => {
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) throw new Error(`unknown guide ${slug}`);
  return g;
};

function hub() {
  const groups = GROUPS.map(([id, title]) => {
    const items = GUIDES.filter((g) => g.group === id);
    if (!items.length) return '';
    return `<section class="hub-group" aria-labelledby="g-${id}">
<h2 id="g-${id}">${title}</h2>
<ul>${items.map((g) => `<li><a href="/${g.slug}.html">${g.crumb}</a><p>${g.teaser}</p></li>`).join('')}${id === 'orientation' ? '<li class="note"><p>Jouets et cosmétiques ont leur propre réglementation. Ces deux pages vous orientent vers les bons textes ; le générateur et le pack ne les couvrent pas.</p></li>' : ''}</ul>
</section>`;
  }).join('\n');
  return {
    slug: 'guides',
    crumb: HUB.label,
    title: 'Guides GPSR pour créateurs et petits vendeurs (2026)',
    description: 'Guides GPSR en français : personne responsable, étiquetage des bougies, Etsy, Amazon, Vinted Pro, Shopify, bijoux, textile, céramique. Articles cités.',
    h1: 'Guides GPSR pour les créateurs et petits vendeurs en ligne',
    lead: `<p>Ces guides répondent aux questions que posent les créateurs qui vendent en ligne depuis le 13 décembre 2024, date d’application du règlement (UE) 2023/988 (GPSR, ou RSGP en français). Chacun cite l’article du texte qui fonde chaque affirmation et donne la date à laquelle nous l’avons vérifié. Pour le tableau complet des obligations, voyez la page ${`<a href="${OBLIG}">Obligations GPSR et REP</a>`} ; pour produire vos documents, le <a href="${TOOL}">générateur gratuit</a>.</p>`,
    body: groups,
    cta: { title: 'Vos documents GPSR en 10 minutes', text: 'Fiche sécurité, texte d’étiquette et d’annonce, analyse de risques et checklists, générés dans votre navigateur.', href: TOOL, label: 'Ouvrir le générateur gratuit', note: `Registre des réclamations, procédure de rappel et modèles par catégorie : <a href="${PACK}">pack GPSR, 29 € net</a>.` },
    sources: [],
  };
}

/** Every guide page, ready for layout(): [{ path, lastmod, props }]. */
export function buildGuides() {
  return [guidePage(hub(), find), ...GUIDES.map((g) => guidePage(g, find))];
}
