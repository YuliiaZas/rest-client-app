'use client';

import { Column, Spinner, Table, Translated } from '@/components';
import { useLocalStorage } from '@/hooks';
import { IHistory } from '@/types';
import { getSearchParams, getUpdatedUrl } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './history.module.scss';
import { useTranslations } from 'next-intl';

export default function History() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [history] = useLocalStorage<IHistory[]>({
    key: 'history',
    defaultValue: [],
  });
  const t = useTranslations('history');

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

    router.push(updatedUrl);
  };

  const sortedHistory = Array.isArray(history)
    ? history.sort((a, b) => b.date - a.date)
    : [];

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.history}>
      <h1 className={styles.history__title}>
        <Translated scope="history" text="title" />
      </h1>

      {sortedHistory.length ? (
        <Table data={sortedHistory} hasStickySpace={true}>
          <Column
            title={t('method')}
            type="data_secondary"
            body={(data: IHistory) => <span>{data.method}</span>}
          />
          <Column
            title={t('url')}
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
            title={t('date')}
            type="data_secondary"
            body={(data: IHistory) => (
              <span>{new Date(data.date).toLocaleDateString('ru-RU')}</span>
            )}
          />
        </Table>
      ) : (
        <>
          <div className={styles.history__empty}>
            <p className={styles.history__message}>
              <Translated scope="history" text="empty" />.<br />
              <Translated scope="history" text="emptyAction" />:
            </p>
          </div>
          <Link
            href="/client/GET"
            className={styles.history__link}
            prefetch={true}
          >
            <Translated scope="client" text="title" />
          </Link>
        </>
      )}
    </div>
  );
}
