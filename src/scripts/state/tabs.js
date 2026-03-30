// Responsible for: active tab state, DOM panel switching, and tabchange event dispatch

let activeTab = 'words';

export function getActiveTab() { return activeTab; }

export function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  switchTab('words');
}

export function switchTab(name) {
  activeTab = name;

  // Words/sentences use hidden class (block layout)
  document.getElementById('tab-words')?.classList.toggle('hidden', name !== 'words');
  document.getElementById('tab-sentences')?.classList.toggle('hidden', name !== 'sentences');

  // Export tab needs display:flex — manage via style directly to avoid Tailwind hidden conflict
  const exportTab = document.getElementById('tab-export');
  if (exportTab) {
    if (name === 'export') {
      exportTab.style.display = 'flex';
    } else {
      exportTab.style.display = 'none';
    }
  }

  // Sidebar panels (hidden when Export is active)
  document.getElementById('idx-words')?.classList.toggle('hidden', name !== 'words');
  document.getElementById('idx-sentences')?.classList.toggle('hidden', name !== 'sentences');

  // Tab bar active styling
  document.querySelectorAll('[data-tab]').forEach(btn => {
    const active = btn.dataset.tab === name;
    btn.classList.toggle('text-amber-400', active);
    btn.classList.toggle('border-amber-400', active);
    btn.classList.toggle('border-t-2', active);
    btn.classList.toggle('-mt-px', active);
    btn.classList.toggle('text-zinc-500', !active);
    btn.classList.toggle('border-transparent', !active);
  });

  // Search placeholder
  const ph = name === 'sentences' ? 'Search sentences…' : 'Search words…';
  document.querySelectorAll('[data-search-input]').forEach(inp => { inp.placeholder = ph; });

  window.dispatchEvent(new CustomEvent('tabchange', { detail: { tab: name } }));
}
