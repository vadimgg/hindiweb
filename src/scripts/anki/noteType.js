// Responsible for: Anki note type definition — CSS, front/back card templates, field list

export const ANKI_NOTE_TYPE = 'Hindi Vocabulary';

export const ANKI_FIELDS = [
  'English','Category','Hindi','Romanisation','Forms',
  'Pronunciation','Memory','Examples','RootOrigin',
  'SoundAlikes','UrduPunjabi','CrossLanguage',
];

export const ANKI_CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Oswald:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');",
  // Base — slate-900 matching website (#0f172a)
  '.card{font-family:"Poppins",sans-serif;background:#0f172a;color:#e2e8f0;margin:0;padding:0;font-size:16px;line-height:1.6;}',
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
  '.field-label{font-family:"Oswald",sans-serif;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.18em;margin:0 0 .85rem 0;display:block;}',
  // Example cards — darker inner boxes (slate-900 level), rounded
  '.ex-card{background:#0f172a;border:1px solid rgba(51,65,85,.55);border-radius:10px;padding:.9rem 1rem;margin-bottom:.7rem;}',
  '.ex-card:last-child{margin-bottom:0;}',
  '.ex-header{display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.4rem;}',
  '.ex-hindi{font-family:"Tiro Devanagari Hindi",serif;font-size:1.15rem;color:#fbbf24;margin:0;flex:1;line-height:1.4;}',
  '.reg{font-size:.58rem;font-family:"Oswald",sans-serif;font-weight:700;text-transform:uppercase;color:#64748b;padding:.18rem .5rem;border:1px solid rgba(100,116,139,.35);border-radius:6px;white-space:nowrap;flex-shrink:0;align-self:flex-start;}',
  // Cross-lang / sound-alikes / urdu-punjabi item cards
  '.clang-item{margin-bottom:.75rem;padding:.85rem 1rem;background:#0f172a;border:1px solid rgba(51,65,85,.55);border-radius:10px;}',
  '.clang-item:last-child{margin-bottom:0;}',
  '.meta-badge{display:inline-block;font-size:.58rem;font-family:"Oswald",sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:.2rem .55rem;border-radius:6px;margin-bottom:.45rem;}',
  '.lang-label{display:block;font-size:.63rem;font-family:"Oswald",sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin-bottom:.3rem;}',
  '.word-row{display:flex;gap:.5rem;align-items:baseline;flex-wrap:wrap;margin-bottom:.35rem;}',
  '.word-text{font-family:"Tiro Devanagari Hindi",serif;font-size:1.1rem;color:#fbbf24;}',
  '.word-rom{color:#5eead4;font-size:.83rem;}',
  // Meaning inside a darker rounded pill — used in cross-lang
  '.mean-box{background:#080d18;border:1px solid rgba(51,65,85,.5);border-radius:8px;padding:.35rem .75rem;margin-top:.35rem;display:inline-block;}',
  '.mean-box span{color:#94a3b8;font-size:.82rem;}',
  '.item-note{font-size:.85rem;color:#cbd5e1;line-height:1.65;margin:.4rem 0 0 0;}',
  // Pronunciation rows
  '.pron-row{display:flex;gap:.75rem;align-items:flex-start;margin-bottom:.55rem;}',
  '.syl-label{font-family:"Oswald",sans-serif;font-weight:600;font-size:.88rem;color:#f1f5f9;min-width:3rem;flex-shrink:0;}',
  '.syl-desc{font-size:.86rem;color:#cbd5e1;line-height:1.6;margin:0;}',
  // Mobile
  '@media(max-width:520px){',
  '.card-wrap{padding:.9rem .9rem 2.5rem;}',
  '.front-face{padding:1.75rem 1rem;min-height:150px;}',
  '.hindi{font-size:2.4rem;}',
  '.meaning{font-size:1.2rem;}',
  '.roman{font-size:1rem;}',
  '.field-sec{padding:.85rem .95rem 1rem;}',
  '.ex-header{flex-direction:column;align-items:flex-start;}',
  '.reg{order:-1;margin-bottom:.3rem;}',
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
    <p class="meaning-reveal">{{English}}</p>
    {{#Category}}<div class="header-chips">{{Category}}</div>{{/Category}}
    {{#Forms}}<div style="margin-top:.9rem;">{{Forms}}</div>{{/Forms}}
  </div>
  {{#Pronunciation}}<div>{{Pronunciation}}</div>{{/Pronunciation}}
  {{#Memory}}<div>{{Memory}}</div>{{/Memory}}
  {{#Examples}}<div>{{Examples}}</div>{{/Examples}}
  {{#RootOrigin}}<div>{{RootOrigin}}</div>{{/RootOrigin}}
  {{#SoundAlikes}}<div>{{SoundAlikes}}</div>{{/SoundAlikes}}
  {{#UrduPunjabi}}<div>{{UrduPunjabi}}</div>{{/UrduPunjabi}}
  {{#CrossLanguage}}<div>{{CrossLanguage}}</div>{{/CrossLanguage}}
</div>`;
