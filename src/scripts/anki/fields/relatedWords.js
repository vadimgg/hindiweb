/**
 * Anki Related Words field builder.
 *
 * Responsible for: building the Anki RelatedWords HTML section field.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki RelatedWords HTML field
import { esc, aSection } from './utils.js';

/**
 * Renders a single related word as a chip card.
 *
 * @param {object} rw - Related word object with { hindi, roman, english }.
 * @returns {string} HTML div string for the chip.
 */
function renderRelatedWord(rw) {
  return `<div style="display:inline-flex;flex-direction:column;gap:.15rem;background:#0f172a;border:1px solid rgba(51,65,85,.55);border-radius:10px;padding:.5rem .75rem;margin:.25rem;">` +
    `<div style="display:flex;align-items:baseline;gap:.4rem;">` +
    `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1rem;color:#fbbf24;">${esc(rw.hindi)}</span>` +
    `<span style="font-size:.75rem;color:#5eead4;opacity:.6;font-family:monospace;">${esc(rw.roman)}</span>` +
    `</div>` +
    `<span style="font-size:.82rem;color:#94a3b8;">${esc(rw.english)}</span>` +
    `</div>`;
}

/**
 * Builds the Anki RelatedWords field HTML for a word.
 *
 * Returns a styled section with vocabulary chips, or empty string if absent.
 *
 * @param {object}   word                - Vocabulary word object.
 * @param {object[]} [word.related_words] - Array of { hindi, roman, english } objects.
 * @returns {string} HTML section, or empty string if no related words.
 */
export function buildAnkiRelatedWords(word) {
  const relatedWords = word.related_words || [];
  if (!relatedWords.length) return '';
  const chips = relatedWords.map(renderRelatedWord).join('');
  return aSection('Related Words', `<div style="display:flex;flex-wrap:wrap;gap:.25rem;margin:-.25rem;">${chips}</div>`, '#0ea5e9');
}
