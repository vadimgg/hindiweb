// Responsible for: assembling wordToAnkiFields() from all individual field builders
import { buildAnkiCategory }      from './category.js';
import { buildAnkiForms }         from './forms.js';
import { buildAnkiExamples }      from './examples.js';
import { buildAnkiMemory }        from './memory.js';
import { buildAnkiRootOrigin }    from './rootOrigin.js';
import { buildAnkiSoundAlikes }   from './soundAlikes.js';
import { buildAnkiUrduPunjabi }   from './urduPunjabi.js';
import { buildAnkiCrossLang }     from './crossLang.js';
import { buildAnkiPronunciation } from './pronunciation.js';
import { esc } from './utils.js';

export function wordToAnkiFields(word) {
  return {
    English:       esc(word.english || ''),
    Category:      buildAnkiCategory(word),
    Hindi:         esc(word.hindi || ''),
    Romanisation:  esc(word.romanisation || ''),
    Forms:         buildAnkiForms(word),
    Pronunciation: buildAnkiPronunciation(word),
    Memory:        buildAnkiMemory(word),
    Examples:      buildAnkiExamples(word),
    RootOrigin:    buildAnkiRootOrigin(word),
    SoundAlikes:   buildAnkiSoundAlikes(word),
    UrduPunjabi:   buildAnkiUrduPunjabi(word),
    CrossLanguage: buildAnkiCrossLang(word),
  };
}
