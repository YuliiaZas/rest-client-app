import { IResponse } from '@/types';
import BodyEditor from '../body-editor/body-editor';
import { ErrorType } from '@/entites';
import { httpStatus } from '@/data';

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
      <>
        <p>
          <b>Status:</b> {response.status} / {statusText}
        </p>
        <p>
          <b>Body:</b>
        </p>
        <BodyEditor body={response.body} setBody={() => null} readOnly={true} />
      </>
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
