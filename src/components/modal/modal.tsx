'use client';

import { ReactNode } from 'react';
import styles from './modal.module.scss';
import { Button } from '@/components';
import { useTranslations } from 'next-intl';

type ModalProps = {
  title: string;
  children: ReactNode;
  action: () => void;
};

export function Modal({ title, children, action }: ModalProps) {
  const t = useTranslations('root');

  return (
    <div className={styles.modal__wrapper}>
      <div className={styles.modal__frame}>
        <div className={styles.modal__close}>
          <Button
            onClick={action}
            icon="close"
            buttonType="transparent"
            title={t('close')}
          />
        </div>
        <div className={styles.modal__content}>
          <h5>{title}</h5>
          {children}
        </div>
      </div>
    </div>
  );
}
