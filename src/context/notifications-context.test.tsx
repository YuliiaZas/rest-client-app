import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  NotificationsProvider,
  useNotificationsContext,
} from './notifications-context';

const mockNotifications = [
  {
    message: 'Test Notification 1',
  },
  {
    message: 'Test Notification 2',
  },
];

describe('NotificationsContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const TestComponent = () => {
    const { notifications, addNotification } = useNotificationsContext();

    return (
      <div>
        <ul data-testid="notifications">
          {notifications.map((notification) => (
            <li key={notification.message}>{notification.message}</li>
          ))}
        </ul>
        <button
          data-testid="add-notifications"
          onClick={() => {
            addNotification(mockNotifications[0]);
            addNotification(mockNotifications[1]);
          }}
        >
          Add Notifications
        </button>
      </div>
    );
  };

  it('provides default context values', () => {
    render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>
    );

    expect(screen.getByTestId('notifications').children.length).toBe(0);
  });

  it('adds a notification', () => {
    render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>
    );

    const addButton = screen.getByTestId('add-notifications');

    act(() => {
      addButton.click();
    });

    expect(screen.getByText(mockNotifications[0].message)).toBeDefined();
    expect(screen.getByText(mockNotifications[1].message)).toBeDefined();
  });

  it('removes notification starting from last one', () => {
    render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>
    );

    const addButton = screen.getByTestId('add-notifications');

    act(() => {
      addButton.click();
    });

    expect(screen.getByText(mockNotifications[0].message)).toBeDefined();
    expect(screen.getByText(mockNotifications[1].message)).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByText(mockNotifications[0].message)).toBeDefined();
    expect(screen.queryByText(mockNotifications[1].message)).toBeNull();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByText(mockNotifications[0].message)).toBeNull();
  });
});
