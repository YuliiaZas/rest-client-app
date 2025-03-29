export const supportedLanguagesOptions = [
  'curl',
  'fetch',
  'xhr',
  'nodejs',
  'python',
  'java',
  'c#',
  'go',
] as const;
export type SupportedLanguages = (typeof supportedLanguagesOptions)[number];

export const supportedLanguages: Record<
  SupportedLanguages,
  { name: string; variant: string }
> = {
  curl: { name: 'curl', variant: 'curl' },
  fetch: { name: 'javascript', variant: 'fetch' },
  xhr: { name: 'javascript', variant: 'xhr' },
  nodejs: { name: 'nodejs', variant: 'request' },
  python: { name: 'python', variant: 'requests' },
  java: { name: 'java', variant: 'okhttp' },
  'c#': { name: 'csharp', variant: 'restsharp' },
  go: { name: 'go', variant: 'native' },
};
