# HindiWeb — Claude Code Instructions

## Project in one sentence
Dark-mode Hindi vocabulary study app: browse word cards with etymology/pronunciation/examples, select words, export to Anki. Static site (Astro + Tailwind + vanilla JS).

## Commands
```sh
npm run dev       # dev server → localhost:4321
npm run build     # build to dist/
npm run arch      # regenerate ARCHITECTURE.md ← run after any JS/TS/Astro change
npm run changelog # aggregate changelog/ entries into CHANGELOG.md
```

---

## Living documents — read these, don't duplicate them

| File | What it contains | When to read |
|---|---|---|
| `ARCHITECTURE.md` | Auto-generated: every file, its responsibility, exports, imports | Start of any coding session |
| `CODE.md` | Naming, SRP, DIP, JSDoc, function size, module boundaries | Before writing any code |
| `STYLE.md` | Tailwind recipes, colour system, components, Anki card design | Before touching any UI |
| `README.md` | Vocab JSON format, AnkiConnect setup, export workflow | When working on data or Anki |

**Session startup checklist:**
1. Read `ARCHITECTURE.md` for codebase orientation (auto-generated, always current)
2. Read `CODE.md` before writing code
3. Read `STYLE.md` before touching UI
4. Run `npm run arch` after changes; fix all warnings in "Auto-detected Improvement Notes"

---

## Team workflow

This project uses a **project manager + specialist agent** model. You (Claude) act as PM. Two specialist roles exist:

### Role: UI/UX Designer
**Scope:** Visual design and UX specs only. Does NOT write code.
- Owns `STYLE.md` — the single source of truth for all visual decisions
- Reviews design, identifies UX gaps, writes improvement suggestions
- Outputs design specs that engineers implement
- Launch with: `Agent(subagent_type="general-purpose")`, brief as UI/UX Designer, point them at `STYLE.md`, `ARCHITECTURE.md`, and relevant component files

### Role: Technical Lead
**Scope:** All code changes. Follows `CODE.md` and `STYLE.md`.
- Owns code quality, module boundaries, documentation completeness
- Runs `npm run arch` after every change; fixes all warnings
- Never changes Tailwind classes without a STYLE.md reference
- Launch with: `Agent(subagent_type="general-purpose")`, brief as Tech Lead, give them the specific task + files to touch

### Handoff flow
```
PM (you) receives a request
  → if UI/design: spawn UI/UX Designer to spec it → Designer outputs spec
  → PM reviews spec → spawn Tech Lead to implement it
  → if pure code change: spawn Tech Lead directly
  → PM reviews result and reports to user
```

### When to use agents vs inline
- **Use agents** for: multi-file changes, full audits, document rewrites, anything that would fill context
- **Do inline** with your own tools: single-file edits, quick lookups, answering questions, running `npm run arch`

### Parallel agents
Spawn UI/UX Designer and Tech Lead in parallel when their work doesn't overlap (e.g. design review + code audit at the same time).

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
```

**Event buses:**
- `selectionchange` — fired by `selection.js` when word/sentence selection changes
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
- No `var`, no `console.log` in committed code

---

## Style rules (summary — full rules in STYLE.md)

Three surface levels: `slate-950` (page) → `slate-900` (cards) → `slate-800` (inputs/overlays)  
Amber = Hindi word / active state. Teal = romanisation. Never invert or reuse these.  
Labels/headings: `font-title uppercase`. Body copy: `font-sans` (Poppins).  
All transitions: `transition-colors` (never bare `transition`).  
Max border-radius: `rounded-2xl` on cards, `rounded-xl` inner, `rounded-lg` badges.

---

## Token-efficient session recovery

If context was lost mid-task:
1. Run `git diff --stat` to see what changed
2. Run `git diff` on the specific files to understand the state
3. Read `ARCHITECTURE.md` overview table — it reflects the current file structure
4. Check `STYLE.md` "Design Improvement Suggestions" section for pending design work

Do NOT re-read the entire codebase. Use `ARCHITECTURE.md` as the index, then read only the specific files relevant to the task.
