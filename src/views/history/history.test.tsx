import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import History from '@/views/history';
import { useLocalStorage } from '@/hooks';

describe('History', () => {
  it('renders the empty state when there is no history', () => {
    vi.mocked(useLocalStorage).mockReturnValue([[], vi.fn()]);
    render(<History />);
    expect(screen.queryByText('/empty/')).toBeDefined();
    expect(screen.queryByText('/emptyAction/:')).toBeDefined();
  });

  it('renders the table with history data', () => {
    const mockHistory = [
      {
        key: '1',
        method: 'GET',
        url: '/test',
        date: 1694102400000,
        headers: {},
        body: null,
      },
      {
        key: '2',
        method: 'POST',
        url: '/submit',
        date: 1694188800000,
        headers: {},
        body: '{"key":"value"}',
      },
    ];
    vi.mocked(useLocalStorage).mockReturnValue([mockHistory, vi.fn()]);
    render(<History />);

    expect(screen.queryByText('GET')).toBeDefined();
    expect(screen.queryByText('POST')).toBeDefined();
    expect(screen.queryByText('/test')).toBeDefined();
    expect(screen.queryByText('/submit')).toBeDefined();
  });
});
