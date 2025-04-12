import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RequestOptions from './request-options';

vi.mock('@/context', () => ({
  useAppContext: vi.fn().mockReturnValue({ variables: { key: 'value' } }),
  useClientContext: vi.fn().mockReturnValue({
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
  }),
  useNotificationsContext: vi.fn().mockReturnValue({
    notifications: [],
    addNotification: vi.fn,
  }),
}));

describe('RequestOptions', () => {
  it('renders default tabs', () => {
    render(<RequestOptions />);
    expect(screen.getByText('body')).toBeDefined();
    expect(screen.getByText('headers')).toBeDefined();
    expect(screen.getByText('code')).toBeDefined();
  });
});
