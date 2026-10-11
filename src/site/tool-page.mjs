import { SITE, url } from './layout.mjs';

const FAQ = {
  fr: [
    ['Mes réponses sont-elles envoyées quelque part ?', 'Non. Tout est calculé dans votre navigateur ; la page bloque techniquement toute connexion sortante. Pour reprendre plus tard, enregistrez vos réponses dans un fichier sur votre appareil.'],
    ['Est-ce que ce kit me rend conforme ?', 'Non : il vous aide à rassembler et mettre en forme les informations que le règlement demande. La conformité dépend de votre produit, de vos vérifications et de vos preuves. Vérifiez chaque document.'],
    ['Pouvez-vous être ma « personne responsable » dans l’UE ?', 'Non. READ FRANCE SAS n’exerce pas ce rôle et ne le propose pas. Si votre fabricant n’est pas établi dans l’UE, il vous faut un opérateur économique établi dans l’UE (importateur, mandataire ou prestataire d’exécution des commandes) qui accepte ce rôle par écrit.'],
    ['Je vends du fait main sur Etsy depuis la France : suis-je concerné·e ?', 'Oui, si vous vendez des produits de consommation neufs, d’occasion ou fabriqués à la main à des consommateurs de l’UE. En tant que fabricant établi dans l’UE, vous êtes vous-même l’opérateur responsable.'],
    ['Et les jouets, cosmétiques ou bougies ?', 'Les jouets et cosmétiques ont leurs propres règlements (marquage CE et documentation pour les jouets ; personne responsable cosmétique, rapport de sécurité et notification CPNP pour les cosmétiques) : le kit vous le signale et renvoie aux textes. Les bougies relèvent du GPSR, avec des avertissements normalisés.'],
  ],
  en: [
    ['Are my answers sent anywhere?', 'No. Everything is computed in your browser; the page technically blocks every outgoing connection. To continue later, save your answers to a file on your device.'],
    ['Does this kit make me compliant?', 'No: it helps you gather and format the information the regulation asks for. Compliance depends on your product, your checks and your evidence. Check every document.'],
    ['Can you be my EU “responsible person”?', 'No. READ FRANCE SAS does not perform or offer that role. If your manufacturer is not established in the EU, you need an EU-established economic operator (importer, authorised representative or fulfilment service provider) that accepts the role in writing.'],
    ['I sell handmade items on Etsy from the UK or US: does this apply?', 'Yes, if you offer consumer products to consumers in the EU. Your listings must show an EU responsible person, and that person must be named on the product or its packaging.'],
    ['What about toys, cosmetics or candles?', 'Toys and cosmetics have their own regulations (CE marking and documentation for toys; cosmetics responsible person, safety report and CPNP notification for cosmetics): the kit flags this and points to the texts. Candles fall under the GPSR, with standardised warnings.'],
  ],
};

export function toolPage(lang) {
  const fr = lang === 'fr';
  const faq = FAQ[lang];
  const jsonld = [
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
  const body = `<section class="intro">
<p><span class="pill">${fr ? 'Gratuit · sans compte · données 100 % dans votre navigateur' : 'Free · no account · data stays 100% in your browser'}</span></p>
<h1>${fr ? 'GPSR : générez la fiche de sécurité, l’étiquette et l’analyse de risques de vos produits' : 'GPSR: generate the safety sheet, label and risk analysis for your products'}</h1>
<p class="lead">${fr
    ? 'Pour les petits vendeurs Etsy, Vinted Pro, Amazon Handmade ou Shopify qui vendent dans l’Union européenne. Répondez à quelques questions : vous obtenez quatre documents à imprimer ou télécharger (PDF, DOCX, Markdown), avec les articles du règlement (UE) 2023/988 cités, et les points REP pour la France.'
    : 'For small Etsy, Vinted Pro, Amazon Handmade or Shopify sellers selling into the European Union. Answer a few questions and get four documents to print or download (PDF, DOCX, Markdown), citing the articles of Regulation (EU) 2023/988, plus French EPR points.'}</p>
<div class="callout"><p><strong>${fr ? 'Outil d’information, pas un conseil juridique.' : 'Information tool, not legal advice.'}</strong> ${fr
    ? 'Vous restez responsable de vos produits et de vos documents. READ FRANCE SAS n’agit jamais comme « personne responsable » dans l’UE, mandataire ou importateur, et ne propose pas ce service.'
    : 'You remain responsible for your products and documents. READ FRANCE SAS never acts as EU “responsible person”, authorised representative or importer, and does not offer that service.'}</p></div>
<div class="grid grid-3">
<div class="card"><h2>${fr ? '1. Répondez' : '1. Answer'}</h2><p>${fr ? 'Fabricant, produit, risques, plateformes. Environ 10 minutes.' : 'Manufacturer, product, hazards, platforms. About 10 minutes.'}</p></div>
<div class="card"><h2>${fr ? '2. Vérifiez' : '2. Check'}</h2><p>${fr ? 'Fiche de sécurité, étiquette et annonce, analyse de risques, checklists.' : 'Safety sheet, label and listing, risk analysis, checklists.'}</p></div>
<div class="card"><h2>${fr ? '3. Exportez' : '3. Export'}</h2><p>${fr ? 'Imprimez ou enregistrez en PDF, DOCX ou Markdown. Rien n’est envoyé.' : 'Print or save as PDF, DOCX or Markdown. Nothing is uploaded.'}</p></div>
</div>
<p>${fr ? 'Vous préférez des modèles vierges ?' : 'Prefer blank templates?'} <a href="${SITE.releases}">${fr ? 'Téléchargez le pack de modèles gratuit (ZIP, FR + EN)' : 'Download the free template pack (ZIP, FR + EN)'}</a>.</p>
</section>
<noscript><div class="callout"><p>${fr ? 'Le générateur a besoin de JavaScript (exécuté uniquement dans votre navigateur). Sans JavaScript, utilisez le pack de modèles gratuit.' : 'The generator needs JavaScript (run only in your browser). Without JavaScript, use the free template pack.'}</p></div></noscript>
<h2 id="questionnaire">${fr ? 'Questionnaire' : 'Questionnaire'}</h2>
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
<section id="results" hidden aria-labelledby="results-title">
<h2 id="results-title" tabindex="-1">${fr ? 'Vos documents' : 'Your documents'}</h2>
<div class="btn-row no-print">
<button type="button" class="btn" id="btn-print">${fr ? 'Imprimer / PDF' : 'Print / PDF'}</button>
<button type="button" class="btn secondary" id="btn-docx">DOCX</button>
<button type="button" class="btn secondary" id="btn-md">Markdown</button>
<button type="button" class="btn secondary" id="btn-zip">${fr ? 'Les 4 documents (ZIP)' : 'All 4 documents (ZIP)'}</button>
<button type="button" class="btn secondary" id="btn-print-all">${fr ? 'Tout imprimer' : 'Print all'}</button>
</div>
<div class="tabs no-print" role="tablist" id="tabs" aria-label="${fr ? 'Documents générés' : 'Generated documents'}"></div>
<div id="panels"></div>
</section>
<section class="intro">
<h2>${fr ? 'Questions fréquentes' : 'Frequently asked questions'}</h2>
${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
<p>${fr ? 'Les obligations et leurs sources officielles sont détaillées sur la page' : 'Obligations and their official sources are detailed on the'} <a href="${url('obligations', lang)}">${fr ? 'Obligations & sources' : 'Obligations & sources page'}</a>. ${fr ? 'Besoin de modèles par catégorie, d’une procédure de rappel et d’un registre des incidents ?' : 'Need category templates, a recall procedure and an incident log?'} <a href="${url('pack', lang)}">${fr ? 'Pack documentation (bientôt disponible)' : 'Documentation pack (coming soon)'}</a>.</p>
</section>`;
  return {
    title: fr ? 'Générateur GPSR gratuit pour vendeurs Etsy, Vinted, Amazon, Shopify — Kit GPSR Vendeurs' : 'Free GPSR generator for Etsy, Vinted, Amazon and Shopify sellers — GPSR Seller Kit',
    description: fr
      ? 'Générez gratuitement fiche de sécurité produit, texte d’étiquette, analyse de risques et checklists GPSR (règlement UE 2023/988) et REP France. 100 % dans votre navigateur.'
      : 'Free generator for the product safety sheet, label text, risk analysis and checklists under the GPSR (EU Regulation 2023/988) and French EPR. Runs 100% in your browser.',
    body,
    jsonld,
    scripts: ['/assets/app.js'],
  };
}
