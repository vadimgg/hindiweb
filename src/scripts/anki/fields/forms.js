/**
 * Anki Forms field builder.
 *
 * Responsible for: rendering inflected forms (gender/number chips) and secondary
 * English meanings. Returns empty string when the word has neither.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Forms HTML field (chips + secondary meanings)
import { esc, ankiChipStyle } from './utils.js';

/**
 * Builds the Anki Forms field HTML for a word.
 *
 * Renders form chips (label + Devanagari + romanisation) followed by any
 * secondary English meanings beyond the first comma-separated value.
 *
 * @param {object}   word          - Vocabulary word object.
 * @param {object[]} [word.forms]  - Array of { label, hindi, roman } form objects.
 * @param {string}   [word.english] - Comma-separated English meanings.
 * @returns {string} HTML string, or empty string if no forms and no secondary meanings.
 */
export function buildAnkiForms(word) {
  const forms            = word.forms || [];
  const secondaryMeanings = (word.english || '').split(',').slice(1).map(s => s.trim()).join(', ');
  if (forms.length === 0 && !secondaryMeanings) return '';

  let html = '';
  if (forms.length > 0) {
    const chips = forms.map(form => {
      const chipStyle = ankiChipStyle(form.label);
      return `<span style="display:inline-flex;align-items:baseline;gap:.4rem;padding:.25rem .7rem;border-radius:9999px;font-size:.75rem;font-weight:500;${chipStyle}">` +
        `<span style="font-family:'Oswald',sans-serif;font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;">${esc(form.label)}</span>` +
        `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.1em;color:#fbbf24;">${esc(form.hindi)}</span>` +
        `<span style="color:#6b7280">·</span>` +
        `<span style="color:#5eead4;">${esc(form.roman)}</span>` +
        `</span>`;
    }).join('');
    html += `<div style="display:flex;flex-wrap:wrap;gap:.5rem;">${chips}</div>`;
  }
  if (secondaryMeanings) {
    const topMargin = forms.length > 0 ? '.5rem' : '0';
    html += `<p style="color:#94a3b8;font-size:.82rem;margin:${topMargin} 0 0 0;">${esc(secondaryMeanings)}</p>`;
  }
  return html;
}
