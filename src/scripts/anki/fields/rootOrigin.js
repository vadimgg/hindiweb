/**
 * Anki Root & Origin field builder.
 *
 * Responsible for: rendering root parts, root breakdown (string or object),
 * evolution chain (string or array of steps), logic note, root notes,
 * root-and-origin explanation paragraphs, and the etymology story block.
 *
 * Dependencies: anki/fields/utils.js.
 */
// Responsible for: building the Anki Root & Origin and Etymology Story HTML fields
import { esc, aSection } from './utils.js';

/**
 * Renders root parts list, optional "via" note, and the root object/string.
 *
 * @param {string}   via - Optional "in Hindi via" introductory note.
 * @param {object[]} rp  - Array of { script, element, meaning } root part objects.
 * @param {object}   rb  - root_breakdown object with optional .root field.
 * @returns {string} HTML string fragment.
 */
function renderRootHeader(via, rp, rb) {
  let html = '';
  if (via) html += `<p style="font-size:.78rem;color:#93c5fd;font-style:italic;margin:0 0 .6rem 0;">${esc(via)}</p>`;
  rp.forEach(p => {
    html += `<div class="word-row" style="margin-bottom:.5rem;">`;
    html += `<span class="word-text" lang="hi">${esc(p.script)}</span>`;
    html += `<span class="word-rom">${esc(p.element)}</span>`;
    html += `<span style="color:#94a3b8;font-size:.83rem;">— ${esc(p.meaning)}</span>`;
    html += `</div>`;
  });
  if (rb.root && typeof rb.root === 'object') {
    const r = rb.root;
    html += `<div style="display:flex;flex-wrap:wrap;gap:.4rem .75rem;align-items:baseline;margin-bottom:.5rem;">`;
    html += `<span lang="hi" style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.05rem;color:#fbbf24;">${esc(r.word)}</span>`;
    html += `<span style="color:#5eead4;font-size:.9rem;">${esc(r.romanisation)}</span>`;
    html += `<span style="color:#94a3b8;font-size:.83rem;">— ${esc(r.meaning)}</span>`;
    html += `<span style="color:#475569;font-size:.75rem;">(${esc(r.language)})</span>`;
    html += `</div>`;
  } else if (typeof rb.root === 'string') {
    html += `<p style="font-size:.9rem;color:#f1f5f9;font-weight:600;line-height:1.6;margin:0 0 .5rem 0;">${esc(rb.root)}</p>`;
  }
  return html;
}

/**
 * Renders the evolution chain (array of steps or a plain string).
 *
 * @param {object} rb - root_breakdown object with optional .evolution field.
 * @returns {string} HTML string fragment.
 */
function renderEvolution(rb) {
  if (Array.isArray(rb.evolution) && rb.evolution.length > 0) {
    const chain = rb.evolution.map(s => `${esc(s.stage)}: <span style="color:#99f6e4;">${esc(s.form)}</span>`).join(' <span style="color:#334155;margin:0 .2rem;">→</span> ');
    return `<p style="font-family:monospace;font-size:.8rem;color:rgba(94,234,212,.75);letter-spacing:.03em;line-height:1.55;margin:0 0 .5rem 0;">${chain}</p>`;
  }
  if (rb.evolution && typeof rb.evolution === 'string') {
    return `<p style="font-family:monospace;font-size:.82rem;color:rgba(94,234,212,.75);letter-spacing:.04em;line-height:1.55;margin:0 0 .5rem 0;">${esc(rb.evolution)}</p>`;
  }
  return '';
}

/**
 * Renders the etymology story block (heading + one paragraph per line).
 *
 * @param {string[]} etymLines - Array of etymology paragraph strings.
 * @returns {string} HTML string fragment, or empty string if no lines.
 */
function renderEtymology(etymLines) {
  if (!etymLines.length) return '';
  let html = `<div style="border-top:1px solid rgba(148,163,184,.12);margin-top:.75rem;padding-top:.75rem;">`;
  html += `<p style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:#92400e;margin:0 0 .5rem 0;">Etymology</p>`;
  etymLines.forEach(para => { html += `<p style="font-size:.9rem;color:#e2e8f0;line-height:1.7;margin:0 0 .4rem 0;">${esc(para)}</p>`; });
  return html + `</div>`;
}

/**
 * Builds the Anki RootOrigin field HTML for a word.
 *
 * Handles both string and structured-object variants of root_breakdown and evolution.
 *
 * @param {object} word - Vocabulary word object.
 * @returns {string} HTML section, or empty string if no root/etymology data.
 */
export function buildAnkiRootOrigin(word) {
  const rb        = word.root_breakdown || {};
  const rp        = word.root_parts || [];
  const rn        = word.root_notes || [];
  const roe       = word.root_and_origin_explanation || [];
  const via       = word.in_hindi_via || '';
  const etymStory = word.etymology_story;
  const etymLines = Array.isArray(etymStory) ? etymStory : (etymStory ? [etymStory] : []);

  if (!rb.root && !rb.evolution && !rb.logic && !rp.length && !rn.length && !roe.length && !via && !etymLines.length) return '';

  let inner = renderRootHeader(via, rp, rb);
  inner += renderEvolution(rb);
  if (rb.logic) inner += `<p style="font-size:.85rem;color:#64748b;font-style:italic;line-height:1.6;margin:0 0 .5rem 0;">${esc(rb.logic)}</p>`;
  rn.forEach(l  => { inner += `<p style="font-size:.87rem;color:#cbd5e1;line-height:1.6;margin:0 0 .45rem 0;">${esc(l)}</p>`; });
  roe.forEach((l, i) => { inner += `<p style="font-size:${i === 0 ? '.9rem;color:#f1f5f9;font-weight:600' : '.85rem;color:#cbd5e1'};line-height:1.6;margin:0 0 .45rem 0;">${esc(l)}</p>`; });
  inner += renderEtymology(etymLines);

  return aSection('Roots & Origin', inner, '#2563eb');
}
