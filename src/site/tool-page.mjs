import { ORG_JSONLD, SITE, url } from './layout.mjs';
import { ORDER_PATH, packPriceLabel } from './legal-pages.mjs';
import { aboutBlock, docStack, factsBlock, sourceList, sourcesSection, stickyCta } from './marketing.mjs';
import { compareTable } from './pack-page.mjs';

const FAQ = {
  fr: [
    ['Quelle différence entre le générateur gratuit et le pack payant ?', 'Le générateur produit gratuitement, pour un produit, les documents à afficher et à conserver dès la mise en vente : fiche d’information sécurité, texte d’étiquette et d’annonce, analyse de risques et checklists. Le pack, vendu aux entreprises immatriculées en France, ajoute ce qu’il faut avoir prêt avant un incident : procédure de rappel, registre des réclamations, dossier technique et registre des lots, questionnaire fournisseur et modèles par catégorie avec exemples remplis.'],
    ['Mes réponses sont-elles envoyées quelque part ?', 'Non. Les documents sont calculés dans votre navigateur. La page n’autorise qu’une connexion sortante, vers un comptage d’audience anonyme et sans cookie qui ne reçoit jamais vos réponses (voir la page Confidentialité). Pour reprendre plus tard, enregistrez vos réponses dans un fichier .json sur votre appareil.'],
    ['Est-ce que ce kit me rend conforme ?', 'Non. Il met en forme les informations que le règlement demande, à partir de vos réponses. La conformité dépend de votre produit et des vérifications que vous pouvez prouver : relisez chaque document avant de l’utiliser.'],
    ['Pouvez-vous être ma « personne responsable » dans l’UE ?', 'Non. READ FRANCE SAS n’exerce pas ce rôle et ne le propose pas. Si votre fabricant n’est pas établi dans l’UE, il vous faut un opérateur économique établi dans l’UE (importateur, mandataire ou prestataire d’exécution des commandes) qui accepte ce rôle par écrit.'],
    ['Je vends du fait main sur Etsy depuis la France : suis-je concerné·e ?', 'Oui, si vous vendez des produits de consommation neufs, d’occasion ou fabriqués à la main à des consommateurs de l’UE. En tant que fabricant établi dans l’UE, vous êtes vous-même l’opérateur responsable.'],
    ['Et les jouets, cosmétiques ou bougies ?', 'Les jouets et cosmétiques ont leurs propres règlements (marquage CE et documentation pour les jouets ; personne responsable cosmétique, rapport de sécurité et notification CPNP pour les cosmétiques) : le kit vous le signale et renvoie aux textes. Les bougies relèvent du GPSR, avec des avertissements normalisés.'],
  ],
  en: [
    ['Are my answers sent anywhere?', 'No. The documents are computed in your browser. The page allows a single outgoing connection, to an anonymous, cookieless visit count that never receives your answers (see the Privacy page). To continue later, save your answers to a .json file on your device.'],
    ['Does this kit make me compliant?', 'No. It formats the information the regulation asks for, from your answers. Compliance depends on your product and on the checks you can prove: read every document before you use it.'],
    ['Can you be my EU “responsible person”?', 'No. READ FRANCE SAS does not perform or offer that role. If your manufacturer is not established in the EU, you need an EU-established economic operator (importer, authorised representative or fulfilment service provider) that accepts the role in writing.'],
    ['I sell handmade items on Etsy from the UK or US: does this apply?', 'Yes, if you offer consumer products to consumers in the EU. Your listings must show an EU responsible person, and that person must be named on the product or its packaging.'],
    ['What about toys, cosmetics or candles?', 'Toys and cosmetics have their own regulations (CE marking and documentation for toys; cosmetics responsible person, safety report and CPNP notification for cosmetics): the kit flags this and points to the texts. Candles fall under the GPSR, with standardised warnings.'],
  ],
};


export function toolPage(lang, sales) {
  const fr = lang === 'fr';
  const faq = FAQ[lang];
  const open = sales?.SALES_OPEN === true;
  const label = packPriceLabel(lang, sales ?? undefined); // « 29 € net »
  const amount = label.replace(/\s*(net|TTC|incl\. VAT)$/, ''); // « 29 € »
  const packUrl = url('pack', lang);
  const order = `${SITE.base}${ORDER_PATH}`;
  const packLink = open
    ? `<a href="${packUrl}">${fr ? 'Pack documentation GPSR' : 'GPSR documentation pack'}, ${label}</a>`
    : `<a href="${packUrl}">${fr ? 'Pack documentation (bientôt disponible)' : 'Documentation pack (coming soon)'}</a>`;
  const { ref, html: srcHtml } = sourceList(lang, ['gpsr', 'amazon', 'etsy']);
  const jsonld = [
    ORG_JSONLD,
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: fr ? 'Kit GPSR Vendeurs' : 'GPSR Seller Kit',
      url: SITE.origin + url('tool', lang),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: lang,
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      publisher: { '@type': 'Organization', name: 'READ FRANCE SAS' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
  const stack = fr
    ? docStack(['gratuit-fiche-securite.webp', 'pack-procedure-rappel.webp', 'pack-registre-incidents.webp'], ['Fiche d’information sécurité générée par l’outil gratuit (exemple : bougie)', 'Procédure de rappel du pack', 'Registre des réclamations du pack'], 'Aperçus réels des documents')
    : docStack(['free-safety-sheet.webp', 'pack-en-recall-procedure.webp', 'pack-en-incident-register.webp'], ['Safety information sheet produced by the free tool (example: candle)', 'Recall procedure from the pack', 'Complaints register from the pack'], 'Real document previews');

  // Hero: FR = one primary CTA to the paid pack + text link to the free tool; EN (pack sold to French
  // businesses only) = the free tool is the primary action and the pack is labelled FR-only.
  const heroCta = fr
    ? open
      ? `<div class="cta-row"><a class="btn btn-lg" href="${packUrl}">Voir le pack de modèles GPSR, ${label}</a><a class="text-link" href="#questionnaire">ou générer mes 4 documents gratuitement ↓</a></div>`
      : `<div class="cta-row"><a class="btn btn-lg" href="#questionnaire">Générer mes documents gratuitement</a><a class="text-link" href="${packUrl}">Pack documentation : bientôt disponible</a></div>`
    : `<div class="cta-row"><a class="btn btn-lg" href="#questionnaire">Generate my documents free ↓</a></div>
<p class="price-line">${open ? `Paid pack available to French businesses only (FR): <a href="${packUrl}">see what it adds</a>.` : `Paid pack: <a href="${packUrl}">coming soon</a>.`}</p>`;

  const hero = `<section class="hero">
<div>
<p class="eyebrow">${fr ? 'Gratuit · sans compte · rien ne quitte votre navigateur' : 'Free · no account · nothing leaves your browser'}</p>
<h1>${fr ? 'Générateur GPSR gratuit pour vendeurs Etsy, Amazon Handmade, Vinted Pro et Shopify' : 'Free GPSR generator for Etsy, Amazon Handmade, Vinted Pro and Shopify sellers'}</h1>
<p class="sub">${fr
    ? `Depuis le 13 décembre 2024, chaque annonce qui vise l’UE indique le fabricant, l’identification du produit et ses avertissements de sécurité (art. 19)&nbsp;${ref('gpsr')}. Amazon et Etsy ont déjà ajouté ces champs ${ref('amazon')} ${ref('etsy')}. Répondez à 23 questions au plus sur votre produit : vous obtenez la fiche de sécurité produit, le texte d’étiquette et d’annonce, l’analyse de risques et les checklists en 10 minutes environ.`
    : `Since 13 December 2024, every listing that targets the EU shows the manufacturer, the product identification and its safety warnings (Art. 19)&nbsp;${ref('gpsr')}. Amazon and Etsy have already added these fields ${ref('amazon')} ${ref('etsy')}. Answer up to 23 questions on your product to get the safety information sheet, the label and listing text, the risk analysis and the checklists in about 10 minutes.`}</p>
${heroCta}
<ul class="trust"><li>${fr ? 'Export PDF, DOCX, Markdown ou ZIP' : 'Export as PDF, DOCX, Markdown or ZIP'}</li><li>${fr ? 'Art. 6, 9, 16, 19 et 20 cités dans les documents' : 'Art. 6, 9, 16, 19 and 20 cited in the documents'}</li></ul>
</div>
<div>${stack}</div>
</section>`;

  // Shown with the results (inside #results, so only after « Générer mes documents »): display only.
  const upsell = fr && open
    ? `<aside class="upsell no-print" aria-label="Pack documentation GPSR">
<p><strong>Vos documents sont prêts.</strong> Il vous manque la procédure de rappel (avis et remèdes, art. 36 et 37) et le registre des réclamations et des rappels que tout fabricant doit tenir (art. 9 §12).</p>
<a class="btn" href="${packUrl}">Voir le pack, ${label}</a>
</aside>`
    : '';

  const body = `${hero}
<section class="section" aria-labelledby="change-h">
<div class="section-head"><span class="kicker">${fr ? 'Ce qui a changé' : 'What changed'}</span><h2 id="change-h">${fr ? 'Ce que le règlement et les plateformes demandent' : 'What the regulation and marketplaces ask for'}</h2></div>
${factsBlock(lang, ref)}
</section>
<section class="section" aria-labelledby="questionnaire">
<div class="tool-head"><h2 id="questionnaire">${fr ? 'Générez vos 4 documents gratuitement' : 'Generate your 4 documents for free'}</h2>
<p class="small muted">${fr ? 'Vous préférez des modèles vierges ?' : 'Prefer blank templates?'} <a href="${SITE.releases}" data-mesure="free_download">${fr ? 'Pack de modèles gratuit (ZIP, FR + EN)' : 'Free template pack (ZIP, FR + EN)'}</a></p></div>
<ol class="steps"><li>${fr ? 'Répondez : fabricant, produit, risques, plateformes (environ 10 minutes)' : 'Answer: manufacturer, product, hazards, platforms (about 10 minutes)'}</li><li>${fr ? 'Vérifiez les 4 documents' : 'Check the 4 documents'}</li><li>${fr ? 'Exportez en PDF, DOCX ou Markdown' : 'Export as PDF, DOCX or Markdown'}</li></ol>
<noscript><div class="callout"><p>${fr ? 'Le générateur a besoin de JavaScript (exécuté uniquement dans votre navigateur). Sans JavaScript, utilisez le pack de modèles gratuit.' : 'The generator needs JavaScript (run only in your browser). Without JavaScript, use the free template pack.'}</p></div></noscript>
<div class="btn-row no-print">
<button type="button" class="btn secondary" id="btn-example">${fr ? 'Voir un exemple rempli (bougie)' : 'See a filled-in example (candle)'}</button>
<button type="button" class="btn secondary" id="btn-load">${fr ? 'Charger mes réponses (.json)' : 'Load my answers (.json)'}</button>
<input type="file" id="file-load" accept="application/json,.json" hidden>
<button type="button" class="btn secondary" id="btn-reset">${fr ? 'Tout effacer' : 'Clear all'}</button>
</div>
<form id="gpsr-form" novalidate>
</form>
<div class="btn-row no-print">
<button type="submit" form="gpsr-form" class="btn" id="btn-generate">${fr ? 'Générer mes documents' : 'Generate my documents'}</button>
<button type="button" class="btn secondary" id="btn-save">${fr ? 'Enregistrer mes réponses (.json)' : 'Save my answers (.json)'}</button>
</div>
<p class="status no-print" id="status" role="status" aria-live="polite"></p>
</section>
<section id="results" hidden aria-labelledby="results-title">
<h2 id="results-title" tabindex="-1">${fr ? 'Vos documents' : 'Your documents'}</h2>
<div class="btn-row no-print">
<button type="button" class="btn" id="btn-print" data-mesure="free_download">${fr ? 'Imprimer / PDF' : 'Print / PDF'}</button>
<button type="button" class="btn secondary" id="btn-docx" data-mesure="free_download">DOCX</button>
<button type="button" class="btn secondary" id="btn-md" data-mesure="free_download">Markdown</button>
<button type="button" class="btn secondary" id="btn-zip" data-mesure="free_download">${fr ? 'Les 4 documents (ZIP)' : 'All 4 documents (ZIP)'}</button>
<button type="button" class="btn secondary" id="btn-print-all" data-mesure="free_download">${fr ? 'Tout imprimer' : 'Print all'}</button>
</div>
${upsell}
<div class="tabs no-print" role="tablist" id="tabs" aria-label="${fr ? 'Documents générés' : 'Generated documents'}"></div>
<div id="panels"></div>
</section>
${fr ? `<section class="section" aria-labelledby="compare-h">
<div class="section-head"><span class="kicker">Gratuit ou pack</span><h2 id="compare-h">Le gratuit pour vendre, le pack pour être prêt en cas d’incident</h2>
<p>${open ? 'Réservé aux entreprises immatriculées en France (SIREN).' : 'Le pack n’est pas encore en vente.'}</p></div>
${compareTable('fr', label)}
<p class="inline-pack">${open ? `<a class="btn" href="${packUrl}">Voir le pack et ses aperçus</a> ` : ''}<span class="small muted">Détail du contenu : ${packLink}</span></p>
</section>` : `<section class="section" aria-labelledby="pack-h">
<div class="card"><h2 id="pack-h">${open ? 'Paid pack available to French businesses only (FR)' : 'Paid pack: coming soon'}</h2>
<p>${open ? 'Recall procedure, complaints register, technical file, supplier questionnaire and category templates. Buying requires a business registered in France (SIREN).' : 'Recall procedure, complaints register, technical file, supplier questionnaire and category templates.'} ${packLink}.</p></div>
</section>`}
<section class="section faq" aria-labelledby="faq-h">
<div class="section-head"><span class="kicker">${fr ? 'Questions fréquentes' : 'FAQ'}</span><h2 id="faq-h">${fr ? 'Questions fréquentes' : 'Frequently asked questions'}</h2></div>
${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
</section>
${aboutBlock(lang)}
${sourcesSection(lang, srcHtml, `<p>${fr ? 'Les 12 obligations du règlement et de la REP, chacune avec son article :' : 'The 12 obligations of the regulation and French EPR, each with its article:'} <a href="${url('obligations', lang)}">${fr ? 'page Obligations' : 'Obligations page'}</a>.</p>`)}
${fr && open ? stickyCta(`Pack GPSR · ${amount}`, order, 'Commander') : ''}`;
  return {
    title: fr ? 'Générateur GPSR gratuit : fiche sécurité produit Etsy, Amazon' : 'Free GPSR generator: product safety sheet for Etsy, Amazon',
    description: fr
      ? 'Fiche de sécurité produit, texte d’étiquette, analyse de risques et checklists GPSR (règlement UE 2023/988) et REP, générés dans votre navigateur. Gratuit.'
      : 'Product safety sheet, label text, risk analysis and checklists under the GPSR (Regulation (EU) 2023/988) and French EPR, built in your browser. Free.',
    body,
    jsonld,
    bodyClass: fr && open ? 'has-sticky' : undefined,
    scripts: ['/assets/app.js'],
  };
}
