/**
 * Anki Cross-Language field builder.
 *
 * Responsible for: rendering true cognates (true_relatives) and useful
 * coincidences (useful_coincidences) as badged item cards with language
 * accent colours, word forms, meaning boxes, and notes.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Cross-Language HTML field
import { esc, langHex, aSection } from './utils.js';

/**
 * Renders a single cross-language item (relative or coincidence) as an HTML card.
 *
 * @param {object} item           - Cross-language item: { language?, word?, romanisation?, meaning?, note? }
 * @param {'relative'|'coincidence'} type - Determines badge style and label.
 * @returns {string} HTML string for the clang-item card.
 */
function renderItem(item, type) {
  const isRel      = type === 'relative';
  const badgeStyle = isRel
    ? 'background:#0c2340;color:#38bdf8;border:1px solid rgba(56,189,248,.4)'
    : 'background:#1e293b;color:#94a3b8;border:1px solid rgba(148,163,184,.3)';
  const badge = `<span class="meta-badge" style="${badgeStyle}">${isRel ? 'Relative' : 'Coincidence'}</span>`;

  const col  = item.language ? langHex(item.language) : '#94a3b8';
  const lang = item.language ? `<span class="lang-label" style="color:${col};">${esc(item.language)}</span>` : '';
  const wrd  = item.word ? `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.15rem;color:${col};">${esc(item.word)}</span>` : '';
  const rom  = item.romanisation ? `<span class="word-rom">(${esc(item.romanisation)})</span>` : '';
  const wordRow = (wrd || rom) ? `<div class="word-row">${wrd}${rom}</div>` : '';
  const mean = item.meaning ? `<div class="mean-box"><span>${esc(item.meaning)}</span></div>` : '';
  const note = item.note ? `<p class="item-note">${esc(item.note)}</p>` : '';

  return `<div class="clang-item">${badge}${lang}${wordRow}${mean}${note}</div>`;
}

/**
 * Builds the Anki CrossLanguage field HTML for a word.
 *
 * @param {object} word                               - Vocabulary word object.
 * @param {object} [word.cross_language_connections]  - { true_relatives?, useful_coincidences? }
 * @returns {string} HTML section, or empty string if no cross-language data.
 */
export function buildAnkiCrossLang(word) {
  const clc = word.cross_language_connections;
  if (!clc) return '';
  const tr = clc.true_relatives || [], uc = clc.useful_coincidences || [];
  if (!tr.length && !uc.length) return '';
  const items = [
    ...tr.map(i => renderItem(i, 'relative')),
    ...uc.map(i => renderItem(i, 'coincidence')),
  ].join('');
  return aSection('Cross-Language', items, '#0ea5e9');
}
