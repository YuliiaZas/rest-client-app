import { ISupportedLanguages } from '@/types/code-generator';
import codegen from 'postman-code-generators';
import { Header, Request, RequestBody } from 'postman-collection';

const SUPPORTED_LANGUAGES: Record<
  ISupportedLanguages,
  { name: string; variant: string }
> = {
  curl: { name: 'curl', variant: 'bash' },
  fetch: { name: 'javascript', variant: 'fetch' },
  xhr: { name: 'javascript', variant: 'xhr' },
  nodejs: { name: 'nodejs', variant: 'request' },
  python: { name: 'python', variant: 'requests' },
  java: { name: 'java', variant: 'okhttp' },
  csharp: { name: 'csharp', variant: 'restsharp' },
  go: { name: 'go', variant: 'native' },
};

interface RequestParams {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | string;
  language: ISupportedLanguages;
}

export async function generateCodeSnippet(
  params: RequestParams
): Promise<string> {
  const { method, url, headers = {}, body, language } = params;

  if (!SUPPORTED_LANGUAGES[language]) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const { name, variant } = SUPPORTED_LANGUAGES[language];

  const postmanHeaders = Object.entries(headers).map(
    ([key, value]) => new Header({ key, value })
  );

  const request = new Request({
    method,
    url,
    header: postmanHeaders,
    body: body
      ? new RequestBody({
          mode: 'raw',
          raw: typeof body === 'string' ? body : JSON.stringify(body),
        })
      : undefined,
  });

  return new Promise((resolve, reject) => {
    codegen.convert(name, variant, request, {}, (error, snippet) => {
      if (error) {
        reject(error);
      } else {
        resolve(snippet);
      }
    });
  });
}
