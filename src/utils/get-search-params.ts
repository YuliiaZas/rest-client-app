import { IHeader } from '@/types';

export const getSearchParams = (headers: IHeader[]) => {
  const params = new URLSearchParams();
  headers.forEach(({ key, value }) => {
    params.append(key, value);
  });
  return params.toString();
};
