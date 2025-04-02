'use client';

import { fetchData } from '@/api';
import { Button, InputWithVariables } from '@/components';
import MethodSelector from '@/components/method-selector/method-selector';
import RequestOptions from '@/components/request-options/request-options';
import ResponseView from '@/components/response-view/response-view';
import { Method } from '@/data';
import { useFormattedParams, useLocalStorage } from '@/hooks';
import { IHeader, IHistory, IResponse, IVariable } from '@/types';
import {
  defaultAlProtocol,
  getSearchParams,
  isValidURL,
  replaceVariables,
  updateUrl,
} from '@/utils';
import { Main } from '@/views';
import { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './client.module.scss';
import { ErrorType } from '@/entites';

type RestClientProps = {
  params: Promise<{ params: string[] }>;
};

export default function RestClient({ params }: RestClientProps) {
  const [response, setResponse] = useState<IResponse | null>(null);
  const [appError, setAppError] = useState<ErrorType | null>(null);
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

  const [history, setHistory] = useLocalStorage<IHistory[]>({
    key: 'history',
    defaultValue: [],
  });

  useEffect(() => {
    if (headers.length) {
      const searchParams = getSearchParams(headers);
      setHeaderParams(searchParams);
    }
  }, [headers]);

  const handleRequest = async () => {
    setAppError(null);
    setResponse(null);

    const { updatedUrl, updatedBody, updatedHeaders } = replaceVariables(
      defaultAlProtocol(url),
      body,
      headers,
      variables
    );

    const urlValidation = await isValidURL(updatedUrl);

    if (!urlValidation) {
      setAppError(ErrorType.app);
      setResponse({ status: 0, body: 'URL is invalid' });
      return;
    }

    const res = await fetchData(
      method,
      updatedUrl,
      updatedBody,
      updatedHeaders
    );

    if (res.status === 0) {
      setAppError(ErrorType.app);
      setResponse({ status: 0, body: 'Error fetching data' });
      return;
    }

    if (res) {
      setResponse({ status: res.status, body: res.body });
      setHistory([
        ...history,
        {
          id: uuidv4(),
          method,
          url: updatedUrl,
          body: updatedBody,
          headers: updatedHeaders,
          date: Date.now(),
        },
      ]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await handleRequest();
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
          <RequestOptions
            url={url}
            method={method}
            body={body}
            setBody={handleChangeBody}
            headers={headers}
            setHeaders={handleChangeHeaders}
          />
        </section>
        <section className={styles.section}>
          <h2 className={styles.label}>Response</h2>
          {response ? (
            <ResponseView response={response} errorType={appError} />
          ) : (
            <p>No response yet</p>
          )}
        </section>
      </div>
    </Main>
  );
}
