/**
 * Export pane controller — selected-word list, AnkiConnect status polling, export actions.
 *
 * Responsible for: keeping the Deliver page's UI in sync with the current word
 * selection, polling AnkiConnect every 3 seconds while the Deliver tab is open,
 * handling the "Send to Anki" and "Replace Deck" button actions, and
 * triggering the .txt fallback download.
 *
 * Does NOT perform the actual Anki API calls (anki/export.js) or selection
 * state management (state/selection.js) — it coordinates them.
 *
 * Dependencies: anki/connect.js, anki/export.js, anki/txtFallback.js,
 *               state/selection.js.
 */
// Responsible for: deliver page controller — word list, AnkiConnect polling, export button

import { checkAnkiConnect }                              from '../anki/connect.js';
import { sendToAnki, overrideDeck }                      from '../anki/export.js';
import { downloadAnkiTxt }                               from '../anki/txtFallback.js';
import { getSelectedWordObjects }                        from '../state/selection.js';

/** @type {number|null} setInterval handle; non-null while polling is active. */
let pollInterval = null;

/** Returns 's' when n !== 1 — used for pluralising feedback messages. */
const plural = n => (n !== 1 ? 's' : '');

/**
 * Returns the current deck name from the deck inputs (main::sub).
 *
 * @returns {string} Deck name in the form 'Main::Sub'.
 */
function getDeckName() {
  const main = document.getElementById('export-deck-main')?.value.trim() || 'Hindi';
  const sub  = document.getElementById('export-deck-sub')?.value.trim() || 'Vocabulary';
  return sub ? `${main}::${sub}` : main;
}

/**
 * Syncs the deck preview text and confirm-deck label to the current input values.
 *
 * @returns {void}
 */
function syncDeckPreview() {
  const name = getDeckName();
  const preview = document.getElementById('export-deck-preview');
  if (preview) preview.textContent = name;
  const confirmDeck = document.getElementById('deliver-confirm-deck');
  if (confirmDeck) confirmDeck.textContent = name;
}

/**
 * Updates the AnkiConnect status bar and export button state.
 *
 * @param {boolean} online - Whether AnkiConnect is reachable.
 * @returns {void}
 */
function updateStatusBadge(online) {
  const bar       = document.getElementById('deliver-status-bar');
  const dot       = document.getElementById('deliver-status-dot');
  const label     = document.getElementById('deliver-status-label');
  const exportBtn = document.getElementById('export-btn');

  if (bar) {
    bar.classList.toggle('anki-status-connected', online);
    bar.classList.toggle('anki-status-offline',   !online);
  }
  if (dot) {
    dot.classList.toggle('anki-status-dot-connected', online);
    dot.classList.toggle('anki-status-dot-offline',   !online);
  }
  if (label) {
    const overrideToggle = document.getElementById('export-override-toggle');
    const state = online
      ? (overrideToggle?.checked ? 'Connected — Replace mode' : 'Connected')
      : 'Offline — open Anki + AnkiConnect';
    label.innerHTML = `<strong>AnkiConnect</strong> &nbsp;${state}`;
  }
  if (exportBtn) {
    const overrideToggle = document.getElementById('export-override-toggle');
    exportBtn.disabled = !online;
    exportBtn.querySelector('.send-btn-text').textContent =
      online && overrideToggle?.checked ? 'Replace Deck' : 'Send to Anki';
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
 * Rebuilds the selected-word list in the deliver panel.
 * Shows one compact row per selected word.
 *
 * @returns {void}
 */
function populateWordTable() {
  const words   = getSelectedWordObjects();
  const rows    = document.getElementById('export-word-rows');
  const countEl = document.getElementById('export-word-count');
  const metaEl  = document.getElementById('deliver-action-meta');
  const confirmCount = document.getElementById('deliver-confirm-word-count');

  if (countEl) countEl.textContent = String(words.length);
  if (confirmCount) confirmCount.textContent = `${words.length} word card${plural(words.length)}`;
  if (metaEl) metaEl.textContent = words.length > 0
    ? `${words.length} card${plural(words.length)} ready to export`
    : 'Select words on the Words page to begin';

  syncDeckPreview();

  if (!rows) return;
  rows.innerHTML = words.map(w => `
    <div class="deliver-row">
      <span class="deliver-row-hindi" lang="hi">${w.hindi || ''}</span>
      <span class="deliver-row-sep">·</span>
      <span class="deliver-row-roman">${w.romanisation || ''}</span>
      <span class="deliver-row-sep">·</span>
      <span class="deliver-row-english">${(w.english || '').split(',')[0].trim()}</span>
      <span class="deliver-row-meta">${[w.pos, w.gender ? (w.gender === 'masculine' ? 'masc.' : 'fem.') : ''].filter(Boolean).join(' · ')}</span>
    </div>`).join('');
}

/**
 * Displays a success or error message below the export button.
 *
 * @param {string}  message - The message to display.
 * @param {boolean} isError - When true, renders in red; when false, in green.
 * @returns {void}
 */
function showFeedback(message, isError) {
  const el = document.getElementById('export-feedback');
  if (!el) return;
  el.textContent = message;
  el.className   = `rounded-xl px-4 py-3 text-sm leading-relaxed ${
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
  const deckName   = getDeckName();
  const isOverride = document.getElementById('export-override-toggle')?.checked ?? false;
  if (!words.length) { showFeedback('No words selected.', true); return; }

  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.disabled = true;
    exportBtn.querySelector('.send-btn-text').textContent = isOverride ? 'Replacing…' : 'Sending…';
  }
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
    if (exportBtn) exportBtn.querySelector('.send-btn-text').textContent = 'Send to Anki';
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
    if (e.detail.tab === 'deliver') { populateWordTable(); startPolling(); }
    else stopPolling();
  });

  window.addEventListener('selectionchange', () => {
    const deliverPage = document.getElementById('page-deliver');
    if (!deliverPage?.classList.contains('is-active')) return;
    populateWordTable();
    syncDeckPreview();
  });
}

/**
 * Wires DOM element listeners for the deck inputs, override toggle, export button,
 * and .txt download button.
 *
 * @returns {void}
 */
function wireControlListeners() {
  document.getElementById('export-deck-main')?.addEventListener('input', syncDeckPreview);
  document.getElementById('export-deck-sub')?.addEventListener('input', syncDeckPreview);

  document.getElementById('export-override-toggle')?.addEventListener('change', e => {
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn && !exportBtn.disabled) {
      exportBtn.querySelector('.send-btn-text').textContent =
        e.target.checked ? 'Replace Deck' : 'Send to Anki';
    }
    // Update status label to reflect override mode
    pollAnkiStatus();
  });

  document.getElementById('export-btn')?.addEventListener('click', handleExportClick);

  document.getElementById('export-txt-btn')?.addEventListener('click', () => {
    const words    = getSelectedWordObjects();
    const deckName = getDeckName();
    downloadAnkiTxt(words, deckName);
    showFeedback('Downloading .txt file for manual Anki import…', false);
  });
}

/**
 * Initialises the export/deliver pane.
 *
 * @returns {void}
 */
export function initExportPane() {
  wireWindowListeners();
  wireControlListeners();
}
