import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './index';

describe('Input', () => {
  it('renders the input with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input id="test" placeholder="Enter text" />
    );
    expect(getByPlaceholderText('Enter text')).toBeDefined();
  });

  it('renders with default value', () => {
    const { getByDisplayValue } = render(
      <Input id="test" defaultValue="default value" />
    );
    expect(getByDisplayValue('default value')).toBeDefined();
  });

  it('calls onValueChange when input value changes', () => {
    const mockOnValueChange = vi.fn();
    const { getByRole } = render(
      <Input
        id="test"
        defaultValue="default value"
        onValueChange={mockOnValueChange}
      />
    );

    fireEvent.change(getByRole('textbox'), { target: { value: 'new value' } });
    expect(mockOnValueChange).toHaveBeenCalledWith('new value');
  });

  it('displays error message when provided', () => {
    const { getByText } = render(
      <Input id="test" error="This is an error" withValidation />
    );
    expect(getByText('This is an error')).toBeDefined();
  });

  it('toggles password visibility when icon is clicked', () => {
    const { getByRole, getByPlaceholderText } = render(
      <Input id="test" type="password" />
    );
    const input = getByPlaceholderText('Type value');
    const icon = getByRole('img');

    expect(input.getAttribute('type')).toBe('password');
    fireEvent.click(icon);
    expect(input.getAttribute('type')).toBe('text');
    fireEvent.click(icon);
    expect(input.getAttribute('type')).toBe('password');
  });
});
