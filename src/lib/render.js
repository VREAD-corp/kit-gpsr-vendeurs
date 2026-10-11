// Renderers for the small document model used by every generated document.
//
// Document: { title, subtitle?, blocks: Block[] }
// Block:
//   {t:'h2'|'h3', text}            headings (the title is the h1)
//   {t:'p', text}                  paragraph
//   {t:'note', text}               highlighted note / disclaimer
//   {t:'ul', items: Inline[]}      bullet list
//   {t:'check', items: Inline[]}   checklist with empty boxes
//   {t:'kv', rows: [label, value][]}  two-column field table (empty value => blank line to fill)
//   {t:'table', head: string[], rows: Inline[][], widths?: number[]}
//   {t:'label', lines: Inline[]}   boxed label text (packaging / label copy)
// Inline: string | Run | Run[]   with Run = {text, b?, i?, href?}

import { zip } from './zip.js';

export const BLANK = '…………………………';

export function runs(x) {
  if (x == null) return [];
  if (typeof x === 'string') return [{ text: x }];
  if (Array.isArray(x)) return x.flatMap(runs);
  return [x];
}

export const plain = (x) => runs(x).map((r) => r.text).join('');

/* ----------------------------- Markdown ----------------------------- */

const mdEscape = (s) => s.replace(/([\\`*_[\]<>|])/g, '\\$1');
function mdInline(x) {
  return runs(x)
    .map((r) => {
      let s = mdEscape(r.text);
      if (r.href) s = `[${s}](${r.href})`;
      if (r.b) s = `**${s}**`;
      if (r.i) s = `*${s}*`;
      return s;
    })
    .join('');
}

export function toMarkdown(doc) {
  const out = [`# ${mdEscape(doc.title)}`, ''];
  if (doc.subtitle) out.push(`*${mdEscape(doc.subtitle)}*`, '');
  for (const b of doc.blocks) {
    switch (b.t) {
      case 'h2': out.push(`## ${mdInline(b.text)}`, ''); break;
      case 'h3': out.push(`### ${mdInline(b.text)}`, ''); break;
      case 'p': out.push(mdInline(b.text), ''); break;
      case 'note': out.push(`> ${mdInline(b.text)}`, ''); break;
      case 'ul': out.push(...b.items.map((i) => `- ${mdInline(i)}`), ''); break;
      case 'check': out.push(...b.items.map((i) => `- [ ] ${mdInline(i)}`), ''); break;
      case 'kv':
        out.push('| | |', '|---|---|', ...b.rows.map(([k, v]) => `| **${mdInline(k)}** | ${v ? mdInline(v) : '&nbsp;'} |`), '');
        break;
      case 'table':
        out.push(`| ${b.head.map(mdInline).join(' | ')} |`, `|${b.head.map(() => '---').join('|')}|`);
        out.push(...b.rows.map((r) => `| ${b.head.map((_, i) => (r[i] ? mdInline(r[i]) : '&nbsp;')).join(' | ')} |`), '');
        break;
      case 'label':
        out.push('```text', ...b.lines.map(plain), '```', '');
        break;
      default: throw new Error(`unknown block ${b.t}`);
    }
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

/* ------------------------------- HTML ------------------------------- */

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function htmlInline(x) {
  return runs(x)
    .map((r) => {
      let s = esc(r.text);
      if (r.href && /^https?:\/\//.test(r.href)) s = `<a href="${esc(r.href)}" rel="noopener" target="_blank">${s}</a>`;
      if (r.b) s = `<strong>${s}</strong>`;
      if (r.i) s = `<em>${s}</em>`;
      return s;
    })
    .join('');
}

export function toHtml(doc) {
  const out = [`<article class="doc"><h2 class="doc-title">${esc(doc.title)}</h2>`];
  if (doc.subtitle) out.push(`<p class="doc-sub">${esc(doc.subtitle)}</p>`);
  for (const b of doc.blocks) {
    switch (b.t) {
      case 'h2': out.push(`<h3>${htmlInline(b.text)}</h3>`); break;
      case 'h3': out.push(`<h4>${htmlInline(b.text)}</h4>`); break;
      case 'p': out.push(`<p>${htmlInline(b.text)}</p>`); break;
      case 'note': out.push(`<p class="doc-note">${htmlInline(b.text)}</p>`); break;
      case 'ul': out.push(`<ul>${b.items.map((i) => `<li>${htmlInline(i)}</li>`).join('')}</ul>`); break;
      case 'check':
        out.push(`<ul class="doc-check">${b.items.map((i) => `<li><span aria-hidden="true">☐</span> ${htmlInline(i)}</li>`).join('')}</ul>`);
        break;
      case 'kv':
        out.push(`<table class="doc-kv"><tbody>${b.rows.map(([k, v]) => `<tr><th scope="row">${htmlInline(k)}</th><td>${v ? htmlInline(v) : '<span class="blank"></span>'}</td></tr>`).join('')}</tbody></table>`);
        break;
      case 'table':
        out.push(
          `<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${b.head.map((h) => `<th scope="col">${htmlInline(h)}</th>`).join('')}</tr></thead><tbody>${b.rows
            .map((r) => `<tr>${b.head.map((_, i) => `<td>${r[i] ? htmlInline(r[i]) : ''}</td>`).join('')}</tr>`)
            .join('')}</tbody></table></div>`,
        );
        break;
      case 'label':
        out.push(`<div class="doc-label">${b.lines.map((l) => `<p>${htmlInline(l)}</p>`).join('')}</div>`);
        break;
      default: throw new Error(`unknown block ${b.t}`);
    }
  }
  out.push('</article>');
  return out.join('\n');
}

/* ------------------------------- DOCX ------------------------------- */

const x = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
// Strip characters that are invalid in XML 1.0.
const clean = (s) => String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '');

function wRuns(inline, base = {}) {
  return runs(inline)
    .map((r) => {
      const text = r.href && !r.text.includes(r.href) ? `${r.text} (${r.href})` : r.text;
      const rpr = [(r.b || base.b) && '<w:b/>', (r.i || base.i) && '<w:i/>', base.mono && '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/>']
        .filter(Boolean)
        .join('');
      return `<w:r>${rpr ? `<w:rPr>${rpr}</w:rPr>` : ''}<w:t xml:space="preserve">${x(clean(text))}</w:t></w:r>`;
    })
    .join('');
}

const wP = (inline, { style, base, keepNext } = {}) =>
  `<w:p>${style || keepNext ? `<w:pPr>${style ? `<w:pStyle w:val="${style}"/>` : ''}${keepNext ? '<w:keepNext/>' : ''}</w:pPr>` : ''}${wRuns(inline, base)}</w:p>`;

const TBL_BORDERS =
  '<w:tblBorders>' + ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map((s) => `<w:${s} w:val="single" w:sz="4" w:space="0" w:color="8A8A8A"/>`).join('') + '</w:tblBorders>';

function wTable(head, rows, widths) {
  const total = 9638; // A4 text width in twips with 2 cm margins
  const n = head ? head.length : rows[0].length;
  const ws = widths ?? Array(n).fill(1);
  const sum = ws.reduce((a, b) => a + b, 0);
  const tw = ws.map((w) => Math.floor((w / sum) * total));
  const cell = (inline, i, header) =>
    `<w:tc><w:tcPr><w:tcW w:w="${tw[i]}" w:type="dxa"/>${header ? '<w:shd w:val="clear" w:color="auto" w:fill="E8EEF2"/>' : ''}</w:tcPr>${wP(inline || '', { base: header ? { b: true } : {} })}</w:tc>`;
  const grid = `<w:tblGrid>${tw.map((w) => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>`;
  const hdr = head ? `<w:tr><w:trPr><w:tblHeader/></w:trPr>${head.map((h, i) => cell(h, i, true)).join('')}</w:tr>` : '';
  const body = rows.map((r) => `<w:tr>${Array.from({ length: n }, (_, i) => cell(r[i], i, false)).join('')}</w:tr>`).join('');
  return `<w:tbl><w:tblPr><w:tblW w:w="${total}" w:type="dxa"/>${TBL_BORDERS}<w:tblLayout w:type="fixed"/></w:tblPr>${grid}${hdr}${body}</w:tbl><w:p/>`;
}

export function docxBody(doc) {
  const out = [wP(doc.title, { style: 'Title' })];
  if (doc.subtitle) out.push(wP(doc.subtitle, { style: 'Subtitle' }));
  for (const b of doc.blocks) {
    switch (b.t) {
      case 'h2': out.push(wP(b.text, { style: 'Heading1', keepNext: true })); break;
      case 'h3': out.push(wP(b.text, { style: 'Heading2', keepNext: true })); break;
      case 'p': out.push(wP(b.text)); break;
      case 'note': out.push(wP(b.text, { style: 'Note' })); break;
      case 'ul': out.push(...b.items.map((i) => wP([{ text: '• ' }, ...runs(i)], { style: 'ListPara' }))); break;
      case 'check': out.push(...b.items.map((i) => wP([{ text: '☐ ' }, ...runs(i)], { style: 'ListPara' }))); break;
      case 'kv': out.push(wTable(null, b.rows.map(([k, v]) => [[{ text: plain(k), b: true }], v || '']), [2, 3])); break;
      case 'table': out.push(wTable(b.head, b.rows, b.widths)); break;
      case 'label': out.push(wTable(null, [[b.lines.flatMap((l, i) => (i ? [{ text: ' | ' }, ...runs(l)] : runs(l)))]], [1])); break;
      default: throw new Error(`unknown block ${b.t}`);
    }
  }
  return out.join('');
}

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="21"/><w:lang w:val="fr-FR"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="100" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="120"/></w:pPr><w:rPr><w:b/><w:color w:val="0F3D4C"/><w:sz w:val="36"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:rPr><w:i/><w:color w:val="555555"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="0F3D4C"/><w:sz w:val="28"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="160" w:after="60"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:sz w:val="23"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Note"><w:name w:val="Note"/><w:basedOn w:val="Normal"/><w:pPr><w:pBdr><w:left w:val="single" w:sz="18" w:space="6" w:color="C27C0E"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="FFF6E5"/><w:ind w:left="140"/></w:pPr><w:rPr><w:sz w:val="19"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="ListPara"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="40"/><w:ind w:left="360" w:hanging="220"/></w:pPr></w:style>
</w:styles>`;

/** @returns {Uint8Array} a valid .docx package */
export function toDocx(doc, { lang = 'fr', date } = {}) {
  const body = docxBody(doc);
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const files = [
    {
      name: '[Content_Types].xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`,
    },
    {
      name: '_rels/.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`,
    },
    {
      name: 'docProps/core.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${x(clean(doc.title))}</dc:title><dc:language>${lang}</dc:language><dc:creator>Kit GPSR vendeurs</dc:creator></cp:coreProperties>`,
    },
    {
      name: 'word/_rels/document.xml.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    },
    { name: 'word/styles.xml', data: lang === 'fr' ? STYLES : STYLES.replace('w:val="fr-FR"', 'w:val="en-GB"') },
    { name: 'word/document.xml', data: document },
  ];
  return zip(files, { date });
}
