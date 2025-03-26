import { Login } from '@/components/login/login';
import styles from './page.module.scss';
import { Translated } from '@/components';

export default function RootPage() {
  return (
    <div className={styles.test}>
      <h1>
        <Translated scope="root" text="title" />
      </h1>
      <p>
        <Translated scope="root" text="description" />
      </p>
      <Login />
    </div>
  );
}
