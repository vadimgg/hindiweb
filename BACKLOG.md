# Backlog

Improvement items collected from agents and PM reviews.  
**Owner** = who implements it. **P1** = do soon, **P2** = next batch, **P3** = nice to have.

Update status: `open` → `in-progress` → `done`.

---

## Next Up

These are the highest-value items to pick up in the next session:

1. **[Tech Lead / P1]** Wire filter-panel date chips and chapter chips to actually filter cards — currently the chip buttons are rendered but clicks don't trigger any filter logic.
2. **[Tech Lead / P1]** Wire the Deliver page to show/hide the empty state — when `getSelectedWordObjects().length === 0`, show `#deliver-empty` and hide `#deliver-main`.
3. **[Tech Lead / P1]** Define a `Word` interface in `types.ts` — the core data type is currently `any`, which means zero type safety across the whole pipeline.
4. **[Tech Lead / P2]** Add sentence chapter to search index — add `ch` field to `sentenceSearchIndex` so users can filter by chapter name.
5. **[Tech Lead / P2]** Add `ANKI_FIELDS`/`wordToAnkiFields` sync assertion — a 3-line check that catches mismatches at export time with no dependencies.
6. **[Tech Lead / P2]** Clean dead CSS from `noteType.js` (`.pron-row`, `.ex-card`, `.ex-hindi`, `.mean-box`, etc.) — large stale block left from old card design.
7. **[Tech Lead / P2]** Replace remaining `font-mono` usages in Astro components with `font-mono-dm` now that `DM Mono` is the canonical dense-romanisation font.

---

## Code Quality

| Item | Owner | Priority | Status |
|---|---|---|---|
| Define `Word` interface in `types.ts` — `allWords: any[]` defeats type safety everywhere | Tech Lead | P1 | open |
| Fix `tagUtils.js` fallback: remove `origin_language`/`origin_tag` references, derive from `word.pos` | Tech Lead | P1 | done |
| Add `ANKI_FIELDS`/`wordToAnkiFields` sync assertion in `fields/index.js` | Tech Lead | P2 | open |
| Clean dead CSS from `noteType.js` (`.pron-row`, `.ex-card`, `.ex-hindi`, `.mean-box`, etc.) | Tech Lead | P2 | open |
| Prune dead exports `registerStyle` and `cap` from `cardHelpers.ts` | Tech Lead | P2 | open |
| Remove `fmtDate` from `index.astro` — duplicates `formatDate` in `cardHelpers.ts` | Tech Lead | P3 | open |
| Extract `splitMeanings(english)` utility — currently inline in `WordCard.astro` | Tech Lead | P3 | open |
| Clarify `index.js` responsibility — separate orchestration from raw field escaping | Tech Lead | P3 | open |
| Replace `font-mono` with `font-mono-dm` in Astro section components (FormsSection, EtymologySection, etc.) to use canonical DM Mono | Tech Lead | P2 | open |
| Audit remaining `font-family:'Tiro Devanagari Hindi'` inline styles — they are redundant now that `[lang="hi"]` rule covers them in global.css | Tech Lead | P2 | open |

---

## Design

| Item | Owner | Priority | Status |
|---|---|---|---|
| Sidebar checkbox affordance — drag-select is not discoverable | UI/UX Designer | P2 | open |
| Export empty state — guide user back to Words tab when nothing selected | UI/UX Designer | P2 | open |
| AnkiConnect offline recovery — include install link in offline state UI | UI/UX Designer | P2 | open |
| Search empty state — add inline "clear search" link | UI/UX Designer | P2 | open |
| Collapsed card affordance — section count badge or visible chevron hint | UI/UX Designer | P3 | open |
| Word card expand animation — `grid-template-rows 0fr→1fr` at 200ms | UI/UX Designer | P3 | open |
| Sentences tab — design decisions needed before implementation | UI/UX Designer | P1 | open |

---

## Code Quality — Sentences (from 2026-04-05)

| Item | Owner | Priority | Status |
|---|---|---|---|
| Remove `sentencesByDate` prop + `DateGroup` interface from `SentencesTab` — now unused | Tech Lead | P1 | done |
| Add `ch` (chapter) to `sentenceSearchIndex` in `index.astro` for chapter-scoped search filtering | Tech Lead | P2 | open |
| Add `data-sentence-index` on `<article>` in `SentenceCard` — aligns with `WordCard`'s pattern | Tech Lead | P2 | open |
| Refactor `globalIndex` mutation in `SentenceList.astro` to a pre-computed flat array in frontmatter | Tech Lead | P3 | open |
| Clean `ANKI_SENTENCE_CSS` composition — use template literal instead of double-join | Tech Lead | P3 | open |

## Design — Sentences (from 2026-04-05)

| Item | Owner | Priority | Status |
|---|---|---|---|
| Inline token highlighting: hover a breakdown row → highlight matching token in header sentence | UI/UX Designer | P2 | open |
| Audio playback affordance: speaker icon in header for TTS / pre-recorded audio (`audio_url?` field) | UI/UX Designer | P3 | open |
| Chapter count badge: promote muted count to pill badge matching sidebar pattern | UI/UX Designer | P3 | open |
| "Copy Hindi" micro-action: clipboard icon next to sentence in header | UI/UX Designer | P3 | open |
| Future: Anki cloze scaffold for long sentences — `FirstWord` field between Romanisation and Literal | UI/UX Designer | P3 | open |

---

## Resolved

| Item | Resolved |
|---|---|
| `extractDevanagari`/`extractPartLabel` arch flag — renamed to `devanagariFromPart`/`partLabel` in TS; JS versions kept in `stringUtils.js` | 2026-04-05 |
| Implement new vocab format (web + Anki) per `DESIGN_SPEC_NEW_FORMAT.md` | 2026-04-05 |
| Implement sentence cards (web + Anki) per `DESIGN_SPEC_SENTENCES.md` | 2026-04-05 |
| Fix `tagUtils.js`: remove `origin_language`/`origin_tag` fallback, derive tags from `word.pos` only | 2026-04-06 |
| Remove `sentencesByDate` prop + inline `DateGroup` interface from `SentencesTab.astro` | 2026-04-06 |
| Font stack updated to Plus Jakarta Sans (body), Barlow Condensed (titles), DM Mono (dense romanisation); Poppins and Oswald deprecated | 2026-04-06 |
| Add `MorphemesSection.astro` and `DelhiNoteSection.astro` for new vocab fields | 2026-04-06 |
| Add `buildAnkiMorphemes` Anki field builder; wire into `fields/index.js` and `noteType.js` | 2026-04-06 |
| Card visual polish: gradient background, Hindi gradient text fill, romanisation glow, page radial background | 2026-04-06 |
| Full app redesign: top NavBar, single-column layout (720px), group dividers, sel-circle selection, drag-to-select, filter panels, Deliver page redesign | 2026-04-06 |
