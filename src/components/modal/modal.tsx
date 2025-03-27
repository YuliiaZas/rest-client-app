'use client';

import { ReactNode } from 'react';
import styles from './modal.module.scss';

type ModalProps = {
  title: string;
  children: ReactNode;
  action: () => void;
};

export function Modal({ title, children, action }: ModalProps) {
  return (
    <div className={styles.modal__wrapper}>
      <div className={styles.modal__frame}>
        <button className={styles.modal__close} onClick={action}>
          &times;
        </button>
        <div className={styles.modal__content}>
          <h5>{title}</h5>
          {children}
        </div>
      </div>
    </div>
  );
}
