// Responsible for: building the Anki Root & Origin and Etymology Story HTML fields
import { esc, aSection } from './utils.js';

export function buildAnkiRootOrigin(word) {
  const rb  = word.root_breakdown || {};
  const rp  = word.root_parts || [];
  const rn  = word.root_notes || [];
  const roe = word.root_and_origin_explanation || [];
  const via = word.in_hindi_via || '';
  const etymStory = word.etymology_story;
  const etymLines = Array.isArray(etymStory) ? etymStory : (etymStory ? [etymStory] : []);

  const rootIsObject = rb.root && typeof rb.root === 'object';
  const rootIsString = rb.root && typeof rb.root === 'string';
  const evolutionIsArray = Array.isArray(rb.evolution);
  const evolutionIsString = rb.evolution && typeof rb.evolution === 'string';

  if (!rb.root && !rb.evolution && !rb.logic && !rp.length && !rn.length && !roe.length && !via && !etymLines.length) return '';

  let inner = '';
  if (via) inner += `<p style="font-size:.78rem;color:#93c5fd;font-style:italic;margin:0 0 .6rem 0;">${esc(via)}</p>`;
  rp.forEach(p => {
    inner += `<div class="word-row" style="margin-bottom:.5rem;">`;
    inner += `<span class="word-text" lang="hi">${esc(p.script)}</span>`;
    inner += `<span class="word-rom">${esc(p.element)}</span>`;
    inner += `<span style="color:#94a3b8;font-size:.83rem;">— ${esc(p.meaning)}</span>`;
    inner += `</div>`;
  });

  if (rootIsObject) {
    const r = rb.root;
    inner += `<div style="display:flex;flex-wrap:wrap;gap:.4rem .75rem;align-items:baseline;margin-bottom:.5rem;">`;
    inner += `<span lang="hi" style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.05rem;color:#fbbf24;">${esc(r.word)}</span>`;
    inner += `<span style="color:#5eead4;font-size:.9rem;">${esc(r.romanisation)}</span>`;
    inner += `<span style="color:#94a3b8;font-size:.83rem;">— ${esc(r.meaning)}</span>`;
    inner += `<span style="color:#475569;font-size:.75rem;">(${esc(r.language)})</span>`;
    inner += `</div>`;
  } else if (rootIsString) {
    inner += `<p style="font-size:.9rem;color:#f1f5f9;font-weight:600;line-height:1.6;margin:0 0 .5rem 0;">${esc(rb.root)}</p>`;
  }

  if (evolutionIsArray && rb.evolution.length > 0) {
    const chain = rb.evolution.map(s => `${esc(s.stage)}: <span style="color:#99f6e4;">${esc(s.form)}</span>`).join(' <span style="color:#334155;margin:0 .2rem;">→</span> ');
    inner += `<p style="font-family:monospace;font-size:.8rem;color:rgba(94,234,212,.75);letter-spacing:.03em;line-height:1.55;margin:0 0 .5rem 0;">${chain}</p>`;
  } else if (evolutionIsString) {
    inner += `<p style="font-family:monospace;font-size:.82rem;color:rgba(94,234,212,.75);letter-spacing:.04em;line-height:1.55;margin:0 0 .5rem 0;">${esc(rb.evolution)}</p>`;
  }

  if (rb.logic) inner += `<p style="font-size:.85rem;color:#64748b;font-style:italic;line-height:1.6;margin:0 0 .5rem 0;">${esc(rb.logic)}</p>`;
  rn.forEach(l  => { inner += `<p style="font-size:.87rem;color:#cbd5e1;line-height:1.6;margin:0 0 .45rem 0;">${esc(l)}</p>`; });
  roe.forEach((l, i) => { inner += `<p style="font-size:${i === 0 ? '.9rem;color:#f1f5f9;font-weight:600' : '.85rem;color:#cbd5e1'};line-height:1.6;margin:0 0 .45rem 0;">${esc(l)}</p>`; });

  if (etymLines.length > 0) {
    inner += `<div style="border-top:1px solid rgba(148,163,184,.12);margin-top:.75rem;padding-top:.75rem;">`;
    inner += `<p style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:#92400e;margin:0 0 .5rem 0;">Etymology</p>`;
    etymLines.forEach(para => {
      inner += `<p style="font-size:.9rem;color:#e2e8f0;line-height:1.7;margin:0 0 .4rem 0;">${esc(para)}</p>`;
    });
    inner += `</div>`;
  }

  return aSection('Roots & Origin', inner, '#2563eb');
}
