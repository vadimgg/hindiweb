// AnkiCard component — renders a stacked Anki front/back demo panel.
// Replicates the exact ANKI_CSS class names and structure from noteType.js.
// Register: window.AnkiCard(word) → HTML string
// Styles:   window.AnkiCardStyles → CSS string

window.AnkiCardStyles = `
  /* ── Anki demo wrapper — stacked vertically ────────────── */
  .anki-demo {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .anki-panel-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: #64748b;
    margin-bottom: 0.5rem;
  }

  /* Elegant flip divider — amber gradient line with centred label */
  .anki-panel-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  .anki-panel-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(251,191,36,0.25), transparent);
  }

  .anki-panel-divider-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: rgba(251,191,36,0.5);
    padding: 0.2rem 0.6rem;
    border: 1px solid rgba(251,191,36,0.15);
    border-radius: 4px;
  }

  /* ── Anki card shell — matches Anki renderer context ──── */
  .anki-shell {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(51,65,85,.5);
    box-shadow: 0 0 0 1px rgba(51,65,85,0.5), 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ─────────────────────────────────────────────────────────
     ANKI CSS — replicated verbatim from noteType.js ANKI_CSS
     ───────────────────────────────────────────────────────── */
  .card {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: linear-gradient(160deg, #1a2540 0%, #0f172a 100%);
    color: #e2e8f0;
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 1.6;
  }

  .card-wrap {
    max-width: 680px;
    margin: 0 auto;
    padding: 1.5rem 1.25rem 2rem;
  }

  /* Front */
  .front-face {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    text-align: center;
    padding: 2.5rem 1.5rem;
  }

  /* English word on front — larger, with amber underline decoration */
  .meaning {
    font-size: 1.75rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0 0 0.4rem 0;
    line-height: 1.3;
    position: relative;
    display: inline-block;
    padding-bottom: 0.5rem;
  }

  .meaning::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2.5rem;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent);
    border-radius: 1px;
  }

  .meaning-wrap {
    margin-bottom: 1.1rem;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .5rem;
  }

  /* Back answer header */
  .answer-header {
    border-bottom: 1px solid rgba(148,163,184,.15);
    padding-bottom: 1.5rem;
    margin-bottom: 1.75rem;
    text-align: center;
  }

  .hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 3rem;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 .4rem 0;
    line-height: 1.2;
  }

  .roman {
    font-size: 1.2rem;
    color: #5eead4;
    text-shadow: 0 0 20px rgba(94,234,212,0.2);
    margin: 0 0 .55rem 0;
  }

  .meaning-reveal {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0 0 1rem 0;
  }

  .header-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .5rem;
  }

  .syl-inline {
    font-size: 1.1rem;
    font-weight: 600;
    color: #5eead4;
    opacity: .6;
    font-family: 'DM Mono', monospace;
    letter-spacing: .15em;
    margin: 0 0 .4rem 0;
  }

  /* Section boxes */
  .field-sec {
    border-top: 2px solid #334155;
    padding: 1.25rem 1.25rem 1.5rem;
    margin-bottom: 1.5rem;
    background: rgba(30,41,59,0.5);
    border-radius: 12px;
  }

  .field-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .2em;
    margin: 0 0 1rem 0;
    color: #64748b;
    display: block;
  }

  /* Example cards */
  .ex-card {
    background: rgba(15,23,42,0.7);
    border: 1px solid rgba(51,65,85,.55);
    border-radius: 10px;
    padding: .9rem 1rem;
    margin-bottom: .7rem;
    text-align: center;
  }

  .ex-card:last-child { margin-bottom: 0; }

  .ex-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .35rem;
    margin-bottom: .45rem;
  }

  .ex-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.15rem;
    color: #fbbf24;
    margin: 0;
    line-height: 1.4;
  }

  .reg {
    font-size: 11px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    padding: .18rem .5rem;
    border: 1px solid rgba(100,116,139,.35);
    border-radius: 6px;
    white-space: nowrap;
    order: -1;
  }

  /* Cross-lang / sound-alikes */
  .clang-item {
    margin-bottom: .75rem;
    padding: .85rem 1rem;
    background: rgba(15,23,42,0.7);
    border: 1px solid rgba(51,65,85,.55);
    border-radius: 10px;
    text-align: center;
  }

  .clang-item:last-child { margin-bottom: 0; }

  .meta-badge {
    display: inline-block;
    font-size: 11px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .1em;
    padding: .2rem .55rem;
    border-radius: 6px;
    margin-bottom: .45rem;
  }

  .lang-label {
    display: block;
    font-size: 11px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .12em;
    margin-bottom: .3rem;
  }

  .word-row {
    display: flex;
    gap: .5rem;
    align-items: baseline;
    flex-wrap: wrap;
    margin-bottom: .35rem;
    justify-content: center;
  }

  .word-text {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.1rem;
    color: #fbbf24;
  }

  .word-rom {
    color: #5eead4;
    font-size: .8125rem;
  }

  .mean-box {
    background: rgba(8,13,24,0.8);
    border: 1px solid rgba(51,65,85,.5);
    border-radius: 8px;
    padding: .35rem .75rem;
    margin-top: .35rem;
    display: inline-block;
  }

  .mean-box span {
    color: #94a3b8;
    font-size: .8125rem;
  }

  .item-note {
    font-size: .9375rem;
    color: #cbd5e1;
    line-height: 1.65;
    margin: .4rem 0 0 0;
  }

  /* Pronunciation */
  .pron-row {
    display: flex;
    gap: .75rem;
    align-items: flex-start;
    margin-bottom: .55rem;
  }

  .syl-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: .88rem;
    color: #f1f5f9;
    min-width: 3rem;
    flex-shrink: 0;
  }

  .syl-desc {
    font-size: .9375rem;
    color: #cbd5e1;
    line-height: 1.65;
    margin: 0;
  }

  /* Gender / transitivity badges */
  .badge-masc-anki {
    background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.08));
    color: #93c5fd;
    border: 1px solid rgba(147,197,253,0.2);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .18em;
    padding: .18rem .5rem;
    border-radius: 6px;
    display: inline-block;
  }

  .badge-neutral-anki {
    background: linear-gradient(135deg, rgba(30,41,59,0.7), rgba(15,23,42,0.5));
    color: #94a3b8;
    border: 1px solid rgba(51,65,85,.4);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .18em;
    padding: .18rem .5rem;
    border-radius: 6px;
    display: inline-block;
  }

  /* Collocation rows inside field-sec */
  .coll-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: .75rem 0;
    border-bottom: 1px solid rgba(51,65,85,.25);
  }

  .coll-row:last-child { border-bottom: none; }

  .coll-hindi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1rem;
    color: #fbbf24;
    line-height: 1.3;
  }

  .coll-rom {
    font-family: 'DM Mono', monospace;
    font-size: .8125rem;
    color: rgba(94,234,212,.6);
  }

  .coll-eng {
    font-size: .9375rem;
    color: #94a3b8;
    text-align: right;
    flex-shrink: 0;
  }

  /* Etymology chain in Anki back */
  .etym-stage {
    display: flex;
    align-items: center;
    gap: .75rem;
    padding: .75rem 0;
    border-bottom: 1px solid rgba(51,65,85,.25);
  }

  .etym-stage:last-child { border-bottom: none; }

  .etym-lang {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .15em;
    color: #64748b;
    min-width: 4.5rem;
    flex-shrink: 0;
  }

  .etym-word {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1rem;
    color: #e2e8f0; /* ancestor — slate-200, NOT amber */
    line-height: 1.3;
  }

  .etym-stage:last-child .etym-word {
    color: #fbbf24; /* current Hindi — amber */
  }

  .etym-rom {
    font-family: 'DM Mono', monospace;
    font-size: .8125rem;
    color: rgba(94,234,212,.6);
  }
`;

// ── Sentence Anki card styles ─────────────────────────────────────────────────
// Sentence-specific CSS that extends the shared AnkiCardStyles above.
// Matches ANKI_SENTENCE_CSS from src/scripts/anki/sentenceNoteType.js exactly.
window.AnkiSentenceCardStyles = `
  /* Register badge colour variants */
  .reg-formal     { color:#a78bfa; border-color:rgba(139,92,246,.4);  background:rgba(109,40,217,.2);   }
  .reg-standard   { color:#38bdf8; border-color:rgba(56,189,248,.4);  background:rgba(14,165,233,.15);  }
  .reg-casual     { color:#fbbf24; border-color:rgba(251,191,36,.3);  background:rgba(245,158,11,.2);   }
  .reg-colloquial { color:#fb7185; border-color:rgba(251,113,133,.4); background:rgba(225,29,72,.2);    }

  /* Literal gloss */
  .literal-gloss {
    font-size: .85rem;
    color: #64748b;
    font-style: italic;
    line-height: 1.65;
    margin: 0;
  }

  /* Word breakdown table */
  .breakdown-table { width: 100%; border-collapse: collapse; margin-top: .25rem; }
  .breakdown-table th {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: .55rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .16em;
    color: #475569;
    text-align: left;
    padding: .3rem .5rem .5rem;
    border-bottom: 1px solid rgba(51,65,85,.6);
  }
  .breakdown-table td {
    padding: .6rem .5rem;
    vertical-align: top;
    border-bottom: 1px solid rgba(30,41,59,.8);
  }
  .breakdown-table tr:last-child td { border-bottom: none; }
  .breakdown-table tr:hover td      { background: rgba(30,41,59,.4); }

  /* Word token — left column */
  .bd-word {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1.05rem;
    color: #fbbf24;
    display: block;
    line-height: 1.3;
  }
  .bd-roman {
    font-size: .75rem;
    color: #5eead4;
    opacity: .7;
    font-family: monospace;
    display: block;
    margin-top: .15rem;
  }

  /* Meaning column */
  .bd-meaning {
    font-size: .85rem;
    color: #e2e8f0;
    line-height: 1.5;
  }
  .bd-note {
    font-size: .75rem;
    color: #64748b;
    font-style: italic;
    line-height: 1.55;
    margin-top: .25rem;
    display: block;
  }
  .bd-badges { display: flex; flex-wrap: wrap; gap: .3rem; margin-top: .3rem; }

  /* Chapter meta — recessive footer */
  .chapter-meta {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: .55rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .16em;
    color: #334155;
    text-align: center;
    margin-top: 1.5rem;
    padding: .4rem;
    background: #080d18;
    border-radius: 8px;
  }

  @media (max-width: 520px) {
    .bd-word    { font-size: .9rem; }
    .bd-meaning { font-size: .8rem; }
    .literal-gloss { font-size: .8rem; }
  }
`;

/**
 * Render the Anki sentence card demo — front + back panels stacked vertically.
 * @param {object} sentence - sentence object from demoSentence
 * @param {string} [chapter] - optional chapter label shown in footer
 * @returns {string} HTML string
 */
window.AnkiSentenceCard = function (sentence, chapter) {
  chapter = chapter || 'Basics';

  // ── Front panel ──────────────────────────────────────────────────────────
  const frontHtml = `
    <div class="anki-shell">
      <div class="card">
        <div class="card-wrap front-face">
          <div class="meaning-wrap">
            <p class="meaning">${sentence.english}</p>
          </div>
          ${sentence.register ? `
          <div class="chips" style="margin-top:.9rem;">
            <span class="reg reg-${sentence.register}">${sentence.register}</span>
          </div>` : ''}
        </div>
      </div>
    </div>
  `;

  // ── Word breakdown rows ───────────────────────────────────────────────────
  const wordRowsHtml = (sentence.words || []).map(w => `
    <tr>
      <td>
        <span class="bd-word" lang="hi">${w.hindi}</span>
        <span class="bd-roman">${w.roman}</span>
      </td>
      <td>
        <span class="bd-meaning">${w.meaning}</span>
        ${(w.gender || w.number) ? `
        <div class="bd-badges">
          ${w.gender  ? `<span class="badge-neutral-anki">${w.gender === 'm' ? 'masc' : 'fem'}</span>` : ''}
          ${w.number  ? `<span class="badge-neutral-anki">${w.number}</span>` : ''}
        </div>` : ''}
      </td>
    </tr>
  `).join('');

  // ── Back panel ───────────────────────────────────────────────────────────
  const backHtml = `
    <div class="anki-shell">
      <div class="card">
        <div class="card-wrap">
          <div class="answer-header">
            <p class="hindi" lang="hi">${sentence.hindi}</p>
            <p class="roman">${sentence.roman}</p>
            <p class="meaning-reveal">${sentence.english}</p>
            <div class="header-chips">
              ${sentence.register ? `<span class="reg reg-${sentence.register}">${sentence.register}</span>` : ''}
            </div>
          </div>

          ${sentence.literal ? `
          <div class="field-sec" style="border-top-color:#475569;">
            <span class="field-label" style="color:#475569;">Literal</span>
            <p class="literal-gloss">${sentence.literal}</p>
          </div>` : ''}

          ${(sentence.words && sentence.words.length) ? `
          <div class="field-sec" style="border-top-color:#14b8a6;">
            <span class="field-label" style="color:#14b8a6;">Word Breakdown</span>
            <table class="breakdown-table">
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                ${wordRowsHtml}
              </tbody>
            </table>
          </div>` : ''}

          ${chapter ? `<p class="chapter-meta">Chapter: ${chapter}</p>` : ''}
        </div>
      </div>
    </div>
  `;

  return `
<div class="anki-demo">
  <div>
    <p class="anki-panel-label">Front</p>
    ${frontHtml}
  </div>

  <div class="anki-panel-divider">
    <div class="anki-panel-divider-line"></div>
    <span class="anki-panel-divider-label">&#9660; Flip</span>
    <div class="anki-panel-divider-line"></div>
  </div>

  <div>
    <p class="anki-panel-label">Back</p>
    ${backHtml}
  </div>
</div>
  `.trim();
};

/**
 * Render the Anki card demo — front + back panels side by side.
 * @param {object} word - word object from demoWord
 * @returns {string} HTML string
 */
window.AnkiCard = function (word) {
  // ── Front panel ──────────────────────────────────────────
  const frontHtml = `
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
  `;

  // ── Back panel ───────────────────────────────────────────
  const usageArr = Array.isArray(word.usage_notes)
    ? word.usage_notes
    : word.usage_notes ? [word.usage_notes] : [];
  const usageNotesHtml = usageArr.map(n => `
    <div class="ex-card">
      <p class="item-note">${n}</p>
    </div>
  `).join('');

  const relatedHtml = (word.related_words || []).map(r => `
    <div class="clang-item">
      <div class="word-row">
        <span class="word-text" lang="hi">${r.hindi}</span>
        <span class="word-rom">${r.roman}</span>
      </div>
      <div class="mean-box"><span>${r.english}</span></div>
    </div>
  `).join('');

  const soundAlikesHtml = (word.sound_alikes || []).map(s => `
    <div class="clang-item">
      <span class="lang-label" style="color:#7dd3fc;">${s.language}</span>
      <div class="word-row">
        <span class="word-rom" style="font-family:'DM Mono',monospace;color:rgba(94,234,212,.8);">${s.part}</span>
        <span style="color:#64748b;font-size:0.8125rem;">→</span>
        <span style="color:#e2e8f0;font-style:italic;">${s.association}</span>
      </div>
      <p class="item-note">${s.note || s.association}</p>
    </div>
  `).join('');

  const collocHtml = (word.collocations || []).map(c => `
    <div class="coll-row">
      <div>
        <div class="coll-hindi" lang="hi">${c.hindi}</div>
        <div class="coll-rom">${c.roman}</div>
      </div>
      <div class="coll-eng">${c.english}</div>
    </div>
  `).join('');

  const morphemesHtml = (word.morphemes && word.morphemes.length)
    ? word.morphemes.map(m => `
    <div class="clang-item">
      <div class="word-row">
        <span class="word-text" lang="hi">${m.part}</span>
        <span class="word-rom">${m.roman}</span>
      </div>
      <div class="mean-box"><span>${m.meaning}</span></div>
      ${m.origin ? `<span style="color:#64748b;font-size:0.75rem;font-style:italic;">${m.origin}</span>` : ''}
    </div>
  `).join('')
    : '';

  const exSentenceHtml = word.example_sentence ? (() => {
    const ex = word.example_sentence;
    const breakdownRowsHtml = (ex.breakdown || []).map(b => `
      <div style="display:flex;align-items:baseline;gap:0.5rem;flex-wrap:wrap;margin-top:0.25rem;">
        <span style="font-family:'Tiro Devanagari Hindi',serif;color:#fbbf24;font-size:0.9375rem;" lang="hi">${b.hindi}</span>
        <span style="font-family:'DM Mono',monospace;color:rgba(94,234,212,.8);font-size:0.8125rem;">${b.roman}</span>
        <span style="color:#64748b;font-size:0.8125rem;font-style:italic;">— ${b.meaning}</span>
      </div>
    `).join('');
    return `
      <p class="hindi" lang="hi">${ex.hindi}</p>
      <p class="roman">${ex.roman}</p>
      <p class="meaning-reveal">${ex.english}</p>
      ${breakdownRowsHtml}
    `;
  })() : '';

  const delhiNoteHtml = word.delhi_note
    ? `<p class="item-note">${word.delhi_note}</p>`
    : '';

  const etymHtml = (word.etymology_journey || word.etymology || []).map(e => `
    <div class="etym-stage">
      <span class="etym-lang">${e.stage || e.label}</span>
      <span class="etym-word" lang="hi">${e.form || e.hindi}</span>
      <span class="etym-rom">${e.roman}</span>
    </div>
  `).join('');

  const backHtml = `
    <div class="anki-shell" style="overflow-y: auto; max-height: 600px;">
      <div class="card">
        <div class="card-wrap">
          <div class="answer-header">
            <p class="hindi" lang="hi">${word.hindi}</p>
            <p class="roman">${word.romanisation || word.roman}</p>
            <p class="syl-inline">${word.syllables}</p>
            <p class="meaning-reveal">${word.english}</p>
            <div class="header-chips">
              <span class="badge-neutral-anki">${word.pos}</span>
              <span class="badge-masc-anki">${word.gender}</span>
            </div>
          </div>

          ${word.example_sentence ? `
          <div class="field-sec">
            <span class="field-label">Example</span>
            ${exSentenceHtml}
          </div>
          ` : ''}

          <div class="field-sec">
            <span class="field-label">Usage Notes</span>
            ${usageNotesHtml}
          </div>

          <div class="field-sec">
            <span class="field-label">Related Words</span>
            ${relatedHtml}
          </div>

          ${(word.morphemes && word.morphemes.length) ? `
          <div class="field-sec">
            <span class="field-label">Morphemes</span>
            ${morphemesHtml}
          </div>
          ` : ''}

          <div class="field-sec">
            <span class="field-label">Sound Alikes</span>
            ${soundAlikesHtml}
          </div>

          <div class="field-sec">
            <span class="field-label">Collocations</span>
            ${collocHtml}
          </div>

          ${word.delhi_note ? `
          <div class="field-sec">
            <span class="field-label">Delhi Usage</span>
            ${delhiNoteHtml}
          </div>
          ` : ''}

          <div class="field-sec">
            <span class="field-label">Etymology</span>
            ${etymHtml}
          </div>
        </div>
      </div>
    </div>
  `;

  return `
<div class="anki-demo">
  <div>
    <p class="anki-panel-label">Front</p>
    ${frontHtml}
  </div>

  <div class="anki-panel-divider">
    <div class="anki-panel-divider-line"></div>
    <span class="anki-panel-divider-label">▼ Flip</span>
    <div class="anki-panel-divider-line"></div>
  </div>

  <div>
    <p class="anki-panel-label">Back</p>
    ${backHtml}
  </div>
</div>
  `.trim();
};
