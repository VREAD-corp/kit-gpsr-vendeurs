// P1 « Personne responsable GPSR » and P7 « Modèles GPSR » (plan seo/gpsr.md §4).
// Quotes of Regulation (EU) 2023/988 and 2019/1020 re-read on the Publications Office text on 2026-10-17
// (consolidated 02023R0988-20260529 and 02019R1020-20260812: the articles quoted here are unchanged).
import { FREE_PACK, SITE } from '../layout.mjs';
import { gallery } from '../marketing.mjs';
import { compareTable } from '../pack-page.mjs';
import { MAKER, PACK, TOOL, art, example, go, link } from './common.mjs';
import { SRC, cite } from './sources.mjs';

const MSR4 = `${SRC.msr[1]}#art_4`;
const msr = (text) => `<a href="${MSR4}">${text}</a>`;

/* ------------------------------------------------------- personne responsable */
export const personneResponsable = {
  slug: 'personne-responsable-gpsr',
  group: 'general',
  crumb: 'Personne responsable GPSR',
  teaser: 'Fabricant établi en France : vous êtes déjà l’opérateur établi dans l’UE. Les cas où il faut en désigner une.',
  title: 'Personne responsable GPSR : qui en a besoin, qui l’est déjà',
  description: 'Fabricant établi en France ? Vous êtes déjà l’opérateur établi dans l’UE (art. 16 et 19 b du GPSR). Les cas où une personne responsable est à désigner.',
  h1: 'Personne responsable GPSR : qui doit en désigner une, et qui l’est déjà',
  citation: ['gpsr', 'msr', 'guidelines', 'cosmetics'],
  lead: `<p>Si vous fabriquez vos produits et que votre entreprise est établie en France, vous n’avez aucune personne responsable à désigner ni à payer. Le règlement (UE) 2023/988 exige qu’un opérateur économique établi dans l’Union soit responsable de chaque produit (${art(16, 'art. 16 §1')}), et le premier opérateur que la loi accepte pour ce rôle est « un fabricant établi dans l’Union » (${msr('art. 4 §2 a du règlement (UE) 2019/1020')}). Votre annonce ne mentionne une personne responsable que « lorsque le fabricant n’est pas établi dans l’Union » (${art(19, 'art. 19 b')}). Vos nom et adresses de fabricant suffisent.</p>
<p>Le besoin réel concerne les fabricants installés hors de l’Union (Royaume-Uni, États-Unis, Chine, Suisse) et ceux qui revendent leurs produits. Le tableau plus bas couvre ces cas.</p>`,
  body: `<h2>Ce que disent les textes</h2>
<p>Le mot « personne responsable » vient de l’article 16 du GPSR, qui renvoie lui-même à l’article 4 du règlement (UE) 2019/1020 sur la surveillance du marché. Les trois passages qui comptent, dans la version française publiée au Journal officiel :</p>
<blockquote><p>« Un produit couvert par le présent règlement n’est mis sur le marché que s’il existe un opérateur économique établi dans l’Union qui est responsable des tâches visées à l’article 4, paragraphe 3, du règlement (UE) 2019/1020 en ce qui concerne ce produit. »</p><cite>${art(16, 'Règlement (UE) 2023/988, art. 16 §1')}</cite></blockquote>
<blockquote><p>« [...] l’opérateur économique visé au paragraphe 1 est l’une des personnes suivantes : a) un fabricant établi dans l’Union ; b) un importateur, lorsque le fabricant n’est pas établi dans l’Union ; c) un mandataire disposant d’un mandat écrit du fabricant [...] ; d) un prestataire de services d’exécution de commandes établi dans l’Union [...], lorsqu’aucun des opérateurs économiques mentionnés aux points a), b) et c) n’est établi dans l’Union. »</p><cite>${msr('Règlement (UE) 2019/1020, art. 4 §2')}</cite></blockquote>
<blockquote><p>« b) lorsque le fabricant n’est pas établi dans l’Union, le nom, l’adresse postale et électronique de la personne responsable [...] »</p><cite>${art(19, 'Règlement (UE) 2023/988, art. 19 b')}</cite></blockquote>
<p>L’ordre de la liste a un sens. Le mandataire (point c) n’est qu’une option parmi d’autres, et le prestataire logistique (point d) n’intervient que si aucun des trois premiers n’est établi dans l’Union. Les lignes directrices de la Commission reprennent la même liste, en commençant par « un fabricant établi dans l’UE » (${cite('guidelines', 'C/2025/6233, point 3.2')}).</p>

<h2>Votre situation, cas par cas</h2>
<p>Le rôle dépend de ce que vous faites du produit, pas de votre statut (micro-entreprise, EI, SAS). Nous avons repris les situations décrites dans les fils de discussion sur le RSGP des forums vendeurs d’Etsy et d’Amazon.</p>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Vous…</th><th scope="col">Votre rôle</th><th scope="col">L’opérateur établi dans l’UE</th><th scope="col">Dans l’annonce</th></tr></thead>
<tbody>
<tr><th scope="row">fabriquez vous-même, en France</th><td>Fabricant (${art(3, 'art. 3 point 8')})</td><td>Vous</td><td>Vos nom et adresses (a). Pas de ligne b</td></tr>
<tr><th scope="row">faites fabriquer par un atelier, en France ou ailleurs, et vendez sous votre nom ou votre marque</th><td>Fabricant (art. 3 point 8 et ${art(13, 'art. 13 §1')})</td><td>Vous, si votre entreprise est établie dans l’UE</td><td>Vos nom et adresses (a)</td></tr>
<tr><th scope="row">revendez le produit d’un fabricant français ou européen (grossiste, autre créateur)</th><td>Distributeur (${art(12, 'art. 12')})</td><td>Le fabricant</td><td>Les coordonnées du fabricant (a), que vous vérifiez avant la vente (art. 12 §1)</td></tr>
<tr><th scope="row">achetez hors UE (Chine, Royaume-Uni, États-Unis) et revendez sans votre marque</th><td>Importateur (art. 3 point 10, ${art(11, 'art. 11')})</td><td>Vous, en tant qu’importateur</td><td>Le fabricant (a) et vos propres coordonnées comme personne responsable (b). Vos nom et adresses figurent aussi sur le produit (art. 11 §3)</td></tr>
<tr><th scope="row">êtes un créateur établi au Royaume-Uni ou aux États-Unis</th><td>Fabricant hors UE</td><td>Un importateur, un mandataire avec mandat écrit, ou un prestataire d’exécution des commandes établi dans l’UE</td><td>Vos coordonnées (a) et celles de cette personne (b)</td></tr>
<tr><th scope="row">revendez de l’occasion comme professionnel</th><td>Distributeur, le plus souvent</td><td>Le fabricant d’origine s’il est identifiable</td><td>Les informations disponibles ; voir notre ${go('/gpsr-vinted-pro.html', 'guide Vinted Pro')}</td></tr>
</tbody></table></div>
<p>Deux situations n’ont pas de réponse écrite dans les textes, et nous ne voulons pas en inventer une.</p>
<ul>
<li><strong>Impression à la demande.</strong> Si le produit est vendu sous votre nom ou votre marque, la définition du fabricant vous désigne (art. 3 point 8 : celui qui « fait concevoir ou fabriquer un produit, et le commercialise sous son propre nom ou sa propre marque »). Les lignes directrices donnent un exemple proche : une entreprise qui appose son logo sur des tasses achetées à un autre producteur en devient le fabricant (point 3.1.1). C’est notre lecture, pas une position de la Commission sur l’impression à la demande.</li>
<li><strong>Dropshipping depuis un fournisseur hors UE.</strong> Les lignes directrices ne mentionnent pas ce modèle. Le produit ne peut être mis sur le marché que si un opérateur établi dans l’Union en a la responsabilité (art. 16 §1). Faites-vous confirmer par écrit qui tient ce rôle avant de vendre. Si personne ne le tient, ne vendez pas.</li>
</ul>

<h2>Ce que fait une personne responsable</h2>
<p>Ses tâches sont celles de l’article 4 §3 du règlement 2019/1020, appliquées au GPSR : garder la documentation technique à disposition des autorités, leur fournir sur demande les informations qui démontrent la sécurité du produit, les informer s’il y a lieu de penser qu’un produit présente un risque, et coopérer aux mesures correctives. Le GPSR ajoute des vérifications régulières : le produit correspond-il à sa documentation technique, et porte-t-il bien sa référence, les coordonnées du fabricant et les instructions en français (${art(16, 'art. 16 §2')}) ? Ses nom et adresses figurent sur le produit, l’emballage, le colis ou un document joint (art. 16 §3).</p>
<p>Quand vous êtes fabricant établi en France, ces tâches sont les vôtres de toute façon : vous tenez la documentation (${art(9, 'art. 9 §2 et §3')}) et vous répondez aux autorités.</p>

<h2>Où l’indiquer sur les plateformes</h2>
<p>Chaque plateforme a son champ, et aucune ne vous oblige à désigner un tiers si vous êtes le fabricant établi dans l’UE.</p>
<ul>
<li>Etsy : le profil « opérateur économique » et le champ « Fabricants » de l’annonce. Voir le ${go('/gpsr-etsy.html', 'guide Etsy')}.</li>
<li>Amazon : les coordonnées du fabricant et de la personne responsable dans Seller Central. Voir le ${go('/gpsr-amazon.html', 'guide Amazon')}.</li>
<li>Vinted Pro : le champ « Informations sur le fabricant » de l’annonce. Voir le ${go('/gpsr-vinted-pro.html', 'guide Vinted Pro')}.</li>
<li>Votre boutique Shopify : un bloc sur chaque fiche produit. Voir le ${go('/gpsr-shopify.html', 'guide Shopify')}.</li>
</ul>

<h2>Les services de « personne responsable », utiles à qui ?</h2>
<p>Ces services existent pour une raison : un créateur britannique ou américain qui vend dans l’Union a besoin d’un opérateur établi ici. Pour lui, un mandataire avec un mandat écrit est une vraie solution. Pour un créateur français, c’est une dépense sans objet. Trois signaux doivent vous alerter :</p>
<ul>
<li>on vous dit que tout vendeur, même établi en France, doit désigner une personne responsable ;</li>
<li>le contrat ne prévoit pas comment le mandataire accédera à votre documentation technique, alors qu’il doit pouvoir la fournir aux autorités (art. 4 §3 du règlement 2019/1020) ;</li>
<li>le service se présente comme une « certification GPSR » : le règlement ne prévoit aucun certificat de ce type.</li>
</ul>
<p>Nous ne vendons pas ce service et READ FRANCE SAS n’agit jamais comme personne responsable. Cette page n’a donc rien à vous en vendre.</p>

<h2>Ne pas confondre avec la personne responsable cosmétique</h2>
<p>Le mot est le même, le rôle ne l’est pas. Pour un savon, un baume ou une bombe de bain, le ${cite('cosmetics', 'règlement (CE) 1223/2009')} exige une « personne responsable » au sens cosmétique (art. 4), avec un rapport de sécurité et une notification avant la mise sur le marché. Un fabricant de cosmétiques établi en France peut tenir ce rôle lui-même, mais ses obligations vont bien au-delà du GPSR : voir ${go('/savons-cosmetiques-gpsr.html', 'notre page d’orientation sur les cosmétiques')}.</p>

<h2>Exemple d’annonce d’un créateur établi en France</h2>
<p>Le générateur gratuit écrit « Sans objet » à la ligne b dès que vous indiquez un fabricant établi dans l’UE. Voici sa sortie pour un sac en lin vendu par un atelier fictif :</p>
${example({ ...MAKER, productName: 'Sac cabas en lin lavé', productRef: 'SAC-LIN-01', batch: 'LOT 2026-10', category: 'textile', materials: 'Lin lavé 100 %, anses en coton', intendedUse: 'Sac de courses pour adultes, charge jusqu’à 8 kg.', misuse: 'Surchargé ; utilisé comme jeu par un enfant.' }, { caption: 'Exemple fictif généré par le générateur gratuit le 17 octobre 2026 (document « Étiquette, emballage et annonce »).' })}`,
  faq: [
    ['Puis-je être ma propre personne responsable ?', 'Si vous êtes le fabricant et que votre entreprise est établie dans l’Union, vous l’êtes déjà, sans démarche : l’article 4 §2 a du règlement 2019/1020 cite le fabricant établi dans l’Union en premier. Vous n’avez rien à « désigner » ; vous remplissez la ligne fabricant de vos annonces.'],
    ['Une micro-entreprise doit-elle payer un mandataire ?', 'Non, si elle fabrique ou fait fabriquer sous son nom et qu’elle est établie en France. Le GPSR ne prévoit pas d’exemption pour les petites entreprises, mais il n’impose pas non plus de tiers quand le fabricant est établi dans l’Union.'],
    ['Faut-il mettre l’adresse de mon domicile ?', 'Le texte demande « l’adresse postale et électronique à laquelle [le fabricant] peut être contacté » (art. 19 a). Il n’impose pas le domicile : une adresse professionnelle ou une domiciliation où le courrier vous parvient répond à cette définition.'],
    ['Mon fournisseur chinois ne répond pas à mes demandes d’informations. Que faire ?', 'Si vous importez, c’est vous l’opérateur établi dans l’Union, avec les obligations de l’importateur (art. 11) : vous vérifiez que le fabricant a établi sa documentation et apposé ses coordonnées. Sans ces informations, ne mettez pas le produit en vente.'],
    ['Un site internet suffit-il comme adresse électronique ?', 'Non. Les lignes directrices de la Commission précisent qu’« un site internet ne suffit pas en soi s’il ne permet pas de communiquer directement avec vous ». Une adresse e-mail ou un formulaire de contact convient.'],
  ],
  cta: {
    title: 'Mettez vos coordonnées de fabricant dans vos documents',
    text: 'Le générateur remplit la fiche sécurité, le texte d’étiquette et le bloc d’annonce (art. 19 a à d) à partir de vos réponses. Gratuit, rien n’est envoyé.',
    href: TOOL, label: 'Générer ma fiche gratuitement',
    note: `Vous revendez ou importez ? Le ${link(PACK, 'pack GPSR (29 € net)')} contient un questionnaire fournisseur bilingue et une fiche de suivi « fabricant hors UE ».`,
  },
  related: ['gpsr-etsy', 'gpsr-amazon', 'gpsr-vinted-pro', 'modeles-gpsr'],
  sources: [SRC.gpsr, SRC.msr, SRC.guidelines, SRC.cosmetics],
};

/* ---------------------------------------------------------------- modèles */
const riskRows = [
  ['Flamme nue', 'Bougie laissée allumée sans surveillance près d’un rideau', '4', '2', '8, élevé', 'Mèche testée pour ce diamètre, avertissements sur l’étiquette, pot qui ne se fend pas', '4, moyen'],
  ['Surface chaude', 'Pot déplacé pendant la combustion', '2', '3', '6, moyen', 'Avertissement « ne pas déplacer allumée », pot épais', '4, moyen'],
  ['Substances chimiques', 'Réaction cutanée au contact de la cire parfumée', '1', '2', '2, faible', 'Dosage du parfum selon la fiche fournisseur, mentions CLP si le mélange est classé', '2, faible'],
];

export const modeles = {
  slug: 'modeles-gpsr',
  group: 'modeles',
  crumb: 'Modèles GPSR',
  teaser: 'Analyse de risques, registre des réclamations, procédure de rappel : ce que chaque document doit contenir.',
  title: 'Modèles GPSR : analyse de risques, rappel, registre (exemples)',
  description: 'Documents GPSR d’un fabricant : analyse de risques, registre des réclamations, procédure et avis de rappel. Ce que contient chacun, exemples remplis.',
  h1: 'Modèles de documents GPSR pour petits fabricants, avec exemples remplis',
  citation: ['gpsr', 'guidelines', 'recallTemplate', 'l4233', 'sbg'],
  lead: `<p>Le GPSR demande à tout fabricant, même individuel, de tenir quatre choses par écrit : une analyse de risques dans une documentation technique conservée 10 ans (${art(9, 'art. 9 §2 et §3')}), un registre des réclamations, rappels et mesures correctives (${art(9, 'art. 9 §12')}), un canal public pour recevoir les réclamations (art. 9 §11), et de quoi organiser un rappel avec un avis au contenu imposé (${art(36, 'art. 36')}) et des remèdes au choix du client (${art(37, 'art. 37')}). Le règlement n’impose aucun format : un document Word ou un tableur suffit. Cette page décrit ce que chaque document doit contenir, avec un exemple rempli pour une bougie, puis ce qui est gratuit et ce que contient le pack.</p>`,
  body: `<h2>Les documents, article par article</h2>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Document</th><th scope="col">Ce que dit le texte</th><th scope="col">Durée</th><th scope="col">Où le trouver</th></tr></thead>
<tbody>
<tr><th scope="row">Analyse de risques et documentation technique</th><td>Avant la mise sur le marché, au moins une description du produit et de ses caractéristiques utiles pour la sécurité ; le cas échéant l’analyse des risques, les solutions retenues, les essais et les normes appliquées (${art(9, 'art. 9 §2')})</td><td>10 ans après la mise sur le marché (art. 9 §3)</td><td>Générateur gratuit (analyse de risques) ; pack (sommaire du dossier, registre des lots, méthode)</td></tr>
<tr><th scope="row">Registre des réclamations, rappels et mesures correctives</th><td>Le fabricant examine les réclamations et tient un registre interne (art. 9 §12)</td><td>Données personnelles : 5 ans au plus après leur saisie (art. 9 §13)</td><td>Pack (DOCX et CSV)</td></tr>
<tr><th scope="row">Canal de réclamation public</th><td>Téléphone, adresse électronique ou section du site (art. 9 §11)</td><td>Permanent</td><td>Votre page contact ; rappelé dans la fiche sécurité du générateur</td></tr>
<tr><th scope="row">Procédure de rappel et avis de rappel</th><td>Avis intitulé « Rappel de produit pour des raisons de sécurité » (art. 36 §2 a), modèle fixé par le ${cite('recallTemplate', 'règlement d’exécution (UE) 2024/1435')}</td><td>À préparer avant l’incident</td><td>Pack (procédure, calendrier, modèle d’avis)</td></tr>
<tr><th scope="row">Remèdes proposés au client</th><td>Au moins deux au choix parmi réparation, remplacement, remboursement ; frais de retour à la charge de l’opérateur (art. 37 §2 et §5)</td><td>Pendant le rappel</td><td>Pack (procédure)</td></tr>
<tr><th scope="row">Déclaration de rappel en France</th><td>Déclaration sur le site RappelConso (${cite('rappelconso', 'Code de la consommation, art. L423-3')})</td><td>Dès le rappel</td><td>${link('https://rappel.conso.gouv.fr/', 'rappel.conso.gouv.fr')}</td></tr>
<tr><th scope="row">Notification d’accident grave</th><td>Par le ${cite('sbg', 'Safety Business Gateway')} de la Commission, sans retard injustifié (${art(20, 'art. 20')})</td><td>Dès l’accident connu</td><td>Formulaire en ligne de la Commission</td></tr>
</tbody></table></div>

<h2>L’analyse de risques, remplie pour une bougie</h2>
<p>Les lignes directrices de la Commission proposent un modèle de documentation technique en trois parties : identification du produit, caractéristiques et composition, puis « analyse des risques et mesures d’atténuation des risques », risque par risque. Elles précisent : « Ce modèle n’est pas obligatoire » (${cite('guidelines', 'C/2025/6233, point 3.1.1')}). Le générateur gratuit suit cette structure et ajoute une cotation simple, gravité (G) de 1 à 4 multipliée par probabilité (P) de 1 à 4 : de 1 à 3 le risque est faible, de 4 à 6 moyen, de 8 à 16 élevé.</p>
<p>Voici trois lignes remplies pour une bougie parfumée en pot. Les cotations sont un exemple fictif : elles dépendent de vos essais.</p>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Danger</th><th scope="col">Scénario</th><th scope="col">G</th><th scope="col">P</th><th scope="col">Risque</th><th scope="col">Mesures</th><th scope="col">Risque résiduel</th></tr></thead>
<tbody>${riskRows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</tbody>
</table></div>
<p>Un risque élevé se réduit d’abord par la conception (mèche, contenant), pas par un avertissement de plus. Gardez avec l’analyse ce qui la justifie : vos fiches de combustion, les fiches de données de sécurité du fournisseur, les photos de l’étiquette. Pour aller plus loin, la Commission publie une méthode d’évaluation détaillée (${cite('rag', 'décision d’exécution (UE) 2019/417')}).</p>

<h2>Le registre des réclamations : les colonnes utiles</h2>
<p>Le règlement ne fixe pas de colonnes. Celles que nous avons retenues pour le registre du pack suivent ce que les articles 9 §12, 9 §13 et 20 obligent à retrouver : date de réception, canal (e-mail, message Etsy, téléphone), produit et lot concernés, description du problème, accident ou non, gravité, examen mené, mesure prise, date de clôture, et date de suppression des données personnelles (5 ans au plus). Une ligne par réclamation, y compris celles qui se révèlent sans fondement.</p>
<p>Une réclamation du type « la flamme est montée très haut » se note même si le client ne demande rien. Trois réclamations sur le même lot sont le signal qui doit vous faire rouvrir l’analyse de risques.</p>

<h2>Un rappel, étape par étape</h2>
<ol class="steps-list">
<li>Arrêtez la vente des lots concernés et identifiez les clients à partir de vos commandes.</li>
<li>Prenez les mesures correctives et informez les autorités par le Safety Business Gateway (${art(9, 'art. 9 §8')}).</li>
<li>Prévenez directement chaque client identifiable, sans retard (${art(35, 'art. 35 §1')}).</li>
<li>Publiez l’avis de rappel intitulé « Rappel de produit pour des raisons de sécurité », sur le modèle du règlement d’exécution 2024/1435. L’avis décrit le danger sans l’atténuer : le texte écarte des termes comme « volontaire » ou « précaution » et toute mention selon laquelle aucun accident n’a été signalé (art. 36 §2 c). Il donne un numéro de téléphone gratuit ou un service en ligne pour les questions (art. 36 §2 f).</li>
<li>Proposez au moins deux remèdes et prenez les frais de retour à votre charge (art. 37).</li>
<li>Déclarez le rappel sur RappelConso et inscrivez-le dans votre registre.</li>
</ol>

<h2>Ce qui est gratuit, ce que contient le pack</h2>
<p>Le générateur et le ${link(FREE_PACK, 'paquet de modèles gratuits (ZIP, licence CC BY 4.0)')} couvrent ce que vous affichez et ce que vous gardez dès la mise en vente. Le pack ajoute ce qu’il faut avoir prêt avant un incident ou un contrôle. Les quatre pages ci-dessous sont des extraits réels du pack.</p>
${compareTable('fr', '29 € net')}
${gallery('fr')}`,
  faq: [
    ['Existe-t-il un modèle officiel d’avis de rappel ?', 'Oui : le règlement d’exécution (UE) 2024/1435 fixe le modèle d’avis de rappel prévu par l’article 36 du GPSR, en annexe. L’avis porte l’intitulé « Rappel de produit pour des raisons de sécurité ».'],
    ['Combien de temps garder ces documents ?', 'La documentation technique, 10 ans après la mise sur le marché du produit (art. 9 §3). Dans le registre des réclamations, les données personnelles sont gardées le temps de l’examen et 5 ans au plus après leur saisie (art. 9 §13).'],
    ['Un tableur suffit-il pour le registre ?', 'Oui. Le règlement n’impose aucun format, et les lignes directrices de la Commission indiquent que la documentation technique peut être électronique. Le registre du pack est fourni en DOCX et en CSV pour cette raison.'],
    ['Les modèles gratuits suffisent-ils pour vendre ?', 'Pour mettre en vente, oui : fiche sécurité, texte d’étiquette et d’annonce, analyse de risques et checklists. Le registre des réclamations et la procédure de rappel sont aussi obligatoires ; vous pouvez les rédiger vous-même à partir de cette page, ou partir de ceux du pack.'],
  ],
  cta: {
    title: 'Pack GPSR : registre, procédure de rappel et modèles par catégorie',
    text: '13 documents en français et 13 en anglais, DOCX et Markdown, 2 registres CSV. Licence pour toute votre entreprise. Réservé aux entreprises immatriculées en France.',
    href: PACK, label: 'Voir le pack, 29 € net',
    note: `Pas encore prêt ? Commencez par le ${link(TOOL, 'générateur gratuit')} : fiche sécurité, étiquette, annonce et analyse de risques en 10 minutes.`,
  },
  related: ['etiquetage-bougie', 'personne-responsable-gpsr', 'reglementation-bijoux-gpsr', 'vetements-textile-gpsr'],
  sources: [SRC.gpsr, SRC.guidelines, SRC.recallTemplate, SRC.rappelconso, SRC.sbg, SRC.rag],
};

export const GENERAL_GUIDES = [personneResponsable, modeles];
