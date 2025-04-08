import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './index';

describe('Button', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders with default props', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button.className.includes('button_primary')).toBeTruthy();
    expect((button as HTMLButtonElement).disabled).not.toBeTruthy();
  });

  it('renders with custom text', () => {
    render(<Button text="Click" />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Click');
  });

  it('renders with an icon', () => {
    render(<Button icon="add" />);
    const button = screen.getByRole('button');
    expect(button.className.includes('icon')).toBeTruthy();
  });

  it('renders with spinner when `showSpinner` is true', () => {
    render(<Button showSpinner={true} />);
    const button = screen.getByRole('button');
    expect(button.innerHTML.includes('spinner')).toBeTruthy();
  });

  it('renders a disabled button', () => {
    render(<Button isDisabled={true} />);
    const button = screen.getByRole('button');
    expect((button as HTMLButtonElement).disabled).toBeTruthy();
  });

  it('calls onClick handler on button click', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} text="Click Me" />);
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler if button is disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} isDisabled={true} />);
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
