'use client';

import { RequestForm } from '@/components';
import RequestOptions from '@/components/request-options/request-options';
import ResponseView from '@/components/response-view/response-view';
import { Main } from '@/views';
import styles from './client.module.scss';
import { useTranslations } from 'next-intl';

export default function RestClient() {
  const t = useTranslations('client');

  return (
    <Main>
      <div className={styles.container}>
        <RequestForm />
        <section className={styles.section}>
          <h2 className={styles.label}>{t('request')}</h2>
          <RequestOptions />
        </section>
        <section className={styles.section}>
          <h2 className={styles.label}>{t('response')}</h2>
          <ResponseView />
        </section>
      </div>
    </Main>
  );
}
