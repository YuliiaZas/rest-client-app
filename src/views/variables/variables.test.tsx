import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Variables from './index';

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

describe('Variables Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the Variables component with a title and table', () => {
    render(<Variables />);

    expect(screen.getByRole('heading', { name: 'title' })).toBeDefined();
    expect(screen.getByRole('table')).toBeDefined();
  });
});
