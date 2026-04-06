// PageDeliver component — Deliver page for the 3-page demo.
// Shows selected words and sentences, AnkiConnect status, and the Send to Anki CTA.
// Exports window.PageDeliver() → HTML string, window.PageDeliverStyles → CSS string.

window.PageDeliverStyles = `

  /* ── Deliver page layout ────────────────────────────────── */
  .deliver-page {
    padding-top: 2rem;
  }

  /* ── Deliver page header ────────────────────────────────── */
  .deliver-header {
    margin-bottom: 2rem;
  }

  .deliver-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #e2e8f0;
    line-height: 1.1;
    margin-bottom: 0.3rem;
  }

  .deliver-subtitle {
    font-size: 0.875rem;
    color: #475569;
  }

  /* ── AnkiConnect status bar ─────────────────────────────── */
  /*
   * Sits at the top of the page just below the header — prominent but not
   * distracting. Green dot + label when connected; amber dot + label when offline.
   */
  .anki-status-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.125rem;
    background: rgba(15,23,42,0.7);
    border: 1px solid rgba(51,65,85,0.4);
    border-radius: 10px;
    margin-bottom: 2rem;
  }

  .anki-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    /* Subtle pulse animation for connected state */
    animation: status-pulse 2.5s ease-in-out infinite;
  }

  .anki-status-dot-connected {
    background: #4ade80; /* green-400 */
    box-shadow: 0 0 0 0 rgba(74,222,128,0.5);
  }

  .anki-status-dot-offline {
    background: #fbbf24; /* amber — not red, avoids hard-error feel */
    box-shadow: none;
    animation: none;
  }

  @keyframes status-pulse {
    0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
    70%  { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
    100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
  }

  .anki-status-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #94a3b8;
  }

  .anki-status-label strong {
    color: #e2e8f0;
    font-weight: 700;
  }

  .anki-status-connected .anki-status-label strong { color: #4ade80; }
  .anki-status-offline  .anki-status-label strong { color: #fbbf24; }

  .anki-status-spacer { flex: 1; }

  .anki-status-deck {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #475569;
    white-space: nowrap;
  }

  /* ── Selected items list (compact) ─────────────────────── */
  /*
   * Replaces the old 2-column summary grid.
   * Items are single-line rows — Hindi · romanisation · English + POS right-aligned.
   * Two sections: WORDS and SENTENCES with hairline group-header separators.
   */
  .deliver-items {
    margin-bottom: 2rem;
  }

  /* Section header row — mirrors card-group-header style */
  .deliver-items-section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0;
    margin-top: 0.5rem;
  }

  .deliver-items-section-header:first-child {
    margin-top: 0;
  }

  .deliver-items-section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #475569;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .deliver-items-section-count {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #fbbf24;
    background: rgba(251,191,36,0.1);
    border: 1px solid rgba(251,191,36,0.2);
    border-radius: 20px;
    padding: 0.1rem 0.55rem;
    flex-shrink: 0;
  }

  .deliver-items-section-line {
    flex: 1;
    height: 0;
    border-bottom: 1px solid rgba(51,65,85,0.3);
  }

  /* Item rows */
  .deliver-row-list {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
  }

  .deliver-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 36px;
    padding: 0 0.25rem;
    border-bottom: 1px solid rgba(51,65,85,0.25);
    transition: background 0.12s;
  }

  .deliver-row:hover {
    background: rgba(30,41,59,0.4);
  }

  .deliver-row:last-child {
    border-bottom: none;
  }

  /* Remove button — far left */
  .deliver-row-remove {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #475569;
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    border-radius: 3px;
    transition: color 0.15s;
  }

  .deliver-row-remove:hover { color: #fb7185; }

  /* Hindi text */
  .deliver-row-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 14px;
    color: #fbbf24;
    flex-shrink: 0;
    line-height: 1.4;
  }

  /* Middot separator */
  .deliver-row-sep {
    color: #334155;
    font-size: 13px;
    flex-shrink: 0;
    line-height: 1;
    user-select: none;
  }

  /* Romanisation */
  .deliver-row-roman {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #2dd4bf;
    flex-shrink: 0;
  }

  /* English gloss */
  .deliver-row-english {
    font-size: 13px;
    color: #cbd5e1;
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* POS + gender — right-aligned, muted */
  .deliver-row-meta {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    color: #475569;
    flex-shrink: 0;
    text-align: right;
    white-space: nowrap;
  }

  /* Register badge for sentence rows */
  .deliver-row-badge {
    flex-shrink: 0;
  }

  /* ── Send to Anki hero button ───────────────────────────── */
  .deliver-action {
    text-align: center;
    padding: 2rem 0 1.5rem;
  }

  .send-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: rgba(0,0,0,0.85);
    background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%);
    border: none;
    border-radius: 12px;
    padding: 1rem 2.5rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
    box-shadow:
      0 4px 16px rgba(251,191,36,0.35),
      0 2px 6px rgba(249,115,22,0.25),
      inset 0 1px 0 rgba(255,255,255,0.2);
  }

  /* Subtle gloss sheen */
  .send-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(180deg, rgba(255,255,255,0.15), transparent);
    border-radius: 12px 12px 0 0;
    pointer-events: none;
  }

  .send-btn:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 28px rgba(251,191,36,0.45),
      0 4px 12px rgba(249,115,22,0.3),
      inset 0 1px 0 rgba(255,255,255,0.2);
    filter: brightness(1.05);
  }

  .send-btn:active {
    transform: translateY(0);
    box-shadow:
      0 2px 8px rgba(251,191,36,0.3),
      inset 0 1px 0 rgba(255,255,255,0.15);
  }

  .send-btn-icon {
    font-size: 1.1rem;
    line-height: 1;
  }

  .send-btn-text {}

  .deliver-action-meta {
    margin-top: 0.875rem;
    font-size: 0.8125rem;
    color: #475569;
    line-height: 1.6;
  }

  .deliver-action-meta strong {
    color: #64748b;
    font-weight: 600;
  }

  /* ── Empty state ────────────────────────────────────────── */
  /*
   * Shown when nothing is selected. Centered, unobtrusive — just a gentle
   * nudge to go back to Words or Sentences.
   */
  .deliver-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    gap: 1rem;
  }

  .deliver-empty-icon {
    font-size: 2.5rem;
    line-height: 1;
    opacity: 0.3;
  }

  .deliver-empty-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #475569;
  }

  .deliver-empty-body {
    font-size: 0.875rem;
    color: #334155;
    line-height: 1.65;
    max-width: 22rem;
  }

  /* ── Deck configuration section ────────────────────────── */
  .deck-config-section {
    margin-bottom: 2rem;
  }

  .deck-config-section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #475569;
    margin-bottom: 1rem;
    display: block;
  }

  .deck-config-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 540px) {
    .deck-config-grid { grid-template-columns: 1fr; }
  }

  .deck-config-block {
    background: linear-gradient(145deg, #131f35 0%, #0f172a 100%);
    border: 1px solid rgba(51,65,85,0.5);
    border-radius: 14px;
    padding: 1.125rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .deck-config-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #64748b;
    margin-bottom: 0.25rem;
    display: block;
  }

  .deck-config-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .deck-input-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .deck-input-sublabel {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    color: #475569;
  }

  .deck-input {
    background: rgba(15,23,42,0.6);
    border: 1px solid rgba(51,65,85,0.5);
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #e2e8f0;
    outline: none;
    width: 100%;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .deck-input:focus {
    border-color: rgba(251,191,36,0.6);
    box-shadow: 0 0 0 2px rgba(251,191,36,0.15);
  }

  .deck-config-preview {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #64748b;
    padding-top: 0.25rem;
    border-top: 1px solid rgba(51,65,85,0.25);
  }

  /* ── Send confirmation lines ────────────────────────────── */
  .deliver-confirm-lines {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.25rem;
  }

  .deliver-confirm-line {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.8125rem;
    color: #64748b;
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
  }

  .deliver-confirm-count {
    color: #94a3b8;
    font-weight: 600;
  }

  .deliver-confirm-arrow {
    color: #334155;
    font-size: 11px;
  }

  .deliver-confirm-deck {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #fbbf24;
    opacity: 0.8;
  }

  /* Toggle between populated and empty state */
  .deliver-populated { display: block; }
  .deliver-empty-state { display: none; }

  .deliver-showing-empty .deliver-populated { display: none; }
  .deliver-showing-empty .deliver-empty-state { display: flex; }
`;

/**
 * Render the Deliver page.
 * Shows the populated state (words + sentences selected, send button).
 * An empty state is embedded and toggled via a demo button.
 * @returns {string} HTML string
 */
window.PageDeliver = function () {
  return `
<div id="page-deliver" class="page">
<div class="deliver-page">

  <!-- Page header -->
  <div class="deliver-header">
    <h1 class="deliver-title">Deliver</h1>
    <p class="deliver-subtitle">Review your selection and send to Anki</p>
  </div>

  <!-- AnkiConnect status bar -->
  <div class="anki-status-bar anki-status-connected">
    <span class="anki-status-dot anki-status-dot-connected"></span>
    <span class="anki-status-label"><strong>AnkiConnect</strong> &nbsp;Connected</span>
    <span class="anki-status-spacer"></span>
    <span class="anki-status-deck">localhost:8765</span>
  </div>

  <!-- Deck configuration -->
  <div class="deck-config-section">
    <span class="deck-config-section-title">Deck Configuration</span>
    <div class="deck-config-grid">

      <!-- Words deck -->
      <div class="deck-config-block">
        <span class="deck-config-label">Words Deck</span>
        <div class="deck-config-inputs">
          <div class="deck-input-wrap">
            <span class="deck-input-sublabel">Main deck</span>
            <input class="deck-input" type="text" value="Hindi" placeholder="Hindi" />
          </div>
          <div class="deck-input-wrap">
            <span class="deck-input-sublabel">Subdeck</span>
            <input class="deck-input" type="text" value="Words01" placeholder="Words01" />
          </div>
        </div>
        <div class="deck-config-preview">Hindi::Words01</div>
      </div>

      <!-- Sentences deck -->
      <div class="deck-config-block">
        <span class="deck-config-label">Sentences Deck</span>
        <div class="deck-config-inputs">
          <div class="deck-input-wrap">
            <span class="deck-input-sublabel">Main deck</span>
            <input class="deck-input" type="text" value="Hindi" placeholder="Hindi" />
          </div>
          <div class="deck-input-wrap">
            <span class="deck-input-sublabel">Subdeck</span>
            <input class="deck-input" type="text" value="Sentences01" placeholder="Sentences01" />
          </div>
        </div>
        <div class="deck-config-preview">Hindi::Sentences01</div>
      </div>

    </div>
  </div>

  <!-- Populated state: selected items + send button -->
  <div class="deliver-populated" id="deliver-main">

    <!-- Selected items compact list -->
    <div class="deliver-items">

      <!-- Words section header -->
      <div class="deliver-items-section-header">
        <span class="deliver-items-section-label">Words</span>
        <span class="deliver-items-section-count">3</span>
        <span class="deliver-items-section-line"></span>
      </div>

      <div class="deliver-row-list">

        <div class="deliver-row">
          <button class="deliver-row-remove" aria-label="Remove मैं">✕</button>
          <span class="deliver-row-hindi" lang="hi">मैं</span>
          <span class="deliver-row-sep">·</span>
          <span class="deliver-row-roman">maĩ</span>
          <span class="deliver-row-sep">·</span>
          <span class="deliver-row-english">I</span>
          <span class="deliver-row-meta">pronoun</span>
        </div>

        <div class="deliver-row">
          <button class="deliver-row-remove" aria-label="Remove बारिश">✕</button>
          <span class="deliver-row-hindi" lang="hi">बारिश</span>
          <span class="deliver-row-sep">·</span>
          <span class="deliver-row-roman">bāriś</span>
          <span class="deliver-row-sep">·</span>
          <span class="deliver-row-english">rain</span>
          <span class="deliver-row-meta">noun · fem.</span>
        </div>

        <div class="deliver-row">
          <button class="deliver-row-remove" aria-label="Remove खाना">✕</button>
          <span class="deliver-row-hindi" lang="hi">खाना</span>
          <span class="deliver-row-sep">·</span>
          <span class="deliver-row-roman">khānā</span>
          <span class="deliver-row-sep">·</span>
          <span class="deliver-row-english">food</span>
          <span class="deliver-row-meta">noun · masc.</span>
        </div>

      </div>

      <!-- Sentences section header -->
      <div class="deliver-items-section-header">
        <span class="deliver-items-section-label">Sentences</span>
        <span class="deliver-items-section-count">2</span>
        <span class="deliver-items-section-line"></span>
      </div>

      <div class="deliver-row-list">

        <div class="deliver-row">
          <button class="deliver-row-remove" aria-label="Remove sentence">✕</button>
          <span class="deliver-row-hindi" lang="hi">क्या आप कमला जी हैं?</span>
          <span class="deliver-row-sep">·</span>
          <span class="deliver-row-english">Are you Kamala?</span>
          <span class="deliver-row-badge"><span class="reg reg-formal" style="font-size:11px;padding:0.1rem 0.45rem;">formal</span></span>
        </div>

        <div class="deliver-row">
          <button class="deliver-row-remove" aria-label="Remove sentence">✕</button>
          <span class="deliver-row-hindi" lang="hi">मेरा नाम राज है।</span>
          <span class="deliver-row-sep">·</span>
          <span class="deliver-row-english">My name is Raj.</span>
          <span class="deliver-row-badge"><span class="reg reg-standard" style="font-size:11px;padding:0.1rem 0.45rem;">standard</span></span>
        </div>

      </div>

    </div>

    <!-- Send to Anki hero action -->
    <div class="deliver-action">
      <!-- Confirmation lines: what goes where -->
      <div class="deliver-confirm-lines">
        <div class="deliver-confirm-line">
          <span class="deliver-confirm-count">3 word cards</span>
          <span class="deliver-confirm-arrow">→</span>
          <span class="deliver-confirm-deck">Hindi::Words01</span>
        </div>
        <div class="deliver-confirm-line">
          <span class="deliver-confirm-count">2 sentence cards</span>
          <span class="deliver-confirm-arrow">→</span>
          <span class="deliver-confirm-deck">Hindi::Sentences01</span>
        </div>
      </div>
      <button class="send-btn" id="send-anki-btn">
        <span class="send-btn-icon">⊙</span>
        <span class="send-btn-text">Send to Anki</span>
      </button>
      <p class="deliver-action-meta">
        <strong>5 cards</strong> across 2 decks
      </p>

      <!-- Demo toggle: switch to empty state -->
      <div style="margin-top:1.75rem;">
        <button
          onclick="document.getElementById('deliver-main').style.display='none'; document.getElementById('deliver-empty').style.display='flex';"
          style="font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#334155;background:none;border:none;cursor:pointer;transition:color 0.15s;"
          onmouseover="this.style.color='#475569'"
          onmouseout="this.style.color='#334155'"
        >
          Preview empty state ↓
        </button>
      </div>
    </div>

  </div>

  <!-- Empty state -->
  <div class="deliver-empty-state" id="deliver-empty" style="display:none;">
    <div class="deliver-empty">
      <span class="deliver-empty-icon">⊙</span>
      <p class="deliver-empty-title">Nothing selected yet</p>
      <p class="deliver-empty-body">
        Go to <strong style="color:#64748b;">Words</strong> or
        <strong style="color:#64748b;">Sentences</strong> and tap the
        circle on any card to add it to your export.
      </p>
      <!-- Demo toggle: back to populated state -->
      <button
        onclick="document.getElementById('deliver-empty').style.display='none'; document.getElementById('deliver-main').style.display='block';"
        style="margin-top:0.5rem;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#334155;background:none;border:none;cursor:pointer;transition:color 0.15s;"
        onmouseover="this.style.color='#475569'"
        onmouseout="this.style.color='#334155'"
      >
        ↑ Back to populated state
      </button>
    </div>
  </div>

</div>
</div>
  `.trim();
};
