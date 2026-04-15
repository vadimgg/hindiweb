/**
 * Anki note type definition — field list, card CSS, and front/back templates.
 *
 * Responsible for: exporting all constants that define the 'Hindi Vocabulary'
 * Anki note type: the ordered field list, the card stylesheet (dark theme
 * matching the website), and the front/back Mustache templates.
 *
 * These constants are consumed by export.js (to create/sync the note type)
 * and by txtFallback.js (for the #notetype and #columns headers).
 *
 * No dependencies on other project modules.
 */
// Responsible for: Anki note type definition — CSS, front/back card templates, field list

export const ANKI_NOTE_TYPE = 'Hindi Vocabulary';

export const ANKI_FIELDS = [
  'English', 'Hindi', 'Romanisation', 'Syllables', 'Category', 'Gender', 'Transitivity',
  'Forms', 'ExampleSentence', 'UsageNotes', 'RelatedWords', 'Morphemes', 'SoundAlikes', 'Collocations', 'DelhiNote', 'Etymology',
];

export const ANKI_CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Barlow+Condensed:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&family=DM+Mono&display=swap');",
  // Base — gradient matching demo
  '.card{font-family:"Plus Jakarta Sans",sans-serif;background:linear-gradient(160deg,#1a2540 0%,#0f172a 100%);color:#e2e8f0;margin:0;padding:0;font-size:16px;line-height:1.6;}',
  '.card-wrap{max-width:680px;margin:0 auto;padding:1.5rem 1.25rem 2rem;}',
  // Front card
  '.front-face{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:200px;text-align:center;padding:2.5rem 1.5rem;}',
  '.meaning{font-size:1.75rem;font-weight:600;color:#e2e8f0;margin:0 0 0.4rem 0;line-height:1.3;position:relative;display:inline-block;padding-bottom:0.5rem;}',
  '.meaning::after{content:"";position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:2.5rem;height:2px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.5),transparent);border-radius:1px;}',
  '.meaning-wrap{margin-bottom:1.1rem;}',
  '.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;}',
  // Answer header — centered like website
  '.answer-header{border-bottom:1px solid rgba(148,163,184,.15);padding-bottom:1.5rem;margin-bottom:1.75rem;text-align:center;}',
  '.hindi{font-family:"Tiro Devanagari Hindi",serif;font-size:3rem;background:linear-gradient(135deg,#fbbf24,#f97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 .4rem 0;line-height:1.2;}',
  '.roman{font-size:1.2rem;color:#5eead4;text-shadow:0 0 20px rgba(94,234,212,0.2);margin:0 0 .55rem 0;}',
  '.meaning-reveal{font-size:1rem;color:#94a3b8;margin:0 0 1rem 0;}',
  '.header-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;}',
  // Section boxes
  '.field-sec{border-top:2px solid #334155;padding:1.25rem 1.25rem 1.5rem;margin-bottom:1.5rem;background:rgba(30,41,59,0.5);border-radius:12px;}',
  '.field-label{font-family:"Barlow Condensed",sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;margin:0 0 1rem 0;color:#64748b;display:block;}',
  // Cross-lang / sound-alikes / urdu-punjabi item cards — centered
  '.clang-item{margin-bottom:.75rem;padding:.85rem 1rem;background:#0f172a;border:1px solid rgba(51,65,85,.55);border-radius:10px;text-align:center;}',
  '.clang-item:last-child{margin-bottom:0;}',
  '.meta-badge{display:inline-block;font-size:.58rem;font-family:"Barlow Condensed",sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:.2rem .55rem;border-radius:6px;margin-bottom:.45rem;}',
  '.item-note{font-size:.85rem;color:#cbd5e1;line-height:1.65;margin:.4rem 0 0 0;}',
  // Syllables inline header
  '.syl-inline{font-size:1.1rem;font-weight:600;color:#5eead4;opacity:.6;font-family:monospace;letter-spacing:.15em;margin:0 0 .4rem 0;}',
  // Gender / transitivity badges
  '.badge-masc{background:rgba(30,58,138,.25);color:#93c5fd;border:1px solid rgba(59,130,246,.25);font-family:"Barlow Condensed",sans-serif;font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;padding:.18rem .5rem;border-radius:6px;}',
  '.badge-fem{background:rgba(131,24,67,.25);color:#f9a8d4;border:1px solid rgba(236,72,153,.25);font-family:"Barlow Condensed",sans-serif;font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;padding:.18rem .5rem;border-radius:6px;}',
  '.badge-neutral{background:rgba(30,41,59,.6);color:#94a3b8;border:1px solid rgba(51,65,85,.4);font-family:"Barlow Condensed",sans-serif;font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;padding:.18rem .5rem;border-radius:6px;}',
  '.badge-neutral-anki{background:linear-gradient(135deg,rgba(30,41,59,0.7),rgba(15,23,42,0.5));color:#94a3b8;border:1px solid rgba(51,65,85,.4);font-family:"Barlow Condensed",sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.18em;padding:.18rem .5rem;border-radius:6px;display:inline-block;}',
  '.badge-masc-anki{background:linear-gradient(135deg,rgba(59,130,246,0.15),rgba(37,99,235,0.08));color:#93c5fd;border:1px solid rgba(147,197,253,0.2);font-family:"Barlow Condensed",sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.18em;padding:.18rem .5rem;border-radius:6px;display:inline-block;}',
  // Collocation rows
  '.coll-row{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;padding:.75rem 0;border-bottom:1px solid rgba(51,65,85,.25);}',
  '.coll-row:last-child{border-bottom:none;}',
  '.coll-hindi{font-family:"Tiro Devanagari Hindi",serif;font-size:1rem;color:#fbbf24;line-height:1.3;}',
  '.coll-rom{font-family:"DM Mono",monospace;font-size:.8125rem;color:rgba(94,234,212,.6);}',
  '.coll-eng{font-size:.9375rem;color:#94a3b8;text-align:right;flex-shrink:0;}',
  // Related words / sound alikes
  '.lang-label{display:block;font-size:11px;font-family:"Barlow Condensed",sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin-bottom:.3rem;}',
  '.word-row{display:flex;gap:.5rem;align-items:baseline;flex-wrap:wrap;margin-bottom:.35rem;justify-content:center;}',
  '.word-text{font-family:"Tiro Devanagari Hindi",serif;font-size:1.1rem;color:#fbbf24;}',
  '.word-rom{color:#5eead4;font-size:.8125rem;}',
  '.mean-box{background:rgba(8,13,24,0.8);border:1px solid rgba(51,65,85,.5);border-radius:8px;padding:.35rem .75rem;margin-top:.35rem;display:inline-block;}',
  '.mean-box span{color:#94a3b8;font-size:.8125rem;}',
  // Etymology chain — vertical row list
  '.etym-stage{display:flex;align-items:center;gap:.75rem;padding:.75rem 0;border-bottom:1px solid rgba(51,65,85,.25);}',
  '.etym-stage:last-child{border-bottom:none;}',
  '.etym-lang{font-family:"Barlow Condensed",sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#64748b;min-width:4.5rem;flex-shrink:0;}',
  '.etym-word{font-family:"Tiro Devanagari Hindi",serif;font-size:1rem;color:#e2e8f0;line-height:1.3;}',
  '.etym-rom{font-family:"DM Mono",monospace;font-size:.8125rem;color:rgba(94,234,212,.6);}',
  // Mobile
  '@media(max-width:520px){',
  '.card-wrap{padding:.9rem .9rem 2.5rem;}',
  '.front-face{padding:1.75rem 1rem;min-height:150px;}',
  '.hindi{font-size:2.4rem;}',
  '.meaning{font-size:1.2rem;}',
  '.roman{font-size:1rem;}',
  '.field-sec{padding:.85rem .95rem 1rem;}',
  '}',
].join('\n');

export const ANKI_FRONT = `<div class="card-wrap front-face">
  <p class="meaning">{{English}}</p>
  {{#Category}}<div class="chips" style="margin-top:.5rem;">{{Category}}</div>{{/Category}}
</div>`;

export const ANKI_BACK = `<div class="card-wrap">
  <div class="answer-header">
    <p class="hindi" lang="hi">{{Hindi}}</p>
    <p class="roman">{{Romanisation}}</p>
    {{#Syllables}}<p class="syl-inline">{{Syllables}}</p>{{/Syllables}}
    <p class="meaning-reveal">{{English}}</p>
    <div class="header-chips">
      {{#Category}}{{Category}}{{/Category}}
      {{#Gender}}{{Gender}}{{/Gender}}
      {{#Transitivity}}{{Transitivity}}{{/Transitivity}}
    </div>
    {{#Forms}}<div style="margin-top:.9rem;">{{Forms}}</div>{{/Forms}}
  </div>
  {{#ExampleSentence}}<div>{{ExampleSentence}}</div>{{/ExampleSentence}}
  {{#UsageNotes}}<div>{{UsageNotes}}</div>{{/UsageNotes}}
  {{#RelatedWords}}<div>{{RelatedWords}}</div>{{/RelatedWords}}
  {{#Morphemes}}<div>{{Morphemes}}</div>{{/Morphemes}}
  {{#SoundAlikes}}<div>{{SoundAlikes}}</div>{{/SoundAlikes}}
  {{#Collocations}}<div>{{Collocations}}</div>{{/Collocations}}
  {{#DelhiNote}}<div>{{DelhiNote}}</div>{{/DelhiNote}}
  {{#Etymology}}<div>{{Etymology}}</div>{{/Etymology}}
</div>`;
