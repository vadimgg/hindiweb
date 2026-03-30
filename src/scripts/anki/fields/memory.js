// Responsible for: building the Anki Memory Hook HTML field
import { esc, langHex, capFirst, aSection } from './utils.js';

export function buildAnkiMemory(word) {
  const hook    = word.memory_hook || {};
  const primary = hook.primary || '';
  const byLang  = Object.entries(hook).filter(([k]) => k !== 'primary');
  if (!primary && byLang.length === 0) return '';

  let inner = '';
  if (primary) {
    inner += `<p style="font-size:.9rem;color:#e2e8f0;line-height:1.7;margin:0 0 .75rem 0;">${esc(primary)}</p>`;
  }
  byLang.forEach(([lang, text]) => {
    const col = langHex(capFirst(lang));
    inner += `<div style="margin-top:.6rem;padding-top:.6rem;border-top:1px solid rgba(148,163,184,.08);">`;
    inner += `<span class="lang-label" style="color:${col};">${esc(capFirst(lang))}</span>`;
    inner += `<p style="font-size:.86rem;color:#cbd5e1;line-height:1.65;margin:0;">${esc(text)}</p>`;
    inner += `</div>`;
  });

  return aSection('Memory Hook', inner, '#8b5cf6');
}
