'use client';

import { useLocalStorage } from '@/hooks';
import { IHistory } from '@/types';
import { getSearchParams, getUpdatedUrl } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './history.module.scss';

export default function History() {
  const router = useRouter();
  const [history] = useLocalStorage<IHistory[]>({
    key: 'history',
    defaultValue: [],
  });

  const openClientWithParams = (params: IHistory) => {
    const searchParams = getSearchParams(params.headers);
    const updatedUrl = getUpdatedUrl(
      params.method,
      params.url,
      params.body,
      searchParams
    );

    router.push(`${process.env.APP_URL}${updatedUrl}`);
  };

  return (
    <div className={styles.history}>
      <h1 className={styles.history__title}>History</h1>

      {history.length ? (
        <>
          {history.map((params) => (
            <button
              type="button"
              onClick={() => openClientWithParams(params)}
              key={params.date}
            >
              {params.url}
            </button>
          ))}
        </>
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
