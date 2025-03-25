import Link from 'next/link';
import styles from './page.module.scss';

export default async function RootPage() {
  return (
    <div className={styles.test}>
      <h1>Empty app</h1>
      <Link href="/rest-client/GET">REST Client</Link>
    </div>
  );
}
