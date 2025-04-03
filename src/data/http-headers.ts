import { IHeader } from '@/types';

export const defaultHeaders: IHeader[] = [
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

export const contentTypeHeaderJson: IHeader = {
  id: 'content-type',
  key: 'Content-Type',
  value: 'application/json',
};

export const contentTypeHeaderText: IHeader = {
  id: 'content-type',
  key: 'Content-Type',
  value: 'text/plain',
};
