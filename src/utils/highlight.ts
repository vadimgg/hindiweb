const LANGUAGE_NAMES = [
  'Proto-Indo-European',
  'Sanskrit',
  'English',
  'Russian',
  'Hebrew',
  'Hindi',
  'Urdu',
  'Arabic',
  'Persian',
  'Latin',
  'Greek',
  'Prakrit',
  'Apabhraṃśa',
  'PIE',
  'French',
  'German',
  'Italian',
  'Spanish',
];

// Diacritics and special chars found in romanised Hindi/Sanskrit
const ROMANISED_RE = /'([^']*[āīūṭḍṇśṣṃḥṛṝḷ√][^']*)'/g;

const LANG_RE = new RegExp(`\\b(${LANGUAGE_NAMES.join('|')})\\b`, 'g');

export function highlight(text: string): string {
  // 1. HTML-escape raw text first so later replacements insert safe HTML
  let h = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Non-Latin scripts — each gets a distinct tint
  // Devanagari (Hindi/Sanskrit)
  h = h.replace(
    /[\u0900-\u097F]+/g,
    '<span class="text-amber-300 font-medium" lang="hi">$&</span>',
  );
  // Cyrillic (Russian)
  h = h.replace(
    /[\u0400-\u04FF]+/g,
    '<span class="text-violet-300">$&</span>',
  );
  // Hebrew
  h = h.replace(
    /[\u0590-\u05FF\uFB1D-\uFB4E]+/g,
    '<span class="text-emerald-300">$&</span>',
  );

  // 3. Language names — sky blue, slightly bold
  // (Run after script replacement so we don't re-scan span tags —
  //  language names are ASCII and won't appear inside our class strings)
  h = h.replace(
    LANG_RE,
    '<span class="text-sky-400 font-medium">$1</span>',
  );

  // 4. Romanised terms in single quotes (contain diacritics) — teal
  h = h.replace(
    ROMANISED_RE,
    `<span class="text-teal-300">'$1'</span>`,
  );

  return h;
}

// For cross_language_connections items that start with a label
export function parseCrossLangLabel(item: string): {
  label: 'TRUE RELATIVE' | 'USEFUL COINCIDENCE' | null;
  text: string;
} {
  const match = item.match(/^(TRUE RELATIVE|USEFUL COINCIDENCE):\s*/);
  if (!match) return { label: null, text: item };
  return {
    label: match[1] as 'TRUE RELATIVE' | 'USEFUL COINCIDENCE',
    text: item.slice(match[0].length),
  };
}
