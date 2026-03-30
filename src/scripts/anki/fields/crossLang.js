// Responsible for: building the Anki Cross-Language HTML field
import { esc, langHex, aSection, aSectionLabel } from './utils.js';

function renderItem(item, type) {
  const bs   = type === 'relative' ? 'background:#0c1a2e;color:#38bdf8;border:1px solid rgba(56,189,248,.4)' : 'background:#1e293b;color:#94a3b8;border:1px solid rgba(148,163,184,.4)';
  const badge = `<span style="font-size:.58rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:.1rem .35rem;border-radius:4px;${bs}">${type}</span>`;
  const col  = item.language ? langHex(item.language) : '#94a3b8';
  const lang = item.language ? `<span style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:${col};opacity:.85;">${esc(item.language)}</span>` : '';
  const wrd  = item.word         ? `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1rem;color:#fbbf24;">${esc(item.word)}</span>` : '';
  const rom  = item.romanisation ? `<span style="color:#5eead4;font-size:.8rem;">(${esc(item.romanisation)})</span>` : '';
  const mean = item.meaning      ? `<span style="color:#94a3b8;font-size:.8rem;">— ${esc(item.meaning)}</span>` : '';
  const note = item.note         ? `<p style="font-size:.83rem;color:#cbd5e1;line-height:1.5;margin:.25rem 0 0 0;">${esc(item.note)}</p>` : '';
  return `<div style="margin-bottom:.65rem;"><div style="display:flex;gap:.45rem;align-items:baseline;flex-wrap:wrap;margin-bottom:.15rem;">${badge}${lang}${wrd}${rom}${mean}</div>${note}</div>`;
}

export function buildAnkiCrossLang(word) {
  const clc = word.cross_language_connections;
  if (!clc) return '';
  const tr = clc.true_relatives || [], uc = clc.useful_coincidences || [];
  if (!tr.length && !uc.length) return '';
  const items = [...tr.map(i => renderItem(i, 'relative')), ...uc.map(i => renderItem(i, 'coincidence'))].join('');
  return aSection(aSectionLabel('Cross-Language') + items, '#0ea5e9');
}
