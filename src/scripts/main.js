/**
 * Application bootstrapper.
 *
 * Responsible for: importing all client-side modules and calling their init
 * functions in the correct order once the DOM is ready. This is the single
 * entry point loaded by index.astro via <script>.
 *
 * Initialisation order matters:
 *   1. initSelection — seeds selection state before any UI reads it.
 *   2. initSearch    — builds DOM caches; needs selection state.
 *   3. initSidebar, initCards, initTooltip, initExportPane — order-independent.
 *   4. initTabs      — fires the initial 'tabchange' event last, after all
 *                      listeners are registered.
 */
// Responsible for: bootstrapper — imports all modules and initialises them after DOMContentLoaded

import { initSelection }  from './state/selection.js';
import { initTabs }       from './state/tabs.js';
import { initSearch }     from './ui/search.js';
import { initCards }      from './ui/cards.js';
import { initSidebar }    from './ui/indexSidebar.js';
import { initTooltip }    from './ui/tooltip.js';
import { initExportPane } from './ui/exportPane.js';

document.addEventListener('DOMContentLoaded', () => {
  initSelection();   // seed selection state from all words
  initSearch();      // wire search inputs + build DOM caches
  initSidebar();     // sidebar drag-select + collapse + scroll-to
  initCards();       // card collapse + deselect + intersection observer
  initTooltip();     // annotate example cards + tooltip positioning
  initExportPane();  // export pane table + AnkiConnect polling
  initTabs();        // last: fires initial tabchange event after all modules are ready
});
