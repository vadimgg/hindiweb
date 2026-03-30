// Responsible for: building the Anki Category HTML field
import { esc, ankiCategoryStyle } from './utils.js';

export function buildAnkiCategory(word) {
  if (!word.word_category) return '';
  const s = ankiCategoryStyle(word.word_category);
  return `<span style="display:inline-block;font-size:.7rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:.2rem .65rem;border-radius:6px;${s}">${esc(word.word_category)}</span>`;
}
