// Responsible for: sidebar interactions — drag-select checkboxes, group collapse, scroll-to-card

import { setWordSelected, hasWord, syncGroupCheckbox } from '../state/selection.js';
import { applyFilter } from './search.js';

let isDragging = false;
let dragMode   = true;

export function initSidebar() {
  const idxWords = document.getElementById('idx-words');

  idxWords?.addEventListener('mousedown', (e) => {
    const cb = e.target.closest('.word-checkbox');
    if (!cb) return;
    e.preventDefault();
    const idx = parseInt(cb.dataset.wordIndex);
    dragMode   = !hasWord(idx);
    setWordSelected(idx, dragMode);
    isDragging = true;
    syncGroupCheckbox(cb.closest('.date-group')?.dataset.group ?? '');
    applyFilter();
  });

  idxWords?.addEventListener('mouseover', (e) => {
    if (!isDragging) return;
    const cb = e.target.closest('.word-checkbox');
    if (!cb) return;
    const idx = parseInt(cb.dataset.wordIndex);
    if (hasWord(idx) === dragMode) return;
    setWordSelected(idx, dragMode);
    syncGroupCheckbox(cb.closest('.date-group')?.dataset.group ?? '');
    applyFilter();
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  idxWords?.addEventListener('click', (e) => {
    if (e.target.closest('.word-checkbox')) return;

    const gCb = e.target.closest('.group-checkbox');
    if (gCb) {
      const gDate   = gCb.dataset.groupDate;
      const groupEl = document.querySelector(`#idx-words .date-group[data-group="${gDate}"]`);
      if (!groupEl) return;
      const rows  = [...groupEl.querySelectorAll('.idx-row[data-index]')];
      const allOn = rows.every(r => hasWord(parseInt(r.dataset.index)));
      rows.forEach(r => setWordSelected(parseInt(r.dataset.index), !allOn));
      syncGroupCheckbox(gDate);
      applyFilter();
      return;
    }

    const collapseBtn = e.target.closest('.collapse-btn');
    if (collapseBtn) {
      const g = collapseBtn.closest('.date-group');
      g?.querySelector('.date-group-words')?.classList.toggle('collapsed');
      collapseBtn.classList.toggle('is-collapsed');
      return;
    }

    const toggleBtn = e.target.closest('.date-group-toggle');
    if (toggleBtn) {
      const g = toggleBtn.closest('.date-group');
      g?.querySelector('.date-group-words')?.classList.toggle('collapsed');
      g?.querySelector('.collapse-btn')?.classList.toggle('is-collapsed');
      return;
    }

    const scrollEl = e.target.closest('[data-scroll-to]');
    if (scrollEl) {
      document.getElementById(`card-${scrollEl.dataset.scrollTo}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
