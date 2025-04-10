import { INotification } from '@/types';
import { Mock, vi } from 'vitest';

export const mockUseAppContext = { variables: { key: 'value' } };

export const setBody: Mock = vi.fn();
export const setAppDefaultHeaders: Mock = vi.fn();
export const mockUseClientContext = {
  url: 'https://example.com',
  body: '{"key":"value"}',
  method: 'POST',
  headers: { Authorization: 'Bearer token' },
  appDefaultHeaders: { 'Content-Type': 'application/json' },
  setAppDefaultHeaders,
  setBody,
};

export const notifications: INotification[] = [];
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
