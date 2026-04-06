// Shared design tokens and base CSS used across all demo components.
// Fonts are loaded in index.html <head>.

window.SharedStyles = `
  /* ── Reset ─────────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Base ───────────────────────────────────────────────── */
  body {
    /* Subtle radial depth — barely perceptible, adds warmth at the top-left */
    background: radial-gradient(ellipse at 30% 20%, #0d1829 0%, #020617 70%);
    background-attachment: fixed;
    color: #e2e8f0;         /* slate-200 — default text */
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    min-height: 100vh;
  }

  /* ── Surface tokens ─────────────────────────────────────── */
  /* slate-950 = #020617 | slate-900 = #0f172a | slate-800 = #1e293b */

  /* ── Typography ─────────────────────────────────────────── */
  [lang="hi"] { font-family: 'Tiro Devanagari Hindi', serif; }

  .font-title {
    font-family: 'Barlow Condensed', sans-serif;
  }

  .font-mono-sm {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
  }

  /* ── Colour helpers ─────────────────────────────────────── */
  .word-hindi  { color: #fbbf24; }              /* amber-400 */
  .word-roman  { color: #5eead4; }              /* teal-300  */
  .word-roman-muted { color: rgba(94,234,212,.6); }  /* teal-300/60 */
  .text-slate-200 { color: #e2e8f0; }
  .text-slate-400 { color: #94a3b8; }
  .text-slate-500 { color: #64748b; }

  /* ── Badge base ─────────────────────────────────────────── */
  .badge {
    display: inline-block;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    padding: 0.22rem 0.7rem;
    border-radius: 6px;
    white-space: nowrap;
    line-height: 1.4;
  }

  .badge-masc {
    background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.08));
    color: #93c5fd;
    border: 1px solid rgba(147,197,253,0.2);
  }

  .badge-noun {
    background: linear-gradient(135deg, rgba(180,83,9,0.2), rgba(120,53,15,0.12));
    color: #fcd34d;
    border: 1px solid rgba(251,191,36,0.2);
  }

  .badge-standard {
    background: linear-gradient(135deg, rgba(14,116,144,0.18), rgba(12,74,110,0.12));
    color: #7dd3fc;
    border: 1px solid rgba(14,165,233,0.2);
  }

  /* ── Demo page layout ───────────────────────────────────── */
  .demo-page {
    max-width: 720px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 5rem;
  }

  .demo-page-header {
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba(51,65,85,.4);
    padding-bottom: 1.5rem;
  }

  .demo-page-header h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #fbbf24;
    margin-bottom: 0.25rem;
  }

  .demo-page-header p {
    font-size: 0.85rem;
    color: #64748b;
  }

  .demo-section {
    margin-bottom: 4rem;
  }

  /* Elegant section labels with amber left-accent line */
  .demo-section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: #64748b;
    margin-bottom: 1.25rem;
    padding-left: 0.75rem;
    border-left: 2px solid rgba(251,191,36,0.35);
  }
`;
