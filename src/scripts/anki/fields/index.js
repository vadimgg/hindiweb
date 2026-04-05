/**
 * Anki field assembly — combines all per-field HTML builders into one object.
 *
 * Responsible for: providing a single wordToAnkiFields() function that maps a
 * vocabulary word to a complete Anki fields object. Each field is produced by
 * a dedicated builder module; this file only wires them together.
 *
 * Dependencies: all files in anki/fields/.
 */
// Responsible for: assembling wordToAnkiFields() from all individual field builders
import { buildAnkiCategory }     from './category.js';
import { buildAnkiGender }       from './gender.js';
import { buildAnkiTransitivity } from './transitivity.js';
import { buildAnkiSyllables }    from './syllables.js';
import { buildAnkiForms }        from './forms.js';
import { buildAnkiUsageNotes }   from './usageNotes.js';
import { buildAnkiCollocations } from './collocations.js';
import { buildAnkiRelatedWords } from './relatedWords.js';
import { buildAnkiSoundAlikes }  from './soundAlikes.js';
import { buildAnkiEtymology }    from './etymology.js';
import { esc }                   from './utils.js';

/**
 * Converts a vocabulary word object into a complete Anki fields object.
 *
 * Returns a plain object keyed by field name (matching ANKI_FIELDS in noteType.js).
 * Each value is an HTML string safe for Anki's HTML card renderer.
 *
 * @param {object} word - Vocabulary word object from the vocab JSON files.
 * @returns {Record<string, string>} Map of Anki field name → HTML string.
 */
export function wordToAnkiFields(word) {
  return {
    English:      esc(word.english || ''),
    Hindi:        esc(word.hindi || ''),
    Romanisation: esc(word.romanisation || ''),
    Syllables:    buildAnkiSyllables(word),
    Category:     buildAnkiCategory(word),
    Gender:       buildAnkiGender(word),
    Transitivity: buildAnkiTransitivity(word),
    Forms:        buildAnkiForms(word),
    UsageNotes:   buildAnkiUsageNotes(word),
    Collocations: buildAnkiCollocations(word),
    RelatedWords: buildAnkiRelatedWords(word),
    SoundAlikes:  buildAnkiSoundAlikes(word),
    Etymology:    buildAnkiEtymology(word),
  };
}
