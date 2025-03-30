'use client';

import { useLocalStorage } from '@/hooks';
import { IHistory } from '@/types';
import Link from 'next/link';
import styles from './history.module.scss';

export default function History() {
  const [history] = useLocalStorage<IHistory[]>({
    key: 'history',
    defaultValue: [],
  });

  return (
    <div className={styles.history}>
      <h1 className={styles.history__title}>History</h1>

      {history.length ? (
        <p>History data</p>
      ) : (
        <>
          <div className={styles.history__empty}>
            <p className={styles.history__message}>
              You haven&apos;t executed any requests.
            </p>
            <p className={styles.history__message}>
              It&apos;s empty here. Try:
            </p>
          </div>
          <Link
            href="/client/GET"
            className={styles.history__link}
            prefetch={true}
          >
            REST Client
          </Link>
        </>
      )}
    </div>
  );
}
