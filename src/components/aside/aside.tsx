import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './aside.module.scss';

type AsideProps = {
  children: ReactNode;
  type: 'root' | 'client';
};

export function Aside({ children, type }: AsideProps) {
  return (
    <aside className={clsx(styles.aside, styles[`aside__${type}`])}>
      {children}
    </aside>
  );
}
