import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { bodyMock, headersMock, urlMock } from '@/__tests__/mocks/mockContext';
import { useFormattedParams } from './use-formatted-params';

describe('useFormattedParams', () => {
  it('provides default values', () => {
    const { result } = renderHook(() => useFormattedParams([]));

    expect(result.current.url).toBe('');
    expect(result.current.body).toBe('');
    expect(result.current.method).toBe('GET');
    expect(result.current.headers).toEqual([]);
    expect(result.current.headerParams).toBe('');
  });

  it('updates the URL', () => {
    const { result } = renderHook(() => useFormattedParams([]));

    act(() => {
      result.current.setUrl(urlMock);
    });

    expect(result.current.url).toBe(urlMock);
  });

  it('updates the body', () => {
    const { result } = renderHook(() => useFormattedParams([]));

    act(() => {
      result.current.setBody(bodyMock);
    });

    expect(result.current.body).toBe(bodyMock);
  });

  it('updates the method', () => {
    const { result } = renderHook(() => useFormattedParams([]));

    act(() => {
      result.current.setMethod('POST');
    });

    expect(result.current.method).toBe('POST');
  });

  it('updates the headers', () => {
    const { result } = renderHook(() => useFormattedParams([]));

    act(() => {
      result.current.setHeaders(headersMock);
    });

    expect(result.current.headers).toEqual(headersMock);
  });

  it('updates the headerParams', () => {
    const { result } = renderHook(() => useFormattedParams([]));

    act(() => {
      result.current.setHeaderParams('Authorization: Bearer token');
    });

    expect(result.current.headerParams).toBe('Authorization: Bearer token');
  });
});
