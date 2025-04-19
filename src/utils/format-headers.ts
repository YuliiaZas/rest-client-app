import { IHeader } from '@/types';

export const formatHeaders = (
  headers: IHeader[],
  defaultHeaders?: IHeader[]
): Headers => {
  const defaultHeadersKeys = new Set<string>();
  const requestHeaders = new Headers();

  if (defaultHeaders) {
    defaultHeaders.forEach(({ key, value }) => {
      requestHeaders.append(key, value);
      defaultHeadersKeys.add(key);
    });
  }

  headers.forEach(({ key, value }) => {
    if (defaultHeaders && defaultHeadersKeys.has(key)) {
      requestHeaders.set(key, value);
      defaultHeadersKeys.delete(key);
    } else {
      requestHeaders.append(key, value);
    }
  });

  return requestHeaders;
};
