// Responsible for: fuzzy search scoring and filtering word/sentence card visibility

import { getWordSearchIndex, getSentenceIndex } from '../data.js';
import { hasWord, hasSentence } from '../state/selection.js';
import { getActiveTab } from '../state/tabs.js';

function norm(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function fuzzyScore(needle, haystack) {
  needle = norm(needle); haystack = norm(haystack);
  if (!needle) return 0;
  if (haystack.includes(needle)) return 1000;
  let score = 0, hi = 0, streak = 0;
  for (let ni = 0; ni < needle.length; ni++) {
    let found = false;
    while (hi < haystack.length) {
      if (haystack[hi] === needle[ni]) { score += 1 + streak * 2; streak++; hi++; found = true; break; }
      streak = 0; hi++;
    }
    if (!found) return -1;
  }
  return score;
}

function bestScore(needle, entry) {
  return Math.max(fuzzyScore(needle, entry.e), fuzzyScore(needle, entry.r), fuzzyScore(needle, entry.h));
}

let wordCards  = [];
let sentCards  = [];
let wordRowMap = {};
let sentRowMap = {};

export function getWordRowMap() { return wordRowMap; }

export function initSearch() {
  wordCards = [...document.querySelectorAll('[data-word-card]')];
  sentCards = [...document.querySelectorAll('[data-sentence-card]')];
  document.querySelectorAll('#idx-words .idx-row[data-index]').forEach(el => {
    wordRowMap[parseInt(el.dataset.index)] = el;
  });
  document.querySelectorAll('#idx-sentences .idx-row[data-sentence-index]').forEach(el => {
    sentRowMap[parseInt(el.dataset.sentenceIndex)] = el;
  });

  document.querySelectorAll('[data-search-input]').forEach(input => {
    input.addEventListener('input', () => {
      document.querySelectorAll('[data-search-input]').forEach(o => { if (o !== input) o.value = input.value; });
      applyFilter();
    });
  });
  document.querySelectorAll('[data-search-clear]').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-search-input]').forEach(inp => inp.value = '');
      applyFilter();
      document.querySelectorAll('[data-search-input]')[i]?.focus();
    });
  });

  window.addEventListener('selectionchange', applyFilter);
  applyFilter();
}

export function applyFilter() {
  const q = (document.querySelector('[data-search-input]')?.value ?? '').trim();
  document.querySelectorAll('[data-search-clear]').forEach(btn => btn.classList.toggle('hidden', q.length === 0));

  const mode = getActiveTab();
  if (mode === 'export') return;

  if (mode === 'words') {
    let matches = 0, visible = 0;
    getWordSearchIndex().forEach(word => {
      const searchOk = !q || bestScore(q, word) >= 0;
      wordCards[word.i]?.classList.toggle('hidden', !(searchOk && hasWord(word.i)));
      wordRowMap[word.i]?.classList.toggle('hidden', !searchOk);
      if (searchOk) matches++;
      if (searchOk && hasWord(word.i)) visible++;
    });
    document.querySelectorAll('#idx-words .date-group').forEach(g => {
      g.classList.toggle('hidden', [...g.querySelectorAll('.idx-row')].every(r => r.classList.contains('hidden')));
    });
    const sc = document.getElementById('search-count');
    if (sc) sc.textContent = q ? `${matches} of ${getWordSearchIndex().length} words` : `${getWordSearchIndex().length} words`;
    document.getElementById('words-index-empty')?.classList.toggle('hidden', matches > 0);
    document.getElementById('words-no-results')?.classList.toggle('hidden', visible > 0);
  } else {
    let matches = 0, visible = 0;
    getSentenceIndex().forEach(s => {
      const searchOk = !q || bestScore(q, s) >= 0;
      sentCards[s.i]?.classList.toggle('hidden', !(searchOk && hasSentence(s.i)));
      sentRowMap[s.i]?.classList.toggle('hidden', !searchOk);
      if (searchOk) matches++;
      if (searchOk && hasSentence(s.i)) visible++;
    });
    document.querySelectorAll('#idx-sentences .sentence-group').forEach(g => {
      g.classList.toggle('hidden', [...g.querySelectorAll('.idx-row')].every(r => r.classList.contains('hidden')));
    });
    const sc = document.getElementById('search-count');
    if (sc) sc.textContent = q ? `${matches} of ${getSentenceIndex().length} sentences` : `${getSentenceIndex().length} sentences`;
    document.getElementById('sentences-index-empty')?.classList.toggle('hidden', matches > 0);
    document.getElementById('sentences-no-results')?.classList.toggle('hidden', visible > 0);
  }
}
