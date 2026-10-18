// Candle cluster (plan P2 hub and P3): labelling (CLP, EN 15494, GPSR) and « fiche de sécurité » (SDS vs GPSR sheet).
// Checked on 2026-10-17: ECHA candle factsheet (French translation by INERIS, ECHA-24-R-06, August 2024), consolidated
// CLP 02008R1272-20260701 (Annex II 2.8, table 3.4.6), Regulations (EU) 2024/2865 and 2025/2439 (dates), REACH Art. 31
// (02006R1907-20260622), Implementing Decision (EU) 2026/901 (EN 15494 is not listed), AFNOR catalogue (NF EN 15494,
// November 2019), DGCCRF pages of 19/07/2019, 10/12/2024 and 15/04/2026 (figures quoted as published).
import { MAKER, PACK, TOOL, art, example, go, link } from './common.mjs';
import { SRC, cite } from './sources.mjs';

const K = {
  echa: ['ECHA, traduction INERIS : Respecter le règlement CLP lors de la fabrication ou de l’importation de bougies (août 2024)', 'https://clp-info.ineris.fr/guides-brochures/les-bougies-et-le-reglement-clp'],
  echaPdf: ['Fiche ECHA « bougies » en PDF (INERIS)', 'https://clp-info.ineris.fr/sites/snar-clp/files/guide_brochure/Factsheet%20ECHA_bougie_fr_0.pdf'],
  clp: ['Règlement (CE) n° 1272/2008 (CLP), version consolidée du 1er juillet 2026', 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:02008R1272-20260701'],
  clp2024: ['Règlement (UE) 2024/2865 modifiant le règlement CLP', 'https://eur-lex.europa.eu/eli/reg/2024/2865/oj?locale=fr'],
  clp2025: ['Règlement (UE) 2025/2439 modifiant les dates d’application du règlement (UE) 2024/2865', 'https://eur-lex.europa.eu/eli/reg/2025/2439/oj?locale=fr'],
  reach31: ['Règlement (CE) n° 1907/2006 (REACH), article 31, version consolidée du 22 juin 2026', 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:02006R1907-20260622'],
  std: ['Décision d’exécution (UE) 2026/901 (normes européennes publiées au titre du règlement 2023/988)', 'https://eur-lex.europa.eu/eli/dec_impl/2026/901/oj?locale=fr'],
  dgccrf2019: ['DGCCRF : Produits chimiques, une utilisation à risque (enquête 2017, publiée le 19/07/2019)', 'https://www.economie.gouv.fr/dgccrf/laction-de-la-dgccrf/les-enquetes/produits-chimiques-une-utilisation-risque'],
  dgccrf2024: ['DGCCRF : Quand les produits imitent les aliments (10/12/2024)', 'https://www.economie.gouv.fr/dgccrf/laction-de-la-dgccrf/les-enquetes/quand-les-produits-imitent-les-aliments-attention-aux'],
  dgccrf2026: ['DGCCRF : Sécurité des produits chimiques vendus au grand public (15/04/2026)', 'https://www.economie.gouv.fr/dgccrf/laction-de-la-dgccrf/les-enquetes-et-les-controles/securite-des-produits-chimiques-vendus-au-grand-public-15-700-references-de-produits'],
  pcn: ['ECHA : notifications aux centres antipoison et UFI', 'https://poisoncentres.echa.europa.eu/'],
};
const L = ([text, href]) => link(href, text);
const l = ([, href], text) => link(href, text);

const CANDLE = {
  ...MAKER,
  productName: 'Bougie parfumée Lavande 200 g', productRef: 'BOUG-LAV-200', batch: 'LOT 2026-10-A', category: 'candle',
  materials: 'Cire de soja, mèche coton, parfum lavande à 8 % (fiche de données de sécurité du fournisseur), pot en verre, couvercle métal',
  intendedUse: 'Bougie décorative parfumée pour usage intérieur, à brûler sous surveillance.', misuse: 'Laissée allumée sans surveillance ; posée près de rideaux ; pot déplacé encore chaud.',
  hazards: ['flame', 'heat', 'chemicals', 'breakage'],
  instructions: 'Couper la mèche à 5 mm avant chaque allumage.\nNe pas brûler plus de 4 heures d’affilée.',
};

/* ------------------------------------------------------------- hub étiquetage */
export const etiquetage = {
  slug: 'etiquetage-bougie',
  group: 'bougies',
  crumb: 'Étiquetage des bougies',
  teaser: 'CLP selon le parfum, avertissements de la norme EN 15494, mentions GPSR et annonce en ligne.',
  title: 'Étiquetage bougie obligatoire : CLP, EN 15494 et GPSR (2026)',
  description: 'Bougie et fondant parfumés : quand l’étiquette CLP s’impose (EUH208, pictogramme, UFI), avertissements EN 15494, mentions GPSR. Sources ECHA, DGCCRF.',
  h1: 'Bougie artisanale : ce qui doit figurer sur l’étiquette et dans l’annonce',
  citation: ['gpsr', 'clp', 'guidelines'],
  lead: `<p>Trois textes se superposent sur l’étiquette d’une bougie. Le règlement CLP d’abord : une bougie ou un fondant parfumé est un mélange chimique, et selon les substances sensibilisantes du parfum il faut une mention EUH208 (« Contient … Peut provoquer une réaction allergique »), voire un pictogramme, une mention H317 et un code UFI (${L(K.echa)}). La norme NF EN 15494 ensuite, qui fixe les symboles et phrases de sécurité des bougies : elle n’est pas obligatoire, mais c’est la référence. Le GPSR enfin, pour tout le reste : référence et coordonnées du fabricant sur le produit, avertissements en français, et quatre informations dans l’annonce en ligne (${art(19)}). C’est la fiche de données de sécurité de votre parfum qui décide du volet CLP, pas votre intuition.</p>`,
  body: `<nav class="toc" aria-label="Sommaire"><p>Sur cette page</p><ol>
<li><a href="#trois-textes">Trois textes, trois questions</a></li>
<li><a href="#clp">Ce que dit la fiche de votre parfum (CLP)</a></li>
<li><a href="#en15494">Les avertissements de la norme EN 15494</a></li>
<li><a href="#gpsr">Les mentions GPSR et l’annonce</a></li>
<li><a href="#controles">Ce que trouvent les contrôles</a></li>
</ol></nav>

<h2 id="trois-textes">Trois textes, trois questions</h2>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Texte</th><th scope="col">La question qu’il pose</th><th scope="col">Ce qu’il met sur l’étiquette</th></tr></thead>
<tbody>
<tr><th scope="row">Règlement CLP (CE) 1272/2008</th><td>Le mélange cire + parfum est-il classé dangereux, ou contient-il un sensibilisant au-dessus du seuil EUH208 ?</td><td>Selon le cas : EUH208 seule ; ou pictogramme, mention d’avertissement, H317, conseils de prudence, UFI, identité du fournisseur</td></tr>
<tr><th scope="row">Norme NF EN 15494 (novembre 2019)</th><td>Quels avertissements de sécurité incendie afficher ?</td><td>Symboles et phrases de sécurité propres aux bougies</td></tr>
<tr><th scope="row">Règlement (UE) 2023/988 (GPSR)</th><td>Qui a fabriqué la bougie, comment l’identifier, quels risques signaler ?</td><td>Référence ou lot, nom et adresses du fabricant, instructions et avertissements en français (${art(9, 'art. 9 §5 à §7')})</td></tr>
</tbody></table></div>
<p>Une bougie et un fondant suivent les mêmes règles : la fiche de l’ECHA vise « des bougies (y compris des fondants ou cires fondues) » et précise que ce sont des mélanges au sens de REACH et du CLP. Une bougie non parfumée et sans colorant classé n’a en général pas d’étiquette CLP ; elle garde les avertissements incendie et les mentions GPSR.</p>

<h2 id="clp">Ce que dit la fiche de votre parfum (CLP)</h2>
<p>Le classement dépend surtout des substances parfumées, souvent sensibilisantes pour la peau. La fiche de l’ECHA donne les seuils qui comptent pour une bougie :</p>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col">Substance sensibilisante dans la bougie finie</th><th scope="col">Conséquence sur l’étiquette</th></tr></thead>
<tbody>
<tr><th scope="row">Catégorie 1A à 0,1 % ou plus, ou catégorie 1 / 1B à 1 % ou plus</th><td>Mélange classé sensibilisant cutané 1 : pictogramme, H317 « Peut provoquer une allergie cutanée », conseils de prudence. Notification aux centres antipoison et code UFI</td></tr>
<tr><th scope="row">Catégorie 1A de 0,01 % à moins de 0,1 %, ou catégorie 1 / 1B de 0,1 % à moins de 1 %</th><td>Pas de classement, mais mention EUH208 : « Contient (nom de la substance). Peut provoquer une réaction allergique »</td></tr>
<tr><th scope="row">En dessous</th><td>Pas d’étiquette CLP pour ce danger</td></tr>
</tbody></table></div>
<p>Pour les sensibilisants qui ont une limite de concentration spécifique, le seuil EUH208 est d’un dixième de cette limite (${L(K.clp)}, annexe II, point 2.8, et tableau 3.4.6 de l’annexe I). Sans la composition détaillée de votre parfum, vous pouvez partir de la classification du parfum lui-même : l’ECHA donne l’exemple d’une bougie contenant 10 % d’un parfum classé sensibilisant cutané 1, qui est alors classée de la même façon.</p>
<h3>Lire la fiche de données de sécurité du parfum</h3>
<p>Trois rubriques suffisent pour une bougie : la rubrique 2 (classification du parfum et éléments d’étiquetage), la rubrique 3 (substances dangereuses et leurs concentrations, avec leur catégorie de sensibilisation) et la rubrique 15 (réglementation). Multipliez la concentration de chaque substance dans le parfum par votre taux de parfum : à 8 % de parfum, une substance présente à 5 % dans le parfum représente 0,4 % de la bougie. Certains fournisseurs donnent aussi un document « IFRA » ou un « étiquetage pour bougie à x % » : il vous fait gagner du temps, mais gardez la fiche dans votre dossier.</p>
<h3>Où coller l’étiquette CLP</h3>
<p>La fiche de l’ECHA est très concrète sur ce point. Une étiquette CLP ne peut pas être apposée sur la cire, et un pot en verre ouvert, la coupelle d’une bougie chauffe-plat ou une boîte en papier ajourée ne sont pas des emballages adéquats pour un mélange dangereux. Une bougie classée dans un tel contenant est donc fournie dans un emballage conforme, avec l’étiquette fixée sur le côté, texte horizontal lisible. Des exemptions existent pour les petites bougies.</p>
<h3>UFI et centres antipoison</h3>
<p>Si la bougie est classée dangereuse pour la santé ou pour ses propriétés physiques, vous la notifiez aux centres antipoison et imprimez un code UFI sur l’étiquette (${L(K.pcn)}). Vous ne pouvez pas reprendre l’UFI de votre fournisseur de parfum : il faut le vôtre, et une notification par État membre où vous vendez. Une bougie qui porte seulement la mention EUH208 n’est pas classée, et n’entre donc pas dans ce cas.</p>
<h3>Le nouveau format d’étiquette CLP arrive en 2028</h3>
<p>Le ${L(K.clp2024)} impose des tailles minimales de caractères et une mise en page (noir sur blanc, interligne). Ces règles de format devaient s’appliquer au 1er janvier 2027 ; le ${L(K.clp2025)} les a reportées au 1er janvier 2028, et les anciennes règles restent utilisables jusqu’au 31 décembre 2027. Prévoyez la refonte de vos étiquettes en 2027.</p>

<h2 id="en15494">Les avertissements de la norme EN 15494</h2>
<p>La ${cite('en15494', 'norme NF EN 15494 « Bougies — Étiquettes de sécurité »')} est en vigueur dans sa version de novembre 2019 (la version de 2007 est annulée). Elle définit des symboles et des phrases de sécurité pour les bougies. Nous ne les reproduisons pas : le texte est payant et protégé. Sa référence n’est pas publiée au Journal officiel au titre du GPSR (elle ne figure pas dans la ${L(K.std)}), donc l’appliquer ne vaut pas présomption de sécurité. Elle reste un élément que les autorités prennent en compte pour juger si un produit est sûr (${art(8, 'art. 8 §1 a')}), et c’est la référence des fabricants du secteur.</p>
<p>Les consignes que le générateur propose couvrent les mêmes risques avec nos propres mots : ne jamais laisser une bougie allumée sans surveillance, hors de portée des enfants et des animaux, loin de ce qui peut brûler, à 10 cm au moins d’une autre bougie, sur une surface stable résistant à la chaleur.</p>

<h2 id="gpsr">Les mentions GPSR et l’annonce</h2>
<p>Le GPSR ajoute ce que ni le CLP ni la norme ne demandent : une référence ou un numéro de lot, vos nom et adresses postale et électronique, et des instructions en français (${art(9, 'art. 9 §5 à §7')}). Avant la vente, gardez une documentation technique avec l’analyse des risques (${art(9, 'art. 9 §2')}). Pour une bougie, elle contient vos essais de combustion : mèche, diamètre, durée, hauteur de flamme, température du pot. Une bougie qui ressemble à un dessert pose une question de plus : le règlement demande d’évaluer les produits qui ressemblent à une denrée et risquent d’être portés à la bouche, en particulier par des enfants (${art(6, 'art. 6 §1, f, i')}).</p>
<p>Voici ce que le générateur gratuit produit pour une bougie parfumée en pot. L’exemple ne contient pas la mention EUH208 : elle dépend de la fiche de votre parfum, à ajouter dans le champ « Avertissements supplémentaires ».</p>
${example(CANDLE, { caption: 'Exemple fictif généré par le générateur gratuit le 17 octobre 2026 (document « Étiquette, emballage et annonce »).' })}

<h2 id="controles">Ce que trouvent les contrôles</h2>
<p>Le chiffre qui circule (94 non-conformes sur 188) ne vient pas d’une enquête sur les bougies. Il vient d’une enquête de la DGCCRF de 2017 sur les produits chimiques vendus au grand public, publiée en 2019 : « Sur les 188 échantillons analysés, 94 ont été déclarés non conformes et 9 échantillons ont été déclarés dangereux (parfums d’ambiance, bougies, encens et produits d’entretien) ». Sur les bougies, le rapport note que beaucoup « ne présentaient pas d’information sur la présence de substances sensibilisantes », et que bougies et encens sont « très souvent sans étiquetage CLP alors qu’il s’agit de mélanges » (${L(K.dgccrf2019)}).</p>
<p>Deux publications plus récentes visent aussi les bougies. En décembre 2024, sur 34 produits imitant des aliments analysés, la DGCCRF indique que « la moitié étaient à la fois non conformes et dangereux », et que ces produits venaient surtout « de petits fabricants artisanaux de bougies, de fondants parfumés ou de cosmétiques » (${L(K.dgccrf2024)}). En avril 2026, son bilan des contrôles 2023-2024 sur les produits chimiques grand public (plus de 15 700 références, 4 200 professionnels) cite les bougies parmi les produits visés, sans chiffre propre aux bougies (${L(K.dgccrf2026)}).</p>

<h2>Les emballages et la REP en France</h2>
<p>Une bougie ne relève d’aucune filière REP propre ; ses emballages (pot, boîte, papier de soie, carton d’expédition) relèvent de la filière emballages ménagers, avec un identifiant unique à afficher dans vos CGV (${cite('envR541173', 'art. R541-173 du Code de l’environnement')}). Le générateur l’intègre à sa checklist REP.</p>`,
  faq: [
    ['Une bougie non parfumée a-t-elle besoin d’une étiquette CLP ?', 'En général non : sans parfum ni colorant classé, le mélange n’est pas dangereux au sens du CLP. Elle garde les avertissements incendie (norme EN 15494) et les mentions GPSR : référence, fabricant, consignes en français.'],
    ['Le pictogramme est-il obligatoire sur toutes les bougies parfumées ?', 'Non. Il l’est quand la bougie est classée, par exemple sensibilisant cutané 1 si une substance de catégorie 1 ou 1B atteint 1 %. Entre un dixième de ce seuil et le seuil, seule la mention EUH208 est due. Tout dépend de la fiche de données de sécurité du parfum et de votre dosage.'],
    ['Faut-il un code UFI sur une bougie ?', 'Seulement si la bougie est classée dangereuse pour la santé ou pour ses propriétés physiques. Vous créez alors votre propre UFI et notifiez la bougie aux centres antipoison de chaque État membre où vous vendez ; l’UFI du parfum ne peut pas être réutilisé.'],
    ['La norme EN 15494 est-elle obligatoire ?', 'Non, c’est une norme volontaire, et sa référence n’est pas publiée au Journal officiel au titre du GPSR. Les autorités s’en servent toutefois pour juger si un produit est sûr, et elle reste la référence pour les avertissements de sécurité des bougies.'],
    ['Les fondants parfumés suivent-ils les mêmes règles ?', 'Oui. La fiche de l’ECHA vise expressément les fondants et cires fondues, qui sont des mélanges au sens du CLP. Leur forme compte en plus : un fondant qui ressemble à un bonbon pose la question des produits qui imitent les aliments (art. 6 du GPSR).'],
  ],
  cta: {
    title: 'Générez la fiche sécurité de votre bougie',
    text: 'Catégorie « Bougies, fondants parfumés, diffuseurs » : consignes incendie, mentions du fabricant, texte d’annonce et analyse de risques pré-remplis. Gratuit, rien n’est envoyé.',
    href: TOOL, label: 'Créer la fiche de ma bougie',
    note: `Le ${link(PACK, 'pack GPSR (29 € net)')} contient un modèle « bougies et fondants » rempli, avec son analyse de risques, et le registre des réclamations.`,
  },
  related: ['fiche-securite-bougie', 'gpsr-etsy', 'modeles-gpsr', 'personne-responsable-gpsr'],
  sources: [K.echa, K.echaPdf, K.clp, K.clp2024, K.clp2025, SRC.en15494, K.std, SRC.gpsr, K.dgccrf2019, K.dgccrf2024, K.dgccrf2026, K.pcn, SRC.envR541173],
};

/* ---------------------------------------------------------- fiche de sécurité */
export const ficheSecurite = {
  slug: 'fiche-securite-bougie',
  group: 'bougies',
  crumb: 'Fiche de sécurité bougie',
  teaser: 'FDS, fiche d’information GPSR ou étiquette CLP : trois documents, trois usages, avec un exemple.',
  title: 'Fiche de sécurité bougie : FDS, fiche GPSR ou étiquette CLP ?',
  description: 'Fiche de sécurité d’une bougie : la FDS (REACH art. 31) vient du fournisseur, l’étiquette CLP va sur l’emballage, la fiche GPSR c’est vous. Exemple rempli.',
  h1: 'Fiche de sécurité d’une bougie : quel document vous faut-il vraiment ?',
  citation: ['gpsr', 'clp'],
  lead: `<p>« Fiche de sécurité » désigne trois documents différents. La fiche de données de sécurité (FDS) est un document de 16 rubriques prévu par REACH : vos fournisseurs de parfum et de cire vous la doivent, et vous n’avez pas à en remettre une à vos clients particuliers. L’étiquette CLP, elle, va sur l’emballage de la bougie si le mélange l’exige. La fiche d’information sécurité du GPSR rassemble l’identification du produit, le fabricant, les avertissements et les instructions : c’est celle que vous rédigez, et que notre générateur produit. Elle n’est pas une FDS.</p>`,
  body: `<h2>Trois documents, côte à côte</h2>
<div class="table-scroll"><table class="plain">
<thead><tr><th scope="col"></th><th scope="col">FDS (fiche de données de sécurité)</th><th scope="col">Étiquette CLP</th><th scope="col">Fiche d’information sécurité GPSR</th></tr></thead>
<tbody>
<tr><th scope="row">Texte</th><td>REACH, art. 31 et annexe II</td><td>CLP, titre III et annexe II</td><td>GPSR, art. 9 et 19</td></tr>
<tr><th scope="row">Pour qui</th><td>Les professionnels qui reçoivent le produit</td><td>Tout acheteur</td><td>Le consommateur et les autorités</td></tr>
<tr><th scope="row">Qui la rédige</th><td>Le fournisseur d’un mélange dangereux</td><td>Le fabricant du mélange (vous, pour la bougie)</td><td>Le fabricant (vous)</td></tr>
<tr><th scope="row">Quand</th><td>Mélange dangereux fourni à un professionnel</td><td>Bougie classée ou portant EUH208</td><td>Toute bougie vendue par un professionnel</td></tr>
<tr><th scope="row">Contenu</th><td>16 rubriques : identification, dangers, composition, premiers secours…</td><td>Pictogramme, mentions H et P, EUH208, UFI, fournisseur</td><td>Produit, référence, fabricant, usage prévu, avertissements, instructions, contact réclamations</td></tr>
</tbody></table></div>

<h2>La FDS : ce que REACH demande, et à qui</h2>
<p>REACH oblige le fournisseur d’un mélange dangereux à remettre une FDS « au destinataire » (${L(K.reach31)}, art. 31 §1). L’exception qui vous concerne est au paragraphe 4 : « Sauf si un utilisateur en aval ou un distributeur en fait la demande, la fiche de données de sécurité ne doit pas nécessairement être fournie quand des substances ou des mélanges dangereux proposés ou vendus au grand public sont accompagnés d’informations suffisantes ». La fiche de l’ECHA sur les bougies le dit plus simplement : « La vente directe aux consommateurs n’exige pas que vous produisiez ou transmettiez une FDS à ces derniers ».</p>
<p>Deux cas changent la donne, toujours selon l’ECHA : vous vendez des bougies classées à un professionnel qui les utilise (un restaurant), ou à une boutique qui les revend. Il vous faut alors une FDS de votre bougie, rédigée selon l’annexe II de REACH. C’est un document technique : faites-le établir par un professionnel de la réglementation chimique ou par un logiciel spécialisé. Nous ne le faisons pas.</p>

<h2>Lire la FDS de votre parfum</h2>
<p>C’est le document qui décide de tout le reste. Trois rubriques suffisent :</p>
<ul>
<li>rubrique 2 : la classification du parfum et ses éléments d’étiquetage ;</li>
<li>rubrique 3 : les substances dangereuses, leurs concentrations et leur catégorie (sensibilisant cutané 1, 1A ou 1B) ;</li>
<li>rubrique 15 : les autres règles applicables.</li>
</ul>
<p>Rapportez chaque concentration à votre dosage (8 % de parfum : une substance à 5 % dans le parfum pèse 0,4 % de la bougie), puis comparez aux seuils de notre ${go('/etiquetage-bougie.html#clp', 'page sur l’étiquetage CLP')}. Classez la FDS dans votre documentation technique, avec la date de la version reçue : le GPSR vous demande de garder ce dossier 10 ans (${art(9, 'art. 9 §3')}).</p>

<h2>La fiche d’information sécurité GPSR, remplie</h2>
<p>Le GPSR n’emploie pas le mot « fiche ». Il demande des informations, sur le produit et dans l’annonce : référence, coordonnées du fabricant, instructions et avertissements en français (${art(9, 'art. 9 §5 à §7')}), et les quatre mentions de la vente en ligne (${art(19)}). La fiche sécurité du générateur les rassemble en un document à garder, à joindre au colis ou à mettre en PDF sur votre boutique. Voici sa partie « étiquette et annonce » pour une bougie fictive :</p>
${example(CANDLE, { caption: 'Exemple fictif généré par le générateur gratuit le 17 octobre 2026 (document « Étiquette, emballage et annonce »). La fiche complète contient aussi l’usage prévu, les instructions et le contact pour les réclamations.' })}
<p>Les modèles vierges et cet exemple en DOCX et Markdown sont aussi dans le ${link('https://github.com/VREAD-corp/kit-gpsr-vendeurs/releases/latest', 'paquet de modèles gratuits')} (dossier « exemple-bougie »).</p>

<h2>Ce que cette fiche ne remplace pas</h2>
<ul>
<li>La FDS que vous doivent vos fournisseurs : demandez-la avant d’acheter un parfum.</li>
<li>L’étiquette CLP, si votre bougie est classée ou porte la mention EUH208 : la fiche GPSR ne dispense pas de l’étiquette.</li>
<li>La notification aux centres antipoison et l’UFI d’une bougie classée.</li>
</ul>`,
  faq: [
    ['Dois-je fournir une FDS à mes clients ?', 'Pas aux particuliers : REACH (art. 31 §4) et la fiche ECHA sur les bougies le précisent, l’étiquette doit alors contenir les informations. Il en faut une si vous vendez des bougies classées dangereuses à un professionnel qui les utilise ou les revend.'],
    ['Un exemple de FDS de bougie peut-il me servir ?', 'Une FDS décrit un mélange précis, avec son parfum et son dosage : celle d’un autre fabricant ne vaut pas pour votre bougie. Si vous en avez besoin (vente à une boutique), faites-la établir pour votre formule.'],
    ['Le générateur produit-il une FDS ?', 'Non. Il produit une fiche d’information sécurité au sens du GPSR, un texte d’étiquette et d’annonce, une analyse de risques et des checklists. Il ne calcule pas la classification CLP de votre bougie.'],
  ],
  cta: {
    title: 'Créez la fiche sécurité GPSR de votre bougie',
    text: 'Dix minutes de questionnaire, quatre documents exportables en PDF, DOCX ou Markdown. Gratuit, rien ne quitte votre navigateur.',
    href: TOOL, label: 'Créer la fiche de ma bougie',
    note: `Le ${link(PACK, 'pack GPSR (29 € net)')} ajoute le modèle « bougies et fondants » rempli, le registre des réclamations et la procédure de rappel.`,
  },
  related: ['etiquetage-bougie', 'modeles-gpsr', 'gpsr-etsy'],
  sources: [K.reach31, K.echa, K.echaPdf, K.clp, SRC.gpsr],
};

export const CANDLE_GUIDES = [etiquetage, ficheSecurite];
