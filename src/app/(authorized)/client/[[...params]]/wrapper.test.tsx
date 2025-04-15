import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, Mock, expect } from 'vitest';
import ClientWithParamsWrapper from './wrapper';
import { useRouter, usePathname } from 'next/navigation';

vi.mock('@/context', () => ({
  ClientProvider: vi.fn(({ children }) => (
    <div data-testid="client-provider">{children}</div>
  )),
}));

describe('ClientWithParamsWrapper', () => {
  const mockReplace = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ replace: mockReplace });
  });

  it('renders children inside ClientProvider', () => {
    (usePathname as Mock).mockReturnValue('/client/POST');

    render(
      <ClientWithParamsWrapper>
        <div data-testid="child">Child Component</div>
      </ClientWithParamsWrapper>
    );

    expect(screen.getByTestId('client-provider')).toBeDefined();
    expect(screen.getByTestId('child')).toBeDefined();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('redirects to /client/GET if method is incorrect', () => {
    (usePathname as Mock).mockReturnValue('/client/INVALID');

    render(
      <ClientWithParamsWrapper>
        <div data-testid="child">Child Component</div>
      </ClientWithParamsWrapper>
    );

    expect(mockReplace).toHaveBeenCalledWith('/client/GET');
  });
});
