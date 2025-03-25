'use client';

import MethodSelector from '@/components/method-selector/method-selector';
import RequestOptions from '@/components/request-options/request-options';
import ResponseView from '@/components/response-view/response-view';
import { IRequest, IResponse } from '@/types';
import { isValidURL } from '@/utils/is-valid-url';
import { FormEvent, useState } from 'react';
import styles from './rest-client.module.scss';

export default function RestClient() {
  const [response, setResponse] = useState<IResponse | null>(null);
  const [body, setBody] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const { method, url } = Object.fromEntries(formData.entries());

    const isValid = isValidURL(url);

    if (isValid) {
      try {
        const requestOptions: IRequest = {
          method: method as string,
        };

        if (body && method !== 'GET') {
          requestOptions.body = body;
        }

        const res = await fetch(url as string, requestOptions);
        const json = await res.json();
        if (json) {
          setResponse({ status: res.status, body: JSON.stringify(json) });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.controls}>
          <MethodSelector />
          <input className={styles.input} name="url" />
          <button className={styles.btn}>Go!</button>
        </div>
      </form>
      <section className={styles.section}>
        <h2 className={styles.label}>Request</h2>
        <div>
          <RequestOptions body={body} setBody={setBody} />
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.label}>Response</h2>
        {response ? (
          <ResponseView response={response} />
        ) : (
          <p>No response yet</p>
        )}
      </section>
    </div>
  );
}
