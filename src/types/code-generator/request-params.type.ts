import { SupportedLanguages } from '@/data/supported-languages';

export interface IRequestParams {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | string;
  language: SupportedLanguages;
}
