# Code Guidelines

How to write, organise, and document code that belongs here.  
Read this before touching any file. The rules are short but non-negotiable.

---

## Core Principles

Three ideas underpin every rule in this document:

1. **Single Responsibility** — every file, module, and function does exactly one thing.
2. **Dependency Inversion** — high-level modules don't import implementation details; they depend on interfaces (exported functions) and communicate via events.
3. **Read first, write second** — before adding anything, read the file you're modifying and the files it imports. Understand what already exists.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 (static generation, no SSR) |
| Styling | Tailwind CSS 3 |
| Scripting | Vanilla JS (ES modules), TypeScript for shared utilities |
| Tooling | `npm run arch` → regenerates ARCHITECTURE.md |

**No frameworks on the client.** There is no React, Vue, or any component library. UI is Astro at build time and vanilla JS at runtime.

---

## File Organisation

### Directory structure

```
src/
  components/          ← Astro components (.astro)
    cards/sections/    ← One file per word-card section
    sidebar/
    tabs/
    ui/
  layouts/             ← Root HTML shell only
  pages/               ← Entry points (index.astro)
  scripts/             ← Client-side JS, grouped by concern
    anki/              ← Anki export pipeline
      fields/          ← One file per Anki field builder
    state/             ← App state (selection, tabs)
    ui/                ← DOM interaction handlers
    utils/             ← Pure shared utilities
  utils/               ← Shared TypeScript utilities
scripts/               ← Build/tooling scripts (Node.js)
```

### File size limits

| File type | Soft limit | Hard limit |
|---|---|---|
| Astro component | 80 lines | 120 lines |
| JS module | 100 lines | 200 lines |
| TypeScript utility | 80 lines | 150 lines |
| Build script | 150 lines | 300 lines |

When you approach the hard limit, split the file. The split point is always at a natural responsibility boundary — never arbitrary.

### One responsibility per file

Each file should be describable in a single sentence starting with a gerund: _"building the Anki Examples HTML field"_, _"fuzzy search scoring and filtering word/sentence card visibility"_.

If your description requires "and" more than once, the file is doing too much. Split it.

---

## Naming Conventions

### Files

- **kebab-case** for all files: `sound-alikes.js`, `cardHelpers.ts`, `WordCard.astro`
- Astro components: **PascalCase** (`WordCard.astro`, `ExportTab.astro`)
- JS modules: **camelCase** (`exportPane.js`, `stringUtils.js`)
- TypeScript utilities: **camelCase** (`cardHelpers.ts`, `highlight.ts`)

### Functions

- **camelCase**, verb-first: `getSelectedWords()`, `buildCategoryField()`, `syncGroupCheckbox()`
- Boolean-returning functions: prefix with `has`, `is`, `can`: `hasWord()`, `isConnected()`
- Event handlers: prefix with `handle` or `on`: `handleCheckboxClick()`, `onSelectionChange()`
- Builder functions (return HTML strings): prefix with `build`: `buildExamplesField()`
- Initialisation functions (called once on load): prefix with `init`: `initSelection()`, `initSearch()`

### Variables

- **camelCase** for all variables and parameters
- `SCREAMING_SNAKE_CASE` for module-level constants that never change: `ANKI_FIELDS`, `DEBOUNCE_MS`
- Avoid single-letter names except for short-scope loop counters (`i`, `j`) and well-known math vars

### DOM selectors

Always use `data-*` attributes for JS hooks, never class names or IDs that are also styled:

```js
// Good — JS hook is separate from style
document.querySelectorAll('[data-word-index]')

// Bad — style class used as selector
document.querySelectorAll('.word-checkbox')  // ← this couples JS to CSS names
```

Exception: existing code uses class-based selectors in some places. Don't refactor them unless you're already editing that file.

---

## Module Design

### Single Responsibility Principle

Each module exports a clear, focused API. If a caller needs to import from more than two files to do one job, something is in the wrong place.

```js
// Good — one module, one job
// state/selection.js exports:
//   initSelection, setWordSelected, hasWord, getSelectedWordIndices, ...

// Bad — utility mixed with state
// utils.js exports:
//   norm, buildWordTags, setWordSelected, hasWord  ← unrelated concerns
```

### Dependency Inversion

High-level orchestrators (`main.js`, `export.js`) import from low-level modules. Low-level modules never import from high-level ones.

```
main.js
  └─ imports: search.js, cards.js, tooltip.js, selection.js, tabs.js, exportPane.js

exportPane.js
  └─ imports: selection.js, export.js, tabs.js

export.js
  └─ imports: connect.js, noteType.js, fields/index.js, tagUtils.js
```

If you find yourself importing a high-level module from a low-level one, you have a circular dependency. Extract the shared logic into a new `utils/` file instead.

### Event-based decoupling

When two modules need to react to each other but shouldn't import each other, use `CustomEvent` on `window`:

```js
// Emitter (selection.js)
window.dispatchEvent(new CustomEvent('selectionchange'));

// Listener (exportPane.js)
window.addEventListener('selectionchange', () => refreshTable());
```

**Current event buses:**
- `selectionchange` — fired when word or sentence selection changes
- `tabchange` — fired when the active tab switches

Do not use ad-hoc events for communication within a single module. Events are for cross-module decoupling only.

### No shared mutable state

Modules may have internal state (e.g. `let selectedWords = new Set()`), but they must never export a reference to that state directly. Always export getter functions:

```js
// Good
export function getSelectedWordIndices() { return [...selectedWords]; }

// Bad — caller can mutate internal state
export { selectedWords };
```

---

## Documentation

Every file and every exported function must be documented. This is not optional — the `npm run arch` script parses these comments to generate ARCHITECTURE.md.

### File-level header

Every `.js`, `.ts`, and `.astro` file must begin with a JSDoc block followed by a `// Responsible for:` one-liner:

```js
/**
 * Short description of what this module does.
 *
 * Responsible for: one sentence, gerund phrase.
 *
 * Dependencies: list modules this file imports from (not Node built-ins).
 */
// Responsible for: the same one sentence as above (parsed by npm run arch)
```

The `// Responsible for:` line must match the JSDoc block. It is machine-read by `scripts/arch.js`.

### Function JSDoc

Every exported function requires JSDoc. Internal helpers benefit from it too but it is not enforced.

```js
/**
 * First line: what this function does (imperative: "Returns...", "Builds...", "Sets...").
 *
 * @param {Type}   name - Description.
 * @param {Type}   name - Description.
 * @returns {Type} Description.
 */
export function myFunction(param1, param2) { ... }
```

Rules:
- First line is always the description — no blank line before `@param`
- Use `{string}`, `{number}`, `{boolean}`, `{object}`, `{string[]}` etc. for types
- `@returns {void}` is required even when the function returns nothing
- For complex object shapes, document the shape inline: `{object[]} Array of word objects with {hindi, english, romanisation}`

### Astro components

Use a comment block at the top of the frontmatter:

```astro
---
/**
 * WordCard section: Examples.
 *
 * Responsible for: rendering the examples expandable section.
 *
 * Dependencies: cardHelpers.ts (highlight), types.ts (Example type).
 */
// Responsible for: Examples expandable section inside a word card
---
```

### After any change

Run `npm run arch` to regenerate ARCHITECTURE.md:

```
npm run arch
```

Check the "Auto-detected Improvement Notes" section at the bottom of the generated file. Fix any warnings before committing.

---

## Writing Code

### Functions

- Maximum 30 lines per function. If you need more, extract a helper.
- One level of abstraction per function: a function that loops should not also format strings.
- Return early to avoid deep nesting:

```js
// Good
export function buildField(word) {
  if (!word.examples?.length) return '';
  // ... rest of the logic at one indent level
}

// Bad
export function buildField(word) {
  if (word.examples?.length) {
    // ... deeply nested logic
  }
}
```

### Conditionals

- Prefer `??` over `||` for nullish checks (don't treat `0` or `''` as falsy when you mean "missing")
- Prefer optional chaining `?.` over `if (x && x.y)`
- Never use `== null` — use `=== null` or `=== undefined` explicitly, or `?? fallback`

### DOM manipulation

- Read DOM once and cache the result: `const btn = document.querySelector('#export-btn');`
- Don't query inside loops: build a selector map once, then look up by key
- Use `classList.toggle(cls, bool)` instead of manual add/remove
- Use `dataset` for reading `data-*` attributes: `el.dataset.wordIndex` not `el.getAttribute('data-word-index')`

### Strings and HTML

- Never concatenate untrusted content into innerHTML — use `textContent` or sanitise first
- HTML strings returned by Anki field builders (`src/scripts/anki/fields/*.js`) are the only legitimate place for innerHTML construction, and they only receive data from the local JSON — not from user input

### Imports

- Always use relative paths for project modules: `'../data.js'`, `'./utils.js'`
- Always include the `.js` extension in import paths (required for native ES modules)
- Group imports: external first (none currently), then internal by layer (data → state → ui)

---

## Adding a New Feature

Follow this checklist in order:

1. **Read ARCHITECTURE.md** — understand where your feature fits.
2. **Identify the right file** — does this belong in an existing module, or does it need a new one?
3. **If a new file**: create it in the correct directory, add the full file-level JSDoc and `// Responsible for:` comment.
4. **Write the function(s)** with JSDoc before the implementation (docs-first helps clarify the contract).
5. **Wire it up** in the appropriate orchestrator (`main.js` for UI init, `fields/index.js` for Anki fields, etc.).
6. **Respect STYLE.md** — any new DOM elements must follow the visual conventions in STYLE.md.
7. **Run `npm run arch`** — fix any warnings the script reports.
8. **Test manually** — check the three breakpoints: 375px, 768px, 1024px+.

---

## Adding a New Anki Field

Anki field builders live in `src/scripts/anki/fields/`. Each field is one file.

1. Create `src/scripts/anki/fields/myField.js` with the standard header.
2. Export a single `buildMyField(word)` function that returns an HTML string or `''`.
3. Add the field name to `ANKI_FIELDS` in `noteType.js`.
4. Import and call `buildMyField` in `fields/index.js`.
5. Run `npm run arch`.

---

## What NOT to Do

- **Don't skip the file header.** The arch script will flag it and ARCHITECTURE.md will show `—` for your file's responsibility.
- **Don't import state directly.** Never `import { selectedWords }` — only import functions.
- **Don't dispatch events from utilities.** `utils/` files are pure functions. Events belong in `state/` and `ui/` modules.
- **Don't add dependencies.** The entire client runs on zero npm dependencies. If you think you need a library, you probably need a 10-line function.
- **Don't write defensive code for impossible cases.** If the data structure guarantees a field exists, trust it. Don't write `if (word?.hindi?.trim()?.length > 0)` when `word.hindi` is always a non-empty string.
- **Don't leave console.log in committed code.** Use them during development, remove them before committing.
- **Don't use `var`.** Always `const` or `let`. Prefer `const`.
- **Don't use `any` in TypeScript.** If you genuinely don't know the type, use `unknown` and narrow it.
- **Don't create a utility for a one-off.** Three identical usages justify a shared utility. One or two do not.

---

## Code Review Checklist

Before considering work done, verify:

### Responsibility
- [ ] Does every new/modified file have a `// Responsible for:` comment?
- [ ] Does every exported function have JSDoc?
- [ ] Does the module do exactly one thing?

### Dependencies
- [ ] Does the dependency graph flow top-down (orchestrators → modules → utils)?
- [ ] Are cross-module side-effects communicated via `CustomEvent`?
- [ ] Are all import paths relative with `.js` extensions?

### Code quality
- [ ] Are functions ≤ 30 lines?
- [ ] Is early return used to avoid deep nesting?
- [ ] Is no mutable state exported directly?

### Style
- [ ] Do all new DOM elements follow STYLE.md?
- [ ] Are `data-*` attributes used for JS hooks (not style classes)?

### Documentation
- [ ] Did you run `npm run arch`?
- [ ] Are there zero warnings in the "Auto-detected Improvement Notes" section?
