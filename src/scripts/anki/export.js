// Responsible for: orchestrating Anki deck creation, note type verification, and card addition
import { ankiRequest }                                from './connect.js';
import { ANKI_NOTE_TYPE, ANKI_FIELDS, ANKI_CSS, ANKI_FRONT, ANKI_BACK } from './noteType.js';
import { wordToAnkiFields }                           from './fields/index.js';

async function ensureNoteType() {
  const models = await ankiRequest('modelNames', {});
  if (models.includes(ANKI_NOTE_TYPE)) return;
  await ankiRequest('createModel', {
    modelName: ANKI_NOTE_TYPE, inOrderFields: ANKI_FIELDS,
    css: ANKI_CSS, isCloze: false,
    cardTemplates: [{ Name: 'Recognition', Front: ANKI_FRONT, Back: ANKI_BACK }],
  });
}

export async function sendToAnki(words, deckName) {
  await ankiRequest('createDeck', { deck: deckName });
  await ensureNoteType();
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const notes = words.map(word => {
    const f       = wordToAnkiFields(word);
    const catTag  = ((word.word_category || 'unknown').split(' ')[0]).toLowerCase().replace(/[^a-z]/g, '');
    const origin  = (word.origin_language || word.origin_tag || 'unknown').toLowerCase().replace(/[^a-z]/g, '');
    return {
      deckName, modelName: ANKI_NOTE_TYPE, fields: f,
      tags: ['hindi', catTag, origin, `added:${today}`].filter(Boolean),
      options: { allowDuplicate: false, duplicateScope: 'deck' },
    };
  });
  const canAdd  = await ankiRequest('canAddNotes', { notes });
  const toAdd   = notes.filter((_, i) => canAdd[i]);
  const skipped = notes.length - toAdd.length;
  let added = 0;
  if (toAdd.length > 0) {
    const results = await ankiRequest('addNotes', { notes: toAdd });
    added = results.filter(r => r !== null).length;
  }
  return { added, skipped };
}
