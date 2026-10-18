// Category guides (plan P8 to P11): jewellery, textiles, ceramics and decor, children's items that are not toys.
// Hazard scenarios and measures come from src/lib/content.js (HAZARD_INFO), the same text the generator uses.
// Each page has its own intro, sector rules, worked example (generator output), myths and FAQ (quality gate §4).
import { HAZARD_INFO } from '../../lib/content.js';
import { HAZARDS, label } from '../../lib/schema.js';
import { MAKER, OBLIG, PACK, TOOL, art, example, go, link } from './common.mjs';
import { SRC, cite } from './sources.mjs';

/** Table of hazards for a category, from the generator's own data. */
function hazardTable(ids) {
  const rows = ids
    .map((id) => `<tr><th scope="row">${label(HAZARDS, id, 'fr')}</th><td>${HAZARD_INFO[id].scenario.fr}</td><td>${HAZARD_INFO[id].measures.fr}</td></tr>`)
    .join('');
  return `<div class="table-scroll"><table class="plain"><thead><tr><th scope="col">Danger</th><th scope="col">Scénario à analyser</th><th scope="col">Mesures courantes</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

const packNote = (what) => `Le ${link(PACK, 'pack GPSR (29 € net, entreprises immatriculées en France)')} contient ${what}.`;

/* ------------------------------------------------------------------ bijoux */
export const bijoux = {
  slug: 'reglementation-bijoux-gpsr',
  group: 'categories',
  crumb: 'Bijoux fantaisie et fait main',
  teaser: 'Nickel, plomb, cadmium (REACH), coordonnées sur la carte du bijou, annonce en ligne.',
  title: 'Réglementation bijoux fantaisie : nickel, plomb, cadmium, GPSR',
  description: 'Bijoux fait main vendus en ligne : limites REACH nickel, plomb et cadmium, mentions GPSR sur le bijou ou sa carte, annonce Etsy. Articles cités.',
  h1: 'Bijoux fantaisie et fait main : ce qu’imposent REACH et le GPSR',
  citation: ['gpsr', 'guidelines', 'reachNickel', 'reachCadmium', 'reachLead', 'toys'],
  lead: `<p>Un bijou fantaisie vendu en France respecte trois limites chimiques de l’annexe XVII de REACH : la libération de nickel (0,5 µg/cm² par semaine pour un bijou porté contre la peau, moins de 0,2 µg pour une tige de piercing), le cadmium (moins de 0,01 % du métal) et le plomb (moins de 0,05 % dans chaque partie). Le GPSR ne fixe aucun seuil. Il vous demande d’évaluer les risques et de garder la preuve de vos choix (${art(9, 'art. 9 §2')}), d’indiquer vos coordonnées et une référence sur le bijou ou, s’il est trop petit, sur sa carte ou son emballage, puis de reprendre quatre informations dans l’annonce (${art(19)}). Aucun texte n’impose de marquage CE à un bijou pour adulte.</p>`,
  body: `<h2>Les trois limites REACH, et ce qu’elles visent</h2>
<p>Ces limites figurent dans l’annexe XVII du règlement REACH, que nous avons relue dans sa version consolidée du 22 juin 2026. Elles s’appliquent à tout bijou mis sur le marché, fait main ou non.</p>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Substance</th><th scope="col">Limite</th><th scope="col">Ce qui est visé</th><th scope="col">Texte</th></tr></thead>
<tbody>
<tr><th scope="row">Nickel</th><td>Libération inférieure à 0,2 µg/cm²/semaine</td><td>Tiges introduites dans les oreilles percées et les autres parties percées du corps</td><td>${cite('reach', 'Entrée 27, §1 a')}</td></tr>
<tr><th scope="row">Nickel</th><td>Libération au plus de 0,5 µg/cm²/semaine</td><td>Articles en contact direct et prolongé avec la peau : boucles d’oreilles, colliers, bracelets, chaînes, bagues, bracelets de cheville, bracelets et fermoirs de montre</td><td>${cite('reach', 'Entrée 27, §1 b')}</td></tr>
<tr><th scope="row">Nickel</th><td>0,5 µg/cm²/semaine pendant au moins deux ans d’usage normal</td><td>Les mêmes articles quand ils sont recouverts (plaqué, doré, vernis)</td><td>${cite('reach', 'Entrée 27, §1 c')}</td></tr>
<tr><th scope="row">Cadmium</th><td>Moins de 0,01 % en poids de métal</td><td>Perles et éléments en métal pour fabriquer des bijoux ; parties en métal des bijoux, de la bijouterie fantaisie et des accessoires pour cheveux</td><td>${cite('reach', 'Entrée 23, §10')}</td></tr>
<tr><th scope="row">Plomb</th><td>Moins de 0,05 % en poids</td><td>Chaque partie d’un bijou, y compris les composants vendus pour en fabriquer</td><td>${cite('reach', 'Entrée 63, §1 à §3')}</td></tr>
</tbody></table></div>
<p>Le plomb a des exceptions précises : le cristal au sens de la directive 69/493/CEE, les pierres précieuses et semi-précieuses naturelles non traitées au plomb, et les émaux cuits à 500 °C au moins (entrée 63, §4). Le texte prévoit aussi des dérogations pour les bijoux anciens : ceux fabriqués avant le 10 décembre 1961 pour le plomb, ceux de plus de 50 ans au 10 décembre 2011 pour le cadmium. Elles concernent surtout la revente de bijoux vintage.</p>
<p>Un point qui revient souvent dans les questions : « sans nickel » n’est pas une notion définie par REACH. La règle porte sur la quantité de nickel libérée au contact de la peau, mesurée selon les normes du CEN (entrée 27, §3). Un acier inoxydable contient du nickel et peut pourtant respecter la limite. Demandez donc à votre fournisseur ce que son mot « nickel free » veut dire, et sur quel essai il s’appuie.</p>

<h2>Ce que vous demandez à vos fournisseurs</h2>
<p>Vous ne fondez pas vos alliages : la preuve vient de vos apprêts, chaînes, crochets et perles. Avant d’acheter, demandez par écrit une déclaration de conformité aux entrées 23, 27 et 63 de l’annexe XVII, avec le rapport d’essai de libération de nickel pour les pièces qui touchent la peau. Classez ces documents par référence de composant dans votre documentation technique : le fabricant la constitue avant la vente et la garde 10 ans (${art(9, 'art. 9 §2 et §3')}).</p>
<p>Si un fournisseur ne peut rien fournir, vous avez deux options : changer de composant, ou faire tester vous-même la pièce par un laboratoire. Le GPSR ne prescrit pas d’essai en laboratoire, mais il vous revient de montrer que le bijou respecte REACH.</p>

<h2>Les risques à analyser pour un bijou</h2>
<p>L’analyse de risques reste courte pour un bijou simple. Voici les dangers que le générateur propose pour cette catégorie, avec le texte qu’il reprend dans votre modèle :</p>
${hazardTable(['skin', 'small_parts', 'cords', 'sharp'])}
<p>Un collier long porté par un enfant, des perles qui se détachent d’un bracelet élastique ou une boucle d’oreille avalée sont des mauvais usages prévisibles. Le règlement demande de les prendre en compte, avec une attention particulière pour les enfants (${art(6, 'art. 6 §1, e')}).</p>

<h2>Où mettre vos coordonnées sur un bijou</h2>
<p>Le fabricant indique sur le produit une référence (type, lot ou série) et ses nom, marque, adresses postale et électronique (${art(9, 'art. 9 §5 et §6')}). Quand la taille du produit ne le permet pas, ces mentions passent sur l’emballage ou un document joint. Pour une bague ou une paire de puces, c’est en pratique la carte bijou, le sachet ou une étiquette volante.</p>
<blockquote><p>« En principe, seule la taille du produit (et donc pas, par exemple, des raisons esthétiques ou similaires) pourrait justifier de transférer certaines informations requises du produit vers son emballage ou d’autres documents d’accompagnement. »</p><cite>${cite('guidelines', 'Lignes directrices de la Commission C/2025/6233')}, point 3.1.1</cite></blockquote>
<p>Un grand pendentif ou un bracelet manchette peut porter une gravure ou une plaque. Une boucle d’oreille, non : la carte suffit, à condition qu’elle accompagne le bijou jusqu’au client.</p>

<h2>L’annonce en ligne, avec un exemple rempli</h2>
<p>Sur Etsy, Vinted Pro, Amazon ou votre site, l’annonce indique le fabricant et ses adresses, une personne responsable seulement si le fabricant est hors UE, une photo avec la référence, et les avertissements (${art(19)}). Voici ce que le générateur gratuit produit pour une paire de boucles d’oreilles, avec des données fictives :</p>
${example({ ...MAKER, productName: 'Boucles d’oreilles « Feuille » laiton doré', productRef: 'BO-FEUILLE-01', batch: 'LOT 2026-10', category: 'jewellery', materials: 'Laiton doré à l’or fin, crochets en acier inoxydable (déclaration fournisseur entrées 23, 27 et 63)', intendedUse: 'Boucles d’oreilles fantaisie pour adultes.', misuse: 'Portées ou manipulées par un jeune enfant.', hazards: ['small_parts'] }, { caption: 'Exemple fictif généré par le générateur gratuit le 17 octobre 2026 (document « Étiquette, emballage et annonce »).' })}

<h2>Ce que le GPSR n’exige pas pour un bijou</h2>
<ul>
<li>Pas de marquage CE : le marquage CE vient des textes d’harmonisation (jouets, appareils électriques…), et aucun ne vise le bijou pour adulte.</li>
<li>Pas de certificat à afficher dans l’annonce : les déclarations des fournisseurs restent dans votre dossier, et vous les montrez aux autorités si elles les demandent.</li>
<li>Pas de règle sur les métaux précieux : le titre et le poinçon des bijoux en or, argent ou platine relèvent de la garantie gérée par la douane (par exemple 800 millièmes au moins pour appeler un bijou « argent »). Voir ${cite('douaneMetaux', 'la fiche de la douane sur les règles de marque')}.</li>
</ul>

<h2>Bijou pour enfant, jouet ou accessoire ?</h2>
<p>Un bijou fantaisie conçu pour que des enfants jouent avec (panoplie de princesse, kit de perles) est un jouet au sens de la ${cite('toys', 'directive 2009/48/CE')} : marquage CE, essais et avertissements propres aux jouets, que ce kit ne couvre pas. Un accessoire de mode pour enfant qui n’est pas destiné au jeu reste un produit GPSR, avec une analyse de risques plus exigeante (cordons, petites pièces). Notre ${go('/jouet-ou-pas-jouet.html', 'page jouet ou pas jouet')} détaille la frontière.</p>`,
  faq: [
    ['Un bijou « sans nickel » doit-il contenir 0 % de nickel ?', 'Non. REACH limite la quantité de nickel libérée au contact de la peau (0,5 µg/cm² par semaine, 0,2 µg pour une tige de piercing), pas la teneur. Un acier inoxydable contient du nickel et peut respecter la limite.'],
    ['Dois-je faire tester mes bijoux en laboratoire ?', 'Le GPSR n’impose pas d’essai. Vous devez pouvoir montrer que chaque pièce respecte REACH : la déclaration et le rapport d’essai de vos fournisseurs suffisent souvent. Pour un placage ou un alliage que vous faites vous-même, un essai en laboratoire est le moyen le plus simple de le prouver.'],
    ['Puis-je mettre mes coordonnées seulement sur la carte du bijou ?', 'Oui quand la taille du bijou empêche de les y mettre. Les lignes directrices de la Commission précisent que seule la taille, et non l’esthétique, justifie ce report. La carte doit être remise avec le bijou.'],
    ['Les bijoux vintage que je revends sont-ils concernés ?', 'Oui si vous les vendez comme professionnel : le GPSR couvre les produits d’occasion (art. 2 §3). REACH prévoit des dérogations pour les bijoux anciens : fabriqués avant le 10 décembre 1961 pour le plomb, de plus de 50 ans au 10 décembre 2011 pour le cadmium.'],
    ['Mon bijou doit-il porter le marquage CE ?', 'Non, sauf s’il s’agit d’un jouet (bijou de jeu pour enfant), qui relève alors de la directive 2009/48/CE.'],
  ],
  cta: {
    title: 'Générez la fiche sécurité et le texte d’annonce de votre bijou',
    text: 'Questionnaire de 10 minutes, rien n’est envoyé : vos réponses restent dans votre navigateur. Choisissez la catégorie « Bijoux et accessoires métalliques ».',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
    note: packNote('un modèle « bijoux » rempli et un questionnaire fournisseur bilingue (substances REACH, essais, traçabilité)'),
  },
  related: ['personne-responsable-gpsr', 'gpsr-etsy', 'articles-enfants-non-jouets-gpsr', 'modeles-gpsr'],
  sources: [SRC.reach, SRC.gpsr, SRC.guidelines, SRC.toys, SRC.douaneMetaux],
};

/* ------------------------------------------------------------------ textile */
export const textile = {
  slug: 'vetements-textile-gpsr',
  group: 'categories',
  crumb: 'Vêtements et textiles',
  teaser: 'Étiquette de composition, colorants, PFHxA depuis le 10 octobre 2026, cordons des vêtements d’enfants, Refashion.',
  title: 'Vêtements et textiles fait main : étiquette, REACH et GPSR',
  description: 'Vêtement ou linge fait main : étiquette de composition (règl. 1007/2011), REACH dont PFHxA au 10/10/2026, cordons enfant EN 14682, GPSR et REP Refashion.',
  h1: 'Vêtements et textiles fait main : étiquette, substances et GPSR',
  citation: ['gpsr', 'textile', 'reachNickel', 'loi2026'],
  lead: `<p>Pour un vêtement ou du linge de maison, l’étiquette de composition ne vient pas du GPSR : elle est imposée par le ${cite('textile', 'règlement (UE) 1007/2011')}, qui exige aussi d’afficher la composition dans l’annonce avant l’achat. Le GPSR s’ajoute pour la sécurité : analyse de risques, référence et coordonnées du fabricant sur le produit, quatre informations dans l’annonce (${art(19)}). REACH fixe les limites de substances (colorants azoïques, substances CMR et, depuis le 10 octobre 2026, PFHxA dans les vêtements). Pour les vêtements d’enfants, les cordons et cordons coulissants suivent une norme dédiée.</p>`,
  body: `<h2>L’étiquette de composition relève du règlement 1007/2011</h2>
<p>Un produit textile est étiqueté ou marqué pour indiquer sa composition en fibres chaque fois qu’il est mis à disposition sur le marché (${cite('textile', 'art. 14')}). Pour une vente en ligne, la composition est visible avant l’achat (art. 16 §1), et en France l’étiquette est rédigée en français (art. 16 §3). Le règlement n’impose pas de symboles d’entretien : ils restent conseillés, pas obligatoires au niveau européen.</p>
<p>Concrètement, dans l’annonce Etsy ou Vinted Pro, mettez la composition en clair (« 100 % lin ») dans la description, et cousez une étiquette sur le vêtement.</p>

<h2>Les substances limitées par REACH, avec une date à retenir</h2>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Restriction</th><th scope="col">Ce qu’elle vise</th><th scope="col">Texte</th></tr></thead>
<tbody>
<tr><th scope="row">Colorants azoïques libérant certaines amines (plus de 30 mg/kg)</th><td>Textiles et cuirs en contact direct et prolongé avec la peau ou la bouche : vêtements, literie, serviettes, chapeaux, fils et étoffes vendus au consommateur</td><td>${cite('reach', 'Entrée 43')}</td></tr>
<tr><th scope="row">Substances CMR de l’appendice 12</th><td>Vêtements, accessoires et textiles qui touchent la peau comme un vêtement, chaussures. Le seconde main est exclu de cette entrée</td><td>${cite('reach', 'Entrée 72')}</td></tr>
<tr><th scope="row">PFHxA et substances apparentées (25 ppb / 1 000 ppb)</th><td>Depuis le 10 octobre 2026 : textiles des vêtements et accessoires grand public. À partir du 10 octobre 2027 : les autres textiles grand public</td><td>${cite('reach', 'Entrée 79')}</td></tr>
<tr><th scope="row">Nickel (0,5 µg/cm²/semaine)</th><td>Boutons à rivets, boucles, rivets, fermetures éclair et marques de métal des vêtements</td><td>${cite('reach', 'Entrée 27, §1 b')}</td></tr>
</tbody></table></div>
<p>Le PFHxA vient des traitements déperlants ou anti-taches. Si vous achetez un tissu imperméabilisé pour des capes ou des sacs, demandez au fournisseur une déclaration sur l’entrée 79 : la restriction s’applique aux produits mis sur le marché depuis le 10 octobre 2026. Pour vos tissus, comme pour vos boutons et pressions, la preuve est une déclaration fournisseur, à classer dans votre documentation technique (${art(9, 'art. 9 §2')}).</p>

<h2>Cordons et petites pièces des vêtements d’enfants</h2>
<p>Les cordons et cordons coulissants des vêtements d’enfants sont encadrés par la ${cite('en14682', 'norme NF EN 14682')}. Sa version de 2014 figure dans la ${cite('std2026', 'liste des normes publiées au titre du GPSR')} : la respecter vaut présomption de sécurité pour ce risque (${art(7, 'art. 7 §1')}). C’est une norme payante : nous n’en reproduisons pas le contenu. Achetez-la ou faites-vous conseiller avant de vendre des sweats à capuche ou des pantalons à lien pour enfants. Les boutons, perles et appliques cousus doivent tenir à la traction : un enfant de moins de 3 ans met tout à la bouche. Les enfants sont des consommateurs vulnérables que l’analyse de risques prend en compte explicitement (${art(6, 'art. 6 §1, e')}).</p>
${hazardTable(['cords', 'small_parts', 'flammable', 'skin'])}

<h2>Où vont les mentions GPSR sur un vêtement</h2>
<p>La référence et les coordonnées du fabricant vont sur le produit (${art(9, 'art. 9 §5 et §6')}). Sur un vêtement, l’endroit naturel est l’étiquette cousue : nom ou marque, adresse postale, adresse e-mail, référence et lot. Les instructions de sécurité éventuelles (cordon, petite pièce) sont en français pour la France (${art(9, 'art. 9 §7')}).</p>
<p>Voici l’exemple généré pour un bonnet bébé, avec des données fictives :</p>
${example({ ...MAKER, productName: 'Bonnet bébé en laine mérinos, taille 6-12 mois', productRef: 'BON-MER-612', batch: 'LOT 2026-10', category: 'textile', materials: 'Laine mérinos 100 % (fournisseur, déclaration REACH), pompon en laine cousu', intendedUse: 'Bonnet pour bébé, porté sous la surveillance d’un adulte.', misuse: 'Pompon arraché et mis à la bouche ; lien noué autour du cou.', users: ['under3'], hazards: ['small_parts', 'cords'] }, { caption: 'Exemple fictif généré par le générateur gratuit le 17 octobre 2026 (document « Étiquette, emballage et annonce »).' })}

<h2>REP textile et lieu de fabrication en France</h2>
<p>Les vêtements, le linge de maison et les chaussures neufs relèvent de la filière REP textiles. L’éco-organisme agréé est Refashion ; son ${cite('refashion', 'guide 2026')} prévoit une déclaration simplifiée sous 5 000 pièces par an. Vous obtenez un identifiant unique (IDU), à afficher dans vos CGV et sur votre site (${cite('envR541173', 'art. R541-173 du Code de l’environnement')}). La ${cite('loi2026', 'loi n° 2026-602 du 8 juillet 2026')} ajoute l’affichage du lieu de fabrication des textiles vendus en ligne : vérifiez sa date d’application avant de modifier vos annonces.</p>

<h2>Ce que le GPSR n’exige pas pour un vêtement</h2>
<ul>
<li>L’étiquette de composition, qui relève du règlement 1007/2011.</li>
<li>Les symboles d’entretien, qui ne sont imposés par aucun texte européen.</li>
<li>Un marquage CE, sauf pour un équipement de protection (gilet haute visibilité, par exemple), qui suit alors son propre règlement.</li>
</ul>`,
  faq: [
    ['La composition doit-elle figurer dans l’annonce en ligne ?', 'Oui. Le règlement (UE) 1007/2011 exige que la composition soit visible avant l’achat, y compris en ligne (art. 16 §1). Mettez-la dans la description, en plus de l’étiquette cousue.'],
    ['Les symboles d’entretien sont-ils obligatoires ?', 'Pas au niveau européen : le règlement 1007/2011 ne les impose pas. Ils restent utiles pour éviter les réclamations (rétrécissement, déteinte).'],
    ['Je revends des vêtements de seconde main en tant que professionnel : suis-je concerné ?', 'Oui pour le GPSR, qui couvre les produits d’occasion vendus par un professionnel (art. 2 §3). L’entrée 72 de REACH (substances CMR) exclut le seconde main. Côté REP, l’ADEME indique que la filière textile ne vise que les produits neufs, mais vos emballages relèvent de la filière emballages.'],
    ['Qu’est-ce qui change au 10 octobre 2026 ?', 'La restriction REACH sur le PFHxA s’applique aux textiles des vêtements et accessoires vendus au grand public (entrée 79). Les autres textiles grand public suivent au 10 octobre 2027.'],
  ],
  cta: {
    title: 'Générez la fiche sécurité de votre vêtement',
    text: 'Catégorie « Textile, vêtements, linge de maison » : avertissements cordons et petites pièces pré-remplis, checklist REP Refashion.',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
    note: packNote('un modèle « textile » rempli et le questionnaire fournisseur bilingue pour vos tissus et mercerie'),
  },
  related: ['articles-enfants-non-jouets-gpsr', 'gpsr-vinted-pro', 'gpsr-etsy', 'modeles-gpsr'],
  sources: [SRC.textile, SRC.reach, SRC.gpsr, SRC.std2026, SRC.en14682, SRC.refashion, SRC.envR541173, SRC.loi2026, ['ADEME : FAQ filières REP', 'https://filieres-rep.ademe.fr/faq']],
};

/* --------------------------------------------------------- céramique / déco */
export const deco = {
  slug: 'ceramique-decoration-gpsr',
  group: 'categories',
  crumb: 'Céramique et décoration',
  teaser: 'Objet décoratif ou vaisselle : contact alimentaire, casse, fixation murale, objets qui ressemblent à des aliments.',
  title: 'Céramique et objets déco fait main : GPSR et contact alimentaire',
  description: 'Céramique, verre, bois, résine : quand le GPSR suffit, quand les règles contact alimentaire s’ajoutent (règl. 1935/2004), casse et fixation. Exemple rempli.',
  h1: 'Céramique et décoration fait main : le GPSR, et quand il ne suffit pas',
  citation: ['gpsr', 'fcm', 'guidelines'],
  lead: `<p>Un vase, une suspension en macramé ou une statuette sont des produits GPSR ordinaires : analyse de risques, référence et coordonnées sur l’objet, quatre informations dans l’annonce (${art(19)}). Tout change dès que l’objet peut contenir des aliments ou des boissons (tasse, bol, assiette, planche) : le ${cite('fcm', 'règlement (CE) 1935/2004')} sur les matériaux au contact des denrées s’applique, et pour la céramique la directive 84/500/CEE fixe des limites de migration du plomb et du cadmium. Le GPSR ne couvre alors que les risques que ces textes ne traitent pas (${art(2, 'art. 2 §1')}).</p>`,
  body: `<h2>Décoratif ou alimentaire, la question à trancher d’abord</h2>
<p>L’usage prévisible compte plus que votre intention. Un bol vendu « décoratif » qui ressemble à un bol de petit-déjeuner servira à manger. Si un acheteur peut raisonnablement y mettre des aliments, traitez l’objet comme un matériau au contact des denrées, ou rendez l’usage alimentaire clairement impossible (forme, trou, mention visible avant l’achat).</p>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Objet</th><th scope="col">Règles principales</th><th scope="col">Rôle du GPSR</th></tr></thead>
<tbody>
<tr><th scope="row">Vase, cache-pot, statuette, bougeoir</th><td>GPSR seul</td><td>Tout le règlement : analyse de risques, mentions, annonce, réclamations</td></tr>
<tr><th scope="row">Mug, bol, assiette en céramique</th><td>Règlement 1935/2004 et directive 84/500/CEE (plomb et cadmium)</td><td>Risques non chimiques (casse, choc thermique) et annonce (art. 19)</td></tr>
<tr><th scope="row">Planche, cuillère en bois</th><td>Règlement 1935/2004</td><td>Échardes, casse, annonce</td></tr>
<tr><th scope="row">Décoration murale, étagère</th><td>GPSR seul</td><td>Fixation, charge, chute</td></tr>
<tr><th scope="row">Lampe, guirlande lumineuse</th><td>Directive basse tension, marquage CE</td><td>Annonce (art. 19) et accidents (art. 20) ; ce kit ne suffit pas</td></tr>
</tbody></table></div>
<p>Pour la vaisselle vendue neuve, le règlement 1935/2004 demande la mention « convient pour aliments » (ou une mention précise sur leur emploi) ou le symbole verre et fourchette de son annexe II (${cite('fcm', 'art. 15 §1 a')}). La directive 84/500/CEE fixe pour les céramiques des limites de plomb et de cadmium extraits lors d’un essai : 4,0 mg/l de plomb et 0,3 mg/l de cadmium pour un mug ou un bol (catégorie 2), 0,8 et 0,07 mg/dm² pour une assiette plate (catégorie 1). Elle exige aussi une déclaration écrite de conformité (art. 2 bis). Nous n’avons trouvé aucune révision de cette directive publiée depuis 2005. Demandez à votre fournisseur d’émail ses données de migration pour la température de cuisson que vous utilisez. Ce kit s’arrête là : il ne remplace pas un essai de migration.</p>

<h2>Les risques d’un objet de décoration</h2>
${hazardTable(['breakage', 'stability', 'sharp', 'chemicals', 'food_like'])}
<p>Le dernier risque surprend souvent. Le GPSR demande d’évaluer les produits qui, sans être des aliments, leur ressemblent et risquent d’être confondus avec eux (${art(6, 'art. 6 §1, f')}). Les lignes directrices de la Commission citent l’exemple des articles décoratifs en forme de fruits. Une pomme en céramique de la taille d’une vraie, posée dans une corbeille, pose cette question ; un vase à motif fruits, non.</p>

<h2>Ce qui change selon le matériau</h2>
<p>Le bois brut pose des questions d’échardes et de finition : un vernis ou une huile doit être complètement sec avant la vente, et sa fiche de données de sécurité reste dans votre dossier. Le verre et la céramique cassent : l’emballage d’expédition fait partie des mesures, et un objet fêlé ne part pas. La résine époxy n’est inerte qu’une fois durcie selon la notice du fabricant ; notez le temps de durcissement dans votre registre de lots.</p>
<p>Pour une décoration murale lourde, précisez dans la notice le type de cheville et la charge maximale. C’est une instruction de sécurité, à rédiger en français pour la France (${art(9, 'art. 9 §7')}) et à reprendre dans l’annonce (art. 19 d).</p>

<h2>Exemple rempli pour un vase</h2>
${example({ ...MAKER, productName: 'Vase en grès émaillé « Dune », 20 cm', productRef: 'VASE-DUNE-20', batch: 'CUISSON 2026-41', category: 'decor', materials: 'Grès, émail sans plomb (fiche fournisseur), cuisson 1 280 °C', intendedUse: 'Vase décoratif pour fleurs, usage intérieur.', misuse: 'Utilisé comme récipient alimentaire ; posé au bord d’une étagère.', hazards: ['breakage'] }, { caption: 'Exemple fictif généré par le générateur gratuit le 17 octobre 2026 (document « Étiquette, emballage et annonce »).' })}
<p>La référence et la marque peuvent être gravées ou tamponnées sous l’objet avant cuisson. L’adresse complète, si elle ne tient pas, va sur l’étiquette ou un document joint (${art(9, 'art. 9 §6')}).</p>

<h2>Quelle filière REP pour un objet déco en France ?</h2>
<p>Vos emballages d’expédition relèvent presque toujours de la filière emballages ménagers. Les textiles de décoration (coussins, rideaux, plaids) relèvent de la filière ameublement. Pour un objet en céramique, en verre ou en bois, vérifiez la filière dans la ${link('https://filieres-rep.ademe.fr/faq', 'FAQ de l’ADEME')} avant d’adhérer à un éco-organisme.</p>`,
  faq: [
    ['Mon mug est vendu comme décoratif : les règles contact alimentaire s’appliquent-elles ?', 'Si un acheteur peut raisonnablement y boire, oui. C’est l’usage prévisible qui compte. Soit vous le traitez comme un matériau au contact des denrées (règlement 1935/2004, directive 84/500/CEE), soit vous rendez l’usage alimentaire clairement impossible.'],
    ['Faut-il faire tester mes émaux ?', 'Pour la vaisselle, la migration du plomb et du cadmium doit respecter la directive 84/500/CEE. Les données du fournisseur d’émail sont le point de départ ; un essai de migration sur vos pièces cuites est la preuve la plus solide. Pour un objet purement décoratif, ces limites ne s’appliquent pas.'],
    ['Une décoration en forme de fruit est-elle interdite ?', 'Non. Le GPSR demande d’évaluer le risque de confusion avec un aliment (art. 6 §1, f), en particulier pour les enfants. La taille, l’aspect, l’odeur et l’endroit où l’objet est posé comptent. Un avertissement seul ne suffit pas toujours.'],
    ['Où mettre mes coordonnées sur une petite céramique ?', 'Sous l’objet si la taille le permet (gravure, tampon). Sinon, sur l’emballage ou un document joint. Seule la taille justifie ce report, selon les lignes directrices de la Commission.'],
  ],
  cta: {
    title: 'Générez la fiche sécurité de votre objet',
    text: 'Catégorie « Décoration, céramique, verre, bois » : risques de casse et de fixation pré-remplis, texte d’annonce prêt à coller.',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
    note: packNote('un modèle « décoration et céramique » rempli et une fiche « exclusions » qui oriente vers les textes contact alimentaire'),
  },
  related: ['etiquetage-bougie', 'gpsr-etsy', 'gpsr-shopify', 'modeles-gpsr'],
  sources: [SRC.gpsr, SRC.fcm, ['Directive 84/500/CEE (objets céramiques en contact avec les denrées alimentaires), version consolidée du 20 mai 2005', 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:01984L0500-20050520'], SRC.guidelines, ['ADEME : FAQ filières REP', 'https://filieres-rep.ademe.fr/faq']],
};

/* ---------------------------------------------- articles enfants non-jouets */
export const enfants = {
  slug: 'articles-enfants-non-jouets-gpsr',
  group: 'categories',
  crumb: 'Articles enfants (non-jouets)',
  teaser: 'Bavoirs, attache-tétines, vêtements bébé, déco de chambre : la frontière avec le jouet et les règles qui restent.',
  title: 'Articles enfants fait main (non-jouets) : GPSR et normes',
  description: 'Bavoir, attache-tétine, vêtement bébé, déco de chambre : jouet ou non, phtalates REACH, normes EN 12586 et EN 14682, mentions GPSR. Exemple rempli.',
  h1: 'Articles pour enfants qui ne sont pas des jouets : ce que le GPSR demande',
  citation: ['gpsr', 'toys', 'reachNickel', 'reachLead'],
  lead: `<p>Un bavoir, un attache-tétine, une gigoteuse ou une guirlande de chambre ne sont pas des jouets : c’est le GPSR qui s’applique en entier, avec une exigence de plus. Les enfants font partie des consommateurs vulnérables que l’évaluation de sécurité prend en compte explicitement (${art(6, 'art. 6 §1, e')}). S’y ajoutent des limites REACH propres aux « articles de puériculture » (phtalates) et des normes dédiées pour les attache-sucettes et les cordons de vêtements. Tout commence par une question : votre objet est-il conçu pour que l’enfant joue avec ? Si oui, c’est un jouet, et ce kit ne suffit pas.</p>`,
  body: `<h2>Jouet ou pas jouet : la définition qui tranche</h2>
<p>Un jouet est un produit conçu ou destiné, exclusivement ou non, à être utilisé à des fins de jeu par des enfants de moins de 14 ans (${cite('toys', 'directive 2009/48/CE, art. 2')}). Le « ou non » compte : un objet à la fois décoratif et manipulable par un enfant peut être un jouet. Un doudou, un hochet, une peluche ou un livre en tissu sont des jouets. Un bavoir, un attache-tétine, une couverture ou un vêtement n’en sont pas.</p>
<p>Si vous hésitez, lisez ${go('/jouet-ou-pas-jouet.html', 'notre page d’orientation sur les jouets')}. Elle reprend la liste des produits que la directive exclut et ce que le GPSR ajoute pour les jouets vendus en ligne.</p>

<h2>Les règles propres aux articles de puériculture</h2>
<p>REACH définit l’article de puériculture comme « tout produit destiné à faciliter le sommeil, la relaxation, l’hygiène, l’alimentation ou la succion des enfants ». Un bavoir, un attache-tétine, une gigoteuse ou une cape de bain en font partie.</p>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Règle</th><th scope="col">Ce qu’elle vise</th><th scope="col">Texte</th></tr></thead>
<tbody>
<tr><th scope="row">Phtalates DEHP, DBP, BBP, DIBP : moins de 0,1 % de la matière plastifiée</th><td>Jouets et articles de puériculture (bavoir plastifié, perles en plastique souple)</td><td>${cite('reach', 'REACH, entrée 51')}</td></tr>
<tr><th scope="row">Phtalates DINP, DIDP, DNOP : 0,1 % au plus</th><td>Jouets et articles de puériculture que l’enfant peut mettre en bouche</td><td>${cite('reach', 'REACH, entrée 52')}</td></tr>
<tr><th scope="row">Plomb : moins de 0,05 % (sauf libération très faible démontrée)</th><td>Articles grand public ou parties accessibles qu’un enfant peut mettre en bouche, dont une dimension fait moins de 5 cm</td><td>${cite('reach', 'REACH, entrée 63, §7')}</td></tr>
<tr><th scope="row">Norme NF EN 12586</th><td>Attache-sucettes : longueur, résistance, petites pièces</td><td>${cite('en12586', 'Catalogue AFNOR')}</td></tr>
<tr><th scope="row">Norme NF EN 14682</th><td>Cordons et cordons coulissants des vêtements d’enfants</td><td>${cite('en14682', 'Catalogue AFNOR')}</td></tr>
</tbody></table></div>
<p>Les normes sont payantes et nous n’en reproduisons pas le contenu. Elles ne sont pas obligatoires, mais elles n’ont pas le même poids. La norme EN 14682:2014 (cordons) figure dans la ${cite('std2026', 'décision d’exécution (UE) 2026/901')}, qui publie les normes du GPSR : la respecter vaut présomption de sécurité pour les risques qu’elle couvre (${art(7, 'art. 7 §1')}). La norme EN 12586 (attache-sucettes) n’y figure pas ; c’est un élément que les autorités prennent en compte pour juger si l’article est sûr (${art(8, 'art. 8 §1 a')}), et la référence technique de ce produit.</p>

<h2>Les risques à analyser, enfant par enfant</h2>
<p>L’âge change tout : un enfant de moins de 3 ans porte les objets à la bouche, un enfant de 4 ans tire dessus. Le générateur ajoute automatiquement le risque « petites pièces » dès que vous cochez des utilisateurs enfants.</p>
${hazardTable(['small_parts', 'cords', 'magnets_batteries', 'chemicals'])}
<p>Pour chaque risque, la mesure de conception passe avant l’avertissement. Un attache-tétine dont les perles se détachent ne devient pas sûr parce que l’étiquette le signale : il faut un fil et un nœud qui résistent, que vous testez et notez dans votre documentation (${art(9, 'art. 9 §2')}).</p>

<h2>Exemple rempli pour un attache-tétine</h2>
${example({ ...MAKER, productName: 'Attache-tétine perles de silicone « Nuage »', productRef: 'AT-NUAGE-01', batch: 'LOT 2026-10', category: 'childcare', materials: 'Perles de silicone alimentaire, fil polyester tressé, clip plastique (déclarations fournisseurs REACH entrées 51, 52 et 63)', intendedUse: 'Relier une sucette au vêtement d’un bébé, sous la surveillance d’un adulte.', misuse: 'Utilisé comme jouet de dentition ; laissé dans le lit pendant le sommeil ; perles mâchées.', users: ['under3'], hazards: ['small_parts', 'cords'], warnings: 'Ne jamais allonger l’attache-tétine ni l’attacher autour du cou.\nVérifier avant chaque utilisation ; jeter au premier signe d’usure.' }, { caption: 'Exemple fictif généré par le générateur gratuit le 17 octobre 2026 (document « Étiquette, emballage et annonce »).' })}
<p>Les deux avertissements ajoutés à la main sont des exemples : la norme EN 12586 fixe ses propres mentions, à reprendre telles quelles si vous l’appliquez.</p>

<h2>Ce que le GPSR n’exige pas pour un article enfant</h2>
<ul>
<li>Pas de marquage CE, tant que l’objet n’est pas un jouet.</li>
<li>Pas d’âge minimum imposé sur l’étiquette : c’est la mention « Ne convient pas aux enfants de moins de 36 mois » de la directive jouets, qui ne s’applique qu’aux jouets. Pour un article de puériculture, indiquez l’âge et l’usage prévus dans vos instructions.</li>
<li>Pas d’essai en laboratoire imposé par le GPSR. La norme dédiée, si elle existe, en prévoit ; c’est souvent le moyen le plus simple de montrer que l’article est sûr.</li>
</ul>`,
  faq: [
    ['Un attache-tétine est-il un jouet ?', 'Non : il sert à relier la sucette au vêtement, pas à jouer. C’est un article de puériculture, couvert par le GPSR, les entrées 51 et 52 de REACH et la norme NF EN 12586. S’il est conçu comme un jouet de dentition, la question se pose autrement.'],
    ['Une peluche décorative pour chambre d’enfant est-elle un jouet ?', 'Très probablement. La directive vise les produits destinés, « exclusivement ou non », au jeu des moins de 14 ans : une peluche à portée d’enfant sera utilisée pour jouer. Traitez-la comme un jouet, avec le marquage CE et les essais qui vont avec.'],
    ['Dois-je acheter la norme EN 12586 ?', 'Le GPSR ne l’impose pas, et sa référence ne figure pas dans la liste des normes publiées au titre du règlement (décision d’exécution 2026/901). C’est pourtant la référence technique des attache-sucettes, que les autorités prennent en compte (art. 8). Sans elle, vous devez démontrer la sécurité autrement, ce qui est plus difficile.'],
    ['Les vêtements bébé relèvent-ils de cette page ou de la page textile ?', 'Des deux : composition et substances sont sur la page textile, les cordons et petites pièces ici. Un vêtement n’est pas un jouet, même décoré.'],
  ],
  cta: {
    title: 'Générez la fiche sécurité de votre article enfant',
    text: 'Catégorie « Articles pour enfants qui ne sont pas des jouets » : risques petites pièces et cordons ajoutés d’office, avertissements à adapter.',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
    note: packNote('un modèle « articles enfants (non-jouets) » rempli et la fiche « exclusions » qui renvoie vers la directive jouets'),
  },
  related: ['jouet-ou-pas-jouet', 'vetements-textile-gpsr', 'reglementation-bijoux-gpsr', 'modeles-gpsr'],
  sources: [SRC.toys, SRC.reach, SRC.gpsr, SRC.std2026, SRC.en12586, SRC.en14682],
};

export const CATEGORY_GUIDES = [bijoux, textile, deco, enfants];
export { OBLIG };
