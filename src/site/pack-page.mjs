// Sales page of the paid « Pack documentation GPSR » (FR) and its English version (French businesses only).
// Contents match the deliverable built by the private kit-gpsr-pack repo (v1.0.0: 13 documents per language,
// DOCX + Markdown, 2 CSV registers per language). Refund, updates, delivery and invoice answers quote the
// B2B terms (cgv-pro.html, art. 4, 6, 7, 8, 10, 12): nothing is promised beyond them.
// `sales` = validated sales.config.json: SALES_OPEN gates every buy element.
import { ORG_JSONLD, SITE, url } from './layout.mjs';
import { DEFAULT_SALES, ORDER_PATH, VAT_NOTE, packPriceLabel, packProductJsonld } from './legal-pages.mjs';
import { prices } from '../../scripts/checkout-pages.mjs';
import { PREVIEWS, aboutBlock, docStack, factsBlock, gallery, sourceList, sourcesSection, stickyCta } from './marketing.mjs';

const DOCS = {
  fr: [
    ['Procédure de rappel et de mesures correctives', 'calendrier type, modèle d’avis de rappel (art. 36), remèdes (art. 37), contacts à tenir prêts'],
    ['Registre des réclamations, accidents et rappels', 'le registre interne de l’art. 9 §12, en DOCX et en CSV'],
    ['Dossier technique : sommaire et registre des lots', 'à conserver 10 ans, registre des lots en CSV'],
    ['Méthode d’analyse de risques et grille de cotation', 'étapes, échelles de gravité et de probabilité, matrice de décision'],
    ['5 modèles par catégorie avec exemples remplis', 'textile, bijoux, bougies et fondants, articles enfants (non-jouets), décoration et céramique'],
    ['Fiche « exclusions »', 'cosmétiques, jouets, électrique, contact alimentaire : les textes qui s’appliquent à la place'],
    ['Questionnaire fournisseur bilingue', 'matières, substances (REACH), essais, traçabilité'],
    ['Checklists plateformes et REP France détaillées', 'Etsy, Vinted Pro, Amazon, Shopify ; calendrier annuel'],
    ['Fabricant hors UE : choisir et suivre sa personne responsable', 'points à vérifier avant de signer, fiche de suivi (information seulement)'],
  ],
  en: [
    ['Recall and corrective-action procedure', 'typical timeline, recall notice template (Art. 36), remedies (Art. 37), contacts to keep ready'],
    ['Register of complaints, accidents and recalls', 'the internal register of Art. 9(12), as DOCX and CSV'],
    ['Technical file: index and batch register', 'keep for 10 years; batch register as CSV'],
    ['Risk-analysis method and scoring grid', 'steps, severity and probability scales, decision matrix'],
    ['5 category templates with filled-in examples', 'textiles, jewellery, candles and wax melts, children’s items (non-toys), decor and ceramics'],
    ['“Exclusions” sheet', 'cosmetics, toys, electrical, food contact: the texts that apply instead'],
    ['Bilingual supplier questionnaire', 'materials, substances (REACH), tests, traceability'],
    ['Detailed marketplace and French EPR checklists', 'Etsy, Vinted Pro, Amazon, Shopify; yearly calendar'],
    ['Manufacturer outside the EU: choosing and monitoring your responsible person', 'points to check before signing, tracking sheet (information only)'],
  ],
};

// Free generator vs free + pack.
const COMPARE = {
  fr: [
    ['Fiche d’information sécurité, texte d’étiquette et d’annonce (art. 19)', 1, 1],
    ['Analyse de risques du produit et checklists GPSR, plateformes, REP', 1, 1],
    ['Procédure de rappel et modèle d’avis de rappel (art. 36 et 37)', 0, 1],
    ['Registre des réclamations, accidents et rappels (art. 9 §12), DOCX + CSV', 0, 1],
    ['Sommaire du dossier technique et registre des lots', 0, 1],
    ['Méthode d’analyse de risques pas à pas, échelles et matrice de décision', 0, 1],
    ['Modèles par catégorie avec exemples remplis + fiche « exclusions »', 0, 1],
    ['Questionnaire fournisseur bilingue', 0, 1],
    ['Calendrier annuel et checklists plateformes et REP détaillées', 0, 1],
  ],
  en: [
    ['Safety information sheet, label and listing text (Art. 19)', 1, 1],
    ['Product risk analysis and GPSR, marketplace and EPR checklists', 1, 1],
    ['Recall procedure and recall notice template (Art. 36 and 37)', 0, 1],
    ['Register of complaints, accidents and recalls (Art. 9(12)), DOCX + CSV', 0, 1],
    ['Technical-file index and batch register', 0, 1],
    ['Step-by-step risk-analysis method, scales and decision matrix', 0, 1],
    ['Category templates with filled-in examples + “exclusions” sheet', 0, 1],
    ['Bilingual supplier questionnaire', 0, 1],
    ['Yearly calendar and detailed marketplace and EPR checklists', 0, 1],
  ],
};

export function compareTable(lang, priceLabel) {
  const fr = lang === 'fr';
  const yes = `<span aria-hidden="true">✓</span><span class="sr-only">${fr ? 'inclus' : 'included'}</span>`;
  const no = `<span aria-hidden="true">—</span><span class="sr-only">${fr ? 'non inclus' : 'not included'}</span>`;
  return `<div class="compare-wrap"><table class="compare">
<caption class="sr-only">${fr ? 'Comparaison du générateur gratuit et du pack' : 'Free generator compared with the pack'}</caption>
<thead><tr><th scope="col">${fr ? 'Document' : 'Document'}</th><th scope="col">${fr ? 'Générateur gratuit' : 'Free generator'}</th><th scope="col" class="pk">${fr ? 'Gratuit + pack' : 'Free + pack'}</th></tr></thead>
<tbody>
${COMPARE[lang].map(([l, a, b]) => `<tr><th scope="row">${l}</th><td class="${a ? 'y' : 'n'}">${a ? yes : no}</td><td class="${b ? 'y' : 'n'}">${b ? yes : no}</td></tr>`).join('\n')}
<tr><th scope="row"><strong>${fr ? 'Prix' : 'Price'}</strong></th><td class="y">${fr ? 'Gratuit' : 'Free'}</td><td class="y">${priceLabel}</td></tr>
</tbody></table></div>`;
}

const FAQ = {
  fr: (o) => [
    ['Quelle différence entre le générateur gratuit et le pack ?', 'Le générateur produit, pour un produit, les documents à afficher et à conserver dès la mise en vente : fiche d’information sécurité, texte d’étiquette et d’annonce, analyse de risques et checklists. Le pack ajoute ce qu’il faut avoir prêt avant un incident ou un contrôle : procédure de rappel, registre des réclamations, dossier technique et registre des lots, questionnaire fournisseur, et des modèles par catégorie avec exemples remplis.'],
    ['Qui peut acheter le pack ?', `Les entreprises immatriculées en France (numéro SIREN), y compris les micro-entreprises, pour leur activité professionnelle. Le pack n’est pas vendu aux consommateurs ni aux entreprises sans SIREN (<a href="${o.cgv}">CGV professionnels</a>, art. 2).`],
    ['Comment le pack est-il livré ?', 'Par e-mail : un fichier ZIP envoyé dès la confirmation du paiement, au plus tard dans les 24 heures (CGV, art. 6). Il contient chaque document en DOCX (Word, LibreOffice, Google Docs) et en Markdown, en français et en anglais, et les deux registres en CSV.'],
    ['Vais-je recevoir une facture ?', 'Oui. Une facture acquittée en PDF, établie au nom de votre entreprise (raison sociale, SIREN, adresse de facturation saisis à la commande), est envoyée avec le fichier (CGV, art. 12).'],
    ['Les mises à jour sont-elles comprises ?', 'Le pack est livré dans sa version 1.0.0, avec des textes vérifiés au 11 octobre 2026. Les mises à jour éventuelles ne sont pas comprises dans le prix (CGV, art. 10).'],
    ['Puis-je être remboursé ?', 'La vente se fait entre professionnels : le droit de rétractation ne s’applique pas (CGV, art. 7). Si le fichier livré est illisible, incomplet ou ne correspond pas à la description, signalez-le dans les 30 jours : nous fournissons un fichier conforme ou, à défaut, nous remboursons le prix (CGV, art. 10).'],
    ['Puis-je l’utiliser pour plusieurs produits ou boutiques ?', 'Oui : pour tous les produits que votre entreprise fabrique, importe ou distribue, dans tous ses établissements, en modifiant les modèles librement. La revente et la diffusion à d’autres entreprises sont interdites (CGV, art. 8).'],
    ['Le pack me rend-il conforme ?', 'Non : ce sont des modèles et des informations générales, pas un conseil juridique. Vous restez responsable de vos produits et de vos documents. READ FRANCE SAS n’agit pas comme personne responsable dans l’UE, mandataire ou importateur. Cosmétiques, jouets, appareils électriques et matériaux au contact des aliments ont leurs propres règles : la fiche « exclusions » vous oriente vers les textes.'],
  ],
  en: (o) => [
    ['Who can buy the pack?', `Only businesses registered in France with a SIREN number, for their professional activity, under the French <a href="${o.cgv}" lang="fr">B2B terms</a>. If your business is not registered in France, you cannot buy it; the free generator stays available to everyone.`],
    ['What is the difference with the free generator?', 'The generator produces, for one product, the documents to show and keep when you start selling: safety information sheet, label and listing text, risk analysis and checklists. The pack adds what to have ready before an incident or an inspection: recall procedure, complaints register, technical file and batch register, supplier questionnaire, and category templates with filled-in examples.'],
    ['How is it delivered? Do I get an invoice?', 'By e-mail: a ZIP file sent once payment is confirmed, at the latest within 24 hours, with a paid PDF invoice in your company’s name. Each document comes as DOCX and Markdown, in French and English, plus the two registers as CSV.'],
    ['Are updates included?', 'The pack ships as version 1.0.0, with texts checked on 11 October 2026. Any updates are not included in the price (French B2B terms, art. 10).'],
    ['Can I get a refund?', 'It is a business-to-business sale, so there is no withdrawal right. If the file is unreadable, incomplete or does not match the description, report it within 30 days: we supply a correct file or, failing that, refund the price (French B2B terms, art. 7 and 10).'],
    ['Does the pack make me compliant?', 'No: these are templates and general information, not legal advice. You remain responsible for your products and documents. READ FRANCE SAS does not act as EU responsible person, authorised representative or importer.'],
  ],
};

export function packPage(lang, sales) {
  const fr = lang === 'fr';
  const open = sales?.SALES_OPEN === true;
  const cfg = sales ?? DEFAULT_SALES;
  const pr = prices(cfg);
  const label = packPriceLabel(lang, cfg); // « 29 € net » / « €29 net »
  const amount = label.replace(/\s*(net|TTC|incl\. VAT)$/, ''); // « 29 € » / « €29 »
  const order = `${SITE.base}${ORDER_PATH}`;
  const cgv = url('terms', 'fr');
  const jsonld = open ? [ORG_JSONLD, packProductJsonld(lang, sales)] : [ORG_JSONLD];
  const { ref, html: srcHtml } = sourceList(lang, ['gpsr', 'amazon', 'etsy']);
  const prev = PREVIEWS[lang];
  const stack = docStack(prev.map((p) => p[0]), prev.map((p) => (fr ? 'Aperçu : ' : 'Preview: ') + p[1]), fr ? 'Aperçus réels du pack' : 'Real pack pages');
  const faq = FAQ[lang]({ cgv });
  const docList = `<ul class="doc-list">${DOCS[lang].map(([t, d]) => `<li><strong>${t}</strong><br><small>${d}</small></li>`).join('')}</ul>`;
  const vat = pr.std ? '' : VAT_NOTE[lang];

  if (fr) {
    const cta = open ? `<a class="btn btn-lg" href="${order}">Obtenir le pack complet – ${amount}</a>` : '';
    const hero = `<section class="hero">
<div>
<p class="eyebrow">${open ? 'Règlement (UE) 2023/988 · applicable depuis le 13 décembre 2024' : 'Bientôt disponible'}</p>
<h1>Le registre des réclamations et des rappels est obligatoire. Le vôtre est prêt à remplir.</h1>
<p class="sub">Depuis le 13 décembre 2024, tout fabricant doit tenir ce registre (art. 9 §12)&nbsp;${ref('gpsr')}. Le pack vous le donne avec la procédure de rappel, 5 modèles par catégorie remplis et le questionnaire fournisseur, en français et en anglais.</p>
${open ? `<div class="cta-row">${cta}<a class="text-link" href="${url('tool', 'fr')}">ou essayer d’abord le générateur gratuit →</a></div>
<p class="price-line"><strong>${label}</strong>, paiement unique · fichier ZIP et facture par e-mail · réservé aux entreprises immatriculées en France</p>` : `<div class="callout"><p><strong>Pas encore en vente.</strong> Le pack existe et il est terminé, mais le paiement en ligne n’est pas encore ouvert : il le sera après l’ouverture du compte de paiement de READ FRANCE SAS. Aucun paiement ne peut être effectué aujourd’hui.</p></div>
<div class="cta-row"><a class="btn btn-lg" href="${url('tool', 'fr')}">Utiliser le générateur gratuit</a></div>`}
<ul class="trust"><li>13 documents, FR + EN</li><li>DOCX, Markdown, CSV</li><li>Articles du règlement cités</li></ul>
</div>
<div>${stack}</div>
</section>`;
    const offer = `<section class="section" id="offre" aria-labelledby="offre-h">
<div class="offer">
<div>
<span class="kicker">L’offre</span>
<h2 id="offre-h">Pack documentation GPSR</h2>
<p class="muted">Version 1.0.0, textes vérifiés au 11 octobre 2026.</p>
<ul>
<li>13 documents en français et 13 en anglais (DOCX et Markdown)</li>
<li>Registre des réclamations et registre des lots en CSV, prêts pour un tableur</li>
<li>Licence pour toute votre entreprise : tous vos produits, tous vos établissements</li>
<li>Livraison par e-mail dès le paiement confirmé, au plus tard sous 24 h</li>
<li>Facture acquittée en PDF au nom de votre entreprise</li>
<li>Fichier illisible ou incomplet : remplacé ou remboursé (signalement sous 30 jours)</li>
</ul>
</div>
<div class="buy">
${open ? `<p class="small muted">Paiement unique, sans abonnement</p>
<p class="amount">${amount} <small>net</small></p>
<p class="vat">${vat}</p>
<a class="btn btn-lg" href="${order}">Obtenir le pack complet – ${amount}</a>
<p class="fine">Paiement par carte bancaire avec Stripe. Réservé aux entreprises immatriculées en France (SIREN). <a href="${cgv}">CGV professionnels</a>.</p>` : `<p class="price">${label} <small>(prix prévu, ${vat ? `${vat}, ` : ''}paiement unique)</small></p>
<p class="fine">Pas encore en vente : aucun paiement possible aujourd’hui. <a href="${cgv}">CGV professionnels</a>.</p>`}
</div>
</div>
</section>`;
    return {
      jsonld,
      bodyClass: open ? 'has-sticky' : undefined,
      title: open ? `Documentation GPSR vendeur Etsy, Vinted, Amazon : pack à ${label}` : 'Documentation GPSR vendeur Etsy, Vinted, Amazon — bientôt disponible',
      description: open
        ? `Modèles GPSR pour vendeurs Etsy, Vinted, Amazon, Shopify : risques par catégorie, rappel, incidents. Pros : ${label}${pr.std ? '' : `, ${VAT_NOTE.fr}`}.`
        : 'Pack de modèles GPSR étendus par catégorie, procédure de rappel, registre des incidents, questionnaire fournisseur. Bientôt disponible : pas encore en vente.',
      body: `${hero}
<section class="section" aria-labelledby="change-h">
<div class="section-head"><span class="kicker">Ce qui a changé</span><h2 id="change-h">Le GPSR ne s’arrête pas à l’annonce</h2>
<p>Le générateur gratuit couvre ce que vos annonces et vos colis doivent afficher. Le règlement demande aussi de savoir réagir quand un client signale un problème.</p></div>
${factsBlock('fr', ref)}
</section>
<section class="section" aria-labelledby="contenu-h">
<div class="section-head"><span class="kicker">Ce que vous recevez</span><h2 id="contenu-h">Des documents prêts à remplir, pas une liste de conseils</h2>
<p>Pages réelles du pack (version française), telles qu’elles s’ouvrent dans Word ou LibreOffice. Les exemples de produits sont fictifs.</p></div>
${gallery('fr')}
${docList}
</section>
<section class="section" aria-labelledby="compare-h">
<div class="section-head"><span class="kicker">Gratuit ou pack</span><h2 id="compare-h">Ce que le pack ajoute au générateur gratuit</h2></div>
${compareTable('fr', label)}
</section>
<section class="section" aria-labelledby="pour-qui-h">
<div class="section-head"><span class="kicker">Pour qui</span><h2 id="pour-qui-h">Pour les créateurs et petites marques qui vendent en ligne</h2></div>
<div class="who">
<div class="card"><h3>Le pack est fait pour vous si…</h3><ul>
<li>votre entreprise est immatriculée en France (SIREN, micro-entreprise comprise) ;</li>
<li>vous fabriquez ou faites fabriquer vos produits et les vendez sur Etsy, Amazon Handmade, Vinted Pro, Shopify ou votre site ;</li>
<li>vous vendez du textile, des bijoux, des bougies, des articles pour enfants (non-jouets) ou de la décoration.</li>
</ul></div>
<div class="card"><h3>Il ne suffit pas si…</h3><ul>
<li>vous vendez des cosmétiques, savons, jouets, appareils électriques ou objets au contact des aliments : ils ont leurs propres règles (la fiche « exclusions » vous oriente) ;</li>
<li>vous cherchez une personne responsable dans l’UE : nous ne proposons pas ce rôle ;</li>
<li>votre entreprise n’est pas immatriculée en France : la vente est réservée aux SIREN.</li>
</ul></div>
</div>
</section>
${offer}
<section class="section faq" aria-labelledby="faq-h">
<div class="section-head"><span class="kicker">Questions fréquentes</span><h2 id="faq-h">Avant d’acheter</h2></div>
${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
</section>
${aboutBlock('fr')}
${sourcesSection('fr', srcHtml, `<p>Toutes les obligations et leurs textes : <a href="${url('obligations', 'fr')}">Obligations &amp; sources</a>. Conditions de vente : <a href="${cgv}">CGV professionnels</a>. Modèles vierges gratuits : <a href="${SITE.releases}">pack de modèles gratuit (ZIP)</a>.</p>`)}
${open ? stickyCta(`Pack GPSR · ${amount}`, order, 'Commander') : ''}`,
    };
  }

  // English: the pack is sold only to French businesses (SIREN). Say so before any buy link.
  const hero = `<section class="hero">
<div>
<p class="eyebrow">${open ? 'Paid pack available to French businesses only (FR)' : 'Coming soon'}</p>
<h1>The complaints and recalls register is mandatory. Yours is ready to fill in.</h1>
<p class="sub">Since 13 December 2024, every manufacturer must keep this register (Art. 9(12))&nbsp;${ref('gpsr')}. The pack gives it to you with the recall procedure, 5 filled-in category templates and the supplier questionnaire, in French and English.</p>
${open ? `<div class="callout"><p><strong>French businesses only.</strong> Buying requires a business registered in France (SIREN number); the order page and the binding terms are in French. Not registered in France? The <a href="${url('tool', 'en')}">free generator</a> is open to everyone.</p></div>
<div class="cta-row"><a class="btn btn-lg" href="${order}" lang="fr" hreflang="fr">Order – ${amount} (French businesses)</a><a class="text-link" href="${url('tool', 'en')}">or use the free generator →</a></div>` : `<div class="callout"><p><strong>Not on sale yet.</strong> The pack exists and is finished, but online payment is not open yet: it will be once READ FRANCE SAS’s payment account is opened. No payment can be made today.</p></div>
<div class="cta-row"><a class="btn btn-lg" href="${url('tool', 'en')}">Use the free generator</a></div>`}
<ul class="trust"><li>13 documents, FR + EN</li><li>DOCX, Markdown, CSV</li><li>Regulation articles cited</li></ul>
</div>
<div>${stack}</div>
</section>`;
  const offer = `<section class="section" id="offer" aria-labelledby="offer-h">
<div class="offer">
<div>
<span class="kicker">The offer</span>
<h2 id="offer-h">GPSR documentation pack</h2>
<p class="muted">Version 1.0.0, texts checked on 11 October 2026.</p>
<ul>
<li>13 documents in English and 13 in French (DOCX and Markdown)</li>
<li>Complaints register and batch register as CSV</li>
<li>Licence for your whole business: all your products and premises</li>
<li>Sent by e-mail once payment is confirmed, within 24 hours at the latest</li>
<li>Paid PDF invoice in your company’s name</li>
</ul>
</div>
<div class="buy">
${open ? `<p class="small muted">One-off payment, French businesses only</p>
<p class="amount">${amount} <small>net</small></p>
<p class="vat">${vat}</p>
<a class="btn btn-lg" href="${order}" lang="fr" hreflang="fr">Order – ${amount} (French businesses)</a>
<p class="fine">Order page in French. Card payment with Stripe. SIREN number required. <a href="${url('terms', 'en')}">Terms summary</a> · <a href="${cgv}" lang="fr">binding French B2B terms</a>.</p>` : `<p class="price">${label} <small>(planned price, ${vat ? `${vat}; ` : ''}one-off payment)</small></p>
<p class="fine">Not on sale yet: no payment can be made today.</p>`}
</div>
</div>
</section>`;
  return {
    jsonld,
    title: open ? `GPSR documentation for Etsy sellers – template pack, ${label}` : 'GPSR documentation for Etsy sellers – template pack, coming soon',
    description: open
      ? `GPSR templates for Etsy, Vinted, Amazon, Shopify sellers: recall, incident log. French firms: ${label}${pr.std ? '' : `, ${VAT_NOTE.en}`}.`
      : 'Extended GPSR templates by product category, recall procedure, incident log, supplier questionnaire. Coming soon: not on sale yet.',
    body: `${hero}
<section class="section" aria-labelledby="change-h">
<div class="section-head"><span class="kicker">What changed</span><h2 id="change-h">The GPSR does not stop at the listing</h2>
<p>The free generator covers what your listings and parcels must show. The regulation also expects you to know how to react when a customer reports a problem.</p></div>
${factsBlock('en', ref)}
</section>
<section class="section" aria-labelledby="content-h">
<div class="section-head"><span class="kicker">What you get</span><h2 id="content-h">Documents ready to fill in, not a list of tips</h2>
<p>Real pages of the pack (English version), as they open in Word or LibreOffice. Product examples are fictitious.</p></div>
${gallery('en')}
${docList}
</section>
<section class="section" aria-labelledby="compare-h">
<div class="section-head"><span class="kicker">Free or pack</span><h2 id="compare-h">What the pack adds to the free generator</h2></div>
${compareTable('en', label)}
</section>
${offer}
<section class="section faq" aria-labelledby="faq-h">
<div class="section-head"><span class="kicker">FAQ</span><h2 id="faq-h">Before you buy</h2></div>
${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
</section>
${aboutBlock('en')}
${sourcesSection('en', srcHtml, `<p>All obligations and their texts: <a href="${url('obligations', 'en')}">Obligations &amp; sources</a>. Free blank templates: <a href="${SITE.releases}">free template pack (ZIP)</a>.</p>`)}`,
  };
}
