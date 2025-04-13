import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Error from './error';

vi.mock('./Button', () => ({
  Button: ({ onClick, text }: { onClick: () => void; text: string }) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

describe('Error', () => {
  const mockError = { message: 'Test error message' } as Error;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error information correctly', () => {
    const mockReset = vi.fn();

    render(<Error error={mockError} reset={mockReset} />);

    expect(screen.getByText('title')).toBeDefined();
    expect(screen.getByText('Test error message')).toBeDefined();
    expect(screen.getByText('restart')).toBeDefined();
  });

  it('clears localStorage and calls reset when the button is clicked', () => {
    const mockReset = vi.fn();

    render(<Error error={mockError} reset={mockReset} />);

    const restartButton = screen.getByText('restart');
    restartButton.click();

    expect(mockReset).toHaveBeenCalled();
  });
});
