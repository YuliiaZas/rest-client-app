import { ReactNode } from 'react';
import styles from './card.module.scss';

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}
