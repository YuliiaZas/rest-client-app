import { cleanup, render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Footer', () => {
  beforeEach(() => {
    cleanup();
  });
  it('should render a GitHub link with correct href and text', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink.getAttribute('href')).toBe(
      'https://github.com/YuliiaZas/rest-client-app'
    );
    expect(githubLink.getAttribute('target')).toBe('_blank');
  });

  it('should render the year "2025"', () => {
    render(<Footer />);
    expect(screen.getByText('2025')).toBeDefined();
  });

  it('should render the RS School link with correct href and logo', () => {
    render(<Footer />);
    const rsSchoolLink = screen.getByRole('link', { name: /RS School logo/i });
    expect(rsSchoolLink).toBeDefined();
    expect(rsSchoolLink.getAttribute('href')).toBe(
      'https://rs.school/courses/reactjs'
    );
    const logo = screen.getByAltText('RS School logo');
    expect(logo.getAttribute('src')).toBe('/assets/rss-logo.svg');
  });
});
