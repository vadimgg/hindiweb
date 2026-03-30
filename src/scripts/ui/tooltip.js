// Responsible for: vocab-hint span annotation in example cards and tooltip positioning

import { getHoverData } from '../data.js';

function norm(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function escAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function annotateHindi(text, excludeSet, hindiMap) {
  return text.replace(/[\u0900-\u097F]+/g, word => {
    if (excludeSet.has(word)) return word;
    const d = hindiMap[word];
    if (!d) return word;
    return `<span class="vocab-hint" data-h="${escAttr(d.hindi)}" data-r="${escAttr(d.roman)}" data-e="${escAttr(d.english)}">${word}</span>`;
  });
}

function annotateRoman(text, excludeSet, romanMap) {
  return text.replace(/[a-zA-Zāīūṭḍṇśṣṃḥṛṝḷ]+/g, word => {
    const key = norm(word);
    if (excludeSet.has(key)) return word;
    const d = romanMap[key];
    if (!d) return word;
    return `<span class="vocab-hint" data-h="${escAttr(d.hindi)}" data-r="${escAttr(d.roman)}" data-e="${escAttr(d.english)}">${word}</span>`;
  });
}

export function initTooltip() {
  const hoverData = getHoverData();
  const hindiMap  = {};
  const romanMap  = {};

  hoverData.forEach(word => {
    hindiMap[word.hindi] = word;
    romanMap[norm(word.roman)] = word;
    (word.forms || []).forEach(f => {
      if (f.h) hindiMap[f.h] = word;
      if (f.r) romanMap[norm(f.r)] = word;
    });
  });

  // Annotate example card text with vocab-hint spans
  document.querySelectorAll('[data-example-card]').forEach(container => {
    const cardIdx = parseInt(container.dataset.exampleCard);
    const cw = hoverData[cardIdx];
    if (!cw) return;
    const excludeHindi = new Set([cw.hindi, ...(cw.forms || []).map(f => f.h)]);
    const excludeRoman = new Set([norm(cw.roman), ...(cw.forms || []).map(f => norm(f.r))]);
    const hindiP = container.querySelector('[lang="hi"]');
    if (hindiP) { const orig = hindiP.textContent; const ann = annotateHindi(orig, excludeHindi, hindiMap); if (ann !== orig) hindiP.innerHTML = ann; }
    const romanP = container.querySelector('p.word-roman');
    if (romanP) { const orig = romanP.textContent; const ann = annotateRoman(orig, excludeRoman, romanMap); if (ann !== orig) romanP.innerHTML = ann; }
  });

  // Tooltip display and positioning
  const tooltip    = document.getElementById('word-tooltip');
  const tipHindi   = document.getElementById('tip-hindi');
  const tipRoman   = document.getElementById('tip-roman');
  const tipEnglish = document.getElementById('tip-english');
  if (!tooltip) return;

  document.addEventListener('mouseover', e => {
    const hint = e.target.closest('.vocab-hint');
    if (!hint) { tooltip.classList.add('hidden'); tooltip.style.visibility = 'hidden'; return; }
    tipHindi.textContent   = hint.dataset.h;
    tipRoman.textContent   = hint.dataset.r;
    tipEnglish.textContent = hint.dataset.e;
    tooltip.style.visibility = 'hidden';
    tooltip.classList.remove('hidden');
    requestAnimationFrame(() => {
      const hr = hint.getBoundingClientRect(), tr = tooltip.getBoundingClientRect();
      let top  = hr.top - tr.height - 10, left = hr.left + hr.width / 2 - tr.width / 2;
      if (top < 8) top = hr.bottom + 10;
      left = Math.max(8, Math.min(left, window.innerWidth - tr.width - 8));
      tooltip.style.top = `${top}px`; tooltip.style.left = `${left}px`;
      tooltip.style.visibility = 'visible';
    });
  });
}
