// Responsible for: lazy read-only accessors for window.__APP_DATA__ (set by define:vars in index.astro)

export const getAllWords        = () => window.__APP_DATA__?.allWords ?? [];
export const getWordGroupTitles = () => window.__APP_DATA__?.wordGroupTitles ?? [];
export const getWordSearchIndex = () => window.__APP_DATA__?.wordSearchIndex ?? [];
export const getSentenceIndex   = () => window.__APP_DATA__?.sentenceSearchIndex ?? [];
export const getHoverData       = () => window.__APP_DATA__?.hoverData ?? [];
