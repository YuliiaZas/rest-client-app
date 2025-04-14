import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DashboardPage from './index';
import { Session } from 'next-auth';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn().mockReturnValue({
    status: 'authenticated',
    update: vi.fn(),
    data: { user: { email: 'user@example.com' } } as Session,
  }),
  signOut: vi.fn(),
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the greeting section correctly', () => {
    render(<DashboardPage />);
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toBe(
      'welcomeBack,'
    );
    expect(screen.getByRole('heading', { level: 3 }).innerHTML).toBe(
      'user@example.com'
    );
  });

  it('renders all dashboard cards', () => {
    render(<DashboardPage />);
    expect(screen.queryByText('client-title')).toBeDefined();
    expect(screen.queryByText('history-title')).toBeDefined();
    expect(screen.queryByText('variables-title')).toBeDefined();
  });
});
