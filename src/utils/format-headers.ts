import { IHeader } from '@/types';

export const formatHeaders = (
  headers: IHeader[],
  defaultHeaders: IHeader[]
) => {
  const requestHeaders = new Headers();

  [...headers, ...defaultHeaders].forEach(({ key, value }) => {
    requestHeaders.append(key, value);
  });

  return requestHeaders;
};
