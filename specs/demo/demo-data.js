// Demo data for HindiWeb design demo — real word and sentence objects
// sourced directly from vocab/words/ and vocab/sentences/.
//
// Word: माता (mother) — from Complete Hindi, Chapter 01, batch 01.
//   Chosen because it has every field type: etymology_journey (3 stages),
//   sound_alikes, usage_notes, delhi_note, related_words, origin_note, gender.
//   NOTE: morphemes are added manually for demo completeness — the real batch 01
//   entry omits them, but batches 02–05 use this field and it must be exercised.
//
// Sentence: क्या आप कमला जी हैं? — from Complete Hindi, Chapter 01, Dialog 01.
//   Chosen because it has a 5-token word breakdown with notes, a literal
//   translation, and a formal register — exercises all sentence-card sections.
//
// Field mapping notes:
//   All fields now use the exact names from the vocab JSON:
//     romanisation, etymology_journey (.stage / .form / .roman / .meaning)
//     sound_alikes (.part / .association / .roman / .language / .note)
//     usage_notes: string (JSON) — components accept string or string[]
//     sentence.words.gender: "masculine" / "feminine" strings (match JSON)

window.demoWord = {
  hindi: 'माता',
  romanisation: 'mātā',
  english: 'mother',
  pos: 'noun',
  gender: 'feminine',
  anki_tags: ['family', 'noun'],
  syllables: 'mā · tā',
  morphemes: [
    { part: 'मात', roman: 'māt', meaning: 'mother', origin: 'Sanskrit' },
    { part: 'आ', roman: 'ā', meaning: 'feminine noun ending', origin: 'Sanskrit' },
  ],
  usage_notes: 'माता (mātā) is the formal or respectful word for mother, often used in religious, traditional, or literary contexts. In everyday Delhi speech, माँ (māṃ) or अम्मा (ammā) is far more common.',
  delhi_note: 'In daily Delhi conversation, people almost always say माँ (māṃ) rather than माता (mātā). माता (mātā) sounds formal or old-fashioned in casual use but is common in religious contexts.',
  related_words: [
    { hindi: 'माँ', roman: 'māṃ', english: 'mum, mom (everyday)' },
    { hindi: 'पिता', roman: 'pitā', english: 'father' },
    { hindi: 'माता-पिता', roman: 'mātā-pitā', english: 'parents' },
  ],
  sound_alikes: [
    {
      part: 'mā',
      association: 'mama',
      roman: 'mama',
      language: 'English',
      note: "'mā' is universally the mother sound — mama, mum — found across dozens of languages including English, Russian мама (mama), and Hebrew אמא (ima)",
    },
    {
      part: 'tā',
      association: 'ta',
      roman: 'ta',
      language: 'English',
      note: "'tā' sounds like the informal British 'ta' (thank you) — mother is always there to thank",
    },
  ],
  example_sentence: {
    hindi: 'मेरी माता जी घर पर हैं।',
    roman: 'merī mātā jī ghar par haiṃ.',
    english: 'My mother is at home.',
    breakdown: [
      { hindi: 'मेरी', roman: 'merī', meaning: 'my (feminine)' },
      { hindi: 'माता जी', roman: 'mātā jī', meaning: 'mother (respectful)' },
      { hindi: 'घर', roman: 'ghar', meaning: 'home' },
      { hindi: 'पर', roman: 'par', meaning: 'on / at' },
      { hindi: 'हैं', roman: 'haiṃ', meaning: 'are (respectful plural)' },
    ],
  },
  etymology_journey: [
    { stage: 'Proto-Indo-European', form: '*méh₂tēr', roman: '*méh₂tēr', meaning: 'mother' },
    { stage: 'Sanskrit', form: 'माता', roman: 'mātā', meaning: 'mother' },
    { stage: 'Hindi', form: 'माता', roman: 'mātā', meaning: 'mother (formal)' },
  ],
  origin_note: "From Sanskrit माता (mātā), from the Proto-Indo-European root *méh₂tēr — the same root as English 'mother', Russian мать (mat'), and Latin mater.",
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
