import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setResponse, setUrl } from '@/__tests__/mocks/mockContext';
import { RequestForm } from '@/components';

describe('RequestForm', () => {
  it('renders the form with initial values', () => {
    render(<RequestForm />);

    expect(screen.getByRole('form')).toBeDefined();
    expect(screen.getByRole('button', { name: /send/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /post/i })).toBeDefined();
    expect(
      screen.getByRole('textbox').className.includes('input_primary')
    ).toBeTruthy();
  });

  it('calls handleSubmit', () => {
    render(<RequestForm />);
    const sendButton = screen.getByRole('button', { name: /send/i });
    sendButton.click();
    expect(setResponse).toHaveBeenCalled();
  });

  it('calls handleChangeUrl', async () => {
    render(<RequestForm />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'https://example.com/test' } });
    expect(setUrl).toHaveBeenCalled();
  });
});
