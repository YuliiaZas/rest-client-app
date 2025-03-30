import { ReactNode } from 'react';

type ColumnProps<T> = {
  title: string;
  type: string;
  body: (data: T) => JSX.Element;
  footer?: ReactNode;
};

export function Column<T>({ type }: ColumnProps<T>) {
  return type;
}
