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
  'Forms', 'Morphemes', 'UsageNotes', 'Collocations', 'RelatedWords', 'SoundAlikes', 'Etymology',
];

export const ANKI_CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Barlow+Condensed:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&family=DM+Mono&display=swap');",
  // Base — slate-900 matching website (#0f172a)
  '.card{font-family:"Plus Jakarta Sans",sans-serif;background:#0f172a;color:#e2e8f0;margin:0;padding:0;font-size:16px;line-height:1.6;}',
  '.card-wrap{max-width:680px;margin:0 auto;padding:clamp(1rem,5vw,2rem) clamp(1rem,5vw,2rem) 3rem;}',
  // Front card
  '.front-face{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:240px;text-align:center;padding:3rem 2rem;}',
  '.meaning{font-size:1.55rem;font-weight:500;color:#e2e8f0;margin:0 0 1.1rem 0;line-height:1.3;}',
  '.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;}',
  // Answer header — centered like website
  '.answer-header{border-bottom:1px solid rgba(148,163,184,.15);padding-bottom:1.5rem;margin-bottom:1.75rem;text-align:center;}',
  '.hindi{font-family:"Tiro Devanagari Hindi",serif;font-size:3.5rem;color:#fbbf24;margin:0 0 .4rem 0;line-height:1.2;}',
  '.roman{font-size:1.2rem;color:#5eead4;margin:0 0 .55rem 0;}',
  '.meaning-reveal{font-size:.95rem;color:#94a3b8;margin:0 0 .85rem 0;}',
  '.header-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;}',
  // Section boxes — slate-800 (#1e293b) bg, colored top border, fully rounded
  '.field-sec{border-top:3px solid #334155;padding:1rem 1.2rem 1.2rem;margin-bottom:1.25rem;background:#1e293b;border-radius:12px;}',
  '.field-label{font-family:"Barlow Condensed",sans-serif;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.18em;margin:0 0 .85rem 0;display:block;}',
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
  {{#Morphemes}}<div>{{Morphemes}}</div>{{/Morphemes}}
  {{#UsageNotes}}<div>{{UsageNotes}}</div>{{/UsageNotes}}
  {{#RelatedWords}}<div>{{RelatedWords}}</div>{{/RelatedWords}}
  {{#SoundAlikes}}<div>{{SoundAlikes}}</div>{{/SoundAlikes}}
  {{#Collocations}}<div>{{Collocations}}</div>{{/Collocations}}
  {{#Etymology}}<div>{{Etymology}}</div>{{/Etymology}}
</div>`;
