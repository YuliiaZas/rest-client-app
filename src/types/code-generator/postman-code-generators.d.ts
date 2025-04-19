declare module 'postman-code-generators' {
  export function convert(
    language: string,
    variant: string,
    request: unknown,
    options: unknown,
    callback: (error: Error | null, snippet: string) => void
  ): void;
}
