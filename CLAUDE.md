# HindiWeb — Claude Code Instructions

## Project in one sentence
Dark-mode Hindi vocabulary study app: browse word cards with etymology/pronunciation/examples, select words, export to Anki. Static site (Astro + Tailwind + vanilla JS).

## Commands
```sh
npm run dev       # dev server → localhost:4321
npm run build     # verify the build compiles clean — run after every implementation
npm run arch      # regenerate ARCHITECTURE.md — run after any JS/TS/Astro change
npm run changelog # aggregate changelog/ entries into CHANGELOG.md
```

---

## Session startup — do this first

1. Read **`BACKLOG.md`** — "Next Up" section tells you what to work on.
2. Read **`ARCHITECTURE.md`** — orientation for the full codebase (auto-generated, always current).
3. Check `specs/active/` — any in-progress design specs the last session left open.
4. Read `CODE.md` before writing code. Read `STYLE.md` before touching UI.

**Do NOT re-read all source files.** Use ARCHITECTURE.md as the index, then read only what the task requires.

---

## Living documents

| File | What it contains | When to read |
|---|---|---|
| `BACKLOG.md` | Pending improvements, prioritised by role | Every session start |
| `ARCHITECTURE.md` | Auto-generated: every file, its responsibility, exports, imports | Start of any coding session |
| `CODE.md` | Naming, SRP, DIP, JSDoc, function size, module boundaries | Before writing any code |
| `STYLE.md` | Tailwind recipes, colour system, components, Anki card design | Before touching any UI |
| `README.md` | Vocab JSON format, AnkiConnect setup, export workflow | When working on data or Anki |
| `specs/active/` | Design specs currently being implemented | When the task involves a spec |
| `specs/archive/` | Implemented specs — reference only, do not act on them | If you need historical context |

---

## Team workflow

You (Claude) are the **PM**. Two specialist agents do the work:

### UI/UX Designer
- Owns `STYLE.md` and `specs/active/*.md`
- Reviews designs, identifies UX gaps, writes specs
- Does **not** write code
- Output: a spec file in `specs/active/`

### Technical Lead
- Owns all source code changes
- Follows `CODE.md` and `STYLE.md` / active specs exactly
- Runs `npm run build && npm run arch` as final step — must be clean before done
- Appends improvement suggestions to their output

### Handoff flow
```
User request
  → if UI/design → spawn UI/UX Designer → spec lands in specs/active/
  → PM reviews spec → spawn Tech Lead to implement
  → Tech Lead confirms build clean → PM moves spec to specs/archive/
  → if pure code fix → spawn Tech Lead directly
```

### When to use agents vs inline
- **Use agents:** multi-file changes, full audits, document rewrites, anything > ~5 file edits
- **Do inline:** single-file edits, quick lookups, running commands, answering questions

### Parallel agents
Spawn agents in parallel when their file scopes don't overlap.  
Always include an explicit **"do NOT touch"** list in each prompt when running in parallel.

---

## Agent briefing template

Use this structure for every agent prompt — it keeps prompts short and prevents token waste:

```
Role: [UI/UX Designer | Technical Lead]
Scope: [what you own]
Do NOT touch: [explicit list of files/dirs for parallel safety]

Read first (file paths only — use Read tool):
- path/to/file1
- path/to/file2

Tasks:
1. ...
2. ...

Verify:
- npm run build (Tech Lead only)
- npm run arch (Tech Lead only)

Output:
- [what to report back — changes made, files touched]
- [Improvement suggestions: 3–5 items in your domain]
```

**Do not paste file contents into prompts.** Give paths and let the agent read.

---

## Architecture quick reference

```
src/scripts/
  anki/         ← Anki export pipeline (connect, export, noteType, fields/)
  state/        ← App state: selection.js, tabs.js
  ui/           ← DOM handlers: cards, exportPane, indexSidebar, search, tooltip
  utils/        ← Pure shared utilities (no DOM, no events)
  data.js       ← Read-only accessors for window.__APP_DATA__
  main.js       ← Bootstrapper — initialises all modules after DOMContentLoaded

src/components/
  cards/sections/  ← One .astro file per word-card section
  sidebar/         ← AppSidebar
  tabs/            ← WordsTab, SentencesTab, ExportTab
  ui/              ← TabBar

src/utils/         ← Shared TypeScript: cardHelpers.ts, highlight.ts, types.ts
specs/
  active/          ← In-progress design specs (hand to Tech Lead)
  archive/         ← Implemented specs (reference only)
```

**Event buses:**
- `selectionchange` — fired by `selection.js` when selection changes
- `tabchange` — fired by `tabs.js` when active tab switches

**Dependency flow (never reverse this):**
```
main.js → ui/* → state/* → utils/*
export.js → anki/fields/* → anki/utils.js
```

---

## Code rules (summary — full rules in CODE.md)

- Every file: `// Responsible for: one-liner` + JSDoc block with Responsible for / Dependencies
- Every exported function: JSDoc with description, `@param`, `@returns`
- Functions ≤ 30 lines; return early to avoid nesting
- `ui/` modules must NOT import from other `ui/` modules — use CustomEvents
- `utils/` files are pure: no DOM access, no event dispatching
- No exported mutable state — only getter functions
- All imports: relative paths with `.js` extension

---

## Style rules (summary — full rules in STYLE.md)

Three surface levels: `slate-950` (page) → `slate-900` (cards) → `slate-800` (inputs/overlays)  
Amber = Hindi word / active state. Teal = romanisation. Never swap or reuse these.  
Labels/headings: `font-title uppercase`. Body copy: `font-sans` (Poppins).  
All transitions: `transition-colors` (never bare `transition`).  
Max border-radius: `rounded-2xl` on cards, `rounded-xl` inner, `rounded-lg` badges.

---

## Known arch flag (not a real issue)

`devanagariFromPart`/`extractDevanagari` and `partLabel`/`extractPartLabel` exist in both:
- `src/utils/cardHelpers.ts` — build-time TypeScript for Astro components
- `src/scripts/utils/stringUtils.js` — browser-side JS for the Anki pipeline

Different runtime environments; cannot share an import. Not a duplicate to fix.

---

## Session closeout checklist

Before ending a session:
- [ ] `npm run build` — passes clean?
- [ ] `npm run arch` — no new warnings beyond the known flag?
- [ ] `BACKLOG.md` updated with any new suggestions from agents?
- [ ] Any completed specs moved from `specs/active/` to `specs/archive/`?
- [ ] `CLAUDE.md` "Open work" / "Next Up" (BACKLOG) reflects current state?

---

## Context recovery (mid-task reset)

1. `git diff --stat` — see what changed
2. `git diff <file>` — understand specific file state
3. Read `BACKLOG.md` "Next Up" — what was in progress
4. Check `specs/active/` — any open spec?
5. Read only the specific files relevant to the task — not the whole codebase
