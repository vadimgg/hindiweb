// Responsible for: export pane controller — word table, AnkiConnect status polling, export button

import { checkAnkiConnect } from '../anki/connect.js';
import { sendToAnki }       from '../anki/export.js';
import { downloadAnkiTxt }  from '../anki/txtFallback.js';
import { getSelectedWordObjects, getDefaultDeckName } from '../state/selection.js';

let pollInterval = null;

function updateStatusBadge(online) {
  const badge = document.getElementById('export-anki-status');
  const btn   = document.getElementById('export-btn');
  if (!badge) return;
  badge.textContent = online ? '● Online' : '● Offline';
  badge.className   = online ? 'text-sm font-semibold text-emerald-400' : 'text-sm font-semibold text-zinc-500';
  if (btn) btn.disabled = !online;
}

async function poll() { updateStatusBadge(await checkAnkiConnect()); }

function startPolling() {
  if (pollInterval) return;
  poll();
  pollInterval = setInterval(poll, 3000);
}

function stopPolling() { clearInterval(pollInterval); pollInterval = null; }

function populateTable() {
  const words = getSelectedWordObjects();
  const tbody = document.getElementById('export-word-tbody');
  const count = document.getElementById('export-word-count');
  if (!tbody) return;
  if (count) count.textContent = String(words.length);
  tbody.innerHTML = words.map(w => `
    <tr class="border-b border-zinc-800/60 hover:bg-zinc-900/40 transition-colors">
      <td class="py-2 px-4 text-amber-400 text-base leading-none" lang="hi" style="font-family:'Tiro Devanagari Hindi',serif">${w.hindi || ''}</td>
      <td class="py-2 px-4 text-teal-300/80 text-xs">${w.romanisation || ''}</td>
      <td class="py-2 px-4 text-slate-300 text-xs">${(w.english || '').split(',')[0].trim()}</td>
      <td class="py-2 px-4 text-xs text-slate-500">${w.word_category || ''}</td>
      <td class="py-2 px-4 text-xs text-zinc-600">${w.origin_language || w.origin_tag || ''}</td>
    </tr>`).join('');
}

function showFeedback(msg, isError) {
  const el = document.getElementById('export-feedback');
  if (!el) return;
  el.textContent = msg;
  el.className   = `mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed ${isError ? 'bg-red-950/60 border border-red-800/40 text-red-300' : 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-300'}`;
  el.classList.remove('hidden');
}

export function initExportPane() {
  window.addEventListener('tabchange', e => {
    if (e.detail.tab === 'export') { populateTable(); startPolling(); }
    else stopPolling();
  });

  window.addEventListener('selectionchange', () => {
    if (!document.getElementById('tab-export')?.style.display || document.getElementById('tab-export')?.style.display === 'none') return;
    populateTable();
  });

  // Pre-fill deck name; mark input as user-edited once typed
  window.addEventListener('selectionchange', () => {
    const input = document.getElementById('export-deck-input');
    if (input && !input.dataset.userEdited) input.value = getDefaultDeckName();
  });
  document.getElementById('export-deck-input')?.addEventListener('input', e => { e.target.dataset.userEdited = '1'; });

  document.getElementById('export-btn')?.addEventListener('click', async () => {
    const words    = getSelectedWordObjects();
    const deckName = document.getElementById('export-deck-input')?.value.trim() || 'Hindi::Vocabulary';
    if (!words.length) { showFeedback('No words selected.', true); return; }
    const btn = document.getElementById('export-btn');
    btn.disabled = true; btn.textContent = 'Exporting…';
    document.getElementById('export-feedback')?.classList.add('hidden');
    try {
      const { added, skipped } = await sendToAnki(words, deckName);
      const msg = added === 0 && skipped > 0
        ? `All ${skipped} card${skipped !== 1 ? 's' : ''} already exist in "${deckName}".`
        : skipped > 0 ? `Done! ${added} card${added !== 1 ? 's' : ''} added · ${skipped} already existed.`
        : `Done! ${added} card${added !== 1 ? 's' : ''} added to "${deckName}".`;
      showFeedback(msg, false);
    } catch (err) {
      showFeedback(`Error: ${err.message}`, true);
    } finally {
      btn.textContent = 'Export to Anki';
      poll();
    }
  });

  document.getElementById('export-txt-btn')?.addEventListener('click', () => {
    const words    = getSelectedWordObjects();
    const deckName = document.getElementById('export-deck-input')?.value.trim() || 'Hindi::Vocabulary';
    downloadAnkiTxt(words, deckName);
    showFeedback('Downloading .txt file for manual Anki import…', false);
  });
}
