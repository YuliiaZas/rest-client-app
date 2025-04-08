'use client';

import { useClientContext } from '@/context';
import { httpStatus } from '@/data';
import BodyEditor from '../body-editor/body-editor';
import { ScrollLayout } from '../scroll-layout';
import styles from './response-view.module.scss';

export default function ResponseView() {
  const { response, error } = useClientContext();

  const ApiResponse = () => {
    if (!response) return <p>No response yet</p>;

    const statusText = httpStatus?.[response.status];

    return (
      <div className={styles.response}>
        <ScrollLayout
          headerChildren={
            <>
              <p>
                <b>Status:</b> {response.status} / {statusText}
              </p>
              <p>
                <b>Body:</b>
              </p>
            </>
          }
        >
          <BodyEditor
            body={response.body}
            setBody={() => null}
            readOnly={true}
          />
        </ScrollLayout>
      </div>
    );
  };

  const ErrorResponse = () => {
    if (!error) return null;
    return (
      <>
        <p className="p1">Could not send request</p>
        <p>
          <b>Reason:</b>
          {error.message}
        </p>
      </>
    );
  };

  return error ? <ErrorResponse /> : <ApiResponse />;
}
