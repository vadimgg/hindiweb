// PageAnki component — Anki Preview page for the 4-page demo.
// Shows a read-only preview of how selected words and sentences will look
// as Anki cards before sending. Uses existing AnkiCard() and AnkiSentenceCard().
// Exports window.PageAnki() → HTML string, window.PageAnkiStyles → CSS string.

window.PageAnkiStyles = `

  /* ── Anki preview page layout ───────────────────────────── */
  .anki-preview-page {
    padding-top: 2rem;
  }

  /* ── Anki preview header ────────────────────────────────── */
  .anki-preview-header {
    margin-bottom: 1.25rem;
  }

  .anki-preview-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #e2e8f0;
    line-height: 1.1;
    margin-bottom: 0.3rem;
  }

  .anki-preview-subtitle {
    font-size: 0.875rem;
    color: #475569;
  }

  /* ── Anki page search bar ───────────────────────────────── */
  .anki-search-bar {
    margin-bottom: 2rem;
  }

  .anki-search-wrap {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;
  }

  .anki-search-input {
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

  .anki-search-input::placeholder {
    color: #475569;
  }

  .anki-search-input:focus {
    border-color: rgba(251,191,36,0.4);
    box-shadow: 0 0 0 2px rgba(251,191,36,0.1);
  }

  .anki-search-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    color: #475569;
    pointer-events: none;
  }

  .anki-search-count {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    color: #475569;
  }

  /* ── Sub-section (Word Cards / Sentence Cards) ──────────── */
  .anki-preview-section {
    margin-bottom: 3rem;
  }

  .anki-preview-section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .anki-preview-section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #475569;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .anki-preview-section-count {
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

  .anki-preview-section-line {
    flex: 1;
    height: 0;
    border-bottom: 1px solid rgba(51,65,85,0.3);
  }

  /* ── Card preview items — stacked, separated ────────────── */
  .anki-preview-item {
    margin-bottom: 2.5rem;
  }

  .anki-preview-item:last-child {
    margin-bottom: 0;
  }

  .anki-preview-item-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #334155;
    margin-bottom: 0.75rem;
  }

  /* ── Card flip animation ────────────────────────────────── */
  .anki-flip-card {
    perspective: 1000px;
    cursor: pointer;
  }

  .anki-flip-inner {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
  }

  .anki-flip-card.is-flipped .anki-flip-inner {
    transform: rotateY(180deg);
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

  /* Spacer that matches the back panel height so the container doesn't collapse */
  .anki-flip-card .anki-flip-front {
    display: block;
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
`;

/**
 * Render the Anki Preview page.
 * Shows selected word cards and sentence cards as read-only Anki previews.
 * @param {object} word - demoWord object
 * @param {object} sentence - demoSentence object
 * @returns {string} HTML string
 */
window.PageAnki = function (word, sentence) {
  // Second word demo — same shape as demoWord but different content
  const word2 = {
    hindi: 'बारिश',
    roman: 'bāriś',
    syllables: 'bā·riś',
    english: 'rain',
    pos: 'noun',
    gender: 'feminine',
    usage_notes: [
      'बारिश is the colloquial word for rain in Hindi, derived from Persian. Used across all registers.',
    ],
    related_words: [
      { hindi: 'वर्षा', roman: 'varṣā', english: 'rain (formal/Sanskrit)' },
    ],
    sound_alikes: [],
    collocations: [
      { hindi: 'बारिश होना', roman: 'bāriś honā', english: 'to rain' },
      { hindi: 'बारिश में', roman: 'bāriś mẽ', english: 'in the rain' },
    ],
    etymology: [
      { label: 'Persian', hindi: 'بارش', roman: 'bāriś', meaning: 'rainfall' },
      { label: 'Hindi', hindi: 'बारिश', roman: 'bāriś', meaning: 'rain' },
    ],
  };

  // Second sentence demo
  const sentence2 = {
    hindi: 'नमस्ते, आप कैसे हैं?',
    roman: 'namaste, āp kaise haĩ?',
    english: 'Hello, how are you?',
    register: 'formal',
    literal: 'Greetings, you how are?',
    words: [
      { hindi: 'नमस्ते', roman: 'namaste', meaning: 'hello / greetings' },
      { hindi: 'आप', roman: 'āp', meaning: 'you (formal)' },
      { hindi: 'कैसे', roman: 'kaise', meaning: 'how' },
      { hindi: 'हैं', roman: 'haĩ', meaning: 'are (plural/formal copula)' },
    ],
  };

  /**
   * Build a flip card wrapper given a word's front face and back face HTML.
   * @param {string} frontHtml - HTML for the front face (.anki-shell)
   * @param {string} backHtml  - HTML for the back face (.anki-shell)
   * @param {string} id        - unique id for the flip card element
   * @returns {string} HTML string
   */
  function buildWordFlip(frontHtml, backHtml, id) {
    return `
<div class="anki-flip-card" id="${id}">
  <div class="anki-flip-inner">
    <div class="anki-flip-front">
      ${frontHtml}
    </div>
    <div class="anki-flip-back">
      ${backHtml}
    </div>
  </div>
  <p class="anki-flip-hint">Click to flip</p>
</div>`.trim();
  }

  /**
   * Build the front face shell for a word card (English + POS).
   * @param {object} w - word object
   * @returns {string} HTML string
   */
  function wordFrontShell(w) {
    return `
<div class="anki-shell">
  <div class="card">
    <div class="card-wrap front-face">
      <div class="meaning-wrap">
        <p class="meaning">${w.english}</p>
      </div>
      <div class="chips">
        <span class="badge-neutral-anki">${w.pos}</span>
      </div>
    </div>
  </div>
</div>`.trim();
  }

  /**
   * Build the front face shell for a sentence card (English + register).
   * @param {object} s - sentence object
   * @returns {string} HTML string
   */
  function sentenceFrontShell(s) {
    return `
<div class="anki-shell">
  <div class="card">
    <div class="card-wrap front-face">
      <div class="meaning-wrap">
        <p class="meaning">${s.english}</p>
      </div>
      ${s.register ? `<div class="chips" style="margin-top:.9rem;"><span class="reg reg-${s.register}">${s.register}</span></div>` : ''}
    </div>
  </div>
</div>`.trim();
  }

  /**
   * Extract the back-face .anki-shell from AnkiCard/AnkiSentenceCard output.
   * The rendered string contains front shell, a divider, then back shell.
   * We find the second occurrence of 'anki-shell' to get the back panel.
   * @param {string} ankiDemoHtml - full output of AnkiCard() or AnkiSentenceCard()
   * @returns {string} HTML string of the back .anki-shell div
   */
  function extractBackShell(ankiDemoHtml) {
    const firstShell = ankiDemoHtml.indexOf('class="anki-shell"');
    if (firstShell === -1) return ankiDemoHtml;
    const secondShell = ankiDemoHtml.indexOf('class="anki-shell"', firstShell + 1);
    if (secondShell === -1) return ankiDemoHtml;
    // Step back to find the opening <div
    const divStart = ankiDemoHtml.lastIndexOf('<div', secondShell);
    return ankiDemoHtml.substring(divStart).trim();
  }

  const flipWord1 = buildWordFlip(
    wordFrontShell(word),
    extractBackShell(window.AnkiCard(word)),
    'anki-flip-w1'
  );
  const flipWord2 = buildWordFlip(
    wordFrontShell(word2),
    extractBackShell(window.AnkiCard(word2)),
    'anki-flip-w2'
  );
  const flipSentence1 = buildWordFlip(
    sentenceFrontShell(sentence),
    extractBackShell(window.AnkiSentenceCard(sentence, 'Basics')),
    'anki-flip-s1'
  );
  const flipSentence2 = buildWordFlip(
    sentenceFrontShell(sentence2),
    extractBackShell(window.AnkiSentenceCard(sentence2, 'Greetings')),
    'anki-flip-s2'
  );

  return `
<div id="page-anki" class="page">
<div class="anki-preview-page">

  <!-- Page header -->
  <div class="anki-preview-header">
    <h1 class="anki-preview-title">Anki Preview</h1>
    <p class="anki-preview-subtitle">Review cards before export</p>
  </div>

  <!-- Search bar -->
  <div class="anki-search-bar">
    <div class="anki-search-wrap">
      <input
        class="anki-search-input"
        type="text"
        placeholder="Search cards…"
        readonly
      />
      <span class="anki-search-icon">⌕</span>
    </div>
    <p class="anki-search-count">Showing 4 of 4 cards</p>
  </div>

  <!-- Word Cards sub-section -->
  <div class="anki-preview-section">
    <div class="anki-preview-section-header">
      <span class="anki-preview-section-label">Word Cards</span>
      <span class="anki-preview-section-count">2</span>
      <span class="anki-preview-section-line"></span>
    </div>

    <!-- Word card 1: पानी -->
    <div class="anki-preview-item">
      <p class="anki-preview-item-label">1 of 2 — पानी · water</p>
      ${flipWord1}
    </div>

    <!-- Word card 2: बारिश -->
    <div class="anki-preview-item">
      <p class="anki-preview-item-label">2 of 2 — बारिश · rain</p>
      ${flipWord2}
    </div>

  </div>

  <!-- Sentence Cards sub-section -->
  <div class="anki-preview-section">
    <div class="anki-preview-section-header">
      <span class="anki-preview-section-label">Sentence Cards</span>
      <span class="anki-preview-section-count">2</span>
      <span class="anki-preview-section-line"></span>
    </div>

    <!-- Sentence card 1 -->
    <div class="anki-preview-item">
      <p class="anki-preview-item-label">1 of 2 — वह रोज़ पानी पीता है।</p>
      ${flipSentence1}
    </div>

    <!-- Sentence card 2 -->
    <div class="anki-preview-item">
      <p class="anki-preview-item-label">2 of 2 — नमस्ते, आप कैसे हैं?</p>
      ${flipSentence2}
    </div>

  </div>

</div>
</div>
  `.trim();
};
