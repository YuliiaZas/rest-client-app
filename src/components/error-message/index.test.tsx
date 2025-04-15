import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorMessage } from './index';

describe('ErrorMessage', () => {
  it('renders the error message when errorMessage is provided', () => {
    render(<ErrorMessage errorMessage="Error occurred" />);
    const errorElement = screen.getByText('Error occurred');
    expect(errorElement).toBeDefined();
  });
});
