import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import NotFound from '@/app/not-found';

describe('UFO Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the UFO component', () => {
    const screen = render(<NotFound />);
    const ufo = screen.getByRole('main');
    expect(ufo.className.includes('ufo')).toBeTruthy();
  });
});
