'use client';

import { RequestForm, Translated } from '@/components';
import RequestOptions from '@/components/request-options/request-options';
import ResponseView from '@/components/response-view/response-view';
import { Main } from '@/views';
import styles from './client.module.scss';

export default function RestClient() {
  return (
    <Main>
      <div className={styles.container}>
        <RequestForm />
        <section className={styles.section}>
          <h2 className={styles.label}>
            <Translated scope="client" text="request" />
          </h2>
          <RequestOptions />
        </section>
        <section className={styles.section}>
          <h2 className={styles.label}>
            <Translated scope="client" text="response" />
          </h2>
          <ResponseView />
        </section>
      </div>
    </Main>
  );
}
