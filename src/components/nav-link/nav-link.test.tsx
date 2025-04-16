import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { usePathname } from 'next/navigation';
import { NavLink } from './index';

vi.mock('../icons', () => ({
  Icon: ({ iconName }: { iconName: string }) => (
    <div data-testid="icon">{iconName}</div>
  ),
}));

describe('NavLink', () => {
  it('renders the link with the correct title and icon', () => {
    (usePathname as Mock).mockReturnValue('/dashboard');

    render(
      <NavLink
        path="/dashboard"
        icon="house"
        title="home"
        titleScope="dashboard"
      />
    );

    const link = screen.getByRole('link');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/dashboard');
    expect(screen.getByText('house')).toBeDefined();
  });
});
