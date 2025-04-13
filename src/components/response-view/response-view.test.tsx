import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ResponseView from './response-view';
import { useClientContext } from '@/context';
import { UnionErrorType } from '@/entites';

vi.mock('@/context', () => ({
  useAppContext: vi.fn().mockReturnValue({ variables: { key: 'value' } }),
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

describe('ResponseView', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders no response message when there is no response', () => {
    vi.mocked(useClientContext).mockReturnValue({
      response: null,
      error: null,
      url: '',
      body: '',
      method: 'POST',
      headers: [],
      headerParams: '',
      setUrl: vi.fn(),
      setBody: vi.fn(),
      setMethod: vi.fn(),
      setHeaders: vi.fn(),
      setHeaderParams: vi.fn(),
      setResponse: vi.fn(),
      appDefaultHeaders: [],
      setAppDefaultHeaders: vi.fn(),
      setError: vi.fn(),
    });

    render(<ResponseView />);
    expect(screen.getByText('noResponse')).toBeDefined();
  });

  it('renders error message when there is an error', () => {
    vi.mocked(useClientContext).mockReturnValue({
      response: null,
      url: '',
      body: '',
      method: 'POST',
      headers: [],
      headerParams: '',
      setUrl: vi.fn(),
      setBody: vi.fn(),
      setMethod: vi.fn(),
      setHeaders: vi.fn(),
      setHeaderParams: vi.fn(),
      setResponse: vi.fn(),
      appDefaultHeaders: [],
      setAppDefaultHeaders: vi.fn(),
      setError: vi.fn(),
      error: { message: 'An error occurred' } as UnionErrorType,
    });

    render(<ResponseView />);
    expect(screen.getByText('notSendRequest')).toBeDefined();
    expect(screen.getByText(/reason:/)).toBeDefined();
    expect(screen.getByText('An error occurred')).toBeDefined();
  });
});
