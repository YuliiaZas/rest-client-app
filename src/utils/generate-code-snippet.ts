import { supportedLanguages } from '@/data/supported-languages';
import { IRequestParams } from '@/types';
import codegen from 'postman-code-generators';
import { Header, Request, RequestBody } from 'postman-collection';

export async function generateCodeSnippet(
  params: IRequestParams
): Promise<string> {
  const { method, url, headers = {}, body, language } = params;

  if (!supportedLanguages[language]) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const { name, variant } = supportedLanguages[language];

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
