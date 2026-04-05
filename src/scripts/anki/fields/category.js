/**
 * Anki Category field builder.
 *
 * Responsible for: rendering the word_category value as a styled badge chip.
 * Returns an empty string when the word has no category so the Anki template
 * can use conditional {{#Category}} to hide the section entirely.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Category HTML field
import { esc, ankiCategoryStyle } from './utils.js';

/**
 * Builds the Anki Category field HTML for a word.
 *
 * @param {object} word                  - Vocabulary word object.
 * @param {string} [word.word_category]  - e.g. 'adjective', 'noun'.
 * @returns {string} HTML badge chip, or empty string if no category.
 */
export function buildAnkiCategory(word) {
  if (!word.word_category) return '';
  const style = ankiCategoryStyle(word.word_category);
  return `<span style="display:inline-block;font-size:.7rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:.2rem .65rem;border-radius:6px;${style}">${esc(word.word_category)}</span>`;
}
