// SentenceCard component — renders a Hindi sentence card with word breakdown.
// Register: window.SentenceCard(sentence) → HTML string
// Styles:   window.SentenceCardStyles → CSS string

window.SentenceCardStyles = `
  /* ── Sentence Card shell ────────────────────────────────── */
  .sc-card {
    background: linear-gradient(145deg, #131f35 0%, #0f172a 100%);
    border: 1px solid rgba(51,65,85,.5);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(51,65,85,0.5), 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ── Card header (always visible) ──────────────────────── */
  .sc-header {
    padding: 1.5rem 1.5rem 1.25rem;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: background 0.2s ease;
  }

  .sc-header:hover {
    background: rgba(255,191,36,0.03);
  }

  .sc-header-content {
    flex: 1;
  }

  .sc-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.5rem;
    font-weight: 400;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.35;
    margin-bottom: 0.375rem;
    display: block;
  }

  .sc-roman {
    font-size: 1rem;
    color: #5eead4;
    text-shadow: 0 0 20px rgba(94,234,212,0.2);
    margin-bottom: 0.3rem;
    display: block;
  }

  .sc-english {
    font-size: 0.9375rem;
    color: #e2e8f0;
    margin-bottom: 0.75rem;
    display: block;
    line-height: 1.6;
  }

  .sc-register-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .sc-collapse-icon {
    font-size: 0.75rem;
    color: #64748b;
    flex-shrink: 0;
    margin-top: 0.4rem;
    transition: transform 0.2s ease;
  }

  .sc-card.is-collapsed .sc-collapse-icon {
    transform: rotate(-90deg);
  }

  /* ── Expandable body ────────────────────────────────────── */
  .sc-body {
    border-top: 1px solid rgba(51,65,85,.4);
  }

  .sc-card.is-collapsed .sc-body {
    display: none;
  }

  /* ── Literal gloss ──────────────────────────────────────── */
  .sc-gloss {
    padding: 0.875rem 1.375rem;
    font-size: 0.9375rem;
    color: #64748b;
    font-style: italic;
    border-bottom: 1px solid rgba(51,65,85,.4);
    line-height: 1.65;
  }

  /* ── Word breakdown ─────────────────────────────────────── */
  .sc-breakdown {
    padding: 0.375rem 0 1rem;
  }

  .sc-breakdown-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.625rem 1.375rem;
    border-bottom: 1px solid rgba(51,65,85,.3);
  }

  .sc-col-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #475569;
  }

  .sc-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 0.9375rem 1.375rem;
    gap: 1.25rem;
    transition: background 0.15s ease;
  }

  .sc-row:hover {
    background: rgba(255,255,255,0.02);
  }

  .sc-row + .sc-row {
    border-top: 1px solid rgba(51,65,85,.2);
  }

  .sc-token-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.125rem;
    color: #fbbf24;
    line-height: 1.3;
    display: block;
  }

  .sc-token-roman {
    font-family: 'DM Mono', monospace;
    font-size: 0.875rem;
    color: rgba(94,234,212,.7);
    display: block;
    margin-top: 0.1rem;
  }

  .sc-token-cell {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  /*
   * Gender dot — sits left of the Hindi token.
   * margin-top aligns it with the cap-height of the 1.125rem Hindi text.
   * At 1.125rem (18px) with line-height 1.3, visual cap-height ≈ 0.42rem.
   */
  .sc-gender-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 0.42rem; /* vertically centers on cap-height of Hindi text */
  }

  .sc-gender-dot-masc { background: #93c5fd; }   /* blue-300 — masculine */
  .sc-gender-dot-fem  { background: #f9a8d4; }   /* pink-300 — feminine  */

  .sc-meaning-cell {
    display: flex;
    align-items: center;
  }

  .sc-meaning-text {
    font-size: 0.9375rem;
    color: #e2e8f0;
    line-height: 1.55;
  }

  .sc-token-note {
    display: block;
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.55;
    margin-top: 0.2rem;
    font-style: italic;
  }

  .sc-token-number {
    display: block;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #475569;
    margin-top: 0.2rem;
  }

  /* ── Audio buttons ─────────────────────────────────────── */
  .wc-audio-row { display:flex; gap:0.4rem; margin-bottom:0.5rem; }
  .wc-audio-btn {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    padding: 0.2rem 0.65rem; border-radius: 6px; cursor: pointer;
    background: rgba(30,41,59,0.8); color: #64748b;
    border: 1px solid rgba(51,65,85,0.5);
    transition: border-color 0.15s, color 0.15s;
  }
  .wc-audio-btn:hover { border-color: rgba(94,234,212,0.3); color: #5eead4; }
  .wc-audio-btn.is-playing { background: #fbbf24; color: #0f172a; border-color: #fbbf24; }

  /* ── Breakdown token play icon ──────────────────────────── */
  .sc-token-play {
    font-size: 10px; color: #475569; cursor: pointer;
    background: none; border: none; padding: 0 0.25rem;
    opacity: 0; transition: opacity 0.15s;
    align-self: center;
  }
  .sc-row:hover .sc-token-play { opacity: 1; }
`;

/**
 * Render a sentence card article element.
 * @param {object} sentence - sentence object from demoSentence
 * @returns {string} HTML string
 */
window.SentenceCard = function (sentence) {
  const rowsHtml = (sentence.words || []).map((w, i) => {
    const isMasc = w.gender === 'm' || w.gender === 'masculine';
    const isFem  = w.gender === 'f' || w.gender === 'feminine';
    const dotClass = isMasc
      ? 'sc-gender-dot sc-gender-dot-masc'
      : isFem
        ? 'sc-gender-dot sc-gender-dot-fem'
        : '';
    const dotTitle = isMasc ? 'masculine' : 'feminine';
    const dotHtml = dotClass
      ? `<span class="${dotClass}" title="${dotTitle}"></span>`
      : '<span style="width:7px;flex-shrink:0;"></span>';
    const noteHtml = w.note
      ? `<span class="sc-token-note">${w.note}</span>`
      : '';
    const numberHtml = w.number
      ? `<span class="sc-token-number">${w.number}</span>`
      : '';
    const playPath = `audio/sentences/demo/Are_you_Kamala/word_${String(i+1).padStart(2,'0')}_${w.roman}.mp3`;
    return `
      <div class="sc-row">
        <div class="sc-token-cell">
          ${dotHtml}
          <div>
            <span class="sc-token-hindi" lang="hi">${w.hindi}</span>
            <span class="sc-token-roman">${w.roman}</span>
            ${numberHtml}
          </div>
          <button class="sc-token-play" data-label="" onclick="playAudio(this,'${playPath}')">▶</button>
        </div>
        <div class="sc-meaning-cell">
          <div>
            <span class="sc-meaning-text">${w.meaning}</span>
            ${noteHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
<article class="sc-card">
  <!-- Header — click to collapse/expand -->
  <div class="sc-header card-header" role="button" aria-expanded="true">
    <div class="sc-header-content">
      <span class="sc-hindi" lang="hi">${sentence.hindi}</span>
      <span class="sc-roman">${sentence.romanisation || sentence.roman}</span>
      <div class="wc-audio-row">
        <button class="wc-audio-btn" data-label="Normal" onclick="playAudio(this,'audio/sentences/demo/Are_you_Kamala/01_sentence_normal.mp3')">🔊 Normal</button>
        <button class="wc-audio-btn" data-label="Slow" onclick="playAudio(this,'audio/sentences/demo/Are_you_Kamala/02_sentence_slow.mp3')">🔊 Slow</button>
      </div>
      <span class="sc-english">${sentence.english}</span>
      <div class="sc-register-row">
        <span class="badge badge-standard">${sentence.register}</span>
      </div>
    </div>
    <span class="sc-collapse-icon">▾</span>
  </div>

  <!-- Collapsible body -->
  <div class="sc-body">
    <!-- Literal gloss -->
    <p class="sc-gloss">Literal: "${sentence.literal}"</p>

    <!-- Word breakdown -->
    <div class="sc-breakdown">
      <div class="sc-breakdown-header">
        <span class="sc-col-label">Token</span>
        <span class="sc-col-label">Meaning</span>
      </div>
      ${rowsHtml}
    </div>
  </div>
</article>
  `.trim();
};
