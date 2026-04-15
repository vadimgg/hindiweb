// PageWords component — Words page for the 3-page demo.
// Shows a page header, filter panel, group date dividers, and word cards
// with selection circles. One card expanded (selected), one collapsed (unselected).
// Includes a Web / Anki view mode toggle in the header row.
// Exports window.PageWords() → HTML string, window.PageWordsStyles → CSS string.

window.PageWordsStyles = `

  /* ── Page header ────────────────────────────────────────── */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 2rem 0 1.75rem;
    gap: 1rem;
  }

  .page-header-text {}

  .page-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #e2e8f0;
    line-height: 1.1;
    margin-bottom: 0.3rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
    color: #475569;
    line-height: 1.5;
  }

  /* Filter button in header — same design as existing .filter-btn */
  .page-filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(51,65,85,0.4);
    background: rgba(15,23,42,0.7);
    color: #94a3b8;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s, color 0.15s;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .page-filter-btn:hover {
    border-color: rgba(51,65,85,0.7);
    color: #cbd5e1;
  }

  .page-filter-btn.is-active {
    border-color: rgba(251,191,36,1);
    color: #fbbf24;
    box-shadow: 0 0 0 2px rgba(251,191,36,0.15);
  }

  .page-filter-btn-icon {
    font-size: 13px;
    line-height: 1;
  }

  /* ── Filter panel (reused inline — not from filter-panel.js) */
  .pw-filter-panel {
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

  .pw-filter-panel.is-hidden {
    display: none;
  }

  .pw-filter-search-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .pw-filter-search-input {
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

  .pw-filter-search-input::placeholder {
    color: #475569;
  }

  .pw-filter-search-input:focus {
    border-color: rgba(251,191,36,0.4);
    box-shadow: 0 0 0 2px rgba(251,191,36,0.1);
  }

  .pw-filter-search-clear {
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

  .pw-filter-search-clear:hover { color: #e2e8f0; }

  .pw-filter-group-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 2px;
  }

  .pw-filter-group-row::-webkit-scrollbar { display: none; }

  .pw-filter-chip {
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

  .pw-filter-chip.is-active {
    background: rgba(251,191,36,0.15);
    border-color: rgba(251,191,36,0.5);
    color: #fbbf24;
  }

  .pw-filter-results {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.25rem;
    border-top: 1px solid rgba(51,65,85,0.3);
  }

  .pw-filter-count {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    color: #475569;
  }

  .pw-filter-count strong { color: #64748b; font-weight: 600; }

  .pw-filter-clear {
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

  .pw-filter-clear:hover { opacity: 0.7; }

  /* ── Selection count badge ──────────────────────────────── */
  .page-selection-badge {
    display: inline-flex;
    align-items: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #fbbf24;
    background: rgba(251,191,36,0.12);
    border: 1px solid rgba(251,191,36,0.3);
    border-radius: 99px;
    padding: 2px 10px;
    margin-left: 0.75rem;
    vertical-align: middle;
  }

  .page-selection-badge.is-hidden {
    display: none;
  }

  /* ── Drag-to-select hint ────────────────────────────────── */
  .drag-select-hint {
    font-size: 11px;
    color: #475569;
    font-style: italic;
    margin-bottom: 1rem;
    margin-top: -0.5rem;
  }

  /* ── Group / chapter section dividers ───────────────────── */
  /*
   * Chapter-title style — clean type + hairline rule + count pill.
   * Not sticky: these are landmarks, not persistent labels.
   * Now collapsible: clicking the header toggles cards visibility.
   */
  .card-group-divider {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  .card-group-divider:first-of-type {
    margin-top: 0;
  }

  .card-group-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    user-select: none;
  }

  .card-group-header:hover .card-group-label {
    color: #64748b;
  }

  /* Group checkbox — 16px square, amber when checked */
  .card-group-checkbox {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1.5px solid rgba(51,65,85,0.6);
    background: transparent;
    flex-shrink: 0;
    position: relative;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }

  .card-group-checkbox.is-checked {
    background: #fbbf24;
    border-color: #fbbf24;
  }

  /* White checkmark for checked state */
  .card-group-checkbox.is-checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%) rotate(45deg);
    width: 4px;
    height: 7px;
    border-right: 2px solid rgba(0,0,0,0.8);
    border-bottom: 2px solid rgba(0,0,0,0.8);
  }

  /* Indeterminate state — amber border + amber dash */
  .card-group-checkbox.is-indeterminate {
    border-color: #fbbf24;
    background: transparent;
  }

  .card-group-checkbox.is-indeterminate::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 2px;
    background: #fbbf24;
    border-radius: 1px;
  }

  .card-group-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #475569;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color 0.15s;
  }

  .card-group-line {
    flex: 1;
    height: 0;
    border-bottom: 1px solid rgba(51,65,85,0.35);
  }

  .card-group-count {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    color: #475569;
    background: rgba(30,41,59,0.6);
    border-radius: 99px;
    padding: 2px 8px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Chevron on group header — rotates when collapsed */
  .card-group-chevron {
    font-size: 12px;
    color: #475569;
    flex-shrink: 0;
    transition: transform 0.2s ease;
    line-height: 1;
  }

  /* Group wrapper with is-collapsed: hides its sibling .card-list */
  .card-group-wrapper.is-collapsed + .card-list {
    display: none;
  }

  .card-group-wrapper.is-collapsed .card-group-chevron {
    transform: rotate(-90deg);
  }

  /* ── Drag-hover state on cards ──────────────────────────── */
  .wc-card.drag-hover,
  .sc-card.drag-hover {
    border-color: rgba(251,191,36,0.5);
    box-shadow: 0 0 0 2px rgba(251,191,36,0.2), 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ── Card list spacing ──────────────────────────────────── */
  .card-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  /* ── Selection circle ───────────────────────────────────── */
  /*
   * Sits in the top-right of the card header, overlapping the card edge.
   * When selected: amber fill + subtle glow. When unselected: hollow ghost ring.
   * The card header uses position:relative so this is anchored correctly.
   */
  .sel-circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 2px solid rgba(51,65,85,0.6);
    background: transparent;
    cursor: pointer;
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
    position: relative;
    margin-top: 0.25rem;
  }

  .sel-circle:hover {
    border-color: rgba(251,191,36,0.5);
    background: rgba(251,191,36,0.08);
  }

  /* Selected state */
  .sel-circle.is-selected {
    border-color: #fbbf24;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    box-shadow: 0 0 0 3px rgba(251,191,36,0.2), 0 0 12px rgba(251,191,36,0.25);
  }

  /* Checkmark inside selected circle */
  .sel-circle.is-selected::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%) rotate(45deg);
    width: 5px;
    height: 8px;
    border-right: 2px solid rgba(0,0,0,0.7);
    border-bottom: 2px solid rgba(0,0,0,0.7);
  }

  /* Selected card gets a very subtle amber border tint */
  .wc-card.is-selected {
    border-color: rgba(251,191,36,0.3);
    box-shadow: 0 0 0 1px rgba(251,191,36,0.15), 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ── View mode toggle (Web / Anki) ──────────────────────── */
  /*
   * Segmented control in the header row, right-aligned.
   * Two buttons: active one is amber-tinted.
   */
  .view-mode-toggle {
    display: inline-flex;
    align-items: stretch;
    border: 1px solid rgba(51,65,85,0.4);
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .view-mode-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 0.4rem 0.75rem;
    background: rgba(15,23,42,0.7);
    border: none;
    color: #64748b;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }

  .view-mode-btn + .view-mode-btn {
    border-left: 1px solid rgba(51,65,85,0.4);
  }

  .view-mode-btn:hover {
    color: #94a3b8;
    background: rgba(30,41,59,0.7);
  }

  .view-mode-btn.is-active {
    background: rgba(251,191,36,0.12);
    color: #fbbf24;
  }

  .view-mode-btn-icon {
    font-size: 12px;
    line-height: 1;
  }

  /* ── Anki mode card area ─────────────────────────────────── */
  .anki-mode-area {
    display: none;
  }

  .anki-mode-notice {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    color: #475569;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .anki-mode-notice strong {
    color: #fbbf24;
    font-weight: 600;
  }

  /* ── Flip card wrapper ───────────────────────────────────── */
  /*
   * The outer .anki-flip-card drives height via JS (Task 1 fix).
   * overflow:hidden clips the absolute back face; transition:height
   * animates the wrapper growing/shrinking as faces swap.
   * The inner .anki-flip-inner rotates; both faces are backface-hidden.
   */
  .anki-flip-card {
    perspective: 1000px;
    cursor: pointer;
    overflow: hidden;
    transition: height 0.35s ease;
    margin-bottom: 2rem;
  }

  .anki-flip-card:last-child {
    margin-bottom: 0;
  }

  .anki-flip-inner {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
  }

  .anki-flip-front,
  .anki-flip-back {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .anki-flip-back {
    transform: rotateY(180deg);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .anki-flip-card.is-flipped .anki-flip-inner {
    transform: rotateY(180deg);
  }

  .anki-flip-hint {
    text-align: center;
    font-size: 11px;
    color: #475569;
    margin-top: 0.5rem;
    transition: opacity 0.2s;
  }

  .anki-flip-card.is-flipped .anki-flip-hint {
    opacity: 0;
    pointer-events: none;
  }

  /* Web mode: show web-card-area, hide anki-mode-area */
  #page-words.mode-web  .web-card-area  { display: block; }
  #page-words.mode-web  .anki-mode-area { display: none; }
  #page-words.mode-anki .web-card-area  { display: none; }
  #page-words.mode-anki .anki-mode-area { display: block; }

  /* ── Morphemes (copied from WordCardStyles) ─────────────── */
  .wc-morphemes-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .wc-morpheme-chip {
    background: #1e293b;
    border: 1px solid rgba(51,65,85,.5);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 6rem;
  }

  .wc-morpheme-part {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.125rem;
    color: #fbbf24;
    line-height: 1.3;
  }

  .wc-morpheme-roman {
    font-family: 'DM Mono', monospace;
    font-size: 0.875rem;
    color: rgba(94,234,212,.7);
  }

  .wc-morpheme-meaning {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .wc-morpheme-origin {
    font-size: 0.75rem;
    color: #475569;
    font-style: italic;
    margin-top: 0.1rem;
  }

  /* ── Delhi note ─────────────────────────────────────────── */
  .wc-delhi-note {
    background: rgba(30,41,59,0.6);
    border: 1px solid rgba(51,65,85,.4);
    border-left: 3px solid rgba(251,191,36,.35);
    border-radius: 0 8px 8px 0;
    padding: 0.875rem 1rem;
    font-size: 0.9375rem;
    color: #cbd5e1;
    line-height: 1.75;
  }

  /* ── Sound-alikes (updated) ─────────────────────────────── */
  .wc-soundalike-part {
    font-family: 'DM Mono', monospace;
    font-size: 1rem;
    color: rgba(94,234,212,.8);
  }

  .wc-soundalike-foreign {
    font-size: 0.9375rem;
    color: #e2e8f0;
    font-style: italic;
  }

  /* ── Example Sentence ───────────────────────────────────── */
  .wc-ex-header {
    margin-bottom: 0.875rem;
  }

  .wc-ex-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.125rem;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.4;
    display: block;
    margin-bottom: 0.25rem;
  }

  .wc-ex-roman {
    font-family: 'DM Mono', monospace;
    font-size: 0.875rem;
    color: rgba(94,234,212,.8);
    display: block;
    margin-bottom: 0.5rem;
  }

  .wc-ex-english {
    font-size: 0.9375rem;
    color: #cbd5e1;
    font-style: italic;
    display: block;
  }

  .wc-ex-breakdown {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 1rem;
    border-top: 1px solid rgba(51,65,85,.3);
  }

  .wc-ex-token {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(51,65,85,.22);
  }

  .wc-ex-token:last-child {
    border-bottom: none;
  }

  .wc-ex-token-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1rem;
    color: #fbbf24;
    min-width: 3.5rem;
    flex-shrink: 0;
  }

  .wc-ex-token-roman {
    font-family: 'DM Mono', monospace;
    font-size: 0.8125rem;
    color: rgba(94,234,212,.7);
    min-width: 3.5rem;
    flex-shrink: 0;
  }

  .wc-ex-token-meaning {
    font-size: 0.875rem;
    color: #64748b;
  }
`;

/**
 * Render the Words page.
 * Shows a page header, collapsible filter panel, group date dividers,
 * and two word cards — one expanded + selected, one collapsed + unselected.
 * @param {object} word - demoWord object
 * @returns {string} HTML string
 */
window.PageWords = function (word) {
  const formsHtml = (word.forms || []).map(f => `
    <div class="wc-form-chip">
      <span class="wc-form-chip-label">${f.label}</span>
      <span class="wc-form-chip-hindi" lang="hi">${f.hindi}</span>
      <span class="wc-form-chip-roman">${f.roman}</span>
    </div>
  `).join('');

  const usageArr = Array.isArray(word.usage_notes)
    ? word.usage_notes
    : word.usage_notes ? [word.usage_notes] : [];
  const usageHtml = usageArr.map(n => `
    <p class="wc-usage-note">${n}</p>
  `).join('');

  const relatedHtml = (word.related_words || []).map(r => `
    <div class="wc-related-chip">
      <span class="wc-related-hindi" lang="hi">${r.hindi}</span>
      <span class="wc-related-roman">${r.roman}</span>
      <span class="wc-related-english">${r.english}</span>
    </div>
  `).join('');

  const morphemesHtml = (word.morphemes || []).map(m => `
    <div class="wc-morpheme-chip">
      <span class="wc-morpheme-part" lang="hi">${m.part}</span>
      <span class="wc-morpheme-roman">${m.roman}</span>
      <span class="wc-morpheme-meaning">${m.meaning}</span>
      ${m.origin ? `<span class="wc-morpheme-origin">${m.origin}</span>` : ''}
    </div>
  `).join('');

  const soundalikesHtml = (word.sound_alikes || []).map(s => `
    <div class="wc-soundalike">
      <div class="wc-soundalike-top">
        <span class="wc-soundalike-part">${s.part}</span>
        <span class="wc-soundalike-via">sounds like</span>
        <span class="wc-soundalike-foreign">${s.association}</span>
        <span class="wc-soundalike-via">(${s.language})</span>
      </div>
      <p class="wc-soundalike-assoc">${s.note || s.association}</p>
    </div>
  `).join('');

  const exHtml = word.example_sentence ? (() => {
    const ex = word.example_sentence;
    const breakdownHtml = (ex.breakdown || []).map(t => `
      <div class="wc-ex-token">
        <span class="wc-ex-token-hindi" lang="hi">${t.hindi}</span>
        <span class="wc-ex-token-roman">${t.roman}</span>
        <span class="wc-ex-token-meaning">— ${t.meaning}</span>
      </div>
    `).join('');
    return `
      <div class="wc-ex-header">
        <span class="wc-ex-hindi" lang="hi">${ex.hindi}</span>
        <span class="wc-ex-roman">${ex.roman}</span>
        <span class="wc-ex-english">${ex.english}</span>
      </div>
      ${breakdownHtml ? `<div class="wc-ex-breakdown">${breakdownHtml}</div>` : ''}
    `;
  })() : '';

  const collocsHtml = (word.collocations || []).map(c => `
    <div class="wc-colloc-row">
      <div class="wc-colloc-left">
        <span class="wc-colloc-hindi" lang="hi">${c.hindi}</span>
        <span class="wc-colloc-roman">${c.roman}</span>
      </div>
      <span class="wc-colloc-english">${c.english}</span>
    </div>
  `).join('');

  const etymHtml = (word.etymology_journey || word.etymology || []).map(e => `
    <div class="wc-etym-stage">
      <div class="wc-etym-label-col">
        <span class="wc-etym-stage-label">${e.stage || e.label}</span>
      </div>
      <div class="wc-etym-content">
        <span class="wc-etym-hindi" lang="hi">${e.form || e.hindi}</span>
        <span class="wc-etym-roman">${e.roman}</span>
        ${e.meaning ? `<span class="wc-etym-meaning">— ${e.meaning}</span>` : ''}
      </div>
    </div>
  `).join('');

  return `
<div id="page-words" class="page is-active mode-web">

  <!-- Page header -->
  <div class="page-header">
    <div class="page-header-text">
      <h1 class="page-title">Words <span class="page-selection-badge">8 selected</span></h1>
      <p class="page-subtitle">Select vocabulary to export</p>
    </div>
    <!-- Header controls: filter + view mode toggle -->
    <div style="display:flex;align-items:flex-start;gap:0.5rem;flex-shrink:0;">
      <button class="page-filter-btn" id="pw-filter-btn" aria-expanded="false">
        <span class="page-filter-btn-icon">▿</span>
        <span>Filter</span>
      </button>
      <div class="view-mode-toggle" role="group" aria-label="View mode">
        <button class="view-mode-btn is-active" id="pw-mode-web" onclick="setViewMode('words','web')" aria-pressed="true">
          <span class="view-mode-btn-icon">≋</span>
          <span>Web</span>
        </button>
        <button class="view-mode-btn" id="pw-mode-anki" onclick="setViewMode('words','anki')" aria-pressed="false">
          <span class="view-mode-btn-icon">◈</span>
          <span>Anki</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Web mode: filter panel + group-based card list -->
  <div class="web-card-area">

  <!-- Filter panel (collapsed by default) -->
  <div class="pw-filter-panel is-hidden" id="pw-filter-panel">
    <div class="pw-filter-search-wrap">
      <input
        class="pw-filter-search-input"
        type="text"
        placeholder="Search मैं, maĩ, I…"
        readonly
      />
      <button class="pw-filter-search-clear" aria-label="Clear search">✕</button>
    </div>
    <div class="pw-filter-group-row">
      <button class="pw-filter-chip is-active">All</button>
      <button class="pw-filter-chip">April 2026</button>
      <button class="pw-filter-chip">March 2026</button>
      <button class="pw-filter-chip">February 2026</button>
    </div>
    <div class="pw-filter-results">
      <span class="pw-filter-count">Showing <strong>47</strong> words</span>
      <button class="pw-filter-clear">Clear all</button>
    </div>
  </div>

  <!-- Drag-to-select hint -->
  <p class="drag-select-hint">Drag to select multiple</p>

  <!-- Group: Complete Hindi, Chapter 01 — EXPANDED, checkbox checked -->
  <div class="card-group-wrapper" id="cgw-ch01">
  <div class="card-group-divider">
    <div class="card-group-header" onclick="toggleGroupCollapse('cgw-ch01'); event.stopPropagation();">
      <span class="card-group-checkbox is-checked" role="checkbox" aria-checked="true" aria-label="Select all in Complete Hindi, Chapter 01" onclick="toggleGroupCheckbox(this, 'cgw-ch01'); event.stopPropagation();"></span>
      <span class="card-group-label">Complete Hindi, Chapter 01</span>
      <span class="card-group-line"></span>
      <span class="card-group-count">12 words</span>
      <span class="card-group-chevron">▾</span>
    </div>
  </div>
  </div>

  <div class="card-list" data-group="cgw-ch01">

    <!-- Card 1 — expanded + SELECTED -->
    <article class="wc-card is-selected" id="pw-card-1">
      <div class="wc-header card-header" role="button" aria-expanded="true" data-card="pw-card-1">
        <div class="wc-header-content">
          <span class="wc-hindi" lang="hi">${word.hindi}</span>
          <span class="wc-roman">${word.romanisation}</span>
          <span class="wc-syllables">${word.syllables}</span>
          <div class="wc-grammar-row">
            <span class="badge badge-noun">${word.pos}</span>
            <span class="badge badge-masc">masc.</span>
          </div>
        </div>
        <!-- Selection circle — amber = selected -->
        <button
          class="sel-circle is-selected"
          aria-label="Deselect ${word.hindi}"
          onclick="toggleWordSelection(this, 'pw-card-1'); event.stopPropagation();"
        ></button>
        <span class="wc-collapse-icon" style="margin-left:0.5rem;">▾</span>
      </div>

      <div class="wc-body">
        ${(word.forms && word.forms.length) ? `
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Forms</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <div class="wc-forms-row">${formsHtml}</div>
          </div>
        </details>` : ''}
        ${(word.morphemes && word.morphemes.length) ? `
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Morphemes</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <div class="wc-morphemes-row">${morphemesHtml}</div>
          </div>
        </details>` : ''}
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Usage Notes</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <div class="wc-usage-list">${usageHtml}</div>
          </div>
        </details>
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Related Words</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <div class="wc-related-list">${relatedHtml}</div>
          </div>
        </details>
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Sound Alikes</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">${soundalikesHtml}</div>
        </details>
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Collocations</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <div class="wc-colloc-list">${collocsHtml}</div>
          </div>
        </details>
        ${word.example_sentence ? `
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Example</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">${exHtml}</div>
        </details>` : ''}
        ${word.delhi_note ? `
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Delhi Usage</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <p class="wc-delhi-note">${word.delhi_note}</p>
          </div>
        </details>` : ''}
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Etymology</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <div class="wc-etym-chain">${etymHtml}</div>
            ${word.origin_note ? `<p class="wc-origin-note">${word.origin_note}</p>` : ''}
          </div>
        </details>
      </div>
    </article>

    <!-- Card 2 — collapsed + UNSELECTED (a second demo word) -->
    <article class="wc-card is-collapsed" id="pw-card-2">
      <div class="wc-header card-header" role="button" aria-expanded="false" data-card="pw-card-2">
        <div class="wc-header-content">
          <span class="wc-hindi" lang="hi">बारिश</span>
          <span class="wc-roman">bāriś</span>
          <span class="wc-syllables">bā·riś</span>
          <div class="wc-grammar-row">
            <span class="badge badge-noun">noun</span>
            <span class="badge badge-masc" style="background:linear-gradient(135deg,rgba(236,72,153,0.15),rgba(190,24,93,0.08));color:#f9a8d4;border-color:rgba(249,168,212,0.2);">fem.</span>
          </div>
        </div>
        <button
          class="sel-circle"
          aria-label="Select बारिश"
          onclick="toggleWordSelection(this, 'pw-card-2'); event.stopPropagation();"
        ></button>
        <span class="wc-collapse-icon" style="margin-left:0.5rem;">▾</span>
      </div>
      <div class="wc-body">
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Forms</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <div class="wc-forms-row">
              <div class="wc-form-chip">
                <span class="wc-form-chip-label">Oblique</span>
                <span class="wc-form-chip-hindi" lang="hi">बारिश</span>
                <span class="wc-form-chip-roman">bāriś</span>
              </div>
              <div class="wc-form-chip">
                <span class="wc-form-chip-label">Plural</span>
                <span class="wc-form-chip-hindi" lang="hi">बारिशें</span>
                <span class="wc-form-chip-roman">bāriśẽ</span>
              </div>
            </div>
          </div>
        </details>
        <details class="wc-section" open>
          <summary>
            <span class="wc-section-label">Usage Notes</span>
            <span class="wc-section-chevron">▾</span>
          </summary>
          <div class="wc-section-body">
            <div class="wc-usage-list">
              <p class="wc-usage-note">बारिश is the colloquial word for rain in Hindi, derived from Persian. It is used in everyday speech across all registers.</p>
            </div>
          </div>
        </details>
      </div>
    </article>

  </div>

  <!-- Group: Spoken Hindi Basics — COLLAPSED by default, checkbox indeterminate -->
  <div class="card-group-wrapper is-collapsed" id="cgw-basics">
  <div class="card-group-divider">
    <div class="card-group-header" onclick="toggleGroupCollapse('cgw-basics'); event.stopPropagation();">
      <span class="card-group-checkbox is-indeterminate" role="checkbox" aria-checked="mixed" aria-label="Select all in Spoken Hindi Basics" onclick="toggleGroupCheckbox(this, 'cgw-basics'); event.stopPropagation();"></span>
      <span class="card-group-label">Spoken Hindi Basics</span>
      <span class="card-group-line"></span>
      <span class="card-group-count">8 words</span>
      <span class="card-group-chevron">▾</span>
    </div>
  </div>
  </div>

  <div class="card-list" data-group="cgw-basics" style="opacity:0.45;pointer-events:none;">
    <!-- Faded placeholder cards to suggest more content below -->
    <article class="wc-card is-collapsed">
      <div class="wc-header" style="cursor:default;">
        <div class="wc-header-content">
          <span class="wc-hindi" lang="hi">खाना</span>
          <span class="wc-roman">khānā</span>
          <span class="wc-syllables">khā·nā</span>
          <div class="wc-grammar-row">
            <span class="badge badge-noun">noun</span>
            <span class="badge badge-masc">masc.</span>
          </div>
        </div>
        <span class="wc-collapse-icon" style="transform:rotate(-90deg);">▾</span>
      </div>
    </article>
    <article class="wc-card is-collapsed">
      <div class="wc-header" style="cursor:default;">
        <div class="wc-header-content">
          <span class="wc-hindi" lang="hi">घर</span>
          <span class="wc-roman">ghar</span>
          <span class="wc-syllables">ghar</span>
          <div class="wc-grammar-row">
            <span class="badge badge-noun">noun</span>
            <span class="badge badge-masc">masc.</span>
          </div>
        </div>
        <span class="wc-collapse-icon" style="transform:rotate(-90deg);">▾</span>
      </div>
    </article>
  </div>

  </div><!-- /.web-card-area -->

  <!-- Anki mode: flat list of flip cards for selected words only -->
  <div class="anki-mode-area" id="pw-anki-area">
    <p class="anki-mode-notice">Showing Anki cards for <strong>2</strong> selected words · Click a card to flip</p>

    <!-- Flip card 1: मैं -->
    <div class="anki-flip-card" id="pw-flip-1">
      <div class="anki-flip-inner">
        <div class="anki-flip-front">
          <div class="anki-shell">
            <div class="card">
              <div class="card-wrap front-face">
                <div class="meaning-wrap">
                  <p class="meaning">${word.english}</p>
                </div>
                <div class="chips">
                  <span class="badge-neutral-anki">${word.pos}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="anki-flip-back">
          <!-- Back face injected by index.html after AnkiCard() is available -->
          <div id="pw-flip-1-back"></div>
        </div>
      </div>
      <p class="anki-flip-hint">Click to flip</p>
    </div>

    <!-- Flip card 2: बारिश (second selected word) -->
    <div class="anki-flip-card" id="pw-flip-2">
      <div class="anki-flip-inner">
        <div class="anki-flip-front">
          <div class="anki-shell">
            <div class="card">
              <div class="card-wrap front-face">
                <div class="meaning-wrap">
                  <p class="meaning">rain</p>
                </div>
                <div class="chips">
                  <span class="badge-neutral-anki">noun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="anki-flip-back">
          <div id="pw-flip-2-back"></div>
        </div>
      </div>
      <p class="anki-flip-hint">Click to flip</p>
    </div>

  </div><!-- /.anki-mode-area -->

</div>
  `.trim();
};
