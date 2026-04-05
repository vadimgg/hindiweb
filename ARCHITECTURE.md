# Architecture

_Generated 2026-04-05 by `npm run arch`._

---

## Overview

| File | Lines | Responsible for |
|---|---|---|
| `src/components/cards/sections/CrossLangSection.astro` | 49 | Cross-Language Connections expandable section inside a word card |
| `src/components/cards/sections/ExamplesSection.astro` | 43 | Examples expandable section inside a word card |
| `src/components/cards/sections/FormsSection.astro` | 55 | forms chips row + secondary meanings + usage note + grouped words inside a word card |
| `src/components/cards/sections/MemorySection.astro` | 36 | Memory Hook expandable section inside a word card |
| `src/components/cards/sections/PronunciationSection.astro` | 58 | Pronunciation expandable section inside a word card |
| `src/components/cards/sections/RootOriginSection.astro` | 91 | Root & Origin and Etymology Story expandable sections inside a word card |
| `src/components/cards/sections/SoundAlikesSection.astro` | 34 | Sound Alikes expandable section inside a word card |
| `src/components/cards/sections/UrduPunjabiSection.astro` | 51 | Urdu & Punjabi expandable section inside a word card |
| `src/components/sidebar/AppSidebar.astro` | 86 | desktop sidebar — logo, search bar, words index nav, sentences index nav |
| `src/components/tabs/ExportTab.astro` | 81 | Export/Delivery pane HTML — word summary table and Anki settings panel |
| `src/components/tabs/SentencesTab.astro` | 30 | Sentences tab content — sentence cards grid, empty states |
| `src/components/tabs/WordsTab.astro` | 41 | Words tab content — meta line, word cards grid, empty state, footer |
| `src/components/ui/TabBar.astro` | 28 | DaVinci Resolve-style bottom-fixed tab bar (Words | Sentences | Export) |
| `src/components/MobileHeader.astro` | 13 | mobile-only page header with title and search input (hidden on lg+) |
| `src/components/SentenceCard.astro` | 18 | sentence card placeholder — to be implemented once sentences/*.json format is defined |
| `src/components/WordCard.astro` | 95 | word card shell — header row + section delegation |
| `src/layouts/Layout.astro` | 28 | root HTML shell — doctype, meta tags, font imports, global CSS, slot |
| `src/pages/index.astro` | 109 | page entry point — loads vocab data, passes it to components, renders app shell |
| `src/scripts/anki/fields/category.js` | 25 | building the Anki Category HTML field |
| `src/scripts/anki/fields/crossLang.js` | 56 | building the Anki Cross-Language HTML field |
| `src/scripts/anki/fields/examples.js` | 33 | building the Anki Examples HTML field |
| `src/scripts/anki/fields/forms.js` | 47 | building the Anki Forms HTML field (chips + secondary meanings) |
| `src/scripts/anki/fields/index.js` | 47 | assembling wordToAnkiFields() from all individual field builders |
| `src/scripts/anki/fields/memory.js` | 45 | building the Anki Memory Hook HTML field |
| `src/scripts/anki/fields/pronunciation.js` | 56 | building the Anki Pronunciation HTML field |
| `src/scripts/anki/fields/rootOrigin.js` | 104 | building the Anki Root & Origin and Etymology Story HTML fields |
| `src/scripts/anki/fields/soundAlikes.js` | 48 | building the Anki Sound Alikes HTML field |
| `src/scripts/anki/fields/urduPunjabi.js` | 63 | building the Anki Urdu & Punjabi HTML field |
| `src/scripts/anki/fields/utils.js` | 109 | shared HTML-building utilities for Anki card field builders |
| `src/scripts/anki/connect.js` | 43 | AnkiConnect HTTP API wrapper and connection status check |
| `src/scripts/anki/export.js` | 104 | orchestrating Anki deck creation, note type verification, and card addition |
| `src/scripts/anki/noteType.js` | 96 | Anki note type definition — CSS, front/back card templates, field list |
| `src/scripts/anki/tagUtils.js` | 34 | shared Anki tag-building utility used by export.js and txtFallback.js |
| `src/scripts/anki/txtFallback.js` | 50 | generating and triggering browser download of a .txt file for manual Anki import |
| `src/scripts/state/selection.js` | 141 | word and sentence selection state and change notifications via CustomEvents |
| `src/scripts/state/tabs.js` | 88 | active tab state, DOM panel switching, and tabchange event dispatch |
| `src/scripts/ui/cards.js` | 77 | word card collapse/expand toggling and deselect button handling |
| `src/scripts/ui/exportPane.js` | 235 | export pane controller — word table, AnkiConnect status polling, export button |
| `src/scripts/ui/indexSidebar.js` | 120 | sidebar interactions — drag-select checkboxes, group collapse, scroll-to-card |
| `src/scripts/ui/search.js` | 192 | fuzzy search scoring and filtering word/sentence card visibility |
| `src/scripts/ui/tooltip.js` | 180 | vocab-hint span annotation in example cards and tooltip positioning |
| `src/scripts/utils/stringUtils.js` | 28 | shared diacritic-stripping norm() utility used by search.js and tooltip.js |
| `src/scripts/data.js` | 43 | lazy read-only accessors for window.__APP_DATA__ (set by define:vars in index.astro) |
| `src/scripts/main.js` | 34 | bootstrapper — imports all modules and initialises them after DOMContentLoaded |
| `src/utils/cardHelpers.ts` | 81 | pure helper functions shared across WordCard section components |
| `src/utils/highlight.ts` | 121 | rich text highlighting for vocabulary card text content |
| `src/utils/types.ts` | 32 | shared TypeScript interfaces used across Astro components and client scripts |
| `scripts/aggregate-changelog.js` | 54 | aggregating individual changelog/ entries into CHANGELOG.md |
| `scripts/arch.js` | 364 | scanning src/ source files and generating ARCHITECTURE.md |
| `scripts/new-changelog.js` | 55 | creating a new individual changelog entry file in changelog/ |

---

## File Details

### `scripts/`

#### `aggregate-changelog.js`
**Responsibility:** aggregating individual changelog/ entries into CHANGELOG.md  
**Lines:** 54

#### `arch.js`
**Responsibility:** scanning src/ source files and generating ARCHITECTURE.md  
**Lines:** 364
**Functions:**
- `walk()` _(internal)_ — Recursively walks a directory, returning all matching source files sorted
- `extractResponsibility()` _(internal)_ — Extracts the one-liner "Responsible for:" text from a `// Responsible for:` comment.
- `extractImports()` _(internal)_ — Extracts all import paths from a file's import declarations.
- `extractExports()` _(internal)_ — Extracts all export declarations (function names, const names) from a file.
- `extractFunctions()` _(internal)_ — Extracts all function names and their JSDoc descriptions from a file.
- `countLines()` _(internal)_ — Counts the number of lines in a text string.
- `detectImprovements()` _(internal)_ — Scans all file info objects and produces auto-detected improvement notes.
- `groupByDirectory()` _(internal)_ — Groups file info objects by their directory relative to ROOT.
- `renderMarkdown()` _(internal)_ — Renders the complete ARCHITECTURE.md content as a string.

#### `new-changelog.js`
**Responsibility:** creating a new individual changelog entry file in changelog/  
**Lines:** 55

### `src/components/`

#### `MobileHeader.astro`
**Responsibility:** mobile-only page header with title and search input (hidden on lg+)  
**Lines:** 13

#### `SentenceCard.astro`
**Responsibility:** sentence card placeholder — to be implemented once sentences/*.json format is defined  
**Lines:** 18

#### `WordCard.astro`
**Responsibility:** word card shell — header row + section delegation  
**Lines:** 95
**Depends on:** `../utils/cardHelpers`, `../utils/types`, `./cards/sections/FormsSection.astro`, `./cards/sections/PronunciationSection.astro`, `./cards/sections/MemorySection.astro`, `./cards/sections/ExamplesSection.astro`, `./cards/sections/RootOriginSection.astro`, `./cards/sections/SoundAlikesSection.astro`, `./cards/sections/UrduPunjabiSection.astro`, `./cards/sections/CrossLangSection.astro`

### `src/components/cards/sections/`

#### `CrossLangSection.astro`
**Responsibility:** Cross-Language Connections expandable section inside a word card  
**Lines:** 49
**Depends on:** `../../../utils/cardHelpers`, `../../../utils/highlight`, `../../../utils/types`

#### `ExamplesSection.astro`
**Responsibility:** Examples expandable section inside a word card  
**Lines:** 43
**Depends on:** `../../../utils/cardHelpers`, `../../../utils/highlight`, `../../../utils/types`

#### `FormsSection.astro`
**Responsibility:** forms chips row + secondary meanings + usage note + grouped words inside a word card  
**Lines:** 55
**Depends on:** `../../../utils/cardHelpers`, `../../../utils/types`

#### `MemorySection.astro`
**Responsibility:** Memory Hook expandable section inside a word card  
**Lines:** 36
**Depends on:** `../../../utils/cardHelpers`, `../../../utils/highlight`

#### `PronunciationSection.astro`
**Responsibility:** Pronunciation expandable section inside a word card  
**Lines:** 58
**Depends on:** `../../../utils/cardHelpers`, `../../../utils/highlight`, `../../../utils/types`

#### `RootOriginSection.astro`
**Responsibility:** Root & Origin and Etymology Story expandable sections inside a word card  
**Lines:** 91
**Depends on:** `../../../utils/highlight`, `../../../utils/types`

#### `SoundAlikesSection.astro`
**Responsibility:** Sound Alikes expandable section inside a word card  
**Lines:** 34
**Depends on:** `../../../utils/cardHelpers`, `../../../utils/highlight`, `../../../utils/types`

#### `UrduPunjabiSection.astro`
**Responsibility:** Urdu & Punjabi expandable section inside a word card  
**Lines:** 51
**Depends on:** `../../../utils/cardHelpers`, `../../../utils/highlight`, `../../../utils/types`

### `src/components/sidebar/`

#### `AppSidebar.astro`
**Responsibility:** desktop sidebar — logo, search bar, words index nav, sentences index nav  
**Lines:** 86

### `src/components/tabs/`

#### `ExportTab.astro`
**Responsibility:** Export/Delivery pane HTML — word summary table and Anki settings panel  
**Lines:** 81

#### `SentencesTab.astro`
**Responsibility:** Sentences tab content — sentence cards grid, empty states  
**Lines:** 30
**Depends on:** `../SentenceCard.astro`

#### `WordsTab.astro`
**Responsibility:** Words tab content — meta line, word cards grid, empty state, footer  
**Lines:** 41
**Depends on:** `../WordCard.astro`

### `src/components/ui/`

#### `TabBar.astro`
**Responsibility:** DaVinci Resolve-style bottom-fixed tab bar (Words | Sentences | Export)  
**Lines:** 28

### `src/layouts/`

#### `Layout.astro`
**Responsibility:** root HTML shell — doctype, meta tags, font imports, global CSS, slot  
**Lines:** 28

### `src/pages/`

#### `index.astro`
**Responsibility:** page entry point — loads vocab data, passes it to components, renders app shell  
**Lines:** 109
**Depends on:** `../layouts/Layout.astro`, `../components/sidebar/AppSidebar.astro`, `../components/tabs/WordsTab.astro`, `../components/tabs/SentencesTab.astro`, `../components/tabs/ExportTab.astro`, `../components/ui/TabBar.astro`, `../components/MobileHeader.astro`

### `src/scripts/`

#### `data.js`
**Responsibility:** lazy read-only accessors for window.__APP_DATA__ (set by define:vars in index.astro)  
**Lines:** 43
**Exports:** `getAllWords`, `getHoverData`, `getSentenceIndex`, `getWordGroupTitles`, `getWordSearchIndex`
**Functions:**
- `getAllWords()` — Returns the full array of all vocabulary word objects across all loaded JSON files.
- `getWordGroupTitles()` — Returns a sparse array mapping word index → source file title (used for deck name defaults).
- `getWordSearchIndex()` — Returns the compact search index for words: [{ i, h, r, e, d }].
- `getSentenceIndex()` — Returns the compact search index for sentences: [{ i, h, r, e, d }].
- `getHoverData()` — Returns minimal hover data for each word: [{ i, hindi, roman, english, forms }].

#### `main.js`
**Responsibility:** bootstrapper — imports all modules and initialises them after DOMContentLoaded  
**Lines:** 34
**Depends on:** `./state/selection.js`, `./state/tabs.js`, `./ui/search.js`, `./ui/cards.js`, `./ui/indexSidebar.js`, `./ui/tooltip.js`, `./ui/exportPane.js`

### `src/scripts/anki/`

#### `connect.js`
**Responsibility:** AnkiConnect HTTP API wrapper and connection status check  
**Lines:** 43
**Exports:** `ankiRequest`, `checkAnkiConnect`
**Functions:**
- `ankiRequest()` — Sends a JSON-RPC request to AnkiConnect and returns the result.
- `checkAnkiConnect()` — Checks whether AnkiConnect is reachable by requesting its version.

#### `export.js`
**Responsibility:** orchestrating Anki deck creation, note type verification, and card addition  
**Lines:** 104
**Depends on:** `./connect.js`, `./noteType.js`, `./fields/index.js`, `./tagUtils.js`
**Exports:** `overrideDeck`, `sendToAnki`
**Functions:**
- `ensureNoteType()` _(internal)_ — Creates the note type if it does not exist, or syncs its CSS and templates if it does.
- `buildNotes()` _(internal)_ — Converts an array of vocabulary words into Anki note objects ready for the API.
- `sendToAnki()` — Exports selected words to Anki, skipping cards that already exist in the deck.
- `overrideDeck()` — Replaces all cards in the target deck with the given words.

#### `noteType.js`
**Responsibility:** Anki note type definition — CSS, front/back card templates, field list  
**Lines:** 96
**Exports:** `ANKI_BACK`, `ANKI_CSS`, `ANKI_FIELDS`, `ANKI_FRONT`, `ANKI_NOTE_TYPE`

#### `tagUtils.js`
**Responsibility:** shared Anki tag-building utility used by export.js and txtFallback.js  
**Lines:** 34
**Exports:** `buildWordTags`
**Functions:**
- `buildWordTags()` — Builds the Anki tag list for a single vocabulary word.

#### `txtFallback.js`
**Responsibility:** generating and triggering browser download of a .txt file for manual Anki import  
**Lines:** 50
**Depends on:** `./noteType.js`, `./fields/index.js`, `./tagUtils.js`
**Exports:** `downloadAnkiTxt`
**Functions:**
- `downloadAnkiTxt()` — Builds a tab-separated Anki import file and triggers a browser download.

### `src/scripts/anki/fields/`

#### `category.js`
**Responsibility:** building the Anki Category HTML field  
**Lines:** 25
**Depends on:** `./utils.js`
**Exports:** `buildAnkiCategory`
**Functions:**
- `buildAnkiCategory()` — Builds the Anki Category field HTML for a word.

#### `crossLang.js`
**Responsibility:** building the Anki Cross-Language HTML field  
**Lines:** 56
**Depends on:** `./utils.js`
**Exports:** `buildAnkiCrossLang`
**Functions:**
- `renderItem()` _(internal)_ — Renders a single cross-language item (relative or coincidence) as an HTML card.
- `buildAnkiCrossLang()` — Builds the Anki CrossLanguage field HTML for a word.

#### `examples.js`
**Responsibility:** building the Anki Examples HTML field  
**Lines:** 33
**Depends on:** `./utils.js`
**Exports:** `buildAnkiExamples`
**Functions:**
- `buildAnkiExamples()` — Builds the Anki Examples field HTML for a word.

#### `forms.js`
**Responsibility:** building the Anki Forms HTML field (chips + secondary meanings)  
**Lines:** 47
**Depends on:** `./utils.js`
**Exports:** `buildAnkiForms`
**Functions:**
- `buildAnkiForms()` — Builds the Anki Forms field HTML for a word.

#### `index.js`
**Responsibility:** assembling wordToAnkiFields() from all individual field builders  
**Lines:** 47
**Depends on:** `./category.js`, `./forms.js`, `./examples.js`, `./memory.js`, `./rootOrigin.js`, `./soundAlikes.js`, `./urduPunjabi.js`, `./crossLang.js`, `./pronunciation.js`, `./utils.js`
**Exports:** `wordToAnkiFields`
**Functions:**
- `wordToAnkiFields()` — Converts a vocabulary word object into a complete Anki fields object.

#### `memory.js`
**Responsibility:** building the Anki Memory Hook HTML field  
**Lines:** 45
**Depends on:** `./utils.js`
**Exports:** `buildAnkiMemory`
**Functions:**
- `buildAnkiMemory()` — Builds the Anki Memory field HTML for a word.

#### `pronunciation.js`
**Responsibility:** building the Anki Pronunciation HTML field  
**Lines:** 56
**Depends on:** `./utils.js`
**Exports:** `buildAnkiPronunciation`
**Functions:**
- `renderTip()` _(internal)_ — Renders a single pronunciation tip row (optional language label + sounds-like + tip text).
- `buildAnkiPronunciation()` — Builds the Anki Pronunciation field HTML for a word.

#### `rootOrigin.js`
**Responsibility:** building the Anki Root & Origin and Etymology Story HTML fields  
**Lines:** 104
**Depends on:** `./utils.js`
**Exports:** `buildAnkiRootOrigin`
**Functions:**
- `renderRootHeader()` _(internal)_ — Renders root parts list, optional "via" note, and the root object/string.
- `renderEvolution()` _(internal)_ — Renders the evolution chain (array of steps or a plain string).
- `renderEtymology()` _(internal)_ — Renders the etymology story block (heading + one paragraph per line).
- `buildAnkiRootOrigin()` — Builds the Anki RootOrigin field HTML for a word.

#### `soundAlikes.js`
**Responsibility:** building the Anki Sound Alikes HTML field  
**Lines:** 48
**Depends on:** `./utils.js`
**Exports:** `buildAnkiSoundAlikes`
**Functions:**
- `buildAnkiSoundAlikes()` — Builds the Anki SoundAlikes field HTML for a word.

#### `urduPunjabi.js`
**Responsibility:** building the Anki Urdu & Punjabi HTML field  
**Lines:** 63
**Depends on:** `./utils.js`
**Exports:** `buildAnkiUrduPunjabi`
**Functions:**
- `renderLang()` _(internal)_ — Renders a single Urdu or Punjabi entry as a clang-item card.
- `buildAnkiUrduPunjabi()` — Builds the Anki UrduPunjabi field HTML for a word.

#### `utils.js`
**Responsibility:** shared HTML-building utilities for Anki card field builders  
**Lines:** 109
**Exports:** `aSection`, `ankiCategoryStyle`, `ankiChipStyle`, `capFirst`, `esc`, `langHex`
**Functions:**
- `esc()` — HTML-escapes a value for safe insertion into card HTML.
- `langHex()` — Returns a hex colour accent for a given language name, matching the website palette.
- `ankiCategoryStyle()` — Returns an inline CSS style string for a word-category badge chip.
- `ankiChipStyle()` — Returns an inline CSS style string for a form chip (gender/inflection badge).
- `capFirst()` — Capitalises the first character of a string.
- `aSection()` — Renders a styled section box with a coloured top border and label.

### `src/scripts/state/`

#### `selection.js`
**Responsibility:** word and sentence selection state and change notifications via CustomEvents  
**Lines:** 141
**Depends on:** `../data.js`
**Exports:** `getDefaultDeckName`, `getSelectedSentenceIndices`, `getSelectedWordIndices`, `getSelectedWordObjects`, `hasSentence`, `hasWord`, `initSelection`, `setSentenceSelected`, `setWordSelected`, `syncGroupCheckbox`
**Functions:**
- `initSelection()` — Seeds initial selection: all words and sentences are selected on load.
- `notifySelectionChanged()` _(internal)_ — Dispatches a 'selectionchange' CustomEvent on the window so listeners
- `setWordSelected()` — Adds or removes a word index from the selection and syncs the sidebar checkbox.
- `setSentenceSelected()` — Adds or removes a sentence index from the selection and syncs the sidebar checkbox.
- `hasWord()` — Returns true if the word at the given index is currently selected.
- `hasSentence()` — Returns true if the sentence at the given index is currently selected.
- `getSelectedWordIndices()` — Returns an array of all currently selected word indices.
- `getSelectedSentenceIndices()` — Returns an array of all currently selected sentence indices.
- `getSelectedWordObjects()` — Resolves selected word indices to their full word objects.
- `getDefaultDeckName()` — Suggests a default Anki deck name based on the first selected word's source group.
- `syncGroupCheckbox()` — Syncs a group's master checkbox to reflect whether all its words are selected.

#### `tabs.js`
**Responsibility:** active tab state, DOM panel switching, and tabchange event dispatch  
**Lines:** 88
**Exports:** `getActiveTab`, `initTabs`, `switchTab`
**Functions:**
- `getActiveTab()` — Returns the currently active tab name.
- `initTabs()` — Wires click handlers on all [data-tab] buttons and activates the Words tab.
- `updateTabBarButtons()` _(internal)_ — Updates [data-tab] button styling to reflect which tab is now active.
- `switchTab()` — Activates a tab by name: shows its content panel, hides the others,

### `src/scripts/ui/`

#### `cards.js`
**Responsibility:** word card collapse/expand toggling and deselect button handling  
**Lines:** 77
**Depends on:** `../state/selection.js`
**Exports:** `initCards`
**Functions:**
- `initScrollHighlight()` _(internal)_ — Sets up an IntersectionObserver that highlights the matching sidebar row whenever
- `initCards()` — Initialises card interactions:

#### `exportPane.js`
**Responsibility:** export pane controller — word table, AnkiConnect status polling, export button  
**Lines:** 235
**Depends on:** `../anki/connect.js`, `../anki/export.js`, `../anki/txtFallback.js`, `../state/selection.js`
**Exports:** `initExportPane`
**Functions:**
- `updateStatusBadge()` _(internal)_ — Updates the AnkiConnect status badge and export button state.
- `pollAnkiStatus()` _(internal)_ — Checks AnkiConnect status and updates the badge with the result.
- `startPolling()` _(internal)_ — Starts polling AnkiConnect every 3 seconds. No-op if already polling.
- `stopPolling()` _(internal)_ — Stops the AnkiConnect poll interval.
- `populateWordTable()` _(internal)_ — Rebuilds the selected-word table in the export panel.
- `showFeedback()` _(internal)_ — Displays a success or error message below the export buttons.
- `buildSendMessage()` _(internal)_ — Builds the success feedback message for an incremental Anki export.
- `handleExportClick()` _(internal)_ — Handles the export button click: validates, runs the export/override API call,
- `wireWindowListeners()` _(internal)_ — Wires window-level event listeners for tab changes and selection changes.
- `wireControlListeners()` _(internal)_ — Wires DOM element listeners for the deck input, override toggle, export button,
- `initExportPane()` — Initialises the export pane.
- `plural()` _(internal)_ — Returns 's' when n !== 1 — used for pluralising feedback messages.

#### `indexSidebar.js`
**Responsibility:** sidebar interactions — drag-select checkboxes, group collapse, scroll-to-card  
**Lines:** 120
**Depends on:** `../state/selection.js`
**Exports:** `initSidebar`
**Functions:**
- `handleSidebarClick()` _(internal)_ — Handles a delegated click inside the words index sidebar.
- `initSidebar()` — Initialises all sidebar event listeners on the #idx-words element.

#### `search.js`
**Responsibility:** fuzzy search scoring and filtering word/sentence card visibility  
**Lines:** 192
**Depends on:** `../data.js`, `../state/selection.js`, `../state/tabs.js`, `../utils/stringUtils.js`
**Exports:** `applyFilter`, `getWordRowMap`, `initSearch`
**Functions:**
- `fuzzyScore()` _(internal)_ — Scores how well a search needle fuzzy-matches a single haystack string.
- `bestScore()` _(internal)_ — Returns the best fuzzy score for a needle against all searchable fields
- `getWordRowMap()` — Returns the word-index → sidebar-row DOM map built during {@link initSearch}.
- `initSearch()` — Initialises search by caching DOM elements and wiring input/clear event listeners.
- `filterWords()` _(internal)_ — Applies the search filter to the words tab: shows/hides cards and sidebar rows,
- `filterSentences()` _(internal)_ — Applies the search filter to the sentences tab: shows/hides cards and sidebar rows,
- `applyFilter()` — Applies the current search query and selection state to show/hide cards and rows.

#### `tooltip.js`
**Responsibility:** vocab-hint span annotation in example cards and tooltip positioning  
**Lines:** 180
**Depends on:** `../data.js`, `../utils/stringUtils.js`
**Exports:** `initTooltip`
**Functions:**
- `escAttr()` _(internal)_ — Escapes a string for safe use as an HTML attribute value.
- `annotateHindi()` _(internal)_ — Wraps Devanagari words in text with .vocab-hint spans if they exist in hindiMap.
- `annotateRoman()` _(internal)_ — Wraps romanised words in text with .vocab-hint spans if they exist in romanMap.
- `buildLookupMaps()` _(internal)_ — Builds Hindi and romanisation lookup maps from hover data, including inflected forms.
- `annotateExampleCards()` _(internal)_ — Annotates all example card paragraphs with vocab-hint spans, skipping the card's
- `wireTooltipHover()` _(internal)_ — Wires the document-level mouseover handler that shows and positions the tooltip.
- `initTooltip()` — Initialises tooltip functionality:

### `src/scripts/utils/`

#### `stringUtils.js`
**Responsibility:** shared diacritic-stripping norm() utility used by search.js and tooltip.js  
**Lines:** 28
**Exports:** `norm`
**Functions:**
- `norm()` — Strips diacritical marks and lowercases a string for diacritic-insensitive comparison.

### `src/utils/`

#### `cardHelpers.ts`
**Responsibility:** pure helper functions shared across WordCard section components  
**Lines:** 81
**Exports:** `cap`, `categoryStyle`, `chipClass`, `formatDate`, `langColor`, `registerStyle`
**Functions:**
- `formatDate()` — Formats an ISO date string (YYYY-MM-DD) as a human-readable label.
- `chipClass()` — Returns the Tailwind CSS class string for a form chip based on its label.
- `categoryStyle()` — Returns the Tailwind CSS class string for a word-category badge.
- `registerStyle()` — Returns the Tailwind CSS class string for an example-sentence register badge.
- `langColor()` — Returns a Tailwind text-colour class for a given language name.
- `cap()` — Capitalises the first character of a string.

#### `highlight.ts`
**Responsibility:** rich text highlighting for vocabulary card text content  
**Lines:** 121
**Exports:** `highlight`, `parseCrossLangLabel`
**Functions:**
- `highlight()` — Applies inline HTML highlighting to a plain-text vocabulary description.
- `parseCrossLangLabel()` — Parses a legacy string-format cross-language entry into a label + text pair.

#### `types.ts`
**Responsibility:** shared TypeScript interfaces used across Astro components and client scripts  
**Lines:** 32
**Exports:** `CrossLangConnections`, `CrossLangItem`, `Example`, `Form`, `GroupedWith`, `HoverEntry`, `MemoryHook`, `PronBreakdownItem`, `PronExtraNote`, `PronTip`, `PronunciationGuide`, `RootBreakdown`, `RootEvolutionStep`, `RootPart`, `RootRoot`, `SearchEntry`, `SoundAlike`, `UrduPunjabi`, `UrduPunjabiEntry`, `WordGroup`

---

## Auto-detected Improvement Notes

- **Functions with the same name in multiple files** (review for shared-util extraction):
  - `main` in `scripts/aggregate-changelog.js` and `scripts/arch.js`
