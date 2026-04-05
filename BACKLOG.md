# Backlog

Improvement suggestions collected from agents. Pick items and assign to the relevant role.  
Add new items here as they come up. Remove or mark done when addressed.

---

## Code Quality (Tech Lead)

### From web-side audit (2026-04-05)

- **Define a `Word` interface in `types.ts`**  
  `WordGroup.words` uses `{ w: any; i: number }[]` and `WordsTab.astro` takes `allWords: any[]`. A proper `Word` interface enables type checking across the whole pipeline (Astro components, client scripts, Anki builders).  
  _Priority: high — this is the core data type._

- **Prune dead exports from `cardHelpers.ts`**  
  `registerStyle` and `cap` are only used by deleted section components. Remove or move to a clearly-marked legacy file.  
  _Priority: medium_

- **Remove `fmtDate` from `index.astro`**  
  Duplicates `formatDate` from `cardHelpers.ts`. Import the shared utility instead.  
  _Priority: low_

- **Extract `splitMeanings` utility**  
  `primaryMeaning`/`secondaryMeanings` split logic lives inside `WordCard.astro`. Move to `cardHelpers.ts` as `splitMeanings(english: string): { primary: string; secondary: string }`.  
  _Priority: low_

- **Clarify `grouped_with` status**  
  `GroupedWith` type was removed but confirm the field is also gone from the data format. Document the decision in `types.ts` if it will not return.  
  _Priority: low_

### From Anki-pipeline audit (2026-04-05)

- **`extractDevanagari`/`extractPartLabel` arch flag is intentional** _(resolved 2026-04-05)_  
  These exist in both `src/scripts/utils/stringUtils.js` (browser JS, used by Anki pipeline) and `src/utils/cardHelpers.ts` (build-time TS, used by Astro components). They cannot share an import because the two files run in different environments. The arch flag is a false positive. A comment explaining this was added to `cardHelpers.ts`. No further action needed.

- **Clean dead CSS from `noteType.js`**  
  `.pron-row`, `.syl-label`, `.syl-desc`, `.ex-card`, `.ex-header`, `.ex-hindi`, `.reg`, `.mean-box`, `.meta-badge` now serve no active builders. Removing them shrinks the exported Anki stylesheet.  
  _Priority: medium_

- **Fix `tagUtils.js` fallback path**  
  Fallback references `word.origin_language` and `word.origin_tag` — both removed from the new format. Either drop the fallback (if `anki_tags` is always present) or derive it from `word.pos` alone.  
  _Priority: medium_

- **Add `index.js` / `ANKI_FIELDS` sync assertion**  
  `wordToAnkiFields` and `ANKI_FIELDS` must stay in sync manually. A cheap assertion comparing `Object.keys(result)` against `ANKI_FIELDS` would catch any future mismatch at runtime with no dependencies.  
  _Priority: medium_

- **Clarify `index.js` responsibility**  
  `wordToAnkiFields` both orchestrates builder calls and escapes raw fields (`English`, `Hindi`, `Romanisation`) inline. Either extract three tiny builders or a private `escField` helper to keep the file's responsibility narrow.  
  _Priority: low_

---

## Design (UI/UX Designer)

### From STYLE.md improvement suggestions (2026-04-04)

- **Sidebar checkbox affordance** — drag-select is not discoverable; consider a tooltip or micro-animation on first hover.
- **Export empty state** — when no words are selected, the export panel should guide the user back to the Words tab.
- **AnkiConnect offline recovery** — offline state should include a direct link/instruction to install the AnkiConnect add-on.
- **Collapsed card expansion affordance** — a hidden chevron or section-count badge would hint that sections exist.
- **Search empty state** — include a "clear search" inline link rather than just "no results".
- **Word card expand animation** — `grid-template-rows: 0fr → 1fr` trick at 200ms would make expansion feel more alive.
- **Sentences tab** — design decisions needed before implementation: card layout, interaction model, relationship to word cards.

---

## Workflow (PM)

- **Collect agent improvement suggestions into this file** — done automatically at the end of each session. ✓  
- **Add `BACKLOG.md` pointer to CLAUDE.md** — next session should start by reading this file.  
- **Extract `extractDevanagari`/`extractPartLabel` to `stringUtils.js`** — the one arch-flagged duplication currently in the codebase; a quick Tech Lead task.  
- **Build validation step** — after every Tech Lead implementation, run `npm run build` and verify zero errors before considering a task done. Not currently part of the workflow.  
- **`DESIGN_SPEC_NEW_FORMAT.md` is now stale** — once the implementation is verified, either delete it or archive it (move to a `specs/` folder) so it doesn't mislead future sessions.
