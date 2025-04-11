import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { setUserLocale } from '@/services/locale';
import { addNotification, mockContext } from '@/__tests__/mocks/mockContext';
import { LocaleSwitcher } from './locale-switcher';

mockContext();

vi.mock('@/services/locale', () => ({
  setUserLocale: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components', () => ({
  Dropdown: ({
    items,
    selectedItem,
    selectOption,
  }: {
    items: { label: string; value: string }[];
    selectedItem: string;
    selectOption: (value: string) => void;
  }) => (
    <select
      value={selectedItem}
      onChange={(e) => selectOption(e.target.value)}
      data-testid="locale-dropdown"
    >
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  ),
  Icon: ({ iconName }: { iconName: string }) => <span>{iconName}</span>,
}));

describe('LocaleSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the LocaleSwitcher component', () => {
    render(<LocaleSwitcher />);
    expect(screen.getByText('translate')).toBeDefined();
    expect(screen.getByTestId('locale-dropdown')).toBeDefined();
    expect(screen.getByText('EN')).toBeDefined();
  });

  it('changes the locale when a new locale is selected', async () => {
    (setUserLocale as Mock).mockResolvedValueOnce(undefined);

    render(<LocaleSwitcher />);
    const dropdown = screen.getByTestId('locale-dropdown');

    fireEvent.change(dropdown, { target: { value: 'ru' } });

    await waitFor(() => {
      expect(setUserLocale).toHaveBeenCalledWith('ru');
    });
  });

  it('shows a notification when locale change fails', async () => {
    (setUserLocale as Mock).mockRejectedValueOnce(new Error('Error'));

    render(<LocaleSwitcher />);
    const dropdown = screen.getByTestId('locale-dropdown');

    fireEvent.change(dropdown, { target: { value: 'ru' } });

    await waitFor(() => {
      expect(addNotification).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'changeLocale' })
      );
    });
  });
});
