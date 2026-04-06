// PageSentences component — Sentences page for the 3-page demo.
// Same layout pattern as PageWords: header, filter panel, group dividers,
// sentence cards with selection circles.
// Includes a Web / Anki view mode toggle in the header row.
// Exports window.PageSentences() → HTML string, window.PageSentencesStyles → CSS string.

window.PageSentencesStyles = `

  /* ── Sentence filter chips ──────────────────────────────── */
  /* Reuses pw-filter-* classes from page-words for the panel itself.
   * Only sentence-specific overrides live here. */

  /* Group chips for sentences use the same .pw-filter-chip class,
   * but sentence groups are thematic (Basics, Greetings, Daily Life)
   * rather than date-based. No extra CSS needed. */

  /* ── Sentence card selection states ─────────────────────── */
  /* .sel-circle and .is-selected on .sc-card mirror the word card pattern */
  .sc-card.is-selected {
    border-color: rgba(251,191,36,0.3);
    box-shadow: 0 0 0 1px rgba(251,191,36,0.15), 0 4px 24px rgba(0,0,0,0.4);
  }

  /* Web mode: show web-card-area, hide anki-mode-area */
  #page-sentences.mode-web  .web-card-area  { display: block; }
  #page-sentences.mode-web  .anki-mode-area { display: none; }
  #page-sentences.mode-anki .web-card-area  { display: none; }
  #page-sentences.mode-anki .anki-mode-area { display: block; }
`;

/**
 * Render the Sentences page.
 * Shows a page header, filter panel with thematic group chips,
 * a date group divider, and two sentence cards — one expanded + selected,
 * one collapsed + unselected.
 * @param {object} sentence - demoSentence object
 * @returns {string} HTML string
 */
window.PageSentences = function (sentence) {
  const rowsHtml = (sentence.words || []).map(w => {
    const dotClass = w.gender === 'm'
      ? 'sc-gender-dot sc-gender-dot-masc'
      : w.gender === 'f'
        ? 'sc-gender-dot sc-gender-dot-fem'
        : '';
    const dotHtml = dotClass
      ? `<span class="${dotClass}" title="${w.gender === 'm' ? 'masculine' : 'feminine'}"></span>`
      : '<span style="width:7px;flex-shrink:0;"></span>';
    return `
      <div class="sc-row">
        <div class="sc-token-cell">
          ${dotHtml}
          <div>
            <span class="sc-token-hindi" lang="hi">${w.hindi}</span>
            <span class="sc-token-roman">${w.roman}</span>
          </div>
        </div>
        <div class="sc-meaning-cell">
          <span class="sc-meaning-text">${w.meaning}</span>
        </div>
      </div>
    `;
  }).join('');

  return `
<div id="page-sentences" class="page mode-web">

  <!-- Page header -->
  <div class="page-header">
    <div class="page-header-text">
      <h1 class="page-title">Sentences <span class="page-selection-badge is-hidden">0 selected</span></h1>
      <p class="page-subtitle">Select sentences to export</p>
    </div>
    <!-- Header controls: filter + view mode toggle -->
    <div style="display:flex;align-items:flex-start;gap:0.5rem;flex-shrink:0;">
      <button class="page-filter-btn" id="ps-filter-btn" aria-expanded="false">
        <span class="page-filter-btn-icon">▿</span>
        <span>Filter</span>
      </button>
      <div class="view-mode-toggle" role="group" aria-label="View mode">
        <button class="view-mode-btn is-active" id="ps-mode-web" onclick="setViewMode('sentences','web')" aria-pressed="true">
          <span class="view-mode-btn-icon">≋</span>
          <span>Web</span>
        </button>
        <button class="view-mode-btn" id="ps-mode-anki" onclick="setViewMode('sentences','anki')" aria-pressed="false">
          <span class="view-mode-btn-icon">◈</span>
          <span>Anki</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Web mode: filter panel + group-based card list -->
  <div class="web-card-area">

  <!-- Filter panel (collapsed by default) -->
  <div class="pw-filter-panel is-hidden" id="ps-filter-panel">
    <div class="pw-filter-search-wrap">
      <input
        class="pw-filter-search-input"
        type="text"
        placeholder="Search वह रोज़, daily life…"
        readonly
      />
      <button class="pw-filter-search-clear" aria-label="Clear search">✕</button>
    </div>
    <!-- Thematic group chips for sentences -->
    <div class="pw-filter-group-row">
      <button class="pw-filter-chip is-active">All</button>
      <button class="pw-filter-chip">Basics</button>
      <button class="pw-filter-chip">Greetings</button>
      <button class="pw-filter-chip">Daily Life</button>
      <button class="pw-filter-chip">Food &amp; Drink</button>
      <button class="pw-filter-chip">Travel</button>
    </div>
    <div class="pw-filter-results">
      <span class="pw-filter-count">Showing <strong>23</strong> sentences</span>
      <button class="pw-filter-clear">Clear all</button>
    </div>
  </div>

  <!-- Drag-to-select hint -->
  <p class="drag-select-hint">Drag to select multiple</p>

  <!-- Group: Basics — EXPANDED, checkbox checked -->
  <div class="card-group-wrapper" id="cgw-s-basics">
  <div class="card-group-divider">
    <div class="card-group-header" onclick="toggleGroupCollapse('cgw-s-basics'); event.stopPropagation();">
      <span class="card-group-checkbox is-checked" role="checkbox" aria-checked="true" aria-label="Select all in Basics" onclick="toggleGroupCheckbox(this, 'cgw-s-basics'); event.stopPropagation();"></span>
      <span class="card-group-label">Basics</span>
      <span class="card-group-line"></span>
      <span class="card-group-count">9 sentences</span>
      <span class="card-group-chevron">▾</span>
    </div>
  </div>
  </div>

  <div class="card-list" data-group="cgw-s-basics">

    <!-- Sentence card 1 — expanded + SELECTED -->
    <article class="sc-card is-selected" id="ps-card-1">
      <div class="sc-header card-header" role="button" aria-expanded="true" data-card="ps-card-1">
        <div class="sc-header-content">
          <span class="sc-hindi" lang="hi">${sentence.hindi}</span>
          <span class="sc-roman">${sentence.roman}</span>
          <span class="sc-english">${sentence.english}</span>
          <div class="sc-register-row">
            <span class="badge badge-standard">${sentence.register}</span>
          </div>
        </div>
        <!-- Selection circle — amber = selected -->
        <button
          class="sel-circle is-selected"
          aria-label="Deselect sentence"
          onclick="toggleSentenceSelection(this, 'ps-card-1'); event.stopPropagation();"
        ></button>
        <span class="sc-collapse-icon" style="margin-left:0.5rem;">▾</span>
      </div>

      <div class="sc-body">
        <p class="sc-gloss">Literal: "${sentence.literal}"</p>
        <div class="sc-breakdown">
          <div class="sc-breakdown-header">
            <span class="sc-col-label">Token</span>
            <span class="sc-col-label">Meaning</span>
          </div>
          ${rowsHtml}
        </div>
      </div>
    </article>

    <!-- Sentence card 2 — collapsed + UNSELECTED -->
    <article class="sc-card is-collapsed" id="ps-card-2">
      <div class="sc-header card-header" role="button" aria-expanded="false" data-card="ps-card-2">
        <div class="sc-header-content">
          <span class="sc-hindi" lang="hi">नमस्ते, आप कैसे हैं?</span>
          <span class="sc-roman">namaste, āp kaise haĩ?</span>
          <span class="sc-english">Hello, how are you?</span>
          <div class="sc-register-row">
            <span class="badge badge-standard">formal</span>
          </div>
        </div>
        <button
          class="sel-circle"
          aria-label="Select sentence"
          onclick="toggleSentenceSelection(this, 'ps-card-2'); event.stopPropagation();"
        ></button>
        <span class="sc-collapse-icon" style="margin-left:0.5rem;">▾</span>
      </div>
      <div class="sc-body">
        <p class="sc-gloss">Literal: "Greetings, you how are?"</p>
        <div class="sc-breakdown">
          <div class="sc-breakdown-header">
            <span class="sc-col-label">Token</span>
            <span class="sc-col-label">Meaning</span>
          </div>
          <div class="sc-row">
            <div class="sc-token-cell">
              <span style="width:7px;flex-shrink:0;"></span>
              <div>
                <span class="sc-token-hindi" lang="hi">नमस्ते</span>
                <span class="sc-token-roman">namaste</span>
              </div>
            </div>
            <div class="sc-meaning-cell">
              <span class="sc-meaning-text">hello / greetings</span>
            </div>
          </div>
          <div class="sc-row">
            <div class="sc-token-cell">
              <span style="width:7px;flex-shrink:0;"></span>
              <div>
                <span class="sc-token-hindi" lang="hi">आप</span>
                <span class="sc-token-roman">āp</span>
              </div>
            </div>
            <div class="sc-meaning-cell">
              <span class="sc-meaning-text">you (formal)</span>
            </div>
          </div>
          <div class="sc-row">
            <div class="sc-token-cell">
              <span style="width:7px;flex-shrink:0;"></span>
              <div>
                <span class="sc-token-hindi" lang="hi">कैसे</span>
                <span class="sc-token-roman">kaise</span>
              </div>
            </div>
            <div class="sc-meaning-cell">
              <span class="sc-meaning-text">how</span>
            </div>
          </div>
          <div class="sc-row">
            <div class="sc-token-cell">
              <span style="width:7px;flex-shrink:0;"></span>
              <div>
                <span class="sc-token-hindi" lang="hi">हैं</span>
                <span class="sc-token-roman">haĩ</span>
              </div>
            </div>
            <div class="sc-meaning-cell">
              <span class="sc-meaning-text">are (plural/formal copula)</span>
            </div>
          </div>
        </div>
      </div>
    </article>

  </div>

  <!-- Group: Greetings — COLLAPSED by default, checkbox indeterminate -->
  <div class="card-group-wrapper is-collapsed" id="cgw-s-greetings">
  <div class="card-group-divider">
    <div class="card-group-header" onclick="toggleGroupCollapse('cgw-s-greetings'); event.stopPropagation();">
      <span class="card-group-checkbox is-indeterminate" role="checkbox" aria-checked="mixed" aria-label="Select all in Greetings" onclick="toggleGroupCheckbox(this, 'cgw-s-greetings'); event.stopPropagation();"></span>
      <span class="card-group-label">Greetings</span>
      <span class="card-group-line"></span>
      <span class="card-group-count">5 sentences</span>
      <span class="card-group-chevron">▾</span>
    </div>
  </div>
  </div>

  <div class="card-list" data-group="cgw-s-greetings" style="opacity:0.45;pointer-events:none;">
    <!-- Faded placeholder cards -->
    <article class="sc-card is-collapsed">
      <div class="sc-header" style="cursor:default;">
        <div class="sc-header-content">
          <span class="sc-hindi" lang="hi">मेरा नाम राज है।</span>
          <span class="sc-roman">merā nām rāj hai.</span>
          <span class="sc-english">My name is Raj.</span>
          <div class="sc-register-row">
            <span class="badge badge-standard">standard</span>
          </div>
        </div>
        <span class="sc-collapse-icon" style="transform:rotate(-90deg);">▾</span>
      </div>
    </article>
  </div>

  </div><!-- /.web-card-area -->

  <!-- Anki mode: flat list of flip cards for selected sentences only -->
  <div class="anki-mode-area" id="ps-anki-area">
    <p class="anki-mode-notice">Showing Anki cards for <strong>2</strong> selected sentences · Click a card to flip</p>

    <!-- Flip card 1: primary demo sentence -->
    <div class="anki-flip-card" id="ps-flip-1">
      <div class="anki-flip-inner">
        <div class="anki-flip-front">
          <div class="anki-shell">
            <div class="card">
              <div class="card-wrap front-face">
                <div class="meaning-wrap">
                  <p class="meaning">${sentence.english}</p>
                </div>
                <div class="chips" style="margin-top:.9rem;">
                  <span class="reg reg-${sentence.register}">${sentence.register}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="anki-flip-back">
          <div id="ps-flip-1-back"></div>
        </div>
      </div>
      <p class="anki-flip-hint">Click to flip</p>
    </div>

    <!-- Flip card 2: second demo sentence -->
    <div class="anki-flip-card" id="ps-flip-2">
      <div class="anki-flip-inner">
        <div class="anki-flip-front">
          <div class="anki-shell">
            <div class="card">
              <div class="card-wrap front-face">
                <div class="meaning-wrap">
                  <p class="meaning">My name is Raj.</p>
                </div>
                <div class="chips" style="margin-top:.9rem;">
                  <span class="reg reg-standard">standard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="anki-flip-back">
          <div id="ps-flip-2-back"></div>
        </div>
      </div>
      <p class="anki-flip-hint">Click to flip</p>
    </div>

  </div><!-- /.anki-mode-area -->

</div>
  `.trim();
};
