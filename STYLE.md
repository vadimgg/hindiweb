# Style Guide

How to build new UI that looks and feels like it belongs here.  
Read the **Core Patterns** section first — everything else derives from those three ideas.

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
| Group header | `font-title text-[10px] font-semibold uppercase tracking-widest text-zinc-500` | Sidebar group titles, export panel field labels |
| Column header | `font-title text-[9px] font-semibold uppercase tracking-widest text-zinc-600` | Table column headers |
| Tiny meta label | `font-title text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-600` | "Study companion" subheading, export section names |

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
| Amber | `text-amber-400` | Hindi Devanagari word; active/selected state; primary action |
| Teal | `text-teal-300` | Romanisation (transliteration) |
| Emerald | `text-emerald-400` | Success; online status |
| Red | `text-red-300` / `bg-red-700/70` | Destructive action; error |
| Blue | `text-blue-300/70` | "via" language path, secondary etymology note |
| Violet / sky / orange / rose… | section accent colours | Each card section has one — see section table |

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
text-teal-300/60 text-[11px] shrink-0
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

**Helper / hint text** (below inputs, below badges)
```
text-[11px] text-zinc-700
```

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
    For sections with a strong narrative accent, add a left border:
    <div class="border-l-2 border-YOUR_ACCENT/40 ml-4 sm:ml-6 mb-4 px-4 sm:px-5 py-3 sm:py-4 space-y-3">
    For simple list sections, just use padding:
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

**Section accent colours (pick one that isn't already taken):**

| Section | Accent |
|---|---|
| Root & Origin | `border-blue-500/40` |
| Etymology Story | `border-amber-500/50` |
| Memory Hook | `border-violet-500/40` |
| Examples | `border-blue-500/30` |
| Pronunciation | `border-teal-500/40` |
| Sound Alikes | `border-rose-500/40` |
| Urdu & Punjabi | `border-orange-500/40` |
| Cross-Language | `border-sky-500/40` |

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

```html
<!-- Category badge (rounded-lg) -->
<span class="text-xs font-title font-semibold uppercase tracking-wider
             px-2.5 py-1 rounded-lg
             bg-violet-900/30 text-violet-400 border border-violet-700/40">
  noun
</span>

<!-- Form chip (rounded-full) — use .form-chip + .form-chip-{variant} from global.css -->
<span class="form-chip form-chip-masc">
  <span>masculine</span>
  <span lang="hi">बड़ा</span>
  <span>·</span>
  <span>baṛā</span>
</span>

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

---

## Self-Review Checklist

Before marking any UI work as done, go through this list:

### Colour and surface
- [ ] Does every new background use only `slate-950`, `slate-900`, or `slate-800/N`?
- [ ] Is amber used *only* for the Hindi word, active states, and primary actions?
- [ ] Is teal used *only* for romanisation?
- [ ] Are borders `border-slate-700/40` (not `/30` and not solid)?
- [ ] Do de-emphasised elements use `/60` or similar — never a new colour?

### Typography
- [ ] Are all labels and headings `font-title uppercase`?
- [ ] Is all body copy Poppins (`font-sans`, the default)?
- [ ] Does every Devanagari element have `lang="hi"` (which auto-applies the correct font)?
- [ ] Does any text field go through `highlight()` via `set:html` to get script colouring?

### Interactions
- [ ] Does every clickable element have a `hover:` state?
- [ ] Do transitions use `transition-colors`, not `transition` alone?
- [ ] Are transitions ≤ 200ms?
- [ ] Is the amber top-border pattern used for the active state if this is a tab-like control?

### Structure
- [ ] Are sections separated by `divide-y divide-slate-700/40` on the parent — no extra margin elements?
- [ ] Does the section label follow the complete `font-title text-xs sm:text-sm font-medium tracking-wider uppercase` recipe?
- [ ] Does an expandable section use `<details class="group/det">` with the rotating `▾` chevron?

### Responsive
- [ ] Does padding step up from `px-4 py-3` → `sm:px-6 sm:py-4`?
- [ ] Does text step up at `sm:` where appropriate (e.g. `text-xs sm:text-sm`)?
- [ ] Is anything clipping or overflowing at 375px width?
- [ ] Does the component work correctly without the sidebar (< 1024px)?

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
