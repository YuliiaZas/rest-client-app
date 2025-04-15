import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound', () => {
  it('renders the UFO component', () => {
    const screen = render(<NotFound />);
    const ufo = screen.getByRole('main');
    expect(ufo.className.includes('ufo')).toBeTruthy();
  });
});
