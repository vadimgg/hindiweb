/**
 * Anki Etymology field builder.
 *
 * Responsible for: building the Anki Etymology HTML section field from
 * the etymology_journey array and optional origin_note string.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Etymology HTML field
import { esc, aSection } from './utils.js';

/**
 * Renders a single etymology stage as a flex row for the vertical chain.
 *
 * @param {object}  stage   - Stage object with { stage, form, roman, meaning }.
 * @param {boolean} isLast  - Whether this is the final (current Hindi) stage.
 * @returns {string} HTML string for one stage row.
 */
function renderStage(stage, isLast) {
  const wordColor = isLast ? '#fbbf24' : '#e2e8f0';
  const separator = stage.meaning
    ? `<span style="color:#64748b;font-size:.8125rem;font-style:italic;">— ${esc(stage.meaning)}</span>`
    : '';
  return (
    `<div class="etym-stage">` +
    `<span class="etym-lang">${esc(stage.stage)}</span>` +
    `<span class="etym-word" lang="hi" style="color:${wordColor};">${esc(stage.form)}</span>` +
    `<span class="etym-rom">${esc(stage.roman)}</span>` +
    separator +
    `</div>`
  );
}

/**
 * Builds the Anki Etymology field HTML for a word.
 *
 * Renders a vertical chain of etymology stages and an optional origin note.
 *
 * @param {object}   word                    - Vocabulary word object.
 * @param {object[]} [word.etymology_journey] - Array of { stage, form, roman, meaning } objects.
 * @param {string}   [word.origin_note]       - Optional prose note about the word's origin.
 * @returns {string} HTML section, or empty string if no etymology data.
 */
export function buildAnkiEtymology(word) {
  const journey = word.etymology_journey || [];
  if (!journey.length) return '';

  const stages = journey
    .map((stage, i) => renderStage(stage, i === journey.length - 1))
    .join('');
  const chain = `<div>${stages}</div>`;
  const note = word.origin_note
    ? `<p style="font-size:.82rem;color:#64748b;font-style:italic;line-height:1.65;margin-top:.85rem;padding-top:.75rem;border-top:1px solid rgba(30,41,59,.8);">${esc(word.origin_note)}</p>`
    : '';
  return aSection('Etymology', chain + note, '#334155');
}
