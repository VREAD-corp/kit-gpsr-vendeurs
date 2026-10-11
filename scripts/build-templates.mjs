// Builds the free template pack (GitHub Release asset): blank + example documents, FR and EN, DOCX + Markdown.
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { DOC_KEYS, EXAMPLE, generateAll } from '../src/lib/generate.js';
import { toDocx, toMarkdown } from '../src/lib/render.js';
import { zip } from '../src/lib/zip.js';
import { HAZARDS, MARKETPLACES, EPR_STREAMS } from '../src/lib/schema.js';
import { SITE } from '../src/site/layout.mjs';

const date = new Date(`${SITE.updated}T12:00:00Z`);
const NAMES = {
  fr: { dir: 'fr', sheet: '1-fiche-securite-produit', label: '2-etiquette-et-annonce', risk: '3-analyse-de-risques', checklist: '4-checklists-gpsr-plateformes-rep', blank: 'modeles-vierges', example: 'exemple-bougie' },
  en: { dir: 'en', sheet: '1-product-safety-sheet', label: '2-label-and-listing', risk: '3-risk-analysis', checklist: '4-gpsr-marketplace-epr-checklists', blank: 'blank-templates', example: 'example-candle' },
};
// Blank template: every hazard row, every platform and every EPR stream, so sellers delete what does not apply.
const BLANK = { hazards: HAZARDS.map((h) => h.id), marketplaces: MARKETPLACES.map((m) => m.id), sellsFrance: 'yes', epr: EPR_STREAMS.map((e) => e.id) };

const files = [];
for (const lang of ['fr', 'en']) {
  const n = NAMES[lang];
  for (const [variant, answers] of [[n.blank, BLANK], [n.example, EXAMPLE[lang]]]) {
    const docs = generateAll(answers, lang, date);
    for (const k of DOC_KEYS) {
      files.push({ name: `${n.dir}/${variant}/${n[k]}.docx`, data: toDocx(docs[k], { lang, date }) });
      files.push({ name: `${n.dir}/${variant}/${n[k]}.md`, data: toMarkdown(docs[k]) });
    }
  }
}
files.unshift({
  name: 'LISEZ-MOI_README.md',
  data: `# Kit GPSR Vendeurs — modèles gratuits / GPSR Seller Kit — free templates (v${SITE.version}, ${SITE.updated})

**FR** — Modèles de fiche d’information sécurité produit, texte d’étiquette et d’annonce (article 19), analyse de risques et checklists (GPSR, plateformes, REP France), au format DOCX et Markdown. Dossier \`modeles-vierges\` : à compléter ; dossier \`exemple-bougie\` : exemple rempli fictif.
Générateur en ligne (gratuit, rien n’est envoyé) : ${SITE.origin}${SITE.base}/

**EN** — Templates for the product safety information sheet, label and listing text (Article 19), risk analysis and checklists (GPSR, marketplaces, French EPR), in DOCX and Markdown. \`blank-templates\`: to fill in; \`example-candle\`: fictitious filled-in example.
Online generator (free, nothing is uploaded): ${SITE.origin}${SITE.base}/en/

## Avertissement / Disclaimer
Outil d’information, pas un conseil juridique : vous restez responsable de vos produits et documents. READ FRANCE SAS n’agit pas comme personne responsable, mandataire ou importateur et ne propose pas ce service.
Information tool, not legal advice: you remain responsible for your products and documents. READ FRANCE SAS does not act as responsible person, authorised representative or importer and does not offer that service.

Sources: ${SITE.origin}${SITE.base}/obligations.html

## Licence
Textes et modèles : Creative Commons Attribution 4.0 International (CC BY 4.0) — https://creativecommons.org/licenses/by/4.0/
Attribution : « Kit GPSR Vendeurs, READ FRANCE SAS, ${SITE.repo} ».
Extraits du droit de l’UE : © Union européenne (EUR-Lex), réutilisation autorisée.

Kit GPSR Vendeurs — un produit de READ FRANCE SAS.
`,
});
const out = zip(files, { date });
const name = `kit-gpsr-modeles-gratuits-v${SITE.version}.zip`;
await mkdir('dist-templates', { recursive: true });
await writeFile(`dist-templates/${name}`, out);
console.log(name, out.length, 'bytes', files.length, 'files', createHash('sha256').update(out).digest('hex'));
