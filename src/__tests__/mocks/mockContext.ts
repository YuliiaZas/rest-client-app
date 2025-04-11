import { INotification } from '@/types';
import { Mock, vi } from 'vitest';

export const mockUseAppContext = { variables: { key: 'value' } };

export const setBody: Mock = vi.fn();
export const setHeaders: Mock = vi.fn();
export const setHeaderParams: Mock = vi.fn();
export const setAppDefaultHeaders: Mock = vi.fn();
export const headersMock = [
  { id: 'auth', key: 'Authorization', value: 'Bearer token' },
];
export const appDefaultHeadersMock = [
  { id: 'context', key: 'Content-Type', value: 'application/json' },
];
export const mockUseClientContext = {
  url: 'https://example.com',
  body: '{"key":"value"}',
  method: 'POST',
  headers: headersMock,
  appDefaultHeaders: appDefaultHeadersMock,
  setHeaders,
  setHeaderParams,
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
