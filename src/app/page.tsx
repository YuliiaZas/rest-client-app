import { Login } from '@/components/login/login';
import styles from './page.module.scss';

export default async function RootPage() {
  return (
    <div className={styles.test}>
      <h1>Empty app</h1>

      <Login />
    </div>
  );
}
