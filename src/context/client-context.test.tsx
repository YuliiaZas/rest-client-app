import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { contentTypeHeaderJson, defaultHeaders } from '@/data';
import { ApiError } from '@/entites';
import { IHeader } from '@/types';
import {
  appDefaultHeadersMock,
  bodyMock,
  headersMock,
  urlMock,
} from '@/__tests__/mocks/mockContext';
import { ClientProvider, useClientContext } from './client-context';

let url = 'https://default.com';
let body = '';
let method = 'GET';
let headers: IHeader[] = [];
let headerParams = '';

vi.mock('@/hooks', () => ({
  useFormattedParams: vi.fn(() => ({
    url,
    body,
    method,
    headers,
    headerParams,
    setUrl: vi.fn((value: string) => (url = value)),
    setBody: vi.fn((value: string) => (body = value)),
    setMethod: vi.fn((value: string) => (method = value)),
    setHeaders: vi.fn((value: IHeader[]) => (headers = value)),
    setHeaderParams: vi.fn((value: string) => (headerParams = value)),
  })),
}));

describe('ClientContext', () => {
  const TestComponent = () => {
    const {
      url,
      body,
      method,
      headers,
      headerParams,
      setUrl,
      setBody,
      setMethod,
      setHeaders,
      setHeaderParams,
      response,
      setResponse,
      appDefaultHeaders,
      setAppDefaultHeaders,
      error,
      setError,
    } = useClientContext();

    return (
      <div>
        <p data-testid="url">{url}</p>
        <p data-testid="body">{body}</p>
        <p data-testid="method">{method}</p>
        <p data-testid="headers">{JSON.stringify(headers)}</p>
        <p data-testid="headerParams">{headerParams}</p>
        <p data-testid="response">{JSON.stringify(response)}</p>
        <p data-testid="appDefaultHeaders">
          {JSON.stringify(appDefaultHeaders)}
        </p>
        <p data-testid="error">{error?.message}</p>
        <button data-testid="update-url" onClick={() => setUrl(urlMock)}>
          Update URL
        </button>
        <button data-testid="update-body" onClick={() => setBody(bodyMock)}>
          Update Body
        </button>
        <button data-testid="update-method" onClick={() => setMethod('POST')}>
          Update Method
        </button>
        <button
          data-testid="update-headers"
          onClick={() => setHeaders(headersMock)}
        >
          Update Headers
        </button>
        <button
          data-testid="update-headerParams"
          onClick={() => setHeaderParams('Authorization: Bearer token')}
        >
          Update Header Params
        </button>
        <button
          data-testid="update-response"
          onClick={() => setResponse({ status: 200, body: bodyMock })}
        >
          Update Response
        </button>
        <button
          data-testid="update-appDefaultHeaders"
          onClick={() => setAppDefaultHeaders(appDefaultHeadersMock)}
        >
          Update App Default Headers
        </button>
        <button
          data-testid="update-error"
          onClick={() => setError(new ApiError('Network error'))}
        >
          Update Error
        </button>
      </div>
    );
  };

  it('provides default context values', () => {
    render(
      <ClientProvider params={Promise.resolve({ params: [] })}>
        <TestComponent />
      </ClientProvider>
    );

    expect(screen.getByTestId('url').textContent).toBe('https://default.com');
    expect(screen.getByTestId('body').textContent).toBe('');
    expect(screen.getByTestId('method').textContent).toBe('GET');
    expect(screen.getByTestId('headers').textContent).toBe('[]');
    expect(screen.getByTestId('headerParams').textContent).toBe('');
    expect(screen.getByTestId('response').textContent).toBe('null');
    expect(screen.getByTestId('appDefaultHeaders').textContent).toBe(
      JSON.stringify([...defaultHeaders, contentTypeHeaderJson])
    );
    expect(screen.getByTestId('error').textContent).toBe('');
  });

  it('updates context values', async () => {
    render(
      <ClientProvider params={Promise.resolve({ params: [] })}>
        <TestComponent />
      </ClientProvider>
    );

    act(() => {
      screen.getByTestId('update-url').click();
      screen.getByTestId('update-body').click();
      screen.getByTestId('update-method').click();
      screen.getByTestId('update-headers').click();
      screen.getByTestId('update-headerParams').click();
      screen.getByTestId('update-response').click();
      screen.getByTestId('update-appDefaultHeaders').click();
      screen.getByTestId('update-error').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('url').textContent).toBe(urlMock);
      expect(screen.getByTestId('body').textContent).toBe(bodyMock);
      expect(screen.getByTestId('method').textContent).toBe('POST');
      expect(screen.getByTestId('headers').textContent).toBe(
        JSON.stringify(headersMock)
      );
      expect(screen.getByTestId('headerParams').textContent).toBe(
        'Authorization: Bearer token'
      );
      expect(screen.getByTestId('response').textContent).toBe(
        JSON.stringify({ status: 200, body: bodyMock })
      );
      expect(screen.getByTestId('appDefaultHeaders').textContent).toBe(
        JSON.stringify(appDefaultHeadersMock)
      );
      expect(screen.getByTestId('error').textContent).toBe('Network error');
    });
  });
});
