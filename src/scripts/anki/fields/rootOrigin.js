// Responsible for: building the Anki Root & Origin and Etymology Story HTML fields
import { esc, aSection, aSectionLabel } from './utils.js';

export function buildAnkiRootOrigin(word) {
  const rb  = word.root_breakdown || {};
  const rp  = word.root_parts || [];
  const rn  = word.root_notes || [];
  const roe = word.root_and_origin_explanation || [];
  const via = word.in_hindi_via || '';
  if (!rb.root && !rb.evolution && !rb.logic && !rp.length && !rn.length && !roe.length && !via && !word.etymology_story) return '';

  let inner = '<div style="background:#020617;border-left:2px solid rgba(59,130,246,.4);border-radius:0 6px 6px 0;padding:.65rem .9rem;">';
  if (via) inner += `<p style="font-size:.75rem;color:#93c5fd;font-style:italic;margin:0 0 .4rem 0;">${esc(via)}</p>`;
  rp.forEach(p => { inner += `<div style="display:flex;gap:.65rem;align-items:baseline;margin-bottom:.35rem;"><span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1rem;color:#fbbf24;">${esc(p.script)}</span><span style="color:#5eead4;font-size:.83rem;">${esc(p.element)}</span><span style="color:#94a3b8;font-size:.83rem;">— ${esc(p.meaning)}</span></div>`; });
  if (rb.root)      inner += `<p style="font-size:.88rem;color:#f1f5f9;font-weight:600;line-height:1.55;margin:0 0 .35rem 0;">${esc(rb.root)}</p>`;
  if (rb.evolution) inner += `<p style="font-family:monospace;font-size:.8rem;color:rgba(94,234,212,.7);letter-spacing:.04em;line-height:1.5;margin:0 0 .35rem 0;">${esc(rb.evolution)}</p>`;
  if (rb.logic)     inner += `<p style="font-size:.83rem;color:#64748b;font-style:italic;line-height:1.5;margin:0 0 .35rem 0;">${esc(rb.logic)}</p>`;
  rn.forEach(l  => { inner += `<p style="font-size:.85rem;color:#cbd5e1;line-height:1.5;margin:0 0 .3rem 0;">${esc(l)}</p>`; });
  roe.forEach((l, i) => { inner += `<p style="font-size:${i === 0 ? '.88rem;color:#f1f5f9;font-weight:600' : '.83rem;color:#cbd5e1'};line-height:1.5;margin:0 0 .3rem 0;">${esc(l)}</p>`; });
  inner += '</div>';

  const etym = word.etymology_story
    ? `<div style="background:#0f0a00;border-left:2px solid rgba(245,158,11,.5);border-radius:0 6px 6px 0;padding:.65rem .9rem;margin-top:.5rem;"><p style="font-size:.88rem;color:#e2e8f0;line-height:1.6;margin:0;">${esc(word.etymology_story)}</p></div>`
    : '';

  return aSection(aSectionLabel('Roots & Origin') + inner + etym, '#2563eb');
}
