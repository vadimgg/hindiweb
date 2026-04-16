/**
 * Pure helper functions for resolving audio file paths for words and sentences.
 *
 * Responsible for: resolving audio file paths for words and sentences from their JSON fields.
 *
 * No dependencies on other project modules. No DOM access, no side effects.
 */
// Responsible for: resolving audio file paths for words and sentences from their JSON fields

/**
 * Builds the base audio directory path for a word.
 * @param audioBatch - vocab filename without extension (e.g. 'hindi_01_vocab_batch_01')
 * @param hindi - word's hindi field
 * @param romanisation - word's romanisation field
 * @returns path prefix like '/audio/words/hindi_01_vocab_batch_01/लड़का_laṛkā'
 */
export function wordAudioBase(audioBatch: string, hindi: string, romanisation: string): string {
  return `/audio/words/${audioBatch}/${hindi}_${romanisation}`;
}

/**
 * Builds the base audio directory path for a sentence.
 * @param audioBatch - sentence filename without extension (e.g. 'hindi_01_batch_01')
 * @param english - sentence's english field
 * @returns path prefix like '/audio/sentences/hindi_01_batch_01/Are_you_Kamala'
 */
export function sentenceAudioBase(audioBatch: string, english: string): string {
  const sanitised = english.replace(/\s+/g, '_').replace(/[?!.,]/g, '');
  return `/audio/sentences/${audioBatch}/${sanitised}`;
}
