// Platform guides (plan P4, P5, P6, P12): Etsy, Amazon, Vinted Pro, Shopify.
// Menu paths and field labels quoted from each platform's official help pages, opened on 2026-10-17
// (Etsy: Zendesk API, « edited_at » dates given; Amazon: public Seller Central help pages, no login;
// Vinted: help articles rendered in a browser; Shopify: help.shopify.com/fr). No screenshot: the interfaces change.
import { MAKER, PACK, TOOL, art, example, go, link } from './common.mjs';
import { SRC, cite } from './sources.mjs';

const ETSY = {
  gpsr: ['Aide Etsy : Qu’est-ce que le Règlement relatif à la sécurité générale des produits (RSGP) ? (modifié le 25/04/2025)', 'https://help.etsy.com/hc/fr/articles/28211364687383'],
  eo: ['Aide Etsy : L’ajout d’un opérateur économique (modifié le 30/04/2025)', 'https://help.etsy.com/hc/fr/articles/19880002187927'],
  listing: ['Aide Etsy : La création d’une fiche produit (modifié le 08/07/2026)', 'https://help.etsy.com/hc/fr/articles/115015628707'],
  epr: ['Aide Etsy : La Responsabilité élargie du producteur (REP) en France (modifié le 14/08/2026)', 'https://help.etsy.com/hc/fr/articles/4419102662167'],
  bulk: ['Aide Etsy : modifier plusieurs fiches produits à la fois (modifié le 31/08/2026)', 'https://help.etsy.com/hc/fr/articles/360000337307'],
};
const AMZ = {
  submit: ['Aide Seller Central (France) : Soumettre les informations sur le fabricant et la personne responsable et les informations d’avertissement et de sécurité', 'https://sellercentral.amazon.fr/help/hub/reference/external/G8AECGHY2KLD88D7?locale=fr-FR'],
  overview: ['Aide Seller Central (France) : Règlement sur la sécurité générale des produits (RSGP)', 'https://sellercentral.amazon.fr/help/hub/reference/external/GQAYBJPNAZ2LMDDT?locale=fr-FR'],
  spapi: ['Amazon Selling Partner API : attributs GPSR (journal des modifications du 18/11/2024, en anglais)', 'https://developer-docs.amazon/sp-api/changelog/developers-can-use-attributes-in-their-programmatic-listings-submissions-to-comply-with-gpsr'],
  health: ['Amazon Selling Partner API : conformité GPSR sur la page Santé du compte (14/10/2024, en anglais)', 'https://developer-docs.amazon/sp-api/changelog/sellers-can-prove-their-gpsr-compliance-on-their-account-health-page'],
};
const VINTED = {
  info: ['Aide Vinted : Informations obligatoires pour les Vendeurs Pro', 'https://www.vinted.fr/help/1269'],
  what: ['Aide Vinted : Que peux-tu vendre en tant que vendeur Pro ?', 'https://www.vinted.fr/help/1437'],
  danger: ['Aide Vinted : Comment reconnaître un article potentiellement dangereux ?', 'https://www.vinted.fr/help/1440'],
  pro: ['Aide Vinted : Ventes commerciales', 'https://www.vinted.fr/help/1120'],
};
const SHOP = {
  gpsr: ['Aide Shopify : Comprendre le règlement général sur la sécurité des produits (GPSR)', 'https://help.shopify.com/fr/manual/international/gpsr'],
  using: ['Aide Shopify : utiliser les champs méta (tutoriel)', 'https://help.shopify.com/fr/manual/custom-data/metafields/using-metafields'],
  create: ['Aide Shopify : créer une définition de champ méta', 'https://help.shopify.com/fr/manual/custom-data/metafields/metafield-definitions/creating-custom-metafield-definitions'],
  types: ['Aide Shopify : types de champs méta', 'https://help.shopify.com/fr/manual/custom-data/metafields/metafield-definitions/metafield-types'],
  display: ['Aide Shopify : afficher les champs méta sur votre boutique en ligne', 'https://help.shopify.com/fr/manual/custom-data/metafields/displaying-metafields-on-your-online-store'],
};
const L = ([text, href]) => link(href, text);
const l = ([, href], text) => link(href, text);

const CANDLE = {
  ...MAKER,
  productName: 'Bougie parfumée Lavande 200 g', productRef: 'BOUG-LAV-200', batch: 'LOT 2026-10-A', category: 'candle',
  materials: 'Cire de soja, mèche coton, parfum lavande (fiche de données de sécurité du fournisseur), pot en verre',
  intendedUse: 'Bougie décorative parfumée pour usage intérieur, à brûler sous surveillance.', misuse: 'Laissée allumée sans surveillance ; pot déplacé encore chaud.',
  hazards: ['flame', 'heat', 'chemicals'],
};
const caption = (p) => `Exemple fictif généré par le générateur gratuit le 17 octobre 2026, plateforme « ${p} » cochée (document « Étiquette, emballage et annonce »).`;

/* -------------------------------------------------------------------- Etsy */
export const etsy = {
  slug: 'gpsr-etsy',
  group: 'plateformes',
  crumb: 'GPSR sur Etsy',
  teaser: 'Opérateur économique, champs « Fabricants » et « Informations concernant la sécurité du produit », REP France.',
  title: 'GPSR Etsy : remplir les informations fabricant et sécurité',
  description: 'RSGP sur Etsy : statut commerçant, opérateur économique, champs « Fabricants » et sécurité du produit, REP France. Chemins des menus selon l’aide Etsy.',
  h1: 'RSGP sur Etsy : quoi remplir, où, et pour quels produits',
  citation: ['gpsr', 'guidelines', 'envR541173'],
  lead: `<p>Etsy demande trois choses aux vendeurs qui vendent dans l’Espace économique européen : déclarer leur statut (« Commerçant » ou « Personne privée »), renseigner le fabricant (par le champ « Fabricants » de chaque fiche ou un opérateur économique enregistré dans les paramètres), et remplir le champ « Informations concernant la sécurité du produit » (${L(ETSY.gpsr)}). Ces champs correspondent aux quatre informations que l’article 19 du GPSR impose dans toute offre en ligne. Si vous fabriquez en France, le fabricant, c’est vous : aucune personne responsable à ajouter.</p>`,
  body: `<h2>Commencer par votre statut de vendeur</h2>
<p>Le RSGP ne s’applique qu’aux professionnels. Etsy vous demande donc de choisir : Gestionnaire de boutique &gt; Canaux de vente &gt; icône crayon à côté de votre boutique &gt; section « Coordonnées du vendeur » &gt; Modifier &gt; « Commerçant » ou « Personne privée ». Etsy précise qu’il « n’est pas en capacité de vous dire si vous êtes considéré comme commerçant ou personne privée ».</p>
<p>Le règlement définit le professionnel comme celui qui agit « à des fins qui entrent dans le cadre de son activité commerciale, industrielle, artisanale ou libérale » (${art(3, 'art. 3 point 18')}). Une micro-entreprise qui vend ses créations est un commerçant au sens de ce champ.</p>

<h2>Indiquer le fabricant, sur la fiche ou dans les paramètres</h2>
<p>Deux chemins mènent au même résultat. Le premier est la section « Informations requises par le RSGP concernant le fabricant et la sécurité » du formulaire de fiche produit (${L(ETSY.listing)}), avec le champ « Fabricants ». Le second enregistre une fois pour toutes un opérateur économique : Gestionnaire de boutique &gt; Paramètres &gt; « Partenaires avec lesquels vous travaillez » &gt; « Ajouter un opérateur économique », puis nom, adresse, coordonnées et « Enregistrer l’opérateur » (${L(ETSY.eo)}). Ce réglage n’est pas disponible dans l’application Vendre sur Etsy : passez par un navigateur.</p>
<p>Ce que vous y mettez dépend de votre rôle :</p>
<ul>
<li>vous fabriquez, ou faites fabriquer sous votre marque : vos propres nom (ou marque), adresse postale et adresse e-mail ;</li>
<li>vous revendez le produit d’un autre fabricant : ses coordonnées à lui, que vous vérifiez avant la mise en vente (${art(12, 'art. 12 §1')}) ;</li>
<li>vous êtes établi hors de l’Union : en plus, l’opérateur établi dans l’UE qui tient le rôle de personne responsable (${art(19, 'art. 19 b')}).</li>
</ul>
<p>Pour ce dernier cas, Etsy indique s’être associée à Cert-Rep et à International Associates. Un créateur établi en France n’en a pas besoin : voir ${go('/personne-responsable-gpsr.html', 'notre guide sur la personne responsable')}.</p>

<h2>Remplir le champ « Informations concernant la sécurité du produit »</h2>
<p>C’est le point d de l’article 19 : les avertissements et informations de sécurité qui figurent sur le produit, l’emballage ou la notice, en français pour les acheteurs en France. Copiez-y le texte de votre étiquette, sans le résumer. Pour une bougie, ce sont les consignes de combustion ; pour un collier, le risque pour les jeunes enfants. Si le produit n’a besoin d’aucun avertissement (une carte postale, par exemple), écrivez-le plutôt que de laisser le champ vide.</p>
<p>La photo et la référence (point c) sont déjà dans la fiche : vérifiez que la référence de l’étiquette apparaît dans le titre, la description ou les variantes.</p>

<h2>Correspondance entre l’article 19 et les champs Etsy</h2>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Article 19</th><th scope="col">Champ Etsy</th><th scope="col">Ce que vous écrivez</th></tr></thead>
<tbody>
<tr><th scope="row">a) Fabricant, adresses postale et électronique</th><td>« Fabricants » ou opérateur économique enregistré</td><td>Votre nom ou marque, adresse, e-mail</td></tr>
<tr><th scope="row">b) Personne responsable si fabricant hors UE</th><td>Opérateur économique</td><td>Rien si le fabricant est établi dans l’UE</td></tr>
<tr><th scope="row">c) Photo, type, identifiant</th><td>Photos, titre, description, variantes</td><td>La référence imprimée sur l’étiquette</td></tr>
<tr><th scope="row">d) Avertissements et sécurité</th><td>« Informations concernant la sécurité du produit »</td><td>Le texte d’avertissement de l’étiquette, en français</td></tr>
</tbody></table></div>
<p>Etsy ne permet pas de modifier ces champs en masse : sa liste de modifications groupées couvre titres, tags, descriptions, prix et partenaires de production, pas les champs RSGP (${L(ETSY.bulk)}). Prévoyez le temps de les remplir fiche par fiche.</p>

<h2>Cas particuliers</h2>
<ul>
<li><strong>Fichiers numériques.</strong> Etsy écrit que « le RSGP s’applique à tous les types de produits, aussi bien physiques que numériques, à moins qu’ils ne soient couverts par d’autres lois liées à la sécurité ». Les lignes directrices de la Commission indiquent aussi que la notion de produit couvre les éléments immatériels, applications et logiciels compris (${cite('guidelines', 'C/2025/6233, point 2.1')}). Ne partez donc pas du principe qu’un PDF à imprimer est hors champ : remplissez au moins le fabricant.</li>
<li><strong>Impression à la demande et partenaires de production.</strong> L’aide Etsy décrit les partenaires de production (« service d’impression » compris) sans règle propre au RSGP. Si l’article est vendu sous votre nom, la définition du fabricant vous désigne (${art(3, 'art. 3 point 8')}) ; c’est notre lecture.</li>
<li><strong>Vintage.</strong> Le RSGP couvre l’occasion vendue par un professionnel (${art(2, 'art. 2 §3')}), mais pas les antiquités, définies comme des objets dont les consommateurs ne peuvent raisonnablement attendre qu’ils répondent aux normes de sécurité récentes (art. 2 §2 i et art. 3 point 28). L’ancienneté seule ne fait pas une antiquité au sens du texte.</li>
<li><strong>Ne plus vendre dans l’EEE.</strong> Gestionnaire de boutique &gt; Paramètres &gt; Options &gt; « Choisissez la façon dont vous voulez vendre dans les pays soumis au RSGP ». Les acheteurs de l’EEE et d’Irlande du Nord ne peuvent alors plus commander. Pour une boutique établie en France, c’est rarement une option.</li>
</ul>

<h2>Les numéros IDU de la REP France sur Etsy</h2>
<p>Ce n’est pas le RSGP, mais Etsy le demande dans le même mouvement. Gestionnaire de boutique &gt; Finances &gt; « Informations légales et fiscales » &gt; « Numéros d’immatriculation de Responsabilité élargie du producteur (REP) » &gt; « Ajouter un numéro » sous France (${L(ETSY.epr)}). Affichez aussi chaque IDU dans vos conditions de vente : le Code de l’environnement l’impose (${cite('envR541173', 'art. R541-173')}).</p>

<h2>Le texte à coller, généré pour une bougie</h2>
${example({ ...CANDLE, marketplaces: ['etsy'] }, { caption: caption('Etsy') })}`,
  faq: [
    ['Mes annonces publiées avant le 13 décembre 2024 sont-elles concernées ?', 'Oui. Selon les lignes directrices de la Commission, les obligations du RSGP s’appliquent aux produits mis sur le marché à partir du 13 décembre 2024 « ainsi qu’à toute offre de produits faite à cette date ou ultérieurement ». Une annonce encore active est une offre actuelle. Seules les mentions à apposer sur le produit ne visent pas les unités mises sur le marché avant cette date.'],
    ['Faut-il remplir le champ « Fabricants » si je fabrique moi-même ?', 'Oui : vous êtes le fabricant, et l’annonce doit indiquer son nom et ses adresses (art. 19 a). Mettez vos propres coordonnées, ou enregistrez-vous comme opérateur économique et rattachez vos fiches.'],
    ['Mes produits numériques sont-ils concernés ?', 'Selon l’aide Etsy, oui : le RSGP s’applique aux produits physiques et numériques sauf s’ils relèvent d’autres lois sur la sécurité. Remplissez au moins le fabricant pour ces fiches.'],
    ['Etsy peut-il me dire si je suis commerçant ?', 'Non, l’aide Etsy le dit explicitement. Si vous vendez dans le cadre d’une activité professionnelle déclarée (micro-entreprise, société), vous êtes commerçant au sens de ce champ.'],
  ],
  cta: {
    title: 'Générez le texte à coller dans vos champs Etsy',
    text: 'Cochez « Etsy » dans le questionnaire : le générateur rappelle où saisir chaque information et prépare le bloc fabricant et sécurité.',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
    note: `Etsy ne vous demande ni registre des réclamations ni procédure de rappel, mais l’article 9 §12 du règlement, si. Le ${link(PACK, 'pack GPSR (29 € net)')} les contient.`,
  },
  related: ['personne-responsable-gpsr', 'etiquetage-bougie', 'reglementation-bijoux-gpsr', 'gpsr-shopify'],
  sources: [ETSY.gpsr, ETSY.listing, ETSY.eo, ETSY.bulk, ETSY.epr, SRC.gpsr, SRC.guidelines, SRC.envR541173],
};

/* ------------------------------------------------------------------ Amazon */
export const amazon = {
  slug: 'gpsr-amazon',
  group: 'plateformes',
  crumb: 'GPSR sur Amazon',
  teaser: 'Conformité réglementaire, personne responsable, images PS01 à PS06, documents, attestation, annonces bloquées.',
  title: 'GPSR Amazon : fabricant, sécurité et documents (vendeurs FR)',
  description: 'RSGP sur Amazon.fr : où saisir fabricant et personne responsable, images PS01 à PS06, documents, attestation, annonce bloquée. D’après l’aide Amazon.',
  h1: 'RSGP sur Amazon : les champs à remplir et les documents à garder',
  citation: ['gpsr', 'msr'],
  lead: `<p>Sur Amazon, le RSGP se remplit à deux niveaux. Les coordonnées du fabricant et de la personne responsable se saisissent par marque, dans État du compte &gt; Conformité réglementaire. Les informations de sécurité se donnent produit par produit : images de sécurité, documents (notice, informations de sécurité) ou attestation que le produit n’en a pas besoin (${L(AMZ.submit)}). Amazon désactive les offres couvertes par le RSGP qu’il juge non conformes (${L(AMZ.overview)}). Un fabricant établi en France n’a pas de personne responsable tierce à indiquer.</p>`,
  body: `<h2>Le fabricant et la personne responsable se saisissent par marque</h2>
<p>Le chemin indiqué par l’aide Amazon pour la France : Registre des marques &gt; État du compte &gt; Conformité réglementaire &gt; « Soumettre les informations de conformité » &gt; « Règlement sur la sécurité générale des produits (RSGP) » &gt; Suivant, choix de la marque, coordonnées du fabricant, Enregistrer. Les informations sur la personne responsable se renseignent ensuite depuis le menu « Politique ». Pour des produits sans marque, l’aide prévoit une saisie pour plusieurs SKU à la fois quand les informations sont identiques.</p>
<p>L’ancien tableau de bord « Gérer votre conformité » n’existe plus : l’aide Amazon indique qu’il « a désormais été supprimé de Seller Central ». Les tutoriels qui y renvoient datent de 2024.</p>
<p>Qui mettre ? Les règles sont celles du règlement, pas celles d’Amazon :</p>
<ul>
<li>vous fabriquez ou faites fabriquer sous votre marque, en France : vous êtes le fabricant établi dans l’Union, et donc l’opérateur responsable (${link(`${SRC.msr[1]}#art_4`, 'règlement 2019/1020, art. 4 §2 a')}) ;</li>
<li>vous revendez une marque tierce : les coordonnées de son fabricant, et celles de son opérateur établi dans l’UE s’il est hors UE ;</li>
<li>vous importez sans marque depuis la Chine : vous êtes importateur, et vos coordonnées figurent aussi sur le produit (${art(11, 'art. 11 §3')}).</li>
</ul>

<h2>Trois options par produit pour les informations de sécurité</h2>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Option</th><th scope="col">Ce qu’Amazon demande</th><th scope="col">Points d’attention</th></tr></thead>
<tbody>
<tr><th scope="row">Images de sécurité</th><td>Images chargées sous la variante « Sécurité du produit » pour le RSGP, variantes PS01 à PS06 du Gestionnaire d’images</td><td>Une photo lisible de l’étiquette et des avertissements, en français pour amazon.fr</td></tr>
<tr><th scope="row">Documents</th><td>« Type de contenu du support de conformité » (informations de sécurité, instructions d’utilisation, guide utilisateur…), « Langue du support de conformité » (fr_FR) et « Emplacement de la source », qui doit être un lien de téléchargement direct</td><td>Pas de lien Google Drive ou Dropbox, selon la documentation de l’API</td></tr>
<tr><th scope="row">Attestation de sécurité</th><td>Cocher « oui » si le produit ne présente aucun avertissement ni aucune information de sécurité</td><td>Si le produit en nécessite, « votre mise en vente ne sera pas créée ». Disponible seulement pour certains produits</td></tr>
</tbody></table></div>
<p>Pour un produit artisanal, les images de sécurité sont souvent le plus simple : photographiez l’étiquette réelle, et chargez la fiche sécurité en PDF comme document « informations de sécurité ». Ne cochez l’attestation qu’après avoir fait l’analyse de risques : c’est elle qui dit si un avertissement est nécessaire (${art(9, 'art. 9 §2')}).</p>

<h2>Les attributs du fichier de stock, pour de nombreuses références</h2>
<p>Pour des dizaines de SKU, l’aide renvoie au modèle de fichier d’inventaire (« Gérer tout le stock », fichier modèle ou API). Les noms techniques publiés par Amazon pour l’API sont :</p>
<ul>
<li><code>gpsr_manufacturer_reference.gpsr_manufacturer_email_address</code> : e-mail du fabricant, au niveau de l’ASIN ;</li>
<li><code>dsa_responsible_party_address</code> : e-mail de la partie responsable, au niveau du SKU ;</li>
<li><code>gpsr_safety_attestation</code> : l’attestation ;</li>
<li><code>compliance_media</code> avec <code>content_type</code>, <code>content_language</code> et <code>source_location</code> : les documents.</li>
</ul>
<p>Les intitulés exacts des colonnes du fichier modèle varient selon la catégorie : téléchargez le modèle de la vôtre (${L(AMZ.spapi)}).</p>

<h2>Que faire si une annonce est bloquée</h2>
<p>L’aide décrit trois états : « Vérifier le motif du blocage », « En attente de vérifications de conformité » (de 2 à 48 heures) et « Corriger la mise en vente ». Une fois des informations valides fournies, l’annonce redevient active « dans un délai de sept jours ». Amazon ne détaille pas publiquement les critères de contrôle : nous n’en décrivons pas davantage.</p>
<p>Sur la fiche produit, les acheteurs voient vos informations dans la section « Sécurité et ressources du produit », rubrique « Images et contacts de sécurité ».</p>

<h2>Amazon Handmade et l’occasion sont concernés</h2>
<p>L’aide Amazon cite expressément les produits Handmade, l’occasion, le reconditionné, les livres imprimés et les pièces de rechange, et exclut les antiquités. C’est cohérent avec le règlement, qui couvre les produits neufs, d’occasion, réparés ou reconditionnés (${art(2, 'art. 2 §3')}).</p>

<h2>Le texte de sécurité, généré pour une bougie</h2>
${example({ ...CANDLE, marketplaces: ['amazon'] }, { caption: caption('Amazon') })}`,
  faq: [
    ['Dois-je payer une personne responsable pour vendre sur Amazon.fr ?', 'Non si vous êtes le fabricant et que votre entreprise est établie dans l’Union : vous êtes l’opérateur responsable. Une personne responsable tierce ne sert qu’aux fabricants établis hors de l’Union.'],
    ['Puis-je cocher l’attestation de sécurité pour tous mes produits ?', 'Non. Elle signifie que le produit ne présente aucun avertissement ni information de sécurité. L’aide Amazon prévient que la mise en vente ne sera pas créée si le produit en nécessite, et l’option n’existe que pour certains produits.'],
    ['Pourquoi mon lien Google Drive est-il refusé ?', 'La documentation d’Amazon demande une URL de document qui ne soit ni Google Drive ni Dropbox, et l’aide parle d’un lien de téléchargement direct. Hébergez le PDF sur votre site ou chargez-le dans Seller Central.'],
    ['Où trouver « Gérer votre conformité » ?', 'Ce tableau de bord a été supprimé de Seller Central selon l’aide Amazon. Le chemin actuel passe par État du compte > Conformité réglementaire.'],
  ],
  cta: {
    title: 'Préparez l’étiquette et la fiche sécurité à charger sur Amazon',
    text: 'Le générateur produit le texte d’avertissement en français et une fiche d’information sécurité à exporter en PDF ou DOCX.',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
    note: `Vous revendez une marque ? Le ${link(PACK, 'pack GPSR (29 € net)')} contient un questionnaire fournisseur bilingue pour obtenir les coordonnées et la documentation du fabricant.`,
  },
  related: ['personne-responsable-gpsr', 'modeles-gpsr', 'gpsr-etsy', 'fiche-securite-bougie'],
  sources: [AMZ.overview, AMZ.submit, AMZ.spapi, AMZ.health, SRC.gpsr, SRC.msr],
};

/* -------------------------------------------------------------- Vinted Pro */
export const vinted = {
  slug: 'gpsr-vinted-pro',
  group: 'plateformes',
  crumb: 'GPSR sur Vinted Pro',
  teaser: 'Fait main interdit en Pro, références des fabricants pour le neuf, occasion vendue par un professionnel.',
  title: 'Vinted Pro et GPSR : informations fabricant et sécurité',
  description: 'Vinted Pro : ce que le RSGP impose sur le neuf et l’occasion, les références fabricant demandées par Vinted, et pourquoi le fait main n’y est pas admis.',
  h1: 'Vendeur Vinted Pro : ce que le RSGP vous impose, neuf et seconde main',
  citation: ['gpsr', 'guidelines'],
  lead: `<p>Une précision d’abord, que beaucoup de créateurs découvrent tard : un vendeur Pro ne peut pas proposer sur Vinted « des articles que vous avez fabriqués vous-même », ni du sur-mesure, ni des cosmétiques (${L(VINTED.what)}). Vinted Pro sert à revendre. Pour ces reventes, Vinted demande, pour les articles neufs de certaines catégories, les références du fabricant (nom, marque, adresses postale et électronique, opérateur économique s’il est hors UE) et les avertissements, marquages et instructions (${L(VINTED.info)}). C’est l’article 19 du GPSR. L’occasion vendue par un professionnel est aussi dans le champ du règlement (${art(2, 'art. 2 §3')}).</p>`,
  body: `<h2>Qui est concerné, particulier ou Pro</h2>
<p>Le GPSR vise les professionnels. Les lignes directrices de la Commission le disent nettement : « Les transactions de consommateur à consommateur ne relèvent pas du champ d’application du RSGP » (${cite('guidelines', 'C/2025/6233, point 1.1')}). Un particulier qui vide son armoire n’a donc pas d’obligation RSGP. Vinted, de son côté, demande de passer en Pro si vous vendez « pour générer des revenus réguliers » (${L(VINTED.pro)}). La bascule vers Pro et vers le RSGP va de pair.</p>

<h2>Ce que Vinted demande, et à quel article cela correspond</h2>
<p>L’article d’aide de Vinted ne nomme pas le RSGP. La correspondance ci-dessous est la nôtre.</p>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Demande de Vinted (aide 1269)</th><th scope="col">Article du GPSR</th><th scope="col">Quand</th></tr></thead>
<tbody>
<tr><th scope="row">Nom, dénomination commerciale ou marque, adresses postale et électronique du fabricant</th><td>${art(19, 'Art. 19 a')}</td><td>Article neuf, catégories listées par Vinted</td></tr>
<tr><th scope="row">Coordonnées de l’opérateur économique si le fabricant est hors UE</th><td>Art. 19 b</td><td>Idem</td></tr>
<tr><th scope="row">Avertissements de sécurité, marquages, instructions d’utilisation (« Étiquetage et marquage CE »)</th><td>Art. 19 d</td><td>Selon la catégorie (jouets : avertissements et marquage CE)</td></tr>
<tr><th scope="row">Photos de l’article, du marquage CE et du symbole poubelle barrée si applicables</th><td>Art. 19 c, et règles propres aux jouets et appareils électriques</td><td>Selon la catégorie</td></tr>
</tbody></table></div>
<p>Vinted demande de saisir ces informations « dans le champ correspondant lors de la mise en vente d’un article neuf ». Dans le formulaire, nous avions relevé le 11 octobre 2026 les champs « Informations sur le fabricant » et « Étiquetage et marquage » ; l’aide ne les nomme pas, vérifiez-les dans votre interface. Les catégories citées vont des vêtements et chaussures aux jouets, articles de maison, piles et équipements électriques.</p>

<h2>Le cas de l’occasion</h2>
<p>Le règlement couvre les produits « neufs, d’occasion, réparés ou reconditionnés ». Il exclut seulement les produits vendus pour être réparés ou reconditionnés avant usage, à condition qu’ils soient « clairement marqués comme tels » (art. 2 §3), et les antiquités (art. 2 §2 i).</p>
<p>Pour un vêtement de marque revendu, le fabricant est en général identifiable : la marque figure sur l’étiquette, et son adresse sur son site. Notez dans l’annonce ce que vous savez. Pour un produit sans aucune marque ni fabricant identifiable, demandez-vous si vous pouvez le vendre : comme distributeur, vous vérifiez avant la vente que les informations du fabricant figurent sur le produit (${art(12, 'art. 12 §1')}). Vinted ajoute qu’il supprime les annonces non conformes au RSGP (${L(VINTED.danger)}).</p>
<p>Un produit d’occasion reste soumis à l’obligation générale de sécurité : un jouet abîmé, un casque fendu ou un appareil électrique au câble dénudé ne se revend pas en l’état (${art(5, 'art. 5')}).</p>

<h2>Ce que Vinted indique sur la REP</h2>
<p>L’aide Vinted rappelle d’adhérer à un éco-organisme, de déclarer les quantités et de payer les éco-contributions, sans préciser où saisir l’identifiant unique (IDU). Dans les paramètres Pro, nous avions relevé le 11 octobre 2026 une rubrique « Responsabilité élargie des producteurs » demandant un IDU pour les emballages et chaque catégorie REP vendue. Selon l’ADEME, la filière textile ne vise que les produits neufs ; les emballages de vos colis relèvent dans tous les cas de la filière emballages.</p>

<h2>Exemple d’annonce, pour un produit neuf revendu</h2>
<p>Voici la sortie du générateur pour une bougie neuve achetée à un fabricant français et revendue sur Vinted Pro. Les coordonnées sont celles du fabricant, pas les vôtres.</p>
${example({ ...CANDLE, role: 'distributor', makerName: 'Fabricant Exemple SARL', makerAddress: '2 avenue de l’Exemple\n69000 Lyon, France', makerContact: 'contact@fabricant-exemple.example', marketplaces: ['vinted'] }, { caption: caption('Vinted Pro') })}`,
  faq: [
    ['Puis-je vendre mes créations sur Vinted Pro ?', 'Non. L’aide Vinted interdit aux vendeurs Pro de proposer des articles fabriqués eux-mêmes, du sur-mesure ou de la personnalisation. Pour vos créations, Etsy, votre boutique ou un marché local restent les options.'],
    ['Un particulier sur Vinted doit-il respecter le RSGP ?', 'Non. Selon les lignes directrices de la Commission, les transactions entre consommateurs ne relèvent pas du règlement. Si vous vendez pour en tirer un revenu régulier, Vinted vous demande de passer en Pro, et le RSGP s’applique alors.'],
    ['Dois-je remplir le fabricant pour un article d’occasion ?', 'L’aide Vinted demande les références des fabricants pour les articles neufs. Le règlement couvre aussi l’occasion vendue par un professionnel : indiquez la marque et le fabricant quand ils sont identifiables, et vérifiez la sécurité de l’article.'],
  ],
  cta: {
    title: 'Préparez le bloc fabricant et sécurité de vos annonces',
    text: 'Choisissez le rôle « Je revends un produit d’un fabricant établi dans l’UE » et cochez « Vinted Pro » : le générateur prépare les quatre mentions de l’article 19.',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
    note: `Pour obtenir les informations de vos fournisseurs, le ${link(PACK, 'pack GPSR (29 € net)')} contient un questionnaire fournisseur bilingue.`,
  },
  related: ['personne-responsable-gpsr', 'vetements-textile-gpsr', 'gpsr-etsy', 'modeles-gpsr'],
  sources: [VINTED.what, VINTED.info, VINTED.danger, VINTED.pro, SRC.gpsr, SRC.guidelines, ['ADEME : FAQ filières REP', 'https://filieres-rep.ademe.fr/faq']],
};

/* ----------------------------------------------------------------- Shopify */
export const shopify = {
  slug: 'gpsr-shopify',
  group: 'plateformes',
  crumb: 'GPSR sur Shopify',
  teaser: 'Sans application : champs méta « Divulgations », bloc « Ligne réductible » et source dynamique.',
  title: 'GPSR sur Shopify sans application : champs méta et fiche produit',
  description: 'Mentions GPSR (art. 19) sur Shopify avec les outils natifs : champs méta, bloc « Ligne réductible », source dynamique, page de contact. Pas à pas.',
  h1: 'Afficher les mentions GPSR sur Shopify avec les outils natifs',
  citation: ['gpsr', 'envR541173'],
  lead: `<p>Sur votre propre boutique, vous êtes le vendeur à distance : chaque fiche produit doit afficher « de manière claire et visible » le fabricant et ses adresses, la personne responsable si le fabricant est hors UE, l’identification du produit avec une image, et les avertissements (${art(19)}). Shopify recommande les champs méta et métaobjets « Divulgations » pour les avertissements et un champ méta ou la description pour le reste (${L(SHOP.gpsr)}). Pour une boutique de quelques dizaines de produits, ces outils natifs suffisent : pas besoin d’application payante.</p>`,
  body: `<h2>Les deux façons de faire</h2>
<p>La plus simple : ajouter un paragraphe « Fabricant et sécurité » à la fin de chaque description de produit. Elle convient si vous avez peu de fiches et un seul fabricant (vous). La plus propre : créer des champs méta et les afficher dans un bloc du thème. Vous saisissez une fois la structure, puis seulement les valeurs, et l’affichage reste identique sur toutes les fiches. Shopify mentionne les deux options dans son aide GPSR.</p>

<h2>Pas à pas : créer les champs méta</h2>
<ol class="steps-list">
<li>Allez dans Paramètres &gt; Champs méta et métaobjets &gt; « Champs méta de produit » &gt; « Ajouter une définition » (${L(SHOP.using)}).</li>
<li>Créez trois définitions : « Fabricant » (type « Texte sur plusieurs lignes », pour le nom, l’adresse postale et l’e-mail), « Référence » (« Texte sur une seule ligne ») et « Sécurité » (« Texte sur plusieurs lignes »). Pour les avertissements, Shopify propose aussi les entrées standard « Divulgations ». Les types sont décrits dans ${l(SHOP.types, 'l’aide sur les types de champs méta')}.</li>
<li>Pour chaque définition : un nom, l’« Espace de nom et clé » proposé, éventuellement une description, puis « Enregistrer » (${L(SHOP.create)}).</li>
<li>Ouvrez chaque produit : la section « Champs méta de produit » affiche vos trois champs. Collez-y le texte généré.</li>
</ol>
<p>Vendez-vous seulement vos créations ? Le champ « Fabricant » aura la même valeur partout. Vous pouvez quand même le garder en champ méta : le jour où vous revendez le produit d’un autre créateur, vous n’avez qu’une valeur à changer.</p>

<h2>Pas à pas : afficher les champs sur la fiche produit</h2>
<ol class="steps-list">
<li>Boutique en ligne &gt; Thèmes &gt; « Modifier le thème ».</li>
<li>Choisissez le modèle « Produits &gt; Produit par défaut », section « Informations sur le produit ».</li>
<li>« Ajouter un bloc » &gt; « Ligne réductible ». Titrez-la « Fabricant et sécurité ».</li>
<li>Dans le contenu du bloc, cliquez sur l’icône « Connecter la source dynamique » et choisissez vos champs méta. Enregistrez.</li>
</ol>
<p>Les sources dynamiques demandent un thème à modèles JSON (les thèmes « Online Store 2.0 »), et un modèle accepte jusqu’à 20 champs méta (${L(SHOP.display)}). Vérifiez ensuite la fiche sur mobile. Selon nous, une ligne réductible bien titrée, placée près du bouton d’achat, reste « claire et visible » ; reléguée tout en bas d’une longue page, elle l’est moins.</p>

<h2>Ce qui n’est pas dans la fiche produit</h2>
<ul>
<li>Une page Contact avec une adresse e-mail ou un formulaire : c’est le canal public de réclamation que le fabricant doit offrir (${art(9, 'art. 9 §11')}).</li>
<li>Vos mentions légales et vos CGV avec l’identifiant unique REP de chaque filière (${cite('envR541173', 'Code de l’environnement, art. R541-173')}).</li>
<li>Le ciblage : si vous livrez dans l’UE, en euros et en français, votre offre cible les consommateurs de l’Union (${art(4)}).</li>
</ul>

<h2>Quand une application vaut la peine</h2>
<p>Les applications GPSR de la boutique Shopify servent à gérer beaucoup de fabricants et de références, à importer des données fournisseur ou à traduire les mentions en plusieurs langues. Pour une boutique de créateur qui fabrique ses 20 ou 50 produits, la méthode ci-dessus prend une heure et ne coûte rien. Shopify précise ne pas proposer de service de personne responsable.</p>

<h2>Le texte à coller, généré pour une bougie</h2>
${example({ ...CANDLE, marketplaces: ['shopify'] }, { caption: caption('Ma boutique Shopify') })}`,
  faq: [
    ['La description du produit suffit-elle ?', 'Oui, si les quatre informations de l’article 19 y figurent de manière claire et visible. Les champs méta rendent l’affichage uniforme et la mise à jour plus simple, sans être obligatoires.'],
    ['Mon thème ne propose pas de « Ligne réductible ». Que faire ?', 'Les sources dynamiques demandent un thème à modèles JSON. Avec un thème plus ancien, mettez les informations dans la description, ou faites modifier le thème.'],
    ['Faut-il traduire les mentions ?', 'Les avertissements sont dans la langue fixée par chaque État membre où vous vendez (art. 19 d) : le français pour la France. Si vous livrez en Allemagne ou en Espagne, prévoyez l’allemand ou l’espagnol.'],
  ],
  cta: {
    title: 'Générez le texte de vos champs méta',
    text: 'Cochez « Ma boutique Shopify » : le générateur prépare le bloc fabricant, la référence et les avertissements, prêts à coller.',
    href: TOOL, label: 'Ouvrir le générateur gratuit',
    note: `Votre page Contact reçoit des réclamations ? Le registre exigé par l’article 9 §12 est dans le ${link(PACK, 'pack GPSR (29 € net)')}.`,
  },
  related: ['gpsr-etsy', 'personne-responsable-gpsr', 'ceramique-decoration-gpsr', 'modeles-gpsr'],
  sources: [SHOP.gpsr, SHOP.using, SHOP.create, SHOP.types, SHOP.display, SRC.gpsr, SRC.envR541173],
};

export const PLATFORM_GUIDES = [etsy, amazon, vinted, shopify];
