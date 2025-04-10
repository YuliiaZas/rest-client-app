import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorMessage } from './index';

describe('ErrorMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the error message when errorMessage is provided', () => {
    render(<ErrorMessage errorMessage="Error occurred" />);
    const errorElement = screen.getByText('Error occurred');
    expect(errorElement).toBeDefined();
  });
});
