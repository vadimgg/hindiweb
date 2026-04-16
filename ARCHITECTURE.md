# Architecture

_Generated 2026-04-16 by `npm run arch`._

---

## Overview

| File | Lines | Responsible for |
|---|---|---|
| `src/components/cards/sections/CollocationsSection.astro` | 35 | Collocations expandable section inside a word card |
| `src/components/cards/sections/DelhiNoteSection.astro` | 33 | Delhi Usage expandable section inside a word card |
| `src/components/cards/sections/EtymologySection.astro` | 64 | Etymology expandable section inside a word card |
| `src/components/cards/sections/ExampleSentenceSection.astro` | 52 | Example Sentence expandable section inside a word card |
| `src/components/cards/sections/FormsSection.astro` | 44 | forms chips row + english usage note inside a word card |
| `src/components/cards/sections/MorphemesSection.astro` | 41 | Morphemes expandable section inside a word card |
| `src/components/cards/sections/RelatedWordsSection.astro` | 35 | Related Words expandable section inside a word card |
| `src/components/cards/sections/SoundAlikesSection.astro` | 40 | Sound Alikes expandable section inside a word card |
| `src/components/cards/sections/UsageNotesSection.astro` | 27 | Usage Notes expandable section inside a word card, open by default |
| `src/components/cards/sections/WordBreakdownSection.astro` | 135 | Word Breakdown expandable section inside a sentence card |
| `src/components/sidebar/AppSidebar.astro` | 86 | desktop sidebar — logo, search bar, words index nav, sentences index nav |
| `src/components/tabs/ExportTab.astro` | 184 | Deliver/Export page — AnkiConnect status, deck config, selected items, send button |
| `src/components/tabs/SentencesTab.astro` | 154 | Sentences page content — header, filter panel, chapter dividers, sentence cards |
| `src/components/tabs/WordsTab.astro` | 241 | Words page content — header, filter panel, group dividers, word cards |
| `src/components/ui/TabBar.astro` | 28 | DaVinci Resolve-style bottom-fixed tab bar (Words | Sentences | Export) |
| `src/components/MobileHeader.astro` | 13 | mobile-only page header with title and search input (hidden on lg+) |
| `src/components/NavBar.astro` | 60 | sticky top nav bar with brand mark and page-switching buttons |
| `src/components/SentenceCard.astro` | 127 | rendering a single sentence card with header and expandable detail sections |
| `src/components/SentenceList.astro` | 40 | chapter-grouped sentence list with group headers |
| `src/components/WordCard.astro` | 181 | word card shell — header row + section delegation |
| `src/layouts/Layout.astro` | 28 | root HTML shell — doctype, meta tags, font imports, global CSS, slot |
| `src/pages/index.astro` | 122 | page entry point — loads vocab data, passes it to components, renders app shell |
| `src/scripts/anki/fields/audio.js` | 30 | building the Anki Audio field with [sound:] syntax for word pronunciation |
| `src/scripts/anki/fields/category.js` | 25 | building the Anki Category HTML field |
| `src/scripts/anki/fields/collocations.js` | 42 | building the Anki Collocations HTML field |
| `src/scripts/anki/fields/delhiNote.js` | 26 | building the Anki DelhiNote HTML field |
| `src/scripts/anki/fields/etymology.js` | 66 | building the Anki Etymology HTML field |
| `src/scripts/anki/fields/exampleSentence.js` | 49 | building the Anki ExampleSentence HTML field |
| `src/scripts/anki/fields/forms.js` | 36 | building the Anki Forms HTML field (inflected form chips) |
| `src/scripts/anki/fields/gender.js` | 24 | building the Anki Gender HTML field |
| `src/scripts/anki/fields/index.js` | 67 | assembling wordToAnkiFields() from all individual field builders |
| `src/scripts/anki/fields/morphemes.js` | 50 | building the Anki Morphemes HTML field |
| `src/scripts/anki/fields/relatedWords.js` | 44 | building the Anki RelatedWords HTML field |
| `src/scripts/anki/fields/sentenceBreakdown.js` | 50 | WordBreakdown Anki field HTML for Hindi Sentence note type |
| `src/scripts/anki/fields/soundAlikes.js` | 56 | building the Anki Sound Alikes HTML field |
| `src/scripts/anki/fields/syllables.js` | 19 | building the Anki Syllables plain-text field |
| `src/scripts/anki/fields/transitivity.js` | 24 | building the Anki Transitivity HTML field |
| `src/scripts/anki/fields/usageNotes.js` | 26 | building the Anki UsageNotes HTML field |
| `src/scripts/anki/fields/utils.js` | 109 | shared HTML-building utilities for Anki card field builders |
| `src/scripts/anki/connect.js` | 46 | AnkiConnect HTTP API wrapper and connection status check |
| `src/scripts/anki/export.js` | 248 | orchestrating Anki deck creation, note type verification, and card addition |
| `src/scripts/anki/noteType.js` | 134 | Anki note type definition — CSS, front/back card templates, field list |
| `src/scripts/anki/sentenceNoteType.js` | 96 | Anki sentence note type definition — CSS, templates, field list |
| `src/scripts/anki/tagUtils.js` | 35 | shared Anki tag-building utility used by export.js and txtFallback.js |
| `src/scripts/anki/txtFallback.js` | 50 | generating and triggering browser download of a .txt file for manual Anki import |
| `src/scripts/state/selection.js` | 136 | word and sentence selection state and change notifications via CustomEvents |
| `src/scripts/state/tabs.js` | 87 | active tab state, DOM panel switching, and tabchange event dispatch |
| `src/scripts/ui/ankiPreview.js` | 131 | rendering Anki flip-card previews for selected words in the Words page Anki mode area |
| `src/scripts/ui/audio.js` | 56 | delegated audio playback handler for .wc-audio-btn elements |
| `src/scripts/ui/cards.js` | 78 | word card collapse/expand toggling and deselect button handling |
| `src/scripts/ui/exportPane.js` | 409 | deliver page controller — word list, sentence list, AnkiConnect polling, export button |
| `src/scripts/ui/indexSidebar.js` | 120 | sidebar interactions — drag-select checkboxes, group collapse, scroll-to-card |
| `src/scripts/ui/pageInteractions.js` | 518 | page-level interactions — filter panel, group collapse, sel-circle, drag-select |
| `src/scripts/ui/search.js` | 198 | fuzzy search scoring and filtering word/sentence card visibility |
| `src/scripts/ui/sentenceCards.js` | 29 | sentence card collapse/expand toggling |
| `src/scripts/ui/tooltip.js` | 180 | vocab-hint span annotation in example cards and tooltip positioning |
| `src/scripts/utils/stringUtils.js` | 52 | shared string utilities — norm(), extractDevanagari(), extractPartLabel() |
| `src/scripts/data.js` | 49 | lazy read-only accessors for window.__APP_DATA__ (set by define:vars in index.astro) |
| `src/scripts/main.js` | 39 | bootstrapper — imports all modules and initialises them after DOMContentLoaded |
| `src/utils/audioHelpers.ts` | 31 | resolving audio file paths for words and sentences from their JSON fields |
| `src/utils/cardHelpers.ts` | 119 | pure helper functions shared across WordCard section components |
| `src/utils/highlight.ts` | 121 | rich text highlighting for vocabulary card text content |
| `src/utils/types.ts` | 108 | shared TypeScript interfaces used across Astro components and client scripts |
| `scripts/aggregate-changelog.js` | 54 | aggregating individual changelog/ entries into CHANGELOG.md |
| `scripts/arch.js` | 364 | scanning src/ source files and generating ARCHITECTURE.md |
| `scripts/coverage.js` | 295 | scanning vocab/words/ JSON files and generating FIELD_REGISTRY.md |
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

#### `coverage.js`
**Responsibility:** scanning vocab/words/ JSON files and generating FIELD_REGISTRY.md  
**Lines:** 295
**Functions:**
- `listFiles()` _(internal)_ — Returns all files in a directory with the given extension (non-recursive).
- `readText()` _(internal)_ — Reads a file and returns its text, or empty string on error.
- `typeLabel()` _(internal)_ — Infers a human-readable type label for a field value.
- `extractVocabFields()` _(internal)_ — Reads all vocab JSON files, extracts top-level word fields, and returns a
- `fieldFound()` _(internal)_ — Checks whether a field name is referenced in a body of text.
- `coveredIn()` _(internal)_ — Checks coverage of a field name across all texts from a surface.
- `renderMarkdown()` _(internal)_ — Renders the FIELD_REGISTRY.md content.

#### `new-changelog.js`
**Responsibility:** creating a new individual changelog entry file in changelog/  
**Lines:** 55

### `src/components/`

#### `MobileHeader.astro`
**Responsibility:** mobile-only page header with title and search input (hidden on lg+)  
**Lines:** 13

#### `NavBar.astro`
**Responsibility:** sticky top nav bar with brand mark and page-switching buttons  
**Lines:** 60

#### `SentenceCard.astro`
**Responsibility:** rendering a single sentence card with header and expandable detail sections  
**Lines:** 127
**Depends on:** `../utils/cardHelpers`, `../utils/audioHelpers`, `../utils/types`, `./cards/sections/WordBreakdownSection.astro`

#### `SentenceList.astro`
**Responsibility:** chapter-grouped sentence list with group headers  
**Lines:** 40
**Depends on:** `./SentenceCard.astro`, `../utils/types`

#### `WordCard.astro`
**Responsibility:** word card shell — header row + section delegation  
**Lines:** 181
**Depends on:** `../utils/cardHelpers`, `../utils/audioHelpers`, `../utils/types`, `./cards/sections/FormsSection.astro`, `./cards/sections/MorphemesSection.astro`, `./cards/sections/UsageNotesSection.astro`, `./cards/sections/CollocationsSection.astro`, `./cards/sections/RelatedWordsSection.astro`, `./cards/sections/SoundAlikesSection.astro`, `./cards/sections/ExampleSentenceSection.astro`, `./cards/sections/DelhiNoteSection.astro`, `./cards/sections/EtymologySection.astro`

### `src/components/cards/sections/`

#### `CollocationsSection.astro`
**Responsibility:** Collocations expandable section inside a word card  
**Lines:** 35
**Depends on:** `../../../utils/types`

#### `DelhiNoteSection.astro`
**Responsibility:** Delhi Usage expandable section inside a word card  
**Lines:** 33

#### `EtymologySection.astro`
**Responsibility:** Etymology expandable section inside a word card  
**Lines:** 64
**Depends on:** `../../../utils/types`

#### `ExampleSentenceSection.astro`
**Responsibility:** Example Sentence expandable section inside a word card  
**Lines:** 52
**Depends on:** `../../../utils/types`

#### `FormsSection.astro`
**Responsibility:** forms chips row + english usage note inside a word card  
**Lines:** 44
**Depends on:** `../../../utils/types`

#### `MorphemesSection.astro`
**Responsibility:** Morphemes expandable section inside a word card  
**Lines:** 41
**Depends on:** `../../../utils/types`

#### `RelatedWordsSection.astro`
**Responsibility:** Related Words expandable section inside a word card  
**Lines:** 35
**Depends on:** `../../../utils/types`

#### `SoundAlikesSection.astro`
**Responsibility:** Sound Alikes expandable section inside a word card  
**Lines:** 40
**Depends on:** `../../../utils/cardHelpers`, `../../../utils/types`

#### `UsageNotesSection.astro`
**Responsibility:** Usage Notes expandable section inside a word card, open by default  
**Lines:** 27
**Depends on:** `../../../utils/highlight`

#### `WordBreakdownSection.astro`
**Responsibility:** Word Breakdown expandable section inside a sentence card  
**Lines:** 135
**Depends on:** `../../../utils/types`

### `src/components/sidebar/`

#### `AppSidebar.astro`
**Responsibility:** desktop sidebar — logo, search bar, words index nav, sentences index nav  
**Lines:** 86

### `src/components/tabs/`

#### `ExportTab.astro`
**Responsibility:** Deliver/Export page — AnkiConnect status, deck config, selected items, send button  
**Lines:** 184

#### `SentencesTab.astro`
**Responsibility:** Sentences page content — header, filter panel, chapter dividers, sentence cards  
**Lines:** 154
**Depends on:** `../SentenceCard.astro`, `../../utils/types`

#### `WordsTab.astro`
**Responsibility:** Words page content — header, filter panel, group dividers, word cards  
**Lines:** 241
**Depends on:** `../WordCard.astro`, `../../utils/cardHelpers`, `../../utils/audioHelpers`

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
**Lines:** 122
**Depends on:** `../layouts/Layout.astro`, `../components/NavBar.astro`, `../components/tabs/WordsTab.astro`, `../components/tabs/SentencesTab.astro`, `../components/tabs/ExportTab.astro`

### `src/scripts/`

#### `data.js`
**Responsibility:** lazy read-only accessors for window.__APP_DATA__ (set by define:vars in index.astro)  
**Lines:** 49
**Exports:** `getAllSentences`, `getAllWords`, `getHoverData`, `getSentenceIndex`, `getWordGroupTitles`, `getWordSearchIndex`
**Functions:**
- `getAllWords()` — Returns the full array of all vocabulary word objects across all loaded JSON files.
- `getWordGroupTitles()` — Returns a sparse array mapping word index → source file title (used for deck name defaults).
- `getWordSearchIndex()` — Returns the compact search index for words: [{ i, h, r, e, d }].
- `getSentenceIndex()` — Returns the compact search index for sentences: [{ i, h, r, e, d }].
- `getHoverData()` — Returns minimal hover data for each word: [{ i, hindi, roman, english, forms }].
- `getAllSentences()` — Returns the full array of all sentence objects across all loaded sentence JSON files.

#### `main.js`
**Responsibility:** bootstrapper — imports all modules and initialises them after DOMContentLoaded  
**Lines:** 39
**Depends on:** `./state/selection.js`, `./state/tabs.js`, `./ui/search.js`, `./ui/pageInteractions.js`, `./ui/tooltip.js`, `./ui/exportPane.js`, `./ui/ankiPreview.js`, `./ui/audio.js`

### `src/scripts/anki/`

#### `connect.js`
**Responsibility:** AnkiConnect HTTP API wrapper and connection status check  
**Lines:** 46
**Exports:** `ankiRequest`, `checkAnkiConnect`
**Functions:**
- `ankiRequest()` — Sends a JSON-RPC request to AnkiConnect and returns the result.
- `checkAnkiConnect()` — Checks whether AnkiConnect is reachable by requesting its version.

#### `export.js`
**Responsibility:** orchestrating Anki deck creation, note type verification, and card addition  
**Lines:** 248
**Depends on:** `./connect.js`, `./noteType.js`, `./fields/index.js`, `./fields/sentenceBreakdown.js`, `./tagUtils.js`, `./fields/utils.js`
**Exports:** `ensureSentenceNoteType`, `overrideDeck`, `sendToAnki`, `sentenceToAnkiFields`, `uploadSentenceAudio`
**Functions:**
- `ensureNoteType()` _(internal)_ — Creates the note type if it does not exist, or syncs its CSS and templates if it does.
- `buildNotes()` _(internal)_ — Converts an array of vocabulary words into Anki note objects ready for the API.
- `ensureSentenceNoteType()` — Creates the Hindi Sentence note type if it does not exist, or syncs its CSS and
- `sentenceToAnkiFields()` — Converts a sentence object into the Anki fields object for the Hindi Sentence note type.
- `uploadSentenceAudio()` — Fetches a sentence's audio file and uploads it to Anki's media store via
- `uploadWordAudio()` _(internal)_ — Fetches a word's normal audio file and uploads it to Anki's media store via
- `sendToAnki()` — Exports selected words to Anki, skipping cards that already exist in the deck.
- `overrideDeck()` — Replaces all cards in the target deck with the given words.

#### `noteType.js`
**Responsibility:** Anki note type definition — CSS, front/back card templates, field list  
**Lines:** 134
**Exports:** `ANKI_BACK`, `ANKI_CSS`, `ANKI_FIELDS`, `ANKI_FRONT`, `ANKI_NOTE_TYPE`

#### `sentenceNoteType.js`
**Responsibility:** Anki sentence note type definition — CSS, templates, field list  
**Lines:** 96
**Depends on:** `./noteType.js`
**Exports:** `ANKI_SENTENCE_BACK`, `ANKI_SENTENCE_CSS`, `ANKI_SENTENCE_FIELDS`, `ANKI_SENTENCE_FRONT`, `ANKI_SENTENCE_NOTE_TYPE`

#### `tagUtils.js`
**Responsibility:** shared Anki tag-building utility used by export.js and txtFallback.js  
**Lines:** 35
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

#### `audio.js`
**Responsibility:** building the Anki Audio field with [sound:] syntax for word pronunciation  
**Lines:** 30
**Exports:** `buildAnkiAudio`
**Functions:**
- `buildAnkiAudio()` — Builds the Anki Audio field value for a vocabulary word.

#### `category.js`
**Responsibility:** building the Anki Category HTML field  
**Lines:** 25
**Depends on:** `./utils.js`
**Exports:** `buildAnkiCategory`
**Functions:**
- `buildAnkiCategory()` — Builds the Anki Category field HTML for a word.

#### `collocations.js`
**Responsibility:** building the Anki Collocations HTML field  
**Lines:** 42
**Depends on:** `./utils.js`
**Exports:** `buildAnkiCollocations`
**Functions:**
- `renderCollocation()` _(internal)_ — Renders a single collocation as an HTML row.
- `buildAnkiCollocations()` — Builds the Anki Collocations field HTML for a word.

#### `delhiNote.js`
**Responsibility:** building the Anki DelhiNote HTML field  
**Lines:** 26
**Depends on:** `./utils.js`
**Exports:** `buildAnkiDelhiNote`
**Functions:**
- `buildAnkiDelhiNote()` — Builds the Anki DelhiNote field HTML for a word.

#### `etymology.js`
**Responsibility:** building the Anki Etymology HTML field  
**Lines:** 66
**Depends on:** `./utils.js`
**Exports:** `buildAnkiEtymology`
**Functions:**
- `renderStage()` _(internal)_ — Renders a single etymology stage as a centred vertical card block.
- `buildAnkiEtymology()` — Builds the Anki Etymology field HTML for a word.

#### `exampleSentence.js`
**Responsibility:** building the Anki ExampleSentence HTML field  
**Lines:** 49
**Depends on:** `./utils.js`
**Exports:** `buildAnkiExampleSentence`
**Functions:**
- `renderToken()` _(internal)_ — Renders a single breakdown token as an HTML row.
- `buildAnkiExampleSentence()` — Builds the Anki ExampleSentence field HTML for a word.

#### `forms.js`
**Responsibility:** building the Anki Forms HTML field (inflected form chips)  
**Lines:** 36
**Depends on:** `./utils.js`
**Exports:** `buildAnkiForms`
**Functions:**
- `buildAnkiForms()` — Builds the Anki Forms field HTML for a word.

#### `gender.js`
**Responsibility:** building the Anki Gender HTML field  
**Lines:** 24
**Exports:** `buildAnkiGender`
**Functions:**
- `buildAnkiGender()` — Builds the Anki Gender field HTML for a word.

#### `index.js`
**Responsibility:** assembling wordToAnkiFields() from all individual field builders  
**Lines:** 67
**Depends on:** `../noteType.js`, `./category.js`, `./gender.js`, `./transitivity.js`, `./syllables.js`, `./forms.js`, `./morphemes.js`, `./usageNotes.js`, `./collocations.js`, `./relatedWords.js`, `./soundAlikes.js`, `./exampleSentence.js`, `./delhiNote.js`, `./etymology.js`, `./audio.js`, `./utils.js`
**Exports:** `wordToAnkiFields`
**Functions:**
- `wordToAnkiFields()` — Converts a vocabulary word object into a complete Anki fields object.

#### `morphemes.js`
**Responsibility:** building the Anki Morphemes HTML field  
**Lines:** 50
**Depends on:** `./utils.js`
**Exports:** `buildAnkiMorphemes`
**Functions:**
- `buildAnkiMorphemes()` — Builds the Anki Morphemes field HTML for a word.

#### `relatedWords.js`
**Responsibility:** building the Anki RelatedWords HTML field  
**Lines:** 44
**Depends on:** `./utils.js`
**Exports:** `buildAnkiRelatedWords`
**Functions:**
- `renderRelatedWord()` _(internal)_ — Renders a single related word as a centred vertical .clang-item card.
- `buildAnkiRelatedWords()` — Builds the Anki RelatedWords field HTML for a word.

#### `sentenceBreakdown.js`
**Responsibility:** WordBreakdown Anki field HTML for Hindi Sentence note type  
**Lines:** 50
**Exports:** `buildWordBreakdown`
**Functions:**
- `buildWordBreakdown()` — Builds the WordBreakdown HTML field for an Anki sentence note.

#### `soundAlikes.js`
**Responsibility:** building the Anki Sound Alikes HTML field  
**Lines:** 56
**Depends on:** `./utils.js`
**Exports:** `buildAnkiSoundAlikes`
**Functions:**
- `renderSoundAlike()` _(internal)_ — Renders a single sound-alike entry as a centred vertical .clang-item card.
- `buildAnkiSoundAlikes()` — Builds the Anki SoundAlikes field HTML for a word.

#### `syllables.js`
**Responsibility:** building the Anki Syllables plain-text field  
**Lines:** 19
**Exports:** `buildAnkiSyllables`
**Functions:**
- `buildAnkiSyllables()` — Returns the syllables string for the Anki answer header.

#### `transitivity.js`
**Responsibility:** building the Anki Transitivity HTML field  
**Lines:** 24
**Exports:** `buildAnkiTransitivity`
**Functions:**
- `buildAnkiTransitivity()` — Builds the Anki Transitivity field HTML for a word.

#### `usageNotes.js`
**Responsibility:** building the Anki UsageNotes HTML field  
**Lines:** 26
**Depends on:** `./utils.js`
**Exports:** `buildAnkiUsageNotes`
**Functions:**
- `buildAnkiUsageNotes()` — Builds the Anki UsageNotes field HTML for a word.

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
**Lines:** 136
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
**Lines:** 87
**Exports:** `getActiveTab`, `initTabs`, `switchTab`
**Functions:**
- `getActiveTab()` — Returns the currently active tab name.
- `initTabs()` — Wires click handlers on all [data-tab] buttons and activates the Words tab.
- `updateNavButtons()` _(internal)_ — Updates nav bar [data-tab] button styling to reflect which tab is now active.
- `switchTab()` — Activates a tab by name: shows its page panel, hides the others,

### `src/scripts/ui/`

#### `ankiPreview.js`
**Responsibility:** rendering Anki flip-card previews for selected words in the Words page Anki mode area  
**Lines:** 131
**Depends on:** `../anki/fields/index.js`, `../anki/noteType.js`, `../state/selection.js`
**Exports:** `initAnkiPreview`
**Functions:**
- `renderTemplate()` _(internal)_ — Replaces {{FieldName}} tokens in a Mustache-style template string.
- `renderFlipCard()` _(internal)_ — Renders the HTML string for a single Anki flip card.
- `initFlipCard()` _(internal)_ — Wires click-to-flip behaviour on a single flip card element.
- `populateAnkiPreview()` _(internal)_ — Populates #pw-anki-cards with flip cards for currently selected words.
- `initAnkiPreview()` — Initialises the Anki preview module.

#### `audio.js`
**Responsibility:** delegated audio playback handler for .wc-audio-btn elements  
**Lines:** 56
**Exports:** `initAudio`
**Functions:**
- `initAudio()` — Initialises the delegated audio click handler on the document.

#### `cards.js`
**Responsibility:** word card collapse/expand toggling and deselect button handling  
**Lines:** 78
**Depends on:** `../state/selection.js`
**Exports:** `initCards`
**Functions:**
- `initScrollHighlight()` _(internal)_ — Sets up an IntersectionObserver that highlights the matching sidebar row whenever
- `initCards()` — Initialises word card interactions:

#### `exportPane.js`
**Responsibility:** deliver page controller — word list, sentence list, AnkiConnect polling, export button  
**Lines:** 409
**Depends on:** `../anki/connect.js`, `../anki/export.js`, `../anki/txtFallback.js`, `../state/selection.js`, `../data.js`
**Exports:** `initExportPane`
**Functions:**
- `getDeckName()` _(internal)_ — Returns the current words deck name from the deck inputs (main::sub).
- `getSentenceDeckName()` _(internal)_ — Returns the current sentences deck name from the sentences deck inputs (main::sub).
- `syncDeckPreview()` _(internal)_ — Syncs the words deck preview text and confirm-deck label to the current input values.
- `syncSentenceDeckPreview()` _(internal)_ — Syncs the sentences deck preview text and confirm-deck label to the current input values.
- `updateStatusBadge()` _(internal)_ — Updates the AnkiConnect status bar and export button state.
- `pollAnkiStatus()` _(internal)_ — Checks AnkiConnect status and updates the badge with the result.
- `startPolling()` _(internal)_ — Starts polling AnkiConnect every 3 seconds. No-op if already polling.
- `stopPolling()` _(internal)_ — Stops the AnkiConnect poll interval.
- `populateWordTable()` _(internal)_ — Rebuilds the selected-word list in the deliver panel.
- `showFeedback()` _(internal)_ — Displays a success or error message below the export button.
- `buildSendMessage()` _(internal)_ — Builds the success feedback message for an incremental Anki export.
- `sendSentencesToAnki()` _(internal)_ — Exports selected sentences to Anki incrementally (skipping duplicates).
- `handleExportClick()` _(internal)_ — Handles the export button click: validates, runs the export/override API call
- `wireWindowListeners()` _(internal)_ — Wires window-level event listeners for tab changes and selection changes.
- `wireControlListeners()` _(internal)_ — Wires DOM element listeners for the deck inputs, override toggle, export button,
- `initExportPane()` — Initialises the export/deliver pane.
- `plural()` _(internal)_ — Returns 's' when n !== 1 — used for pluralising feedback messages.

#### `indexSidebar.js`
**Responsibility:** sidebar interactions — drag-select checkboxes, group collapse, scroll-to-card  
**Lines:** 120
**Depends on:** `../state/selection.js`
**Exports:** `initSidebar`
**Functions:**
- `handleSidebarClick()` _(internal)_ — Handles a delegated click inside the words index sidebar.
- `initSidebar()` — Initialises all sidebar event listeners on the #idx-words element.

#### `pageInteractions.js`
**Responsibility:** page-level interactions — filter panel, group collapse, sel-circle, drag-select  
**Lines:** 518
**Depends on:** `../state/selection.js`
**Exports:** `initPageInteractions`
**Functions:**
- `wireFilterPanel()` _(internal)_ — Wires the open/close toggle for a filter panel button + panel pair.
- `setViewMode()` _(internal)_ — Sets the view mode on a page (web or anki).
- `wireViewMode()` _(internal)_ — Wires the Web/Anki view mode buttons for a given page prefix.
- `toggleGroupCollapse()` _(internal)_ — Toggles the collapsed state of a card group.
- `toggleSelCircle()` _(internal)_ — Toggles selection state on a word or sentence card.
- `toggleGroupCheckbox()` _(internal)_ — Toggles all selection circles within a group's .card-list.
- `updateSelectionBadges()` _(internal)_ — Updates the selection badge text and visibility.
- `handleCardHeaderClick()` _(internal)_ — Handles clicks on a card header to toggle collapse state.
- `initDragSelect()` _(internal)_ — Sets up the drag-to-select lasso on the document.
- `handlePageClick()` _(internal)_ — Single delegated click handler for the entire document covering both pages.
- `wireWordFilterChips()` _(internal)_ — Wires date-chip buttons in `#pw-filter-chips` to filter word card groups.
- `wireSentenceFilterChips()` _(internal)_ — Wires chapter-chip buttons in `#ps-filter-chips` to filter sentence card groups.
- `syncInitialSelection()` _(internal)_ — Syncs the sel-circle and article.is-selected state to match
- `wireSelectionChangeListener()` _(internal)_ — Keeps sel-circles and badges in sync when selection changes externally
- `initPageInteractions()` — Initialises all page-level interactions.

#### `search.js`
**Responsibility:** fuzzy search scoring and filtering word/sentence card visibility  
**Lines:** 198
**Depends on:** `../data.js`, `../state/tabs.js`, `../utils/stringUtils.js`
**Exports:** `applyFilter`, `getWordRowMap`, `initSearch`
**Functions:**
- `fuzzyScore()` _(internal)_ — Scores how well a search needle fuzzy-matches a single haystack string.
- `bestScore()` _(internal)_ — Returns the best fuzzy score for a needle against all searchable fields
- `initSearch()` — Initialises search by caching DOM elements and wiring input/clear event listeners.
- `getWordRowMap()` — Returns the exported word row DOM map — kept for compatibility with cards.js.
- `filterWords()` _(internal)_ — Applies the search filter to the words page: shows/hides cards and
- `filterSentences()` _(internal)_ — Applies the search filter to the sentences page: shows/hides cards and
- `applyFilter()` — Applies the current search query to show/hide cards.

#### `sentenceCards.js`
**Responsibility:** sentence card collapse/expand toggling  
**Lines:** 29
**Exports:** `initSentenceCards`
**Functions:**
- `initSentenceCards()` — Initialises sentence card interactions:

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
**Responsibility:** shared string utilities — norm(), extractDevanagari(), extractPartLabel()  
**Lines:** 52
**Exports:** `extractDevanagari`, `extractPartLabel`, `norm`
**Functions:**
- `norm()` — Strips diacritical marks and lowercases a string for diacritic-insensitive comparison.
- `extractDevanagari()` — Extracts the Devanagari text from a sound-alike `part` string.
- `extractPartLabel()` — Extracts the parenthetical label from a sound-alike `part` string.

### `src/utils/`

#### `audioHelpers.ts`
**Responsibility:** resolving audio file paths for words and sentences from their JSON fields  
**Lines:** 31
**Exports:** `sentenceAudioSrc`, `wordAudioSrc`
**Functions:**
- `wordAudioSrc()` — Returns the full audio file path for a word.
- `sentenceAudioSrc()` — Returns the full audio file path for a sentence.

#### `cardHelpers.ts`
**Responsibility:** pure helper functions shared across WordCard section components  
**Lines:** 119
**Exports:** `cap`, `categoryStyle`, `chipClass`, `devanagariFromPart`, `formatDate`, `langColor`, `partLabel`, `registerStyle`
**Functions:**
- `formatDate()` — Formats an ISO date string (YYYY-MM-DD) as a human-readable label.
- `chipClass()` — Returns the Tailwind CSS class string for a form chip based on its label.
- `categoryStyle()` — Returns the Tailwind CSS class string for a word-category badge.
- `registerStyle()` — Returns the Tailwind CSS class string for a sentence register badge.
- `devanagariFromPart()` — Extracts the Devanagari text from a `part` string like "लड़ (laṛ-)".
- `partLabel()` — Extracts the parenthetical label from a `part` string like "घर (full word)".
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
**Lines:** 108
**Exports:** `Collocation`, `EtymologyStage`, `ExampleSentence`, `ExampleSentenceToken`, `Form`, `HoverEntry`, `Morpheme`, `RelatedWord`, `SearchEntry`, `Sentence`, `SentenceChapter`, `SentenceWord`, `SoundAlike`, `Word`, `WordGroup`

---

## Auto-detected Improvement Notes

- **Functions with the same name in multiple files** (review for shared-util extraction):
  - `main` in `scripts/aggregate-changelog.js` and `scripts/arch.js` and `scripts/coverage.js`
  - `renderMarkdown` in `scripts/arch.js` and `scripts/coverage.js`
