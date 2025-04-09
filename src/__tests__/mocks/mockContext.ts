import { Mock, vi } from 'vitest';

export const mockUseAppContext = { variables: { key: 'value' } };

export const mockUseClientContext = {
  url: 'https://example.com',
  body: '{"key":"value"}',
  method: 'POST',
  headers: { Authorization: 'Bearer token' },
  appDefaultHeaders: { 'Content-Type': 'application/json' },
};

export const notifications: Notification[] = [];
export const addNotification: Mock = vi.fn((notification) =>
  notifications.push(notification)
);

export const mockContext = () => {
  vi.mock('@/context', () => ({
    useClientContext: vi.fn(() => mockUseClientContext),
    useAppContext: vi.fn(() => mockUseAppContext),
    useNotificationsContext: () => ({
      notifications,
      addNotification,
    }),
  }));
};
