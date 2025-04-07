import clsx from 'clsx';
import styles from './spinner.module.scss';

export function Spinner() {
  return (
    <div className={clsx(styles.spinner__wrapper, 'spinner')}>
      <div className={styles.spinner}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}
