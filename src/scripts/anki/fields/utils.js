// Responsible for: shared HTML-building utilities for Anki card field builders

export function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function langHex(lang) {
  const m = {
    'Proto-Indo-European':'#99f6e4','PIE':'#99f6e4','Sanskrit':'#fcd34d',
    'Prakrit':'#fde68a','Apabhraṃśa':'#fde68a','Hindi':'#fbbf24','Urdu':'#fb923c',
    'Punjabi':'#fde047','Arabic':'#fb923c','Persian':'#f472b6','English':'#38bdf8',
    'Russian':'#67e8f9','Hebrew':'#6ee7b7','Latin':'#c4b5fd','Greek':'#818cf8',
    'French':'#a78bfa','German':'#94a3b8','Italian':'#86efac','Spanish':'#fca5a5',
  };
  return m[lang] || '#94a3b8';
}

export const capFirst = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export const aSection = (content, color) =>
  `<div style="border-left:3px solid ${color};padding:.65rem 1rem;margin-bottom:.85rem;background:rgba(2,6,23,.5);border-radius:0 8px 8px 0;">${content}</div>`;

export const aSectionLabel = text =>
  `<p style="font-family:'Oswald',sans-serif;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#475569;margin:0 0 .45rem 0;">${text}</p>`;

export function ankiCategoryStyle(cat) {
  if (!cat) return '';
  const c = cat.toLowerCase();
  if (c.includes('conjunction'))  return 'background:#052e16;color:#34d399;border:1px solid rgba(52,211,153,.3)';
  if (c.includes('adverb'))       return 'background:#0c1a2e;color:#38bdf8;border:1px solid rgba(56,189,248,.3)';
  if (c.includes('noun'))         return 'background:#1e1b4b;color:#a78bfa;border:1px solid rgba(167,139,250,.3)';
  if (c.includes('adjective'))    return 'background:#1c1008;color:#f59e0b;border:1px solid rgba(245,158,11,.3)';
  if (c.includes('verb'))         return 'background:#1c0e08;color:#fb923c;border:1px solid rgba(251,146,60,.3)';
  if (c.includes('preposition') || c.includes('postposition')) return 'background:#1c0a0a;color:#fb7185;border:1px solid rgba(251,113,133,.3)';
  if (c.includes('particle'))     return 'background:#042f2e;color:#2dd4bf;border:1px solid rgba(45,212,191,.3)';
  if (c.includes('pronoun'))      return 'background:#0f172a;color:#818cf8;border:1px solid rgba(129,140,248,.3)';
  return 'background:#1e293b;color:#94a3b8;border:1px solid rgba(148,163,184,.3)';
}

export function ankiChipStyle(label) {
  const l = label.toLowerCase();
  if (l.includes('feminine'))   return 'color:#f9a8d4;background:rgba(249,168,212,.12);border:1px solid rgba(249,168,212,.4)';
  if (l.includes('masculine'))  return 'color:#93c5fd;background:rgba(147,197,253,.12);border:1px solid rgba(147,197,253,.4)';
  if (l.includes('oblique'))    return 'color:#818cf8;background:rgba(129,140,248,.12);border:1px solid rgba(129,140,248,.4)';
  if (l.includes('invariable')) return 'color:#2dd4bf;background:rgba(45,212,191,.12);border:1px solid rgba(45,212,191,.4)';
  if (l.includes('adverb'))     return 'color:#38bdf8;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.4)';
  if (l.includes('adjective'))  return 'color:#fbbf24;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.4)';
  if (l.includes('noun'))       return 'color:#a78bfa;background:rgba(167,139,250,.12);border:1px solid rgba(167,139,250,.4)';
  if (l.includes('number') || l.includes('cardinal') || l.includes('article'))
                                return 'color:#34d399;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.4)';
  if (l.includes('compound'))   return 'color:#fb7185;background:rgba(251,113,133,.12);border:1px solid rgba(251,113,133,.4)';
  return 'color:#94a3b8;background:rgba(148,163,184,.1);border:1px solid rgba(148,163,184,.25)';
}
