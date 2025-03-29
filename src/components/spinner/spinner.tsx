import styles from './spinner.module.scss';

export function Spinner() {
  return (
    <div>
      <div className={styles.spinner}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}
