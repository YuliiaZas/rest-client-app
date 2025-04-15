import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ResponseView from './response-view';
import { useClientContext } from '@/context';
import { UnionErrorType } from '@/entites';

describe('ResponseView', () => {
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
