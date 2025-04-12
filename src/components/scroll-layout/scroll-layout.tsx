import { ReactNode } from 'react';
import styles from './scroll-layout.module.scss';
import clsx from 'clsx';

interface ScrollLayoutProps {
  headerChildren?: ReactNode;
  children: ReactNode;
  scrollOnWholeLayout?: boolean;
}

export const ScrollLayout = ({
  headerChildren,
  children,
  scrollOnWholeLayout = false,
}: ScrollLayoutProps) => {
  return (
    <div
      className={clsx(
        styles.layout,
        scrollOnWholeLayout && styles.layout__scroll
      )}
    >
      {headerChildren && (
        <div className={styles.layout__header}>{headerChildren}</div>
      )}
      <div
        className={clsx(
          styles.layout__content,
          !scrollOnWholeLayout && styles.layout__scroll
        )}
      >
        {children}
      </div>
    </div>
  );
};
