import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestClient from '@/views/client';

describe('RestClient Component', () => {
  it('renders the main container', () => {
    render(<RestClient />);
    const container = screen.getByRole('main');
    expect(container).toBeDefined();
  });

  it('renders the request section with correct heading', () => {
    render(<RestClient />);
    const requestHeading = screen.getByRole('heading', {
      name: /request/i,
    });
    expect(requestHeading).toBeDefined();
  });

  it('renders the response section with correct heading', () => {
    render(<RestClient />);
    const responseHeading = screen.getByRole('heading', {
      name: /response/i,
    });
    expect(responseHeading).toBeDefined();
  });
});
