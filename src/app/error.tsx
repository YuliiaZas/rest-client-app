'use client';

import styles from './error.module.scss';
import { Button, Translated } from '@/components';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  function resetApp() {
    localStorage.clear();
    reset();
  }
  const t = useTranslations('error');

  return (
    <div className={styles.error__container}>
      <h1>
        <Translated scope="error" text="title" />
      </h1>
      <h3>
        <Translated scope="error" text="appologize" />.
      </h3>
      <p className="p2">
        <Translated scope="error" text="message" />:
      </p>
      <code className={styles.error__code}>
        <Translated
          scope="errors"
          text={error.message}
          showRawTextByDefault={true}
        />
      </code>
      <Button
        buttonType="primary"
        onClick={resetApp}
        text={t('restart')}
        title={t('restartTitle')}
      />
      <p className="p4">
        <Translated scope="error" text="restartMessage" />.
      </p>
    </div>
  );
}
