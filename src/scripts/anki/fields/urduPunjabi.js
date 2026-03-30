// Responsible for: building the Anki Urdu & Punjabi HTML field
import { esc, aSection } from './utils.js';

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
