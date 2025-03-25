'use client';

import { fetchData } from '@/api';
import MethodSelector from '@/components/method-selector/method-selector';
import RequestOptions from '@/components/request-options/request-options';
import ResponseView from '@/components/response-view/response-view';
import { IResponse } from '@/types';
import { decodeBase64, updateUrl } from '@/utils';
import { isValidURL } from '@/utils/is-valid-url';
import { ChangeEvent, FormEvent, use, useEffect, useState } from 'react';
import styles from './rest-client.module.scss';

type RestClientProps = {
  params: Promise<{ params: string[] }>;
};

export default function RestClient({ params }: RestClientProps) {
  const [response, setResponse] = useState<IResponse | null>(null);
  const [defaultMethod, encodedUrl, encodedBody] = use(params).params;
  const [method, setMethod] = useState(defaultMethod);
  const decodedUrl = decodeBase64(encodedUrl);
  const [url, setUrl] = useState(decodedUrl);
  const decodedBody = decodeBase64(encodedBody);
  const [body, setBody] = useState(decodedBody);

  useEffect(() => {
    const request = async () => {
      const res = await fetchData(method, url, body);
      if (res) {
        setResponse({ status: res.status, body: JSON.stringify(res.json) });
      }
    };

    request();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValid = isValidURL(url);

    if (isValid) {
      const res = await fetchData(method, url, body);
      if (res) {
        setResponse({ status: res.status, body: JSON.stringify(res.json) });
      }
    }
  };

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;

    updateUrl(method, newUrl, body);
    setUrl(newUrl);
  };

  const handleChangeMethod = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMethod = e.target.value;

    updateUrl(newMethod, url, body);
    setMethod(newMethod);
  };

  const handleChangeBody = (newBody: string) => {
    updateUrl(method, url, newBody);
    setBody(newBody);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.controls}>
            <MethodSelector value={method} onChange={handleChangeMethod} />
            <input
              className={styles.input}
              name="url"
              value={url}
              onChange={handleChangeUrl}
            />
            <button className={styles.btn}>Go!</button>
          </div>
        </form>
        <section className={styles.section}>
          <h2 className={styles.label}>Request</h2>
          <div>
            <RequestOptions body={body} setBody={handleChangeBody} />
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
    </div>
  );
}
