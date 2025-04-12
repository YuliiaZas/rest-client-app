import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RequestForm } from '@/components';
import { useClientContext } from '@/context';

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

describe('RequestForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with initial values', () => {
    render(<RequestForm />);

    expect(screen.getByRole('form')).toBeDefined();
    expect(screen.getByRole('button', { name: /send/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /post/i })).toBeDefined();
    expect(
      screen.getByRole('textbox').className.includes('input_primary')
    ).toBeTruthy();
  });

  it('calls handleSubmit', () => {
    const setResponseMock = vi.fn();

    vi.mocked(useClientContext).mockReturnValue({
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
      setResponse: setResponseMock,
      error: null,
      headerParams: '',
      response: null,
      setMethod: vi.fn(),
      setUrl: vi.fn(),
    });

    render(<RequestForm />);
    const sendButton = screen.getByRole('button', { name: /send/i });
    sendButton.click();
    expect(setResponseMock).toHaveBeenCalled();
  });

  it('calls handleChangeUrl', async () => {
    const setUrlMock = vi.fn();

    vi.mocked(useClientContext).mockReturnValue({
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
      error: null,
      headerParams: '',
      response: null,
      setMethod: vi.fn(),
      setUrl: setUrlMock,
    });

    render(<RequestForm />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'https://example.com/test' } });
    expect(setUrlMock).toHaveBeenCalled();
  });
});
