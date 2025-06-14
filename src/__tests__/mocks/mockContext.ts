import { INotification } from '@/types';
import { Mock, vi } from 'vitest';

export const mockUseAppContext = { variables: { key: 'value' } };

export const setError: Mock = vi.fn();
export const setUrl: Mock = vi.fn();
export const setResponse: Mock = vi.fn();
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
export const bodyMock = '{"key":"value"}';
export const urlMock = 'https://example.com';
export const mockUseClientContext = {
  url: urlMock,
  body: bodyMock,
  method: 'POST',
  headers: headersMock,
  appDefaultHeaders: appDefaultHeadersMock,
  setHeaders,
  setHeaderParams,
  setAppDefaultHeaders,
  setBody,
  setResponse,
  setUrl,
  setError,
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
