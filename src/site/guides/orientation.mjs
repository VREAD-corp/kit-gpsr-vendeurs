// Orientation pages (plan P14, P15): toys and cosmetics have their own regulations. Short pages that send makers
// to the right texts. No pack call to action: the pack says it does not cover these products.
// Toy Directive Art. 2 and Annex I, GPSR Art. 2 §1 (as amended by Regulation (EU) 2024/2748, applicable since
// 29 May 2026) and Regulation (EC) 1223/2009 re-read on the Publications Office text on 2026-10-17.
import { TOOL, art, go, link } from './common.mjs';
import { SRC, cite } from './sources.mjs';

const TOY_COMMISSION = 'https://single-market-economy.ec.europa.eu/sectors/toys/toy-safety_en';
const CPNP = 'https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-product-notification-portal_en';

export const jouets = {
  slug: 'jouet-ou-pas-jouet',
  group: 'orientation',
  crumb: 'Jouet fait main : jouet ou pas ?',
  teaser: 'La définition de la directive 2009/48/CE, la liste des produits exclus, et ce que le GPSR garde pour les jouets.',
  title: 'Jouet fait main : jouet ou objet déco ? Directive jouets et GPSR',
  description: 'Peluche, doudou, mobile, déco de fête : la définition du jouet (directive 2009/48/CE, annexe I), le marquage CE, et ce que le GPSR impose encore en ligne.',
  h1: 'Jouet fait main : jouet ou pas jouet, et ce qui change pour vous',
  citation: ['toys', 'toys2025', 'gpsr'],
  lead: `<p>Un objet est un jouet s’il est « conçu ou destiné, exclusivement ou non, à être utilisé à des fins de jeu par des enfants de moins de 14 ans » (${cite('toys', 'directive 2009/48/CE, art. 2 §1')}). Si c’est le cas, la directive jouets est votre règle principale : évaluation de la conformité, documentation technique, déclaration UE de conformité, marquage CE et avertissements propres aux jouets. Le générateur et les modèles de ce site ne suffisent pas pour un jouet. Le GPSR garde pourtant une partie de ses obligations, en particulier pour la vente en ligne.</p>`,
  body: `<h2>Les produits que la directive exclut</h2>
<p>L’annexe I de la directive liste 19 catégories qui ne sont pas des jouets, même si un enfant peut s’en servir. Celles qui concernent le plus les créateurs :</p>
<ul>
<li>les objets décoratifs servant aux fêtes et célébrations (point 1) ;</li>
<li>les produits destinés aux collectionneurs, si le produit ou son emballage indique de façon visible et lisible qu’il est destiné aux collectionneurs âgés d’au moins 14 ans, par exemple les poupées folkloriques et décoratives (point 2) ;</li>
<li>les puzzles de plus de 500 pièces (point 8) ;</li>
<li>les sucettes de puériculture (point 16) ;</li>
<li>les accessoires de mode pour enfants, non destinés à être utilisés à des fins de jeu (point 19).</li>
</ul>
<p>Hors de cette liste, tout dépend de l’usage prévisible. Les mots « exclusivement ou non » de l’article 2 font qu’un objet à la fois décoratif et attrayant pour le jeu peut être un jouet. Une peluche posée dans une chambre d’enfant sera prise pour jouer ; une guirlande de fanions accrochée au mur, en principe non.</p>

<h2>Si c’est un jouet, les textes et les sources officielles</h2>
<p>La directive 2009/48/CE s’applique jusqu’au 31 juillet 2030. Le nouveau ${cite('toys2025', 'règlement (UE) 2025/2509')} s’applique à partir du 1er août 2030, avec un passeport numérique du produit ; ses articles 28 à 44 et 49 à 55 s’appliquent déjà depuis le 1er janvier 2026 (art. 59). Pour la méthode, partez des pages de la ${link(TOY_COMMISSION, 'Commission européenne sur la sécurité des jouets')} et des normes de la série EN 71, vendues par l’AFNOR.</p>
<p>Un exemple d’avertissement propre aux jouets : un jouet qui peut être dangereux pour les moins de 36 mois porte la mention « Ne convient pas aux enfants de moins de 36 mois » (ou le pictogramme), avec l’indication du danger précis (annexe V de la directive).</p>

<h2>Ce que le GPSR impose encore pour un jouet</h2>
<p>Pour les produits couverts par une législation d’harmonisation, comme les jouets, le GPSR écarte une partie de ses chapitres : depuis le 29 mai 2026, le chapitre II bis, la section 1 du chapitre III, les chapitres V et VII et les chapitres IX à XI ne s’appliquent pas (${art(2, 'art. 2 §1 b')}). Restent applicables :</p>
<ul>
<li>les mentions de l’annonce en ligne : fabricant, personne responsable si le fabricant est hors UE, photo et identifiant, avertissements (${art(19)}) ;</li>
<li>la notification des accidents graves par le Safety Business Gateway (${art(20)}) ;</li>
<li>les règles sur les rappels, l’avis de rappel et les remèdes (${art(35, 'art. 35 à 37')}).</li>
</ul>
<p>Le marquage CE et la documentation de la directive jouets ne dispensent donc pas de remplir correctement l’annonce Etsy ou Amazon.</p>

<h2>Si ce n’est pas un jouet</h2>
<p>Un article pour enfant qui n’est pas un jouet (bavoir, attache-tétine, vêtement, décoration murale) relève du GPSR en entier, avec des limites REACH et des normes propres. Notre ${go('/articles-enfants-non-jouets-gpsr.html', 'guide des articles enfants non-jouets')} les détaille.</p>`,
  faq: [
    ['Une peluche décorative est-elle un jouet ?', 'Presque toujours. La directive vise ce qui est destiné, « exclusivement ou non », au jeu des moins de 14 ans. Une peluche à portée d’enfant sera utilisée pour jouer. Seule une poupée ou figurine clairement destinée aux collectionneurs de 14 ans et plus, avec la mention sur le produit ou l’emballage, sort du champ.'],
    ['Un mobile pour chambre de bébé est-il un jouet ?', 'La directive ne le dit pas en toutes lettres. S’il est conçu pour être regardé ou attrapé par l’enfant, il sert au jeu : traitez-le comme un jouet, ou faites confirmer votre analyse par un laboratoire spécialisé avant de vendre.'],
    ['Puis-je utiliser le générateur pour un jouet ?', 'Il signale qu’il ne suffit pas et renvoie vers la directive 2009/48/CE. Il peut servir pour le texte de l’annonce (art. 19), pas pour la conformité du jouet.'],
  ],
  cta: {
    title: 'Votre objet n’est pas un jouet ?',
    text: 'Le générateur gratuit produit la fiche sécurité, le texte d’étiquette et d’annonce et l’analyse de risques des articles qui relèvent du GPSR.',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
  },
  related: ['articles-enfants-non-jouets-gpsr', 'reglementation-bijoux-gpsr'],
  sources: [SRC.toys, SRC.toys2025, SRC.gpsr, ['Commission européenne : sécurité des jouets (en anglais)', TOY_COMMISSION]],
};

export const cosmetiques = {
  slug: 'savons-cosmetiques-gpsr',
  group: 'orientation',
  crumb: 'Savons et cosmétiques',
  teaser: 'Savon, baume, bombe de bain : le règlement cosmétiques s’applique, avec sa propre personne responsable.',
  title: 'Savon artisanal et cosmétiques : pourquoi le GPSR ne suffit pas',
  description: 'Savon, baume, bombe de bain : ce sont des cosmétiques (règlement 1223/2009). Personne responsable, rapport de sécurité, CPNP, et ce que le GPSR garde.',
  h1: 'Savons et cosmétiques fait main : le GPSR n’est pas votre règle principale',
  citation: ['cosmetics', 'gpsr'],
  lead: `<p>Un savon, un baume, une bombe de bain ou une huile de massage sont des produits cosmétiques : ils sont destinés à être mis en contact avec la peau, les cheveux ou les lèvres pour les nettoyer, les parfumer ou en modifier l’aspect (${cite('cosmetics', 'règlement (CE) 1223/2009, art. 2 §1 a')}). Leur règle principale est le règlement cosmétiques, et le GPSR ne s’applique qu’aux aspects qu’il ne traite pas (${art(2, 'art. 2 §1')}). Ce site ne couvre pas les cosmétiques : le ${link(TOOL, 'générateur')} affiche un avertissement pour cette catégorie et s’arrête là.</p>`,
  body: `<h2>Les trois obligations à connaître avant de vendre</h2>
<ul>
<li>Une « personne responsable » au sens cosmétique, désignée dans l’Union : « Seuls les produits cosmétiques pour lesquels une personne physique ou morale est désignée dans la Communauté comme “personne responsable” sont mis sur le marché » (art. 4 §1). Un fabricant établi en France peut tenir ce rôle lui-même, avec toutes les obligations qui vont avec.</li>
<li>Une évaluation de la sécurité et un rapport de sécurité du produit cosmétique, établis avant la mise sur le marché (art. 10). Ce rapport est signé par un évaluateur qualifié.</li>
<li>La notification du produit à la Commission par voie électronique avant sa mise sur le marché (art. 13 §1), sur le ${link(CPNP, 'portail de notification des produits cosmétiques (CPNP)')}.</li>
</ul>
<p>Le dossier d’information sur le produit, l’étiquetage cosmétique (liste des ingrédients, durée d’utilisation) et les bonnes pratiques de fabrication s’y ajoutent. Ce sont des obligations distinctes du GPSR, que nos modèles ne couvrent pas.</p>

<h2>Ce que le GPSR garde pour un cosmétique</h2>
<p>Pour la vente à distance, l’article 19 du GPSR s’applique à votre offre sur Etsy, Vinted Pro ou votre site : fabricant et adresses, personne responsable si le fabricant est hors UE, photo et identifiant, avertissements en français (${art(19)}). Cet article fait partie de ceux que le GPSR maintient même pour les produits couverts par une législation sectorielle (art. 2 §1 b). Pour le reste (registre, rappels), faites vérifier avec votre évaluateur de la sécurité ce qui relève de chaque règlement.</p>

<h2>Le cas des objets qui ressemblent à des aliments</h2>
<p>Un savon en forme de part de gâteau ou de fruit cumule deux questions : le règlement cosmétiques, et l’évaluation des produits qui ressemblent à des aliments. Les lignes directrices de la Commission sur le GPSR citent justement l’exemple d’un savon en forme de cupcake (${cite('guidelines', 'C/2025/6233, point 3.1.1')}). L’aspect fait partie de l’évaluation de sécurité (${art(6, 'art. 6 §1, f')}).</p>

<h2>Bougies et fondants ne sont pas des cosmétiques</h2>
<p>Une bougie parfumée ou un fondant ne se mettent pas sur la peau : ce ne sont pas des cosmétiques. Ils relèvent du GPSR et, selon leur parfum, du règlement CLP. Voir notre ${go('/etiquetage-bougie.html', 'guide de l’étiquetage des bougies')}.</p>`,
  faq: [
    ['Un savon fait main est-il un cosmétique ?', 'Oui, s’il sert à se laver : il est destiné à être mis en contact avec la peau pour la nettoyer, ce qui correspond à la définition de l’article 2 du règlement (CE) 1223/2009. Un savon vendu uniquement pour la lessive ou le ménage relève d’autres règles (détergents).'],
    ['Puis-je être ma propre personne responsable cosmétique ?', 'Oui si vous êtes établi dans l’Union : le règlement demande qu’une personne soit désignée dans l’Union pour chaque produit. Vous portez alors toutes ses obligations, dont le dossier d’information sur le produit et la notification au CPNP.'],
  ],
  cta: null,
  related: ['personne-responsable-gpsr', 'etiquetage-bougie'],
  sources: [SRC.cosmetics, SRC.gpsr, SRC.guidelines, ['Commission européenne : portail de notification des produits cosmétiques (en anglais)', CPNP]],
};

export const ORIENTATION_GUIDES = [jouets, cosmetiques];
