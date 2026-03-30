// Responsible for: building the Anki Cross-Language HTML field
import { esc, langHex, aSection } from './utils.js';

function renderItem(item, type) {
  const isRel = type === 'relative';
  // Badge: blue tint for relative, neutral for coincidence — matching website
  const badgeStyle = isRel
    ? 'background:#0c2340;color:#38bdf8;border:1px solid rgba(56,189,248,.4)'
    : 'background:#1e293b;color:#94a3b8;border:1px solid rgba(148,163,184,.3)';
  const badge = `<span class="meta-badge" style="${badgeStyle}">${isRel ? 'Relative' : 'Coincidence'}</span>`;

  // Language label in its per-language accent colour
  const col  = item.language ? langHex(item.language) : '#94a3b8';
  const lang = item.language
    ? `<span class="lang-label" style="color:${col};">${esc(item.language)}</span>`
    : '';

  // Foreign word — coloured with language accent; romanisation in teal
  const wrd = item.word
    ? `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.15rem;color:${col};">${esc(item.word)}</span>`
    : '';
  const rom = item.romanisation
    ? `<span class="word-rom">(${esc(item.romanisation)})</span>`
    : '';
  const wordRow = (wrd || rom) ? `<div class="word-row">${wrd}${rom}</div>` : '';

  // Meaning inside a darker rounded box
  const mean = item.meaning
    ? `<div class="mean-box"><span>— ${esc(item.meaning)}</span></div>`
    : '';

  const note = item.note
    ? `<p class="item-note">${esc(item.note)}</p>`
    : '';

  return `<div class="clang-item">${badge}${lang}${wordRow}${mean}${note}</div>`;
}

export function buildAnkiCrossLang(word) {
  const clc = word.cross_language_connections;
  if (!clc) return '';
  const tr = clc.true_relatives || [], uc = clc.useful_coincidences || [];
  if (!tr.length && !uc.length) return '';
  const items = [
    ...tr.map(i => renderItem(i, 'relative')),
    ...uc.map(i => renderItem(i, 'coincidence')),
  ].join('');
  return aSection('Cross-Language', items, '#0ea5e9');
}
