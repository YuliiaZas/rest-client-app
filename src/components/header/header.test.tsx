import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './header';

vi.mock('@/components', () => ({
  Logo: ({ size }: { size: string }) => (
    <div data-testid="logo" style={{ fontSize: size }}>
      Logo
    </div>
  ),
  ThemeSwitcher: () => (
    <button data-testid="theme-switcher">ThemeSwitcher</button>
  ),
  LocaleSwitcher: () => (
    <button data-testid="locale-switcher">LocaleSwitcher</button>
  ),
  Nav: () => <nav data-testid="nav">Nav</nav>,
}));

describe('Header', () => {
  it('renders the header with all components', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId('logo')).toBeDefined();
    expect(getByTestId('theme-switcher')).toBeDefined();
    expect(getByTestId('locale-switcher')).toBeDefined();
    expect(getByTestId('nav')).toBeDefined();
  });
});
