import Link from 'next/link';
import styles from './page.module.scss';
import { Translated } from '@/components';

export default function RootPage() {
  return (
    <div className={styles.test}>
<<<<<<< HEAD
      <h1>Empty app</h1>
      <Link href="/rest-client/GET">REST Client</Link>
=======
      <h1>
        <Translated scope="root" text="title" />
      </h1>
      <p>
        <Translated scope="root" text="description" />
      </p>
>>>>>>> 779e9d010b17ead4078f0ddd52b5d32eb219d904
    </div>
  );
}
