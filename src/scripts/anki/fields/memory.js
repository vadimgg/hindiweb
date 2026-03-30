// Responsible for: building the Anki Memory Hook HTML field
import { esc, langHex, capFirst, aSection, aSectionLabel } from './utils.js';

export function buildAnkiMemory(word) {
  const hook    = word.memory_hook || {};
  const primary = hook.primary || '';
  const byLang  = Object.entries(hook).filter(([k]) => k !== 'primary');
  if (!primary && byLang.length === 0) return '';
  let inner = '';
  if (primary) {
    inner += `<div style="background:#0f0a1e;border-left:2px solid rgba(139,92,246,.6);border-radius:0 6px 6px 0;padding:.65rem .9rem;margin-bottom:.4rem;"><p style="font-size:.88rem;color:#e2e8f0;line-height:1.6;margin:0;">${esc(primary)}</p></div>`;
  }
  byLang.forEach(([lang, text]) => {
    const col = langHex(capFirst(lang));
    inner += `<div style="background:#0c0a18;border-left:2px solid rgba(139,92,246,.3);border-radius:0 6px 6px 0;padding:.55rem .9rem;margin-bottom:.35rem;"><span style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:${col};opacity:.85;">${esc(capFirst(lang))}</span><p style="font-size:.83rem;color:#cbd5e1;line-height:1.5;margin:.2rem 0 0 0;">${esc(text)}</p></div>`;
  });
  return aSection(aSectionLabel('Memory Hook') + inner, '#8b5cf6');
}
