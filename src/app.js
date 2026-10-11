// Browser UI. Everything runs locally: no fetch/XHR, no storage unless the user exports a file.
import { SECTIONS, isVisible, missingRequired } from './lib/schema.js';
import { DOC_KEYS, generateAll, docTitle, EXAMPLE } from './lib/generate.js';
import { toDocx, toHtml, toMarkdown } from './lib/render.js';
import { zip } from './lib/zip.js';
import { UI } from './lib/ui-strings.js';

const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
const t = UI[lang];
const form = document.getElementById('gpsr-form');
const results = document.getElementById('results');
const statusEl = document.getElementById('status');
let answers = {};
let docs = null;
let active = 'sheet';

const el = (tag, attrs = {}, ...children) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === 'text') n.textContent = v;
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) if (c) n.append(c);
  return n;
};

function renderForm() {
  for (const s of SECTIONS) {
    const fs = el('fieldset', { id: `sec-${s.id}` }, el('legend', { text: s.legend[lang] }));
    for (const f of s.fields) {
      const id = `f-${f.id}`;
      const hintId = f.hint ? `${id}-hint` : null;
      const wrap = el('div', { class: 'field', 'data-field': f.id });
      const req = f.required ? ` ${t.required}` : '';
      if (f.type === 'radio' || f.type === 'checks') {
        const group = el('fieldset', { class: 'choices' + (f.options.length > 3 ? ' cols' : ''), 'aria-describedby': hintId });
        group.append(el('legend', { class: 'label', text: f.label[lang] + req }));
        for (const o of f.options) {
          const oid = `${id}-${o.id}`;
          const input = el('input', { type: f.type === 'radio' ? 'radio' : 'checkbox', id: oid, name: f.id, value: o.id, required: f.required && f.type === 'radio' });
          group.append(el('label', { class: 'choice', for: oid }, input, el('span', { text: o.label[lang] })));
        }
        if (f.hint) group.append(el('span', { class: 'hint', id: hintId, text: f.hint[lang] }));
        wrap.append(group);
      } else {
        wrap.append(el('label', { for: id }, f.label[lang] + req, f.hint ? el('span', { class: 'hint', id: hintId, text: f.hint[lang] }) : null));
        let input;
        if (f.type === 'textarea') input = el('textarea', { id, name: f.id, rows: 3 });
        else if (f.type === 'select') {
          input = el('select', { id, name: f.id }, el('option', { value: '', text: t.choose }), ...f.options.map((o) => el('option', { value: o.id, text: o.label[lang] })));
        } else input = el('input', { id, name: f.id, type: 'text', autocomplete: 'off' });
        if (f.required) input.setAttribute('aria-required', 'true');
        if (hintId) input.setAttribute('aria-describedby', hintId);
        wrap.append(input);
      }
      if (f.id === 'category') wrap.append(el('div', { class: 'redirect callout', id: 'category-redirect', role: 'status' }));
      fs.append(wrap);
    }
    form.append(fs);
  }
}

function readForm() {
  const a = {};
  for (const s of SECTIONS)
    for (const f of s.fields) {
      if (f.type === 'checks') a[f.id] = [...form.querySelectorAll(`input[name="${f.id}"]:checked`)].map((i) => i.value);
      else if (f.type === 'radio') a[f.id] = form.querySelector(`input[name="${f.id}"]:checked`)?.value ?? '';
      else a[f.id] = form.elements[f.id]?.value ?? '';
    }
  return a;
}

function writeForm(a) {
  for (const s of SECTIONS)
    for (const f of s.fields) {
      const v = a[f.id];
      if (f.type === 'checks') form.querySelectorAll(`input[name="${f.id}"]`).forEach((i) => (i.checked = Array.isArray(v) && v.includes(i.value)));
      else if (f.type === 'radio') form.querySelectorAll(`input[name="${f.id}"]`).forEach((i) => (i.checked = i.value === v));
      else if (form.elements[f.id]) form.elements[f.id].value = typeof v === 'string' ? v : '';
    }
  sync();
}

function sync() {
  answers = readForm();
  for (const s of SECTIONS)
    for (const f of s.fields) {
      const node = form.querySelector(`[data-field="${f.id}"]`);
      node.hidden = !isVisible(f, answers);
    }
  const redirect = document.getElementById('category-redirect');
  redirect.textContent = t.categoryNotes[answers.category] ?? '';
  if (docs) generate(false);
}

function generate(announce = true) {
  answers = readForm();
  const missing = missingRequired(answers);
  if (announce && missing.length) {
    statusEl.textContent = t.missing(missing.length);
    const first = form.querySelector(`[data-field="${missing[0]}"] input, [data-field="${missing[0]}"] textarea, [data-field="${missing[0]}"] select`);
    first?.focus();
    // Still generate: blanks are rendered as lines to fill in by hand.
  }
  docs = generateAll(answers, lang, new Date());
  results.hidden = false;
  showTab(active);
  if (announce && !missing.length) statusEl.textContent = t.generated;
  if (announce) document.getElementById('results-title').focus();
}

function showTab(key) {
  active = key;
  for (const k of DOC_KEYS) {
    const tab = document.getElementById(`tab-${k}`);
    const panel = document.getElementById(`panel-${k}`);
    tab.setAttribute('aria-selected', String(k === key));
    tab.tabIndex = k === key ? 0 : -1;
    panel.hidden = k !== key;
    if (docs) panel.innerHTML = toHtml(docs[k]);
  }
}

function slug(s) {
  return (s || 'produit').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'produit';
}
const fileBase = (k) => `${slug(answers.productName)}-${t.fileNames[k]}`;

function download(name, data, type) {
  const blob = new Blob([data], { type });
  const a = el('a', { href: URL.createObjectURL(blob), download: name });
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  statusEl.textContent = t.downloaded(name);
}

const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

function bindActions() {
  form.addEventListener('input', sync);
  form.addEventListener('change', sync);
  form.addEventListener('submit', (e) => { e.preventDefault(); generate(); });
  document.getElementById('btn-example').addEventListener('click', () => { writeForm(EXAMPLE[lang]); generate(); });
  document.getElementById('btn-reset').addEventListener('click', () => { form.reset(); docs = null; results.hidden = true; sync(); statusEl.textContent = t.cleared; });

  const tabs = document.getElementById('tabs');
  tabs.addEventListener('click', (e) => { const b = e.target.closest('button[data-doc]'); if (b) showTab(b.dataset.doc); });
  tabs.addEventListener('keydown', (e) => {
    const i = DOC_KEYS.indexOf(active);
    let n = null;
    if (e.key === 'ArrowRight') n = DOC_KEYS[(i + 1) % DOC_KEYS.length];
    if (e.key === 'ArrowLeft') n = DOC_KEYS[(i + DOC_KEYS.length - 1) % DOC_KEYS.length];
    if (n) { e.preventDefault(); showTab(n); document.getElementById(`tab-${n}`).focus(); }
  });

  document.getElementById('btn-print').addEventListener('click', () => { document.body.classList.remove('print-all'); window.print(); });
  document.getElementById('btn-print-all').addEventListener('click', () => {
    for (const k of DOC_KEYS) document.getElementById(`panel-${k}`).innerHTML = toHtml(docs[k]);
    document.body.classList.add('print-all');
    window.print();
    document.body.classList.remove('print-all');
  });
  document.getElementById('btn-docx').addEventListener('click', () => download(`${fileBase(active)}.docx`, toDocx(docs[active], { lang }), DOCX_TYPE));
  document.getElementById('btn-md').addEventListener('click', () => download(`${fileBase(active)}.md`, toMarkdown(docs[active]), 'text/markdown;charset=utf-8'));
  document.getElementById('btn-zip').addEventListener('click', () => {
    const files = DOC_KEYS.flatMap((k) => [
      { name: `${fileBase(k)}.docx`, data: toDocx(docs[k], { lang }) },
      { name: `${fileBase(k)}.md`, data: toMarkdown(docs[k]) },
    ]);
    files.push({ name: `${slug(answers.productName)}-${t.fileNames.answers}.json`, data: JSON.stringify({ kit: 'kit-gpsr-vendeurs', v: 1, lang, answers }, null, 2) });
    download(`${slug(answers.productName)}-${t.fileNames.all}.zip`, zip(files, { date: new Date() }), 'application/zip');
  });
  document.getElementById('btn-save').addEventListener('click', () => {
    answers = readForm();
    download(`${slug(answers.productName)}-${t.fileNames.answers}.json`, JSON.stringify({ kit: 'kit-gpsr-vendeurs', v: 1, lang, answers }, null, 2), 'application/json');
  });
  document.getElementById('btn-load').addEventListener('click', () => document.getElementById('file-load').click());
  document.getElementById('file-load').addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data?.kit !== 'kit-gpsr-vendeurs' || typeof data.answers !== 'object') throw new Error('format');
      writeForm(data.answers);
      generate();
      statusEl.textContent = t.loaded;
    } catch {
      statusEl.textContent = t.loadError;
    }
    e.target.value = '';
  });
}

function buildTabs() {
  const tabs = document.getElementById('tabs');
  const panels = document.getElementById('panels');
  for (const k of DOC_KEYS) {
    tabs.append(el('button', { type: 'button', role: 'tab', id: `tab-${k}`, 'data-doc': k, 'aria-controls': `panel-${k}`, 'aria-selected': 'false', text: docTitle(k, lang) }));
    panels.append(el('div', { class: 'panel', role: 'tabpanel', id: `panel-${k}`, 'aria-labelledby': `tab-${k}`, tabindex: '0', hidden: true }));
  }
}

renderForm();
buildTabs();
bindActions();
sync();
document.documentElement.classList.add('js');
