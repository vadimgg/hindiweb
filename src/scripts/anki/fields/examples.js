// Responsible for: building the Anki Examples HTML field
import { esc, aSection } from './utils.js';

export function buildAnkiExamples(word) {
  const exs = word.examples || [];
  if (exs.length === 0) return '';

  const items = exs.map(ex => {
    // ex-header: on desktop reg badge is right of Hindi; on mobile it stacks above (via CSS order:-1)
    const reg     = ex.register ? `<span class="reg">${esc(ex.register)}</span>` : '';
    const literal = ex.literal  ? `<p style="font-size:.75rem;color:#475569;font-style:italic;margin:.2rem 0 0 0;">${esc(ex.literal)}</p>` : '';
    const note    = ex.note     ? `<p style="font-size:.8rem;color:#64748b;margin:.35rem 0 0 0;padding-top:.35rem;border-top:1px solid rgba(148,163,184,.12);">${esc(ex.note)}</p>` : '';
    return `<div class="ex-card"><div class="ex-header"><p class="ex-hindi" lang="hi">${esc(ex.hindi)}</p>${reg}</div><p style="font-size:.8rem;color:#5eead4;font-style:italic;margin:0 0 .35rem 0;">${esc(ex.romanisation)}</p><p style="font-size:.88rem;color:#cbd5e1;margin:0;">${esc(ex.english)}</p>${literal}${note}</div>`;
  }).join('');

  return aSection('Examples', items, '#3b82f6');
}
