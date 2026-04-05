# Design Spec — New Vocabulary Format
**HindiWeb · UI/UX Design Specification**
*Authored: 2026-04-05 — Lead UI/UX Designer*

This document is the single source of truth for implementing the new word-data format on the website word cards and in Anki flashcards. Hand this directly to the Tech Lead; every Tailwind class string, colour hex, and layout rule below is implementation-ready.

---

## 0. Guiding Principles for This Redesign

The new data format is leaner and more structured than the old one. The design response must match that intent:

- **Lean header, richer grammar signal.** The old header showed only the Hindi word + romanisation + primary English meaning + a category badge. The new header adds `pos`, `gender`, and `transitivity` — but these must not crowd the word. Grammar signals are badges; they support the word, they do not compete with it.
- **Syllables belong in the header, not a section.** With the old format the pronunciation guide was a complex expandable section. Now it is a single string. Promoting it to the header (inline, below the word) keeps the card clean and eliminates one section entirely.
- **Usage Notes is the new "memory hook" — promote it above the fold.** The old Memory Hook was personal mnemonics. Usage Notes is semantically useful to every learner. It should be the first expandable section the eye lands on after the header.
- **Collocations = cheat sheet. Related Words = vocabulary expansion.** These two concepts differ in intent and must differ visually. Collocations are tabular quick-reference. Related Words are more open-ended and read as a vocabulary neighbourhood.
- **Fewer sections, more visible per section.** The removed sections (Memory, Examples, Cross-Language, Urdu & Punjabi) shorten every card. The sections that remain should feel more spacious, not more compressed. Do not backfill with decorative chrome.

---

## Part 1 — Website Word Card

### 1.1 Card Header Redesign

**Current structure (to be replaced):**
```
[Hindi word] · [romanisation] [English primary] [flex spacer] [category badge] [origin badge] [deselect btn]
```

**New structure:**
```
Row 1: [Hindi word] · [romanisation] · [syllables string]     [deselect btn]
Row 2: [English primary]  [English secondary if any]
Row 3: [pos badge] [gender badge?] [transitivity badge?]
```

Rows 2 and 3 sit below row 1 in a column within the flex container. This separates the phonetic layer (row 1) from the semantic layer (row 2) from the grammatical layer (row 3).

**Implementation detail — the header `<div>` becomes a two-column flex:**
- Left column: `flex-1 min-w-0 flex flex-col gap-1.5 py-1`
- Right column: `shrink-0 flex items-start` (holds the deselect button)

**Row 1 — phonetic identity line:**
```html
<div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
  <h2 class="word-hindi text-2xl sm:text-3xl font-bold leading-none shrink-0" lang="hi">{hindi}</h2>
  <span class="text-slate-700 shrink-0">·</span>
  <span class="word-roman text-base sm:text-lg leading-none shrink-0">{romanisation}</span>
  {syllables && (
    <>
      <span class="text-slate-700 shrink-0">·</span>
      <span class="text-teal-300/60 text-sm font-mono tracking-widest shrink-0">{syllables}</span>
    </>
  )}
</div>
```

The syllables string is teal (romanisation colour family) at `/60` opacity — it is the most secondary element on this line. Monospace (`font-mono`) matches the existing evolution chain style and visually marks it as a phonetic/structural string rather than prose.

**Row 2 — meaning line:**
```html
<div class="flex flex-wrap items-center gap-1.5">
  <span class="text-slate-200 text-sm leading-none">{primaryMeaning}</span>
  {secondaryMeanings && (
    <span class="text-slate-500 text-xs leading-none">{secondaryMeanings}</span>
  )}
</div>
```

Note: the primary meaning chip (`bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-700/50`) from the old design is **removed**. The word is now the visual hero; the English meaning is simply text beside it. The old chip styling created a visual bubble that competed with the word for weight. Plain `text-slate-200` is sufficient — the size hierarchy (large Hindi word vs small English) carries the hierarchy without a box.

**Row 3 — grammar badges:**
```html
<div class="flex flex-wrap items-center gap-1.5 mt-0.5">
  {pos && (
    <span class:list={['text-xs font-title font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg', categoryStyle(pos)]}>
      {pos}
    </span>
  )}
  {gender === 'masculine' && (
    <span class="text-xs font-title font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-900/20 text-blue-300/80 border border-blue-700/30">
      m
    </span>
  )}
  {gender === 'feminine' && (
    <span class="text-xs font-title font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-pink-900/20 text-pink-300/80 border border-pink-700/30">
      f
    </span>
  )}
  {transitivity && (
    <span class="text-xs font-title font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-400 border border-slate-700/40">
      {transitivity === 'transitive' ? 'trans.' : 'intrans.'}
    </span>
  )}
</div>
```

**Gender badge rationale:** Gender uses the existing `.hl-masc` (`blue-300`) and `.hl-fem` (`pink-300`) semantic colours already defined in the global highlight system. This maintains the "colour = meaning" principle — blue-300 already means masculine gender in this codebase. The badge abbreviates to `m` / `f` rather than spelling out `masculine` / `feminine` — at `text-xs` the full word is visually cluttered, and these are universal grammatical abbreviations that learners know.

**Transitivity badge:** Uses the default neutral badge style (`bg-slate-800/60 text-slate-400 border border-slate-700/40`) — it carries no semantic colour because transitivity does not map to an existing colour meaning. Abbreviated to `trans.` / `intrans.` for the same space reason as gender.

**The deselect button** moves to the right column, vertically top-aligned:
```html
<button class="deselect-btn text-xs text-slate-600 hover:text-slate-300 w-5 h-5 flex items-center justify-center mt-1 transition-colors" ...>✕</button>
```

---

### 1.2 Forms Section

The `FormsSection` component keeps its existing chip structure (`form-chip` classes via `chipClass()`). The only change is that `gender` is now available at the top level of the word object, not inferred from form labels.

**Design implication:** If `forms` is empty but `gender` is set, do not render a gender chip in the Forms section — gender is already communicated in the header grammar row (§1.1). The Forms section is for inflected forms only, not for repeating metadata.

**If `forms` has entries:** render them as before. The `chipClass()` function already uses `.hl-masc` / `.hl-fem` colour logic for chip variants — no change needed there.

**Secondary meanings:** the `secondaryMeanings` string now renders in the header row 2 (§1.1) rather than in a separate `bg-slate-800/40 rounded-lg` box inside FormsSection. Remove the secondary meanings box from `FormsSection`. The `english_usage` italic note stays in FormsSection as-is.

**If forms is empty and there are no secondary meanings or usage notes,** the FormsSection renders nothing (existing behaviour preserved).

---

### 1.3 Syllables

**Decision: syllables belong in the card header, not a separate section.**

The old `PronunciationSection` was warranted because `pronunciation_guide` contained a breakdown table, stress notes, language-specific tips, and extra notes — genuine informational density that justified its own collapsible pane.

The new `syllables` field is a single string (e.g. `"लड़ · का"`). Placing a single string behind a `<details>` toggle would be disproportionate — the toggle affordance costs more attention than the content is worth. Inline in the header is the right level for it.

**Implementation:** see §1.1 Row 1 — the syllables string renders inline after the romanisation, separated by a `·` divider, in `text-teal-300/60 text-sm font-mono tracking-widest`.

**The `PronunciationSection` component should be removed entirely.** No replacement component is needed.

---

### 1.4 Usage Notes Section (new)

**Accent colour:** `border-violet-500/40` — the violet slot was used by Memory Hook, which is now removed. Usage Notes inherits it because it is the closest functional relative (a prose note about meaning/use).

**Section label:** `Usage Notes`

**Placement in section order:** first expandable section, immediately after the header/forms area. This is the most pedagogically valuable new field — it answers "how and when do I use this word?" which is what learners want to know most.

**Start open by default:** unlike other sections, Usage Notes should render with the `<details>` element **open by default** (`<details open>`). This is justified because the content is short (one prose paragraph) and is the most important supplementary information on the card. The learner should not have to take an extra action to read it. All other sections remain closed by default.

```astro
<details open class="group/det">
  <summary class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4
                  cursor-pointer list-none select-none
                  hover:bg-slate-800/30 transition-colors">
    <span class="font-title text-xs sm:text-sm font-medium tracking-wider uppercase
                 text-slate-400 group-open/det:text-slate-200 transition-colors">
      Usage Notes
    </span>
    <span class="text-slate-600 group-open/det:rotate-180 transition-transform duration-200 text-xs">▾</span>
  </summary>
  <div class="border-l-2 border-violet-500/40 ml-4 sm:ml-6 mb-4 px-4 sm:px-5 py-3 sm:py-4">
    <p class="text-[15px] text-slate-300 leading-relaxed" set:html={highlight(usage_notes)} />
  </div>
</details>
```

No inner card box (`bg-slate-800/40`) is needed — usage notes is a single continuous paragraph. The left-border accent on the content `<div>` provides sufficient section identity without an additional container.

---

### 1.5 Collocations Section (new)

**Accent colour:** `border-emerald-500/40` — emerald is currently used only for "success / online status" in the UI, which does not appear inside word cards. Collocations repurpose emerald inside the card context to mean "live usage pattern". The semantic shift is acceptable because card sections and UI state indicators never co-exist in the same view.

**Section label:** `Collocations`

**Design intent:** quick-reference usage cheat sheet. The user should be able to scan all collocations in under 10 seconds. A compact two-column layout achieves this — Hindi phrase on the left, English gloss on the right, romanisation as a quiet sub-line under the Hindi.

**Layout:** a series of rows inside a subtle grid. Not a `<table>` (tables are semantically wrong here and awkward on mobile). A flex column of item rows, each item using a two-part layout.

```astro
<details class="group/det">
  <summary class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4
                  cursor-pointer list-none select-none
                  hover:bg-slate-800/30 transition-colors">
    <span class="font-title text-xs sm:text-sm font-medium tracking-wider uppercase
                 text-slate-400 group-open/det:text-slate-200 transition-colors">
      Collocations
    </span>
    <span class="text-slate-600 group-open/det:rotate-180 transition-transform duration-200 text-xs">▾</span>
  </summary>
  <div class="px-4 sm:px-6 pb-4 pt-1 space-y-1">
    {collocations.map((c) => (
      <div class="flex items-baseline justify-between gap-4 py-2 border-b border-slate-800/60 last:border-0">
        <div class="flex flex-col gap-0.5 min-w-0">
          <span class="word-hindi text-base leading-snug" lang="hi">{c.hindi}</span>
          <span class="text-teal-300/60 text-[12px] font-mono">{c.roman}</span>
        </div>
        <span class="text-slate-300 text-sm leading-snug text-right shrink-0 max-w-[55%]">{c.english}</span>
      </div>
    ))}
  </div>
</details>
```

**Design rationale for this layout:**
- Each collocation is a row separated by a hairline `border-slate-800/60` — this creates a scannable list with a clear visual count, like a compact dictionary entry.
- Hindi phrase left-aligned (it's what the learner is memorising), English right-aligned (it's the gloss they scan to check understanding). This mirrors how bilingual dictionaries arrange parallel text.
- Romanisation as a small `text-[12px] font-mono text-teal-300/60` sub-line under the Hindi — visible but recessive, because learners who need romanisation get it, while those who don't are not distracted by it.
- No inner `bg-slate-800/40` card box per row — that pattern is for richer items (cross-language entries, examples). Collocation rows are deliberately minimal; the divider line provides enough structure.
- No left-border accent stripe on the content wrapper — the per-row divider provides sufficient structure, and removing the stripe keeps this section visually lighter than prose sections (Usage Notes, Etymology).

---

### 1.6 Related Words Section (new)

**Accent colour:** `border-sky-500/40` — sky was used by the old Cross-Language section, which is being removed. Related Words is a different concept (semantic neighbourhood, not etymological links), but occupying the sky slot is appropriate because both deal with vocabulary relationships across the language.

**Section label:** `Related Words`

**Design intent:** vocabulary expansion, not a lookup table. The learner should feel they are stepping into a neighbourhood of words, not scanning a reference list. Each related word is presented as a small card — compact but with more visual weight per item than a collocation row, because each item is a complete vocabulary entry in its own right.

```astro
<details class="group/det">
  <summary class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4
                  cursor-pointer list-none select-none
                  hover:bg-slate-800/30 transition-colors">
    <span class="font-title text-xs sm:text-sm font-medium tracking-wider uppercase
                 text-slate-400 group-open/det:text-slate-200 transition-colors">
      Related Words
    </span>
    <span class="text-slate-600 group-open/det:rotate-180 transition-transform duration-200 text-xs">▾</span>
  </summary>
  <div class="px-4 sm:px-6 pb-4 pt-2 flex flex-wrap gap-2">
    {related_words.map((rw) => (
      <div class="bg-slate-800/40 rounded-xl px-3.5 py-2.5 border border-slate-700/30 flex flex-col gap-0.5">
        <div class="flex items-baseline gap-1.5">
          <span class="word-hindi text-base leading-none" lang="hi">{rw.hindi}</span>
          <span class="text-teal-300/60 text-[12px] font-mono">{rw.roman}</span>
        </div>
        <span class="text-slate-400 text-[13px] leading-snug">{rw.english}</span>
      </div>
    ))}
  </div>
</details>
```

**Design rationale — chips vs rows:**
- Collocations are rows because the Hindi–English pairing is the content, and scanning that pairing is the task. Rows enforce a left–right reading path that matches the task.
- Related Words are chips (small cards in a `flex-wrap` grid) because each item is an independent vocabulary entry. The chip shape makes each word feel self-contained and discrete. The wrap layout lets the browser fit as many chips per row as space allows, which feels more organic than a rigid column — appropriate for a "neighbourhood" concept.
- Chip corner radius: `rounded-xl` (inner box, per the corner radius rule: card = `rounded-2xl`, inner box = `rounded-xl`).
- Each chip contains: Hindi word (amber, via `word-hindi`), romanisation (teal/60, mono, small), English gloss (slate-400, smallest). This three-level hierarchy inside the chip mirrors the three-level hierarchy in the sidebar word rows — a visual rhyme that reinforces the "this is a word entry" reading.

**How this differs from Collocations visually:**
- Collocations: full-width divider rows, two-column layout (phrase : gloss), scannable like a mini-table.
- Related Words: wrapped chips, each word self-contained, browseable like a tag cloud. The different container shape (open rows vs enclosed chips) communicates the different relationship (usage pattern vs vocabulary item).

---

### 1.7 Sound Alikes Section (redesigned)

**Accent colour:** `border-rose-500/40` — unchanged from the existing `SoundAlikesSection`.

**Section label:** `Sound Alikes` — unchanged.

**What changed in the data:** The old structure was `{word, language, romanisation, meaning, note}`. The new structure is `{part, association, roman, language, note}`. The key new element is `part` — it specifies which part of the Hindi word is being linked (e.g. `"घर (full word)"` or `"लड़ (laṛ-)"`). This was invisible before and is important: learners need to know whether the mnemonic hook applies to the whole word or just a syllable.

**New design — each Sound Alike item:**

```astro
<div>
  <!-- Part label: which Hindi fragment is being hooked -->
  <div class="flex flex-wrap items-center gap-1.5 mb-1">
    <span class="word-hindi text-base leading-none" lang="hi">
      {/* extract the Devanagari portion of `part` — e.g. "घर" from "घर (full word)" */}
      {extractDevanagari(sa.part)}
    </span>
    <span class="text-slate-600 text-[11px] font-title uppercase tracking-wide">
      {/* extract the parenthetical label — e.g. "full word" or "laṛ-" */}
      {extractPartLabel(sa.part)}
    </span>
    <span class="text-slate-700 mx-0.5">→</span>
    <!-- Association: the target word in the foreign language -->
    {sa.language && (
      <span class:list={['text-[11px] font-title font-semibold uppercase tracking-wide', langColor(sa.language)]}>
        {sa.language}
      </span>
    )}
    <span class="text-slate-200 text-sm font-semibold">"{sa.association}"</span>
    {sa.roman && sa.roman !== sa.association && (
      <span class="word-roman text-sm">({sa.roman})</span>
    )}
  </div>
  <!-- Mnemonic note -->
  {sa.note && (
    <p class="text-[14px] leading-relaxed text-slate-300 ml-1" set:html={highlight(sa.note)} />
  )}
</div>
```

**Note on the `extractDevanagari` / `extractPartLabel` helpers:** The `part` field is a free-form string like `"लड़ (laṛ-)"` or `"घर (full word)"`. The Tech Lead should implement two small utility functions that parse this string:
- `extractDevanagari(part)` — returns the Devanagari text before the first space or `(`.
- `extractPartLabel(part)` — returns the content inside `(…)`.

If the string cannot be parsed (no parenthetical), display `part` as a plain `text-slate-400 text-sm` string with no special treatment.

**Visual flow per item:**
```
[घर]  full word  →  [ENGLISH]  "gar"
Think of a garage as part of your house.
```

The arrow `→` between `part` and `association` is `text-slate-700` — subtle, just a connector. It visually distinguishes "the Hindi fragment" from "the foreign word it sounds like", which was impossible to communicate in the old flat structure.

---

### 1.8 Etymology Journey Section (new)

**Replaces:** the old `RootOriginSection` and `Etymology Story` section.

**Accent colour:** `border-blue-500/40` — same as the old Root & Origin section. Etymology is the same conceptual territory; reusing the colour maintains learned associations.

**Section label:** `Etymology`

**Layout:** a horizontal monospace chain of stages, each stage rendered as `[Stage]: [form] (roman) — meaning`. Stages are connected by `→` arrows. This extends the existing monospace evolution chain pattern from `RootOriginSection` into a richer structured form.

On mobile (< sm breakpoint), the chain wraps vertically — each stage becomes its own line.

```astro
<details class="group/det">
  <summary class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4
                  cursor-pointer list-none select-none
                  hover:bg-slate-800/30 transition-colors">
    <span class="font-title text-xs sm:text-sm font-medium tracking-wider uppercase
                 text-slate-400 group-open/det:text-slate-200 transition-colors">
      Etymology
    </span>
    <span class="text-slate-600 group-open/det:rotate-180 transition-transform duration-200 text-xs">▾</span>
  </summary>
  <div class="border-l-2 border-blue-500/40 ml-4 sm:ml-6 mb-4 px-4 sm:px-5 py-3 sm:py-4 space-y-3">

    <!-- Journey chain -->
    <div class="flex flex-wrap items-start gap-y-2">
      {etymology_journey.map((stage, i) => (
        <>
          {i > 0 && <span class="text-slate-700 mx-2 mt-1 text-xs self-start">→</span>}
          <div class="flex flex-col gap-0.5">
            <span class="font-title text-[9px] font-semibold uppercase tracking-widest text-zinc-600">
              {stage.stage}
            </span>
            <span class="word-hindi text-base leading-none" lang="hi">{stage.form}</span>
            <span class="text-teal-300/60 text-[12px] font-mono">{stage.roman}</span>
            <span class="text-slate-500 text-[12px] italic leading-snug">{stage.meaning}</span>
          </div>
        </>
      ))}
    </div>

    <!-- Origin note -->
    {origin_note && (
      <p class="text-[14px] text-slate-400 italic leading-relaxed border-t border-slate-800/60 pt-3">
        {origin_note}
      </p>
    )}

  </div>
</details>
```

**Design rationale for the stage column layout:**
Each stage is a vertical stack of four items (stage label, Devanagari form, romanisation, meaning). This is richer than the old `Stage: form →` chain because it exposes the romanisation and meaning at each stage — a learner can trace the semantic drift, not just the phonetic drift. The column stack within a flex-wrap row means the chain reads left-to-right on desktop and collapses gracefully to a vertical list on mobile.

**Stage label typography:** `font-title text-[9px] font-semibold uppercase tracking-widest text-zinc-600` — the column-header level from the label system. It labels the stage (Sanskrit / Prakrit / Hindi) without competing with the Devanagari form below it.

**`origin_note`:** a short italic paragraph, `text-[14px] text-slate-400 italic leading-relaxed`, separated from the chain by a hairline border. This is the existing "italic etymology / logic line" recipe from STYLE.md — appropriate because origin_note is a brief discursive gloss, not a primary content item.

---

### 1.9 Sections to Remove

The following section components should be **deleted entirely** from the codebase:

| Component | Reason |
|---|---|
| `MemorySection.astro` | `memory_hook` removed from data format |
| `ExamplesSection.astro` | `examples` removed from data format |
| `UrduPunjabiSection.astro` | `urdu_punjabi` removed from data format |
| `CrossLangSection.astro` | `cross_language_connections` removed from data format |
| `PronunciationSection.astro` | replaced by inline syllables in the header |

Their corresponding imports, props, and conditional rendering blocks in `WordCard.astro` must also be removed.

---

### 1.10 Recommended Section Order

Inside the card, after the header row (§1.1):

```
1. FormsSection          — always-visible, not behind <details>; shows inflected forms + secondary meanings
2. UsageNotesSection     — <details open> — first expandable, open by default
3. CollocationsSection   — <details> — quick-reference usage cheat sheet
4. RelatedWordsSection   — <details> — vocabulary expansion
5. SoundAlikesSection    — <details> — mnemonic hooks
6. EtymologySection      — <details> — origin chain + origin_note
```

**Rationale for this order:**
- Forms is above-the-fold because it is the most immediately needed grammatical data (inflections, plurals, verb forms). It is not behind a toggle.
- Usage Notes is second and open by default — the most actionable new content (register, nuance, common mistakes). A learner opening a card benefits most from this.
- Collocations is third — moves from no-coverage in the old format to an important usage reference. Third position makes it accessible without it dominating the card.
- Related Words is fourth — vocabulary expansion is a secondary goal relative to understanding the word itself.
- Sound Alikes and Etymology are reference/enrichment material — useful but not urgent. They go at the bottom where learners who want depth can find them.

---

## Part 2 — Anki Card Redesign

### 2.1 New ANKI_FIELDS Array

Replace the existing `ANKI_FIELDS` in `noteType.js` with:

```js
export const ANKI_FIELDS = [
  'English',      // front face prompt; back: recessive meaning-reveal
  'Hindi',        // back answer header — Devanagari
  'Romanisation', // back answer header — teal
  'Category',     // pos badge — drives categoryStyle colour
  'Gender',       // new — 'm' / 'f' / '' — rendered as a badge in the header-chips row
  'Transitivity', // new — 'trans.' / 'intrans.' / '' — neutral badge
  'Forms',        // inflected form chips — unchanged
  'UsageNotes',   // new — replaces Memory
  'Collocations', // new — replaces Examples (closest functional equivalent)
  'RelatedWords', // new
  'SoundAlikes',  // kept — structure updated (see §2.4)
  'Etymology',    // new — replaces RootOrigin; combines etymology_journey + origin_note
];
```

**Fields removed:**
- `Pronunciation` — replaced by inline syllables in the header (see §2.3)
- `Memory` — `memory_hook` gone from data
- `Examples` — `examples` gone from data
- `RootOrigin` — replaced by `Etymology`
- `UrduPunjabi` — gone from data
- `CrossLanguage` — gone from data

**Fields added:**
- `Gender` — grammatical gender badge
- `Transitivity` — verb transitivity badge
- `UsageNotes` — prose usage note
- `Collocations` — collocation table
- `RelatedWords` — related vocabulary chips
- `Etymology` — etymology journey chain

**`Syllables` is NOT a separate Anki field.** The syllables string is folded into the answer header directly (see §2.3).

---

### 2.2 Front Card — No Structural Change

The front face design is unchanged: English meaning centred, category badge below it. The added grammar fields (Gender, Transitivity) do not appear on the front — they are answer-side information that could interfere with recall.

```mustache
{{English}}
{{#Category}}<div class="chips" style="margin-top:.5rem;">{{Category}}</div>{{/Category}}
```

The only update: the `Category` field builder should use `pos` from the new data format (same rendering, just sourced from `pos` instead of `word_category`).

---

### 2.3 Back Card — Answer Header

The answer header gains two additions: the Syllables string (inline, replacing the Pronunciation section) and the Gender / Transitivity badge row.

**New back card template:**

```mustache
<div class="card-wrap">
  <div class="answer-header">
    <p class="hindi" lang="hi">{{Hindi}}</p>
    <p class="roman">{{Romanisation}}</p>
    {{#Syllables}}<p class="syl-inline">{{Syllables}}</p>{{/Syllables}}
    <p class="meaning-reveal">{{English}}</p>
    <div class="header-chips">
      {{#Category}}{{Category}}{{/Category}}
      {{#Gender}}{{Gender}}{{/Gender}}
      {{#Transitivity}}{{Transitivity}}{{/Transitivity}}
    </div>
    {{#Forms}}<div style="margin-top:.9rem;">{{Forms}}</div>{{/Forms}}
  </div>
  {{#UsageNotes}}<div>{{UsageNotes}}</div>{{/UsageNotes}}
  {{#Collocations}}<div>{{Collocations}}</div>{{/Collocations}}
  {{#RelatedWords}}<div>{{RelatedWords}}</div>{{/RelatedWords}}
  {{#SoundAlikes}}<div>{{SoundAlikes}}</div>{{/SoundAlikes}}
  {{#Etymology}}<div>{{Etymology}}</div>{{/Etymology}}
</div>
```

**New CSS rule for `.syl-inline`** (add to `ANKI_CSS`):
```css
.syl-inline { font-size: 1.1rem; font-weight: 600; color: #5eead4; opacity: 0.6;
              font-family: monospace; letter-spacing: .15em; margin: 0 0 .4rem 0; }
```

This matches the website header syllables style: teal, `/60` opacity, monospace, tracked. It sits between `.roman` and `.meaning-reveal` in the header hierarchy — readable but clearly the most secondary phonetic element.

**New CSS rules for Gender / Transitivity badges** (add to `ANKI_CSS`):
```css
.badge-masc { background: rgba(30,58,138,.25); color: #93c5fd; border: 1px solid rgba(59,130,246,.25);
              font-family: "Oswald",sans-serif; font-size:.58rem; font-weight:700;
              text-transform:uppercase; letter-spacing:.15em;
              padding:.18rem .5rem; border-radius:6px; }
.badge-fem  { background: rgba(131,24,67,.25); color: #f9a8d4; border: 1px solid rgba(236,72,153,.25);
              font-family: "Oswald",sans-serif; font-size:.58rem; font-weight:700;
              text-transform:uppercase; letter-spacing:.15em;
              padding:.18rem .5rem; border-radius:6px; }
.badge-neutral { background: rgba(30,41,59,.6); color: #94a3b8; border: 1px solid rgba(51,65,85,.4);
              font-family: "Oswald",sans-serif; font-size:.58rem; font-weight:700;
              text-transform:uppercase; letter-spacing:.15em;
              padding:.18rem .5rem; border-radius:6px; }
```

The `Gender` field builder generates `<span class="badge-masc">m</span>` or `<span class="badge-fem">f</span>`. The `Transitivity` field builder generates `<span class="badge-neutral">trans.</span>` or `<span class="badge-neutral">intrans.</span>`.

---

### 2.4 Back Card — Section Designs

#### UsageNotes
```
Accent: #8b5cf6 (violet-500) — same as old Memory Hook
Label:  USAGE NOTES
```

Content is a single prose paragraph. No inner `.ex-card` box needed — wrap in `.field-sec` directly.

```js
// fields/usageNotes.js
aSection('Usage Notes', `<p style="font-size:.9rem;color:#cbd5e1;line-height:1.7;">${escHtml(usage_notes)}</p>`, '#8b5cf6')
```

#### Collocations
```
Accent: #10b981 (emerald-500)
Label:  COLLOCATIONS
```

Each collocation is a compact two-column row inside the section box (no `.ex-card` — rows are lighter than full cards):

```js
// fields/collocations.js
const rows = collocations.map(c =>
  `<div style="display:flex;justify-content:space-between;align-items:baseline;` +
  `padding:.45rem 0;border-bottom:1px solid rgba(30,41,59,.8);">` +
  `<div style="display:flex;flex-direction:column;gap:.15rem;">` +
  `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1rem;color:#fbbf24;">${escHtml(c.hindi)}</span>` +
  `<span style="font-size:.75rem;color:#5eead4;opacity:.6;font-family:monospace;letter-spacing:.05em;">${escHtml(c.roman)}</span>` +
  `</div>` +
  `<span style="font-size:.85rem;color:#cbd5e1;text-align:right;max-width:55%;">${escHtml(c.english)}</span>` +
  `</div>`
).join('');
// wrap last row — remove border-bottom via :last-child (Anki supports it)
aSection('Collocations', `<div>${rows}</div>`, '#10b981')
```

#### RelatedWords
```
Accent: #0ea5e9 (sky-500)
Label:  RELATED WORDS
```

Each related word is a small inline chip (flex-wrap row of chips):

```js
// fields/relatedWords.js
const chips = related_words.map(rw =>
  `<div style="display:inline-flex;flex-direction:column;gap:.15rem;` +
  `background:#0f172a;border:1px solid rgba(51,65,85,.55);border-radius:10px;` +
  `padding:.5rem .75rem;margin:.25rem;">` +
  `<div style="display:flex;align-items:baseline;gap:.4rem;">` +
  `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1rem;color:#fbbf24;">${escHtml(rw.hindi)}</span>` +
  `<span style="font-size:.75rem;color:#5eead4;opacity:.6;font-family:monospace;">${escHtml(rw.roman)}</span>` +
  `</div>` +
  `<span style="font-size:.82rem;color:#94a3b8;">${escHtml(rw.english)}</span>` +
  `</div>`
).join('');
aSection('Related Words', `<div style="display:flex;flex-wrap:wrap;gap:.25rem;margin:-.25rem;">${chips}</div>`, '#0ea5e9')
```

Note: the inner chip uses `background:#0f172a` (slate-900 — the `.ex-card` / `.clang-item` pattern) to create the same sandwich depth as the website: `field-sec` (slate-800) containing chips (slate-900).

#### SoundAlikes
```
Accent: #e11d48 (rose-600) — unchanged
Label:  SOUND ALIKES
```

The new `part` field must be surfaced. Each item uses the `.clang-item` container (existing) with an added "part anchor" header before the association:

```js
// fields/soundAlikes.js — updated for new structure
const items = sound_alikes.map(sa =>
  `<div class="clang-item">` +
  `<div style="display:flex;align-items:center;gap:.4rem;justify-content:center;margin-bottom:.35rem;">` +
  `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1rem;color:#fbbf24;">${extractDevanagari(sa.part)}</span>` +
  `<span style="font-size:.6rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;` +
  `letter-spacing:.12em;color:#475569;">${extractPartLabel(sa.part)}</span>` +
  `<span style="color:#334155;font-size:.8rem;margin:0 .2rem;">→</span>` +
  `<span class="lang-label" style="color:${langHex(sa.language)};">${escHtml(sa.language)}</span>` +
  `<span style="color:#f1f5f9;font-size:.95rem;font-weight:600;">"${escHtml(sa.association)}"</span>` +
  `</div>` +
  (sa.note ? `<p class="item-note">${escHtml(sa.note)}</p>` : '') +
  `</div>`
).join('');
aSection('Sound Alikes', items, '#e11d48')
```

#### Etymology
```
Accent: #2563eb (blue-600) — same as old Roots & Origin
Label:  ETYMOLOGY
```

Each stage of `etymology_journey` is a column; stages are connected by arrows. The origin_note is a muted italic paragraph below.

```js
// fields/etymology.js
const stages = etymology_journey.map((stage, i) =>
  (i > 0 ? `<span style="color:#1e293b;font-size:.9rem;align-self:center;margin:0 .4rem;">→</span>` : '') +
  `<div style="display:flex;flex-direction:column;gap:.1rem;min-width:5rem;">` +
  `<span style="font-size:.55rem;font-family:'Oswald',sans-serif;font-weight:700;text-transform:uppercase;` +
  `letter-spacing:.15em;color:#475569;">${escHtml(stage.stage)}</span>` +
  `<span style="font-family:'Tiro Devanagari Hindi',serif;font-size:1.05rem;color:#fbbf24;">${escHtml(stage.form)}</span>` +
  `<span style="font-size:.72rem;color:#5eead4;opacity:.65;font-family:monospace;letter-spacing:.04em;">${escHtml(stage.roman)}</span>` +
  `<span style="font-size:.75rem;color:#64748b;font-style:italic;">${escHtml(stage.meaning)}</span>` +
  `</div>`
).join('');

const chain = `<div style="display:flex;flex-wrap:wrap;align-items:flex-start;gap:.25rem .0rem;">${stages}</div>`;

const note = origin_note
  ? `<p style="font-size:.82rem;color:#64748b;font-style:italic;line-height:1.65;` +
    `margin-top:.85rem;padding-top:.75rem;border-top:1px solid rgba(30,41,59,.8);">${escHtml(origin_note)}</p>`
  : '';

aSection('Etymology', chain + note, '#2563eb')
```

---

### 2.5 Section Accent Colour Reference — Complete Table (Updated)

#### Website sections

| Section | Accent class | Status |
|---|---|---|
| Usage Notes | `border-violet-500/40` | New (inherits from removed Memory Hook) |
| Collocations | `border-emerald-500/40` | New |
| Related Words | `border-sky-500/40` | New (inherits from removed Cross-Language) |
| Sound Alikes | `border-rose-500/40` | Kept, structure updated |
| Etymology | `border-blue-500/40` | Kept (from Root & Origin), label changed |
| ~~Root & Origin~~ | ~~`border-blue-500/40`~~ | Removed |
| ~~Etymology Story~~ | ~~`border-amber-500/50`~~ | Removed |
| ~~Memory Hook~~ | ~~`border-violet-500/40`~~ | Removed |
| ~~Examples~~ | ~~`border-blue-500/30`~~ | Removed |
| ~~Pronunciation~~ | ~~`border-teal-500/40`~~ | Removed (inline in header) |
| ~~Urdu & Punjabi~~ | ~~`border-orange-500/40`~~ | Removed |
| ~~Cross-Language~~ | ~~`border-sky-500/40`~~ | Removed |

**Available accent colours after this redesign (for future sections):** teal (`border-teal-500/40`), orange (`border-orange-500/40`), amber (`border-amber-500/50`).

#### Anki sections

| Section | Accent hex | Status |
|---|---|---|
| Usage Notes | `#8b5cf6` violet-500 | New |
| Collocations | `#10b981` emerald-500 | New |
| Related Words | `#0ea5e9` sky-500 | New |
| Sound Alikes | `#e11d48` rose-600 | Kept, structure updated |
| Etymology | `#2563eb` blue-600 | Kept (from Roots & Origin) |
| ~~Pronunciation~~ | ~~`#14b8a6`~~ | Removed |
| ~~Memory Hook~~ | ~~`#8b5cf6`~~ | Removed |
| ~~Examples~~ | ~~`#3b82f6`~~ | Removed |
| ~~Roots & Origin~~ | ~~`#2563eb`~~ | Removed |
| ~~Urdu & Punjabi~~ | ~~`#f97316`~~ | Removed |
| ~~Cross-Language~~ | varies | Removed |

---

## Part 3 — Implementation Checklist

This checklist is for the Tech Lead. It is not a design concern, but it ensures nothing is missed.

### WordCard.astro
- [ ] Remove imports: `PronunciationSection`, `MemorySection`, `ExamplesSection`, `UrduPunjabiSection`, `CrossLangSection`
- [ ] Remove all corresponding `interface Props` fields and destructuring
- [ ] Redesign card header per §1.1 (two-column flex, three rows, grammar badges)
- [ ] Remove the `hasPron`, `hasRoot`, `hasMemory`, `trueRelatives`, `usefulCoincidences` computed values
- [ ] Update `FormsSection` call to remove `secondaryMeanings` (now in header row 2)
- [ ] Add `UsageNotesSection` (open by default) in position 1 of the section list
- [ ] Add `CollocationsSection` in position 2
- [ ] Add `RelatedWordsSection` in position 3
- [ ] Update `SoundAlikesSection` call with new field structure
- [ ] Replace `RootOriginSection` with `EtymologySection`

### New component files to create
- [ ] `src/components/cards/sections/UsageNotesSection.astro`
- [ ] `src/components/cards/sections/CollocationsSection.astro`
- [ ] `src/components/cards/sections/RelatedWordsSection.astro`
- [ ] `src/components/cards/sections/EtymologySection.astro`

### Component files to delete
- [ ] `src/components/cards/sections/PronunciationSection.astro`
- [ ] `src/components/cards/sections/MemorySection.astro`
- [ ] `src/components/cards/sections/ExamplesSection.astro`
- [ ] `src/components/cards/sections/UrduPunjabiSection.astro`
- [ ] `src/components/cards/sections/CrossLangSection.astro`
- [ ] `src/components/cards/sections/RootOriginSection.astro`

### types.ts
- [ ] Remove: `PronunciationGuide`, `MemoryHook`, `UrduPunjabi`, `CrossLangConnections`, `RootBreakdown`, `RootPart`, `Example`, old `SoundAlike`
- [ ] Add: `Collocation`, `RelatedWord`, `EtymologyStage`, updated `SoundAlike` (`part`, `association`, `roman`, `language`, `note`)

### noteType.js
- [ ] Replace `ANKI_FIELDS` with the new array (§2.1)
- [ ] Add `.syl-inline`, `.badge-masc`, `.badge-fem`, `.badge-neutral` CSS rules (§2.3)
- [ ] Update `ANKI_BACK` template (§2.3)

### Anki field builder files (`src/scripts/anki/fields/`)
- [ ] Delete: `pronunciation.js`, `memory.js`, `examples.js`, `rootOrigin.js`, `urduPunjabi.js`, `crossLang.js`
- [ ] Create: `usageNotes.js`, `collocations.js`, `relatedWords.js`, `etymology.js`
- [ ] Update: `soundAlikes.js` for new `{part, association, roman, language, note}` structure
- [ ] Update: `forms.js` if it references `secondary_meanings` (now handled in header)
- [ ] Add `gender.js` and `transitivity.js` badge builders

### Utility helpers
- [ ] Add `extractDevanagari(part: string): string` to `cardHelpers.ts` and equivalent in `fields/utils.js`
- [ ] Add `extractPartLabel(part: string): string` to same files
- [ ] Update `categoryStyle()` to accept `pos` (same logic, new field name)
