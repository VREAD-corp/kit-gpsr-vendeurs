import { S } from '../lib/content.js';
import { SITE, url } from './layout.mjs';

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

  const body = fr
    ? `<h1>Obligations GPSR et REP : ce qu’il faut savoir, avec les sources</h1>
<p class="lead">Synthèse pour petits vendeurs, vérifiée le ${SITE.updated} sur les textes officiels. Chaque ligne renvoie au texte : en cas de doute, c’est le texte qui fait foi.</p>
<div class="callout"><p>Information générale, pas un conseil juridique. READ FRANCE SAS n’agit pas comme personne responsable, mandataire ou importateur.</p></div>
<h2>Le règlement en deux phrases</h2>
<p>Depuis le <strong>13 décembre 2024</strong>, le règlement (UE) 2023/988 relatif à la sécurité générale des produits (GPSR) impose de ne mettre sur le marché que des produits sûrs, et organise l’identification, la traçabilité et l’information des consommateurs (${a(S.gpsr, lang, 'art. 5 et 52')}). Il s’applique aux produits neufs, d’occasion, réparés ou reconditionnés vendus par des professionnels, y compris le fait main (${a(S.gpsr, lang, 'art. 2, §3')}) ; les ventes purement entre particuliers n’en relèvent pas (${a(S.guidelines, lang, '§1.1')}).</p>
<p>Une offre en ligne est réputée mettre le produit à disposition dans l’UE dès qu’elle cible des consommateurs de l’UE (livraison, langue, devise…) (${a(S.gpsr, lang, 'art. 4')}). Il n’y a pas d’exemption pour les petites entreprises (${a(S.guidelines, lang, '§1.1')}).</p>
<h2>Qui êtes-vous pour le règlement ?</h2>
<ul>
<li><strong>Fabricant</strong> : vous fabriquez, ou faites fabriquer et vendez sous votre nom ou votre marque — cas de la plupart des créateurs (${a(S.gpsr, lang, 'art. 3, point 8')}). Modifier substantiellement un produit (upcycling, personnalisation) peut aussi faire de vous un fabricant (${a(S.gpsr, lang, 'art. 13')}).</li>
<li><strong>Importateur</strong> : établi dans l’UE, vous mettez sur le marché un produit venant d’un pays tiers (${a(S.gpsr, lang, 'art. 3 et 11')}).</li>
<li><strong>Distributeur</strong> : vous revendez un produit d’un autre fabricant (${a(S.gpsr, lang, 'art. 12')}).</li>
<li><strong>Personne responsable</strong> : un opérateur établi dans l’UE (fabricant, importateur, mandataire avec mandat écrit, ou à défaut prestataire d’exécution des commandes) doit exister pour chaque produit (${a(S.gpsr, lang, 'art. 16')} ; ${a(S.msr, lang, 'art. 4, §2')}). Un créateur établi en France est lui-même cet opérateur. <strong>Nous ne proposons pas ce rôle.</strong></li>
</ul>
<h2>Les obligations, ligne par ligne</h2>
${table}
<h2>Produits à règles spécifiques</h2>
<p>Quand une législation sectorielle existe, le GPSR ne couvre que les risques qu’elle ne traite pas (${a(S.gpsr, lang, 'art. 2, §1')}) ; l’article 19 (annonce en ligne) et l’article 20 (accidents) restent applicables.</p>
<ul>
<li><strong>Jouets</strong> (jeu des moins de 14 ans) : ${a(S.toys, lang)} — marquage CE, documentation, avertissements (ex. « Ne convient pas aux enfants de moins de 36 mois ») ; nouveau ${a(S.toys2025, lang)}.</li>
<li><strong>Cosmétiques, savons, bombes de bain</strong> : ${a(S.cosmetics, lang)} — personne responsable cosmétique (art. 4), rapport de sécurité (art. 10), notification CPNP (art. 13).</li>
<li><strong>Textiles</strong> : composition en fibres sur l’étiquette et avant l’achat en ligne, ${a(S.textile, lang, 'art. 14 et 16')} ; cordons des vêtements d’enfants : ${a(S.en14682, lang)}.</li>
<li><strong>Bijoux</strong> : restrictions REACH — ${a(S.reachNickel, lang)}, ${a(S.reachCadmium, lang)}, ${a(S.reachLead, lang)}.</li>
<li><strong>Bougies</strong> : ${a(S.en15494, lang)} ; parfums : ${a(S.clp, lang)} (à vérifier avec le fournisseur).</li>
<li><strong>Contact alimentaire</strong> : ${a(S.fcm, lang)}. <strong>Électrique</strong> : ${a(S.lvd, lang)}. <strong>Denrées alimentaires</strong> : exclues du GPSR (${a(S.gpsr, lang, 'art. 2, §2')}).</li>
</ul>
<h2>France : REP (responsabilité élargie du producteur)</h2>
<ul>
<li>Produits concernés et principe : ${a(S.envL54110, lang)} — emballages ménagers et papiers, textiles-linge-chaussures, ameublement, jouets, sport et loisirs, bricolage et jardin, équipements électriques, piles…</li>
<li>Un <strong>identifiant unique (IDU) par filière</strong>, obtenu via l’éco-organisme qui vous inscrit dans SYDEREP : ${a(S.envIdu, lang)} ; ${a(S.ademeIdu, lang)}.</li>
<li>IDU affiché dans les CGV (ou document contractuel) et sur le site : ${a(S.envR541173, lang)}.</li>
<li>Les plateformes doivent vérifier l’IDU de leurs vendeurs ou assumer la REP à leur place : ${a(S.envMarketplace, lang)}.</li>
<li>Vendeurs non établis en France : mandataire établi en France désigné par écrit (art. L541-10-9-1) ; textiles vendus en ligne : affichage du lieu de fabrication — ${a(S.loi2026, lang)}.</li>
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
<li>Vinted Pro : ${a(S.vintedPro, lang)} — champs « Informations sur le fabricant », « Étiquetage et marquage » et paramètres REP relevés dans l’interface.</li>
<li>Boutique Shopify ou site propre : vous êtes le vendeur à distance, l’article 19 s’applique directement à vos fiches produits.</li>
</ul>
<h2>Limites de cette synthèse</h2>
<p>Les pages de la DGCCRF n’ont pas pu être consultées automatiquement (protection anti-robot) : référez-vous à Légifrance et à RappelConso cités ci-dessus. Les aides Amazon Seller Central nécessitent une connexion. Les normes (EN 15494, EN 14682, EN 12586) sont payantes : nous citons leur titre, pas leur contenu. Signalez une erreur via les <a href="${SITE.issues}">issues GitHub</a>.</p>
<p><a class="btn" href="${url('tool', lang)}">Ouvrir le générateur</a></p>`
    : `<h1>GPSR and EPR obligations: what to know, with sources</h1>
<p class="lead">Summary for small sellers, checked on ${SITE.updated} against the official texts. Every line links to the text: if in doubt, the text prevails.</p>
<div class="callout"><p>General information, not legal advice. READ FRANCE SAS does not act as responsible person, authorised representative or importer.</p></div>
<h2>The regulation in two sentences</h2>
<p>Since <strong>13 December 2024</strong>, Regulation (EU) 2023/988 on general product safety (GPSR) requires that only safe products are placed on the market, and organises identification, traceability and consumer information (${a(S.gpsr, lang, 'Art. 5 and 52')}). It covers new, used, repaired or reconditioned products sold by traders, handmade included (${a(S.gpsr, lang, 'Art. 2(3)')}); purely consumer-to-consumer sales are out of scope (${a(S.guidelines, lang, '§1.1')}).</p>
<p>An online offer counts as making the product available in the EU as soon as it targets EU consumers (delivery, language, currency…) (${a(S.gpsr, lang, 'Art. 4')}). There is no exemption for small businesses (${a(S.guidelines, lang, '§1.1')}).</p>
<h2>What is your role under the regulation?</h2>
<ul>
<li><strong>Manufacturer</strong>: you make the product, or have it made and sell it under your name or trade mark — most makers (${a(S.gpsr, lang, 'Art. 3(8)')}). Substantially modifying a product (upcycling, customisation) can also make you a manufacturer (${a(S.gpsr, lang, 'Art. 13')}).</li>
<li><strong>Importer</strong>: established in the EU, you place a product from a non-EU country on the EU market (${a(S.gpsr, lang, 'Art. 3 and 11')}).</li>
<li><strong>Distributor</strong>: you resell another manufacturer’s product (${a(S.gpsr, lang, 'Art. 12')}).</li>
<li><strong>Responsible person</strong>: an EU-established operator (manufacturer, importer, authorised representative with a written mandate or, failing those, a fulfilment service provider) must exist for every product (${a(S.gpsr, lang, 'Art. 16')}; ${a(S.msr, lang, 'Art. 4(2)')}). A maker established in the EU is that operator. Sellers based in the UK, US or elsewhere need one. <strong>We do not offer this role.</strong></li>
</ul>
<h2>The obligations, line by line</h2>
${table}
<h2>Products with specific rules</h2>
<p>Where sector legislation exists, the GPSR only covers the risks it does not address (${a(S.gpsr, lang, 'Art. 2(1)')}); Article 19 (online listing) and Article 20 (accidents) still apply.</p>
<ul>
<li><strong>Toys</strong> (play by under-14s): ${a(S.toys, lang)} — CE marking, documentation, warnings (e.g. “Not suitable for children under 36 months”); new ${a(S.toys2025, lang)}.</li>
<li><strong>Cosmetics, soaps, bath bombs</strong>: ${a(S.cosmetics, lang)} — cosmetics responsible person (Art. 4), safety report (Art. 10), CPNP notification (Art. 13).</li>
<li><strong>Textiles</strong>: fibre composition on the label and before an online purchase, ${a(S.textile, lang, 'Art. 14 and 16')}; cords on children’s clothing: ${a(S.en14682, lang)}.</li>
<li><strong>Jewellery</strong>: REACH restrictions — ${a(S.reachNickel, lang)}, ${a(S.reachCadmium, lang)}, ${a(S.reachLead, lang)}.</li>
<li><strong>Candles</strong>: ${a(S.en15494, lang)}; fragrances: ${a(S.clp, lang)} (check with your supplier).</li>
<li><strong>Food contact</strong>: ${a(S.fcm, lang)}. <strong>Electrical</strong>: ${a(S.lvd, lang)}. <strong>Food</strong>: excluded from the GPSR (${a(S.gpsr, lang, 'Art. 2(2)')}).</li>
</ul>
<h2>France: EPR (extended producer responsibility)</h2>
<ul>
<li>Products and principle: ${a(S.envL54110, lang)} — household packaging and paper, textiles-linen-footwear, furniture, toys, sport and leisure, DIY and garden, electrical equipment, batteries…</li>
<li><strong>One unique identifier (UID) per stream</strong>, obtained through the producer responsibility organisation that registers you in SYDEREP: ${a(S.envIdu, lang)}; ${a(S.ademeIdu, lang)}.</li>
<li>UID shown in your terms of sale (or contractual document) and on your website: ${a(S.envR541173, lang)}.</li>
<li>Marketplaces must check their sellers’ UIDs or take on EPR for them: ${a(S.envMarketplace, lang)}.</li>
<li>Sellers not established in France: an agent established in France appointed in writing (Art. L541-10-9-1); textiles sold online: place of manufacture shown — ${a(S.loi2026, lang)}.</li>
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
<li>Vinted Pro: ${a(S.vintedPro, lang)} — “Manufacturer information”, “Labelling and marking” and EPR settings fields observed in the interface.</li>
<li>Shopify store or own website: you are the distance seller; Article 19 applies directly to your product pages.</li>
</ul>
<h2>Limits of this summary</h2>
<p>The French DGCCRF pages could not be read automatically (anti-bot protection): rely on Légifrance and RappelConso cited above. Amazon Seller Central help requires a login. Standards (EN 15494, EN 14682, EN 12586) are paid documents: we cite their titles, not their content. Report an error through <a href="${SITE.issues}">GitHub issues</a>.</p>
<p><a class="btn" href="${url('tool', lang)}">Open the generator</a></p>`;
  return {
    title: fr ? 'Obligations GPSR et REP pour vendeurs en ligne, avec sources officielles — Kit GPSR Vendeurs' : 'GPSR and EPR obligations for online sellers, with official sources — GPSR Seller Kit',
    description: fr
      ? 'Fabricant, personne responsable, article 19, analyse de risques, rappels, REP et IDU en France : les obligations du règlement (UE) 2023/988 expliquées avec les articles cités.'
      : 'Manufacturer, responsible person, Article 19, risk analysis, recalls, French EPR and UIDs: the obligations of Regulation (EU) 2023/988 explained with the articles cited.',
    body,
    jsonld: { '@context': 'https://schema.org', '@type': 'Article', headline: fr ? 'Obligations GPSR et REP pour vendeurs en ligne' : 'GPSR and EPR obligations for online sellers', dateModified: SITE.updated, inLanguage: lang, publisher: { '@type': 'Organization', name: 'READ FRANCE SAS' } },
  };
}
