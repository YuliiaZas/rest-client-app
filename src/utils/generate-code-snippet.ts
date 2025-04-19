import { supportedLanguages } from '@/data/supported-languages';
import { IRequestParams } from '@/types';
import codegen from 'postman-code-generators';
import { HeaderDefinition, Request, RequestBody } from 'postman-collection';

export async function generateCodeSnippet({
  method,
  url,
  headers,
  body,
  language,
  unsupportedErrorMessage = 'Unsupported language',
}: IRequestParams): Promise<string> {
  if (!supportedLanguages[language]) {
    throw new Error(`${unsupportedErrorMessage}: ${language}`);
  }

  const { name, variant } = supportedLanguages[language];

  const postmanHeaders: HeaderDefinition[] = [];

  headers.forEach((value: string, key: string) => {
    postmanHeaders.push({ key, value });
  });

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
