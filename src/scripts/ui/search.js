/**
 * Fuzzy search engine and card/row visibility filter.
 *
 * Responsible for: the search algorithm (diacritic-insensitive fuzzy match),
 * DOM caches for word/sentence cards and sidebar rows, and the filter function
 * that hides or shows cards and rows based on query + selection state.
 *
 * Does NOT own selection state (state/selection.js) or active tab
 * (state/tabs.js) — it reads those via their public APIs.
 *
 * Dependencies: data.js, state/selection.js, state/tabs.js, utils/stringUtils.js.
 */
// Responsible for: fuzzy search scoring and filtering word/sentence card visibility

import { getWordSearchIndex, getSentenceIndex } from '../data.js';
import { hasWord, hasSentence }                 from '../state/selection.js';
import { getActiveTab }                         from '../state/tabs.js';
import { norm }                                 from '../utils/stringUtils.js';

/**
 * Scores how well a search needle fuzzy-matches a single haystack string.
 *
 * Returns 1000 for an exact substring hit. For a fuzzy match, characters in
 * the needle must appear in order inside the haystack; consecutive matches
 * earn a streak bonus (×2 per step). Returns -1 if the needle cannot be
 * matched at all.
 *
 * Both inputs are normalised via {@link norm} before comparison so the search
 * is diacritic-insensitive and case-insensitive.
 *
 * @param {string} needle   - The search query string.
 * @param {string} haystack - The candidate string to test against.
 * @returns {number} Score ≥ 0 for a match, -1 for no match.
 */
function fuzzyScore(needle, haystack) {
  needle   = norm(needle);
  haystack = norm(haystack);
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

/**
 * Returns the best fuzzy score for a needle against all searchable fields
 * of a search-index entry (English, romanisation, Hindi).
 *
 * @param {string} needle - The search query string.
 * @param {{ e: string, r: string, h: string }} entry - A word or sentence search index entry.
 * @returns {number} The highest score across all three fields.
 */
function bestScore(needle, entry) {
  return Math.max(fuzzyScore(needle, entry.e), fuzzyScore(needle, entry.r), fuzzyScore(needle, entry.h));
}

/** @type {Element[]} Ordered list of word card wrapper elements. */
let wordCards = [];
/** @type {Element[]} Ordered list of sentence card wrapper elements. */
let sentCards = [];
/** @type {Record<number, Element>} Map from word index → sidebar row element. */
let wordRowMap = {};
/** @type {Record<number, Element>} Map from sentence index → sidebar row element. */
let sentRowMap = {};

/**
 * Returns the word-index → sidebar-row DOM map built during {@link initSearch}.
 * Exposed so that cards.js can highlight the active row without re-querying the DOM.
 *
 * @returns {Record<number, Element>}
 */
export function getWordRowMap() { return wordRowMap; }

/**
 * Initialises search by caching DOM elements and wiring input/clear event listeners.
 *
 * Must be called after DOMContentLoaded. Syncs all search inputs to each other
 * so that the mobile header input and the desktop sidebar input stay in step.
 * Also listens for 'selectionchange' to re-filter when selection changes.
 *
 * @returns {void}
 */
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
      // Keep all search inputs in sync across mobile header and desktop sidebar
      document.querySelectorAll('[data-search-input]').forEach(other => {
        if (other !== input) other.value = input.value;
      });
      applyFilter();
    });
  });

  document.querySelectorAll('[data-search-clear]').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-search-input]').forEach(inp => (inp.value = ''));
      applyFilter();
      document.querySelectorAll('[data-search-input]')[i]?.focus();
    });
  });

  window.addEventListener('selectionchange', applyFilter);
  applyFilter();
}

/**
 * Applies the search filter to the words tab: shows/hides cards and sidebar rows,
 * collapses empty groups, and updates the count label and empty-state messages.
 *
 * @param {string} query - Normalised search query (may be empty).
 * @returns {void}
 */
function filterWords(query) {
  let matchCount = 0, visibleCount = 0;
  getWordSearchIndex().forEach(word => {
    const passesSearch = !query || bestScore(query, word) >= 0;
    wordCards[word.i]?.classList.toggle('hidden', !(passesSearch && hasWord(word.i)));
    wordRowMap[word.i]?.classList.toggle('hidden', !passesSearch);
    if (passesSearch) matchCount++;
    if (passesSearch && hasWord(word.i)) visibleCount++;
  });
  document.querySelectorAll('#idx-words .date-group').forEach(group => {
    group.classList.toggle('hidden', [...group.querySelectorAll('.idx-row')].every(r => r.classList.contains('hidden')));
  });
  const total = getWordSearchIndex().length;
  const countEl = document.getElementById('search-count');
  if (countEl) countEl.textContent = query ? `${matchCount} of ${total} words` : `${total} words`;
  document.getElementById('words-index-empty')?.classList.toggle('hidden', matchCount > 0);
  document.getElementById('words-no-results')?.classList.toggle('hidden', visibleCount > 0);
}

/**
 * Applies the search filter to the sentences tab: shows/hides cards and sidebar rows,
 * collapses empty groups, and updates the count label and empty-state messages.
 *
 * @param {string} query - Normalised search query (may be empty).
 * @returns {void}
 */
function filterSentences(query) {
  let matchCount = 0, visibleCount = 0;
  getSentenceIndex().forEach(sentence => {
    const passesSearch = !query || bestScore(query, sentence) >= 0;
    sentCards[sentence.i]?.classList.toggle('hidden', !(passesSearch && hasSentence(sentence.i)));
    sentRowMap[sentence.i]?.classList.toggle('hidden', !passesSearch);
    if (passesSearch) matchCount++;
    if (passesSearch && hasSentence(sentence.i)) visibleCount++;
  });
  document.querySelectorAll('#idx-sentences .sentence-group').forEach(group => {
    group.classList.toggle('hidden', [...group.querySelectorAll('.idx-row')].every(r => r.classList.contains('hidden')));
  });
  const total = getSentenceIndex().length;
  const countEl = document.getElementById('search-count');
  if (countEl) countEl.textContent = query ? `${matchCount} of ${total} sentences` : `${total} sentences`;
  document.getElementById('sentences-index-empty')?.classList.toggle('hidden', matchCount > 0);
  document.getElementById('sentences-no-results')?.classList.toggle('hidden', visibleCount > 0);
}

/**
 * Applies the current search query and selection state to show/hide cards and rows.
 *
 * A word card is visible when it passes the search filter AND is selected.
 * A sidebar row is visible when it passes the search filter (regardless of selection).
 * Does nothing when the Export tab is active.
 *
 * @returns {void}
 */
export function applyFilter() {
  const query = (document.querySelector('[data-search-input]')?.value ?? '').trim();
  document.querySelectorAll('[data-search-clear]').forEach(btn => btn.classList.toggle('hidden', query.length === 0));

  const activeTab = getActiveTab();
  if (activeTab === 'export') return;
  if (activeTab === 'words') filterWords(query);
  else filterSentences(query);
}
