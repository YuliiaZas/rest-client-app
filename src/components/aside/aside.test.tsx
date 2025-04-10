import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Aside } from './aside';

describe('Aside Component', () => {
  it('should render children correctly', () => {
    render(<Aside type="root">Root</Aside>);
    expect(screen.getByText('Root')).toBeDefined();
  });

  it('should apply the correct class for the root type', () => {
    render(<Aside type="root">Root</Aside>);
    const asideElement = screen.getByText('Root');
    expect(asideElement).toBeDefined();
    expect(asideElement.className.includes(`aside__root`)).toBeTruthy();
  });

  it('should apply the correct class for the client type', () => {
    render(<Aside type="client">Client</Aside>);
    const asideElement = screen.getByText('Client');
    expect(asideElement).toBeDefined();
    expect(asideElement.className.includes(`aside__client`)).toBeTruthy();
  });
});
