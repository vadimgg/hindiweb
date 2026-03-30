# Changelog

_Individual entries live in `changelog/`. Run `npm run changelog` to regenerate this file._

---

## DaVinci Resolve-style tab UI and Anki export

Date: 2026-03-30

### What changed

Replaced the original single-page layout with a DaVinci Resolve-style workspace using a bottom-fixed tab bar (Words | Sentences | Export). Implemented full Anki export via AnkiConnect with a fallback `.txt` download.

### Why

The original layout had no clear separation between browsing and export workflows. The tab paradigm gives each concern its own full-screen workspace, matching how professional tools like DaVinci Resolve handle multiple task modes.

### Details

#### Export tab
- Left panel: scrollable summary table of selected words (Hindi, Roman, English, Category, Origin)
- Right panel: deck name input, AnkiConnect status badge (polled every 3 s while tab is active), Export button (disabled when offline), `.txt` fallback download
- AnkiConnect status requires CORS configuration — see README for setup

#### Anki note type
Created a 12-field note type **Hindi Vocab** covering: English, Category, Hindi, Romanisation, Forms, Pronunciation, Memory, Examples, RootOrigin, SoundAlikes, UrduPunjabi, CrossLanguage

#### Codebase refactor
Full SRP + Dependency Inversion refactor. All files ≤100 lines with a purpose comment. Key decisions:
- `window.__APP_DATA__` global set by `define:vars`, read lazily via `src/scripts/data.js` accessors
- Event-driven state: `selection.js` fires `selectionchange`, `tabs.js` fires `tabchange`
- Export tab uses `style.display = 'flex'` (not Tailwind `hidden`) to avoid `!important` conflict with flex

### Files affected

- `src/pages/index.astro` — rewritten, now 100 lines
- `src/components/ui/TabBar.astro` — new
- `src/components/tabs/ExportTab.astro` — new
- `src/components/tabs/WordsTab.astro` — new
- `src/components/tabs/SentencesTab.astro` — new
- `src/components/sidebar/AppSidebar.astro` — new
- `src/components/MobileHeader.astro` — new
- `src/components/WordCard.astro` — refactored to 84-line shell
- `src/components/cards/sections/*.astro` — 8 new section components
- `src/scripts/**` — 28 ES module files (state, ui, anki/)
- `src/utils/types.ts`, `src/utils/cardHelpers.ts` — new shared utilities
