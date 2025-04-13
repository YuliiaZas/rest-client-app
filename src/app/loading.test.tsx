import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLoading from './loading';

describe('Root loading', () => {
  it('renders the default spinner', () => {
    render(<RootLoading />);
    const spinner = screen.getByRole('status');
    expect(spinner.className.includes('spinner')).toBeTruthy();
  });
});
