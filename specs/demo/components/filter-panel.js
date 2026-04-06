// Filter / Search UI component for the HindiWeb design demo.
// Exports window.FilterPanel() → HTML string, window.FilterPanelStyles → CSS string.

window.FilterPanelStyles = `

  /* ── Tab Bar ────────────────────────────────────────────── */
  .filter-tab-bar {
    display: flex;
    align-items: center;
    gap: 0;
    background: rgba(15,23,42,0.6);
    border: 1px solid rgba(51,65,85,0.5);
    border-radius: 10px;
    padding: 3px;
    width: fit-content;
  }

  .filter-tab {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    padding: 0.35rem 1.1rem;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    background: transparent;
    color: #64748b;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
  }

  .filter-tab.is-active {
    background: rgba(251,191,36,0.12);
    color: #fbbf24;
    border: 1px solid rgba(251,191,36,0.25);
  }

  /* ── Context bar (tab bar + filter button row) ──────────── */
  .filter-context-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* ── Filter button ──────────────────────────────────────── */
  .filter-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 0.4rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(51,65,85,0.4);
    background: rgba(15,23,42,0.7);
    color: #94a3b8;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s, color 0.15s;
  }

  .filter-btn:hover {
    border-color: rgba(51,65,85,0.7);
    color: #cbd5e1;
  }

  .filter-btn.is-active {
    border-color: rgba(251,191,36,1);
    color: #fbbf24;
    box-shadow: 0 0 0 2px rgba(251,191,36,0.15);
  }

  .filter-btn-icon {
    font-size: 13px;
    line-height: 1;
  }

  /* ── Filter panel ───────────────────────────────────────── */
  .filter-panel-wrap {
    position: relative;
  }

  .filter-panel {
    background: linear-gradient(145deg, #131f35, #0f172a);
    border: 1px solid rgba(51,65,85,0.5);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .filter-panel.is-hidden {
    display: none;
  }

  /* Search input */
  .filter-search-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .filter-search-input {
    width: 100%;
    background: rgba(15,23,42,0.8);
    border: 1px solid rgba(51,65,85,0.5);
    border-radius: 8px;
    padding: 0.6rem 2.5rem 0.6rem 0.85rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.875rem;
    color: #e2e8f0;
    outline: none;
    caret-color: #fbbf24;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .filter-search-input::placeholder {
    color: #475569;
    font-style: normal;
  }

  .filter-search-input:focus {
    border-color: rgba(251,191,36,0.4);
    box-shadow: 0 0 0 2px rgba(251,191,36,0.2);
  }

  .filter-search-clear {
    position: absolute;
    right: 0.65rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #64748b;
    font-size: 14px;
    cursor: pointer;
    line-height: 1;
    padding: 2px 4px;
    border-radius: 4px;
    transition: color 0.15s;
  }

  .filter-search-clear:hover {
    color: #e2e8f0;
  }

  /* Group chips row */
  .filter-group-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 2px; /* prevents clipping on scroll */
  }

  .filter-group-row::-webkit-scrollbar {
    display: none;
  }

  .filter-group-chip {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 0.3rem 0.8rem;
    border-radius: 6px;
    border: 1px solid rgba(51,65,85,0.4);
    background: rgba(30,41,59,0.5);
    color: #64748b;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .filter-group-chip.is-active {
    background: rgba(251,191,36,0.15);
    border-color: rgba(251,191,36,0.5);
    color: #fbbf24;
  }

  /* Results row */
  .filter-results-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.25rem;
    border-top: 1px solid rgba(51,65,85,0.3);
  }

  .filter-results-count {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    color: #475569;
  }

  .filter-results-count strong {
    color: #64748b;
    font-weight: 600;
  }

  .filter-clear-all {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #fbbf24;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.15s;
  }

  .filter-clear-all:hover {
    opacity: 0.7;
  }

  /* ── Inline search results list ────────────────────────── */
  .filter-results-list {
    max-height: 240px;
    overflow-y: auto;
    border-radius: 8px;
    border: 1px solid rgba(51,65,85,0.3);
    background: rgba(15,23,42,0.5);
    scrollbar-width: thin;
    scrollbar-color: rgba(51,65,85,0.5) transparent;
  }

  .filter-results-list::-webkit-scrollbar {
    width: 4px;
  }

  .filter-results-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .filter-results-list::-webkit-scrollbar-thumb {
    background: rgba(51,65,85,0.5);
    border-radius: 2px;
  }

  .filter-result-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 0.75rem;
    border-bottom: 1px solid rgba(51,65,85,0.3);
    cursor: pointer;
    transition: background 0.12s;
    border-left: 2px solid transparent;
  }

  .filter-result-row:last-child {
    border-bottom: none;
  }

  .filter-result-row:hover {
    background: rgba(255,255,255,0.03);
  }

  .filter-result-row.is-selected {
    background: rgba(251,191,36,0.04);
    border-left-color: rgba(251,191,36,0.4);
  }

  .filter-result-content {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .filter-result-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 15px;
    color: #fbbf24;
    line-height: 1.3;
    flex-shrink: 0;
  }

  .filter-result-sep {
    font-size: 11px;
    color: #334155;
    flex-shrink: 0;
  }

  .filter-result-roman {
    font-size: 13px;
    color: #5eead4;
    flex-shrink: 0;
  }

  .filter-result-english {
    font-size: 13px;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .filter-result-toggle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(71,85,105,0.6);
    background: transparent;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  }

  .filter-result-toggle:hover {
    border-color: rgba(251,191,36,0.5);
  }

  .filter-result-toggle.is-selected {
    border-color: #fbbf24;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    box-shadow: 0 0 0 2px rgba(251,191,36,0.2);
  }

  .filter-result-toggle.is-selected::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%) rotate(45deg);
    width: 4px;
    height: 7px;
    border-right: 2px solid rgba(0,0,0,0.7);
    border-bottom: 2px solid rgba(0,0,0,0.7);
  }

  /* ── Cards dim overlay when panel is open ───────────────── */
  .cards-dimmed {
    opacity: 0.4;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  /* ── Toggle button (demo control) ───────────────────────── */
  .demo-toggle-btn {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    padding: 0.4rem 1rem;
    border-radius: 7px;
    border: 1px solid rgba(51,65,85,0.5);
    background: rgba(30,41,59,0.5);
    color: #64748b;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .demo-toggle-btn:hover {
    color: #94a3b8;
    border-color: rgba(51,65,85,0.8);
  }
`;

window.FilterPanel = function () {
  return `
    <!-- Demo toggle control -->
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:2rem;">
      <p class="demo-section-label" style="margin-bottom:0;">Filter / Search UI</p>
      <button class="demo-toggle-btn" id="toggle-filter-btn">Toggle filter panel</button>
    </div>

    <!-- Context bar: tab bar + filter button -->
    <div class="filter-context-bar">
      <div class="filter-tab-bar">
        <button class="filter-tab is-active" id="tab-words">Words</button>
        <button class="filter-tab" id="tab-sentences">Sentences</button>
      </div>
      <button class="filter-btn" id="filter-open-btn">
        <span class="filter-btn-icon">▿</span>
        <span>Filter</span>
      </button>
    </div>

    <!-- Filter panel -->
    <div class="filter-panel is-hidden" id="filter-panel">

      <!-- 1. Fuzzy search -->
      <div class="filter-search-wrap">
        <input
          class="filter-search-input"
          type="text"
          placeholder="Search पानी, paanī, water…"
          value="paan"
          readonly
        />
        <button class="filter-search-clear" aria-label="Clear search">✕</button>
      </div>

      <!-- 2. Group filter chips -->
      <div class="filter-group-row">
        <button class="filter-group-chip is-active">All</button>
        <button class="filter-group-chip">Complete Hindi, Ch 01</button>
        <button class="filter-group-chip">Spoken Hindi Basics</button>
        <button class="filter-group-chip">March 2026</button>
      </div>

      <!-- 3. Inline search results (shown when search has text) -->
      <div class="filter-results-list">

        <!-- Row 1 — selected -->
        <div class="filter-result-row is-selected">
          <div class="filter-result-content">
            <span class="filter-result-hindi" lang="hi">पानी</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-roman">paanī</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-english">water</span>
          </div>
          <button class="filter-result-toggle is-selected" aria-label="Deselect पानी"></button>
        </div>

        <!-- Row 2 — selected -->
        <div class="filter-result-row is-selected">
          <div class="filter-result-content">
            <span class="filter-result-hindi" lang="hi">पाना</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-roman">pānā</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-english">to get / find</span>
          </div>
          <button class="filter-result-toggle is-selected" aria-label="Deselect पाना"></button>
        </div>

        <!-- Row 3 — unselected -->
        <div class="filter-result-row">
          <div class="filter-result-content">
            <span class="filter-result-hindi" lang="hi">पान</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-roman">pān</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-english">betel leaf</span>
          </div>
          <button class="filter-result-toggle" aria-label="Select पान"></button>
        </div>

        <!-- Row 4 — unselected -->
        <div class="filter-result-row">
          <div class="filter-result-content">
            <span class="filter-result-hindi" lang="hi">पानी देना</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-roman">paanī denā</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-english">to water (plants)</span>
          </div>
          <button class="filter-result-toggle" aria-label="Select पानी देना"></button>
        </div>

        <!-- Row 5 — unselected -->
        <div class="filter-result-row">
          <div class="filter-result-content">
            <span class="filter-result-hindi" lang="hi">पानी भरना</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-roman">paanī bharnā</span>
            <span class="filter-result-sep">·</span>
            <span class="filter-result-english">to fill water</span>
          </div>
          <button class="filter-result-toggle" aria-label="Select पानी भरना"></button>
        </div>

      </div>

      <!-- 4. Results count + Clear all -->
      <div class="filter-results-row">
        <span class="filter-results-count"><strong>2 of 5</strong> shown selected &nbsp;·&nbsp; <strong>8</strong> total selected</span>
        <button class="filter-clear-all">Clear all</button>
      </div>

    </div>

    <!-- Cards container (dimmed when panel is open) -->
    <div id="filter-demo-cards">
`;
  // Note: the caller must close #filter-demo-cards with </div>
};

window.FilterPanelClose = function () {
  return `</div>`; // closes #filter-demo-cards
};
