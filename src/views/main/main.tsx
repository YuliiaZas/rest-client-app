import { ReactNode } from 'react';
import styles from './main.module.scss';

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  return <main className={styles.main}>{children}</main>;
}
