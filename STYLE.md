# Style Guide

How to build new UI that looks and feels like it belongs here.  
Read the **UX Principles** and **Core Patterns** sections first — everything else derives from those ideas.

---

## UX Principles

Five principles underpin every design decision in this app. When a decision is unclear, return here.

### 1. Hierarchy before decoration

Communicate importance through position and size before reaching for colour. The Hindi word leads every card because it is typographically largest — not because it is the brightest colour. Colour then reinforces a hierarchy that structure has already established. Never use visual decoration (borders, tints, icons) as a substitute for clear spatial hierarchy.

### 2. Meaning before beauty

Every colour in this UI is a word in a vocabulary — amber means "Hindi", teal means "romanisation", blue-300 means "via this language path". Colour is a semantic signal. Using amber on a decorative hover border is the same as using a word incorrectly: it confuses the reader. Before applying any colour, ask *what does this colour mean in this context?*

### 3. Progressive disclosure

A new user sees the word, its romanisation, and its primary English meaning. Every additional layer of information — forms, pronunciation, etymology, examples — is available but not forced. Expandable sections exist so the most common interaction (reading the core word) stays uncluttered. Do not surface secondary information by default.

### 4. Reduce cognitive load per moment

The export flow is a single decision: which words, then where. The selection state is always visible in the sidebar. The export panel shows only the settings required for that one operation. Do not combine unrelated tasks in the same panel. Do not surface controls that are inactive for the current state (e.g. the Export button is disabled until Anki is reachable — this is correct; do not make it enabled with an error on press).

### 5. Restraint over novelty

This is a study tool used in repeated daily sessions. Novelty (animations, visual complexity, decorative elements) becomes friction on the hundredth use. Every visual element must earn its presence by aiding comprehension or providing clear affordance. When in doubt, subtract.

---

## Visual Density & Readability Rules

These rules exist to prevent visual strain during repeated daily study sessions. They are hard limits — not suggestions. When any rule below conflicts with a more general principle elsewhere in this guide, the rule below wins.

### Text size floor

**Minimum readable size at laptop arm's-length is `text-[11px]`.**

No text in this UI may be set smaller than `text-[11px]`. This applies to every element: stage labels, column headers, tiny meta labels, hint text, badge text. If a design requires going smaller, the design is wrong — find a layout solution instead (truncate, abbreviate, hide behind progressive disclosure).

| Context | Minimum size |
|---|---|
| Any label, header, meta, hint | `text-[11px]` |
| Romanisation in dense sections / sidebar rows | `text-[13px]` |
| Body / explanation copy | `text-[15px]` |

### No colored left-border accents on card sections

**Prohibition: do not apply a colored `border-l-*` to any expandable card section.**

Left-border accent colours on sections (violet for memory hook, rose for sound-alikes, blue for etymology, teal for breakdown, etc.) are decorative, not semantic. They add hue noise without communicating meaning — the colour does not tell the reader anything they cannot already understand from the section label. This pattern is removed from the guidelines and must not be reintroduced.

Sections are separated structurally by `divide-y`. That is sufficient. If a section needs visual weight, increase the inner content's contrast — do not reach for a border colour.

```html
<!-- WRONG: colored left border accent adds noise, not meaning -->
<div class="border-l-2 border-violet-500/40 ml-4 px-4 py-3 space-y-3">...</div>

<!-- RIGHT: plain padding, structure from divide-y on parent -->
<div class="px-4 sm:px-6 pb-4 space-y-3">...</div>
```

### Grammar badges — single consolidated row

**Consolidate all grammar metadata (POS, gender, transitivity) into a single flex row.** Do not stack separate badges vertically or show three distinct pill elements side by side with equal visual weight.

Rules:
- One `flex items-center gap-2 flex-wrap` row beneath the Hindi word
- Show only what is contextually meaningful: transitivity only for verbs and verb phrases; gender only for nouns and adjectives
- Use the existing `bg-{hue}-900/30 text-{hue}-400 border border-{hue}-700/40` badge recipe
- All badges in the row use the same `rounded-lg px-2.5 py-1 text-xs font-title font-semibold uppercase tracking-wider` sizing

```html
<!-- WRONG: three separate stacked badges with equal weight -->
<div class="flex flex-col gap-1">
  <span class="badge">verb</span>
  <span class="badge">masculine</span>
  <span class="badge">transitive</span>
</div>

<!-- RIGHT: single flex row, show only contextually relevant items -->
<div class="flex items-center gap-2 flex-wrap">
  <span class="font-title text-xs font-semibold uppercase tracking-wider
               px-2.5 py-1 rounded-lg bg-orange-900/30 text-orange-400 border border-orange-700/40">
    verb
  </span>
  <!-- transitivity shown only because this is a verb -->
  <span class="font-title text-xs font-semibold uppercase tracking-wider
               px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-400 border border-slate-600/40">
    transitive
  </span>
</div>
```

### Spacing floor for list/table sections

**Minimum `py-3` per row in any list or table section.**

`py-2.5` (10px top + bottom) is too compressed for comfortable scanning at arm's length. Every row in a breakdown table, collocation list, forms table, or any other list-style section must use at least `py-3` (12px).

| Context | Minimum row padding |
|---|---|
| Any list/table section row | `py-3` |
| Card section summary toggle | `py-3 sm:py-4` |

### No per-row dividers in list sections

**Use `space-y-3` spacing instead of `border-b` on every row in list sections.**

`border-b` on every row creates visual noise — the eye reads the borders as competing structure rather than content. Spacing communicates the same grouping without adding lines.

```html
<!-- WRONG: border on every row creates line noise -->
<div class="border-b border-slate-700/40 py-2.5">row content</div>
<div class="border-b border-slate-700/40 py-2.5">row content</div>

<!-- RIGHT: space-y-3 on the container, no per-row borders -->
<div class="space-y-3">
  <div class="py-3">row content</div>
  <div class="py-3">row content</div>
</div>
```

### Etymology chain nodes — slate-200, not amber

**Etymology chain nodes (Sanskrit/Persian/Arabic/etc. ancestor forms) use `text-slate-200`, not amber.**

Amber means "the current Hindi word". Applying amber to etymological ancestors implies they are all equally "the word" — which confuses the semantic signal. Ancestor forms in an etymology chain are supporting context, not the primary word.

| Element | Colour |
|---|---|
| Current Hindi word | `text-amber-400` (amber — always) |
| Etymology ancestor forms | `text-slate-200` |
| Language-path "via" labels | `text-blue-300/70` (existing rule, unchanged) |
| Romanisation of ancestor forms | `text-teal-300/70` |

---

## Core Patterns

There are three patterns that generate the entire visual language of this UI.  
Internalize these and you'll make the right call in any situation.

---

### 1. Surface Layering

The app uses exactly three dark surface levels. Every element sits on one of them:

```
slate-950  #020617  ← page background, sidebar, tab bar, export pane
  slate-900  #0f172a  ← word cards, inner panels
    slate-800  #1e293b  ← inputs, active chips, subtle hover overlays
```

**The rule:** depth is communicated by surface level, not by shadows or borders.  
A card sits on the page because it's lighter. An inner card sits inside a card because it's lighter still.

When you add a new element, ask: *where does this live in the stack?*  
- Container that groups content → `bg-slate-900`
- Control or field inside that container → `bg-slate-800/60`
- Hover state on a surface → `bg-slate-800/30`

Never invent a fourth level. Never go lighter than `slate-800`.

---

### 2. The Amber / Teal Colour Language

Every colour in this UI carries meaning. The two most important:

- **Amber (`amber-400`, `#fbbf24`)** — the Hindi word. Also: active state, selection, primary action.
- **Teal (`teal-300`, `#5eead4`)** — romanisation. Also: secondary emphasis.

This is not arbitrary. When a user's eye lands on amber, it means *"this is the Hindi"*. When it lands on teal, it means *"this is how you say it"*. Using amber for anything else — a decorative border, a hover tint — erodes that meaning.

**Practical formula for anything that uses amber as a primary accent:**

```
text:       text-amber-400
background: bg-amber-500/20
border:     border-amber-500/30
hover bg:   hover:bg-amber-500/30
```

This formula recurs everywhere: the export button, the active tab, the checked checkbox, the focus ring. When something needs to signal "primary" or "selected", apply this formula.

---

### 3. The Small-Caps Label System

Every structural label — section headers, column headers, group titles, field names — uses the same Oswald small-caps pattern:

```
font-title + font-semibold + uppercase + tracking-[...] + text-zinc-[...]
```

The tracking and colour vary by the label's level in the hierarchy:

| Level | Full class string | Used for |
|---|---|---|
| Page heading | `font-title text-2xl font-semibold text-zinc-100 leading-tight` | App title in sidebar |
| Section label | `font-title text-xs sm:text-sm font-medium tracking-wider uppercase text-slate-400` | Card section toggles ("Examples", "Memory Hook") |
| Group header | `font-title text-[11px] font-semibold uppercase tracking-widest text-zinc-500` | Sidebar group titles, export panel field labels |
| Column header | `font-title text-[11px] font-semibold uppercase tracking-widest text-zinc-600` | Table column headers |
| Tiny meta label | `font-title text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600` | "Study companion" subheading, export section names |

**Size floor reminder:** `text-[9px]` and `text-[10px]` are prohibited. Minimum is `text-[11px]` for any label or meta text. See the Visual Density & Readability Rules section.

**The rule:** never use Oswald (`font-title`) for body copy, explanations, or anything the user reads for meaning — only for structure and taxonomy. Never use Poppins for a label or heading.

---

## The Opacity System

Tailwind's `/N` opacity modifier is how this UI creates nuance without introducing new colours.  
There is a consistent logic to which `/N` value to use:

| Opacity | Use for |
|---|---|
| `/20` | Active state background tint (e.g. `bg-amber-500/20` for a pressed button) |
| `/30` | Hover background, very subtle emphasis |
| `/40` | Default border opacity — structural but not heavy |
| `/50` – `/60` | Border on hover; de-emphasised text (e.g. `text-teal-300/60` for secondary romanisation in the sidebar) |
| `/70` – `/80` | Background tint for badges/chips (e.g. `bg-amber-900/30` + `bg-amber-500/20` layered) |
| `/95` + backdrop-blur | Sticky table header (`bg-zinc-950/95 backdrop-blur`) |

**Why `/40` for borders?** A solid `border-slate-700` is visually too heavy on a dark surface — it draws too much attention to the container rather than the content. At `/40` it reads as "structure" without competing with text.

**Why `/60` for the romanisation in the sidebar?** The sidebar row needs to show three things: Hindi (most important), romanisation (secondary), English meaning (quick reference). Reducing romanisation to `/60` creates a natural hierarchy without changing the colour or size.

### Right vs. wrong uses of opacity

```html
<!-- WRONG: solid border is too loud -->
<div class="border border-slate-700">...</div>

<!-- RIGHT: transparent border sits quietly -->
<div class="border border-slate-700/40">...</div>
```

```html
<!-- WRONG: full amber is "shouting" — reserved for the Hindi word itself -->
<button class="bg-amber-400 text-black">Export</button>

<!-- RIGHT: amber formula — tinted, not filled -->
<button class="bg-amber-500/20 text-amber-400 border border-amber-500/30
               hover:bg-amber-500/30 transition-colors">Export</button>
```

```html
<!-- WRONG: teal at full opacity in the sidebar de-emphasises nothing -->
<span class="text-teal-300 text-[11px]">baṛā</span>

<!-- RIGHT: /60 makes it clearly secondary to the amber Hindi word beside it -->
<span class="text-teal-300/60 text-[11px]">baṛā</span>
```

---

## Colour System

### Surfaces

| Role | Tailwind | Hex |
|---|---|---|
| Page / sidebar background | `bg-slate-950` | `#020617` |
| Card surface | `bg-slate-900` | `#0f172a` |
| Input / elevated | `bg-slate-800/60` | ~`rgba(30,41,59, 0.60)` |
| Hover overlay | `bg-slate-800/30` | ~`rgba(30,41,59, 0.30)` |

### Text hierarchy — five steps only

| Role | Class | Notes |
|---|---|---|
| Primary | `text-zinc-100` | Main body text, English meanings |
| Secondary | `text-slate-300` | Explanatory paragraphs, etymology |
| Tertiary | `text-slate-400` | Section labels (open state), secondary info |
| Muted | `text-zinc-500` or `text-slate-600` | Metadata, dates, closed section labels |
| Invisible | `text-zinc-700` | Borders, placeholders, totally recessive text |

Never add a new shade of grey. If you need something between two steps, you are almost certainly solving a layout problem with colour — fix the layout instead.

### Semantic colours

| Colour | Class | Meaning — use ONLY for this |
|---|---|---|
| Amber | `text-amber-400` | The *current* Hindi Devanagari word; active/selected state; primary action |
| Teal | `text-teal-300` | Romanisation (transliteration) |
| Emerald | `text-emerald-400` | Success; online status |
| Red | `text-red-300` / `bg-red-700/70` | Destructive action; error |
| Blue | `text-blue-300/70` | "via" language path, secondary etymology note |
| `text-slate-200` | Etymology ancestor forms | Sanskrit/Persian/Arabic/etc. forms in an etymology chain — **not amber** |

**Prohibition:** Do not apply amber to etymology ancestor nodes, section border accents, or hover decorations. Amber = the current Hindi word only.

### Linguistic highlight colours

Applied automatically by `highlight.ts`. Never apply manually with Tailwind.

| Script | Class | Hex |
|---|---|---|
| Devanagari | `.hl-deva` | `#fcd34d` amber-300 |
| Cyrillic | `.hl-cyrillic` | `#67e8f9` cyan-300 |
| Hebrew | `.hl-hebrew` | `#6ee7b7` emerald-300 |
| Romanised `'quoted'` | `.hl-roman` | `#5eead4` teal-300 |
| Masculine gender | `.hl-masc` | `#93c5fd` blue-300 |
| Feminine gender | `.hl-fem` | `#f9a8d4` pink-300 |
| Language names | `.hl-lang-*` | per-language (see `global.css`) |

### Word category badges

Used in `WordCard.astro` and mirrored in `anki/fields/utils.js`.  
Pattern: `bg-{hue}-900/30 text-{hue}-400 border border-{hue}-700/40`

| Category | Hue |
|---|---|
| adjective | amber |
| noun | violet |
| verb | orange |
| adverb | sky |
| conjunction | emerald |
| preposition / postposition | rose |
| particle | teal |
| pronoun | indigo |
| (default) | `bg-slate-800/60 text-slate-400 border-slate-600/40` |

---

## Typography

### Font roles

| Family | Tailwind | Purpose |
|---|---|---|
| **Poppins** | `font-sans` (default) | Everything the user reads for meaning |
| **Oswald** | `font-title` | Everything that labels or classifies |
| **Tiro Devanagari Hindi** | auto via `[lang="hi"]` | All Devanagari script — never override |
| PT Serif, Frank Ruhl Libre | `.hl-cyrillic`, `.hl-hebrew` | Inline script highlights only |

### Complete typography recipes

Copy these strings exactly — they are the tested combinations.

**App title (sidebar)**
```
font-title text-2xl font-semibold text-zinc-100 leading-tight
```

**Card section toggle label** (closed: slate-400 → open: slate-200)
```
font-title text-xs sm:text-sm font-medium tracking-wider uppercase text-slate-400
  group-open/det:text-slate-200 transition-colors
```

**Sidebar group header**
```
font-title text-[10px] font-semibold uppercase tracking-widest text-zinc-500
```

**Table / export column header**
```
font-title text-[9px] font-semibold uppercase tracking-widest text-zinc-600
```

**Hindi word in card header**
```
word-hindi text-2xl sm:text-3xl font-bold leading-none
```
(`.word-hindi` applies `color: var(--color-hindi)` and the Devanagari font)

**Romanisation in card header**
```
word-roman text-base sm:text-lg leading-none
```
(`.word-roman` applies `color: var(--color-roman)`)

**Romanisation in sidebar row** (de-emphasised)
```
text-teal-300/60 text-[13px] shrink-0
```

**Romanisation in dense sections** (word breakdown, collocations, etymology chain)
```
text-teal-300/70 text-[13px]
```

**Body / explanation paragraph**
```
text-[15px] text-slate-300 leading-relaxed
```

**Italic etymology / logic line**
```
text-[15px] text-slate-400 italic leading-relaxed
```

**Monospace evolution chain**
```
text-[13px] sm:text-[14px] text-teal-300/70 font-mono tracking-wide leading-relaxed
```

**Small meta / date**
```
text-[11px] text-slate-600
```
(This is the absolute minimum — do not go smaller.)

**Helper / hint text** (below inputs, below badges)
```
text-[11px] text-zinc-700
```
(This is the absolute minimum — do not go smaller.)

### Leading (line-height)

| Value | When |
|---|---|
| `leading-none` | Large decorative text (card header Hindi word) |
| `leading-snug` | Compact multi-line headers |
| `leading-tight` | App title |
| `leading-relaxed` | Body paragraphs, explanations |
| `1.6` – `1.7` (inline style) | Anki card body text |

---

## Spacing

Tailwind's 4px grid. Key values:

| Value | px | Use |
|---|---|---|
| `gap-1.5`, `px-1.5` | 6 | Tight inline gaps in sidebar rows |
| `gap-2`, `p-2` | 8 | Icon button padding, badge inner gap |
| `gap-3`, `p-3` | 12 | Section inner gap (mobile), example card gap |
| `px-4 py-3` | 16 / 12 | Card section padding (mobile) |
| `px-5 py-4` | 20 / 16 | Card header |
| `px-6 py-4` | 24 / 16 | Card section padding (desktop) |
| `space-y-3` | 12 | Between items within a section |
| `space-y-5` | 20 | Between word cards |
| `py-8` | 32 | Main content top padding |

**Row spacing floor:** every row in a list or table section must use at least `py-3` (12px). `py-2.5` or smaller is prohibited in list/table rows. Use `space-y-3` on the container and `py-3` per row — never `border-b` on individual rows.

**Rule of thumb:** padding inside a card section = `px-4 sm:px-6` (shrinks on mobile). Gap between sections = let the `divide-y` handle it (no extra margin).

---

## Layout

### App shell

```
┌─ AppSidebar (w-72 xl:w-80, hidden < lg) ─┬─ main (flex-1, min-w-0) ──────────┐
│  logo / title                             │  MobileHeader  (visible < lg)     │
│  search bar                               │  WordsTab / SentencesTab          │
│  words index nav                          │  ExportTab  (flex, full height)   │
│  sentences index nav                      │                                   │
└───────────────────────────────────────────┴───────────────────────────────────┘
                   TabBar  fixed bottom, h-14, z-30, bg-zinc-950
```

- Sidebar: `sticky top-0 h-screen overflow-y-auto`
- Main: `flex-1 min-w-0` — never `overflow-hidden` (breaks sticky children)
- Export tab: `height: calc(100vh - 3.5rem)`, toggled via `style.display` (not Tailwind `.hidden`) because it needs `display:flex`

### Responsive breakpoints

| Breakpoint | What changes |
|---|---|
| `< sm` (< 640px) | Smaller card padding, smaller text steps |
| `≥ sm` (≥ 640px) | Card padding `px-5 py-4`, text steps up one size |
| `< lg` (< 1024px) | Sidebar hidden; MobileHeader shown; full-width content |
| `≥ lg` (≥ 1024px) | Sidebar visible; word meta line shown |

### Content width

| Context | Class |
|---|---|
| Word card column | `max-w-3xl mx-auto lg:mx-0 lg:max-w-2xl xl:max-w-3xl` |
| Sidebar | Fixed `w-72 xl:w-80` |
| Export right panel | Fixed `w-72` |

---

## Components

### Card section (complete template)

This is the complete `.astro` file to copy when adding a new section. Fill in the `YOUR_*` placeholders.

```astro
---
// Responsible for: YOUR_SECTION_NAME expandable section inside a word card
import { highlight } from '../../../utils/highlight';

interface Props {
  yourProp: string[];   // adjust to your data shape
}
const { yourProp } = Astro.props;
---

<details class="group/det">
  <summary class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4
                  cursor-pointer list-none select-none
                  hover:bg-slate-800/30 transition-colors">
    <span class="font-title text-xs sm:text-sm font-medium tracking-wider uppercase
                 text-slate-400 group-open/det:text-slate-200 transition-colors">
      YOUR SECTION NAME
    </span>
    <span class="text-slate-600 group-open/det:rotate-180 transition-transform duration-200 text-xs">▾</span>
  </summary>

  <!--
    Content wrapper.
    Always use plain padding — no colored left-border accents.
    Sections are separated structurally by divide-y on the parent; that is sufficient.
  -->
  <div class="px-4 sm:px-6 pb-4 space-y-3">

    {yourProp.map((item) => (
      <div class="bg-slate-800/40 rounded-xl p-3 sm:p-4 border border-slate-700/30">
        <p class="text-[15px] text-slate-300 leading-relaxed" set:html={highlight(item)} />
      </div>
    ))}

  </div>
</details>
```

**Section accent colours — prohibited.**

Do not add a colored left-border (`border-l-*`) to any card section. This pattern is removed. Sections use `divide-y` on the parent container for visual separation — no per-section accent borders. See the Visual Density & Readability Rules section for the full rationale.

---

### The section divider pattern

Sections inside a card are separated by `divide-y`, not by margins or explicit borders:

```html
<div class="border-t border-slate-700/40 divide-y divide-slate-700/40">
  <PronunciationSection ... />
  <MemorySection ... />
  <ExamplesSection ... />
  <!-- etc. -->
</div>
```

Do not add `mt-*` or `mb-*` to sections. Let `divide-y` handle the gaps.

---

### Buttons

```html
<!-- Primary action -->
<button class="bg-amber-500/20 text-amber-400 border border-amber-500/30
               hover:bg-amber-500/30 rounded-xl py-2.5 px-4 text-sm font-semibold
               transition-colors disabled:opacity-40 disabled:cursor-not-allowed
               disabled:hover:bg-amber-500/20">
  Export to Anki
</button>

<!-- Ghost / secondary -->
<button class="text-zinc-600 hover:text-zinc-300 transition-colors text-xs">
  Download .txt
</button>

<!-- Destructive primary -->
<button class="bg-red-500/20 text-red-400 border border-red-500/30
               hover:bg-red-500/30 rounded-xl py-2.5 px-4 text-sm font-semibold
               transition-colors">
  Delete
</button>

<!-- Small icon button -->
<button class="w-5 h-5 flex items-center justify-center
               text-slate-600 hover:text-slate-300 transition-colors"
        aria-label="Close">✕</button>
```

---

### Inputs

```html
<input type="text"
  class="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg
         px-3 py-2 text-sm text-slate-200 placeholder-zinc-600
         focus:outline-none focus:border-amber-500/50 transition-colors" />
```

- Background: one step above the surface it sits on (`bg-slate-800/60` on a `bg-slate-900` card)
- Focus: amber border at `/50` — visible but not strident
- Never: white/light background, outline ring, solid coloured border

---

### Badges and chips

#### Grammar metadata row (word card header)

All grammar metadata (part of speech, gender, transitivity) must be consolidated into **one flex row** directly beneath the Hindi word. Do not stack badges vertically or show them as three independent pill elements at equal weight.

Show only what is contextually meaningful:
- **POS badge** — always shown
- **Gender badge** — only for nouns and adjectives
- **Transitivity badge** — only for verbs and verb phrases

```html
<!-- RIGHT: single consolidated grammar row -->
<div class="flex items-center gap-2 flex-wrap mt-1">
  <!-- POS badge — always present -->
  <span class="font-title text-xs font-semibold uppercase tracking-wider
               px-2.5 py-1 rounded-lg
               bg-orange-900/30 text-orange-400 border border-orange-700/40">
    verb
  </span>
  <!-- transitivity — only because this is a verb -->
  <span class="font-title text-xs font-semibold uppercase tracking-wider
               px-2.5 py-1 rounded-lg
               bg-slate-800/60 text-slate-400 border border-slate-600/40">
    transitive
  </span>
</div>

<!-- WRONG: three separate stacked/independent badges -->
<div class="flex flex-col gap-1">
  <span class="badge">verb</span>
  <span class="badge">masculine</span>
  <span class="badge">transitive</span>
</div>
```

#### Individual badge (category, any single-purpose label)

```html
<!-- Category badge (rounded-lg) -->
<span class="text-xs font-title font-semibold uppercase tracking-wider
             px-2.5 py-1 rounded-lg
             bg-violet-900/30 text-violet-400 border border-violet-700/40">
  noun
</span>
```

#### Form chip

```html
<!-- Form chip (rounded-full) — use .form-chip + .form-chip-{variant} from global.css -->
<span class="form-chip form-chip-masc">
  <span>masculine</span>
  <span lang="hi">बड़ा</span>
  <span>·</span>
  <span>baṛā</span>
</span>
```

#### Count pill

```html
<!-- Count / number pill -->
<span class="text-xs font-semibold bg-zinc-800 text-zinc-300
             px-2.5 py-0.5 rounded-full">
  42
</span>
```

Corner radius rule: **card = `rounded-2xl`, inner box / input / button = `rounded-xl`, badge = `rounded-lg`, chip = `rounded-full`**.

---

### Feedback messages

```html
<!-- Success -->
<div class="rounded-xl px-4 py-3 text-sm leading-relaxed
            bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
  Done! 12 cards added to "Hindi::Adjectives".
</div>

<!-- Error -->
<div class="rounded-xl px-4 py-3 text-sm leading-relaxed
            bg-red-950/60 border border-red-800/40 text-red-300">
  Error: AnkiConnect not reachable.
</div>
```

Pattern: `bg-{colour}-950/60 border border-{colour}-800/40 text-{colour}-300` — the deep `/960` background with a barely-there border keeps it dark, the text carries the signal.

---

### Empty states

```html
<!-- Inline (inside a panel) -->
<p class="px-4 py-6 text-xs text-zinc-600 text-center">No matches</p>

<!-- Full section empty state -->
<div class="py-20 text-center">
  <p class="text-zinc-600 text-sm">No words match your search.</p>
</div>
```

Empty states are understated — muted text, centred, no illustration, no icon.

---

### Sidebar group header

```html
<div class="flex items-center gap-1.5 px-2 pt-3 pb-1">
  <!-- collapse arrow -->
  <button class="collapse-btn shrink-0" aria-label="Collapse group">
    <span class="chevron">▾</span>
  </button>
  <!-- group title -->
  <button class="date-group-toggle flex-1 text-left min-w-0">
    <span class="group-hdr-label font-title text-[10px] font-semibold
                 uppercase tracking-widest text-zinc-500 transition-colors">
      Adjectives — Batch 1
    </span>
    <span class="text-[10px] text-zinc-700 ml-1.5">12</span>
  </button>
  <!-- group checkbox -->
  <button class="idx-checkbox group-checkbox shrink-0"
          aria-label="Select all in group"></button>
</div>
```

---

## Interaction Patterns

### How to write hover states

Every clickable element needs a hover state. Use these three patterns depending on element type:

**Surface / row (background appears on hover)**
```html
class="... hover:bg-slate-800/30 transition-colors"
```

**Text / icon (text lightens on hover)**
```html
class="text-slate-600 hover:text-slate-300 transition-colors"
<!-- or for something already mid-brightness -->
class="text-slate-400 hover:text-zinc-100 transition-colors"
```

**Bordered element (border intensifies on hover)**
```html
class="border border-slate-700/40 hover:border-slate-600/60 transition-colors"
```

All transitions: `transition-colors` for colour-only changes. `transition-all` only when transform also changes (e.g. chevron rotate + colour).

### Expand / collapse

**Inside cards** — use `<details>` with Tailwind's `group-open/det:` variant:
```html
<span class="text-slate-400 group-open/det:text-slate-200 transition-colors">Label</span>
<span class="group-open/det:rotate-180 transition-transform duration-200">▾</span>
```

**Sidebar groups / the card itself** — toggled by JS adding/removing a CSS class (`is-collapsed`, `collapsed`). Controlled in `ui/indexSidebar.js` and `ui/cards.js`.

Use `<details>` for everything inside cards. Use the JS class-toggle only when the state must be controlled programmatically.

### Active tab (tab bar)

Active: `text-amber-400 border-t-2 border-amber-400 -mt-px`  
Inactive: `text-zinc-500 border-t-2 border-transparent hover:text-zinc-300`

The `-mt-px` on the active tab pulls it 1px upward so the top border overlaps the tab bar's top border, creating a visual "lift".

### Focus states

All interactive elements must have a visible focus style for keyboard navigation. The app does not use the browser's default `outline` because it appears inconsistent on dark surfaces. Instead:

```html
<!-- Input focus — amber border replaces default ring -->
class="focus:outline-none focus:border-amber-500/50 transition-colors"

<!-- Button focus — amber ring, no offset (sits on dark bg) -->
class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"

<!-- Ghost text button focus — text brightens (same as hover) -->
class="focus-visible:text-zinc-100 focus-visible:outline-none"
```

Use `focus-visible:` not `focus:` on buttons — this keeps the ring hidden during mouse interaction and visible during keyboard navigation only.

**Never remove focus styling without providing an alternative.** A keyboard user who cannot see where focus is located cannot use the app.

### Loading and status states

The AnkiConnect status indicator is the primary pattern for async states.

**Three states — use these exact text and colour patterns:**

```html
<!-- Checking (initial / polling) -->
<span class="text-sm font-semibold text-zinc-500">● Checking…</span>

<!-- Online -->
<span class="text-sm font-semibold text-emerald-400">● Connected</span>

<!-- Offline / error -->
<span class="text-sm font-semibold text-red-400">● Not reachable</span>
```

The bullet `●` is a semantic status indicator — its colour is the signal. The text is always the same size and weight; only the colour changes. This keeps the panel layout stable; no elements jump or shift during state transitions.

**When a primary action is blocked by an unmet prerequisite** (e.g. Export requires AnkiConnect online and at least one word selected), disable the button with `disabled:opacity-40 disabled:cursor-not-allowed`. Do not show an error on press; make the reason visible in the UI before the user tries.

### Inline validation

Input validation should be lazy — validate after the user leaves the field (`blur`), not on every keystroke. When an error occurs, add the error below the input in the feedback message pattern, sized to helper text:

```html
<!-- Input with validation error -->
<input class="... border-red-500/50 focus:border-red-500/60" />
<p class="text-[11px] text-red-400 mt-1">Deck name cannot be empty.</p>
```

Border shifts from `border-slate-700/60` to `border-red-500/50` — the colour communicates the state without adding an icon or extra layout.

For an empty search input: silently clear the filter and return to the full word list. Do not show a validation error for an empty search — it is not an error state.

---

## Anki Card Design

This section documents the visual design of exported Anki cards. The CSS lives in `src/scripts/anki/noteType.js` as the `ANKI_CSS` constant. Section HTML is built by the field builders in `src/scripts/anki/fields/`. Understanding both together is required to work on Anki card appearance.

### Design intent

Anki cards are a projection of the website into Anki's rendering environment. The surface layering, amber/teal language, and Oswald label system must all read consistently across both surfaces. A user switching between the web app and Anki should feel the same visual grammar. The cards are not a simplified version of the site — they render the same information density, but restructured for a flashcard study session (front = prompt; back = full information).

### The card container

```
.card        background: #0f172a  (slate-900 — same as website card surface)
             font-family: Poppins
             font-size: 16px; line-height: 1.6

.card-wrap   max-width: 680px; margin: 0 auto
             padding: clamp(1rem, 5vw, 2rem) — fluid, adapts to phone/desktop
```

The `max-width: 680px` is intentional. Anki can display cards in very wide windows on desktop; capping width maintains the readable line measure and keeps the centered-card layout coherent.

### Front card — the prompt face

```
.front-face  display: flex; flex-direction: column; align-items: center;
             justify-content: center; min-height: 240px; text-align: center;
             padding: 3rem 2rem
```

The front card shows only two things: the English meaning and (optionally) the category badge. This is deliberate minimal disclosure — the user must recall the Hindi word before seeing it. No romanisation, no form chips, no etymology on the front.

```
.meaning     font-size: 1.55rem; font-weight: 500; color: #e2e8f0;
             line-height: 1.3
```

The English meaning is set at `1.55rem` — large enough to read comfortably in the Anki reviewer without being so large it wraps. This is the only content on the front face, so it can afford to be prominent.

**Front card template (Mustache):**
```
{{English}}
{{#Category}}<div class="chips">{{Category}}</div>{{/Category}}
```

### Back card — the answer face

The back card is structured in three zones:

1. **Answer header** — centered, above the fold, always visible
2. **Section boxes** — the detailed content, scrollable
3. (No footer — date metadata is on the website only, not Anki cards)

**Answer header:**
```
.answer-header   border-bottom: 1px solid rgba(148,163,184,.15)
                 padding-bottom: 1.5rem; margin-bottom: 1.75rem; text-align: center

.hindi           font-family: Tiro Devanagari Hindi; font-size: 3.5rem;
                 color: #fbbf24; line-height: 1.2      (amber — same as website)

.roman           font-size: 1.2rem; color: #5eead4                    (teal — same as website)

.meaning-reveal  font-size: .95rem; color: #94a3b8     (recessive — answer was on the front)
```

The hierarchy in the header is: Hindi word first (largest, amber), romanisation second (teal), English third (muted). This mirrors the website card header's visual priority exactly.

**Back card template (Mustache):**
```
{{Hindi}}  {{Romanisation}}  {{English}}  {{#Category}}...{{/Category}}
{{#Forms}}...{{/Forms}}
{{#Pronunciation}}...{{/Pronunciation}}
{{#Memory}}...{{/Memory}}
{{#Examples}}...{{/Examples}}
{{#RootOrigin}}...{{/RootOrigin}}
{{#SoundAlikes}}...{{/SoundAlikes}}
{{#UrduPunjabi}}...{{/UrduPunjabi}}
{{#CrossLanguage}}...{{/CrossLanguage}}
```

Fields are rendered conditionally. An empty field produces no HTML — no empty boxes appear on the card.

### The section box pattern (`field-sec`)

Every content section on the back card uses the same `.field-sec` container with a coloured top border. The top border colour is the only visual differentiator between sections.

```css
.field-sec {
  border-top: 3px solid #334155;   /* default — overridden per section via inline style */
  padding: 1rem 1.2rem 1.2rem;
  margin-bottom: 1.25rem;
  background: #1e293b;             /* slate-800 — one level above the card surface */
  border-radius: 12px;
}

.field-label {
  font-family: "Oswald", sans-serif;
  font-size: .6rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: .18em;
  margin: 0 0 .85rem 0; display: block;
  /* colour: set by inline style to match border */
}
```

The `background: #1e293b` is the `slate-800` level — the same as `bg-slate-800/60` on the website's inner boxes. This maintains the three-level surface stack inside the Anki card.

**Section top-border and label colours — use exactly these hex values:**

| Section | Accent hex | CSS class / builder |
|---|---|---|
| Pronunciation | `#14b8a6` (teal-500) | `pronunciation.js` |
| Memory Hook | `#8b5cf6` (violet-500) | `memory.js` |
| Examples | `#3b82f6` (blue-500) | `examples.js` |
| Roots & Origin | `#2563eb` (blue-600) | `rootOrigin.js` |
| Sound Alikes | `#e11d48` (rose-600) | `soundAlikes.js` |
| Urdu & Punjabi | `#f97316` (orange-500) | `urduPunjabi.js` |
| Cross-Language | varies by `langHex()` | `crossLang.js` |

These colours were chosen to roughly mirror the website section accent scheme. They must not be swapped between sections. The colour is applied as an inline style by the `aSection()` helper in `utils.js`:

```js
// utils.js
export const aSection = (labelText, content, color) =>
  `<div class="field-sec" style="border-top-color:${color};">` +
  `<p class="field-label" style="color:${color};">${labelText}</p>` +
  content + `</div>`;
```

### Inner card pattern (`ex-card`, `clang-item`)

Content items inside section boxes (example sentences, cross-language entries, sound-alikes, Urdu/Punjabi) use a darker nested box. This is the Anki equivalent of `bg-slate-800/40 rounded-xl` on the website — a third surface level inside the section box.

```css
.ex-card, .clang-item {
  background: #0f172a;              /* slate-900 — back to the card-surface level */
  border: 1px solid rgba(51,65,85,.55);
  border-radius: 10px;
  padding: .9rem 1rem;
  margin-bottom: .7rem;
  text-align: center;
}
```

Note that the inner card goes *back down* to `#0f172a` (slate-900), creating a sandwich:
```
card background     #0f172a  slate-900
  field-sec         #1e293b  slate-800   ← one level up
    ex-card         #0f172a  slate-900   ← back down, nestled inside
```

This mirrors the website's inner card (`bg-slate-800/40` on a `bg-slate-900` card), adapted for Anki's inline CSS constraint. The alternating depth is intentional — it creates clear visual separation between items without needing borders that are too heavy.

**Example card anatomy (`ex-card`):**

```
.ex-header      flex column, centered — contains register badge (above) and Hindi sentence
.ex-hindi       font: Tiro Devanagari Hindi; size: 1.15rem; color: #fbbf24 (amber)
.reg            Oswald badge, uppercase, color: #64748b — register label (formal / informal)
romanisation    size: .8rem; color: #5eead4 (teal); italic
english         size: .88rem; color: #cbd5e1
literal         size: .75rem; color: #475569; italic — literal gloss, if present
note            size: .8rem; color: #64748b — usage note, separated by a hairline border
```

**Cross-language / Sound Alikes / Urdu-Punjabi item anatomy (`clang-item`):**

```
.lang-label     Oswald, .63rem, uppercase, tracking, coloured by langHex()
.word-row       flex, centered — contains script word + romanisation
.word-text      Tiro Devanagari Hindi, 1.1rem, color: #fbbf24 (amber)
.word-rom       .83rem, color: #5eead4 (teal)
.mean-box       dark pill (#080d18) — inline English gloss
.item-note      .85rem, color: #cbd5e1 — contextual note
```

### Typography scale for Anki cards

Anki cards use a parallel but slightly compressed type scale compared to the website. The same three fonts are used; the sizing differs because cards are a focused single-item view rather than a scrolling list.

| Element | Size | Weight | Colour |
|---|---|---|---|
| Hindi answer (header) | `3.5rem` | — | `#fbbf24` amber |
| Front-face English | `1.55rem` | 500 | `#e2e8f0` |
| Romanisation (header) | `1.2rem` | — | `#5eead4` teal |
| Section label (`.field-label`) | `.6rem` | 700 | matches section accent |
| Syllable string (pronunciation) | `1.1rem` | 600 | `#5eead4` teal |
| Syllable label (`.syl-label`) | `.88rem` | 600 | `#f1f5f9` near-white |
| Body text (description, notes) | `.85rem`–`.9rem` | — | `#cbd5e1`–`#e2e8f0` |
| Italic / secondary | `.82rem` | — | `#64748b` muted |
| Inner card Hindi sentence | `1.15rem` | — | `#fbbf24` amber |
| Inner card romanisation | `.8rem` | — | `#5eead4` teal |
| Register / meta badge | `.58rem` | 700 | `#64748b` |

All Oswald usage in Anki cards (`.field-label`, `.reg`, `.lang-label`, `.meta-badge`) follows the same uppercase + letter-spacing rule as the website. The font is loaded from Google Fonts via the `@import` at the top of `ANKI_CSS`.

### Mobile considerations for Anki cards

The mobile media query targets `max-width: 520px` (Anki mobile reviewer on phone):

```css
@media (max-width: 520px) {
  .card-wrap   { padding: .9rem .9rem 2.5rem; }
  .front-face  { padding: 1.75rem 1rem; min-height: 150px; }
  .hindi       { font-size: 2.4rem; }      /* down from 3.5rem */
  .meaning     { font-size: 1.2rem; }      /* down from 1.55rem */
  .roman       { font-size: 1rem; }        /* down from 1.2rem */
  .field-sec   { padding: .85rem .95rem 1rem; }
}
```

The `clamp(1rem, 5vw, 2rem)` on `.card-wrap` padding is intentional — it scales fluidly between mobile and desktop without a hard breakpoint for the container itself. The `@media` breakpoint is reserved for the elements that need discrete size changes (the Hindi heading, etc.).

When modifying Anki card styles, test at:
- Desktop Anki (large window, > 680px — card centres at `max-width`)
- Desktop Anki (narrow — ~520–680px)
- Mobile Anki (< 520px — `@media` query kicks in)

### Visual consistency between website and Anki cards

The following mappings must be maintained identically across both surfaces:

| Concept | Website | Anki card |
|---|---|---|
| Hindi text colour | `text-amber-400` (`#fbbf24`) | `.hindi { color: #fbbf24 }` |
| Romanisation colour | `word-roman` → `#5eead4` | `.roman { color: #5eead4 }` |
| Card background | `bg-slate-900` (`#0f172a`) | `.card { background: #0f172a }` |
| Inner box background | `bg-slate-800/40` | `.field-sec { background: #1e293b }` |
| Section label font | `font-title uppercase` (Oswald) | `.field-label { font-family: Oswald }` |
| Category badge colours | `ankiCategoryStyle()` in `fields/utils.js` | mirrors `categoryStyle()` in `cardHelpers.ts` |
| Form chip colours | `ankiChipStyle()` in `fields/utils.js` | mirrors `chipClass()` in `cardHelpers.ts` |
| Language accent colours | `langColor()` in `cardHelpers.ts` | `langHex()` in `fields/utils.js` |

When adding a new visual element to the website, check whether it also appears in Anki cards. If it does, update both `cardHelpers.ts` / the Astro component **and** the relevant `fields/*.js` builder to keep the mapping current.

---

## Right vs. Wrong — Side by Side

### Surface depth

```html
<!-- WRONG: inventing a fourth level, too light -->
<div class="bg-slate-700 rounded-xl p-4">...</div>

<!-- RIGHT: inner content stays within the three-level system -->
<div class="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">...</div>
```

### Label text

```html
<!-- WRONG: Poppins label, no uppercase, wrong tracking -->
<p class="text-xs font-semibold text-slate-400">Section Name</p>

<!-- RIGHT: Oswald, uppercase, correct tracking -->
<span class="font-title text-xs font-medium tracking-wider uppercase text-slate-400">
  Section Name
</span>
```

### Body text

```html
<!-- WRONG: zinc-400 is too muted for a main body paragraph -->
<p class="text-sm text-zinc-400">Sanskrit gave this word to Hindi...</p>

<!-- RIGHT: slate-300 for explanatory copy -->
<p class="text-[15px] text-slate-300 leading-relaxed">Sanskrit gave this word...</p>
```

### Primary button

```html
<!-- WRONG: solid fill — only the Hindi word itself should be solid amber -->
<button class="bg-amber-400 text-black rounded px-4 py-2">Export</button>

<!-- RIGHT: tinted amber, follows the opacity formula -->
<button class="bg-amber-500/20 text-amber-400 border border-amber-500/30
               hover:bg-amber-500/30 rounded-xl py-2.5 px-4 text-sm font-semibold
               transition-colors">Export</button>
```

### Inner card

```html
<!-- WRONG: adding a background that's lighter than the card — breaks the layer order -->
<div class="bg-zinc-700 rounded-xl p-4 border border-zinc-600">...</div>

<!-- RIGHT: darker, with subtle transparency border -->
<div class="bg-slate-800/40 rounded-xl p-3 sm:p-4 border border-slate-700/30">...</div>
```

### Section separator

```html
<!-- WRONG: using margin + visible border as a spacer -->
<div class="mt-4 border-t border-slate-600">...</div>

<!-- RIGHT: let divide-y on the parent handle it; no extra elements needed -->
<!-- (set divide-y divide-slate-700/40 on the parent container once) -->
```

### Feedback banner

```html
<!-- WRONG: bold solid background draws too much attention -->
<div class="bg-green-500 text-white rounded p-3">Done!</div>

<!-- RIGHT: deep tinted background keeps it dark; text carries the signal -->
<div class="bg-emerald-950/60 border border-emerald-800/40 text-emerald-300
            rounded-xl px-4 py-3 text-sm leading-relaxed">Done!</div>
```

### Focus state

```html
<!-- WRONG: relying on browser default outline (inconsistent on dark bg, or removed entirely) -->
<button class="focus:outline-none">...</button>

<!-- RIGHT: explicit amber ring on keyboard focus only -->
<button class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50">
  ...
</button>
```

---

## Self-Review Checklist

Before marking any UI work as done, go through this list:

### UX and information hierarchy
- [ ] Can a first-time user understand what this component is for without reading any documentation?
- [ ] Is secondary information hidden behind progressive disclosure (details/expand) rather than shown by default?
- [ ] Does the most important information appear first — spatially and typographically?
- [ ] Is every disabled or blocked state explained visually in the UI before the user tries to act?
- [ ] Does the component handle its empty state gracefully, and does the empty state tell the user what to do next?

### Colour and surface
- [ ] Does every new background use only `slate-950`, `slate-900`, or `slate-800/N`?
- [ ] Is amber used *only* for the current Hindi word, active states, and primary actions? (Not etymology ancestors, not section borders)
- [ ] Is teal used *only* for romanisation?
- [ ] Are borders `border-slate-700/40` (not `/30` and not solid)?
- [ ] Do de-emphasised elements use `/60` or similar — never a new colour?
- [ ] Do etymology chain ancestor forms use `text-slate-200` (not amber)?

### Typography
- [ ] Are all labels and headings `font-title uppercase`?
- [ ] Is all body copy Poppins (`font-sans`, the default)?
- [ ] Does every Devanagari element have `lang="hi"` (which auto-applies the correct font)?
- [ ] Does any text field go through `highlight()` via `set:html` to get script colouring?
- [ ] Does any text go below `text-[11px]`? If yes, fix it — `text-[11px]` is the absolute floor.
- [ ] Is romanisation in any dense section or sidebar row at least `text-[13px]`?

### Spacing and density
- [ ] Do list/table section rows use at least `py-3` per row?
- [ ] Does any list section use `border-b` on individual rows? If yes, replace with `space-y-3` on the container.
- [ ] Does any card section have a colored `border-l-*` accent? If yes, remove it.

### Grammar badges
- [ ] Are grammar metadata badges (POS, gender, transitivity) consolidated into a single flex row?
- [ ] Is transitivity shown only for verbs/verb phrases?
- [ ] Is gender shown only for nouns/adjectives?

### Interactions and accessibility
- [ ] Does every clickable element have a `hover:` state?
- [ ] Does every focusable element have a `focus-visible:` state that provides a visible indicator?
- [ ] Are all icon-only buttons labelled with `aria-label`?
- [ ] Do transitions use `transition-colors`, not `transition` alone?
- [ ] Are transitions ≤ 200ms?
- [ ] Is the amber top-border pattern used for the active state if this is a tab-like control?
- [ ] Is keyboard navigation tested — can you tab through all interactive elements in logical order?

### Structure
- [ ] Are sections separated by `divide-y divide-slate-700/40` on the parent — no extra margin elements?
- [ ] Does the section label follow the complete `font-title text-xs sm:text-sm font-medium tracking-wider uppercase` recipe?
- [ ] Does an expandable section use `<details class="group/det">` with the rotating `▾` chevron?

### Responsive
- [ ] Does padding step up from `px-4 py-3` → `sm:px-6 sm:py-4`?
- [ ] Does text step up at `sm:` where appropriate (e.g. `text-xs sm:text-sm`)?
- [ ] Is anything clipping or overflowing at 375px width?
- [ ] Does the component work correctly without the sidebar (< 1024px)?

### Anki card consistency (if touching Anki output)
- [ ] Does any new colour added to the website also appear in Anki? If so, is it updated in both `cardHelpers.ts` and `fields/utils.js`?
- [ ] Is any new section added to the website also exported via a new `fields/*.js` builder?
- [ ] Is the new section's top-border colour added to the section colour table in this document?
- [ ] Has the Anki card been tested at mobile width (< 520px)?

### Content and tone
- [ ] Is the component necessary, or could the information live somewhere that already exists?
- [ ] Is the empty state handled gracefully (muted centred text, no illustration)?
- [ ] Are `aria-label` attributes present on all icon-only buttons?

---

## What NOT to do

Quick list of the most common mistakes:

- **Solid amber fills** — `bg-amber-400` belongs only on the checkbox checkmark. Everything else uses the amber opacity formula.
- **New shades of grey** — there are exactly five text steps. Do not invent `text-slate-500`, `text-zinc-400`, or anything not in the table.
- **Light backgrounds** — never `bg-white`, `bg-gray-100`, or anything lighter than `slate-800`.
- **Shadows for depth** — depth comes from surface layering, not `shadow-*`. The tooltip is the only shadow in the app.
- **Gradients** — none. Semi-transparent flat colours only.
- **`transition` without a property** — use `transition-colors` or `transition-all` explicitly.
- **Poppins for labels** — all structural text (labels, headings, column headers) uses Oswald (`font-title`).
- **`rounded-3xl` or larger** — max corner radius is `rounded-2xl` (16px) on the outermost card.
- **New accent colours without a semantic reason** — each colour means something. Adding a colour means adding a meaning.
- **Decorative icons** — icons appear only in the tab bar and the collapse button. Not for decoration.
- **`focus:outline-none` with no replacement** — never remove focus visibility without providing an alternative focus indicator.
- **Mismatched Anki/website colour values** — the two surfaces share a colour contract. Update both or update neither.

---

## Design Improvement Suggestions

*The following are design recommendations that have not yet been implemented. They are suggestions for the team to discuss and prioritise — not mandates. Each is grounded in a specific UX observation.*

---

### 1. Make the sidebar checkbox affordance clearer

**Observation:** The sidebar checkboxes that control word selection are a custom control (`.idx-checkbox`). New users may not recognise them as checkboxes, especially in their unselected state (where they may appear as a faint circle or dot). The "select all in group" checkbox compound interaction (drag to multi-select) is powerful but entirely undiscoverable.

**Suggestion:** Add a tooltip on first load or a one-time inline hint below the first group: `"Click to select / deselect · Drag to select a range"`. Use the existing helper text style (`text-[11px] text-zinc-700`) so it is visually recessive but readable. Alternatively, add a `title` attribute to each checkbox button so it appears on hover in desktop browsers. If the checkboxes have a clear checked / unchecked visual state (fill vs. outline), no text hint may be needed — confirm the visual distinction is obvious at a glance.

---

### 2. Improve the export flow's empty state

**Observation:** If the user navigates to the Export tab with zero words selected (or after clearing a search that hides all words), they see an empty table and a disabled Export button. The reason for the empty state is not explained. The user must figure out they need to go back to the Words tab and select words.

**Suggestion:** When the export word count is 0, show a contextual message inside the table area:

```html
<div class="py-16 text-center">
  <p class="text-zinc-500 text-sm">No words selected.</p>
  <p class="text-zinc-700 text-xs mt-1">
    Go to <span class="text-zinc-500">Words</span> and check the words you want to export.
  </p>
</div>
```

This directs the user without requiring documentation. The tab name ("Words") mirrors the tab bar label they need to click.

---

### 3. AnkiConnect "not reachable" should offer a next step

**Observation:** The "● Not reachable" status message tells the user Anki is offline but gives no guidance on what to do. A user unfamiliar with AnkiConnect will be stuck.

**Suggestion:** Below the status, show a recessive hint when the status is offline:

```html
<p class="text-[11px] text-zinc-700 mt-1.5">
  Open Anki and ensure the AnkiConnect add-on is installed.
  <a href="https://ankiweb.net/shared/info/2055492159"
     class="text-zinc-600 hover:text-zinc-400 underline transition-colors"
     target="_blank" rel="noopener">
    Get AnkiConnect
  </a>
</p>
```

This turns a dead end into a recovery path. The link uses the ghost text style — present but not competing with the primary UI.

---

### 4. Word card collapsed state could communicate more

**Observation:** Cards are collapsed by default (`is-collapsed`), showing only the header row: Hindi word, romanisation, primary meaning, category badge, origin badge, and a deselect button. This is a good default. However, there is no visual indicator that a card *has* expandable sections — a user who doesn't know to click the header may never discover the etymology or examples.

**Suggestion:** Consider one of:
- A faint downward chevron `▾` on the right of the collapsed card header (using the same `text-slate-700` colour as the section chevrons, so it is recessive but present).
- A count badge showing the number of populated sections: e.g. `5 sections` in `text-zinc-700 text-[10px]`. This doubles as a progress indicator for data density.

The card header already has `cursor-pointer` — the click target is correct. The issue is affordance: nothing signals that clicking will expand.

---

### 5. Search empty state should invite action

**Observation:** When a search query returns no results, the current empty state is: `"No words match your search."` — muted, centred, correct. But it doesn't help the user recover.

**Suggestion:** Add a secondary line below the message:

```html
<div class="py-20 text-center">
  <p class="text-zinc-600 text-sm">No words match your search.</p>
  <button id="search-clear-hint"
          class="text-zinc-700 hover:text-zinc-400 text-xs mt-2 transition-colors underline">
    Clear search
  </button>
</div>
```

This gives users a one-click recovery. It uses the ghost text pattern so it is visually quiet. Wire it to the same clear-search logic used by the existing `×` button in the search input.

---

### 6. Transition the word card expand to a smooth animation

**Observation:** Card expansion is currently instantaneous (class toggle, no animation). On a page with many cards, a sudden height change can be visually jarring and cause scroll context loss.

**Suggestion:** Add a CSS height transition to `.card-expandable`. The tricky part is animating from `height: 0` to `height: auto` — use the `grid` trick:

```css
.card-expandable {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease;
  overflow: hidden;
}
.card-expandable > * {
  min-height: 0;
}
.is-expanded .card-expandable {
  grid-template-rows: 1fr;
}
```

This animates the reveal at 200ms — consistent with the `transition-transform duration-200` used on the `▾` chevrons. Keep the duration at 200ms maximum. Do not animate on page load (the cards are rendered collapsed — no animation should fire on initial paint).

---

### 7. Mobile tab bar: consider a label for the active tab

**Observation:** The tab bar shows three icon-labelled tabs (Words, Sentences, Export). On mobile, the labels are visible, which is correct. The active state uses the amber top-border and text colour — this is clear. However, switching from Words to Export is a significant context change (from reading to exporting) and the only affordance is a colour change.

**Suggestion:** This is a minor enhancement, not a structural change. The current implementation is functional. If the team wants to make the context switch more explicit, consider a brief tab label animation on switch — but given Principle 5 (Restraint over novelty), this may add friction rather than clarity. Leave as-is unless user testing reveals genuine confusion between tabs.

---

### 8. Sentences tab is an unimplemented placeholder

**Observation:** `SentenceCard.astro` and the Sentences tab currently show an empty state / placeholder. When the Sentences feature is implemented, it will need a visual design that parallels the Words tab.

**Suggestion:** Before implementing, establish: (a) what is the primary unit of a sentence card — should it mirror the word card structure, or be a simpler two-sided format? (b) does the sidebar need a parallel sentences index with the same group/checkbox model? (c) should sentence examples that reference known vocabulary words show `.vocab-hint` tooltips (the tooltip system already supports this)? Design these decisions before writing any HTML to avoid a retrofit.
