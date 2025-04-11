import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  headersMock,
  mockContext,
  setHeaders,
} from '@/__tests__/mocks/mockContext';
import {
  InputMock,
  InputWithVariablesMock,
} from '@/__tests__/mocks/mockInputs';
import Headers from './headers';

mockContext();

vi.mock(import('@/utils'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getSearchParams: vi.fn(() => ''),
    updateUrl: vi.fn(),
  };
});

vi.mock('@/components', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as object),
    ...InputMock,
    ...InputWithVariablesMock,
    ScrollLayout: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

const newHeaderValue = {
  key: 'Content-Type',
  value: 'application/json',
};

describe('Headers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Headers component', () => {
    const { getByText, getByPlaceholderText, getByTitle } = render(<Headers />);

    expect(getByText(headersMock[0].key)).toBeDefined();
    expect(getByText(headersMock[0].value)).toBeDefined();
    expect(getByPlaceholderText('key')).toBeDefined();
    expect(getByPlaceholderText('value')).toBeDefined();
    expect(getByTitle('add')).toBeDefined();
  });

  it('adds a new header', async () => {
    const { getByPlaceholderText, getByTitle } = render(<Headers />);
    const keyInput = getByPlaceholderText('key');
    const valueInput = getByPlaceholderText('value');
    const addButton = getByTitle('add');

    fireEvent.change(keyInput, { target: { value: newHeaderValue.key } });
    fireEvent.change(valueInput, { target: { value: newHeaderValue.value } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(setHeaders).toHaveBeenCalledWith([
        ...headersMock,
        { ...newHeaderValue, id: expect.any(String) },
      ]);
    });
  });

  it('edits an existing header', async () => {
    const { getByDisplayValue, getByTitle } = render(<Headers />);
    const editButton = getByTitle('edit');

    fireEvent.click(editButton);
    const keyInput = getByDisplayValue(headersMock[0].key);
    const valueInput = getByDisplayValue(headersMock[0].value);

    fireEvent.change(keyInput, { target: { value: newHeaderValue.key } });
    fireEvent.change(valueInput, { target: { value: newHeaderValue.value } });

    const saveButton = getByTitle('save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(setHeaders).toHaveBeenCalledWith([
        { ...newHeaderValue, id: expect.any(String) },
      ]);
    });
  });

  it('cancels editing of an existing header', async () => {
    const { getByDisplayValue, getByTitle } = render(<Headers />);
    const editButton = getByTitle('edit');

    fireEvent.click(editButton);
    const keyInput = getByDisplayValue(headersMock[0].key);
    const valueInput = getByDisplayValue(headersMock[0].value);

    fireEvent.change(keyInput, { target: { value: newHeaderValue.key } });
    fireEvent.change(valueInput, { target: { value: newHeaderValue.value } });

    const cancelButton = getByTitle('cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(editButton).toBeDefined();
      expect(setHeaders).not.toHaveBeenCalled();
    });
  });

  it('deletes a header', async () => {
    const { getByTitle } = render(<Headers />);
    const deleteButton = getByTitle('delete');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(setHeaders).toHaveBeenCalledWith([]);
    });
  });
});
