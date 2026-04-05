/**
 * Shared string normalisation utilities for diacritic-insensitive matching.
 *
 * Responsible for: stripping diacritical marks and case-folding so that fuzzy
 * search and romanisation matching stay consistent without duplicating the logic.
 *
 * Used by: ui/search.js (fuzzy scoring), ui/tooltip.js (romanisation lookup).
 * No dependencies on other project modules.
 */
// Responsible for: shared diacritic-stripping norm() utility used by search.js and tooltip.js

/**
 * Strips diacritical marks and lowercases a string for diacritic-insensitive comparison.
 *
 * Decomposes the string to NFD (so ā → a + combining macron), strips the combining
 * characters (U+0300–U+036F), then lowercases and trims whitespace.
 *
 * @param {string} str - Input string, may contain diacritics such as ā, ī, ṭ, ṇ, etc.
 * @returns {string} Normalised lowercase string with all diacritics removed.
 *
 * @example
 * norm('Baṛā') // → 'bara'
 * norm('adhyāpak') // → 'adhyapak'
 */
export function norm(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
