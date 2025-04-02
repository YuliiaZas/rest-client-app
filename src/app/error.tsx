'use client';

import { Main } from '@/views';
import styles from './error.module.scss';
import { Button } from '@/components';

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

  return (
    <Main>
      <div className={styles.error__container}>
        <h1>Oops, some error happened.</h1>
        <h3>We&apos;re apologise.</h3>
        <p className="p2">Error message:</p>
        <code className={styles.error__code}>{error.message}</code>
        <Button
          buttonType="primary"
          onClick={resetApp}
          text="Restart"
          title="Restart the app"
        />
        <p className="p4">
          After restart the app local storage will be cleared.
        </p>
      </div>
    </Main>
  );
}
