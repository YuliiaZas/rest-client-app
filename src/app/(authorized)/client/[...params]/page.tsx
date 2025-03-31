'use client';

import { fetchData } from '@/api';
import { Button, InputWithVariables } from '@/components';
import MethodSelector from '@/components/method-selector/method-selector';
import RequestOptions from '@/components/request-options/request-options';
import ResponseView from '@/components/response-view/response-view';
import { Method } from '@/data';
import { useFormattedParams, useLocalStorage } from '@/hooks';
import { IHeader, IResponse, IVariable } from '@/types';
import {
  getSearchParams,
  isValidURL,
  replaceVariables,
  updateUrl,
} from '@/utils';
import { Main } from '@/views';
import { FormEvent, useEffect, useState } from 'react';
import styles from './client.module.scss';

type RestClientProps = {
  params: Promise<{ params: string[] }>;
};

export default function RestClient({ params }: RestClientProps) {
  const [response, setResponse] = useState<IResponse | null>(null);
  const {
    url,
    body,
    method,
    headers,
    headerParams,
    setUrl,
    setBody,
    setMethod,
    setHeaders,
    setHeaderParams,
  } = useFormattedParams(params);

  const [variables] = useLocalStorage<IVariable[]>({
    key: 'variables',
    defaultValue: [],
  });

  useEffect(() => {
    if (headers.length) {
      const searchParams = getSearchParams(headers);
      setHeaderParams(searchParams);
    }
  }, [headers]);

  const handleRequest = async () => {
    const { updatedUrl, updatedBody, updatedHeaders } = replaceVariables(
      url,
      body,
      headers,
      variables
    );

    if (isValidURL(updatedUrl)) {
      const res = await fetchData(
        method,
        updatedUrl,
        updatedBody,
        updatedHeaders
      );
      if (res) {
        setResponse({ status: res.status, body: res.body });
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    handleRequest();
  };

  const handleChangeUrl = (newUrl: string) => {
    updateUrl(method, newUrl, body, headerParams);
    setUrl(newUrl);
  };

  const handleChangeMethod = (newMethod: string) => {
    updateUrl(newMethod as Method, url, body, headerParams);
    setMethod(newMethod as Method);
  };

  const handleChangeBody = (newBody: string) => {
    updateUrl(method, url, newBody, headerParams);
    setBody(newBody);
  };

  const handleChangeHeaders = (headers: IHeader[]) => {
    const searchParams = getSearchParams(headers);

    updateUrl(method, url, body, searchParams);
    setHeaders(headers);
    setHeaderParams(searchParams);
  };

  return (
    <Main>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.controls}>
              <div className={styles.method}>
                <MethodSelector value={method} onChange={handleChangeMethod} />
              </div>
              <InputWithVariables
                value={url}
                variables={variables}
                typeClass={'primary'}
                onValueChange={handleChangeUrl}
              />
              <Button text="Send" />
            </div>
          </form>
          <section className={styles.section}>
            <h2 className={styles.label}>Request</h2>
            <div>
              <RequestOptions
                url={url}
                method={method}
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
    </Main>
  );
}
