import { IResponse } from '@/types';
import BodyEditor from '../body-editor/body-editor';
import { ErrorType } from '@/entites';
import { httpStatus } from '@/data';
import { ScrollLayout } from '../scroll-layout';
import styles from './response-view.module.scss';

type ResponseViewProps = {
  response?: IResponse;
  errorType: ErrorType | null;
};

export default function ResponseView({
  response,
  errorType,
}: ResponseViewProps) {
  const ApiResponse = () => {
    if (!response) return null;

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
          contentChildren={
            <BodyEditor
              body={response.body}
              setBody={() => null}
              readOnly={true}
            />
          }
        />
      </div>
    );
  };

  const AppError = () => (
    <>
      <p className="p1">Could not send request</p>
      <p>
        <b>Reason:</b>
        {response?.body}
      </p>
    </>
  );
  return <div>{!errorType && response ? <ApiResponse /> : <AppError />}</div>;
}
