export const bodyLanguages = ['json', 'plaintext'] as const;
export type BodyLanguage = (typeof bodyLanguages)[number];
