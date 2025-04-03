import { IResponse } from '@/types';
import BodyEditor from '../body-editor/body-editor';
import { UnionErrorType } from '@/entites';
import { httpStatus } from '@/data';
import { ScrollLayout } from '../scroll-layout';
import styles from './response-view.module.scss';

type ResponseViewProps = {
  response: IResponse | null;
  error: UnionErrorType | null;
};

export default function ResponseView({ response, error }: ResponseViewProps) {
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
