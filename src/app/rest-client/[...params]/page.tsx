'use client';

import { fetchData } from '@/api';
import MethodSelector from '@/components/method-selector/method-selector';
import RequestOptions from '@/components/request-options/request-options';
import ResponseView from '@/components/response-view/response-view';
import { IHeader, IResponse } from '@/types';
import { decodeBase64, updateUrl } from '@/utils';
import { isValidURL } from '@/utils/is-valid-url';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, use, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './rest-client.module.scss';

type RestClientProps = {
  params: Promise<{ params: string[] }>;
};

export default function RestClient({ params }: RestClientProps) {
  const [response, setResponse] = useState<IResponse | null>(null);
  const [defaultMethod, encodedUrl, encodedBody] = use(params).params;
  const [method, setMethod] = useState(defaultMethod ?? 'GET');
  const decodedUrl = decodeBase64(encodedUrl ?? '');
  const [url, setUrl] = useState(decodedUrl);
  const decodedBody = decodeBase64(encodedBody ?? '');
  const [body, setBody] = useState(decodedBody);
  const searchParams = useSearchParams();
  const headersArray = Array.from(searchParams.entries()).map(
    ([key, value]) => ({ id: uuidv4(), key, value })
  );
  const [headers, setHeaders] = useState<IHeader[]>(headersArray);
  const [headerParams, setHeaderParams] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    headers.forEach(({ key, value }) => {
      params.append(key, value);
    });

    setHeaderParams(`?${params.toString()}`);
  }, [headers]);

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = async () => {
    const isValid = isValidURL(url);

    if (isValid) {
      const res = await fetchData(method, url, body, headersArray);
      if (res) {
        setResponse({ status: res.status, body: res.body });
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    handleRequest();
  };

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;

    updateUrl(method, newUrl, body, headerParams);
    setUrl(newUrl);
  };

  const handleChangeMethod = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMethod = e.target.value;

    updateUrl(newMethod, url, body, headerParams);
    setMethod(newMethod);
  };

  const handleChangeBody = (newBody: string) => {
    updateUrl(method, url, newBody, headerParams);
    setBody(newBody);
  };

  const handleChangeHeaders = (headers: IHeader[]) => {
    const params = new URLSearchParams();
    headers.forEach(({ key, value }) => {
      params.append(key, value);
    });
    const searchParams = `?${params.toString()}`;

    updateUrl(method, url, body, searchParams);
    setHeaders(headers);
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
            <RequestOptions
              body={body}
              setBody={handleChangeBody}
              headers={headers}
              setHeaders={handleChangeHeaders}
            />
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
