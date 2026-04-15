/**
 * Anki Sound Alikes field builder.
 *
 * Responsible for: rendering sound-alike mnemonic entries showing which Hindi
 * syllable sounds like a foreign word, with an optional explanatory note.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Sound Alikes HTML field
import { esc, langHex, aSection } from './utils.js';

/**
 * Renders a single sound-alike entry as a clang-item card.
 *
 * @param {object} s - Sound-alike object with { part, association, roman?, language?, note? }.
 * @returns {string} HTML div string for the item.
 */
function renderSoundAlike(s) {
  const col = s.language ? langHex(s.language) : '#94a3b8';

  const partSpan  = `<span style="font-family:'DM Mono',monospace;font-size:1rem;color:rgba(94,234,212,.8);">${esc(s.part || '')}</span>`;
  const viaSpan   = `<span style="font-size:.85rem;color:#64748b;">sounds like</span>`;
  const assocSpan = `<span style="font-size:.9375rem;color:#e2e8f0;font-style:italic;">${esc(s.association)}</span>`;
  const langSpan  = s.language
    ? `<span style="font-size:.58rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:${col};">(${esc(s.language)})</span>`
    : '';
  const noteP = s.note
    ? `<p class="item-note">${esc(s.note)}</p>`
    : '';

  return `<div class="clang-item">` +
    `<div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:.35rem;margin-bottom:.3rem;">` +
    partSpan + viaSpan + assocSpan + langSpan +
    `</div>` +
    noteP +
    `</div>`;
}

/**
 * Builds the Anki SoundAlikes field HTML for a word.
 *
 * @param {object}   word               - Vocabulary word object.
 * @param {object[]} [word.sound_alikes] - Array of { part, association, roman?, language?, note? }.
 * @returns {string} HTML section, or empty string if no sound-alikes.
 */
export function buildAnkiSoundAlikes(word) {
  const sa = word.sound_alikes || [];
  if (!sa.length) return '';
  const items = sa.map(renderSoundAlike).join('');
  return aSection('Sound Alikes', items, '#e11d48');
}
