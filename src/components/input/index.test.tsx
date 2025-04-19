import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Input } from './index';

const mockId = 'id';
const mockPlaceholder = 'Enter text';
const mockDefaultValue = 'default value';
const mockNewValue = 'new value';

describe('Input', () => {
  it('renders the input with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input id={mockId} placeholder={mockPlaceholder} />
    );
    expect(getByPlaceholderText(mockPlaceholder)).toBeDefined();
  });

  it('renders with default value', () => {
    const { getByDisplayValue } = render(
      <Input id={mockId} defaultValue={mockDefaultValue} />
    );
    expect(getByDisplayValue(mockDefaultValue)).toBeDefined();
  });

  it('calls onValueChange when input value changes', () => {
    const mockOnValueChange = vi.fn();
    const { getByRole } = render(
      <Input
        id={mockId}
        defaultValue={mockDefaultValue}
        onValueChange={mockOnValueChange}
      />
    );
    fireEvent.change(getByRole('textbox'), { target: { value: mockNewValue } });

    expect(mockOnValueChange).toHaveBeenCalledWith(mockNewValue);
  });

  it('displays error message when provided', () => {
    const { getByText } = render(
      <Input id={mockId} error="This is an error" withValidation />
    );

    expect(getByText('This is an error')).toBeDefined();
  });

  it('toggles password visibility when icon is clicked', () => {
    const { getByRole, getByPlaceholderText } = render(
      <Input id={mockId} type="password" placeholder={mockPlaceholder} />
    );
    const input = getByPlaceholderText(mockPlaceholder);
    const icon = getByRole('img');

    expect(input.getAttribute('type')).toBe('password');
    fireEvent.click(icon);
    expect(input.getAttribute('type')).toBe('text');
    fireEvent.click(icon);
    expect(input.getAttribute('type')).toBe('password');
  });

  describe('inside react-hook-form', () => {
    it('renders the Input component with react-hook-form', () => {
      const Wrapper = () => {
        const methods = useForm();
        return (
          <FormProvider {...methods}>
            <form>
              <Input id={mockId} placeholder={mockPlaceholder} />
            </form>
          </FormProvider>
        );
      };
      const { getByPlaceholderText } = render(<Wrapper />);

      expect(getByPlaceholderText(mockPlaceholder)).toBeDefined();
    });

    it('updates value correctly when used with react-hook-form', () => {
      const Wrapper = () => {
        const methods = useForm();
        return (
          <FormProvider {...methods}>
            <form>
              <Input
                id={mockId}
                placeholder={mockPlaceholder}
                defaultValue={mockDefaultValue}
              />
            </form>
          </FormProvider>
        );
      };
      const { getByPlaceholderText, getByDisplayValue } = render(<Wrapper />);
      const input = getByPlaceholderText(mockPlaceholder);
      fireEvent.change(input, { target: { value: mockNewValue } });

      expect(getByDisplayValue(mockNewValue)).toBeDefined();
    });

    it('validates input correctly with react-hook-form', async () => {
      const errorMessage = 'This field is required';
      const Wrapper = () => {
        const {
          register,
          handleSubmit,
          formState: { errors },
          trigger,
        } = useForm({
          resolver: yupResolver(
            object({ [mockId]: string().required(errorMessage) })
          ),
        });

        const onSubmit = () => {};

        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id={mockId}
              placeholder={mockPlaceholder}
              withValidation={true}
              defaultValue={''}
              register={register}
              error={errors[mockId]?.message}
              trigger={trigger}
            />
            <button type="submit">Submit</button>
          </form>
        );
      };

      const { getByRole, getByText, queryByText } = render(<Wrapper />);
      const input = getByRole('textbox');
      const submitButton = getByText('Submit');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(getByText(errorMessage)).toBeDefined();
      });

      fireEvent.change(input, { target: { value: 'Valid input' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(queryByText(errorMessage)).toBeFalsy();
      });
    });
  });
});
