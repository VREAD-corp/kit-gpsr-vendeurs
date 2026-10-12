// Mentions légales, privacy notice, B2B terms (CGV professionnels) and the paid-pack page.
// `sales` = validated sales.config.json (scripts/checkout-pages.mjs): SALES_OPEN gates every buy element.
import { ORG_ID, ORG_JSONLD, SITE, abs, url } from './layout.mjs';
import { cgvProBody, prices } from '../../scripts/checkout-pages.mjs';

export const ORDER_PATH = '/commander.html';
export const ORDER_DONE_PATH = '/commande.html';

// Public registry data: recherche-entreprises.api.gouv.fr (SIREN 988 741 773), consulted 2026-10-11.
export const COMPANY = {
  name: 'READ FRANCE SAS',
  form: 'Société par actions simplifiée (SAS)',
  siren: '988 741 773',
  siret: '988 741 773 00010',
  address: '11 rue Rouvet, 75019 Paris, France',
  president: 'Tanguy Warsmann',
  // Share capital: societe.com / RNE (SASU created on 07/05/2025), set on 2026-10-12.
  capital: '1 000 €',
  capitalEn: '€1,000',
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
<p>${COMPANY.name}, ${COMPANY.form}.<br>Siège social : ${COMPANY.address}.<br>SIREN ${COMPANY.siren} (SIRET du siège ${COMPANY.siret}) — <a href="${COMPANY.registry}">fiche publique de l’entreprise</a>.<br>Capital social : ${COMPANY.capital}.<br>TVA non applicable, art. 293 B du CGI (franchise en base).</p>
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
<p>${COMPANY.name}, a French simplified joint-stock company (SAS).<br>Registered office: ${COMPANY.address}.<br>SIREN ${COMPANY.siren} (head-office SIRET ${COMPANY.siret}) — <a href="${COMPANY.registry}">public company record</a>.<br>Share capital: ${COMPANY.capitalEn}.<br>VAT: not applicable, art. 293 B of the French General Tax Code (VAT franchise).</p>
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

export function privacyPage(lang, sales) {
  const open = sales?.SALES_OPEN === true;
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
${open ? `<h2>Exception : la commande du pack documentation</h2>
<p>La page <a href="${SITE.base}${ORDER_PATH}">Commander</a> est la seule à collecter des données : adresse e-mail, raison sociale, SIREN et adresse de facturation de l’entreprise acheteuse, pour exécuter la commande et établir la facture. Le paiement par carte est traité par Stripe, qui charge son module de paiement (et ses cookies de sécurité anti-fraude) sur cette page uniquement. Destinataires, durées et droits : article 13 des <a href="${url('terms', 'fr')}">CGV professionnels</a>.</p>` : `<p>Ventes : le pack documentation n’est pas encore en vente. Les traitements prévus pour les commandes sont décrits à l’article 13 des <a href="${url('terms', 'fr')}">CGV professionnels</a>.</p>`}
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
${open ? `<p>Exception: the <a href="${SITE.base}${ORDER_PATH}" lang="fr">order page</a> of the documentation pack (French businesses only) collects the e-mail address, company name, SIREN and billing address needed to fulfil the order and issue the invoice; card payment is handled by Stripe, which loads its payment module (and anti-fraud cookies) on that page only. See article 13 of the <a href="${url('terms', 'fr')}" lang="fr">B2B terms</a>.</p>\n` : ''}<p>Controller: READ FRANCE SAS, 11 rue Rouvet, 75019 Paris, France. Questions: <a href="${SITE.issues}">GitHub issues</a>. You may also contact your data-protection authority (in France, the <a href="https://www.cnil.fr/en">CNIL</a>).</p>`,
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

// Price as charged (sales.config.json `amount`, in cents): « 29 € net » / « €29 net » (VAT franchise, art. 293 B CGI).
const DEFAULT_SALES = { VAT: 'franchise293B', amount: 2900 };
const whole = (cents) => (cents % 100 ? (cents / 100).toFixed(2) : String(cents / 100));
export function packPriceLabel(lang, sales = DEFAULT_SALES) {
  const std = sales.VAT === 'standard20';
  const n = whole(sales.amount);
  return lang === 'fr' ? `${n.replace('.', ',')} € ${std ? 'TTC' : 'net'}` : `€${n} ${std ? 'incl. VAT' : 'net'}`;
}
const VAT_NOTE = { fr: 'TVA non applicable, art. 293 B du CGI', en: 'VAT not applicable, art. 293 B of the French tax code' };

/** schema.org Product + Offer of the pack (emitted only while SALES_OPEN is true). */
export function packProductJsonld(lang, sales) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Pack documentation GPSR',
    ...(lang === 'en' ? { alternateName: 'GPSR documentation pack' } : {}),
    description: lang === 'fr'
      ? 'Modèles et procédures GPSR (règlement (UE) 2023/988) pour vendeurs en ligne : analyse de risques par catégorie, procédure de rappel, registre des incidents, questionnaire fournisseur, checklists plateformes et REP France. Fichiers DOCX, Markdown et CSV, en français et en anglais.'
      : 'GPSR (Regulation (EU) 2023/988) templates and procedures for online sellers: category risk analyses, recall procedure, incident log, supplier questionnaire, marketplace and French EPR checklists. DOCX, Markdown and CSV files, in French and English.',
    image: `${SITE.origin}${SITE.base}/assets/og.png`,
    url: abs('pack', lang),
    brand: { '@type': 'Brand', name: 'Kit GPSR Vendeurs' },
    sku: 'pack-gpsr',
    offers: {
      '@type': 'Offer',
      price: (sales.amount / 100).toFixed(2),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE.origin}${SITE.base}${ORDER_PATH}`,
      seller: { '@id': ORG_ID },
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

export function packPage(lang, sales) {
  const items = PACK_CONTENTS[lang].map((i) => `<li>${i}</li>`).join('');
  const open = sales?.SALES_OPEN === true;
  const pr = prices(sales ?? DEFAULT_SALES);
  const fr = packPriceLabel('fr', sales ?? DEFAULT_SALES);
  const en = packPriceLabel('en', sales ?? DEFAULT_SALES);
  const jsonld = open ? [ORG_JSONLD, packProductJsonld(lang, sales)] : [ORG_JSONLD];
  if (lang === 'fr')
    return {
      jsonld,
      title: open ? `Documentation GPSR vendeur Etsy, Vinted, Amazon : pack à ${fr}` : 'Documentation GPSR vendeur Etsy, Vinted, Amazon — bientôt disponible',
      description: open
        ? `Modèles GPSR pour vendeurs Etsy, Vinted, Amazon, Shopify : risques par catégorie, rappel, incidents. Pros : ${fr}${pr.std ? '' : `, ${VAT_NOTE.fr}`}.`
        : 'Pack de modèles GPSR étendus par catégorie, procédure de rappel, registre des incidents, questionnaire fournisseur. Bientôt disponible : pas encore en vente.',
      body: `${open ? '<p><span class="pill">Réservé aux professionnels</span></p>' : '<p><span class="pill badge-soon">Bientôt disponible</span></p>'}
<h1>Pack documentation GPSR</h1>
<p class="lead">Pour aller plus loin que le générateur gratuit : des modèles étendus par catégorie de produit et les procédures à tenir prêtes.</p>
${open ? `<p class="price">${pr.short} <small>(${pr.std ? `soit ${pr.ht} HT + ${pr.vat} de TVA à 20 %, ` : 'TVA non applicable, art. 293 B du CGI, '}paiement unique)</small></p>
<p class="btn-row"><a class="btn" href="${SITE.base}${ORDER_PATH}">Commander</a></p>
<p class="hint">Vente aux entreprises immatriculées en France (SIREN). Paiement par carte bancaire avec Stripe ; fichier ZIP et facture acquittée envoyés par e-mail. <a href="${url('terms', 'fr')}">CGV professionnels</a>.</p>` : `<div class="callout"><p><strong>Pas encore en vente.</strong> Le pack existe et il est terminé, mais le paiement en ligne n’est pas encore ouvert : il le sera après l’ouverture du compte de paiement de READ FRANCE SAS. Aucun paiement ne peut être effectué aujourd’hui.</p></div>
<p class="price">${fr} <small>(prix prévu, ${pr.std ? '' : `${VAT_NOTE.fr}, `}paiement unique)</small></p>`}
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
<p>Conditions de vente : <a href="${url('terms', 'fr')}">CGV professionnels</a> (vente réservée aux entreprises).</p>`,
    };
  return {
    jsonld,
    title: open ? `GPSR documentation for Etsy sellers – template pack, ${en}` : 'GPSR documentation for Etsy sellers – template pack, coming soon',
    description: open
      ? `GPSR templates for Etsy, Vinted, Amazon, Shopify sellers: recall, incident log. French firms: ${en}${pr.std ? '' : `, ${VAT_NOTE.en}`}.`
      : 'Extended GPSR templates by product category, recall procedure, incident log, supplier questionnaire. Coming soon: not on sale yet.',
    body: `${open ? '<p><span class="pill">Businesses only</span></p>' : '<p><span class="pill badge-soon">Coming soon</span></p>'}
<h1>GPSR documentation pack</h1>
<p class="lead">To go further than the free generator: extended templates per product category and the procedures to keep ready.</p>
${open ? `<p class="price">${en} <small>(${pr.std ? '' : `${VAT_NOTE.en}; `}one-off payment)</small></p>
<p class="btn-row"><a class="btn" href="${SITE.base}${ORDER_PATH}" lang="fr">Order (page in French)</a></p>
<p class="hint">Sold only to businesses registered in France (SIREN number required), under the French <a href="${url('terms', 'fr')}" lang="fr">B2B terms of sale</a>. Card payment with Stripe; ZIP file and paid invoice sent by e-mail.</p>` : `<div class="callout"><p><strong>Not on sale yet.</strong> The pack exists and is finished, but online payment is not open yet: it will be once READ FRANCE SAS’s payment account is opened. No payment can be made today.</p></div>
<p class="price">${en} <small>(planned price, ${pr.std ? '' : `${VAT_NOTE.en}; `}one-off payment)</small></p>`}
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
<p>Terms of sale: <a href="${url('terms', 'en')}">B2B terms</a> (businesses only).</p>`,
  };
}

export function termsPage(lang, sales) {
  const pr = prices(sales);
  if (lang === 'fr')
    return {
      title: 'Conditions générales de vente aux professionnels — Kit GPSR Vendeurs',
      description: 'CGV B2B du Pack documentation GPSR (READ FRANCE SAS), version du 12 octobre 2026 : vente aux professionnels, prix, paiement Stripe, livraison par e-mail, licence, facturation.',
      noindex: !sales.SALES_OPEN,
      body: cgvProBody({
        config: sales,
        productName: 'Pack documentation GPSR',
        contact: `en répondant à l’e-mail de livraison de la commande, ou par les <a href="${SITE.issues}">issues GitHub du projet</a> (publiques : n’y mettez aucune donnée personnelle)`,
        legalUrl: url('legal', 'fr'),
        privacyUrl: url('privacy', 'fr'),
        productDescription: `« Pack documentation GPSR » : modèles et procédures relatifs au règlement (UE) 2023/988 sur la sécurité générale des produits et à la responsabilité élargie du producteur en France, en français et en anglais (fichiers DOCX, Markdown et CSV), tels que décrits sur la <a href="${url('pack', 'fr')}">page du pack</a> à la date de la commande.`,
        licenceScope: 'l’Acheteur peut copier les fichiers, modifier les modèles et les utiliser pour les produits qu’il fabrique, importe ou distribue lui-même, dans tous ses établissements.',
        updates: 'Les mises à jour éventuelles du pack ne sont pas comprises dans le prix, sauf mention contraire sur la page du pack.',
        disclaimer: [
          'Le pack est un <strong>outil d’information et de mise en forme de documents</strong>. Il ne constitue pas un conseil juridique, ne vaut pas attestation de conformité et ne remplace ni les textes officiels ni l’avis d’un professionnel. L’Acheteur reste seul responsable de la sécurité de ses produits, du contenu et de l’exactitude des documents qu’il établit, et du respect des obligations qui lui incombent en tant que fabricant, importateur ou distributeur.',
          'READ FRANCE SAS <strong>n’agit pas et ne propose pas d’agir comme « personne responsable »</strong> au sens de l’article 16 du règlement (UE) 2023/988 et de l’article 4 du règlement (UE) 2019/1020, ni comme mandataire, représentant autorisé, importateur ou mandataire au titre de la responsabilité élargie du producteur (REP). L’achat du pack ne lui confère aucun de ces rôles.',
          'Le pack ne couvre pas les règles propres aux jouets, cosmétiques, équipements électriques ou matériaux au contact des denrées alimentaires. Le contenu est à jour à sa date de version ; il appartient à l’Acheteur de vérifier les textes applicables.',
        ],
      }),
    };
  return {
    title: 'Terms of sale for businesses (summary) — GPSR Seller Kit',
    description: 'Summary in English of the French B2B terms of sale of the GPSR documentation pack (version of 12 October 2026). The French version prevails.',
    noindex: !sales.SALES_OPEN,
    body: `<h1>Terms of sale for businesses — summary</h1>
<p class="hint">Version of 12 October 2026. Only the <a href="${url('terms', 'fr')}" lang="fr">French B2B terms (CGV professionnels)</a> are binding; this summary is for information.</p>
${sales.SALES_OPEN ? '' : '<div class="callout"><p><strong>Not on sale yet.</strong> No order or payment is possible today.</p></div>'}
<ul>
<li><strong>Seller:</strong> ${COMPANY.name}, share capital ${COMPANY.capitalEn}, ${COMPANY.address}, SIREN ${COMPANY.siren}, RCS Paris.</li>
<li><strong>Buyers:</strong> businesses registered in France (SIREN), ordering for their professional activity. No consumer sales.</li>
<li><strong>Product:</strong> the “GPSR documentation pack”, a digital ZIP file sent by e-mail with the paid invoice.</li>
<li><strong>Price:</strong> ${pr.std ? `€${(sales.amount / 100).toFixed(2)} incl. 20% French VAT` : `€${(sales.amount / 100).toFixed(2)} net (${VAT_NOTE.en})`}; card payment through Stripe.</li>
<li><strong>No withdrawal right</strong> (business-to-business sale); a defective file is replaced or refunded.</li>
<li><strong>Licence:</strong> non-exclusive, non-transferable, internal use only; no resale or redistribution.</li>
<li><strong>Not legal advice;</strong> READ FRANCE SAS never acts as EU responsible person, authorised representative, importer or EPR agent.</li>
<li><strong>Liability</strong> limited to the price paid. Statutory late-payment penalties (3 × the French legal interest rate) and the €40 recovery fee apply.</li>
<li><strong>French law;</strong> exclusive jurisdiction of the Paris courts.</li>
</ul>`,
  };
}

/** Old consumer draft (11 October 2026), superseded: B2B sales only. */
export function legacyTermsPage() {
  return {
    title: 'Conditions générales de vente — Kit GPSR Vendeurs',
    description: 'Le Pack documentation GPSR est vendu uniquement aux professionnels : voir les conditions générales de vente aux professionnels.',
    noindex: true,
    body: `<h1>Conditions générales de vente</h1>
<p>Le Pack documentation GPSR est vendu <strong>uniquement aux professionnels</strong>. Les conditions applicables sont les <a href="${url('terms', 'fr')}">conditions générales de vente aux professionnels</a>. L’ancien projet de conditions grand public du 11 octobre 2026 est abandonné.</p>`,
  };
}
