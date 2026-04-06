#!/usr/bin/env node
/**
 * build.js — optional convenience script.
 *
 * Reads index.html and inlines every <script src="..."> tag as an
 * inline <script> block, producing index-bundle.html — a single
 * portable file that can be shared or opened from any location.
 *
 * Usage:
 *   node build.js
 *
 * Output: specs/demo/index-bundle.html
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_DIR   = __dirname;
const INPUT_FILE = path.join(BASE_DIR, 'index.html');
const OUT_FILE   = path.join(BASE_DIR, 'index-bundle.html');

let html = fs.readFileSync(INPUT_FILE, 'utf8');

// Match all <script src="relative/path.js"> tags (not http)
const scriptTagRe = /<script\s+src="(?!https?:\/\/)([^"]+)"[^>]*><\/script>/g;

let match;
while ((match = scriptTagRe.exec(html)) !== null) {
  const tag      = match[0];
  const srcPath  = match[1];
  const filePath = path.resolve(BASE_DIR, srcPath);

  if (!fs.existsSync(filePath)) {
    console.warn(`[build.js] WARNING: file not found — ${filePath}`);
    continue;
  }

  const content    = fs.readFileSync(filePath, 'utf8');
  const inlineTag  = `<script>\n/* inlined: ${srcPath} */\n${content}\n</script>`;
  html = html.replace(tag, inlineTag);

  // Reset regex since we replaced in-place
  scriptTagRe.lastIndex = 0;
}

fs.writeFileSync(OUT_FILE, html, 'utf8');
console.log(`[build.js] Written: ${OUT_FILE}`);
