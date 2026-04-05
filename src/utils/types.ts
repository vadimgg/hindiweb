/**
 * Shared TypeScript type definitions for the Hindi Vocabulary app.
 *
 * Responsible for: declaring all interfaces and types used in Astro component
 * props, utility functions, and client-side scripts. Centralising them here
 * ensures that the shape of vocabulary JSON data is documented in one place.
 *
 * No runtime code — types only. No dependencies on other project modules.
 */
// Responsible for: shared TypeScript interfaces used across Astro components and client scripts

export interface Example { hindi: string; romanisation: string; english: string; literal?: string; register?: string; note?: string; }
export interface Form { label: string; hindi: string; roman: string; }
export interface GroupedWith { hindi: string; romanisation: string; english: string; register_note?: string; }
export interface RootPart { element: string; script: string; meaning: string; }
export interface CrossLangItem { language?: string; word?: string; romanisation?: string; meaning?: string; note?: string; }
export interface CrossLangConnections { true_relatives?: CrossLangItem[]; useful_coincidences?: CrossLangItem[]; }
export interface PronBreakdownItem { syllable: string; sound?: string; note?: string; }
export interface PronExtraNote { language: string; note: string; }
export interface PronTip { sounds_like?: string; language?: string; tip: string; }
export interface PronunciationGuide { syllables?: string; breakdown?: PronBreakdownItem[]; stress?: string; extra_notes?: PronExtraNote[]; tips?: PronTip[]; }
export interface RootEvolutionStep { stage: string; form: string; meaning: string; }
export interface RootRoot { language: string; word: string; romanisation: string; meaning: string; }
export interface RootBreakdown { root?: string | RootRoot; evolution?: string | RootEvolutionStep[]; logic?: string; }
export type MemoryHook = Record<string, string>;
export interface UrduPunjabiEntry { script?: string; romanisation?: string; note?: string; }
export interface UrduPunjabi { urdu?: UrduPunjabiEntry; punjabi?: UrduPunjabiEntry; }
export interface SoundAlike { language?: string; word?: string; romanisation?: string; meaning?: string; note?: string; }
export interface WordGroup { id: string; title: string; words: { w: any; i: number }[]; }
export interface SearchEntry { i: number; h: string; r: string; e: string; d: string; }
export interface HoverEntry { i: number; hindi: string; roman: string; english: string; forms: { h: string; r: string }[]; }
