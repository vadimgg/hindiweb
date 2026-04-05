/**
 * Anki Sound Alikes field builder.
 *
 * Responsible for: rendering confusable words from other languages with their
 * language label, native script, romanisation, meaning, and note.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Sound Alikes HTML field
import { esc, langHex, aSection } from './utils.js';

/**
 * Builds the Anki SoundAlikes field HTML for a word.
 *
 * @param {object}   word              - Vocabulary word object.
 * @param {object[]} [word.sound_alikes] - Array of sound-alike entries.
 * @returns {string} HTML section, or empty string if no sound-alikes.
 */
export function buildAnkiSoundAlikes(word) {
  const sa = word.sound_alikes || [];
  if (!sa.length) return '';

  const items = sa.map(s => {
    const col  = s.language ? langHex(s.language) : '#94a3b8';
    const lang = s.language
      ? `<span class="lang-label" style="color:${col};">${esc(s.language)}</span>`
      : '';
    const wrd  = s.word
      ? `<span class="word-text" lang="hi">${esc(s.word)}</span>`
      : '';
    const rom  = s.romanisation
      ? `<span class="word-rom">(${esc(s.romanisation)})</span>`
      : '';
    const wordRow = (wrd || rom)
      ? `<div class="word-row">${wrd}${rom}</div>`
      : '';
    const mean = s.meaning
      ? `<span class="word-mean">— ${esc(s.meaning)}</span>`
      : '';
    const note = s.note
      ? `<p class="item-note">${esc(s.note)}</p>`
      : '';
    return `<div class="clang-item">${lang}${wordRow}${mean}${note}</div>`;
  }).join('');

  return aSection('Sound Alikes', items, '#e11d48');
}
