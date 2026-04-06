// NavBar component — persistent top navigation bar for the 3-page demo.
// Exports window.NavBar() → HTML string, window.NavBarStyles → CSS string.
//
// Design decision: top bar, not bottom.
// Rationale: the content is vertically rich (expanded word cards with many
// sections). A top bar lets the page header and nav form a cohesive app-chrome
// strip, keeps the full viewport height available for scrollable card content,
// and feels more premium on a 720 px desktop layout. Active state is an amber
// underline tab — minimal, consistent with the existing amber accent language.

window.NavBarStyles = `

  /* ── App chrome wrapper ─────────────────────────────────── */
  /*
   * .app-chrome stacks the nav bar above the page content.
   * It is NOT the scroll container — body scrolls naturally.
   */
  .app-chrome {
    max-width: 720px;
    margin: 0 auto;
  }

  /* ── Nav bar ────────────────────────────────────────────── */
  .nav-bar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(2,6,23,0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(51,65,85,0.4);
    /* Subtle inner top glow — gives the bar depth against the page background */
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4);
    padding: 0 1.5rem;
    display: flex;
    align-items: stretch;
    gap: 0;
    /* Shrink nothing — the bar is always full width */
    width: 100%;
  }

  /* ── Brand mark (left side of bar) ─────────────────────── */
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.875rem 0;
    margin-right: auto;
    text-decoration: none;
  }

  .nav-brand-icon {
    font-size: 1.1rem;
    line-height: 1;
    /* Amber gradient — same as .wc-hindi */
    background: linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-brand-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: #475569;
  }

  /* ── Nav items (right side of bar) ─────────────────────── */
  .nav-items {
    display: flex;
    align-items: stretch;
    gap: 0;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    padding: 0 1.25rem;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #475569;
    position: relative;
    /* Amber underline indicator — sits at the very bottom of the bar */
    transition: color 0.18s ease;
    text-decoration: none;
    min-width: 4.5rem;
  }

  /* Amber underline — starts at 0 width, grows to full on active */
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #fbbf24, #f97316);
    border-radius: 2px 2px 0 0;
    transition: width 0.2s ease;
  }

  .nav-item:hover {
    color: #94a3b8;
  }

  .nav-item:hover::after {
    width: 60%;
  }

  .nav-item.is-active {
    color: #fbbf24;
  }

  .nav-item.is-active::after {
    width: 100%;
  }

  .nav-item-icon {
    font-size: 1rem;
    line-height: 1;
    /* Prevent icon colour from inheriting gradient from parent */
    -webkit-text-fill-color: currentColor;
    background: none;
    -webkit-background-clip: initial;
    background-clip: initial;
  }

  .nav-item.is-active .nav-item-icon {
    /* Amber gradient fill on active icon */
    background: linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-item-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    line-height: 1;
    white-space: nowrap;
  }

  /* ── Page content area ──────────────────────────────────── */
  .page-content {
    padding: 0 1.5rem 5rem;
  }

  /* Each page is hidden/shown by JS */
  .page {
    display: none;
  }

  .page.is-active {
    display: block;
  }
`;

/**
 * Render the persistent top navigation bar.
 * @returns {string} HTML string — includes the bar and an empty #page-content div.
 */
window.NavBar = function () {
  return `
<nav class="nav-bar" role="navigation" aria-label="Main navigation">

  <!-- Brand -->
  <span class="nav-brand" aria-label="HindiWeb">
    <span class="nav-brand-icon">✦</span>
    <span class="nav-brand-name">HindiWeb</span>
  </span>

  <!-- Nav items -->
  <div class="nav-items">

    <button
      class="nav-item is-active"
      id="nav-words"
      onclick="switchPage('words')"
      aria-label="Words"
      aria-current="page"
    >
      <span class="nav-item-icon">◈</span>
      <span class="nav-item-label">Words</span>
    </button>

    <button
      class="nav-item"
      id="nav-sentences"
      onclick="switchPage('sentences')"
      aria-label="Sentences"
    >
      <span class="nav-item-icon">❝</span>
      <span class="nav-item-label">Sentences</span>
    </button>

    <button
      class="nav-item"
      id="nav-deliver"
      onclick="switchPage('deliver')"
      aria-label="Deliver"
    >
      <span class="nav-item-icon">⊙</span>
      <span class="nav-item-label">Deliver</span>
    </button>

  </div>
</nav>
  `.trim();
};
