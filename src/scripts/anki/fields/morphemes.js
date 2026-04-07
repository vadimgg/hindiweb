/**
 * Anki Morphemes field builder.
 *
 * Responsible for: rendering word morpheme chips (part, roman, meaning, optional origin)
 * as styled HTML for the Anki card back. Returns empty string when the word has no
 * morphemes array.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Morphemes HTML field
import { aSection, esc } from './utils.js';

/**
 * Builds the Anki Morphemes field HTML for a word.
 *
 * Renders each morpheme as a chip showing: Devanagari part, romanisation,
 * meaning, and optional italic origin label. Section colour is violet-500
 * (#8b5cf6) to reflect word-structure semantics.
 *
 * @param {object}   word               - Vocabulary word object.
 * @param {object[]} [word.morphemes]   - Array of { part, roman, meaning, origin? }.
 * @param {string}   word.morphemes[].part    - Devanagari morpheme text.
 * @param {string}   word.morphemes[].roman   - Romanised form.
 * @param {string}   word.morphemes[].meaning - English meaning.
 * @param {string}   [word.morphemes[].origin] - Optional language of origin.
 * @returns {string} HTML string, or empty string if no morphemes.
 */
export function buildAnkiMorphemes(word) {
  const morphemes = word.morphemes || [];
  if (morphemes.length === 0) return '';

  const chips = morphemes.map(m => {
    const originHtml = m.origin
      ? `<span style="display:block;font-size:.72rem;color:#475569;font-style:italic;margin-top:.15rem;">${esc(m.origin)}</span>`
      : '';
    return (
      `<div style="background:#1e293b;border:1px solid rgba(51,65,85,.5);border-radius:10px;padding:.65rem .85rem;display:inline-flex;flex-direction:column;gap:.15rem;min-width:5.5rem;vertical-align:top;">` +
      `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.1rem;color:#fbbf24;line-height:1.3;">${esc(m.part)}</span>` +
      `<span style="font-family:'DM Mono',monospace;font-size:.82rem;color:rgba(94,234,212,.7);">${esc(m.roman)}</span>` +
      `<span style="font-size:.85rem;color:#94a3b8;">${esc(m.meaning)}</span>` +
      originHtml +
      `</div>`
    );
  }).join(' ');

  const body = `<div style="display:flex;flex-wrap:wrap;gap:.6rem;">${chips}</div>`;
  return aSection('Morphemes', body, '#8b5cf6');
}
