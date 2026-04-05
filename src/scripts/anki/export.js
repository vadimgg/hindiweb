/**
 * Anki export orchestration — deck creation, note type sync, and card addition.
 *
 * Responsible for: coordinating the full export pipeline from a word array to
 * Anki cards. Handles two modes — incremental (skip duplicates) and override
 * (wipe deck then re-add). Does NOT build HTML field content or generate tags;
 * those concerns live in fields/index.js and tagUtils.js respectively.
 *
 * Dependencies: anki/connect.js, anki/noteType.js, anki/fields/index.js, anki/tagUtils.js.
 */
// Responsible for: orchestrating Anki deck creation, note type verification, and card addition
import { ankiRequest }                                           from './connect.js';
import { ANKI_NOTE_TYPE, ANKI_FIELDS, ANKI_CSS, ANKI_FRONT, ANKI_BACK } from './noteType.js';
import { wordToAnkiFields }                                      from './fields/index.js';
import { buildWordTags }                                         from './tagUtils.js';

/**
 * Creates the note type if it does not exist, or syncs its CSS and templates if it does.
 * Called before every export so design changes on the website propagate to Anki on re-export.
 *
 * @returns {Promise<void>}
 */
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

/**
 * Converts an array of vocabulary words into Anki note objects ready for the API.
 *
 * @param {object[]} words          - Vocabulary word objects.
 * @param {string}   deckName       - Target Anki deck name.
 * @param {boolean}  [allowDuplicate=false] - Whether Anki should accept duplicate notes.
 * @returns {object[]} Array of Anki note objects.
 */
function buildNotes(words, deckName, allowDuplicate = false) {
  return words.map(word => ({
    deckName,
    modelName: ANKI_NOTE_TYPE,
    fields:    wordToAnkiFields(word),
    tags:      buildWordTags(word),
    options:   { allowDuplicate, duplicateScope: 'deck' },
  }));
}

/**
 * Exports selected words to Anki, skipping cards that already exist in the deck.
 *
 * @param {object[]} words    - Vocabulary word objects to export.
 * @param {string}   deckName - Target Anki deck name (created if it does not exist).
 * @returns {Promise<{ added: number, skipped: number }>} Counts of added and skipped cards.
 */
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

/**
 * Replaces all cards in the target deck with the given words.
 *
 * Deletes every existing note in the deck first, then adds all selected words
 * with duplicate checking disabled (since the deck was just cleared).
 *
 * @param {object[]} words    - Vocabulary word objects to export.
 * @param {string}   deckName - Target Anki deck name.
 * @returns {Promise<{ added: number, deleted: number }>} Counts of added and deleted cards.
 */
export async function overrideDeck(words, deckName) {
  await ankiRequest('createDeck', { deck: deckName });
  await ensureNoteType();
  const existingIds = await ankiRequest('findNotes', { query: `deck:"${deckName}"` });
  if (existingIds.length > 0) await ankiRequest('deleteNotes', { notes: existingIds });
  // Duplicates allowed since we just cleared the deck
  const notes   = buildNotes(words, deckName, true);
  const results = await ankiRequest('addNotes', { notes });
  const added   = results.filter(r => r !== null).length;
  return { added, deleted: existingIds.length };
}
