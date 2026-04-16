# Backlog

Improvement items collected from agents and PM reviews.  
**Owner** = who implements it. **P1** = do soon, **P2** = next batch, **P3** = nice to have.

Update status: `open` → `in-progress` → `done`.

---

## Next Up

These are the highest-value items to pick up in the next session:

1. ~~**[Tech Lead / P1]** Wire filter-panel date chips and chapter chips to actually filter cards~~ — done 2026-04-06.
2. ~~**[Tech Lead / P1]** Wire the Deliver page to show/hide the empty state~~ — done 2026-04-06; also added sentence rows, sentences deck config, and sentence export to Anki.
3. ~~**[Tech Lead / P1]** Define a `Word` interface in `types.ts`~~ — done 2026-04-07; 16 fields, `WordGroup.words` also typed.
4. ~~**[Tech Lead / P2]** Add sentence chapter to search index~~ — done 2026-04-07; `ch` field added to `sentenceSearchIndex`, `data-sentence-index` added to SentenceCard article.
5. ~~**[Tech Lead / P2]** Add `ANKI_FIELDS`/`wordToAnkiFields` sync assertion~~ — done 2026-04-07; 5-line runtime check in `fields/index.js`.
6. ~~**[Tech Lead / P2]** Clean dead CSS from `noteType.js`~~ — done 2026-04-07; removed 14 dead classes.
7. ~~**[Tech Lead / P2]** Replace remaining `font-mono` usages in Astro components with `font-mono-dm`~~ — done 2026-04-07; 6 files updated.
8. **[Tech Lead / P1]** Adopt `Word` type in `data.js` — `getAllWords()` still returns `any[]`; wire it to `Word[]` to propagate type safety into all consumers.
9. **[Tech Lead / P2]** Move `data-sentence-card` onto SentenceCard's own `<article>` — currently placed on a wrapper div in SentencesTab; should match WordCard pattern.
10. **[Tech Lead / P2]** Update `getSentenceIndex()` JSDoc in `data.js` to document the `ch` field added to each entry.

---

## Code Quality

| Item | Owner | Priority | Status |
|---|---|---|---|
| Define `Word` interface in `types.ts` — `allWords: any[]` defeats type safety everywhere | Tech Lead | P1 | done |
| Fix `tagUtils.js` fallback: remove `origin_language`/`origin_tag` references, derive from `word.pos` | Tech Lead | P1 | done |
| Add `ANKI_FIELDS`/`wordToAnkiFields` sync assertion in `fields/index.js` | Tech Lead | P2 | done |
| Clean dead CSS from `noteType.js` (`.pron-row`, `.ex-card`, `.ex-hindi`, `.mean-box`, etc.) | Tech Lead | P2 | done |
| Replace `font-mono` with `font-mono-dm` in Astro section components | Tech Lead | P2 | done |
| Adopt `Word` type in `data.js` — `getAllWords()` still returns `any[]` | Tech Lead | P1 | open |
| Add `DelhiNote` Anki field — `delhi_note` renders in web card but has no Anki field; breaks parity rule | Tech Lead | P1 | done |
| Prune `devanagariFromPart` / `partLabel` from `cardHelpers.ts` and browser-side equivalents in `stringUtils.js` — dead after SoundAlike format change | Tech Lead | P2 | open |
| Extract `prepareExport(words, deckName)` helper in `export.js` — create-deck / ensure-note-type / upload-audio preamble is now duplicated between `sendToAnki` and `overrideDeck` | Tech Lead | P3 | open |
| Add `AbortSignal.timeout(10_000)` to `fetch` in `uploadWordAudio` — hung request currently stalls whole export silently | Tech Lead | P2 | open |
| Move `data-sentence-card` onto SentenceCard `<article>` — currently on wrapper in SentencesTab | Tech Lead | P2 | open |
| Update `getSentenceIndex()` JSDoc in `data.js` to document `ch` field | Tech Lead | P2 | open |
| Verify Anki card CSS in `noteType.js` uses DM Mono for romanisation — parity with web font migration | Tech Lead | P2 | open |
| Add `WordFile` interface to `types.ts` for raw JSON imports in `index.astro` | Tech Lead | P2 | open |
| Prune dead exports `registerStyle` and `cap` from `cardHelpers.ts` | Tech Lead | P2 | open |
| Remove `fmtDate` from `index.astro` — duplicates `formatDate` in `cardHelpers.ts` | Tech Lead | P3 | open |
| Extract `splitMeanings(english)` utility — currently inline in `WordCard.astro` | Tech Lead | P3 | open |
| Extract syllables display into `SyllablesPill.astro` — duplicated in WordCard.astro and WordsTab.astro | Tech Lead | P3 | open |
| Audit remaining `font-family:'Tiro Devanagari Hindi'` inline styles — redundant since `[lang="hi"]` covers them | Tech Lead | P2 | open |

---

## Design

| Item | Owner | Priority | Status |
|---|---|---|---|
| Sidebar checkbox affordance — drag-select is not discoverable | UI/UX Designer | P2 | open |
| Export empty state — guide user back to Words tab when nothing selected | UI/UX Designer | P2 | done |
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
| Add `ch` (chapter) to `sentenceSearchIndex` in `index.astro` for chapter-scoped search filtering | Tech Lead | P2 | done |
| Add `data-sentence-index` on `<article>` in `SentenceCard` — aligns with `WordCard`'s pattern | Tech Lead | P2 | done |
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
| Audio integration: Normal/Slow pills on word/sentence headers, hover-reveal ▶ on breakdown tokens, Anki `storeMediaFile` upload via `uploadWordAudio()`; `audioHelpers.ts`, `audio.js`, `ankiPreview.js` added | 2026-04-15 |
| `DelhiNote` Anki field added: `buildAnkiDelhiNote()` in `fields/delhiNote.js`, wired into `ANKI_FIELDS` and `ANKI_BACK` | 2026-04-15 |
| `ExampleSentence` Anki field added: `buildAnkiExampleSentence()` in `fields/exampleSentence.js` | 2026-04-15 |
| Anki preview implemented: `ankiPreview.js` renders flip cards from selected words using `ANKI_FRONT`/`ANKI_BACK` templates | 2026-04-15 |
| `extractDevanagari`/`extractPartLabel` arch flag — renamed to `devanagariFromPart`/`partLabel` in TS; JS versions kept in `stringUtils.js` | 2026-04-05 |
| Implement new vocab format (web + Anki) per `DESIGN_SPEC_NEW_FORMAT.md` | 2026-04-05 |
| `Word` interface defined in `types.ts` (16 fields, all optional except hindi/romanisation/english) | 2026-04-07 |
| Dead CSS removed from `noteType.js` (14 classes); `ANKI_FIELDS` sync assertion added to `fields/index.js` | 2026-04-07 |
| `font-mono` → `font-mono-dm` migration completed across all Astro components (6 files) | 2026-04-07 |
| `ch` field added to `sentenceSearchIndex`; `data-sentence-index` added to SentenceCard article | 2026-04-07 |
| Anki export fixed: field sync runs before template update; addNotes handles per-note array errors from AnkiConnect v6 | 2026-04-07 |
| Implement sentence cards (web + Anki) per `DESIGN_SPEC_SENTENCES.md` | 2026-04-05 |
| Fix `tagUtils.js`: remove `origin_language`/`origin_tag` fallback, derive tags from `word.pos` only | 2026-04-06 |
| Remove `sentencesByDate` prop + inline `DateGroup` interface from `SentencesTab.astro` | 2026-04-06 |
| Font stack updated to Plus Jakarta Sans (body), Barlow Condensed (titles), DM Mono (dense romanisation); Poppins and Oswald deprecated | 2026-04-06 |
| Add `MorphemesSection.astro` and `DelhiNoteSection.astro` for new vocab fields | 2026-04-06 |
| Add `buildAnkiMorphemes` Anki field builder; wire into `fields/index.js` and `noteType.js` | 2026-04-06 |
| Card visual polish: gradient background, Hindi gradient text fill, romanisation glow, page radial background | 2026-04-06 |
| Full app redesign: top NavBar, single-column layout (720px), group dividers, sel-circle selection, drag-to-select, filter panels, Deliver page redesign | 2026-04-06 |
