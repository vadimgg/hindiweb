// Responsible for: building the Anki Pronunciation HTML field
import { esc, langHex, aSection, aSectionLabel } from './utils.js';

export function buildAnkiPronunciation(word) {
  const pg = word.pronunciation_guide;
  if (!pg) return '';
  if (!pg.syllables && !(pg.breakdown || []).length && !(pg.extra_notes || []).length) return '';
  let inner = '<div style="background:#020617;border-left:2px solid rgba(45,212,191,.5);border-radius:0 6px 6px 0;padding:.65rem .9rem;">';
  if (pg.syllables) inner += `<p style="font-family:'Oswald',sans-serif;color:#5eead4;font-size:1.05rem;font-weight:600;letter-spacing:.15em;margin:0 0 .5rem 0;">${esc(pg.syllables)}</p>`;
  (pg.breakdown || []).forEach(item => {
    inner += `<div style="display:flex;gap:.65rem;align-items:flex-start;margin-bottom:.35rem;"><span style="font-family:'Oswald',sans-serif;font-weight:600;font-size:.83rem;color:#f1f5f9;min-width:2.8rem;">${esc(item.syllable)}</span><p style="font-size:.85rem;color:#cbd5e1;line-height:1.5;margin:0;">${esc(item.sound || item.note || '')}</p></div>`;
  });
  if (pg.stress) inner += `<p style="font-size:.8rem;color:rgba(251,191,36,.8);font-style:italic;border-top:1px solid rgba(148,163,184,.1);padding-top:.4rem;margin:.35rem 0 0 0;">${esc(pg.stress)}</p>`;
  (pg.extra_notes || []).forEach(item => {
    const col = langHex(item.language);
    inner += `<div style="display:flex;gap:.65rem;align-items:flex-start;margin-bottom:.3rem;">${item.language ? `<span style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:${col};opacity:.8;min-width:3.5rem;">${esc(item.language)}</span>` : ''}<p style="font-size:.83rem;color:#94a3b8;line-height:1.5;margin:0;">${esc(item.note)}</p></div>`;
  });
  inner += '</div>';
  return aSection(aSectionLabel('Pronunciation') + inner, '#14b8a6');
}
