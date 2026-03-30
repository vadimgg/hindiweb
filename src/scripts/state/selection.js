// Responsible for: word and sentence selection state and change notifications via CustomEvents

import { getWordSearchIndex, getSentenceIndex, getAllWords, getWordGroupTitles } from '../data.js';

let selectedWords     = new Set();
let selectedSentences = new Set();

export function initSelection() {
  selectedWords     = new Set(getWordSearchIndex().map(w => w.i));
  selectedSentences = new Set(getSentenceIndex().map(s => s.i));
  document.querySelectorAll('#idx-words .word-checkbox').forEach(cb => cb.classList.add('is-on'));
  document.querySelectorAll('#idx-words .idx-row').forEach(r => r.classList.add('is-sel'));
  document.querySelectorAll('#idx-words .group-checkbox').forEach(cb => cb.classList.add('is-on'));
}

function notify() {
  window.dispatchEvent(new CustomEvent('selectionchange'));
}

export function setWordSelected(idx, on) {
  if (on) selectedWords.add(idx); else selectedWords.delete(idx);
  document.querySelector(`#idx-words .word-checkbox[data-word-index="${idx}"]`)?.classList.toggle('is-on', on);
  document.querySelector(`#idx-words .idx-row[data-index="${idx}"]`)?.classList.toggle('is-sel', on);
  notify();
}

export function setSentenceSelected(idx, on) {
  if (on) selectedSentences.add(idx); else selectedSentences.delete(idx);
  document.querySelector(`#idx-sentences .sentence-checkbox[data-sentence-index="${idx}"]`)?.classList.toggle('is-on', on);
  notify();
}

export function hasWord(idx)     { return selectedWords.has(idx); }
export function hasSentence(idx) { return selectedSentences.has(idx); }
export function getSelectedWordIndices()     { return [...selectedWords]; }
export function getSelectedSentenceIndices() { return [...selectedSentences]; }

export function getSelectedWordObjects() {
  return [...selectedWords].map(i => getAllWords()[i]).filter(Boolean);
}

export function getDefaultDeckName() {
  if (selectedWords.size === 0) return 'Hindi::Vocabulary';
  const firstIdx = [...selectedWords][0];
  const title    = getWordGroupTitles()[firstIdx] ?? 'Vocabulary';
  return `Hindi::${title}`;
}

export function syncGroupCheckbox(groupDate) {
  const groupEl = document.querySelector(`#idx-words .date-group[data-group="${groupDate}"]`);
  if (!groupEl) return;
  const rows = [...groupEl.querySelectorAll('.idx-row[data-index]')];
  const cb   = groupEl.querySelector('.group-checkbox');
  if (!cb || rows.length === 0) return;
  cb.classList.toggle('is-on', rows.every(r => selectedWords.has(parseInt(r.dataset.index))));
}
