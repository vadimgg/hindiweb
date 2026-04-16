// WordCard component — renders a fully expanded Hindi vocabulary word card.
// Register: window.WordCard(word) → HTML string
// Styles:   window.WordCardStyles → CSS string

window.WordCardStyles = `
  /* ── Word Card shell ────────────────────────────────────── */
  .wc-card {
    background: linear-gradient(145deg, #131f35 0%, #0f172a 100%);
    border: 1px solid rgba(51,65,85,.5);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(51,65,85,0.5), 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ── Card header (always visible) ──────────────────────── */
  .wc-header {
    padding: 1.5rem 1.5rem 1.25rem;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: background 0.2s ease;
  }

  .wc-header:hover {
    background: rgba(255,191,36,0.03);
  }

  .wc-header-content {
    flex: 1;
  }

  .wc-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 2.25rem;
    font-weight: 400;
    /* Amber-to-orange gradient text fill */
    background: linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    margin-bottom: 0.375rem;
    display: block;
  }

  .wc-roman {
    font-size: 1.2rem;
    color: #5eead4;
    text-shadow: 0 0 20px rgba(94,234,212,0.2);
    margin-bottom: 0.25rem;
    display: block;
  }

  .wc-syllables {
    font-family: 'DM Mono', monospace;
    font-size: 0.9rem;
    color: rgba(94,234,212,.6);
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 0.75rem;
  }

  .wc-english {
    font-size: 1.0625rem;
    color: #e2e8f0;
    display: block;
    margin-bottom: 0.625rem;
  }

  .wc-grammar-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .wc-collapse-icon {
    font-size: 0.75rem;
    color: #64748b;
    flex-shrink: 0;
    margin-top: 0.5rem;
    transition: transform 0.2s ease;
  }

  .wc-card.is-collapsed .wc-collapse-icon {
    transform: rotate(-90deg);
  }

  /* ── Collapsible body ───────────────────────────────────── */
  .wc-body {
    border-top: 1px solid rgba(51,65,85,.4);
  }

  .wc-card.is-collapsed .wc-body {
    display: none;
  }

  /* ── Section (uses <details>) ───────────────────────────── */
  /*
   * Hover applies to the entire <details> block (header + open content),
   * so the left-border accent runs the full height of the section.
   * border-left on <details> itself + padding-left compensation on content.
   */
  .wc-section {
    border-top: 1px solid rgba(51,65,85,.4);
    border-left: 2px solid transparent;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .wc-section:first-child {
    border-top: none;
  }

  .wc-section:hover {
    background: rgba(255,255,255,0.018);
    border-left-color: rgba(251,191,36,0.22);
  }

  /* Brighten section label text on section hover */
  .wc-section:hover .wc-section-label {
    color: #94a3b8;
  }

  .wc-section > summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Compensate 2px left border with 14px instead of 16px so text sits at same visual column */
    padding: 1rem 1.25rem 1rem 1.125rem;
    cursor: pointer;
    user-select: none;
  }

  .wc-section > summary::-webkit-details-marker { display: none; }

  .wc-section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #64748b;
    transition: color 0.2s ease;
  }

  .wc-section-chevron {
    font-size: 0.65rem;
    color: #475569;
    transition: transform 0.2s ease;
  }

  .wc-section[open] > summary .wc-section-chevron {
    transform: rotate(180deg);
  }

  /*
   * Content padding-left slightly increased (1.375rem instead of 1.25rem)
   * to give the left border visual clearance when the section is open.
   */
  .wc-section-body {
    padding: 0.125rem 1.25rem 1.375rem 1.375rem;
  }

  /* ── Forms section ──────────────────────────────────────── */
  .wc-forms-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .wc-form-chip {
    background: #1e293b;
    border: 1px solid rgba(51,65,85,.5);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 7rem;
  }

  .wc-form-chip-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #64748b;
  }

  .wc-form-chip-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.125rem;
    color: #fbbf24;
    line-height: 1.3;
  }

  .wc-form-chip-roman {
    font-size: 0.875rem;
    color: rgba(94,234,212,.7);
    font-family: 'DM Mono', monospace;
  }

  /* ── Usage notes ────────────────────────────────────────── */
  .wc-usage-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .wc-usage-note {
    font-size: 0.9375rem;
    color: #cbd5e1;
    line-height: 1.75;
  }

  /* ── Related words ──────────────────────────────────────── */
  .wc-related-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .wc-related-chip {
    background: #1e293b;
    border: 1px solid rgba(51,65,85,.5);
    border-radius: 10px;
    padding: 0.625rem 1rem;
  }

  .wc-related-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.125rem;
    color: #fbbf24;
    display: block;
    line-height: 1.3;
  }

  .wc-related-roman {
    font-size: 0.875rem;
    color: rgba(94,234,212,.7);
    display: block;
    font-family: 'DM Mono', monospace;
    margin-top: 0.1rem;
  }

  .wc-related-english {
    font-size: 0.9375rem;
    color: #64748b;
    display: block;
    margin-top: 0.15rem;
  }

  /* ── Sound-alikes ───────────────────────────────────────── */
  .wc-soundalike {
    background: #1e293b;
    border: 1px solid rgba(51,65,85,.5);
    border-radius: 10px;
    padding: 1rem 1.125rem;
  }

  .wc-soundalike-top {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
  }

  .wc-soundalike-part {
    font-family: 'DM Mono', monospace;
    font-size: 1rem;
    color: rgba(94,234,212,.8);
  }

  .wc-soundalike-via {
    font-size: 0.875rem;
    color: #64748b;
  }

  .wc-soundalike-foreign {
    font-size: 0.9375rem;
    color: #e2e8f0;
    font-style: italic;
  }

  .wc-soundalike-assoc {
    font-size: 0.9375rem;
    color: #cbd5e1;
    font-style: italic;
    line-height: 1.7;
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

  /* ── Collocations ───────────────────────────────────────── */
  .wc-colloc-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .wc-colloc-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
    padding: 1rem 0;
  }

  .wc-colloc-row + .wc-colloc-row {
    border-top: 1px solid rgba(51,65,85,.22);
  }

  .wc-colloc-left {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .wc-colloc-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.0625rem;
    color: #fbbf24;
    line-height: 1.3;
  }

  .wc-colloc-roman {
    font-family: 'DM Mono', monospace;
    font-size: 0.875rem;
    color: rgba(94,234,212,.6);
  }

  .wc-colloc-english {
    font-size: 0.9375rem;
    color: #94a3b8;
    text-align: right;
    flex-shrink: 0;
    max-width: 50%;
    line-height: 1.5;
  }

  /* ── Etymology chain ────────────────────────────────────── */
  /*
   * Redesigned as a vertical stacked layout with a connecting accent line.
   * Each stage node sits in a row: label-col | content — with a subtle
   * left-running connector between nodes. This holds cleanly at larger
   * text sizes and avoids horizontal overflow.
   */
  .wc-etym-chain {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-left: 0.25rem;
    border-left: 2px solid rgba(51,65,85,.5);
  }

  .wc-etym-stage {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
    padding: 0.875rem 0 0.875rem 1rem;
    position: relative;
  }

  /* Connector dot on the left border */
  .wc-etym-stage::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 1.25rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #334155;
    border: 1px solid rgba(94,234,212,.25);
    flex-shrink: 0;
  }

  /* Last stage (current Hindi word) gets amber dot */
  .wc-etym-stage:last-child::before {
    background: rgba(251,191,36,.35);
    border-color: rgba(251,191,36,.5);
  }

  .wc-etym-stage + .wc-etym-stage {
    border-top: none;
  }

  .wc-etym-label-col {
    min-width: 5.5rem;
    flex-shrink: 0;
    padding-top: 0.1rem;
  }

  .wc-etym-stage-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #64748b;
  }

  .wc-etym-content {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.4rem 0.625rem;
  }

  .wc-etym-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.125rem;
    color: #e2e8f0;  /* slate-200, NOT amber — ancestors are supporting context */
    line-height: 1.3;
  }

  /* last stage is the current Hindi word — amber */
  .wc-etym-stage:last-child .wc-etym-hindi {
    color: #fbbf24;
  }

  .wc-etym-roman {
    font-family: 'DM Mono', monospace;
    font-size: 0.875rem;
    color: rgba(94,234,212,.6);
  }

  .wc-etym-meaning {
    font-size: 0.875rem;
    color: #64748b;
  }

  .wc-origin-note {
    margin-top: 1.125rem;
    font-size: 0.9375rem;
    color: #64748b;
    font-style: italic;
    line-height: 1.7;
  }

  /* ── Morphemes ──────────────────────────────────────────── */
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
  .wc-ex-token-play {
    font-size: 10px; color: #475569; cursor: pointer;
    background: none; border: none; padding: 0 0.25rem;
    opacity: 0; transition: opacity 0.15s;
  }
  .wc-ex-token:hover .wc-ex-token-play { opacity: 1; }

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
`;

/**
 * Render a full word card article element.
 * @param {object} word - word object from demoWord
 * @returns {string} HTML string
 */
window.WordCard = function (word) {
  const formsHtml = (word.forms || []).map(f => `
    <div class="wc-form-chip">
      <span class="wc-form-chip-label">${f.label}</span>
      <span class="wc-form-chip-hindi" lang="hi">${f.hindi}</span>
      <span class="wc-form-chip-roman">${f.roman}</span>
    </div>
  `).join('');

  const usageArr = Array.isArray(word.usage_notes)
    ? word.usage_notes
    : word.usage_notes
      ? [word.usage_notes]
      : [];
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

  const collocsHtml = (word.collocations || []).map(c => `
    <div class="wc-colloc-row">
      <div class="wc-colloc-left">
        <span class="wc-colloc-hindi" lang="hi">${c.hindi}</span>
        <span class="wc-colloc-roman">${c.roman}</span>
      </div>
      <span class="wc-colloc-english">${c.english}</span>
    </div>
  `).join('');

  const etymSource = word.etymology_journey || word.etymology || [];
  const etymHtml = etymSource.map(e => `
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

  const morphemesHtml = (word.morphemes || []).map(m => `
    <div class="wc-morpheme-chip">
      <span class="wc-morpheme-part" lang="hi">${m.part}</span>
      <span class="wc-morpheme-roman">${m.roman}</span>
      <span class="wc-morpheme-meaning">${m.meaning}</span>
      ${m.origin ? `<span class="wc-morpheme-origin">${m.origin}</span>` : ''}
    </div>
  `).join('');

  const exHtml = word.example_sentence ? (() => {
    const ex = word.example_sentence;
    const breakdownHtml = (ex.breakdown || []).map((t, i) => `
      <div class="wc-ex-token">
        <span class="wc-ex-token-hindi" lang="hi">${t.hindi}</span>
        <span class="wc-ex-token-roman">${t.roman}</span>
        <span class="wc-ex-token-meaning">— ${t.meaning}</span>
        <button class="wc-ex-token-play" data-label="" onclick="playAudio(this,'audio/words/demo/माता_mātā/sentence/word_${String(i+1).padStart(2,'0')}_${t.roman}.mp3')">▶</button>
      </div>
    `).join('');
    return `
      <div class="wc-ex-header">
        <span class="wc-ex-hindi" lang="hi">${ex.hindi}</span>
        <span class="wc-ex-roman">${ex.roman}</span>
        <span class="wc-ex-english">${ex.english}</span>
      </div>
      <div class="wc-audio-row">
        <button class="wc-audio-btn" data-label="Normal" onclick="playAudio(this,'audio/words/demo/माता_mātā/sentence/01_sentence_normal.mp3')">🔊 Normal</button>
        <button class="wc-audio-btn" data-label="Slow" onclick="playAudio(this,'audio/words/demo/माता_mātā/sentence/02_sentence_slow.mp3')">🔊 Slow</button>
      </div>
      ${breakdownHtml ? `<div class="wc-ex-breakdown">${breakdownHtml}</div>` : ''}
    `;
  })() : '';

  const genderBadgeClass = word.gender === 'masculine'
    ? 'badge badge-masc'
    : word.gender === 'feminine'
      ? 'badge badge-fem'
      : 'badge badge-noun';
  const genderLabel = word.gender === 'masculine'
    ? 'masc.'
    : word.gender === 'feminine'
      ? 'fem.'
      : word.gender;

  return `
<article class="wc-card">
  <!-- Header — click to collapse/expand body -->
  <div class="wc-header card-header" role="button" aria-expanded="true">
    <div class="wc-header-content">
      <span class="wc-hindi" lang="hi">${word.hindi}</span>
      <span class="wc-roman">${word.romanisation}</span>
      <div class="wc-audio-row">
        <button class="wc-audio-btn" data-label="Normal" onclick="playAudio(this,'audio/words/demo/माता_mātā/01_word.mp3')">🔊 Normal</button>
        <button class="wc-audio-btn" data-label="Slow" onclick="playAudio(this,'audio/words/demo/माता_mātā/02_word_slow.mp3')">🔊 Slow</button>
      </div>
      <span class="wc-syllables">${word.syllables}</span>
      ${word.english ? `<span class="wc-english">${word.english}</span>` : ''}
      <div class="wc-grammar-row">
        <span class="badge badge-noun">${word.pos}</span>
        ${word.gender ? `<span class="${genderBadgeClass}">${genderLabel}</span>` : ''}
      </div>
    </div>
    <span class="wc-collapse-icon">▾</span>
  </div>

  <!-- Collapsible body -->
  <div class="wc-body">

    <!-- Forms -->
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

    <!-- Morphemes -->
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

    <!-- Usage Notes — open by default -->
    <details class="wc-section" open>
      <summary>
        <span class="wc-section-label">Usage Notes</span>
        <span class="wc-section-chevron">▾</span>
      </summary>
      <div class="wc-section-body">
        <div class="wc-usage-list">${usageHtml}</div>
      </div>
    </details>

    <!-- Related Words -->
    <details class="wc-section" open>
      <summary>
        <span class="wc-section-label">Related Words</span>
        <span class="wc-section-chevron">▾</span>
      </summary>
      <div class="wc-section-body">
        <div class="wc-related-list">${relatedHtml}</div>
      </div>
    </details>

    <!-- Sound Alikes -->
    <details class="wc-section" open>
      <summary>
        <span class="wc-section-label">Sound Alikes</span>
        <span class="wc-section-chevron">▾</span>
      </summary>
      <div class="wc-section-body">${soundalikesHtml}</div>
    </details>

    <!-- Collocations -->
    <details class="wc-section" open>
      <summary>
        <span class="wc-section-label">Collocations</span>
        <span class="wc-section-chevron">▾</span>
      </summary>
      <div class="wc-section-body">
        <div class="wc-colloc-list">${collocsHtml}</div>
      </div>
    </details>

    <!-- Example Sentence -->
    ${word.example_sentence ? `
    <details class="wc-section" open>
      <summary>
        <span class="wc-section-label">Example</span>
        <span class="wc-section-chevron">▾</span>
      </summary>
      <div class="wc-section-body">${exHtml}</div>
    </details>` : ''}

    <!-- Delhi Note -->
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

    <!-- Etymology -->
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
  `.trim();
};

window.playAudio = function(btn, src) {
  var audio = new Audio(src);
  btn.classList.add('is-playing');
  btn.textContent = '■ ' + btn.dataset.label;
  audio.onended = function() {
    btn.classList.remove('is-playing');
    btn.textContent = '🔊 ' + btn.dataset.label;
  };
  audio.play().catch(function() {
    btn.classList.remove('is-playing');
    btn.textContent = '🔊 ' + btn.dataset.label;
  });
};
