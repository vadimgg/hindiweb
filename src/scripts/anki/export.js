// Responsible for: orchestrating Anki deck creation, note type verification, and card addition
import { ankiRequest }                                from './connect.js';
import { ANKI_NOTE_TYPE, ANKI_FIELDS, ANKI_CSS, ANKI_FRONT, ANKI_BACK } from './noteType.js';
import { wordToAnkiFields }                           from './fields/index.js';

async function ensureNoteType() {
  const models = await ankiRequest('modelNames', {});
  if (!models.includes(ANKI_NOTE_TYPE)) {
    await ankiRequest('createModel', {
      modelName: ANKI_NOTE_TYPE, inOrderFields: ANKI_FIELDS,
      css: ANKI_CSS, isCloze: false,
      cardTemplates: [{ Name: 'Recognition', Front: ANKI_FRONT, Back: ANKI_BACK }],
    });
  } else {
    // Always sync CSS and templates so design changes take effect on re-export
    await ankiRequest('updateModelStyling', { model: { name: ANKI_NOTE_TYPE, css: ANKI_CSS } });
    await ankiRequest('updateModelTemplates', {
      model: {
        name: ANKI_NOTE_TYPE,
        templates: { Recognition: { Front: ANKI_FRONT, Back: ANKI_BACK } },
      },
    });
  }
}

function buildNotes(words, deckName, allowDuplicate = false) {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return words.map(word => {
    const f      = wordToAnkiFields(word);
    const catTag = ((word.word_category || 'unknown').split(' ')[0]).toLowerCase().replace(/[^a-z]/g, '');
    const origin = (word.origin_language || word.origin_tag || 'unknown').toLowerCase().replace(/[^a-z]/g, '');
    return {
      deckName, modelName: ANKI_NOTE_TYPE, fields: f,
      tags: ['hindi', catTag, origin, `added:${today}`].filter(Boolean),
      options: { allowDuplicate, duplicateScope: 'deck' },
    };
  });
}

export async function sendToAnki(words, deckName) {
  await ankiRequest('createDeck', { deck: deckName });
  await ensureNoteType();
  const notes   = buildNotes(words, deckName, false);
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

export async function overrideDeck(words, deckName) {
  await ankiRequest('createDeck', { deck: deckName });
  await ensureNoteType();
  // Delete every existing note in the deck
  const existingIds = await ankiRequest('findNotes', { query: `deck:"${deckName}"` });
  if (existingIds.length > 0) await ankiRequest('deleteNotes', { notes: existingIds });
  // Add all selected words, duplicates allowed since we just cleared the deck
  const notes   = buildNotes(words, deckName, true);
  const results = await ankiRequest('addNotes', { notes });
  const added   = results.filter(r => r !== null).length;
  return { added, deleted: existingIds.length };
}
