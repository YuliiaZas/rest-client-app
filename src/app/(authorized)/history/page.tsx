'use client';

import { Column, Spinner, Table } from '@/components';
import { useLocalStorage } from '@/hooks';
import { IHistory } from '@/types';
import { getSearchParams, getUpdatedUrl } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './history.module.scss';

export default function History() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [history] = useLocalStorage<IHistory[]>({
    key: 'history',
    defaultValue: [],
  });

  useEffect(() => {
    setIsLoading(false);
  }, [history]);

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

  const sortedHistory = history.sort((a, b) => b.date - a.date);

  return (
    <div className={styles.history}>
      <h1 className={styles.history__title}>History</h1>

      {isLoading ? (
        <div className={styles.wrapper}>
          <Spinner />
        </div>
      ) : sortedHistory.length ? (
        <Table data={sortedHistory}>
          <Column
            title="Method"
            type="data"
            body={(data: IHistory) => <span>{data.method}</span>}
          />
          <Column
            title="URL"
            type="data"
            body={(data: IHistory) => (
              <button
                type="button"
                onClick={() => openClientWithParams(data)}
                key={data.date}
                className={styles.link}
              >
                {data.url}
              </button>
            )}
          />
          <Column
            title="Date"
            type="data"
            body={(data: IHistory) => (
              <span>{new Date(data.date).toLocaleDateString('ru-RU')}</span>
            )}
          />
        </Table>
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
