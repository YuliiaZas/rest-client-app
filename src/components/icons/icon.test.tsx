import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Icon, IconProps } from './icon';

describe('Icon component', () => {
  const defaultProps: IconProps = {
    iconName: 'planet',
  };

  beforeEach(() => {
    cleanup();
  });

  it('renders with default size and no text', () => {
    render(<Icon {...defaultProps} />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toBeDefined();
    expect(iconElement.getAttribute('style')).toBe(
      'width: 1.5rem; height: 1.5rem; font-size: calc(0.75rem);'
    );
  });

  it('applies custom size and color', () => {
    render(<Icon {...defaultProps} size="2rem" color="red" />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toBeDefined();
    expect(iconElement.getAttribute('style')).toBe(
      'width: 2rem; height: 2rem; color: red; font-size: calc(1rem);'
    );
  });

  it('renders text when provided', () => {
    render(<Icon {...defaultProps} text="Test" />);
    const textElement = screen.getByText('TE');
    expect(textElement).toBeDefined();
  });

  it('handles onClick callback', () => {
    const handleClick = vi.fn();
    render(<Icon {...defaultProps} onClick={handleClick} />);
    const iconElement = screen.getByRole('img');
    iconElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
