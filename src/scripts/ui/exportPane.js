/**
 * Export pane controller — word table, AnkiConnect status polling, export actions.
 *
 * Responsible for: keeping the export panel's UI in sync with the current word
 * selection, polling AnkiConnect every 3 seconds while the Export tab is open,
 * handling the "Export to Anki" and "Replace Deck" button actions, and
 * triggering the .txt fallback download.
 *
 * Does NOT perform the actual Anki API calls (anki/export.js) or selection
 * state management (state/selection.js) — it coordinates them.
 *
 * Dependencies: anki/connect.js, anki/export.js, anki/txtFallback.js,
 *               state/selection.js.
 */
// Responsible for: export pane controller — word table, AnkiConnect status polling, export button

import { checkAnkiConnect }                              from '../anki/connect.js';
import { sendToAnki, overrideDeck }                      from '../anki/export.js';
import { downloadAnkiTxt }                               from '../anki/txtFallback.js';
import { getSelectedWordObjects, getDefaultDeckName }    from '../state/selection.js';

/** @type {number|null} setInterval handle; non-null while polling is active. */
let pollInterval = null;

/** Returns 's' when n !== 1 — used for pluralising feedback messages. */
const plural = n => (n !== 1 ? 's' : '');

/**
 * Updates the AnkiConnect status badge and export button state.
 *
 * When online and the override toggle is checked, the button label switches
 * to "Replace Deck" to make the destructive action explicit.
 *
 * @param {boolean} online - Whether AnkiConnect is reachable.
 * @returns {void}
 */
function updateStatusBadge(online) {
  const badge          = document.getElementById('export-anki-status');
  const exportBtn      = document.getElementById('export-btn');
  const overrideToggle = document.getElementById('export-override-toggle');
  if (!badge) return;
  badge.textContent = online ? '● Online' : '● Offline';
  badge.className   = online
    ? 'text-sm font-semibold text-emerald-400'
    : 'text-sm font-semibold text-zinc-500';
  if (exportBtn) {
    exportBtn.disabled    = !online;
    exportBtn.textContent = online && overrideToggle?.checked ? 'Replace Deck' : 'Export to Anki';
  }
}

/**
 * Checks AnkiConnect status and updates the badge with the result.
 *
 * @returns {Promise<void>}
 */
async function pollAnkiStatus() {
  updateStatusBadge(await checkAnkiConnect());
}

/**
 * Starts polling AnkiConnect every 3 seconds. No-op if already polling.
 *
 * @returns {void}
 */
function startPolling() {
  if (pollInterval) return;
  pollAnkiStatus();
  pollInterval = setInterval(pollAnkiStatus, 3000);
}

/**
 * Stops the AnkiConnect poll interval.
 *
 * @returns {void}
 */
function stopPolling() {
  clearInterval(pollInterval);
  pollInterval = null;
}

/**
 * Rebuilds the selected-word table in the export panel.
 *
 * Shows one row per selected word with Hindi, romanisation, primary English
 * meaning, category, and origin. Updates the word-count badge.
 *
 * @returns {void}
 */
function populateWordTable() {
  const words  = getSelectedWordObjects();
  const tbody  = document.getElementById('export-word-tbody');
  const countEl = document.getElementById('export-word-count');
  if (!tbody) return;
  if (countEl) countEl.textContent = String(words.length);
  tbody.innerHTML = words.map(w => `
    <tr class="border-b border-zinc-800/60 hover:bg-zinc-900/40 transition-colors">
      <td class="py-2 px-4 text-amber-400 text-base leading-none" lang="hi" style="font-family:'Tiro Devanagari Hindi',serif">${w.hindi || ''}</td>
      <td class="py-2 px-4 text-teal-300/80 text-xs">${w.romanisation || ''}</td>
      <td class="py-2 px-4 text-slate-300 text-xs">${(w.english || '').split(',')[0].trim()}</td>
      <td class="py-2 px-4 text-xs text-slate-500">${w.word_category || ''}</td>
      <td class="py-2 px-4 text-xs text-zinc-600">${w.origin_language || w.origin_tag || ''}</td>
    </tr>`).join('');
}

/**
 * Displays a success or error message below the export buttons.
 *
 * @param {string}  message - The message to display.
 * @param {boolean} isError - When true, renders in red; when false, in green.
 * @returns {void}
 */
function showFeedback(message, isError) {
  const el = document.getElementById('export-feedback');
  if (!el) return;
  el.textContent = message;
  el.className   = `mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed ${
    isError
      ? 'bg-red-950/60 border border-red-800/40 text-red-300'
      : 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-300'
  }`;
  el.classList.remove('hidden');
}

/**
 * Builds the success feedback message for an incremental Anki export.
 *
 * @param {number} added   - Number of cards actually added.
 * @param {number} skipped - Number of cards skipped (already exist).
 * @param {string} deckName - Target deck name for display in the message.
 * @returns {string} Human-readable result message.
 */
function buildSendMessage(added, skipped, deckName) {
  if (added === 0 && skipped > 0) return `All ${skipped} card${plural(skipped)} already exist in "${deckName}".`;
  if (skipped > 0) return `Done! ${added} card${plural(added)} added · ${skipped} already existed.`;
  return `Done! ${added} card${plural(added)} added to "${deckName}".`;
}

/**
 * Handles the export button click: validates, runs the export/override API call,
 * and shows the result feedback.
 *
 * @returns {Promise<void>}
 */
async function handleExportClick() {
  const words      = getSelectedWordObjects();
  const deckName   = document.getElementById('export-deck-input')?.value.trim() || 'Hindi::Vocabulary';
  const isOverride = document.getElementById('export-override-toggle')?.checked ?? false;
  if (!words.length) { showFeedback('No words selected.', true); return; }

  const exportBtn       = document.getElementById('export-btn');
  exportBtn.disabled    = true;
  exportBtn.textContent = isOverride ? 'Replacing…' : 'Exporting…';
  document.getElementById('export-feedback')?.classList.add('hidden');

  try {
    if (isOverride) {
      const { added, deleted } = await overrideDeck(words, deckName);
      showFeedback(`Replaced! Removed ${deleted} old card${plural(deleted)}, added ${added} new card${plural(added)} to "${deckName}".`, false);
    } else {
      const { added, skipped } = await sendToAnki(words, deckName);
      showFeedback(buildSendMessage(added, skipped, deckName), false);
    }
  } catch (err) {
    showFeedback(`Error: ${err.message}`, true);
  } finally {
    exportBtn.textContent = 'Export to Anki';
    pollAnkiStatus();
  }
}

/**
 * Wires window-level event listeners for tab changes and selection changes.
 *
 * @returns {void}
 */
function wireWindowListeners() {
  window.addEventListener('tabchange', e => {
    if (e.detail.tab === 'export') { populateWordTable(); startPolling(); }
    else stopPolling();
  });

  window.addEventListener('selectionchange', () => {
    const exportTab = document.getElementById('tab-export');
    if (!exportTab || exportTab.style.display === 'none' || exportTab.style.display === '') return;
    populateWordTable();
    const deckInput = document.getElementById('export-deck-input');
    if (deckInput && !deckInput.dataset.userEdited) deckInput.value = getDefaultDeckName();
  });
}

/**
 * Wires DOM element listeners for the deck input, override toggle, export button,
 * and .txt download button.
 *
 * @returns {void}
 */
function wireControlListeners() {
  document.getElementById('export-deck-input')?.addEventListener('input', e => {
    e.target.dataset.userEdited = '1';
  });

  document.getElementById('export-override-toggle')?.addEventListener('change', e => {
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn && !exportBtn.disabled) {
      exportBtn.textContent = e.target.checked ? 'Replace Deck' : 'Export to Anki';
    }
  });

  document.getElementById('export-btn')?.addEventListener('click', handleExportClick);

  document.getElementById('export-txt-btn')?.addEventListener('click', () => {
    const words    = getSelectedWordObjects();
    const deckName = document.getElementById('export-deck-input')?.value.trim() || 'Hindi::Vocabulary';
    downloadAnkiTxt(words, deckName);
    showFeedback('Downloading .txt file for manual Anki import…', false);
  });
}

/**
 * Initialises the export pane.
 *
 * Wires all event listeners: tab switching (start/stop polling), selection
 * changes (repopulate table + sync deck name), override toggle, export button,
 * and the .txt download button.
 *
 * Must be called after DOMContentLoaded.
 *
 * @returns {void}
 */
export function initExportPane() {
  wireWindowListeners();
  wireControlListeners();
}
