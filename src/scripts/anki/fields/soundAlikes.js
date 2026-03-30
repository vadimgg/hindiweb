// Responsible for: building the Anki Sound Alikes HTML field
import { esc, langHex, aSection, aSectionLabel } from './utils.js';

export function buildAnkiSoundAlikes(word) {
  const sa = word.sound_alikes || [];
  if (!sa.length) return '';
  const items = sa.map(s => {
    const col  = s.language ? langHex(s.language) : '#94a3b8';
    const lang = s.language ? `<span style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:${col};opacity:.85;">${esc(s.language)}</span>` : '';
    const wrd  = s.word         ? `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1rem;color:#fbbf24;">${esc(s.word)}</span>` : '';
    const rom  = s.romanisation ? `<span style="color:#5eead4;font-size:.8rem;">(${esc(s.romanisation)})</span>` : '';
    const mean = s.meaning      ? `<span style="color:#94a3b8;font-size:.8rem;">— ${esc(s.meaning)}</span>` : '';
    const note = s.note         ? `<p style="font-size:.83rem;color:#cbd5e1;line-height:1.5;margin:.25rem 0 0 0;">${esc(s.note)}</p>` : '';
    return `<div style="margin-bottom:.65rem;"><div style="display:flex;gap:.45rem;align-items:baseline;flex-wrap:wrap;margin-bottom:.15rem;">${lang}${wrd}${rom}${mean}</div>${note}</div>`;
  }).join('');
  return aSection(aSectionLabel('Sound Alikes') + items, '#e11d48');
}
