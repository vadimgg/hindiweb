/**
 * Anki Pronunciation field builder.
 *
 * Responsible for: rendering the syllable string, per-syllable breakdown rows,
 * stress note, extra language-specific notes, and pronunciation tips.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Pronunciation HTML field
import { esc, langHex, aSection } from './utils.js';

/**
 * Renders a single pronunciation tip row (optional language label + sounds-like + tip text).
 *
 * @param {object} tip - Tip object: { language?, sounds_like?, tip }.
 * @returns {string} HTML div string for the tip row.
 */
function renderTip(tip) {
  const col       = langHex(tip.language || '');
  const lang      = tip.language ? `<span class="lang-label" style="color:${col};margin-bottom:.2rem;">${esc(tip.language)}</span>` : '';
  const soundsLike = tip.sounds_like ? `<span style="color:#f1f5f9;font-weight:600;margin-right:.35rem;">"${esc(tip.sounds_like)}"</span>` : '';
  return `<div style="margin-top:.55rem;">${lang}<p class="syl-desc">${soundsLike}${esc(tip.tip)}</p></div>`;
}

/**
 * Builds the Anki Pronunciation field HTML for a word.
 *
 * @param {object} word                        - Vocabulary word object.
 * @param {object} [word.pronunciation_guide]  - Pronunciation guide sub-object.
 * @returns {string} HTML section, or empty string if no pronunciation data.
 */
export function buildAnkiPronunciation(word) {
  const pg = word.pronunciation_guide;
  if (!pg) return '';
  if (!pg.syllables && !(pg.breakdown || []).length && !(pg.extra_notes || []).length && !(pg.tips || []).length) return '';

  let inner = '';
  if (pg.syllables) {
    inner += `<p style="font-family:'Oswald',sans-serif;color:#5eead4;font-size:1.1rem;font-weight:600;letter-spacing:.18em;margin:0 0 .75rem 0;">${esc(pg.syllables)}</p>`;
  }
  (pg.breakdown || []).forEach(item => {
    inner += `<div class="pron-row"><span class="syl-label">${esc(item.syllable)}</span><p class="syl-desc">${esc(item.sound || item.note || '')}</p></div>`;
  });
  if (pg.stress) {
    inner += `<p style="font-size:.82rem;color:rgba(251,191,36,.8);font-style:italic;border-top:1px solid rgba(148,163,184,.1);padding-top:.55rem;margin:.5rem 0 0 0;">${esc(pg.stress)}</p>`;
  }
  (pg.extra_notes || []).forEach(item => {
    const col  = langHex(item.language);
    const lang = item.language ? `<span class="lang-label" style="color:${col};margin-bottom:.2rem;">${esc(item.language)}</span>` : '';
    inner += `<div style="margin-top:.55rem;">${lang}<p class="syl-desc">${esc(item.note)}</p></div>`;
  });
  (pg.tips || []).forEach(tip => { inner += renderTip(tip); });

  return aSection('Pronunciation', inner, '#14b8a6');
}
