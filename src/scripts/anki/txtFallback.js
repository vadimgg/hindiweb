// Responsible for: generating and triggering browser download of a .txt file for manual Anki import
import { ANKI_NOTE_TYPE, ANKI_FIELDS } from './noteType.js';
import { wordToAnkiFields }            from './fields/index.js';

export function downloadAnkiTxt(words, deckName) {
  const lines = [
    '#separator:tab', '#html:true',
    `#notetype:${ANKI_NOTE_TYPE}`, `#deck:${deckName}`,
    '#columns:' + [...ANKI_FIELDS, 'Tags'].join('\t'),
  ];
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  for (const word of words) {
    const f      = wordToAnkiFields(word);
    const catTag = ((word.word_category || 'unknown').split(' ')[0]).toLowerCase().replace(/[^a-z]/g, '');
    const origin = (word.origin_language || word.origin_tag || 'unknown').toLowerCase().replace(/[^a-z]/g, '');
    const tags   = `hindi ${catTag} ${origin} added:${today}`;
    const row    = [...ANKI_FIELDS.map(k => (f[k] || '').replace(/\t/g, ' ')), tags];
    lines.push(row.join('\t'));
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href: url, download: `hindi_vocab_${new Date().toISOString().split('T')[0]}.txt`,
  });
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
