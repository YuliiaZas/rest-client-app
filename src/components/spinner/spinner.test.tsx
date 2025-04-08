import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Spinner } from './spinner';

describe('Spinner', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the default spinner', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner.className.includes('spinner')).toBeTruthy();
  });

  it('renders the small spinner', () => {
    render(<Spinner small={true} />);
    const spinner = screen.getByRole('status');
    expect(spinner.className.includes('spinner')).toBeTruthy();
    expect(
      (spinner.firstChild as HTMLDivElement).className.includes('spinner_small')
    ).toBeTruthy();
  });
});
