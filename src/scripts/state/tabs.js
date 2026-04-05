/**
 * Tab switching state and DOM coordination.
 *
 * Responsible for: tracking which tab is active, showing/hiding the correct
 * content panels and sidebar index, updating tab bar button styling, and
 * dispatching a 'tabchange' CustomEvent so other modules can react.
 *
 * Note: the Export tab requires display:flex which conflicts with Tailwind's
 * .hidden (display:none), so it is controlled via inline style instead.
 *
 * No dependencies on other project modules.
 */
// Responsible for: active tab state, DOM panel switching, and tabchange event dispatch

/** @type {'words'|'sentences'|'export'} Currently active tab name. */
let activeTab = 'words';

/**
 * Returns the currently active tab name.
 *
 * @returns {'words'|'sentences'|'export'}
 */
export function getActiveTab() { return activeTab; }

/**
 * Wires click handlers on all [data-tab] buttons and activates the Words tab.
 *
 * Must be called last during init so the initial 'tabchange' event fires after
 * all other module listeners are already registered.
 *
 * @returns {void}
 */
export function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  switchTab('words');
}

/**
 * Activates a tab by name: shows its content panel, hides the others,
 * updates sidebar visibility, refreshes tab bar styling, and dispatches
 * a 'tabchange' event.
 *
 * @param {'words'|'sentences'|'export'} name - The tab to activate.
 * @returns {void}
 */
export function switchTab(name) {
  activeTab = name;

  // Words and sentences panels use Tailwind's .hidden class (display:none)
  document.getElementById('tab-words')?.classList.toggle('hidden', name !== 'words');
  document.getElementById('tab-sentences')?.classList.toggle('hidden', name !== 'sentences');

  // Export panel needs display:flex; inline style avoids conflict with Tailwind .hidden
  const exportPanel = document.getElementById('tab-export');
  if (exportPanel) exportPanel.style.display = name === 'export' ? 'flex' : 'none';

  // Show the matching sidebar index; hide all when Export is active
  document.getElementById('idx-words')?.classList.toggle('hidden', name !== 'words');
  document.getElementById('idx-sentences')?.classList.toggle('hidden', name !== 'sentences');

  // Update tab bar button active styling
  document.querySelectorAll('[data-tab]').forEach(btn => {
    const isActive = btn.dataset.tab === name;
    btn.classList.toggle('text-amber-400',    isActive);
    btn.classList.toggle('border-amber-400',  isActive);
    btn.classList.toggle('border-t-2',        isActive);
    btn.classList.toggle('-mt-px',            isActive);
    btn.classList.toggle('text-zinc-500',     !isActive);
    btn.classList.toggle('border-transparent', !isActive);
  });

  // Update search placeholder to match the active content type
  const placeholder = name === 'sentences' ? 'Search sentences…' : 'Search words…';
  document.querySelectorAll('[data-search-input]').forEach(inp => { inp.placeholder = placeholder; });

  window.dispatchEvent(new CustomEvent('tabchange', { detail: { tab: name } }));
}
