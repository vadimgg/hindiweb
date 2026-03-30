// Responsible for: pure helper functions shared across WordCard section components

export function formatDate(iso: string): string {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const [y, m, d] = iso.split('-');
  return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
}

export const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export function chipClass(label: string): string {
  const l = label.toLowerCase();
  if (l.includes('feminine'))   return 'form-chip form-chip-fem';
  if (l.includes('masculine'))  return 'form-chip form-chip-masc';
  if (l.includes('oblique'))    return 'form-chip form-chip-indigo';
  if (l.includes('invariable')) return 'form-chip form-chip-teal';
  if (l.includes('adverb'))     return 'form-chip form-chip-sky';
  if (l.includes('adjective'))  return 'form-chip form-chip-amber';
  if (l.includes('noun'))       return 'form-chip form-chip-violet';
  if (l.includes('number') || l.includes('cardinal') || l.includes('article')) return 'form-chip form-chip-emerald';
  if (l.includes('compound'))   return 'form-chip form-chip-rose';
  return 'form-chip';
}

export function categoryStyle(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes('conjunction'))  return 'bg-emerald-900/30 text-emerald-400 border border-emerald-700/40';
  if (c.includes('adverb'))       return 'bg-sky-900/30 text-sky-400 border border-sky-700/40';
  if (c.includes('noun'))         return 'bg-violet-900/30 text-violet-400 border border-violet-700/40';
  if (c.includes('adjective'))    return 'bg-amber-900/30 text-amber-500 border border-amber-700/40';
  if (c.includes('verb'))         return 'bg-orange-900/30 text-orange-400 border border-orange-700/40';
  if (c.includes('preposition') || c.includes('postposition')) return 'bg-rose-900/30 text-rose-400 border border-rose-700/40';
  if (c.includes('particle'))     return 'bg-teal-900/30 text-teal-400 border border-teal-700/40';
  if (c.includes('pronoun'))      return 'bg-indigo-900/30 text-indigo-400 border border-indigo-700/40';
  return 'bg-slate-800/60 text-slate-400 border border-slate-600/40';
}

export function registerStyle(reg: string): string {
  const r = reg.toLowerCase();
  if (r === 'standard')   return 'text-sky-400/70 bg-sky-950/50 border border-sky-800/30';
  if (r === 'casual')     return 'text-amber-400/70 bg-amber-950/50 border border-amber-800/30';
  if (r === 'colloquial') return 'text-rose-400/70 bg-rose-950/50 border border-rose-800/30';
  if (r === 'formal')     return 'text-violet-400/70 bg-violet-950/50 border border-violet-800/30';
  return 'text-slate-400/70 bg-slate-800/40 border border-slate-700/30';
}

export function langColor(lang: string): string {
  const map: Record<string, string> = {
    'Proto-Indo-European': 'text-teal-200/70', 'PIE': 'text-teal-200/70',
    'Sanskrit': 'text-amber-300/80', 'Prakrit': 'text-amber-200/65', 'Apabhraṃśa': 'text-amber-200/65',
    'Hindi': 'text-amber-400/80', 'Urdu': 'text-orange-400/80', 'Punjabi': 'text-yellow-400/75',
    'Arabic': 'text-orange-400/75', 'Persian': 'text-pink-400/70',
    'English': 'text-sky-400/75', 'Russian': 'text-cyan-300/75', 'Hebrew': 'text-emerald-300/75',
    'Latin': 'text-violet-300/70', 'Greek': 'text-indigo-400/70',
    'French': 'text-violet-400/70', 'German': 'text-slate-400/70',
    'Italian': 'text-green-300/70', 'Spanish': 'text-red-300/70',
  };
  return map[lang] ?? 'text-slate-400/70';
}
