// Questionnaire definition (bilingual). Rendered by app.js; consumed by generate.js.
// Field types: text, email, url, textarea, select, radio, checks.

const L = (fr, en) => ({ fr, en });

export const CATEGORIES = [
  { id: 'textile', label: L('Textile, vêtements, linge de maison, accessoires en tissu', 'Textiles, clothing, home linen, fabric accessories') },
  { id: 'jewellery', label: L('Bijoux et accessoires métalliques', 'Jewellery and metal accessories') },
  { id: 'candle', label: L('Bougies, fondants parfumés, diffuseurs', 'Candles, wax melts, diffusers') },
  { id: 'decor', label: L('Décoration, céramique, verre, bois, objets d’art', 'Home decor, ceramics, glass, wood, art objects') },
  { id: 'paper', label: L('Papeterie, affiches, carnets, cartes', 'Stationery, prints, notebooks, cards') },
  { id: 'leather', label: L('Maroquinerie, sacs, cuir', 'Leather goods, bags') },
  { id: 'childcare', label: L('Articles pour enfants qui ne sont pas des jouets (vêtements bébé, bavoirs, attache-tétine…)', 'Children’s items that are not toys (baby clothes, bibs, dummy clips…)') },
  { id: 'toy', label: L('Jouets (conçus pour le jeu des moins de 14 ans)', 'Toys (designed for play by children under 14)') },
  { id: 'cosmetic', label: L('Savons, cosmétiques, bombes de bain, baumes', 'Soaps, cosmetics, bath bombs, balms') },
  { id: 'electrical', label: L('Électrique ou électronique (lampes, objets à piles…)', 'Electrical or electronic (lamps, battery-powered items…)') },
  { id: 'food_contact', label: L('Objets au contact des aliments (tasses, planches, bols…)', 'Food-contact items (mugs, boards, bowls…)') },
  { id: 'food', label: L('Denrées alimentaires, compléments, aliments pour animaux', 'Food, supplements, animal feed') },
  { id: 'other', label: L('Autre produit de consommation', 'Other consumer product') },
];

export const HAZARDS = [
  { id: 'small_parts', label: L('Petites pièces détachables (perles, boutons, breloques)', 'Small detachable parts (beads, buttons, charms)') },
  { id: 'sharp', label: L('Pointes, bords coupants, aiguilles, éclats', 'Sharp points or edges, needles, splinters') },
  { id: 'cords', label: L('Cordons, liens, rubans, chaînes (risque d’étranglement)', 'Cords, ties, ribbons, chains (strangulation)') },
  { id: 'flame', label: L('Flamme nue ou combustion', 'Open flame or combustion') },
  { id: 'flammable', label: L('Matériau facilement inflammable', 'Easily flammable material') },
  { id: 'chemicals', label: L('Substances chimiques (teintures, vernis, résine, parfum, colle)', 'Chemical substances (dyes, varnish, resin, fragrance, glue)') },
  { id: 'skin', label: L('Contact prolongé avec la peau (bijou, vêtement)', 'Prolonged skin contact (jewellery, clothing)') },
  { id: 'heat', label: L('Chaleur ou surface chaude', 'Heat or hot surface') },
  { id: 'breakage', label: L('Casse (verre, céramique) ou rupture', 'Breakage (glass, ceramics) or structural failure') },
  { id: 'stability', label: L('Poids, basculement, chute, fixation murale', 'Weight, tipping, falling, wall mounting') },
  { id: 'food_like', label: L('Aspect pouvant être confondu avec un aliment', 'Appearance that could be mistaken for food') },
  { id: 'magnets_batteries', label: L('Aimants ou piles bouton', 'Magnets or button/coin batteries') },
];

export const MARKETPLACES = [
  { id: 'etsy', label: L('Etsy', 'Etsy') },
  { id: 'vinted', label: L('Vinted Pro', 'Vinted Pro') },
  { id: 'amazon', label: L('Amazon Handmade / Amazon', 'Amazon Handmade / Amazon') },
  { id: 'shopify', label: L('Ma boutique Shopify (ou autre site à moi)', 'My Shopify store (or other own website)') },
];

export const EPR_STREAMS = [
  { id: 'packaging', label: L('Emballages (cartons, papier de soie, sachets, boîtes)', 'Packaging (boxes, tissue paper, bags)') },
  { id: 'textile', label: L('Textiles d’habillement, linge de maison, chaussures', 'Clothing textiles, home linen, footwear') },
  { id: 'furniture', label: L('Éléments d’ameublement et de décoration textile', 'Furniture and textile decoration items') },
  { id: 'toys', label: L('Jouets', 'Toys') },
  { id: 'sport', label: L('Articles de sport et de loisirs', 'Sport and leisure articles') },
  { id: 'diy', label: L('Articles de bricolage et de jardin', 'DIY and garden articles') },
  { id: 'eee', label: L('Équipements électriques et électroniques', 'Electrical and electronic equipment') },
  { id: 'batteries', label: L('Piles et accumulateurs', 'Batteries and accumulators') },
  { id: 'paper', label: L('Papiers graphiques / imprimés', 'Graphic paper / printed matter') },
];

export const ROLES = [
  { id: 'maker', label: L('Je fabrique moi-même le produit (fait main)', 'I make the product myself (handmade)') },
  { id: 'brand', label: L('Je fais fabriquer le produit et le vends sous mon nom ou ma marque', 'I have the product made and sell it under my name or brand') },
  { id: 'importer', label: L('J’achète hors UE et je revends dans l’UE (sans y mettre ma marque)', 'I buy outside the EU and resell in the EU (not under my brand)') },
  { id: 'distributor', label: L('Je revends un produit d’un fabricant établi dans l’UE', 'I resell a product of a manufacturer established in the EU') },
];

export const USERS = [
  { id: 'adults', label: L('Adultes', 'Adults') },
  { id: 'teens', label: L('Adolescents (14 ans et plus)', 'Teenagers (14 and over)') },
  { id: 'children', label: L('Enfants de 3 à 14 ans (ou objet attrayant pour eux)', 'Children aged 3 to 14 (or attractive to them)') },
  { id: 'under3', label: L('Enfants de moins de 3 ans', 'Children under 3') },
];

export const SECTIONS = [
  {
    id: 'operator',
    legend: L('1. Vous et le fabricant', '1. You and the manufacturer'),
    fields: [
      { id: 'role', type: 'radio', options: ROLES, required: true, label: L('Votre rôle pour ce produit', 'Your role for this product') },
      { id: 'makerName', type: 'text', required: true, label: L('Nom du fabricant, raison sociale ou marque déposée', 'Manufacturer name, registered trade name or trade mark'), hint: L('Si vous fabriquez vous-même ou vendez sous votre marque, c’est vous.', 'If you make it yourself or sell it under your brand, that is you.') },
      { id: 'makerAddress', type: 'textarea', required: true, label: L('Adresse postale du fabricant', 'Manufacturer postal address'), hint: L('Une adresse où l’on peut joindre le fabricant (pas seulement un site web).', 'An address where the manufacturer can be contacted (not just a website).') },
      { id: 'makerContact', type: 'text', required: true, label: L('Adresse électronique du fabricant (e-mail ou formulaire de contact)', 'Manufacturer electronic address (email or contact form URL)') },
      { id: 'makerInEU', type: 'radio', required: true, label: L('Le fabricant est-il établi dans l’Union européenne ?', 'Is the manufacturer established in the European Union?'), options: [{ id: 'yes', label: L('Oui', 'Yes') }, { id: 'no', label: L('Non (ex. Royaume-Uni, États-Unis, Chine, Suisse)', 'No (e.g. UK, US, China, Switzerland)') }] },
      { id: 'rpName', type: 'text', showIf: { makerInEU: 'no' }, label: L('Personne responsable dans l’UE : nom', 'EU responsible person: name'), hint: L('Importateur, mandataire ou prestataire de services d’exécution des commandes établi dans l’UE, désigné par vous. Nous ne proposons pas ce service.', 'Importer, authorised representative or fulfilment service provider established in the EU, appointed by you. We do not offer this service.') },
      { id: 'rpAddress', type: 'textarea', showIf: { makerInEU: 'no' }, label: L('Personne responsable : adresse postale', 'Responsible person: postal address') },
      { id: 'rpContact', type: 'text', showIf: { makerInEU: 'no' }, label: L('Personne responsable : adresse électronique', 'Responsible person: electronic address') },
    ],
  },
  {
    id: 'product',
    legend: L('2. Le produit', '2. The product'),
    fields: [
      { id: 'productName', type: 'text', required: true, label: L('Nom du produit', 'Product name') },
      { id: 'productRef', type: 'text', required: true, label: L('Référence : type, modèle ou numéro d’article', 'Identifier: type, model or item number'), hint: L('Ex. « BOUG-LAV-200 ». Doit figurer sur le produit ou, si impossible, sur l’emballage.', 'E.g. “CAND-LAV-200”. Must be on the product or, if not possible, on the packaging.') },
      { id: 'batch', type: 'text', label: L('Numéro de lot ou de série (format)', 'Batch or serial number (format)'), hint: L('Ex. « LOT 2026-10-A » : permet de retrouver une fabrication en cas de rappel.', 'E.g. “BATCH 2026-10-A”: lets you trace a production run if a recall is needed.') },
      { id: 'category', type: 'select', required: true, options: CATEGORIES, label: L('Catégorie', 'Category') },
      { id: 'materials', type: 'textarea', label: L('Matériaux et composants', 'Materials and components'), hint: L('Ex. cire de soja, mèche coton, parfum (fournisseur, fiche de données de sécurité).', 'E.g. soy wax, cotton wick, fragrance oil (supplier, safety data sheet).') },
      { id: 'intendedUse', type: 'textarea', required: true, label: L('Usage prévu', 'Intended use') },
      { id: 'misuse', type: 'textarea', label: L('Mauvais usages raisonnablement prévisibles', 'Reasonably foreseeable misuse'), hint: L('Ex. bougie laissée sans surveillance, collier porté par un jeune enfant.', 'E.g. candle left unattended, necklace worn by a young child.') },
      { id: 'users', type: 'checks', options: USERS, label: L('Utilisateurs (y compris ceux qui peuvent y avoir accès)', 'Users (including those who may have access to it)') },
    ],
  },
  {
    id: 'hazards',
    legend: L('3. Risques à analyser', '3. Hazards to analyse'),
    fields: [
      { id: 'hazards', type: 'checks', options: HAZARDS, label: L('Cochez tout ce qui peut s’appliquer', 'Tick everything that may apply') },
      { id: 'warnings', type: 'textarea', label: L('Avertissements supplémentaires (un par ligne)', 'Additional warnings (one per line)') },
      { id: 'instructions', type: 'textarea', label: L('Mode d’emploi, entretien, élimination', 'Instructions for use, care, disposal') },
    ],
  },
  {
    id: 'channels',
    legend: L('4. Où vous vendez', '4. Where you sell'),
    fields: [
      { id: 'marketplaces', type: 'checks', options: MARKETPLACES, label: L('Plateformes', 'Platforms') },
      { id: 'sellsFrance', type: 'radio', label: L('Vendez-vous à des consommateurs en France ?', 'Do you sell to consumers in France?'), options: [{ id: 'yes', label: L('Oui', 'Yes') }, { id: 'no', label: L('Non', 'No') }] },
      { id: 'epr', type: 'checks', showIf: { sellsFrance: 'yes' }, options: EPR_STREAMS, label: L('Filières REP françaises concernées par ce que vous mettez sur le marché en France', 'French EPR streams covering what you place on the French market') },
      { id: 'uids', type: 'textarea', showIf: { sellsFrance: 'yes' }, label: L('Vos identifiants uniques (IDU) déjà obtenus, un par ligne', 'Your unique identifiers (UID) already obtained, one per line'), hint: L('Ex. « Emballages : FR123456_01XXXX ». Laissez vide si vous n’en avez pas encore.', 'E.g. “Packaging: FR123456_01XXXX”. Leave empty if you have none yet.') },
    ],
  },
];

export const ALL_FIELDS = SECTIONS.flatMap((s) => s.fields);

export function isVisible(field, answers) {
  if (!field.showIf) return true;
  return Object.entries(field.showIf).every(([k, v]) => answers[k] === v);
}

/** Returns the list of required-but-empty visible fields. */
export function missingRequired(answers) {
  return ALL_FIELDS.filter((f) => f.required && isVisible(f, answers) && !String(answers[f.id] ?? '').trim()).map((f) => f.id);
}

export const label = (opts, id, lang) => opts.find((o) => o.id === id)?.label[lang] ?? id;
