import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Welcome } from '@/views';

describe('Welcome Component', () => {
  it('renders the title with translated text', () => {
    render(<Welcome />);
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toBe('title');
  });

  it('renders links to login and signup pages', () => {
    render(<Welcome />);
    const loginLink = screen.getByRole('link', { name: 'signIn' });
    const signupLink = screen.getByRole('link', { name: 'signUp' });
    expect(loginLink.getAttribute('href')).toBe('/auth/login');
    expect(signupLink.getAttribute('href')).toBe('/auth/signup');
  });

  it('renders the developers section', () => {
    render(<Welcome />);
    expect(screen.getByRole('heading', { level: 4 }).innerHTML).toBe(
      'developers'
    );
    const developerCards = screen.getAllByRole('heading', { level: 5 });
    expect(developerCards.length).toBeGreaterThan(0);
  });
});
