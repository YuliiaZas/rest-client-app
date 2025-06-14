import { Method } from '@/data';
import { IHeader } from './header.type';

export interface IHistory {
  id: string;
  method: Method;
  url: string;
  body: string;
  headers: IHeader[];
  date: number;
}
