import { IHeader } from '@/types';

export const defaultHeaders: IHeader[] = [
  {
    id: 'content-type',
    key: 'Content-Type',
    value: 'application/json',
  },
  {
    id: 'accept',
    key: 'Accept',
    value: 'application/json',
  },
  {
    id: 'alive',
    key: 'Connection',
    value: 'keep-alive',
  },
];
