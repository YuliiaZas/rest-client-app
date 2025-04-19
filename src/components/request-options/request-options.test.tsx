import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RequestOptions from './request-options';

describe('RequestOptions', () => {
  it('renders default tabs', () => {
    render(<RequestOptions />);
    expect(screen.getByText('body')).toBeDefined();
    expect(screen.getByText('headers')).toBeDefined();
    expect(screen.getByText('code')).toBeDefined();
  });
});
