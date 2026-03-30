// Responsible for: building the Anki Examples HTML field
import { esc, aSection, aSectionLabel } from './utils.js';

export function buildAnkiExamples(word) {
  const exs = word.examples || [];
  if (exs.length === 0) return '';
  const items = exs.map(ex => {
    const reg     = ex.register ? `<span style="float:right;font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;color:#64748b;padding:.1rem .35rem;border:1px solid rgba(100,116,139,.3);border-radius:4px;">${esc(ex.register)}</span>` : '';
    const literal = ex.literal  ? `<p style="font-size:.75rem;color:#475569;font-style:italic;margin:.2rem 0 0 0;">${esc(ex.literal)}</p>` : '';
    const note    = ex.note     ? `<p style="font-size:.8rem;color:#64748b;margin:.35rem 0 0 0;padding-top:.35rem;border-top:1px solid rgba(148,163,184,.12);">${esc(ex.note)}</p>` : '';
    return `<div style="background:#020617;border:1px solid rgba(148,163,184,.12);border-radius:10px;padding:.8rem 1rem;margin-bottom:.5rem;">${reg}<p style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.1rem;color:#fbbf24;margin:0 0 .25rem 0;">${esc(ex.hindi)}</p><p style="font-size:.8rem;color:#5eead4;font-style:italic;margin:0 0 .35rem 0;">${esc(ex.romanisation)}</p><p style="font-size:.88rem;color:#cbd5e1;margin:0;">${esc(ex.english)}</p>${literal}${note}</div>`;
  }).join('');
  return aSection(aSectionLabel('Examples') + items, '#3b82f6');
}
