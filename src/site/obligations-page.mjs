import { S } from '../lib/content.js';
import { ORG_REF, SITE, abs, breadcrumb, lastmod, longDate, url } from './layout.mjs';

const a = (s, lang, art) => `<a href="${s.url[lang]}">${s.label[lang]}${art ? `, ${art}` : ''}</a>`;

export function obligationsPage(lang) {
  const fr = lang === 'fr';
  const rows = fr
    ? [
        ['Analyse de risques interne + documentation technique, avant la mise sur le marché', 'Fabricant', a(S.gpsr, lang, 'art. 9, §2')],
        ['Conserver la documentation à jour 10 ans', 'Fabricant (copie : importateur)', a(S.gpsr, lang, 'art. 9, §3 ; art. 11, §6')],
        ['Numéro de type, lot ou série sur le produit (emballage si la taille l’impose)', 'Fabricant', a(S.gpsr, lang, 'art. 9, §5')],
        ['Nom, raison sociale ou marque, adresse postale et électronique sur le produit (sinon emballage ou document joint)', 'Fabricant ; importateur pour ses propres coordonnées', a(S.gpsr, lang, 'art. 9, §6 ; art. 11, §3')],
        ['Instructions et informations de sécurité dans la langue fixée par l’État membre (français en France)', 'Fabricant, importateur', a(S.gpsr, lang, 'art. 9, §7') + ' ; ' + a(S.toubon, lang, 'art. 2')],
        ['Opérateur économique responsable établi dans l’UE ; ses coordonnées sur le produit, l’emballage, le colis ou un document joint', 'Tout produit mis sur le marché de l’UE', a(S.gpsr, lang, 'art. 16') + ' ; ' + a(S.msr, lang, 'art. 4')],
        ['Annonce en ligne : fabricant, personne responsable UE, photo et identifiant, avertissements', 'Tout vendeur à distance', a(S.gpsr, lang, 'art. 19')],
        ['Canal public de réclamation ; registre interne des réclamations et rappels (données personnelles 5 ans max.)', 'Fabricant', a(S.gpsr, lang, 'art. 9, §11 à §13')],
        ['Produit dangereux : mesures correctives, information des consommateurs et des autorités (Safety Business Gateway)', 'Fabricant, importateur, distributeur', a(S.gpsr, lang, 'art. 9, §8 ; art. 11 ; art. 12')],
        ['Accident grave : notification sans retard injustifié via le Safety Business Gateway', 'Fabricant (informé par importateurs et distributeurs)', a(S.gpsr, lang, 'art. 20')],
        ['Rappel : avis de rappel au contenu imposé, au moins deux remèdes au choix (réparation, remplacement, remboursement)', 'Opérateur responsable du rappel', a(S.gpsr, lang, 'art. 35 à 37') + ' ; ' + a(S.recallTemplate, lang)],
        ['France : déclarer tout rappel sur RappelConso', 'Opérateurs économiques', a(S.l4233, lang) + ' ; ' + a(S.rappelconso, lang)],
      ]
    : [
        ['Internal risk analysis + technical documentation, before placing on the market', 'Manufacturer', a(S.gpsr, lang, 'Art. 9(2)')],
        ['Keep the documentation up to date for 10 years', 'Manufacturer (copy: importer)', a(S.gpsr, lang, 'Art. 9(3); Art. 11(6)')],
        ['Type, batch or serial number on the product (packaging if size requires)', 'Manufacturer', a(S.gpsr, lang, 'Art. 9(5)')],
        ['Name, trade name or trade mark, postal and electronic address on the product (otherwise packaging or accompanying document)', 'Manufacturer; importer for its own details', a(S.gpsr, lang, 'Art. 9(6); Art. 11(3)')],
        ['Instructions and safety information in the language set by the Member State (French in France)', 'Manufacturer, importer', a(S.gpsr, lang, 'Art. 9(7)') + '; ' + a(S.toubon, lang, 'Art. 2')],
        ['EU-established responsible economic operator; its details on the product, packaging, parcel or an accompanying document', 'Every product placed on the EU market', a(S.gpsr, lang, 'Art. 16') + '; ' + a(S.msr, lang, 'Art. 4')],
        ['Online listing: manufacturer, EU responsible person, picture and identifier, warnings', 'Every distance seller', a(S.gpsr, lang, 'Art. 19')],
        ['Public complaint channel; internal register of complaints and recalls (personal data 5 years max.)', 'Manufacturer', a(S.gpsr, lang, 'Art. 9(11)–(13)')],
        ['Dangerous product: corrective measures, informing consumers and authorities (Safety Business Gateway)', 'Manufacturer, importer, distributor', a(S.gpsr, lang, 'Art. 9(8); Art. 11; Art. 12')],
        ['Serious accident: notify without undue delay through the Safety Business Gateway', 'Manufacturer (informed by importers and distributors)', a(S.gpsr, lang, 'Art. 20')],
        ['Recall: recall notice with mandatory content, at least two remedies to choose from (repair, replacement, refund)', 'Operator responsible for the recall', a(S.gpsr, lang, 'Art. 35–37') + '; ' + a(S.recallTemplate, lang)],
        ['France: declare every recall on RappelConso', 'Economic operators', a(S.l4233, lang) + '; ' + a(S.rappelconso, lang)],
      ];
  const table = `<div class="table-scroll"><table class="plain"><thead><tr><th scope="col">${fr ? 'Obligation' : 'Obligation'}</th><th scope="col">${fr ? 'Qui' : 'Who'}</th><th scope="col">${fr ? 'Source' : 'Source'}</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div>`;

  const sector = (fr
    ? [
        ['Jouets (destinés au jeu des moins de 14 ans)', `${a(S.toys, lang)} : marquage CE, documentation, avertissements (ex. « Ne convient pas aux enfants de moins de 36 mois »). Nouveau ${a(S.toys2025, lang)}.`],
        ['Cosmétiques, savons, bombes de bain', `${a(S.cosmetics, lang)} : personne responsable cosmétique (art. 4), rapport de sécurité (art. 10), notification CPNP (art. 13).`],
        ['Textiles', `Composition en fibres sur l’étiquette et avant l’achat en ligne, ${a(S.textile, lang, 'art. 14 et 16')}. Cordons des vêtements d’enfants : ${a(S.en14682, lang)}.`],
        ['Bijoux', `Restrictions REACH : ${a(S.reachNickel, lang)} ; ${a(S.reachCadmium, lang)} ; ${a(S.reachLead, lang)}.`],
        ['Bougies', `${a(S.en15494, lang)}. Parfums : ${a(S.clp, lang)}, à vérifier avec le fournisseur.`],
        ['Contact alimentaire', a(S.fcm, lang)],
        ['Appareils électriques', a(S.lvd, lang)],
        ['Denrées alimentaires', `Exclues du GPSR (${a(S.gpsr, lang, 'art. 2, §2')}).`],
      ]
    : [
        ['Toys (for play by children under 14)', `${a(S.toys, lang)}: CE marking, documentation, warnings (e.g. “Not suitable for children under 36 months”). New ${a(S.toys2025, lang)}.`],
        ['Cosmetics, soaps, bath bombs', `${a(S.cosmetics, lang)}: cosmetics responsible person (Art. 4), safety report (Art. 10), CPNP notification (Art. 13).`],
        ['Textiles', `Fibre composition on the label and before an online purchase, ${a(S.textile, lang, 'Art. 14 and 16')}. Cords on children’s clothing: ${a(S.en14682, lang)}.`],
        ['Jewellery', `REACH restrictions: ${a(S.reachNickel, lang)}; ${a(S.reachCadmium, lang)}; ${a(S.reachLead, lang)}.`],
        ['Candles', `${a(S.en15494, lang)}. Fragrances: ${a(S.clp, lang)}, to check with your supplier.`],
        ['Food contact', a(S.fcm, lang)],
        ['Electrical equipment', a(S.lvd, lang)],
        ['Food', `Excluded from the GPSR (${a(S.gpsr, lang, 'Art. 2(2)')}).`],
      ]);
  const sectorTable = `<div class="table-scroll"><table class="plain"><thead><tr><th scope="col">${fr ? 'Produits' : 'Products'}</th><th scope="col">${fr ? 'Règles et textes' : 'Rules and texts'}</th></tr></thead><tbody>${sector.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</tbody></table></div>`;
  const crumb = breadcrumb(lang, 'obligations', fr ? 'Obligations GPSR et REP' : 'GPSR and EPR obligations');

  const body = fr
    ? `${crumb.html}
<h1>Obligations GPSR et REP des vendeurs en ligne, article par article</h1>
<p class="lead">Synthèse pour petits vendeurs, vérifiée le ${longDate(SITE.updated, 'fr')} sur les textes officiels. Chaque ligne renvoie au texte : en cas de doute, c’est le texte qui fait foi.</p>
<div class="callout"><p>Information générale, pas un conseil juridique. READ FRANCE SAS n’agit pas comme personne responsable, mandataire ou importateur.</p></div>
<h2>Le règlement (UE) 2023/988 en bref</h2>
<p>Depuis le <strong>13 décembre 2024</strong>, le règlement (UE) 2023/988 relatif à la sécurité générale des produits (GPSR) impose de ne mettre sur le marché que des produits sûrs, et organise l’identification, la traçabilité et l’information des consommateurs (${a(S.gpsr, lang, 'art. 5 et 52')}). Il s’applique aux produits neufs, d’occasion, réparés ou reconditionnés vendus par des professionnels, y compris le fait main (${a(S.gpsr, lang, 'art. 2, §3')}) ; les ventes purement entre particuliers n’en relèvent pas (${a(S.guidelines, lang, '§1.1')}).</p>
<p>Une offre en ligne est réputée mettre le produit à disposition dans l’UE dès qu’elle cible des consommateurs de l’UE (livraison, langue, devise…) (${a(S.gpsr, lang, 'art. 4')}). Il n’y a pas d’exemption pour les petites entreprises (${a(S.guidelines, lang, '§1.1')}).</p>
<h2>Votre rôle selon le règlement</h2>
<dl class="roles">
<dt>Fabricant</dt>
<dd>Vous fabriquez, ou faites fabriquer et vendez sous votre nom ou votre marque. C’est le cas de la plupart des créateurs (${a(S.gpsr, lang, 'art. 3, point 8')}). Modifier substantiellement un produit (upcycling, personnalisation) peut aussi faire de vous un fabricant (${a(S.gpsr, lang, 'art. 13')}).</dd>
<dt>Importateur</dt>
<dd>Établi dans l’UE, vous mettez sur le marché un produit venant d’un pays tiers (${a(S.gpsr, lang, 'art. 3 et 11')}).</dd>
<dt>Distributeur</dt>
<dd>Vous revendez un produit d’un autre fabricant (${a(S.gpsr, lang, 'art. 12')}).</dd>
<dt>Personne responsable</dt>
<dd>Chaque produit doit avoir un opérateur établi dans l’UE : fabricant, importateur, mandataire avec mandat écrit ou, à défaut, prestataire d’exécution des commandes (${a(S.gpsr, lang, 'art. 16')} ; ${a(S.msr, lang, 'art. 4, §2')}). Un créateur établi en France est lui-même cet opérateur. <strong>Nous ne proposons pas ce rôle.</strong></dd>
</dl>
<h2>Les obligations, ligne par ligne</h2>
${table}
<h2>Produits soumis à des règles spécifiques</h2>
<p>Quand une législation sectorielle existe, le GPSR ne couvre que les risques qu’elle ne traite pas (${a(S.gpsr, lang, 'art. 2, §1')}). L’article 19 (annonce en ligne) et l’article 20 (accidents) restent applicables.</p>
${sectorTable}
<h2>France : REP (responsabilité élargie du producteur)</h2>
<ul>
<li>Le principe et les filières sont fixés par ${a(S.envL54110, lang)} : emballages ménagers et papiers, textiles-linge-chaussures, ameublement, jouets, sport et loisirs, bricolage et jardin, équipements électriques, piles, entre autres.</li>
<li>Un <strong>identifiant unique (IDU) par filière</strong>, obtenu via l’éco-organisme qui vous inscrit dans SYDEREP : ${a(S.envIdu, lang)} ; ${a(S.ademeIdu, lang)}.</li>
<li>IDU affiché dans les CGV (ou document contractuel) et sur le site : ${a(S.envR541173, lang)}.</li>
<li>Les plateformes doivent vérifier l’IDU de leurs vendeurs ou assumer la REP à leur place : ${a(S.envMarketplace, lang)}.</li>
<li>Un vendeur non établi en France désigne par écrit un mandataire établi en France (art. L541-10-9-1). Pour les textiles vendus en ligne, le lieu de fabrication doit être affiché (${a(S.loi2026, lang)}).</li>
<li>Triman et info-tri : ${a(S.ministryRep, lang)}. Éco-organismes agréés : ${a(S.ademeEco, lang)}. Vérifier un IDU : ${a(S.ademeSearch, lang)}.</li>
</ul>
<h2>À venir</h2>
<ul>
<li><strong>9 décembre 2026</strong> : la nouvelle directive sur la responsabilité du fait des produits défectueux s’applique aux produits mis sur le marché après cette date ; si le fabricant est hors UE, l’importateur ou le mandataire peut être tenu responsable (${a(S.pld, lang, 'art. 2 et 8')}). C’est une des raisons pour lesquelles nous restons un simple kit.</li>
<li><strong>1er août 2030</strong> : application du nouveau règlement jouets (${a(S.toys2025, lang, 'art. 59')}).</li>
</ul>
<h2>Plateformes</h2>
<ul>
<li>Etsy : ${a(S.etsyGpsr, lang)} ; ${a(S.etsyEo, lang)} ; ${a(S.etsyEpr, lang)}.</li>
<li>Amazon : ${a(S.amazonGpsr, lang)} ; ${a(S.amazonHelp, lang)}.</li>
<li>Vinted Pro : ${a(S.vintedPro, lang)}. Nous avons relevé dans l’interface les champs « Informations sur le fabricant », « Étiquetage et marquage » et les paramètres REP.</li>
<li>Boutique Shopify ou site propre : vous êtes le vendeur à distance, l’article 19 s’applique directement à vos fiches produits.</li>
</ul>
<p>Autre obligation des boutiques en ligne : depuis le 28 juin 2025, les sites de commerce en ligne vendant aux consommateurs doivent être accessibles (Acte européen sur l’accessibilité, directive (UE) 2019/882 ; les microentreprises de services en sont exemptées). <a href="https://outils.vread.fr/declaration-accessibilite/">Générateur gratuit de déclaration d’accessibilité</a>.</p>
<h2>Limites de cette synthèse</h2>
<p>Les pages de la DGCCRF n’ont pas pu être consultées automatiquement (protection anti-robot) : référez-vous à Légifrance et à RappelConso cités ci-dessus. Les aides Amazon Seller Central nécessitent une connexion. Les normes (EN 15494, EN 14682, EN 12586) sont payantes : nous citons leur titre, pas leur contenu. Signalez une erreur à <a href="mailto:${SITE.contact}">${SITE.contact}</a>.</p>
<p><a class="btn" href="${url('tool', lang)}">Générer mes documents gratuitement</a></p>`
    : `${crumb.html}
<h1>GPSR and French EPR obligations for online sellers, article by article</h1>
<p class="lead">Summary for small sellers, checked on ${longDate(SITE.updated, 'en')} against the official texts. Every line links to the text: if in doubt, the text prevails.</p>
<div class="callout"><p>General information, not legal advice. READ FRANCE SAS does not act as responsible person, authorised representative or importer.</p></div>
<h2>Regulation (EU) 2023/988 in brief</h2>
<p>Since <strong>13 December 2024</strong>, Regulation (EU) 2023/988 on general product safety (GPSR) requires that only safe products are placed on the market, and organises identification, traceability and consumer information (${a(S.gpsr, lang, 'Art. 5 and 52')}). It covers new, used, repaired or reconditioned products sold by traders, handmade included (${a(S.gpsr, lang, 'Art. 2(3)')}); purely consumer-to-consumer sales are out of scope (${a(S.guidelines, lang, '§1.1')}).</p>
<p>An online offer counts as making the product available in the EU as soon as it targets EU consumers (delivery, language, currency…) (${a(S.gpsr, lang, 'Art. 4')}). There is no exemption for small businesses (${a(S.guidelines, lang, '§1.1')}).</p>
<h2>Your role under the regulation</h2>
<dl class="roles">
<dt>Manufacturer</dt>
<dd>You make the product, or have it made and sell it under your name or trade mark. Most makers are in this case (${a(S.gpsr, lang, 'Art. 3(8)')}). Substantially modifying a product (upcycling, customisation) can also make you a manufacturer (${a(S.gpsr, lang, 'Art. 13')}).</dd>
<dt>Importer</dt>
<dd>Established in the EU, you place a product from a non-EU country on the EU market (${a(S.gpsr, lang, 'Art. 3 and 11')}).</dd>
<dt>Distributor</dt>
<dd>You resell another manufacturer’s product (${a(S.gpsr, lang, 'Art. 12')}).</dd>
<dt>Responsible person</dt>
<dd>Every product needs an EU-established operator: manufacturer, importer, authorised representative with a written mandate or, failing those, a fulfilment service provider (${a(S.gpsr, lang, 'Art. 16')}; ${a(S.msr, lang, 'Art. 4(2)')}). A maker established in the EU is that operator. Sellers based in the UK, US or elsewhere need one. <strong>We do not offer this role.</strong></dd>
</dl>
<h2>The obligations, line by line</h2>
${table}
<h2>Products with specific rules</h2>
<p>Where sector legislation exists, the GPSR only covers the risks it does not address (${a(S.gpsr, lang, 'Art. 2(1)')}). Article 19 (online listing) and Article 20 (accidents) still apply.</p>
${sectorTable}
<h2>France: EPR (extended producer responsibility)</h2>
<ul>
<li>The principle and the streams are set by ${a(S.envL54110, lang)}: household packaging and paper, textiles-linen-footwear, furniture, toys, sport and leisure, DIY and garden, electrical equipment and batteries, among others.</li>
<li><strong>One unique identifier (UID) per stream</strong>, obtained through the producer responsibility organisation that registers you in SYDEREP: ${a(S.envIdu, lang)}; ${a(S.ademeIdu, lang)}.</li>
<li>UID shown in your terms of sale (or contractual document) and on your website: ${a(S.envR541173, lang)}.</li>
<li>Marketplaces must check their sellers’ UIDs or take on EPR for them: ${a(S.envMarketplace, lang)}.</li>
<li>A seller not established in France appoints in writing an agent established in France (Art. L541-10-9-1). For textiles sold online, the place of manufacture must be shown (${a(S.loi2026, lang)}).</li>
<li>Triman logo and sorting info: ${a(S.ministryRep, lang)}. Approved organisations: ${a(S.ademeEco, lang)}. Check a UID: ${a(S.ademeSearch, lang)}.</li>
</ul>
<h2>Coming up</h2>
<ul>
<li><strong>9 December 2026</strong>: the new Product Liability Directive applies to products placed on the market after that date; if the manufacturer is outside the EU, the importer or authorised representative can be held liable (${a(S.pld, lang, 'Art. 2 and 8')}). This is one reason we remain a plain kit.</li>
<li><strong>1 August 2030</strong>: the new toy safety regulation applies (${a(S.toys2025, lang, 'Art. 59')}).</li>
</ul>
<h2>Marketplaces</h2>
<ul>
<li>Etsy: ${a(S.etsyGpsr, lang)}; ${a(S.etsyEo, lang)}; ${a(S.etsyEpr, lang)}.</li>
<li>Amazon: ${a(S.amazonGpsr, lang)}; ${a(S.amazonHelp, lang)}.</li>
<li>Vinted Pro: ${a(S.vintedPro, lang)}. We saw the “Manufacturer information” and “Labelling and marking” fields and the EPR settings in the interface.</li>
<li>Shopify store or own website: you are the distance seller; Article 19 applies directly to your product pages.</li>
</ul>
<p>Another obligation for online shops: since 28 June 2025, e-commerce sites selling to consumers must be accessible (European Accessibility Act, Directive (EU) 2019/882; micro-enterprises providing services are exempt). <a href="https://outils.vread.fr/declaration-accessibilite/en/">Free accessibility statement generator</a>.</p>
<h2>Limits of this summary</h2>
<p>The French DGCCRF pages could not be read automatically (anti-bot protection): rely on Légifrance and RappelConso cited above. Amazon Seller Central help requires a login. Standards (EN 15494, EN 14682, EN 12586) are paid documents: we cite their titles, not their content. Report an error to <a href="mailto:${SITE.contact}">${SITE.contact}</a>.</p>
<p><a class="btn" href="${url('tool', lang)}">Generate my documents for free</a></p>`;
  const description = {
    fr: 'Fabricant, personne responsable, article 19, registre, rappels, REP et IDU : les obligations du règlement (UE) 2023/988, avec l’article de chaque ligne.',
    en: 'Manufacturer, responsible person, Article 19, register, recalls, French EPR and UIDs: the obligations of Regulation (EU) 2023/988, each with its article.',
  };
  return {
    title: fr ? 'Obligations GPSR (RSGP) et REP : articles et sources' : 'GPSR and French EPR obligations: articles and sources',
    description: description[lang],
    body,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: fr ? 'Obligations GPSR et REP des vendeurs en ligne, article par article' : 'GPSR and French EPR obligations for online sellers, article by article',
        description: description[lang],
        datePublished: '2026-10-11',
        dateModified: lastmod('obligations', lang),
        inLanguage: lang,
        mainEntityOfPage: abs('obligations', lang),
        image: `${SITE.origin}${SITE.base}/assets/og.png`,
        author: ORG_REF,
        publisher: ORG_REF,
        // Primary legal texts the page cites (secondary pages such as ADEME or marketplace help are linked in the body only).
        citation: [S.gpsr, S.guidelines, S.msr, S.recallTemplate, S.pld, S.toys, S.toys2025, S.cosmetics, S.textile, S.l4233, S.envL54110, S.envR541173, S.loi2026]
          .map((x) => ({ '@type': 'Legislation', name: x.label[lang], url: x.url[lang] })),
      },
      crumb.jsonld,
    ],
  };
}
