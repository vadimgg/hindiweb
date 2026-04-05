#!/usr/bin/env node
/**
 * Architecture documentation generator.
 *
 * Responsible for: scanning all source files in src/ and scripts/, extracting
 * file-level responsibility comments, import dependencies, and JSDoc-documented
 * functions, then writing a comprehensive ARCHITECTURE.md to the project root.
 *
 * Run with: npm run arch
 *
 * The generated file gives a full picture of the codebase for review or AI
 * context loading. Regenerate after any significant change.
 */
// Responsible for: scanning src/ source files and generating ARCHITECTURE.md

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, extname, dirname } from 'node:path';

const ROOT    = new URL('..', import.meta.url).pathname;
const SRC     = join(ROOT, 'src');
const SCRIPTS = join(ROOT, 'scripts');
const OUT     = join(ROOT, 'ARCHITECTURE.md');
const EXTS    = new Set(['.astro', '.ts', '.js']);
const IGNORE  = new Set(['node_modules', 'dist', '.astro', 'env.d.ts']);

// ── File walking ──────────────────────────────────────────────────────────────

/**
 * Recursively walks a directory, returning all matching source files sorted
 * directories-first then alphabetically within each level.
 *
 * @param {string}   dir     - Directory to walk.
 * @param {string[]} results - Accumulator (used for recursion).
 * @returns {Promise<string[]>} Absolute paths to all matching files.
 */
async function walk(dir, results = []) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return results; }
  for (const entry of entries.sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
    return a.name.localeCompare(b.name);
  })) {
    if (IGNORE.has(entry.name) || entry.name.startsWith('.')) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) await walk(fullPath, results);
    else if (EXTS.has(extname(entry.name))) results.push(fullPath);
  }
  return results;
}

// ── Text extraction helpers ───────────────────────────────────────────────────

/**
 * Extracts the one-liner "Responsible for:" text from a `// Responsible for:` comment.
 * Only matches lines where "Responsible for:" appears as a JS/TS line comment (// prefix),
 * which avoids accidentally picking up occurrences inside JSDoc block comments.
 *
 * @param {string} text - Full file text.
 * @returns {string} Responsibility description, or '—' if not found.
 */
function extractResponsibility(text) {
  for (const line of text.split('\n').slice(0, 20)) {
    // Require the // comment prefix so we skip JSDoc block occurrences
    const match = line.match(/\/\/\s*Responsible for:\s*(.+)/);
    if (match) return match[1].trim().replace(/^[-–]?\s*/, '');
  }
  return '—';
}

/**
 * Extracts all import paths from a file's import declarations.
 *
 * Handles:
 *   import { foo } from './bar.js'
 *   import foo from '../baz'
 *   import { readdir } from 'node:fs/promises'
 *
 * Filters out Node built-ins (node:*) since those aren't project modules.
 *
 * @param {string} text - Full file text.
 * @returns {string[]} Array of import path strings (relative paths kept as-is).
 */
function extractImports(text) {
  const imports = [];
  for (const line of text.split('\n')) {
    const match = line.match(/^import\s+(?:type\s+)?(?:\{[^}]*\}|\w+|\*\s+as\s+\w+)\s+from\s+['"]([^'"]+)['"]/);
    if (match && !match[1].startsWith('node:')) imports.push(match[1]);
  }
  return [...new Set(imports)]; // deduplicate
}

/**
 * Extracts all export declarations (function names, const names) from a file.
 *
 * @param {string} text - Full file text.
 * @returns {string[]} Sorted array of exported symbol names.
 */
function extractExports(text) {
  const exports = new Set();
  for (const match of text.matchAll(/^export\s+(?:async\s+)?(?:function|const|class|type|interface)\s+(\w+)/gm)) {
    exports.add(match[1]);
  }
  return [...exports].sort();
}

/**
 * Extracts all function names and their JSDoc descriptions from a file.
 *
 * Two-pass approach:
 *   1. Collect all JSDoc block positions.
 *   2. Find all function/const declarations; for each, look backwards for the
 *      nearest JSDoc block that ends with only whitespace before the declaration.
 *
 * This is more reliable than a combined regex because it avoids greedy-matching
 * issues when there are @type blocks on variables between two function declarations.
 *
 * @param {string} text - Full file text.
 * @returns {{ name: string, description: string, isExported: boolean }[]}
 */
function extractFunctions(text) {
  // ── Pass 1: collect all JSDoc block positions ──────────────────────────────
  const jsdocBlocks = [];
  for (const m of text.matchAll(/\/\*\*([\s\S]*?)\*\//g)) {
    jsdocBlocks.push({ start: m.index, end: m.index + m[0].length, raw: m[0] });
  }

  /**
   * Finds the nearest JSDoc block that ends just before declPos (only whitespace between).
   *
   * @param {number} declPos - Character offset of the declaration.
   * @returns {string|null} Raw JSDoc string or null.
   */
  function findPrecedingJsDoc(declPos) {
    for (let i = jsdocBlocks.length - 1; i >= 0; i--) {
      const block = jsdocBlocks[i];
      if (block.end > declPos) continue;
      if (/^\s*$/.test(text.slice(block.end, declPos))) return block.raw;
      break;  // code between block and declaration — not a match
    }
    return null;
  }

  /**
   * Extracts the first descriptive sentence from a JSDoc block.
   * Returns '' for @type-only blocks (variable annotations, not function docs).
   *
   * Handles both single-line `/** text *\/` and multi-line `/** \n * text \n *\/` formats.
   *
   * @param {string|null} raw - Raw JSDoc string.
   * @returns {string}
   */
  function descFromJsDoc(raw) {
    if (!raw) return '';
    // Strip opening /** and closing */ then clean each line of leading * whitespace
    const inner = raw.replace(/^\/\*\*/, '').replace(/\*\/$/, '');
    const lines  = inner.split('\n').map(l => l.replace(/^\s*\*\s?/, '').trim()).filter(l => l);
    if (lines.length === 0) return '';
    // @type-only blocks are variable annotations — skip them
    if (lines.every(l => l.startsWith('@type'))) return '';
    // Return the first non-tag line as the description
    return lines.find(l => !l.startsWith('@')) || '';
  }

  // ── Pass 2: find all function / const-arrow declarations ──────────────────
  const functions = [];
  const seen      = new Set();

  for (const m of text.matchAll(/^(export\s+)?(async\s+)?function\s+(\w+)/gm)) {
    const name = m[3];
    if (seen.has(name)) continue;
    seen.add(name);
    functions.push({ name, description: descFromJsDoc(findPrecedingJsDoc(m.index)), isExported: !!m[1] });
  }

  for (const m of text.matchAll(/^(export\s+)?const\s+(\w+)\s*=\s*(?:async\s+)?(?:\(|[\w$]+\s*=>)/gm)) {
    const name = m[2];
    if (seen.has(name)) continue;
    seen.add(name);
    functions.push({ name, description: descFromJsDoc(findPrecedingJsDoc(m.index)), isExported: !!m[1] });
  }

  return functions;
}

/**
 * Counts the number of lines in a text string.
 *
 * @param {string} text - File text.
 * @returns {number} Line count.
 */
function countLines(text) {
  return text.split('\n').length;
}

// ── Improvement detection ─────────────────────────────────────────────────────

/**
 * Scans all file info objects and produces auto-detected improvement notes.
 *
 * Currently detects:
 *   - Files missing a "Responsible for:" comment
 *   - Exported functions missing JSDoc descriptions
 *   - Duplicate function names across files (potential shared-util candidates)
 *
 * @param {{ path: string, responsibility: string, functions: { name: string, description: string, isExported: boolean }[] }[]} fileInfos
 * @returns {string[]} Array of markdown bullet strings.
 */
function detectImprovements(fileInfos) {
  const notes = [];

  const missingResponsibility = fileInfos.filter(f => f.responsibility === '—');
  if (missingResponsibility.length > 0) {
    notes.push(`**Missing "Responsible for:" comments** in: ${missingResponsibility.map(f => `\`${f.relPath}\``).join(', ')}`);
  }

  const missingDocs = [];
  for (const fi of fileInfos) {
    const undocumented = fi.functions.filter(fn => fn.isExported && !fn.description);
    if (undocumented.length > 0) {
      missingDocs.push(`\`${fi.relPath}\` — ${undocumented.map(fn => fn.name).join(', ')}`);
    }
  }
  if (missingDocs.length > 0) {
    notes.push(`**Exported functions missing JSDoc descriptions:**\n${missingDocs.map(d => `  - ${d}`).join('\n')}`);
  }

  // Detect duplicate function names across files (cross-file duplication candidates)
  const nameCount = new Map();
  for (const fi of fileInfos) {
    for (const fn of fi.functions) {
      if (!nameCount.has(fn.name)) nameCount.set(fn.name, []);
      nameCount.get(fn.name).push(fi.relPath);
    }
  }
  const duplicates = [...nameCount.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([name, paths]) => `\`${name}\` in ${paths.map(p => `\`${p}\``).join(' and ')}`);
  if (duplicates.length > 0) {
    notes.push(`**Functions with the same name in multiple files** (review for shared-util extraction):\n${duplicates.map(d => `  - ${d}`).join('\n')}`);
  }

  return notes;
}

// ── Grouping ──────────────────────────────────────────────────────────────────

/**
 * Groups file info objects by their directory relative to ROOT.
 *
 * @param {{ relPath: string }[]} fileInfos
 * @returns {Map<string, object[]>} Directory path → file infos.
 */
function groupByDirectory(fileInfos) {
  const groups = new Map();
  for (const fi of fileInfos) {
    const dir = dirname(fi.relPath);
    if (!groups.has(dir)) groups.set(dir, []);
    groups.get(dir).push(fi);
  }
  return groups;
}

// ── Markdown rendering ────────────────────────────────────────────────────────

/**
 * Renders the complete ARCHITECTURE.md content as a string.
 *
 * @param {{ relPath, responsibility, lineCount, imports, exports, functions }[]} fileInfos
 * @returns {string} Full markdown document.
 */
function renderMarkdown(fileInfos) {
  const lines = [
    '# Architecture',
    '',
    `_Generated ${new Date().toISOString().slice(0, 10)} by \`npm run arch\`._`,
    '',
    '---',
    '',
    '## Overview',
    '',
    '| File | Lines | Responsible for |',
    '|---|---|---|',
  ];

  for (const fi of fileInfos) {
    lines.push(`| \`${fi.relPath}\` | ${fi.lineCount} | ${fi.responsibility} |`);
  }

  lines.push('', '---', '', '## File Details', '');

  const groups = groupByDirectory(fileInfos);
  for (const [dir, files] of [...groups.entries()].sort()) {
    lines.push(`### \`${dir}/\``, '');
    for (const fi of files) {
      const fileName = fi.relPath.split('/').pop();
      lines.push(`#### \`${fileName}\``);
      lines.push(`**Responsibility:** ${fi.responsibility}  `);
      lines.push(`**Lines:** ${fi.lineCount}`);

      if (fi.imports.length > 0) {
        lines.push(`**Depends on:** ${fi.imports.map(i => `\`${i}\``).join(', ')}`);
      }

      if (fi.exports.length > 0) {
        lines.push(`**Exports:** ${fi.exports.map(e => `\`${e}\``).join(', ')}`);
      }

      const docFunctions = fi.functions.filter(fn => fn.description);
      if (docFunctions.length > 0) {
        lines.push('**Functions:**');
        for (const fn of docFunctions) {
          const marker = fn.isExported ? '' : '_(internal)_ ';
          lines.push(`- \`${fn.name}()\` ${marker}— ${fn.description}`);
        }
      }

      lines.push('');
    }
  }

  // Improvement notes
  const improvements = detectImprovements(fileInfos);
  lines.push('---', '', '## Auto-detected Improvement Notes', '');
  if (improvements.length === 0) {
    lines.push('_No issues detected. All files have responsibility comments and exported functions have JSDoc._');
  } else {
    for (const note of improvements) {
      lines.push(`- ${note}`);
    }
  }

  lines.push('');
  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Collect files from src/ and scripts/
  const srcFiles     = await walk(SRC);
  const scriptFiles  = (await walk(SCRIPTS)).filter(f => !f.endsWith('arch.js') === false || true);
  const allFiles     = [...srcFiles, ...scriptFiles];

  const fileInfos = await Promise.all(allFiles.map(async (absPath) => {
    const text           = await readFile(absPath, 'utf-8').catch(() => '');
    const relPath        = relative(ROOT, absPath);
    return {
      relPath,
      responsibility: extractResponsibility(text),
      lineCount:      countLines(text),
      imports:        extractImports(text),
      exports:        extractExports(text),
      functions:      extractFunctions(text),
    };
  }));

  const markdown = renderMarkdown(fileInfos);
  await writeFile(OUT, markdown);
  console.log(`ARCHITECTURE.md written (${allFiles.length} files).`);
}

main().catch(e => { console.error(e); process.exit(1); });
