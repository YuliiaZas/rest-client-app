'use client';

import MethodSelector from '@/components/method-selector/method-selector';
import ResponseView from '@/components/response-view/response-view';
import { IResponse } from '@/types/response.type';
import { isValidURL } from '@/utils/is-valid-url';
import { FormEvent, useState } from 'react';
import styles from './rest-client.module.scss';

export default function RestClient() {
  const [response, setResponse] = useState<IResponse | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const { method, url } = Object.fromEntries(formData.entries());

    const isValid = isValidURL(url);

    if (isValid) {
      try {
        const res = await fetch(url as string, {
          method: method as string,
        });
        const json = await res.json();

        if (json) {
          setResponse({ status: res.status, json });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <MethodSelector />
        <input className={styles.input} name="url" />
        <button className={styles.btn}>Go!</button>
      </form>
      {response && <ResponseView response={response} />}
    </div>
  );
}
