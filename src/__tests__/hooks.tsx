import { vi } from 'vitest';
import { AppTheme } from '@/entites';
import { IHeader } from '@/types';

let url = 'https://default.com';
let body = '';
let method = 'GET';
let headers: IHeader[] = [];
let headerParams = '';

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn().mockReturnValue([{}, vi.fn()]),
  useTheme: vi.fn().mockReturnValue({
    theme: AppTheme.light,
    setTheme: vi.fn(),
  }),
  useFormattedParams: vi.fn(() => ({
    url,
    body,
    method,
    headers,
    headerParams,
    setUrl: vi.fn((value: string) => (url = value)),
    setBody: vi.fn((value: string) => (body = value)),
    setMethod: vi.fn((value: string) => (method = value)),
    setHeaders: vi.fn((value: IHeader[]) => (headers = value)),
    setHeaderParams: vi.fn((value: string) => (headerParams = value)),
  })),
}));
