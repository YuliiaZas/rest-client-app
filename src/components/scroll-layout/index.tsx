import { ReactNode } from 'react';
import styles from './scroll-layout.module.scss';
import clsx from 'clsx';

interface ScrollLayoutProps {
  headerChildren?: ReactNode;
  contentChildren: ReactNode;
  scrollOnWholeLayout?: boolean;
}

export const ScrollLayout = ({
  headerChildren,
  contentChildren,
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
        {contentChildren}
      </div>
    </div>
  );
};
