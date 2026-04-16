/**
 * Pure helper functions for resolving audio file paths for words and sentences.
 *
 * Responsible for: resolving audio file paths for words and sentences from their JSON fields.
 *
 * No dependencies on other project modules. No DOM access, no side effects.
 */
// Responsible for: resolving audio file paths for words and sentences from their JSON fields

/**
 * Returns the full audio file path for a word.
 * @param audioBatch - vocab filename without extension (e.g. 'hindi_01_vocab_batch_01')
 * @param hindi - word's hindi field
 * @param romanisation - word's romanisation field
 * @returns full path like '/audio/words/hindi_01_vocab_batch_01/लड़का_laṛkā/00_main.mp3'
 */
export function wordAudioSrc(audioBatch: string, hindi: string, romanisation: string): string {
  return `/audio/words/${audioBatch}/${hindi}_${romanisation}/00_main.mp3`;
}

/**
 * Returns the full audio file path for a sentence.
 * @param audioBatch - sentence filename without extension (e.g. 'hindi_01_batch_01')
 * @param english - sentence's english field
 * @returns full path like '/audio/sentences/hindi_01_batch_01/Are_you_Kamala/00_main.mp3'
 */
export function sentenceAudioSrc(audioBatch: string, english: string): string {
  const sanitised = english.replace(/\s+/g, '_').replace(/[?!.,]/g, '');
  return `/audio/sentences/${audioBatch}/${sanitised}/00_main.mp3`;
}
