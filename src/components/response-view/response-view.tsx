'use client';

import { useClientContext } from '@/context';
import { httpStatus } from '@/data';
import BodyEditor from '../body-editor/body-editor';
import { ScrollLayout } from '../scroll-layout';
import styles from './response-view.module.scss';
import { useTranslations } from 'next-intl';

export default function ResponseView() {
  const { response, error } = useClientContext();
  const t = useTranslations('client');

  const ApiResponse = () => {
    if (!response) return <p>{t('noResponse')}</p>;

    const statusText = httpStatus?.[response.status];

    return (
      <div className={styles.response}>
        <ScrollLayout
          headerChildren={
            <>
              <p>
                <b>{t('status')}:</b> {response.status} / {statusText}
              </p>
              <p>
                <b>{t('body')}:</b>
              </p>
            </>
          }
        >
          <BodyEditor body={response.body} readOnly={true} />
        </ScrollLayout>
      </div>
    );
  };

  const ErrorResponse = () => {
    if (!error) return null;
    return (
      <>
        <p className="p1">{t('notSendRequest')}</p>
        <p>
          <b>{t('reason')}:</b>
          {error.message}
        </p>
      </>
    );
  };

  return error ? <ErrorResponse /> : <ApiResponse />;
}
