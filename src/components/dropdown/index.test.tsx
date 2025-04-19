import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Dropdown } from './index';

const itemsMock = [
  { value: 'item1', label: 'Item 1' },
  { value: 'item2', label: 'Item 2' },
];

describe('Dropdown', () => {
  let selectOptionMock: () => void;

  beforeEach(() => {
    selectOptionMock = vi.fn();
  });

  it('renders button with correct text', () => {
    render(
      <Dropdown
        items={itemsMock}
        selectedItem="item1"
        selectOption={selectOptionMock}
        buttonChildren="Select an item"
      />
    );
    expect(screen.getByText('Select an item')).toBeDefined();
  });

  it('opens dropdown when button is clicked', async () => {
    render(
      <Dropdown
        items={itemsMock}
        selectedItem="item1"
        selectOption={selectOptionMock}
      />
    );
    const button = screen.getByRole('button');
    await waitFor(() => button.click());
    expect(screen.getAllByText('Item 1').length).toBe(2);
    expect(screen.getByText('Item 2')).toBeDefined();
  });

  it('closes dropdown when clicking on the dropdown', async () => {
    render(
      <Dropdown
        items={itemsMock}
        selectedItem="item1"
        selectOption={selectOptionMock}
      />
    );
    const button = screen.getByRole('button');
    await waitFor(() => button.click());
    expect(screen.getAllByText(/Item/).length).toBe(3);
    await waitFor(() => button.click());
    expect(screen.getAllByText(/Item/).length).toBe(1);
  });

  it('calls selectOption when an item is selected', async () => {
    render(
      <Dropdown
        items={itemsMock}
        selectedItem="item1"
        selectOption={selectOptionMock}
      />
    );
    const button = screen.getByRole('button');
    await waitFor(() => button.click());
    const item = screen.getByText('Item 2');
    expect(item).toBeDefined();
    await waitFor(() => item.click());
    expect(selectOptionMock).toHaveBeenCalledWith('item2');
  });

  it('closes dropdown with Escape key', async () => {
    render(
      <Dropdown
        items={itemsMock}
        selectedItem="item1"
        selectOption={selectOptionMock}
      />
    );
    const button = screen.getByRole('button');
    await waitFor(() => button.click());

    await waitFor(() =>
      fireEvent.keyDown(document.activeElement || document.body, {
        key: 'Escape',
      })
    );
    expect(screen.queryByText('Item 2')).toBeNull();
  });
});
