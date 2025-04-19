import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Error from './error';

describe('Error', () => {
  const mockError = { message: 'Test error message' } as Error;

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
