/**
 * Shared Anki tag-building utility for vocabulary words.
 *
 * Responsible for: deriving the standard Anki tag array from a word object so
 * that the live AnkiConnect export path (export.js) and the .txt fallback
 * download (txtFallback.js) always produce identical tags.
 *
 * Used by: anki/export.js, anki/txtFallback.js.
 * No dependencies on other project modules.
 */
// Responsible for: shared Anki tag-building utility used by export.js and txtFallback.js

/**
 * Builds the Anki tag list for a single vocabulary word.
 *
 * Tags produced:
 *   - 'hindi'                       — fixed namespace tag
 *   - category slug                 — first word of word_category, letters only
 *   - origin slug                   — origin_language or origin_tag, letters only
 *   - 'added:YYYYMMDD'              — today's date in compact ISO format
 *
 * @param {object}  word                  - Vocabulary word object.
 * @param {string}  [word.word_category]  - e.g. "adjective", "noun plural".
 * @param {string}  [word.origin_language] - e.g. "Sanskrit", "Arabic".
 * @param {string}  [word.origin_tag]     - Fallback if origin_language is absent.
 * @returns {string[]} Non-empty tag strings ready for the Anki API or .txt header.
 */
export function buildWordTags(word) {
  const today   = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const catSlug = ((word.word_category || 'unknown').split(' ')[0]).toLowerCase().replace(/[^a-z]/g, '');
  const origin  = (word.origin_language || word.origin_tag || 'unknown').toLowerCase().replace(/[^a-z]/g, '');
  return ['hindi', catSlug, origin, `added:${today}`].filter(Boolean);
}
