import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Nav } from './nav';
import { signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

describe('Nav', () => {
  it('renders sign out button when user is authenticated', () => {
    vi.mocked(useSession).mockReturnValue({
      status: 'authenticated',
      update: vi.fn(),
      data: {} as Session,
    });

    render(<Nav />);

    expect(screen.getByTitle('signout')).toBeDefined();
  });

  it('renders sign in and sign up links when user is not authenticated', async () => {
    vi.mocked(useSession).mockReturnValue({
      status: 'unauthenticated',
      update: vi.fn(),
      data: null,
    });
    render(<Nav />);

    expect(screen.getByText('signIn')).toBeDefined();
    expect(screen.getByText('signUp')).toBeDefined();
  });

  it('calls signOut when the sign out button is clicked', () => {
    vi.mocked(useSession).mockReturnValue({
      status: 'authenticated',
      update: vi.fn(),
      data: {} as Session,
    });
    render(<Nav />);

    const signOutButton = screen.getByTitle('signout');
    signOutButton.click();

    expect(signOut).toHaveBeenCalled();
  });
});
