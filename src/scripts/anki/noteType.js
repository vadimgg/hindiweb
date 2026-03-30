// Responsible for: Anki note type definition — CSS, front/back card templates, field list

export const ANKI_NOTE_TYPE = 'Hindi Vocabulary';

export const ANKI_FIELDS = [
  'English','Category','Hindi','Romanisation','Forms',
  'Pronunciation','Memory','Examples','RootOrigin',
  'SoundAlikes','UrduPunjabi','CrossLanguage',
];

export const ANKI_CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Oswald:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');",
  '.card{font-family:"Poppins",sans-serif;background:#0f172a;color:#e2e8f0;margin:0;padding:0;font-size:16px;line-height:1.5;}',
  '.card-wrap{max-width:660px;margin:0 auto;padding:1.5rem 1.5rem 2.5rem;}',
  '.front-face{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:220px;text-align:center;padding:3rem 2rem;}',
  '.meaning{font-size:1.55rem;font-weight:500;color:#e2e8f0;margin:0 0 .9rem 0;line-height:1.3;}',
  '.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;}',
  '.answer-header{border-bottom:1px solid rgba(148,163,184,.15);padding-bottom:1rem;margin-bottom:1.2rem;}',
  '.hindi{font-family:"Tiro Devanagari Hindi",serif;font-size:3.5rem;color:#fbbf24;margin:0 0 .2rem 0;line-height:1.2;}',
  '.roman{font-size:1.2rem;color:#5eead4;margin:0 0 .4rem 0;}',
  '.meaning-reveal{font-size:.95rem;color:#94a3b8;margin:0;}',
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
    {{#Forms}}<div style="margin-top:.75rem;">{{Forms}}</div>{{/Forms}}
  </div>
  {{#Pronunciation}}<div>{{Pronunciation}}</div>{{/Pronunciation}}
  {{#Memory}}<div>{{Memory}}</div>{{/Memory}}
  {{#Examples}}<div>{{Examples}}</div>{{/Examples}}
  {{#RootOrigin}}<div>{{RootOrigin}}</div>{{/RootOrigin}}
  {{#SoundAlikes}}<div>{{SoundAlikes}}</div>{{/SoundAlikes}}
  {{#UrduPunjabi}}<div>{{UrduPunjabi}}</div>{{/UrduPunjabi}}
  {{#CrossLanguage}}<div>{{CrossLanguage}}</div>{{/CrossLanguage}}
</div>`;
