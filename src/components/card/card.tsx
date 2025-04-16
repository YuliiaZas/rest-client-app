import { ReactNode } from 'react';
import styles from './card.module.scss';
import clsx from 'clsx';

type CardProps = {
  children: ReactNode;
  stratchedCard?: boolean;
};

export function Card({ children, stratchedCard = false }: CardProps) {
  return (
    <div className={clsx(styles.card, stratchedCard && styles.card_stratched)}>
      {children}
    </div>
  );
}
