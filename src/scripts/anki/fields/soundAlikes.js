/**
 * Anki Sound Alikes field builder.
 *
 * Responsible for: rendering sound-alike mnemonic entries showing which Hindi
 * fragment sounds like a foreign word, with an optional explanatory note.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Sound Alikes HTML field
import { esc, langHex, aSection } from './utils.js';
import { extractDevanagari, extractPartLabel } from '../../utils/stringUtils.js';

/**
 * Renders a single sound-alike entry as a clang-item card.
 *
 * @param {object} s - Sound-alike object with { part, association, roman?, language?, note? }.
 * @returns {string} HTML div string for the item.
 */
function renderSoundAlike(s) {
  const deva      = extractDevanagari(s.part || '');
  const partLabel = extractPartLabel(s.part || '');
  const col       = s.language ? langHex(s.language) : '#94a3b8';

  const devaSpan  = deva
    ? `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.05rem;color:#fbbf24;">${esc(deva)}</span>`
    : `<span style="color:#94a3b8;font-size:.85rem;">${esc(s.part || '')}</span>`;
  const labelSpan = partLabel
    ? `<span style="font-size:.6rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#475569;">${esc(partLabel)}</span>`
    : '';
  const arrow     = `<span style="color:#334155;margin:0 .25rem;font-size:.85rem;">→</span>`;
  const langSpan  = s.language
    ? `<span style="font-size:.58rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:${col};">${esc(s.language)}</span>`
    : '';
  const assocSpan = `<span style="font-size:.9rem;font-weight:600;color:#f1f5f9;">"${esc(s.association)}"</span>`;
  const romanSpan = (s.roman && s.roman !== s.association)
    ? `<span style="font-size:.8rem;color:#5eead4;">(${esc(s.roman)})</span>`
    : '';
  const noteP = s.note
    ? `<p class="item-note">${esc(s.note)}</p>`
    : '';

  return `<div class="clang-item">` +
    `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:.35rem;margin-bottom:.3rem;">` +
    devaSpan + labelSpan + arrow + langSpan + assocSpan + romanSpan +
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
