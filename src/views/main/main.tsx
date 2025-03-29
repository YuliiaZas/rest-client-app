import { ReactNode } from 'react';
import styles from './main.module.scss';
import clsx from 'clsx';

type MainProps = {
  children: ReactNode;
  customStyles?: string;
};

export function Main({ children, customStyles }: MainProps) {
  return <main className={clsx(styles.main, customStyles)}>{children}</main>;
}
