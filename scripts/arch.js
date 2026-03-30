#!/usr/bin/env node
// Responsible for: scanning src/ source files and generating ARCHITECTURE.md
// Usage: node scripts/arch.js   (or: npm run arch)

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';

const ROOT    = new URL('..', import.meta.url).pathname;
const SRC     = join(ROOT, 'src');
const OUT     = join(ROOT, 'ARCHITECTURE.md');
const EXTS    = new Set(['.astro', '.ts', '.js']);
const IGNORE  = new Set(['node_modules', 'dist', '.astro']);

// Extract the "Responsible for:" comment from the first few lines of a file
async function getResponsibility(filePath) {
  try {
    const text  = await readFile(filePath, 'utf-8');
    const lines = text.split('\n').slice(0, 5);
    for (const line of lines) {
      const m = line.match(/Responsible for:\s*(.+)/);
      if (m) return m[1].trim().replace(/^[-–]?\s*/, '');
    }
    return '—';
  } catch { return '—'; }
}

async function walk(dir, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries.sort((a, b) => {
    // directories first, then files
    if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
    return a.name.localeCompare(b.name);
  })) {
    if (IGNORE.has(e.name) || e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, results);
    else if (EXTS.has(extname(e.name))) results.push(full);
  }
  return results;
}

async function countLines(filePath) {
  try {
    const text = await readFile(filePath, 'utf-8');
    return text.split('\n').length;
  } catch { return 0; }
}

// Group files by their immediate parent directory relative to src/
function groupByDir(files) {
  const groups = new Map();
  for (const f of files) {
    const rel   = relative(SRC, f);
    const parts = rel.split('/');
    const dir   = parts.length > 1 ? parts.slice(0, -1).join('/') : '.';
    if (!groups.has(dir)) groups.set(dir, []);
    groups.get(dir).push(f);
  }
  return groups;
}

async function main() {
  const files  = await walk(SRC);
  const groups = groupByDir(files);
  const lines  = ['# Architecture', '', `_Generated ${new Date().toISOString().slice(0, 10)} by \`npm run arch\`._`, ''];

  for (const [dir, dirFiles] of [...groups.entries()].sort()) {
    const heading = dir === '.' ? 'src/' : `src/${dir}/`;
    lines.push(`## ${heading}`, '');
    lines.push('| File | Lines | Responsible for |');
    lines.push('|---|---|---|');
    for (const f of dirFiles) {
      const rel   = relative(SRC, f);
      const name  = rel.split('/').pop();
      const resp  = await getResponsibility(f);
      const lc    = await countLines(f);
      lines.push(`| \`${name}\` | ${lc} | ${resp} |`);
    }
    lines.push('');
  }

  await writeFile(OUT, lines.join('\n'));
  console.log(`ARCHITECTURE.md written (${files.length} files).`);
}

main().catch(e => { console.error(e); process.exit(1); });
