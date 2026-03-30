// Responsible for: word card collapse/expand toggling and deselect button handling

import { setWordSelected, syncGroupCheckbox } from '../state/selection.js';
import { getWordRowMap, applyFilter } from './search.js';

export function initCards() {
  document.getElementById('cards-container')?.addEventListener('click', (e) => {
    const header = e.target.closest('.card-header');
    if (header && !e.target.closest('.deselect-btn')) {
      header.closest('article')?.classList.toggle('is-collapsed');
      return;
    }
    const btn = e.target.closest('.deselect-btn');
    if (!btn) return;
    const idx    = parseInt(btn.dataset.deselectIndex);
    const rowMap = getWordRowMap();
    setWordSelected(idx, false);
    syncGroupCheckbox(rowMap[idx]?.closest('.date-group')?.dataset.group ?? '');
    applyFilter();
  });

  // Intersection observer: highlight the active row in the sidebar
  const wordCards = [...document.querySelectorAll('[data-word-card]')];
  const rowMap    = getWordRowMap();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = entry.target.dataset.cardIndex;
      document.querySelectorAll('#idx-words .idx-row').forEach(r => r.classList.remove('is-active'));
      const row = rowMap[idx];
      row?.classList.add('is-active');
      row?.scrollIntoView({ block: 'nearest' });
    });
  }, { threshold: 0.4 });

  wordCards.forEach((el, i) => {
    const article = el.querySelector('article');
    if (article) article.dataset.cardIndex = String(i);
    observer.observe(el);
  });
}
