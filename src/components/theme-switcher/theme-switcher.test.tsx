import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeSwitcher } from '@/components';
import { useTheme } from '@/hooks';
import { AppTheme } from '@/entites';

describe('ThemeSwitcher', () => {
  it('renders button with correct title', () => {
    render(<ThemeSwitcher />);
    expect(screen.getByRole('button', { name: 'theme' })).toBeDefined();
  });

  it('toggles theme from light to dark on button click', async () => {
    const setThemeMock = vi.fn();

    vi.mocked(useTheme).mockReturnValue({
      theme: AppTheme.light,
      setTheme: setThemeMock,
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: 'theme' });
    button.click();
    expect(setThemeMock).toHaveBeenCalledWith(AppTheme.dark);
  });

  it('toggles theme from dark to light on button click', async () => {
    const setThemeMock = vi.fn();

    vi.mocked(useTheme).mockReturnValue({
      theme: AppTheme.dark,
      setTheme: setThemeMock,
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: 'theme' });
    button.click();

    expect(setThemeMock).toHaveBeenCalledWith(AppTheme.light);
  });
});
