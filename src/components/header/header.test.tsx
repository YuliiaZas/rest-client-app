import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with all components', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId('logo')).toBeDefined();
    expect(getByTestId('theme-switcher')).toBeDefined();
    expect(getByTestId('locale-switcher')).toBeDefined();
    expect(getByTestId('nav')).toBeDefined();
  });

  it('applies scrolled class when the page is scrolled', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toBeDefined();
    expect((header as HTMLElement).className).not.toContain('header_scrolled');

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect((header as HTMLElement).className).toContain('header_scrolled');
  });

  it('removes scrolled class when the page is scrolled back to the top', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect((header as HTMLElement).className).toContain('header_scrolled');

    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect((header as HTMLElement).className).not.toContain('header_scrolled');
  });
});
