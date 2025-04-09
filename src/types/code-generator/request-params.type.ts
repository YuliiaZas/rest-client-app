import { SupportedLanguages } from '@/data/supported-languages';

export interface IRequestParams {
  method: string;
  url: string;
  headers: Headers;
  body?: Record<string, unknown> | string;
  language: SupportedLanguages;
  unsupportedErrorMessage?: string;
}
