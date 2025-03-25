import { IResponse } from '@/types/response.type';
import styles from './response-view.module.scss';

type ResponseViewProps = {
  response: IResponse;
};

export default function ResponseView({ response }: ResponseViewProps) {
  return (
    <>
      <div className={styles.view}>
        <p>Status: {response.status}</p>
        <p>Body:</p>
        <pre>{JSON.stringify(response.json, null, 2)}</pre>
      </div>
    </>
  );
}
