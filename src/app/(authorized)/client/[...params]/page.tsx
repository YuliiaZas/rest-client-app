'use client';

import { fetchData } from '@/api';
import MethodSelector from '@/components/method-selector/method-selector';
import RequestOptions from '@/components/request-options/request-options';
import ResponseView from '@/components/response-view/response-view';
import { Method } from '@/data';
import { IHeader, IResponse } from '@/types';
import {
  decodeBase64,
  getSearchParams,
  getUrlWithVariableValues,
  updateUrl,
} from '@/utils';
import { isValidURL } from '@/utils/is-valid-url';
import { useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  use,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './rest-client.module.scss';
import { Main } from '@/views';
import { InputWithVariables } from '@/components';
import { useLocalStorage } from '@/hooks';
import { Variables } from '@/entites';

type RestClientProps = {
  params: Promise<{ params: string[] }>;
};

export default function RestClient({ params }: RestClientProps) {
  const [response, setResponse] = useState<IResponse | null>(null);
  const [defaultMethod, encodedUrl, encodedBody] = use(params).params;
  const [method, setMethod] = useState<Method>(
    (defaultMethod as Method) ?? 'GET'
  );
  const decodedUrl = useMemo(
    () => decodeBase64(encodedUrl ?? ''),
    [encodedUrl]
  );
  const [url, setUrl] = useState(decodedUrl);
  const decodedBody = useMemo(
    () => decodeBase64(encodedBody ?? ''),
    [encodedUrl]
  );
  const [body, setBody] = useState(decodedBody);
  const searchParams = useSearchParams();
  const headersArray = useMemo(
    () =>
      Array.from(searchParams.entries()).map(([key, value]) => ({
        id: uuidv4(),
        key,
        value,
      })),
    [searchParams]
  );
  const [headers, setHeaders] = useState<IHeader[]>(headersArray);
  const [headerParams, setHeaderParams] = useState('');

  // const [variables, setVariables] = useLocalStorage<Variables>({
  const [variables] = useLocalStorage<Variables>({
    key: 'variables',
    defaultValue: { test: 'test value' },
  });

  useEffect(() => {
    if (headers.length) {
      const searchParams = getSearchParams(headers);
      setHeaderParams(searchParams);
    }
  }, [headers]);

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = async () => {
    const urlWithVariableValues = getUrlWithVariableValues(url, variables);
    const isValid = isValidURL(urlWithVariableValues);

    if (isValid) {
      const res = await fetchData(
        method,
        urlWithVariableValues,
        body,
        headersArray
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
    console.log('newUrl', newUrl);
    updateUrl(method, newUrl, body, headerParams);
    setUrl(newUrl);
  };

  const handleChangeMethod = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMethod = e.target.value as Method;

    updateUrl(newMethod, url, body, headerParams);
    setMethod(newMethod);
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
              <MethodSelector value={method} onChange={handleChangeMethod} />
              <InputWithVariables
                value={url}
                variables={variables}
                type={'primary'}
                onValueChange={handleChangeUrl}
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
    </Main>
  );
}
