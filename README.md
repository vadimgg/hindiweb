# Hindi Vocabulary

A minimal dark-mode website for browsing Hindi vocabulary with etymology, pronunciation guides, memory hooks, and example sentences.

## Setup

```sh
npm install
```

## Development

```sh
npm run dev
```

Opens at `http://localhost:4321`.

## Adding vocabulary

Drop JSON files into the `vocab/` folder. The page picks them up automatically — no code changes needed. Files are loaded in alphabetical order, so a naming convention like `vocab_batch_001.json`, `vocab_batch_002.json` keeps things sorted.

Each file should be a JSON array of word objects:

All long-text fields are **arrays of strings** — each element is one paragraph or idea. This keeps the JSON readable and the website uncluttered.

`cross_language_connections` items should start with `TRUE RELATIVE:` or `USEFUL COINCIDENCE:` — the site renders these as labelled badges automatically.

```json
[
  {
    "hindi": "बड़ा",
    "romanisation": "baṛā",
    "english": "big, large, great, elder",
    "origin_tag": "Sanskrit",
    "root_breakdown": [
      "Root: Sanskrit √vṛdh — 'to grow, to increase'.",
      "Prakrit evolution: 'vṛddha' → 'vaḍḍha' → 'baṛā'."
    ],
    "etymology_story": [
      "First paragraph of the story.",
      "Second paragraph."
    ],
    "pronunciation_guide": [
      "Syllables: ba · ṛā — stress on second syllable.",
      "The key sound is ṛ (ड़): a retroflex flap...",
      "Forms: बड़ी (baṛī, feminine) · बड़े (baṛe, plural)"
    ],
    "memory_hook": [
      "First memory image.",
      "Optional second hook for another language background."
    ],
    "cross_language_connections": [
      "TRUE RELATIVE: Sanskrit 'vṛddha' (वृद्ध) — same root.",
      "USEFUL COINCIDENCE: Russian 'большой' (bol'shoy, big) — useful contrast."
    ],
    "examples": [
      {
        "hindi": "वह बहुत बड़ा घर है।",
        "romanisation": "Voh bahut baṛā ghar hai.",
        "english": "That is a very big house.",
        "note": "Standard usage."
      }
    ]
  }
]
```

## Build

```sh
npm run build
```

Output goes to `dist/` — deploy anywhere that serves static files.
