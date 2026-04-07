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
 * Renders a single etymology stage as a vertical column for the chain.
 *
 * @param {object}  stage - Stage object with { stage, form, roman, meaning }.
 * @param {number}  i     - Index in the journey array.
 * @returns {string} HTML string for the stage column (with optional leading arrow).
 */
function renderStage(stage, i) {
  const arrow = i > 0
    ? `<span style="color:#1e293b;font-size:.9rem;align-self:center;margin:0 .4rem;">→</span>`
    : '';
  return arrow +
    `<div style="display:flex;flex-direction:column;gap:.1rem;min-width:5rem;">` +
    `<span style="font-size:.55rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#475569;">${esc(stage.stage)}</span>` +
    `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.05rem;color:#fbbf24;">${esc(stage.form)}</span>` +
    `<span style="font-size:.72rem;color:#5eead4;opacity:.65;font-family:monospace;letter-spacing:.04em;">${esc(stage.roman)}</span>` +
    `<span style="font-size:.75rem;color:#64748b;font-style:italic;">${esc(stage.meaning)}</span>` +
    `</div>`;
}

/**
 * Builds the Anki Etymology field HTML for a word.
 *
 * Renders a horizontal chain of etymology stages and an optional origin note.
 *
 * @param {object}   word                    - Vocabulary word object.
 * @param {object[]} [word.etymology_journey] - Array of { stage, form, roman, meaning } objects.
 * @param {string}   [word.origin_note]       - Optional prose note about the word's origin.
 * @returns {string} HTML section, or empty string if no etymology data.
 */
export function buildAnkiEtymology(word) {
  const journey = word.etymology_journey || [];
  if (!journey.length) return '';

  const stages = journey.map(renderStage).join('');
  const chain  = `<div style="display:flex;flex-wrap:wrap;align-items:flex-start;">${stages}</div>`;
  const note   = word.origin_note
    ? `<p style="font-size:.82rem;color:#64748b;font-style:italic;line-height:1.65;margin-top:.85rem;padding-top:.75rem;border-top:1px solid rgba(30,41,59,.8);">${esc(word.origin_note)}</p>`
    : '';
  return aSection('Etymology', chain + note, '#2563eb');
}
