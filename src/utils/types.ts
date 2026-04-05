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

export interface Form { label: string; hindi: string; roman: string; }
export interface WordGroup { id: string; title: string; words: { w: any; i: number }[]; }
export interface SearchEntry { i: number; h: string; r: string; e: string; d: string; }
export interface HoverEntry { i: number; hindi: string; roman: string; english: string; forms: { h: string; r: string }[]; }
export interface Collocation { hindi: string; roman: string; english: string; }
export interface RelatedWord { hindi: string; roman: string; english: string; }
export interface EtymologyStage { stage: string; form: string; roman: string; meaning: string; }
export interface SoundAlike { part: string; association: string; roman?: string; language?: string; note?: string; }
