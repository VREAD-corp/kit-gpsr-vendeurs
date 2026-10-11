// Mentions légales, privacy notice, draft terms (CGV) and the paid-pack page.
import { SITE, url } from './layout.mjs';

// Public registry data: recherche-entreprises.api.gouv.fr (SIREN 988 741 773), consulted 2026-10-11.
export const COMPANY = {
  name: 'READ FRANCE SAS',
  form: 'Société par actions simplifiée (SAS)',
  siren: '988 741 773',
  siret: '988 741 773 00010',
  address: '11 rue Rouvet, 75019 Paris, France',
  president: 'Tanguy Warsmann',
  registry: 'https://annuaire-entreprises.data.gouv.fr/entreprise/988741773',
};

const HOST = 'GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis — https://github.com (service GitHub Pages).';
const HOST_EN = 'GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA — https://github.com (GitHub Pages service).';

export function legalPage(lang) {
  if (lang === 'fr')
    return {
      title: 'Mentions légales — Kit GPSR Vendeurs',
      description: 'Mentions légales du Kit GPSR Vendeurs, un produit de READ FRANCE SAS : éditeur, directeur de la publication, hébergeur, licences.',
      body: `<h1>Mentions légales</h1>
<h2>Éditeur</h2>
<p>${COMPANY.name}, ${COMPANY.form}.<br>Siège social : ${COMPANY.address}.<br>SIREN ${COMPANY.siren} (SIRET du siège ${COMPANY.siret}) — <a href="${COMPANY.registry}">fiche publique de l’entreprise</a>.<br>Capital social et numéro de TVA intracommunautaire : non affichés ici tant qu’ils ne sont pas confirmés par la direction.</p>
<p>Directeur de la publication : ${COMPANY.president}, président.</p>
<p>Contact : en attendant l’ouverture d’une adresse dédiée, via les <a href="${SITE.issues}">issues GitHub du projet</a> (publiques : n’y mettez aucune donnée personnelle).</p>
<h2>Hébergeur</h2>
<p>${HOST}</p>
<h2>Nature du service</h2>
<p>Le Kit GPSR Vendeurs est un <strong>outil d’information et de mise en forme de documents</strong>. Il ne constitue pas un conseil juridique, ne vaut pas attestation de conformité et ne remplace ni les textes officiels ni l’avis d’un professionnel. Vous restez seul·e responsable du contenu des documents que vous générez, de leur exactitude et de la sécurité de vos produits.</p>
<p>READ FRANCE SAS <strong>n’agit pas</strong> et ne propose pas d’agir comme « personne responsable » au sens de l’article 16 du règlement (UE) 2023/988 et de l’article 4 du règlement (UE) 2019/1020, ni comme mandataire, représentant autorisé, importateur ou mandataire REP.</p>
<h2>Propriété intellectuelle et licences</h2>
<ul>
<li>Code source : licence MIT (<a href="${SITE.repo}">${SITE.repo}</a>).</li>
<li>Textes et modèles du site et du pack gratuit : licence Creative Commons Attribution 4.0 (CC BY 4.0).</li>
<li>Extraits de textes de l’Union européenne : © Union européenne, <a href="https://eur-lex.europa.eu/">EUR-Lex</a>, réutilisation autorisée (décision 2011/833/UE). Textes français : Légifrance, données publiques réutilisables.</li>
</ul>`,
    };
  return {
    title: 'Legal notice — GPSR Seller Kit',
    description: 'Legal notice of the GPSR Seller Kit, a product of READ FRANCE SAS: publisher, publication director, host, licences.',
    body: `<h1>Legal notice</h1>
<h2>Publisher</h2>
<p>${COMPANY.name}, a French simplified joint-stock company (SAS).<br>Registered office: ${COMPANY.address}.<br>SIREN ${COMPANY.siren} (head-office SIRET ${COMPANY.siret}) — <a href="${COMPANY.registry}">public company record</a>.<br>Share capital and EU VAT number: not shown until confirmed by management.</p>
<p>Publication director: ${COMPANY.president}, president.</p>
<p>Contact: until a dedicated mailbox exists, through the project’s <a href="${SITE.issues}">GitHub issues</a> (public: do not post personal data).</p>
<h2>Host</h2>
<p>${HOST_EN}</p>
<h2>Nature of the service</h2>
<p>The GPSR Seller Kit is an <strong>information and document-formatting tool</strong>. It is not legal advice, is not a certificate of compliance and does not replace the official texts or professional advice. You remain solely responsible for the content of the documents you generate, their accuracy and the safety of your products.</p>
<p>READ FRANCE SAS <strong>does not act</strong>, and does not offer to act, as a “responsible person” under Article 16 of Regulation (EU) 2023/988 and Article 4 of Regulation (EU) 2019/1020, nor as an authorised representative, importer or EPR agent.</p>
<h2>Intellectual property and licences</h2>
<ul>
<li>Source code: MIT licence (<a href="${SITE.repo}">${SITE.repo}</a>).</li>
<li>Site texts and free templates: Creative Commons Attribution 4.0 (CC BY 4.0).</li>
<li>Extracts of EU law: © European Union, <a href="https://eur-lex.europa.eu/">EUR-Lex</a>, reuse authorised (Decision 2011/833/EU). French texts: Légifrance open public data.</li>
</ul>`,
  };
}

export function privacyPage(lang) {
  if (lang === 'fr')
    return {
      title: 'Confidentialité — Kit GPSR Vendeurs',
      description: 'Aucune donnée personnelle collectée : le générateur fonctionne entièrement dans votre navigateur, sans cookies ni traceurs.',
      body: `<h1>Confidentialité</h1>
<p><strong>En bref : nous ne collectons aucune donnée.</strong> Le générateur fonctionne entièrement dans votre navigateur.</p>
<ul>
<li>Les réponses au questionnaire ne sont <strong>jamais envoyées</strong> à un serveur : il n’y a ni formulaire envoyé, ni base de données, ni compte. La page interdit techniquement toute connexion sortante (politique de sécurité du contenu <code>connect-src 'none'</code>).</li>
<li>Rien n’est enregistré dans votre navigateur (pas de cookies, pas de stockage local). Pour reprendre plus tard, utilisez « Enregistrer mes réponses » : un fichier est créé sur votre appareil, et vous seul·e le détenez.</li>
<li>Aucun cookie, aucun outil de mesure d’audience, aucun traceur tiers : aucun bandeau de consentement n’est donc nécessaire.</li>
<li>Hébergement : GitHub Pages (GitHub, Inc.). Comme tout hébergeur web, GitHub peut traiter des données techniques de connexion (adresse IP, par exemple) pour assurer la sécurité du service, selon sa <a href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement">déclaration de confidentialité</a>. READ FRANCE SAS n’a pas accès à ces journaux.</li>
<li>Mesure : nous comptons seulement le nombre de téléchargements du pack de modèles gratuit, tel que GitHub l’affiche publiquement pour chaque fichier de « release » (un total, sans aucune donnée sur les personnes).</li>
</ul>
<p>Responsable : READ FRANCE SAS, 11 rue Rouvet, 75019 Paris. Questions : <a href="${SITE.issues}">issues GitHub</a>. Vous pouvez aussi saisir la <a href="https://www.cnil.fr/fr/plaintes">CNIL</a>.</p>`,
    };
  return {
    title: 'Privacy — GPSR Seller Kit',
    description: 'No personal data collected: the generator runs entirely in your browser, with no cookies or trackers.',
    body: `<h1>Privacy</h1>
<p><strong>In short: we collect no data.</strong> The generator runs entirely in your browser.</p>
<ul>
<li>Your answers are <strong>never sent</strong> to a server: there is no form submission, no database and no account. The page technically blocks every outgoing connection (Content Security Policy <code>connect-src 'none'</code>).</li>
<li>Nothing is stored in your browser (no cookies, no local storage). To continue later, use “Save my answers”: a file is created on your device and only you hold it.</li>
<li>No cookies, no audience measurement, no third-party trackers, so no consent banner is needed.</li>
<li>Hosting: GitHub Pages (GitHub, Inc.). Like any web host, GitHub may process technical connection data (such as IP addresses) to secure the service, under its <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">privacy statement</a>. READ FRANCE SAS has no access to those logs.</li>
<li>Measurement: we only count downloads of the free template pack, as GitHub shows publicly for each release file (a total, with no data about people).</li>
</ul>
<p>Controller: READ FRANCE SAS, 11 rue Rouvet, 75019 Paris, France. Questions: <a href="${SITE.issues}">GitHub issues</a>. You may also contact your data-protection authority (in France, the <a href="https://www.cnil.fr/en">CNIL</a>).</p>`,
  };
}

const PACK_CONTENTS = {
  fr: [
    'Analyse de risques étendue et grille de cotation, avec exemples remplis pour 5 catégories',
    'Modèles par catégorie : textile, bijoux, bougies et fondants, articles enfants (non-jouets) et renvois jouets, décoration/céramique — et une fiche « exclusions » (cosmétiques, savons, denrées, électrique)',
    'Questionnaire fournisseur (matières, substances, preuves, traçabilité) en FR et EN',
    'Procédure de rappel et de mesures correctives, avec modèle d’avis de rappel et calendrier',
    'Registre des incidents, réclamations et accidents (CSV + DOCX)',
    'Sommaire du dossier technique (à conserver 10 ans) et registre des lots',
    'Checklists plateformes et REP France détaillées',
    'Formats DOCX (Word, LibreOffice, Google Docs), Markdown et CSV ; français et anglais',
  ],
  en: [
    'Extended risk analysis and scoring grid, with filled-in examples for 5 categories',
    'Category templates: textiles, jewellery, candles and wax melts, children’s items (non-toys) and toy pointers, decor/ceramics — plus an “exclusions” sheet (cosmetics, soaps, food, electrical)',
    'Supplier questionnaire (materials, substances, evidence, traceability) in FR and EN',
    'Recall and corrective-action procedure, with recall-notice template and timeline',
    'Incident, complaint and accident log (CSV + DOCX)',
    'Technical-file index (keep for 10 years) and batch register',
    'Detailed marketplace and French EPR checklists',
    'DOCX (Word, LibreOffice, Google Docs), Markdown and CSV; French and English',
  ],
};

export function packPage(lang) {
  const items = PACK_CONTENTS[lang].map((i) => `<li>${i}</li>`).join('');
  if (lang === 'fr')
    return {
      title: 'Pack documentation GPSR (29 € TTC) — bientôt disponible',
      description: 'Pack de modèles GPSR étendus par catégorie, procédure de rappel, registre des incidents, questionnaire fournisseur. Bientôt disponible : pas encore en vente.',
      body: `<p><span class="pill badge-soon">Bientôt disponible</span></p>
<h1>Pack documentation GPSR</h1>
<p class="lead">Pour aller plus loin que le générateur gratuit : des modèles étendus par catégorie de produit et les procédures à tenir prêtes.</p>
<div class="callout"><p><strong>Pas encore en vente.</strong> Le pack existe et il est terminé, mais le paiement en ligne n’est pas encore ouvert : il le sera après l’ouverture du compte de paiement de READ FRANCE SAS. Aucun paiement ne peut être effectué aujourd’hui.</p></div>
<p class="price">29 € TTC <small>(prix prévu, paiement unique)</small></p>
<h2>Contenu du pack</h2>
<ul>${items}</ul>
<h2>Ce que le pack n’est pas</h2>
<ul>
<li>Ce n’est pas un conseil juridique ni une certification : vous restez responsable de vos produits et de vos documents.</li>
<li>READ FRANCE SAS n’agit pas comme personne responsable dans l’UE, mandataire ou importateur, et ne propose pas ce service.</li>
<li>Il ne remplace pas les obligations propres aux jouets, cosmétiques, appareils électriques ou matériaux au contact des aliments.</li>
</ul>
<h2>En attendant</h2>
<p>Le <a href="${url('tool', 'fr')}">générateur gratuit</a> et le <a href="${SITE.releases}">pack de modèles gratuit</a> (fichier ZIP sur GitHub) couvrent déjà la fiche de sécurité, l’étiquette, l’analyse de risques et les checklists.</p>
<p>Conditions de vente prévues : <a href="${url('terms', 'fr')}">projet de CGV</a> (en cours de validation).</p>`,
    };
  return {
    title: 'GPSR documentation pack (€29 incl. VAT) — coming soon',
    description: 'Extended GPSR templates by product category, recall procedure, incident log, supplier questionnaire. Coming soon: not on sale yet.',
    body: `<p><span class="pill badge-soon">Coming soon</span></p>
<h1>GPSR documentation pack</h1>
<p class="lead">To go further than the free generator: extended templates per product category and the procedures to keep ready.</p>
<div class="callout"><p><strong>Not on sale yet.</strong> The pack exists and is finished, but online payment is not open yet: it will be once READ FRANCE SAS’s payment account is opened. No payment can be made today.</p></div>
<p class="price">€29 incl. VAT <small>(planned price, one-off payment)</small></p>
<h2>What’s in the pack</h2>
<ul>${items}</ul>
<h2>What the pack is not</h2>
<ul>
<li>It is not legal advice or certification: you remain responsible for your products and documents.</li>
<li>READ FRANCE SAS does not act as EU responsible person, authorised representative or importer, and does not offer that service.</li>
<li>It does not replace the specific rules for toys, cosmetics, electrical equipment or food-contact materials.</li>
</ul>
<h2>Meanwhile</h2>
<p>The <a href="${url('tool', 'en')}">free generator</a> and the <a href="${SITE.releases}">free template pack</a> (ZIP file on GitHub) already cover the safety sheet, label, risk analysis and checklists.</p>
<p>Planned terms of sale: <a href="${url('terms', 'en')}">draft terms</a> (pending validation).</p>`,
  };
}

export function termsPage(lang) {
  const fr = `<h1>Conditions générales de vente — projet</h1>
<div class="callout"><p><strong>Projet non applicable.</strong> Ces conditions sont un projet en attente de validation par la direction de READ FRANCE SAS. Aucune vente n’est ouverte à ce jour.</p></div>
<h2>1. Vendeur</h2>
<p>${COMPANY.name}, ${COMPANY.form}, ${COMPANY.address}, SIREN ${COMPANY.siren}. Contact : <a href="${SITE.issues}">issues GitHub</a> (adresse e-mail à venir).</p>
<h2>2. Produit</h2>
<p>« Pack documentation GPSR » : contenu numérique téléchargeable (fichiers DOCX, Markdown et CSV, en français et en anglais), décrit sur la <a href="${url('pack', 'fr')}">page du pack</a>. Il s’agit de modèles et d’informations, pas d’un conseil juridique ni d’une prestation de « personne responsable ».</p>
<h2>3. Prix et paiement</h2>
<p>29 € TTC (TVA française 20 % incluse), paiement unique par carte via Stripe (page de paiement hébergée par Stripe). Le prix applicable est celui affiché au moment de la commande.</p>
<h2>4. Commande et livraison</h2>
<p>La commande est validée par le bouton « Commander avec obligation de paiement ». Après paiement, un lien de téléchargement est fourni immédiatement sur la page de commande et par e-mail ; il est valable 72 heures et peut être renouvelé depuis la page de commande.</p>
<h2>5. Droit de rétractation</h2>
<p>Conformément à l’article L221-28 13° du Code de la consommation, le droit de rétractation ne peut être exercé pour la fourniture d’un contenu numérique non fourni sur un support matériel dont l’exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation. Au moment de la commande, vous êtes invité·e à donner cet accord et à renoncer à ce droit au moyen d’une case à cocher distincte ; la confirmation vous est adressée sur un support durable.</p>
<h2>6. Garantie légale de conformité</h2>
<p>Le contenu numérique bénéficie de la garantie légale de conformité (articles L224-25-12 et suivants du Code de la consommation). En cas de défaut (fichier illisible, contenu manquant), contactez-nous : nous fournirons une version conforme ou, à défaut, vous rembourserons.</p>
<h2>7. Responsabilité</h2>
<p>Le pack fournit des modèles et des informations générales mises à jour à la date indiquée. Il appartient à l’acheteur d’adapter les documents à ses produits et de vérifier les textes applicables ; READ FRANCE SAS n’assume pas les obligations de l’acheteur en tant que fabricant, importateur ou distributeur.</p>
<h2>8. Données personnelles</h2>
<p>Les données nécessaires à la commande (e-mail, données de paiement traitées par Stripe) sont utilisées pour exécuter la commande et respecter les obligations comptables. Voir la <a href="${url('privacy', 'fr')}">page confidentialité</a> (elle sera complétée avant l’ouverture des ventes).</p>
<h2>9. Médiation et litiges</h2>
<p>Médiateur de la consommation : à désigner avant l’ouverture des ventes. Droit français applicable.</p>`;
  const en = `<h1>Terms of sale — draft</h1>
<div class="callout"><p><strong>Draft, not in force.</strong> These terms are pending validation by READ FRANCE SAS management. No sale is open today. The French version will prevail.</p></div>
<p>Summary of the planned terms: the “GPSR documentation pack” is downloadable digital content (DOCX, Markdown, CSV; French and English) sold by ${COMPANY.name} (${COMPANY.address}, SIREN ${COMPANY.siren}) for €29 including 20% French VAT, paid once by card through a Stripe-hosted checkout page. A download link is provided immediately after payment (valid 72 hours, renewable from the order page).</p>
<p>Under Article L221-28 13° of the French Consumer Code, the 14-day withdrawal right does not apply once you have expressly agreed to immediate delivery and expressly waived that right (separate checkbox at checkout; confirmation on a durable medium). The legal guarantee of conformity for digital content (Art. L224-25-12 et seq.) applies.</p>
<p>The pack contains templates and general information; it is not legal advice and READ FRANCE SAS does not act as a responsible person, importer or authorised representative. Consumer mediator: to be appointed before sales open. French law applies. <a href="${url('terms', 'fr')}">Read the full French draft</a>.</p>`;
  return lang === 'fr'
    ? { title: 'CGV (projet) — Kit GPSR Vendeurs', description: 'Projet de conditions générales de vente du Pack documentation GPSR, en attente de validation. Aucune vente ouverte.', body: fr, noindex: true }
    : { title: 'Terms of sale (draft) — GPSR Seller Kit', description: 'Draft terms of sale for the GPSR documentation pack, pending validation. No sale open.', body: en, noindex: true };
}
