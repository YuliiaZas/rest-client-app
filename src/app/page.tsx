import styles from './page.module.scss';
import { LocaleSwitcher, Translated } from '@/components';

export default function RootPage() {
  return (
    <div className={styles.test}>
      <LocaleSwitcher />
      <h1>
        <Translated scope="root" text="title" />
      </h1>
      <p>
        <Translated scope="root" text="description" />
      </p>
    </div>
  );
}
