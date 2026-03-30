# Architecture

_Generated 2026-03-30 by `npm run arch`._

## src/components/

| File | Lines | Responsible for |
|---|---|---|
| `MobileHeader.astro` | 13 | mobile-only page header with title and search input (hidden on lg+) |
| `SentenceCard.astro` | 17 | — |
| `WordCard.astro` | 85 | word card shell — header row + section delegation |

## src/components/cards/sections/

| File | Lines | Responsible for |
|---|---|---|
| `CrossLangSection.astro` | 51 | Cross-Language Connections expandable section inside a word card |
| `ExamplesSection.astro` | 43 | Examples expandable section inside a word card |
| `FormsSection.astro` | 34 | forms chips row + secondary meanings block inside a word card |
| `MemorySection.astro` | 34 | Memory Hook expandable section inside a word card |
| `PronunciationSection.astro` | 45 | Pronunciation expandable section inside a word card |
| `RootOriginSection.astro` | 69 | Root & Origin and Etymology Story expandable sections inside a word card |
| `SoundAlikesSection.astro` | 36 | Sound Alikes expandable section inside a word card |
| `UrduPunjabiSection.astro` | 53 | Urdu & Punjabi expandable section inside a word card |

## src/components/sidebar/

| File | Lines | Responsible for |
|---|---|---|
| `AppSidebar.astro` | 86 | desktop sidebar — logo, search bar, words index nav, sentences index nav |

## src/components/tabs/

| File | Lines | Responsible for |
|---|---|---|
| `ExportTab.astro` | 70 | Export/Delivery pane HTML — word summary table and Anki settings panel |
| `SentencesTab.astro` | 30 | Sentences tab content — sentence cards grid, empty states |
| `WordsTab.astro` | 39 | Words tab content — meta line, word cards grid, empty state, footer |

## src/components/ui/

| File | Lines | Responsible for |
|---|---|---|
| `TabBar.astro` | 28 | DaVinci Resolve-style bottom-fixed tab bar (Words | Sentences | Export) |

## src/layouts/

| File | Lines | Responsible for |
|---|---|---|
| `Layout.astro` | 27 | — |

## src/pages/

| File | Lines | Responsible for |
|---|---|---|
| `index.astro` | 101 | page entry point — loads vocab data, passes it to components, renders app shell |

## src/scripts/

| File | Lines | Responsible for |
|---|---|---|
| `data.js` | 8 | lazy read-only accessors for window.__APP_DATA__ (set by define:vars in index.astro) |
| `main.js` | 20 | bootstrapper — imports all modules and initialises them after DOMContentLoaded |

## src/scripts/anki/

| File | Lines | Responsible for |
|---|---|---|
| `connect.js` | 18 | AnkiConnect HTTP API wrapper and connection status check |
| `export.js` | 40 | orchestrating Anki deck creation, note type verification, and card addition |
| `noteType.js` | 44 | Anki note type definition — CSS, front/back card templates, field list |
| `txtFallback.js` | 28 | generating and triggering browser download of a .txt file for manual Anki import |

## src/scripts/anki/fields/

| File | Lines | Responsible for |
|---|---|---|
| `category.js` | 9 | building the Anki Category HTML field |
| `crossLang.js` | 24 | building the Anki Cross-Language HTML field |
| `examples.js` | 15 | building the Anki Examples HTML field |
| `forms.js` | 19 | building the Anki Forms HTML field (chips + secondary meanings) |
| `index.js` | 29 | assembling wordToAnkiFields() from all individual field builders |
| `memory.js` | 19 | building the Anki Memory Hook HTML field |
| `pronunciation.js` | 21 | building the Anki Pronunciation HTML field |
| `rootOrigin.js` | 28 | building the Anki Root & Origin and Etymology Story HTML fields |
| `soundAlikes.js` | 18 | building the Anki Sound Alikes HTML field |
| `urduPunjabi.js` | 22 | building the Anki Urdu & Punjabi HTML field |
| `utils.js` | 55 | shared HTML-building utilities for Anki card field builders |

## src/scripts/state/

| File | Lines | Responsible for |
|---|---|---|
| `selection.js` | 57 | word and sentence selection state and change notifications via CustomEvents |
| `tabs.js` | 52 | active tab state, DOM panel switching, and tabchange event dispatch |

## src/scripts/ui/

| File | Lines | Responsible for |
|---|---|---|
| `cards.js` | 43 | word card collapse/expand toggling and deselect button handling |
| `exportPane.js` | 100 | export pane controller — word table, AnkiConnect status polling, export button |
| `indexSidebar.js` | 76 | sidebar interactions — drag-select checkboxes, group collapse, scroll-to-card |
| `search.js` | 107 | fuzzy search scoring and filtering word/sentence card visibility |
| `tooltip.js` | 84 | vocab-hint span annotation in example cards and tooltip positioning |

## src/utils/

| File | Lines | Responsible for |
|---|---|---|
| `cardHelpers.ts` | 60 | pure helper functions shared across WordCard section components |
| `highlight.ts` | 87 | — |
| `types.ts` | 19 | shared TypeScript interfaces used across Astro components and client scripts |
