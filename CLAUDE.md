# HindiWeb — Claude Code Instructions

## Project in one sentence
Dark-mode Hindi vocabulary study app: browse word cards with etymology/pronunciation/examples, select words, export to Anki. Static site (Astro + Tailwind + vanilla JS).

## Commands
```sh
npm run dev       # dev server → localhost:4321
npm run build     # verify the build compiles clean — run after every implementation
npm run arch      # regenerate ARCHITECTURE.md — run after any JS/TS/Astro change
npm run changelog # aggregate changelog/ entries into CHANGELOG.md
npm run coverage  # regenerate FIELD_REGISTRY.md — run after any vocab format or demo change
```

---

## Session startup — do this first

1. Read **`BACKLOG.md`** — "Next Up" section tells you what to work on.
2. Read **`ARCHITECTURE.md`** — orientation for the full codebase (auto-generated, always current).
3. Check `specs/active/` — any in-progress design specs the last session left open.

**As PM you read documentation only — never read source files directly.** Use ARCHITECTURE.md as the index and brief agents with file paths.

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
| `specs/demo/` | Designer's HTML/CSS/JS demos — visual proof-of-concept for new patterns | Before implementing any new UI pattern |
| `specs/archive/` | Implemented specs — reference only, do not act on them | If you need historical context |

---

## Team workflow

You (Claude) are the **PM**. You coordinate two specialist agents:

- Read `BACKLOG.md`, `ARCHITECTURE.md`, `STYLE.md`, `CODE.md`, and specs — never source files.
- Translate user intent into clear agent briefs.
- Review agent output summaries and decide next steps.
- Never write or edit source code yourself.

---

### UI/UX Designer

**What they own:**
- `STYLE.md` — kept as framework-agnostic design guidelines (colours, typography, spacing, component patterns). Not Astro-specific.
- `specs/active/*.md` — design specs for features in progress.
- `specs/demo/*.html` — standalone HTML/CSS/JS demos that visualise a design idea.

**What they do:**
- Identify UX gaps, suggest design improvements, write specs.
- When a new visual pattern is needed: produce a **self-contained HTML/CSS/JS demo** (`specs/demo/<feature>.html`) that demonstrates the idea with dummy data (one word card + one sentence card is enough). The demo must render correctly when opened directly in a browser — no build step.
- Update `STYLE.md` when new patterns or rules emerge.
- Does **not** write Astro, TypeScript, or any application code.

**After every demo change:** run `npm run coverage` — confirms no field is missing from the demo surface. Fix any ❌ before handing off to the Tech Lead.

**Output:** updated `STYLE.md` + (when applicable) a demo file in `specs/demo/` + `npm run coverage` result + a written summary of decisions.

---

### Technical Lead

**What they own:**
- All source code under `src/` and any config files.
- Keeping documentation in sync: after every change, runs `npm run build && npm run arch && npm run coverage` and updates `BACKLOG.md` with any improvement suggestions.

**What they do:**
- Read `STYLE.md`, active specs, and the designer's demo (if one exists) before implementing UI changes.
- Implement designs in Astro/Tailwind/TypeScript/vanilla JS.
- Never change `STYLE.md` — that belongs to the designer.

**Output:** files changed (every file) + `npm run build && npm run arch && npm run coverage` result (non-optional) + acceptance criteria met + improvement suggestions (3–5 items).

---

### Handoff flow
```
User request
  → design/UX change?
      → spawn Designer → STYLE.md updated + demo in specs/demo/ (if visual pattern)
      → PM reviews → spawn Tech Lead with demo path + STYLE.md
      → Tech Lead implements → build clean → PM archives spec
  → pure code fix / refactor?
      → spawn Tech Lead directly
```

### When to use agents vs inline
- **Use agents:** multi-file changes, full audits, document rewrites, anything > ~5 file edits
- **Do inline:** single-file edits (< 5 lines, trivial), quick lookups, running commands, answering questions

**PM role — inline exceptions:** The PM never edits source code. If an edit is truly trivial (typo fix, removing one dead import), do it inline and prefix the response with `[inline — trivial]`. Any ambiguity → brief an agent.

### Parallel agents
Spawn agents in parallel when their file scopes don't overlap.  
Always include an explicit **"do NOT touch"** list in each prompt when running in parallel.

**Example parallel pattern:**
- Designer updating `STYLE.md` + writing `specs/demo/X.html`
- Tech Lead implementing an already-specced feature in `src/`
These can run simultaneously because they own different file sets.

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

Acceptance criteria:
- [Specific element IDs, function names, class names, or behaviours that must be present when done]
- [E.g. "#deliver-confirm-sent-line hides when sentences.length === 0"]
- [E.g. "npm run build exits 0 with no type errors"]

Verify (Tech Lead only — non-optional):
- npm run build
- npm run arch
- npm run coverage

Output:
- Files changed (list every file)
- Build result (pass/fail)
- Acceptance criteria met? (yes/no per item)
- Improvement suggestions: 3–5 items in your domain
```

**Do not paste file contents into prompts.** Give paths and let the agent read.

### Token efficiency rules
These apply to every agent spawn and every inline action:

- **Read ARCHITECTURE.md first, source files second.** Agents should orient from the architecture doc, then read only the specific files named in the brief.
- **Use offset/limit when reading large files.** If you need lines 40–80, pass `offset: 39, limit: 41`. Do not read a 300-line file to inspect one function.
- **Use the Explore agent for discovery, not general-purpose.** When searching for a pattern across the codebase, use `subagent_type: Explore`. Reserve general-purpose for implementation.
- **One concern per agent.** Split unrelated tasks across separate agents rather than dumping everything into one brief. Focused agents produce shorter, more useful outputs.
- **No confirmation padding.** Agents must not restate the brief or summarise what they did beyond the Output section. Terse is correct.
- **PM reads summaries, not diffs.** The PM never reads source files. If the agent's output summary is insufficient to review, ask for a tighter summary — don't read the file yourself.

### Designer demo format

When the designer produces a demo, brief them with:

```
Produce a self-contained specs/demo/<name>.html that demonstrates [design idea].
Requirements:
- Opens directly in a browser, no build step.
- Dummy data only: one word card (e.g. "पानी / paanī / water") + one sentence card.
- Dark background (#020617) to match app.
- Use plain HTML + a <style> block + optional inline <script>.
- Goal is to communicate the visual pattern, not pixel-perfect parity.
```

The Tech Lead then reads `specs/demo/<name>.html` and `STYLE.md` and implements in Astro.

---

## Web ↔ Anki parity rule

**Every word card change must be applied to both surfaces simultaneously.**

The web card (`src/components/cards/sections/`) and the Anki card (`src/scripts/anki/fields/` + `noteType.js`) are parallel representations of the same data. They must always stay in sync.

| When you change... | You must also update... |
|---|---|
| Section order in `WordCard.astro` | Section order in `ANKI_BACK` template in `noteType.js` |
| Add a new section component | Add a matching field builder in `anki/fields/`, add field to `ANKI_FIELDS`, wire in `fields/index.js` |
| Remove a section component | Delete the matching field builder, remove from `ANKI_FIELDS` and `fields/index.js` |
| Change section content/layout | Update the matching field builder to match |
| Change section accent colour | Update the matching hex in the field builder's `aSection()` call |

**Section order is defined in two places — keep them identical:**
- `src/components/WordCard.astro` (web, Tailwind)
- `ANKI_BACK` template in `src/scripts/anki/noteType.js` (Anki, Mustache)

If a task only mentions one surface, ask: *does the other surface need the same change?*  
The answer is almost always yes.

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

## Style rules (summary — full rules in STYLE.md, owned by Designer)

Three surface levels: `slate-950` (page) → `slate-900` (cards) → `slate-800` (inputs/overlays)  
Amber = Hindi word / active state. Teal = romanisation. Never swap or reuse these.  
Labels/headings: `font-title uppercase`. Body copy: `font-sans` (Poppins).  
All transitions: `transition-colors` (never bare `transition`).  
Max border-radius: `rounded-2xl` on cards, `rounded-xl` inner, `rounded-lg` badges.  
Min text size: `text-[11px]`. No colored left-border section accents. Romanisation in dense sections: `text-[13px]` min.

---

## Known arch flag (not a real issue)

`devanagariFromPart`/`extractDevanagari` and `partLabel`/`extractPartLabel` exist in both:
- `src/utils/cardHelpers.ts` — build-time TypeScript for Astro components
- `src/scripts/utils/stringUtils.js` — browser-side JS for the Anki pipeline

Different runtime environments; cannot share an import. Not a duplicate to fix.

---

## Session closeout checklist

**Run this before every session end — not optional.**

- [ ] `npm run build` — passes clean?
- [ ] `npm run arch` — no new warnings beyond the known flag?
- [ ] Web card sections and Anki sections are in the same order?
- [ ] Every new/removed section has a matching Anki field builder change?
- [ ] `npm run coverage` — any ⚠️ parity gaps?
- [ ] `BACKLOG.md` — completed items marked `done`, new suggestions added?
- [ ] Any completed specs moved from `specs/active/` to `specs/archive/`?
- [ ] Memory updated? (`/Users/vadimgagarin/.claude/projects/.../memory/`)

If the session ended mid-task, add a `## Open work` section at the top of `BACKLOG.md` with one sentence describing exact stopping point.

---

## Context recovery (mid-task reset)

1. `git diff --stat` — see what changed
2. `git diff <file>` — understand specific file state
3. Read `BACKLOG.md` "Next Up" — what was in progress
4. Check `specs/active/` — any open spec?
5. Read only the specific files relevant to the task — not the whole codebase
