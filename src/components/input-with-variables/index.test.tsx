import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InputWithVariables } from './index';

const mockPlaceholder = 'Enter text';
const mockNewValue = 'new value';
const mockOnValueChange = vi.fn();

describe('InputWithVariables', () => {
  it('renders the input with the correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <InputWithVariables
        value=""
        onValueChange={mockOnValueChange}
        placeholder={mockPlaceholder}
      />
    );
    expect(getByPlaceholderText(mockPlaceholder)).toBeDefined();
  });

  it('calls onValueChange when input value changes', () => {
    const mockOnValueChange = vi.fn();
    const { getByRole } = render(
      <InputWithVariables value="" onValueChange={mockOnValueChange} />
    );
    fireEvent.change(getByRole('textbox'), { target: { value: mockNewValue } });
    expect(mockOnValueChange).toHaveBeenCalledWith(mockNewValue);
  });

  it('renders variables with correct styles based on definition', () => {
    const variables = { definedVar: 'value' };
    const { getByText } = render(
      <InputWithVariables
        value="This is a {{definedVar}} and {{undefinedVar}}"
        variables={variables}
        onValueChange={mockOnValueChange}
      />
    );
    expect(getByText('{{definedVar}}').className).toContain(
      'input__variable_defined'
    );
    expect(getByText('{{undefinedVar}}').className).toContain(
      'input__variable_undefined'
    );
  });

  it('syncs scroll position between input and view', () => {
    const { getByRole } = render(
      <InputWithVariables
        value="This is a long text to test scrolling behavior"
        onValueChange={mockOnValueChange}
      />
    );
    fireEvent.scroll(getByRole('textbox'), {
      target: { scrollTop: 50, scrollLeft: 20 },
    });
    const view = getByRole('note');

    expect(view.scrollTop).toBe(50);
    expect(view.scrollLeft).toBe(20);
  });
});
