// Sources used by the guides that are not in src/lib/content.js (checked 2026-10-17).
// [label, url]; the content.js registry (S) stays the reference for the generator's own documents.
import { S } from '../../lib/content.js';

const s = (k) => [S[k].label.fr, S[k].url.fr];

export const SRC = {
  gpsr: s('gpsr'),
  guidelines: s('guidelines'),
  msr: s('msr'),
  recallTemplate: s('recallTemplate'),
  rappelconso: s('l4233'),
  toys: s('toys'),
  toys2025: s('toys2025'),
  cosmetics: s('cosmetics'),
  textile: s('textile'),
  clp: s('clp'),
  fcm: s('fcm'),
  en15494: s('en15494'),
  en14682: s('en14682'),
  en12586: s('en12586'),
  envR541173: s('envR541173'),
  envMarketplace: s('envMarketplace'),
  ademeIdu: s('ademeIdu'),
  refashion: s('refashion'),
  loi2026: s('loi2026'),
  etsyGpsr: s('etsyGpsr'),
  etsyEo: s('etsyEo'),
  etsyEpr: s('etsyEpr'),
  amazonGpsr: s('amazonGpsr'),
  sbg: s('sbg'),
  rag: s('rag'),
  reach: ['Règlement (CE) n° 1907/2006 (REACH), annexe XVII, version consolidée du 22 juin 2026', 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:02006R1907-20260622'],
  std2026: ['Décision d’exécution (UE) 2026/901 (normes européennes publiées au titre du règlement 2023/988)', 'https://eur-lex.europa.eu/eli/dec_impl/2026/901/oj?locale=fr'],
  douaneMetaux: ['Douane : règles de marque pour la garantie des métaux précieux (mise à jour le 19/11/2024)', 'https://www.douane.gouv.fr/fiche/regles-de-marque-pour-la-garantie-des-metaux-precieux'],
};

/** Inline link to a SRC entry. */
export const cite = (k, text) => `<a href="${SRC[k][1]}">${text ?? SRC[k][0]}</a>`;
export const REACH_URL = SRC.reach[1];
