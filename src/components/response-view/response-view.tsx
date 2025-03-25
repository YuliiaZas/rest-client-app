import { IResponse } from '@/types';
import BodyEditor from '../body-editor/body-editor';

type ResponseViewProps = {
  response: IResponse;
};

export default function ResponseView({ response }: ResponseViewProps) {
  return (
    <>
      <div>
        <p>
          <b>Status:</b> {response.status}
        </p>
        <p>
          <b>Body:</b>
        </p>
        <BodyEditor body={response.body} setBody={() => null} readOnly={true} />
      </div>
    </>
  );
}
