// Demo data for HindiWeb design demo — real word and sentence objects
// sourced directly from vocab/words/ and vocab/sentences/.
//
// Word: माता (mother) — from Complete Hindi, Chapter 01, batch 01.
//   Chosen because it has every field type: etymology_journey (3 stages),
//   morphemes, sound_alikes, usage_notes, delhi_note, collocations,
//   related_words, origin_note, forms (none, but the key is present), gender.
//   Previously मैं was used but it lacks morphemes and delhi_note.
//
// Sentence: क्या आप कमला जी हैं? — from Complete Hindi, Chapter 01, Dialog 01.
//   Chosen because it has a 5-token word breakdown with notes, a literal
//   translation, and a formal register — exercises all sentence-card sections.
//
// Field mapping notes:
//   All fields now use the exact names from the vocab JSON:
//     romanisation, etymology_journey (.stage / .form / .roman / .meaning)
//     morphemes (.part / .roman / .meaning / .origin)
//     sound_alikes (.part / .association / .roman / .language / .note)
//     usage_notes: string (JSON) — components accept string or string[]
//     sentence.words.gender: "masculine" / "feminine" strings (match JSON)

window.demoWord = {
  hindi: 'माता',
  romanisation: 'mātā',
  syllables: 'mā · tā',
  english: 'mother',
  pos: 'noun',
  gender: 'feminine',
  anki_tags: ['people', 'family', 'noun'],
  forms: [],
  morphemes: [
    { part: 'मात', roman: 'māt', meaning: 'mother', origin: 'Sanskrit' },
    { part: 'ā', roman: 'ā', meaning: 'feminine noun ending', origin: 'Sanskrit' },
  ],
  usage_notes: 'माता is a respectful, slightly formal word for mother. In everyday Delhi speech, माँ (mā̃) or अम्मा (ammā) is far more common. माता is used in formal contexts, religious settings, or compound words like मातृभाषा.',
  delhi_note: 'In everyday Delhi conversation, almost nobody says माता — people say माँ (mā̃). माता sounds formal or devotional, like something you would say in a prayer or a government document. Use माँ with family and friends.',
  collocations: [
    { hindi: 'माता-पिता', roman: 'mātā-pitā', english: 'parents (mother and father)' },
    { hindi: 'माता जी', roman: 'mātā jī', english: 'mother (respectful address)' },
    { hindi: 'माता का आशीर्वाद', roman: 'mātā kā āśīrvād', english: "mother's blessing" },
    { hindi: 'माता रानी', roman: 'mātā rānī', english: 'divine mother (goddess, used in prayers)' },
  ],
  related_words: [
    { hindi: 'माँ', roman: 'mā̃', english: 'mum / mom (everyday)' },
    { hindi: 'पिता', roman: 'pitā', english: 'father' },
    { hindi: 'माता-पिता', roman: 'mātā-pitā', english: 'parents' },
    { hindi: 'मातृभाषा', roman: 'mātṛbhāṣā', english: 'mother tongue' },
  ],
  sound_alikes: [
    {
      part: 'mā',
      association: 'ma',
      roman: 'ma',
      language: 'English',
      note: "mā sounds exactly like 'ma' (informal English for mum) — the most direct sound-alike possible.",
    },
    {
      part: 'tā',
      association: 'ta',
      roman: 'ta',
      language: 'English',
      note: "The ending -tā sounds like 'ta' (British slang for 'thank you') — say 'ta' to your ma: mātā.",
    },
  ],
  example_sentence: {
    hindi: 'माता घर में हैं।',
    roman: 'mātā ghar mẽ haĩ.',
    english: 'Mother is at home.',
    breakdown: [
      { hindi: 'माता', roman: 'mātā', meaning: 'mother (formal)' },
      { hindi: 'घर', roman: 'ghar', meaning: 'home / house' },
      { hindi: 'में', roman: 'mẽ', meaning: 'in / at (postposition)' },
      { hindi: 'हैं', roman: 'haĩ', meaning: 'are (formal/honorific form)' },
    ],
  },
  etymology_journey: [
    { stage: 'Proto-Indo-European', form: '*méh₂tēr', roman: '*méh₂tēr', meaning: 'mother' },
    { stage: 'Sanskrit', form: 'मातृ', roman: 'mātṛ', meaning: 'mother' },
    { stage: 'Hindi', form: 'माता', roman: 'mātā', meaning: 'mother (formal/respectful)' },
  ],
  origin_note: "From Sanskrit मातृ (mātṛ), from the same Proto-Indo-European root as English 'mother', Latin 'mater', and Russian мать (mat') — one of the most ancient words in the language.",
};

window.demoSentence = {
  hindi: 'क्या आप कमला जी हैं ?',
  romanisation: 'kyā āp Kamalā jī haĩ?',
  english: 'Are you Kamala?',
  literal: 'what you Kamala [honorific] are?',
  register: 'formal',
  anki_tags: ['greetings', 'questions', 'formal', 'chapter-01', 'dialog-01'],
  words: [
    {
      hindi: 'क्या',
      roman: 'kyā',
      meaning: 'question marker — turns the sentence into a yes/no question',
    },
    {
      hindi: 'आप',
      roman: 'āp',
      meaning: 'you',
      note: "formal version of 'you' — use with strangers, elders, or anyone you want to show respect to",
    },
    {
      hindi: 'कमला',
      roman: 'Kamalā',
      meaning: "Kamala — the person's name",
      gender: 'feminine',
      number: 'singular',
    },
    {
      hindi: 'जी',
      roman: 'jī',
      meaning: 'a respectful honorific placed after a name',
      note: "added after someone's name to show respect, like saying 'Mr.' or 'Ms.' but more versatile — used in both formal and polite everyday speech",
    },
    {
      hindi: 'हैं',
      roman: 'haĩ',
      meaning: 'are',
      note: "the plural/formal form of 'is/are' — used here because आप (formal 'you') always takes this form",
    },
  ],
};
