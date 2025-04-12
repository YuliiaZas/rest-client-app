import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RestClient } from '@/views';

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

describe('RestClient Component', () => {
  it('renders the main container', () => {
    render(<RestClient />);
    const container = screen.getByRole('main');
    expect(container).toBeDefined();
  });

  it('renders the request section with correct heading', () => {
    render(<RestClient />);
    const requestHeading = screen.getByRole('heading', {
      name: /request/i,
    });
    expect(requestHeading).toBeDefined();
  });

  it('renders the response section with correct heading', () => {
    render(<RestClient />);
    const responseHeading = screen.getByRole('heading', {
      name: /response/i,
    });
    expect(responseHeading).toBeDefined();
  });
});
