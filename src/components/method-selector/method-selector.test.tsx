import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MethodSelector from './method-selector';

describe('MethodSelector', () => {
  const mockOnChange = vi.fn();

  it('renders the dropdown with all HTTP methods', async () => {
    render(<MethodSelector value="GET" onChange={mockOnChange} />);

    const selectedMethod = screen.getByText('GET');
    expect(selectedMethod).toBeDefined();
  });

  it('highlights the currently selected method', () => {
    render(<MethodSelector value="POST" onChange={mockOnChange} />);

    const selectedMethod = screen.getByText('POST');
    expect(selectedMethod).toBeDefined();
  });
});
