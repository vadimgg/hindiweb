// Responsible for: building the Anki Root & Origin and Etymology Story HTML fields
import { esc, aSection } from './utils.js';

export function buildAnkiRootOrigin(word) {
  const rb  = word.root_breakdown || {};
  const rp  = word.root_parts || [];
  const rn  = word.root_notes || [];
  const roe = word.root_and_origin_explanation || [];
  const via = word.in_hindi_via || '';
  if (!rb.root && !rb.evolution && !rb.logic && !rp.length && !rn.length && !roe.length && !via && !word.etymology_story) return '';

  let inner = '';
  if (via) inner += `<p style="font-size:.78rem;color:#93c5fd;font-style:italic;margin:0 0 .6rem 0;">${esc(via)}</p>`;
  rp.forEach(p => {
    inner += `<div class="word-row" style="margin-bottom:.5rem;">`;
    inner += `<span class="word-text" lang="hi">${esc(p.script)}</span>`;
    inner += `<span class="word-rom">${esc(p.element)}</span>`;
    inner += `<span style="color:#94a3b8;font-size:.83rem;">— ${esc(p.meaning)}</span>`;
    inner += `</div>`;
  });
  if (rb.root)      inner += `<p style="font-size:.9rem;color:#f1f5f9;font-weight:600;line-height:1.6;margin:0 0 .5rem 0;">${esc(rb.root)}</p>`;
  if (rb.evolution) inner += `<p style="font-family:monospace;font-size:.82rem;color:rgba(94,234,212,.75);letter-spacing:.04em;line-height:1.55;margin:0 0 .5rem 0;">${esc(rb.evolution)}</p>`;
  if (rb.logic)     inner += `<p style="font-size:.85rem;color:#64748b;font-style:italic;line-height:1.6;margin:0 0 .5rem 0;">${esc(rb.logic)}</p>`;
  rn.forEach(l  => { inner += `<p style="font-size:.87rem;color:#cbd5e1;line-height:1.6;margin:0 0 .45rem 0;">${esc(l)}</p>`; });
  roe.forEach((l, i) => { inner += `<p style="font-size:${i === 0 ? '.9rem;color:#f1f5f9;font-weight:600' : '.85rem;color:#cbd5e1'};line-height:1.6;margin:0 0 .45rem 0;">${esc(l)}</p>`; });

  if (word.etymology_story) {
    inner += `<div style="border-top:1px solid rgba(148,163,184,.12);margin-top:.75rem;padding-top:.75rem;">`;
    inner += `<p style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:#92400e;margin:0 0 .5rem 0;">Etymology</p>`;
    inner += `<p style="font-size:.9rem;color:#e2e8f0;line-height:1.7;margin:0;">${esc(word.etymology_story)}</p>`;
    inner += `</div>`;
  }

  return aSection('Roots & Origin', inner, '#2563eb');
}
