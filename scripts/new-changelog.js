#!/usr/bin/env node
// Responsible for: creating a new individual changelog entry file in changelog/
// Usage: node scripts/new-changelog.js "Short description of the change"

import { writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT      = new URL('..', import.meta.url).pathname;
const CHANGELOG = join(ROOT, 'changelog');

const description = process.argv.slice(2).join(' ').trim();
if (!description) {
  console.error('Usage: node scripts/new-changelog.js "Description of the change"');
  process.exit(1);
}

// Build a slug from the description
const slug = description
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60);

const today    = new Date().toISOString().slice(0, 10);
const filename = `${today}_${slug}.md`;
const filePath = join(CHANGELOG, filename);

// Check for existing files today to avoid collisions
const existing = await readdir(CHANGELOG).catch(() => []);
const conflict = existing.find(f => f === filename);
if (conflict) {
  console.error(`File already exists: changelog/${filename}`);
  process.exit(1);
}

const content = `# ${description}

Date: ${today}

## What changed

<!-- Describe what was added, changed, or fixed -->

## Why

<!-- Motivation or context -->

## Files affected

<!-- List key files that were modified -->
`;

await writeFile(filePath, content);
console.log(`Created: changelog/${filename}`);
