import { IHeader } from '@/types';

export const formatHeaders = (headers: IHeader[], defaultHeaders = {}) =>
  headers.reduce((acc: Record<string, string>, { key, value }) => {
    acc[key] = value;
    return acc;
  }, defaultHeaders);
