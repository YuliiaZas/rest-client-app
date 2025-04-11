import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Notification } from '@/components';
import { useNotificationsContext } from '@/context';

vi.mock('@/context', () => ({
  useNotificationsContext: vi.fn(),
}));

describe('Notification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should not render anything if there are no notifications', () => {
    vi.mocked(useNotificationsContext).mockReturnValue({
      notifications: [],
      addNotification: vi.fn(),
    });

    render(<Notification />);
    const elements = screen.queryAllByRole('alert');
    expect(elements.length).toBe(0);
  });

  it('should render the latest notification message and count', () => {
    vi.mocked(useNotificationsContext).mockReturnValue({
      notifications: [
        { message: 'First Notification' },
        { message: 'Latest Notification' },
      ],
      addNotification: vi.fn(),
    });

    render(<Notification />);

    expect(screen.getByText('Latest Notification')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
  });
});
