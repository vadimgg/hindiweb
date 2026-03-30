#!/usr/bin/env node
// Responsible for: aggregating individual changelog/ entries into CHANGELOG.md
// Usage: node scripts/aggregate-changelog.js   (or: npm run changelog)

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT      = new URL('..', import.meta.url).pathname;
const CHANGELOG = join(ROOT, 'changelog');
const OUT       = join(ROOT, 'CHANGELOG.md');

async function main() {
  let entries;
  try {
    entries = (await readdir(CHANGELOG))
      .filter(f => f.endsWith('.md'))
      .sort()
      .reverse(); // newest first
  } catch {
    console.error('No changelog/ directory found.');
    process.exit(1);
  }

  if (entries.length === 0) {
    console.log('No changelog entries found in changelog/');
    process.exit(0);
  }

  const sections = ['# Changelog', '', '_Individual entries live in `changelog/`. Run `npm run changelog` to regenerate this file._', ''];

  for (const filename of entries) {
    const raw  = await readFile(join(CHANGELOG, filename), 'utf-8');
    const date = filename.slice(0, 10); // YYYY-MM-DD from filename

    // Re-level headings: h1 → h2, h2 → h3, etc. so they nest under the top-level changelog
    const releveled = raw
      .split('\n')
      .map(line => {
        if (line.startsWith('# '))  return `## ${line.slice(2)}`;
        if (line.startsWith('## ')) return `### ${line.slice(3)}`;
        if (line.startsWith('### ')) return `#### ${line.slice(4)}`;
        return line;
      })
      .join('\n');

    sections.push(`---`, '', releveled.trim(), '');
  }

  await writeFile(OUT, sections.join('\n'));
  console.log(`CHANGELOG.md written (${entries.length} entries).`);
}

main().catch(e => { console.error(e); process.exit(1); });
