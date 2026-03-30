// Responsible for: building the Anki Urdu & Punjabi HTML field
import { esc, aSection, aSectionLabel } from './utils.js';

export function buildAnkiUrduPunjabi(word) {
  const up = word.urdu_punjabi;
  if (!up?.urdu && !up?.punjabi) return '';
  let inner = '';
  if (up.urdu) {
    const sc = up.urdu.script ? `<span style="font-family:'Noto Nastaliq Urdu','Amiri','Noto Serif',serif;font-size:1.2rem;color:rgba(252,211,77,.9);direction:rtl;unicode-bidi:embed;">${esc(up.urdu.script)}</span>` : '';
    const rm = up.urdu.romanisation ? `<span style="color:#5eead4;font-size:.8rem;">(${esc(up.urdu.romanisation)})</span>` : '';
    const nt = up.urdu.note ? `<p style="font-size:.83rem;color:#cbd5e1;line-height:1.5;margin:.25rem 0 0 0;">${esc(up.urdu.note)}</p>` : '';
    inner += `<div style="margin-bottom:.65rem;"><div style="display:flex;gap:.45rem;align-items:baseline;flex-wrap:wrap;margin-bottom:.15rem;"><span style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#fb923c;opacity:.82;">Urdu</span>${sc}${rm}</div>${nt}</div>`;
  }
  if (up.punjabi) {
    const sc = up.punjabi.script ? `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.2rem;color:rgba(253,224,71,.9);">${esc(up.punjabi.script)}</span>` : '';
    const rm = up.punjabi.romanisation ? `<span style="color:#5eead4;font-size:.8rem;">(${esc(up.punjabi.romanisation)})</span>` : '';
    const nt = up.punjabi.note ? `<p style="font-size:.83rem;color:#cbd5e1;line-height:1.5;margin:.25rem 0 0 0;">${esc(up.punjabi.note)}</p>` : '';
    inner += `<div style="margin-bottom:.65rem;"><div style="display:flex;gap:.45rem;align-items:baseline;flex-wrap:wrap;margin-bottom:.15rem;"><span style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#fde047;opacity:.82;">Punjabi</span>${sc}${rm}</div>${nt}</div>`;
  }
  return aSection(aSectionLabel('Urdu & Punjabi') + inner, '#f97316');
}
