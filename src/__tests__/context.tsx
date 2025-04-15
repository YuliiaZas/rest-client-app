import { vi } from 'vitest';

vi.mock('@/context', () => ({
  useAppContext: vi.fn().mockReturnValue({
    variables: { key: 'value' },
    variablesStore: {},
    setVariablesStore: vi.fn(),
  }),
  useClientContext: vi.fn(() => ({
    url: 'https://example.com',
    body: '{"key":"value"}',
    method: 'POST',
    headers: [{ id: 'auth', key: 'Authorization', value: 'Bearer token' }],
    appDefaultHeaders: [
      { id: 'context', key: 'Content-Type', value: 'application/json' },
    ],
    setHeaders: vi.fn(),
    setHeaderParams: vi.fn(),
    setAppDefaultHeaders: vi.fn(),
    setBody: vi.fn(),
    setError: vi.fn(),
    setResponse: vi.fn(),
  })),
  useNotificationsContext: vi.fn(() => ({
    notifications: [],
    addNotification: vi.fn,
  })),
}));
