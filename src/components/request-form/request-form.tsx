'use client';

import { fetchData } from '@/api';
import { NotificationsContext } from '@/context';
import { useAppContext } from '@/context/app-context';
import { useClientContext } from '@/context/client-context';
import { Method } from '@/data';
import { ApiError, AppError } from '@/entites';
import { useLocalStorage } from '@/hooks';
import { IHistory } from '@/types';
import {
  defaultAlProtocol,
  isValidURL,
  replaceVariables,
  updateUrl,
} from '@/utils';
import { FormEvent, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../button';
import { InputWithVariables } from '../input-with-variables';
import MethodSelector from '../method-selector/method-selector';
import styles from './request-form.module.scss';
import { useTranslations } from 'next-intl';

export function RequestForm() {
  const {
    url,
    body,
    method,
    headers,
    headerParams,
    setUrl,
    setMethod,
    setResponse,
    appDefaultHeaders,
    setError,
  } = useClientContext();
  const { variables } = useAppContext();
  const t = useTranslations('client');
  const { addNotification } = useContext(NotificationsContext);
  const [history, setHistory] = useLocalStorage<IHistory[]>({
    key: 'history',
    defaultValue: [],
  });

  const handleRequest = async () => {
    setError(null);
    setResponse(null);

    try {
      const {
        updatedUrl: urlWithReplacedVariables,
        updatedBody,
        updatedHeaders,
      } = replaceVariables(url, body, headers, variables);
      const updatedUrl = defaultAlProtocol(urlWithReplacedVariables);

      const urlValidation = await isValidURL(updatedUrl);

      if (!urlValidation) {
        throw new AppError('URL is invalid');
      }

      const res = await fetchData(method, updatedUrl, updatedBody, [
        ...appDefaultHeaders,
        ...updatedHeaders,
      ]);

      if (!res) {
        throw new ApiError('No response from server');
      }

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
    } catch (error: unknown) {
      if (error instanceof AppError || error instanceof ApiError) {
        addNotification({ message: error.message });
        return;
      }
      throw error;
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

  return (
    <form onSubmit={handleSubmit} className={styles['request-form']}>
      <div className={styles['request-form__controls']}>
        <div className={styles['request-form__method']}>
          <MethodSelector value={method} onChange={handleChangeMethod} />
        </div>
        <InputWithVariables
          value={url}
          variables={variables}
          typeClass={'primary'}
          onValueChange={handleChangeUrl}
        />
        <Button text={t('send')} />
      </div>
    </form>
  );
}
