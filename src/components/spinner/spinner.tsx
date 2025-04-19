import clsx from 'clsx';
import styles from './spinner.module.scss';

export function Spinner({ small = false }: { small?: boolean }) {
  return (
    <div role="status" className={clsx(styles.spinner__wrapper, 'spinner')}>
      <div className={clsx(styles.spinner, small && styles.spinner_small)}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}
