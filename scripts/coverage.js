#!/usr/bin/env node
/**
 * Field registry generator.
 *
 * Responsible for: scanning vocab JSON files for all top-level word fields,
 * checking coverage across the demo, web (Astro), and Anki surfaces, then
 * writing FIELD_REGISTRY.md to the project root.
 *
 * Run with: npm run coverage
 *
 * Regenerate after any vocab format change, new section component, or demo update.
 */
// Responsible for: scanning vocab/words/ JSON files and generating FIELD_REGISTRY.md

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT   = new URL('..', import.meta.url).pathname;
const VOCAB  = join(ROOT, 'vocab', 'words');
const OUT    = join(ROOT, 'FIELD_REGISTRY.md');

// Fields that are metadata / export-only — never rendered on any visual surface.
const EXCLUDED_FIELDS = ['anki_tags', 'date_added'];

// ── Surface file paths ────────────────────────────────────────────────────────

const DEMO_FILES = [
  join(ROOT, 'specs', 'demo', 'components', 'word-card.js'),
];

const WEB_DIRS = [
  join(ROOT, 'src', 'components', 'cards', 'sections'),
];
const WEB_EXTRA = [
  join(ROOT, 'src', 'components', 'WordCard.astro'),
];

const ANKI_DIR   = join(ROOT, 'src', 'scripts', 'anki', 'fields');
const ANKI_SKIP  = new Set(['index.js', 'utils.js']);

// ── File walking helpers ──────────────────────────────────────────────────────

/**
 * Returns all files in a directory with the given extension (non-recursive).
 *
 * @param {string}   dir - Directory to list.
 * @param {string}   ext - File extension filter (e.g. '.js').
 * @param {Set}      [skip] - Filenames to skip.
 * @returns {Promise<string[]>} Absolute paths.
 */
async function listFiles(dir, ext, skip = new Set()) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return []; }
  return entries
    .filter(e => e.isFile() && e.name.endsWith(ext) && !skip.has(e.name))
    .map(e => join(dir, e.name));
}

/**
 * Reads a file and returns its text, or empty string on error.
 *
 * @param {string} p - Absolute path.
 * @returns {Promise<string>}
 */
async function readText(p) {
  return readFile(p, 'utf-8').catch(() => '');
}

// ── Vocab field extraction ────────────────────────────────────────────────────

/**
 * Infers a human-readable type label for a field value.
 *
 * @param {*} val - The field value from a word object.
 * @returns {string} Type label.
 */
function typeLabel(val) {
  if (Array.isArray(val)) {
    if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
      const keys = Object.keys(val[0]).join(', ');
      return `array {${keys}}`;
    }
    return 'array';
  }
  if (val !== null && typeof val === 'object') {
    const keys = Object.keys(val).join(', ');
    return `object {${keys}}`;
  }
  return typeof val;
}

/**
 * Reads all vocab JSON files, extracts top-level word fields, and returns a
 * map of field name → inferred type label.
 *
 * @returns {Promise<Map<string, string>>} Ordered map: field → type string.
 */
async function extractVocabFields() {
  const files = (await readdir(VOCAB, { withFileTypes: true }).catch(() => []))
    .filter(e => e.isFile() && e.name.endsWith('.json'))
    .map(e => join(VOCAB, e.name));

  // Collect field→example-value across all words in all files.
  const fieldExamples = new Map();
  const fieldOptional = new Set();

  for (const file of files) {
    const raw = await readText(file);
    let parsed;
    try { parsed = JSON.parse(raw); } catch { continue; }
    const words = Array.isArray(parsed.words) ? parsed.words : [];
    for (const word of words) {
      for (const [key, val] of Object.entries(word)) {
        if (!fieldExamples.has(key)) {
          fieldExamples.set(key, val);
        }
      }
    }
    // Detect optional fields: any field absent on at least one word
    if (words.length > 0) {
      const allKeys = new Set(fieldExamples.keys());
      for (const word of words) {
        for (const key of allKeys) {
          if (!(key in word)) fieldOptional.add(key);
        }
      }
    }
  }

  // Build ordered result map, marking optional fields with '?'
  const result = new Map();
  for (const [field, val] of fieldExamples.entries()) {
    let type = typeLabel(val);
    if (fieldOptional.has(field)) type += '?';
    result.set(field, type);
  }
  return result;
}

// ── Coverage checking ─────────────────────────────────────────────────────────

/**
 * Checks whether a field name is referenced in a body of text.
 * Looks for `word.fieldName` or `fieldName` as a standalone identifier.
 *
 * @param {string} text      - File content to search.
 * @param {string} fieldName - Field name to look for.
 * @returns {boolean}
 */
function fieldFound(text, fieldName) {
  // Prefer explicit word.field pattern; fall back to word-boundary match
  if (text.includes(`word.${fieldName}`)) return true;
  // Word-boundary equivalent using simple character checks
  const idx = text.indexOf(fieldName);
  if (idx === -1) return false;
  const before = idx > 0 ? text[idx - 1] : ' ';
  const after  = idx + fieldName.length < text.length ? text[idx + fieldName.length] : ' ';
  const wordChar = /[A-Za-z0-9_]/;
  return !wordChar.test(before) && !wordChar.test(after);
}

/**
 * Checks coverage of a field name across all texts from a surface.
 *
 * @param {string[]} texts     - Array of file contents for the surface.
 * @param {string}   fieldName - Field to look for.
 * @returns {boolean}
 */
function coveredIn(texts, fieldName) {
  return texts.some(t => fieldFound(t, fieldName));
}

// ── Markdown rendering ────────────────────────────────────────────────────────

/**
 * Renders the FIELD_REGISTRY.md content.
 *
 * @param {Map<string, string>} fields  - field → type label.
 * @param {string[]}            demoTexts
 * @param {string[]}            webTexts
 * @param {string[]}            ankiTexts
 * @returns {string}
 */
function renderMarkdown(fields, demoTexts, webTexts, ankiTexts) {
  const rows = [];
  const gaps = [];

  for (const [field, type] of fields.entries()) {
    const excluded = EXCLUDED_FIELDS.includes(field);

    let demoCell, webCell, ankiCell, statusCell;

    if (excluded) {
      demoCell  = '—';
      webCell   = '—';
      ankiCell  = '—';
      statusCell = '— metadata';
    } else {
      demoCell  = coveredIn(demoTexts,  field) ? '✅' : '❌';
      webCell   = coveredIn(webTexts,   field) ? '✅' : '❌';
      ankiCell  = coveredIn(ankiTexts,  field) ? '✅' : '❌';

      const allCovered = demoCell === '✅' && webCell === '✅' && ankiCell === '✅';
      if (allCovered) {
        statusCell = '✅ full parity';
      } else {
        statusCell = '⚠️ parity gap';
        gaps.push(field);
      }
    }

    rows.push(`| ${field} | ${type} | ${demoCell} | ${webCell} | ${ankiCell} | ${statusCell} |`);
  }

  const totalFields   = [...fields.keys()].filter(f => !EXCLUDED_FIELDS.includes(f)).length;
  const fullParity    = totalFields - gaps.length;
  const metadataCount = EXCLUDED_FIELDS.filter(f => fields.has(f)).length;

  const lines = [
    '# Field Registry',
    '',
    `_Generated ${new Date().toISOString().slice(0, 10)} by \`npm run coverage\`._`,
    '',
    'Fields extracted from `vocab/words/` JSON files, cross-referenced against demo, web, and Anki rendering surfaces.',
    '',
    '**Legend:** ✅ covered · ❌ missing · — not rendered (metadata/export-only)',
    '',
    '| Field | Type | Demo | Web (Astro) | Anki | Status |',
    '|---|---|---|---|---|---|',
    ...rows,
    '',
    '---',
    '',
    '## Summary',
    '',
    `- **Total rendered fields:** ${totalFields}`,
    `- **Full parity:** ${fullParity}`,
    `- **Parity gaps:** ${gaps.length}`,
    `- **Metadata-only (excluded):** ${metadataCount}`,
    '',
  ];

  if (gaps.length > 0) {
    lines.push('### Fields with parity gaps', '');
    for (const g of gaps) lines.push(`- \`${g}\``);
    lines.push('');
  }

  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Collect all surface texts
  const demoTexts = await Promise.all(DEMO_FILES.map(readText));

  const webAstroFiles = await listFiles(WEB_DIRS[0], '.astro');
  const webFiles      = [...webAstroFiles, ...WEB_EXTRA];
  const webTexts      = await Promise.all(webFiles.map(readText));

  const ankiFiles = await listFiles(ANKI_DIR, '.js', ANKI_SKIP);
  const ankiTexts = await Promise.all(ankiFiles.map(readText));

  // Extract fields from vocab JSON
  const fields = await extractVocabFields();

  const markdown = renderMarkdown(fields, demoTexts, webTexts, ankiTexts);
  await writeFile(OUT, markdown);

  // Summary to stdout
  const excluded = EXCLUDED_FIELDS.filter(f => fields.has(f));
  const rendered = [...fields.keys()].filter(f => !EXCLUDED_FIELDS.includes(f));
  const gaps = [];
  for (const field of rendered) {
    const demoOk = coveredIn(demoTexts, field);
    const webOk  = coveredIn(webTexts,  field);
    const ankiOk = coveredIn(ankiTexts, field);
    if (!demoOk || !webOk || !ankiOk) gaps.push(field);
  }

  console.log(`FIELD_REGISTRY.md written.`);
  console.log(`  Fields total:     ${fields.size}`);
  console.log(`  Rendered:         ${rendered.length}`);
  console.log(`  Full parity:      ${rendered.length - gaps.length}`);
  console.log(`  Parity gaps:      ${gaps.length}`);
  console.log(`  Metadata-only:    ${excluded.length}`);
  if (gaps.length > 0) {
    console.log(`\nGap fields: ${gaps.join(', ')}`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
