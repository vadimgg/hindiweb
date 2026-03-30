// Responsible for: building the Anki Forms HTML field (chips + secondary meanings)
import { esc, ankiChipStyle } from './utils.js';

export function buildAnkiForms(word) {
  const forms     = word.forms || [];
  const secondary = (word.english || '').split(',').slice(1).map(s => s.trim()).join(', ');
  if (forms.length === 0 && !secondary) return '';
  let html = '';
  if (forms.length > 0) {
    const chips = forms.map(f => {
      const s = ankiChipStyle(f.label);
      return `<span style="display:inline-flex;align-items:baseline;gap:.4rem;padding:.25rem .7rem;border-radius:9999px;font-size:.75rem;font-weight:500;${s}"><span style="font-family:'Oswald',sans-serif;font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;">${esc(f.label)}</span><span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.1em;color:#fbbf24;">${esc(f.hindi)}</span><span style="color:#6b7280">·</span><span style="color:#5eead4;">${esc(f.roman)}</span></span>`;
    }).join('');
    html += `<div style="display:flex;flex-wrap:wrap;gap:.5rem;">${chips}</div>`;
  }
  if (secondary) html += `<p style="color:#94a3b8;font-size:.82rem;margin:${forms.length > 0 ? '.5rem' : '0'} 0 0 0;">${esc(secondary)}</p>`;
  return html;
}
