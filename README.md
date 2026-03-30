# Hindi Vocabulary

A dark-mode study companion for Hindi vocabulary. Browse words with etymology, pronunciation guides, memory hooks, cross-language connections, and example sentences. Select any subset of words and export directly to Anki via AnkiConnect, or download a `.txt` file for manual import.

## Quick start

```sh
npm install
npm run dev
```

Opens at `http://localhost:4321`.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview the build locally |
| `npm run arch` | Regenerate `ARCHITECTURE.md` from source |
| `npm run changelog` | Aggregate `changelog/` entries into `CHANGELOG.md` |

## Adding vocabulary

Drop `.json` files into `vocab/`. The site picks them up automatically — no code changes needed. Files load in alphabetical order, so a naming convention like `vocab_batch_001.json`, `vocab_batch_002.json` keeps things sorted.

### File format

A vocab file is either a plain JSON array or an object with a `title` and `words` array:

```json
[
  {
    "hindi": "बड़ा",
    "romanisation": "baṛā",
    "english": "big, large, great, elder",
    "origin_language": "Sanskrit",
    "word_category": "adjective",
    "date_added": "2026-03-28",
    "forms": [
      { "label": "feminine", "hindi": "बड़ी", "roman": "baṛī" },
      { "label": "plural",   "hindi": "बड़े", "roman": "baṛe" }
    ],
    "pronunciation_guide": {
      "syllables": "ba · ṛā",
      "breakdown": [
        { "syllable": "ba", "sound": "as in 'but'" },
        { "syllable": "ṛā", "sound": "retroflex flap — tongue tip curls back and flaps forward" }
      ],
      "stress": "Stress falls on the second syllable."
    },
    "root_breakdown": {
      "root": "Sanskrit √vṛdh — 'to grow, to increase'",
      "evolution": "vṛddha → vaḍḍha → baṛā",
      "logic": "Growth = bigness."
    },
    "etymology_story": "A story connecting the root to the modern word.",
    "memory_hook": {
      "primary": "Sounds like 'bura' but means the opposite — big, not bad.",
      "russian": "Think of Russian 'большой' (bol'shoy) as a contrast."
    },
    "cross_language_connections": {
      "true_relatives": [
        { "language": "Sanskrit", "word": "वृद्ध", "romanisation": "vṛddha", "meaning": "grown, elder", "note": "Same root √vṛdh." }
      ],
      "useful_coincidences": [
        { "language": "Russian", "word": "большой", "romanisation": "bol'shoy", "meaning": "big", "note": "No relation — useful contrast." }
      ]
    },
    "sound_alikes": [
      { "language": "Hindi", "word": "बुरा", "romanisation": "burā", "meaning": "bad", "note": "Common beginner mix-up." }
    ],
    "urdu_punjabi": {
      "urdu":    { "script": "بڑا", "romanisation": "baṛā", "note": "Identical in Urdu." },
      "punjabi": { "script": "ਵੱਡਾ", "romanisation": "vaḍḍā", "note": "Punjabi uses a different root form." }
    },
    "examples": [
      {
        "hindi": "वह बहुत बड़ा घर है।",
        "romanisation": "Voh bahut baṛā ghar hai.",
        "english": "That is a very big house.",
        "register": "standard"
      }
    ]
  }
]
```

All fields except `hindi`, `romanisation`, and `english` are optional. Long text fields support inline `*italic*` and `**bold**` markdown.

### Named file format (with title)

```json
{
  "title": "Adjectives — Batch 1",
  "words": [ ... ]
}
```

The title appears as the group header in the sidebar index.

## Adding sentences

Drop `.json` files into `sentences/`. Each file is an array of sentence objects:

```json
[
  {
    "hindi": "मैं हिंदी सीख रहा हूँ।",
    "romanisation": "Maiṃ hindī sīkh rahā hūṃ.",
    "english": "I am learning Hindi.",
    "date_added": "2026-03-28"
  }
]
```

## Anki export

The Export tab lets you push selected words directly to Anki as richly formatted flashcards.

### AnkiConnect setup

1. Install [Anki](https://apps.ankiweb.net/) and the [AnkiConnect](https://ankiweb.net/shared/info/2055492159) add-on (code `2055492159`).
2. Open Anki. Go to **Tools → Add-ons → AnkiConnect → Config**.
3. Add your dev server origin to `webCorsOriginList`:

```json
{
  "apiKey": null,
  "apiLogPath": null,
  "webBindAddress": "127.0.0.1",
  "webBindPort": 8765,
  "webCorsOriginList": [
    "http://localhost:4321",
    "http://localhost:3000",
    "http://127.0.0.1:4321"
  ]
}
```

4. Save and **restart Anki**. The Export tab status badge will show **● Online**.

> **AnkiConnect shows Offline even though Anki is running?** The browser blocks cross-origin requests. The fetch from `localhost:4321` to `localhost:8765` is a different origin, so it gets rejected before it reaches Anki. Add the exact origin shown in your browser's address bar to `webCorsOriginList` and restart Anki.

### Export workflow

1. Open the **Export** tab.
2. All words are selected by default. Deselect individual words with the ✕ button on each card, or uncheck them in the sidebar.
3. Set the **Deck Name** (use `::` for subdecks, e.g. `Hindi::Adjectives`).
4. Click **Export to Anki**. Duplicate cards are skipped automatically.
5. If Anki is not running, use **Download .txt** for manual import instead.

### Note type

The exporter creates a note type called **Hindi Vocab** with 12 fields:

| Field | Content |
|---|---|
| English | Primary meaning |
| Category | Word category (noun, verb, adjective…) |
| Hindi | Devanagari script |
| Romanisation | Transliteration |
| Forms | Inflected forms (feminine, plural, oblique…) |
| Pronunciation | Syllable breakdown and stress notes |
| Memory | Memory hooks (primary + language-specific) |
| Examples | Example sentences with register labels |
| RootOrigin | Root breakdown, evolution chain, origin notes |
| SoundAlikes | Sound-alike words with notes |
| UrduPunjabi | Urdu and Punjabi equivalents |
| CrossLanguage | True cognates and useful coincidences |

## UI overview

The interface uses a DaVinci Resolve-style tab workspace with a bottom tab bar:

- **Words** — browse all vocabulary cards (each card has collapsible sections)
- **Sentences** — browse sentence examples
- **Export** — review selected words and push to Anki

On desktop (≥1024px), a sidebar shows the full index with search, group collapse buttons, and per-word checkboxes for selection. Clicking a sidebar entry scrolls to the card. Hovering over Hindi words inside example sentences shows a tooltip with that word's details.

## Maintenance scripts

```sh
# Regenerate ARCHITECTURE.md from source file comments
npm run arch

# Create a new changelog entry
node scripts/new-changelog.js "Short description of the change"

# Aggregate all entries from changelog/ into CHANGELOG.md
npm run changelog
```

See `scripts/` for the implementation of each.

## Build

```sh
npm run build
```

Output goes to `dist/` — deploy anywhere that serves static files (GitHub Pages, Netlify, Cloudflare Pages, etc.).
