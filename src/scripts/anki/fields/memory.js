/**
 * Anki Memory Hook field builder.
 *
 * Responsible for: rendering the primary memory hook, the optional connection note,
 * and any language-specific memory variants keyed by language name.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Memory Hook HTML field
import { esc, langHex, capFirst, aSection } from './utils.js';

/**
 * Builds the Anki Memory field HTML for a word.
 *
 * @param {object} word              - Vocabulary word object.
 * @param {object} [word.memory_hook] - Map of memory entries; 'primary' and
 *                                      'connection' are special keys; all others
 *                                      are treated as language-specific variants.
 * @returns {string} HTML section, or empty string if no memory data.
 */
export function buildAnkiMemory(word) {
  const hook       = word.memory_hook || {};
  const primary    = hook.primary || '';
  const connection = hook.connection || '';
  const byLang     = Object.entries(hook).filter(([k]) => k !== 'primary' && k !== 'connection');
  if (!primary && !connection && byLang.length === 0) return '';

  let inner = '';
  if (primary) {
    inner += `<p style="font-size:.9rem;color:#e2e8f0;line-height:1.7;margin:0 0 .5rem 0;">${esc(primary)}</p>`;
  }
  if (connection) {
    inner += `<p style="font-size:.82rem;color:#64748b;font-style:italic;line-height:1.65;margin:0 0 .75rem 0;">${esc(connection)}</p>`;
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
