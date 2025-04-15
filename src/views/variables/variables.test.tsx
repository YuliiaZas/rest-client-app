import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Variables from './index';

describe('Variables Component', () => {
  it('should render the Variables component with a title and table', () => {
    render(<Variables />);

    expect(screen.getByRole('heading', { name: 'title' })).toBeDefined();
    expect(screen.getByRole('table')).toBeDefined();
  });
});
