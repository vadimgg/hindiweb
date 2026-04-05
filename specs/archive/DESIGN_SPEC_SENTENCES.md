# Design Spec — Sentence Cards
**Version:** 1.0  
**Date:** 2026-04-05  
**Designer:** Lead UI/UX Designer  
**Status:** Active — ready for implementation

---

## Design Rationale

Sentence cards are siblings of word cards, not children. They share the same `bg-slate-900` surface, the same `rounded-2xl` shell, the same amber/teal colour language, and the same `<details>` expand pattern for secondary content. The primary difference is density: sentences contain multiple Hindi tokens rather than one, so the header scales down from the word card's `text-3xl` hero to `text-xl sm:text-2xl` to keep long sentences on one or two lines without wrapping to an uncomfortable depth.

The **accent colour for word breakdown is teal** (`border-teal-500/40`). Teal is already the romanisation colour, and the word breakdown table is the closest the sentence card gets to a phonetic/lexical drill — that semantic connection earns the colour. Teal is confirmed free for a new section accent on the sentence card (the section table lists `border-teal-500/40` for Pronunciation, but Pronunciation does not exist as a sentence card section).

**Register badge colour mapping** (existing pattern, carried forward):

| Register | Hue | Tailwind classes |
|---|---|---|
| formal | violet | `bg-violet-900/30 text-violet-400 border border-violet-700/40` |
| standard | sky | `bg-sky-900/30 text-sky-400 border border-sky-700/40` |
| casual | amber | `bg-amber-500/20 text-amber-400 border border-amber-500/30` |
| colloquial | rose | `bg-rose-900/30 text-rose-400 border border-rose-700/40` |

Note: `casual` amber aligns with the "active/selected" amber formula from STYLE.md. This is intentional — casual register is the unmarked, everyday form, and amber's "default/primary" meaning maps naturally to it.

---

## Part 1 — Website Sentence Card

### 1.1 Card Shell

The sentence card wraps in the same article shell as WordCard. The `is-collapsed` class and header click-to-expand JavaScript pattern are reused without modification.

```html
<article
  id="sentence-card-{index}"
  class="bg-slate-900 border border-slate-700/40 rounded-2xl overflow-hidden
         hover:border-slate-600/60 transition-colors is-collapsed"
>
  <!-- Header (always visible) -->
  <!-- Expandable zone (hidden when collapsed) -->
</article>
```

---

### 1.2 Card Header

The header is always visible. It contains:

1. **Hindi sentence** — amber via `.word-hindi`, `text-xl sm:text-2xl font-bold`
2. **Romanisation** — teal via `.word-roman`, `text-sm sm:text-base`
3. **English translation** — `text-slate-200 text-sm`
4. **Register badge** — inline with the English translation row
5. **Collapse/expand chevron** — right-aligned, rotates on expand

**Typography note:** Hindi sentences use `leading-snug` (not `leading-none`). The word card uses `leading-none` on a single word where wrapping is rare; multi-word Devanagari text must breathe between lines when it wraps. `leading-snug` preserves the compact feel while preventing collisions.

**What is visible above the fold (collapsed state):** Hindi sentence, romanisation, English, register badge. Nothing else. This follows UX Principle 3 (Progressive Disclosure): a reader scanning the sentence list gets the core meaning at a glance.

```html
<div
  class="card-header flex px-4 sm:px-5 py-3 sm:py-4 gap-2
         cursor-pointer hover:bg-slate-800/20 transition-colors select-none"
>
  <div class="flex-1 min-w-0 flex flex-col gap-2 py-1">

    <!-- Row 1: Hindi sentence -->
    <h2
      class="word-hindi text-xl sm:text-2xl font-bold leading-snug"
      lang="hi"
    >
      {hindi}
    </h2>

    <!-- Row 2: Romanisation -->
    <p class="word-roman text-sm sm:text-base leading-snug">
      {romanisation}
    </p>

    <!-- Row 3: English + register badge -->
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-slate-200 text-sm leading-none">{english}</span>
      {register && (
        <span
          class:list={[
            'text-xs font-title font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg',
            registerStyle(register),
          ]}
        >
          {register}
        </span>
      )}
    </div>

  </div>

  <!-- Chevron -->
  <div class="shrink-0 flex items-center">
    <span
      class="text-slate-600 transition-transform duration-200 text-xs"
      aria-hidden="true"
    >
      ▾
    </span>
  </div>
</div>
```

---

### 1.3 Expandable Zone — Literal Translation

The literal gloss ("what you Kamala [honorific] are?") sits **immediately below the header**, as the first element inside the expandable zone — no `<details>` toggle of its own. It appears as soon as the card is expanded because it is directly tied to the English translation shown in the header and aids comprehension without extra interaction cost.

Design decision: `text-slate-500 italic` signals "secondary gloss", clearly below `text-slate-200` (English). The `Literal` prefix uses the small-caps Oswald pattern so it reads as a structural label, not body copy.

```html
<!-- First child inside .card-expandable -->
<div class="px-4 sm:px-6 pt-3 pb-2 border-t border-slate-700/40">
  <p class="text-[13px] text-slate-500 italic leading-relaxed">
    <span
      class="font-title text-[9px] font-semibold uppercase tracking-widest
             text-zinc-600 mr-2 not-italic"
    >
      Literal
    </span>
    {literal}
  </p>
</div>
```

---

### 1.4 Word Breakdown Section

The word breakdown is placed behind a `<details>` toggle because:

- Users who just want to read the sentence do not need it every time
- Users drilling vocabulary production will expand it deliberately
- On mobile, hidden-by-default reduces scroll depth

Each row: Hindi token + romanisation (left, 36% width) | meaning + optional note/gender/number (right, flex-1). The 36% left column gives enough room for long Hindi tokens without crowding the meaning column.

**Accent:** teal (`border-teal-500/40`), expressed as a `h-px bg-teal-500/20` hairline at the base of the section and the open-chevron teal glow would be too decorative — the accent is kept to the bottom hairline only, keeping the section within the "restraint over novelty" principle.

```html
<details class="group/det border-t border-slate-700/40">
  <summary
    class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4
           cursor-pointer list-none select-none
           hover:bg-slate-800/30 transition-colors"
  >
    <span
      class="font-title text-xs sm:text-sm font-medium tracking-wider uppercase
             text-slate-400 group-open/det:text-slate-200 transition-colors"
    >
      Word Breakdown
    </span>
    <span
      class="text-slate-600 group-open/det:rotate-180
             transition-transform duration-200 text-xs"
    >
      ▾
    </span>
  </summary>

  <div class="px-4 sm:px-6 pb-4 pt-1">

    <!-- Column headers -->
    <div
      class="flex items-center gap-4 px-2 pb-1.5 mb-1
             border-b border-slate-800/60"
    >
      <span
        class="font-title text-[9px] font-semibold uppercase tracking-widest
               text-zinc-600 w-[36%] shrink-0"
      >
        Word
      </span>
      <span
        class="font-title text-[9px] font-semibold uppercase tracking-widest
               text-zinc-600 flex-1"
      >
        Meaning
      </span>
    </div>

    <!-- Word rows -->
    <div class="divide-y divide-slate-800/60">
      {words.map((w) => (
        <div
          class="flex items-start gap-4 py-2.5 px-2
                 hover:bg-slate-800/20 transition-colors rounded-lg -mx-2"
        >
          <!-- Left: Hindi token + romanisation -->
          <div class="w-[36%] shrink-0 flex flex-col gap-0.5">
            <span
              class="word-hindi text-base font-bold leading-snug"
              lang="hi"
            >
              {w.hindi}
            </span>
            <span class="text-teal-300/60 text-[11px] font-mono">
              {w.roman}
            </span>
          </div>

          <!-- Right: meaning + supplementary -->
          <div class="flex-1 min-w-0 flex flex-col gap-1 pt-0.5">
            <span class="text-slate-200 text-sm leading-snug">
              {w.meaning}
            </span>

            {(w.gender || w.number) && (
              <div class="flex flex-wrap gap-1.5 mt-0.5">
                {w.gender === 'feminine' && (
                  <span
                    class="text-[10px] font-title font-semibold uppercase tracking-wider
                           px-1.5 py-0.5 rounded-md
                           bg-pink-900/20 text-pink-300/80 border border-pink-700/30"
                  >
                    f
                  </span>
                )}
                {w.gender === 'masculine' && (
                  <span
                    class="text-[10px] font-title font-semibold uppercase tracking-wider
                           px-1.5 py-0.5 rounded-md
                           bg-blue-900/20 text-blue-300/80 border border-blue-700/30"
                  >
                    m
                  </span>
                )}
                {w.number && (
                  <span
                    class="text-[10px] font-title font-semibold uppercase tracking-wider
                           px-1.5 py-0.5 rounded-md
                           bg-slate-800/60 text-slate-400 border border-slate-700/40"
                  >
                    {w.number}
                  </span>
                )}
              </div>
            )}

            {w.note && (
              <p class="text-[12px] text-slate-500 italic leading-relaxed mt-0.5">
                {w.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>

    <!-- Teal accent hairline at section base -->
    <div class="mt-3 h-px bg-teal-500/20"></div>

  </div>
</details>
```

---

### 1.5 Register Style Helper

Add to `src/utils/cardHelpers.ts`:

```typescript
export function registerStyle(register: string): string {
  const map: Record<string, string> = {
    formal:     'bg-violet-900/30 text-violet-400 border border-violet-700/40',
    standard:   'bg-sky-900/30 text-sky-400 border border-sky-700/40',
    casual:     'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    colloquial: 'bg-rose-900/30 text-rose-400 border border-rose-700/40',
  };
  return map[register] ?? 'bg-slate-800/60 text-slate-400 border border-slate-700/40';
}
```

---

### 1.6 Chapter Group Header

The chapter label appears **above a batch of cards from the same chapter** — it is not part of any individual sentence card. It follows the sidebar group header pattern from STYLE.md, extended with a horizontal rule.

```html
<div class="flex items-center gap-2 px-1 pt-6 pb-2">
  <span
    class="font-title text-[10px] font-semibold uppercase tracking-widest
           text-zinc-500 shrink-0"
  >
    {chapter}
  </span>
  <div class="flex-1 h-px bg-slate-800/60"></div>
  <span class="text-[10px] text-zinc-700 shrink-0">{sentenceCount}</span>
</div>
```

The horizontal rule to the right of the label makes it visually clear this is a grouping header, not a standalone element. The sentence count is `text-zinc-700` — muted, purely informational.

---

### 1.7 Complete Card Skeleton (assembled reference)

```html
<!-- Chapter group header (rendered once per chapter group) -->
<div class="flex items-center gap-2 px-1 pt-6 pb-2">
  <span class="font-title text-[10px] font-semibold uppercase tracking-widest text-zinc-500 shrink-0">
    Complete Hindi, Chapter 01, Dialog 01
  </span>
  <div class="flex-1 h-px bg-slate-800/60"></div>
  <span class="text-[10px] text-zinc-700 shrink-0">3</span>
</div>

<!-- Sentence card -->
<article
  id="sentence-card-0"
  class="bg-slate-900 border border-slate-700/40 rounded-2xl overflow-hidden
         hover:border-slate-600/60 transition-colors is-collapsed"
>

  <!-- HEADER — always visible -->
  <div class="card-header flex px-4 sm:px-5 py-3 sm:py-4 gap-2
              cursor-pointer hover:bg-slate-800/20 transition-colors select-none">
    <div class="flex-1 min-w-0 flex flex-col gap-2 py-1">
      <h2 class="word-hindi text-xl sm:text-2xl font-bold leading-snug" lang="hi">
        क्या आप कमला जी हैं ?
      </h2>
      <p class="word-roman text-sm sm:text-base leading-snug">
        kyā āp Kamalā jī haĩ?
      </p>
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-slate-200 text-sm leading-none">Are you Kamala?</span>
        <span class="text-xs font-title font-semibold uppercase tracking-wider
                     px-2.5 py-1 rounded-lg
                     bg-violet-900/30 text-violet-400 border border-violet-700/40">
          formal
        </span>
      </div>
    </div>
    <div class="shrink-0 flex items-center">
      <span class="text-slate-600 transition-transform duration-200 text-xs" aria-hidden="true">▾</span>
    </div>
  </div>

  <!-- EXPANDABLE ZONE -->
  <div class="card-expandable">

    <!-- Literal gloss -->
    <div class="px-4 sm:px-6 pt-3 pb-2 border-t border-slate-700/40">
      <p class="text-[13px] text-slate-500 italic leading-relaxed">
        <span class="font-title text-[9px] font-semibold uppercase tracking-widest
                     text-zinc-600 mr-2 not-italic">
          Literal
        </span>
        what you Kamala [honorific] are?
      </p>
    </div>

    <!-- Word breakdown -->
    <details class="group/det border-t border-slate-700/40">
      <summary class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4
                      cursor-pointer list-none select-none
                      hover:bg-slate-800/30 transition-colors">
        <span class="font-title text-xs sm:text-sm font-medium tracking-wider uppercase
                     text-slate-400 group-open/det:text-slate-200 transition-colors">
          Word Breakdown
        </span>
        <span class="text-slate-600 group-open/det:rotate-180
                     transition-transform duration-200 text-xs">▾</span>
      </summary>
      <div class="px-4 sm:px-6 pb-4 pt-1">
        <div class="flex items-center gap-4 px-2 pb-1.5 mb-1 border-b border-slate-800/60">
          <span class="font-title text-[9px] font-semibold uppercase tracking-widest
                       text-zinc-600 w-[36%] shrink-0">Word</span>
          <span class="font-title text-[9px] font-semibold uppercase tracking-widest
                       text-zinc-600 flex-1">Meaning</span>
        </div>
        <div class="divide-y divide-slate-800/60">
          <!-- Row: क्या -->
          <div class="flex items-start gap-4 py-2.5 px-2 hover:bg-slate-800/20 transition-colors rounded-lg -mx-2">
            <div class="w-[36%] shrink-0 flex flex-col gap-0.5">
              <span class="word-hindi text-base font-bold leading-snug" lang="hi">क्या</span>
              <span class="text-teal-300/60 text-[11px] font-mono">kyā</span>
            </div>
            <div class="flex-1 min-w-0 flex flex-col gap-1 pt-0.5">
              <span class="text-slate-200 text-sm leading-snug">question marker</span>
            </div>
          </div>
          <!-- Row: आप (with note) -->
          <div class="flex items-start gap-4 py-2.5 px-2 hover:bg-slate-800/20 transition-colors rounded-lg -mx-2">
            <div class="w-[36%] shrink-0 flex flex-col gap-0.5">
              <span class="word-hindi text-base font-bold leading-snug" lang="hi">आप</span>
              <span class="text-teal-300/60 text-[11px] font-mono">āp</span>
            </div>
            <div class="flex-1 min-w-0 flex flex-col gap-1 pt-0.5">
              <span class="text-slate-200 text-sm leading-snug">you</span>
              <p class="text-[12px] text-slate-500 italic leading-relaxed mt-0.5">
                formal — use with strangers/elders
              </p>
            </div>
          </div>
          <!-- Row: कमला (with gender + number) -->
          <div class="flex items-start gap-4 py-2.5 px-2 hover:bg-slate-800/20 transition-colors rounded-lg -mx-2">
            <div class="w-[36%] shrink-0 flex flex-col gap-0.5">
              <span class="word-hindi text-base font-bold leading-snug" lang="hi">कमला</span>
              <span class="text-teal-300/60 text-[11px] font-mono">Kamalā</span>
            </div>
            <div class="flex-1 min-w-0 flex flex-col gap-1 pt-0.5">
              <span class="text-slate-200 text-sm leading-snug">Kamala (name)</span>
              <div class="flex flex-wrap gap-1.5 mt-0.5">
                <span class="text-[10px] font-title font-semibold uppercase tracking-wider
                             px-1.5 py-0.5 rounded-md
                             bg-pink-900/20 text-pink-300/80 border border-pink-700/30">f</span>
                <span class="text-[10px] font-title font-semibold uppercase tracking-wider
                             px-1.5 py-0.5 rounded-md
                             bg-slate-800/60 text-slate-400 border border-slate-700/40">singular</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 h-px bg-teal-500/20"></div>
      </div>
    </details>

  </div>
</article>
```

---

## Part 2 — Anki Sentence Card (`Hindi Sentence` note type)

### 2.1 ANKI_FIELDS

```js
export const ANKI_SENTENCE_NOTE_TYPE = 'Hindi Sentence';

export const ANKI_SENTENCE_FIELDS = [
  'English',        // English translation — shown on FRONT
  'Hindi',          // Devanagari sentence
  'Romanisation',   // romanisation of the full sentence
  'Literal',        // word-for-word gloss
  'Register',       // formal / standard / casual / colloquial
  'WordBreakdown',  // pre-rendered HTML table (built by sentenceBreakdown.js)
  'Chapter',        // source chapter label (metadata, shown at card bottom)
  'Tags',           // joined anki_tags — used by AnkiConnect tagging, not displayed
];
```

**Field rationale:**

- `English` on the front — the learner's recall direction is English → Hindi production, matching the existing word card direction.
- `WordBreakdown` is pre-rendered HTML, built by `sentenceBreakdown.js`, following the pattern of `Collocations`, `Forms`, etc.
- `Chapter` is stored as a field (not tag-only) so it appears as a searchable column in the Anki browser without tag parsing.
- `Tags` is present for the `.txt` fallback export header; it is populated via AnkiConnect's `tags` parameter, not rendered on the card face.

---

### 2.2 Front Card Template

The register badge is shown on the front. It tells the learner *how* to produce the Hindi (formal vs. casual register changes vocabulary choices — `आप` vs. `तुम`) — which is part of the recall task being tested.

```html
export const ANKI_SENTENCE_FRONT = `<div class="card-wrap front-face">
  <p class="meaning">{{English}}</p>
  {{#Register}}
  <div class="chips" style="margin-top:.9rem;">
    <span class="reg reg-{{Register}}">{{Register}}</span>
  </div>
  {{/Register}}
</div>`;
```

---

### 2.3 Back Card Template

Section order matches the website card order exactly: answer header → literal gloss → word breakdown → chapter meta.

```html
export const ANKI_SENTENCE_BACK = `<div class="card-wrap">

  <div class="answer-header">
    <p class="hindi" lang="hi">{{Hindi}}</p>
    <p class="roman">{{Romanisation}}</p>
    <p class="meaning-reveal">{{English}}</p>
    <div class="header-chips">
      {{#Register}}<span class="reg reg-{{Register}}">{{Register}}</span>{{/Register}}
    </div>
  </div>

  {{#Literal}}
  <div class="field-sec" style="border-top-color:#475569;">
    <p class="field-label" style="color:#475569;">Literal</p>
    <p class="literal-gloss">{{Literal}}</p>
  </div>
  {{/Literal}}

  {{#WordBreakdown}}
  <div class="field-sec" style="border-top-color:#14b8a6;">
    <p class="field-label" style="color:#14b8a6;">Word Breakdown</p>
    {{WordBreakdown}}
  </div>
  {{/WordBreakdown}}

  {{#Chapter}}
  <p class="chapter-meta">{{Chapter}}</p>
  {{/Chapter}}

</div>`;
```

---

### 2.4 CSS Additions

Append these lines to `ANKI_SENTENCE_CSS` (a new constant in `sentenceNoteType.js` that starts by spreading `ANKI_CSS` from `noteType.js` and adds the following):

```js
// Register badge colour variants — extend existing .reg base
'.reg-formal{color:#a78bfa;border-color:rgba(139,92,246,.4);background:rgba(109,40,217,.2);}',
'.reg-standard{color:#38bdf8;border-color:rgba(56,189,248,.4);background:rgba(14,165,233,.15);}',
'.reg-casual{color:#fbbf24;border-color:rgba(251,191,36,.3);background:rgba(245,158,11,.2);}',
'.reg-colloquial{color:#fb7185;border-color:rgba(251,113,133,.4);background:rgba(225,29,72,.2);}',

// Literal gloss line
'.literal-gloss{font-size:.85rem;color:#64748b;font-style:italic;line-height:1.65;margin:0;}',

// Word breakdown table
'.breakdown-table{width:100%;border-collapse:collapse;margin-top:.25rem;}',
'.breakdown-table th{font-family:"Oswald",sans-serif;font-size:.55rem;font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:#475569;text-align:left;padding:.3rem .5rem .5rem;border-bottom:1px solid rgba(51,65,85,.6);}',
'.breakdown-table td{padding:.6rem .5rem;vertical-align:top;border-bottom:1px solid rgba(30,41,59,.8);}',
'.breakdown-table tr:last-child td{border-bottom:none;}',
'.breakdown-table tr:hover td{background:rgba(30,41,59,.4);}',

// Word token — left column of breakdown table
'.bd-word{font-family:"Tiro Devanagari Hindi",serif;font-size:1.05rem;color:#fbbf24;display:block;line-height:1.3;}',
'.bd-roman{font-size:.75rem;color:#5eead4;opacity:.7;font-family:monospace;display:block;margin-top:.15rem;}',

// Meaning column
'.bd-meaning{font-size:.85rem;color:#e2e8f0;line-height:1.5;}',
'.bd-note{font-size:.75rem;color:#64748b;font-style:italic;line-height:1.55;margin-top:.25rem;display:block;}',
'.bd-badges{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.3rem;}',

// Chapter meta — recessive footer
'.chapter-meta{font-family:"Oswald",sans-serif;font-size:.55rem;font-weight:600;text-transform:uppercase;letter-spacing:.16em;color:#334155;text-align:center;margin-top:1.5rem;padding:.4rem;background:#080d18;border-radius:8px;}',

// Mobile
'@media(max-width:520px){',
'.bd-word{font-size:.9rem;}',
'.bd-meaning{font-size:.8rem;}',
'.literal-gloss{font-size:.8rem;}',
'}',
```

**Colour decisions:**

- **Literal gloss** section border `#475569` (slate-600) — one step above the default `field-sec` `#334155`, intentionally less prominent than the word breakdown.
- **Word breakdown** section border `#14b8a6` (teal-500) — matches the existing Pronunciation section hex. Pronunciation is not a sentence card section, so this hex is available.
- **Chapter meta** background `#080d18` — the deepest surface in the existing system (used in `.mean-box`). Visually recessive: metadata, not study content.

---

### 2.5 WordBreakdown Field Builder

Create `src/scripts/anki/fields/sentenceBreakdown.js`:

```js
/**
 * Anki field builder — sentence word breakdown table.
 *
 * Responsible for: building the WordBreakdown HTML field for the Hindi Sentence note type.
 *
 * No dependencies on other project modules.
 */
// Responsible for: WordBreakdown Anki field HTML for Hindi Sentence note type

export function buildWordBreakdown(words) {
  if (!words || words.length === 0) return '';

  const rows = words.map((w) => {
    const genderBadge = w.gender === 'feminine'
      ? `<span class="meta-badge" style="background:rgba(131,24,67,.25);color:#f9a8d4;border:1px solid rgba(236,72,153,.25);">f</span>`
      : w.gender === 'masculine'
      ? `<span class="meta-badge" style="background:rgba(30,58,138,.25);color:#93c5fd;border:1px solid rgba(59,130,246,.25);">m</span>`
      : '';

    const numberBadge = w.number
      ? `<span class="meta-badge" style="background:rgba(30,41,59,.6);color:#94a3b8;border:1px solid rgba(51,65,85,.4);">${w.number}</span>`
      : '';

    const badges = (genderBadge || numberBadge)
      ? `<div class="bd-badges">${genderBadge}${numberBadge}</div>`
      : '';

    const note = w.note
      ? `<span class="bd-note">${w.note}</span>`
      : '';

    return `<tr>
      <td style="width:36%;"><span class="bd-word" lang="hi">${w.hindi}</span><span class="bd-roman">${w.roman}</span></td>
      <td><span class="bd-meaning">${w.meaning}</span>${badges}${note}</td>
    </tr>`;
  }).join('');

  return `<table class="breakdown-table">
    <thead><tr><th>Word</th><th>Meaning</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}
```

---

### 2.6 Rendered Back Card — Full Example

For the sentence "क्या आप कमला जी हैं ?", the back card produces:

```html
<div class="card-wrap">

  <div class="answer-header">
    <p class="hindi" lang="hi">क्या आप कमला जी हैं ?</p>
    <p class="roman">kyā āp Kamalā jī haĩ?</p>
    <p class="meaning-reveal">Are you Kamala?</p>
    <div class="header-chips">
      <span class="reg reg-formal">formal</span>
    </div>
  </div>

  <div class="field-sec" style="border-top-color:#475569;">
    <p class="field-label" style="color:#475569;">Literal</p>
    <p class="literal-gloss">what you Kamala [honorific] are?</p>
  </div>

  <div class="field-sec" style="border-top-color:#14b8a6;">
    <p class="field-label" style="color:#14b8a6;">Word Breakdown</p>
    <table class="breakdown-table">
      <thead>
        <tr><th>Word</th><th>Meaning</th></tr>
      </thead>
      <tbody>
        <tr>
          <td style="width:36%;"><span class="bd-word" lang="hi">क्या</span><span class="bd-roman">kyā</span></td>
          <td><span class="bd-meaning">question marker</span></td>
        </tr>
        <tr>
          <td style="width:36%;"><span class="bd-word" lang="hi">आप</span><span class="bd-roman">āp</span></td>
          <td><span class="bd-meaning">you</span><span class="bd-note">formal — use with strangers/elders</span></td>
        </tr>
        <tr>
          <td style="width:36%;"><span class="bd-word" lang="hi">कमला</span><span class="bd-roman">Kamalā</span></td>
          <td>
            <span class="bd-meaning">Kamala (name)</span>
            <div class="bd-badges">
              <span class="meta-badge" style="background:rgba(131,24,67,.25);color:#f9a8d4;border:1px solid rgba(236,72,153,.25);">f</span>
              <span class="meta-badge" style="background:rgba(30,41,59,.6);color:#94a3b8;border:1px solid rgba(51,65,85,.4);">singular</span>
            </div>
          </td>
        </tr>
        <tr>
          <td style="width:36%;"><span class="bd-word" lang="hi">जी</span><span class="bd-roman">jī</span></td>
          <td><span class="bd-meaning">respectful honorific after a name</span><span class="bd-note">like 'Mr./Ms.' but more versatile</span></td>
        </tr>
        <tr>
          <td style="width:36%;"><span class="bd-word" lang="hi">हैं</span><span class="bd-roman">haĩ</span></td>
          <td><span class="bd-meaning">are</span><span class="bd-note">plural/formal form — used because आप always takes this form</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="chapter-meta">Complete Hindi, Chapter 01, Dialog 01</p>

</div>
```

---

## Part 3 — Implementation Checklist

### Files to create

| File | Purpose |
|---|---|
| `src/components/SentenceCard.astro` | Website sentence card shell — header, literal gloss, delegates to WordBreakdownSection |
| `src/components/cards/sections/WordBreakdownSection.astro` | The `<details>` word breakdown section; accepts `words: SentenceWord[]` prop |
| `src/components/SentenceList.astro` | Renders chapter group headers + maps sentences to SentenceCard |
| `src/scripts/anki/sentenceNoteType.js` | Exports `ANKI_SENTENCE_NOTE_TYPE`, `ANKI_SENTENCE_FIELDS`, `ANKI_SENTENCE_CSS`, `ANKI_SENTENCE_FRONT`, `ANKI_SENTENCE_BACK` |
| `src/scripts/anki/fields/sentenceBreakdown.js` | `buildWordBreakdown(words)` field builder — see section 2.5 |

### Files to update

| File | What to add |
|---|---|
| `src/utils/cardHelpers.ts` | `registerStyle(register: string): string` helper — see section 1.5 |
| `src/utils/types.ts` | `SentenceWord`, `Sentence`, `SentenceChapter` interfaces — see below |
| `src/scripts/anki/export.js` | Create/sync `Hindi Sentence` note type via AnkiConnect alongside existing `Hindi Vocabulary` |
| `STYLE.md` | Add "Word Breakdown" row to section accent table (`border-teal-500/40`); add register badge colour mapping table to Components section |

### Files to delete

None. The sentence card is purely additive.

### Type interfaces to add to `src/utils/types.ts`

```typescript
export interface SentenceWord {
  hindi: string;
  roman: string;
  meaning: string;
  note?: string;
  gender?: 'masculine' | 'feminine';
  number?: 'singular' | 'plural';
}

export interface Sentence {
  hindi: string;
  romanisation: string;
  english: string;
  literal?: string;
  register?: 'formal' | 'standard' | 'casual' | 'colloquial';
  words?: SentenceWord[];
  anki_tags?: string[];
}

export interface SentenceChapter {
  chapter: string;
  sentences: Sentence[];
}
```

### Anki note type name

```
Hindi Sentence
```

This is a separate note type from the existing `Hindi Vocabulary`. Both coexist in the same deck structure. Both are created/synced during the export flow.

---

## UI/UX Designer — Improvement Suggestions

### 1. Inline token highlighting between header and breakdown

When the word breakdown `<details>` is open, highlight the matching token in the header `<h2>` as the user hovers over each breakdown row. This creates a direct visual link between the full sentence and its component words — exactly the cognitive mapping the card is trying to build. Implementation: add `data-token-index` attributes to both the tokenised header spans and the breakdown rows; a JS `mouseover` handler adds a transient amber ring (`outline outline-1 outline-amber-500/40 rounded`) on the corresponding header token. This is a progressive enhancement — it degrades gracefully to the current design without JS.

### 2. Audio playback affordance on the sentence header

Sentence-level pronunciation is more valuable than word-level for learners building natural speech rhythm (sandhi, elision, stress). A small speaker icon in the card header — right of the romanisation line — would allow a TTS hook or pre-recorded audio file to be attached per sentence. The icon uses `text-slate-600 hover:text-slate-300 transition-colors` (matching the deselect button pattern in WordCard) to stay visually recessive until needed. No audio data field exists yet; spec the field as `audio_url?: string` in `Sentence` so it is ready when needed.

### 3. Sentence count badge on chapter group headers

The current chapter header shows a muted `text-zinc-700` count. Consider promoting this to a pill badge (`bg-zinc-800 text-zinc-500 text-[10px] px-2 py-0.5 rounded-full`) matching the sidebar word-count pattern. This helps learners gauge chapter length at a glance without counting cards manually, and reinforces visual consistency with the sidebar.

### 4. "Copy Hindi" micro-action in the card header

A copy-to-clipboard icon (same `w-5 h-5 text-slate-600 hover:text-slate-300 transition-colors` pattern as the deselect button) next to the Hindi sentence lets learners paste Devanagari into a handwriting practice tool or messaging app. This is a single-line JS addition and does not change the visual language. Place it to the right of the `<h2>`, as a sibling of the chevron, inside the right-aligned `shrink-0 flex` column.

### 5. Anki front — optional cloze scaffold for longer sentences

Full Hindi production from English is a high-difficulty prompt for sentences of eight or more words. A future option worth prototyping: an alternative front template that pre-fills the first Hindi word as a scaffold (e.g. "Are you Kamala? → क्या ___"). This would require a `FirstWord` field or a computed partial-cloze value. It is not in scope for v1. To future-proof: keep `ANKI_SENTENCE_FIELDS` extensible — any scaffold field slots cleanly between `Romanisation` and `Literal` without shifting existing field indices.
