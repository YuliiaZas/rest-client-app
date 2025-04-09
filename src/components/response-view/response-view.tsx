'use client';

import { useClientContext } from '@/context';
import { httpStatus } from '@/data';
import BodyEditor from '../body-editor/body-editor';
import { ScrollLayout } from '../scroll-layout';
import styles from './response-view.module.scss';
import { Translated } from '../translated';

export default function ResponseView() {
  const { response, error } = useClientContext();

  const ApiResponse = () => {
    if (!response)
      return (
        <p>
          <Translated scope="client" text="noResponse" />
        </p>
      );

    const statusText = httpStatus?.[response.status];

    return (
      <div className={styles.response}>
        <ScrollLayout
          headerChildren={
            <>
              <p>
                <b>
                  <Translated scope="client" text="status" />:
                </b>{' '}
                {response.status} / {statusText}
              </p>
              <p>
                <b>
                  <Translated scope="client" text="body" />:
                </b>
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
        <p className="p1">
          <Translated scope="client" text="notSendRequest" />
        </p>
        <p>
          <b>
            <Translated scope="client" text="reason" />:
          </b>
          {error.message}
        </p>
      </>
    );
  };

  return error ? <ErrorResponse /> : <ApiResponse />;
}
