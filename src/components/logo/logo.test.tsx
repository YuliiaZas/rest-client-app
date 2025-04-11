import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './logo';

describe('Logo', () => {
  it('renders component with set size and default stroke width', () => {
    const { container, getByRole } = render(<Logo size="50px" />);
    const containerElement = getByRole('img');
    const pathElement = container.querySelector('path');

    expect(containerElement).toBeDefined();
    expect(pathElement).toBeDefined();
    expect(containerElement.getAttribute('style')).toBe(
      'width: 50px; height: 50px;'
    );
    expect((pathElement as SVGPathElement).getAttribute('stroke-width')).toBe(
      '1.5'
    );
  });

  it('applies correct stroke width to SVG path', () => {
    const { container } = render(<Logo size="100px" weight={3} />);
    const pathElement = container.querySelector('path');

    expect(pathElement).toBeDefined();
    expect((pathElement as SVGPathElement).getAttribute('stroke-width')).toBe(
      '3'
    );
  });
});
