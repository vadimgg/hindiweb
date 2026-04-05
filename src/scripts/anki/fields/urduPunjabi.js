/**
 * Anki Urdu & Punjabi field builder.
 *
 * Responsible for: rendering Urdu and Punjabi equivalents of a Hindi word,
 * each with their script, romanisation, and an optional note.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Urdu & Punjabi HTML field
import { esc, aSection } from './utils.js';

/**
 * Renders a single Urdu or Punjabi entry as a clang-item card.
 *
 * @param {object} entry        - { script?, romanisation?, note? }
 * @param {string} labelText    - Language label to display (e.g. 'Urdu').
 * @param {string} labelColor   - Hex colour for the label.
 * @param {string} scriptStyle  - Inline CSS for the script span (handles RTL for Urdu).
 * @returns {string} HTML string for the item card.
 */
function renderLang(entry, labelText, labelColor, scriptStyle) {
  const lang = `<span class="lang-label" style="color:${labelColor};">${labelText}</span>`;
  const wrd  = entry.script
    ? `<span style="${scriptStyle}">${esc(entry.script)}</span>`
    : '';
  const rom  = entry.romanisation
    ? `<span class="word-rom">(${esc(entry.romanisation)})</span>`
    : '';
  const wordRow = (wrd || rom)
    ? `<div class="word-row">${wrd}${rom}</div>`
    : '';
  const note = entry.note
    ? `<p class="item-note">${esc(entry.note)}</p>`
    : '';
  return `<div class="clang-item">${lang}${wordRow}${note}</div>`;
}

/**
 * Builds the Anki UrduPunjabi field HTML for a word.
 *
 * @param {object} word                - Vocabulary word object.
 * @param {object} [word.urdu_punjabi] - { urdu?: UrduPunjabiEntry, punjabi?: UrduPunjabiEntry }
 * @returns {string} HTML section, or empty string if no urdu/punjabi data.
 */
export function buildAnkiUrduPunjabi(word) {
  const up = word.urdu_punjabi;
  if (!up?.urdu && !up?.punjabi) return '';
  let inner = '';
  if (up.urdu) {
    inner += renderLang(
      up.urdu, 'Urdu', '#fb923c',
      "font-family:'Noto Nastaliq Urdu','Amiri','Noto Serif',serif;font-size:1.2rem;color:rgba(252,211,77,.9);direction:rtl;unicode-bidi:embed;"
    );
  }
  if (up.punjabi) {
    inner += renderLang(
      up.punjabi, 'Punjabi', '#fde047',
      "font-family:'Tiro Devanagari Hindi',serif;font-size:1.2rem;color:rgba(253,224,71,.9);"
    );
  }
  return aSection('Urdu & Punjabi', inner, '#f97316');
}
