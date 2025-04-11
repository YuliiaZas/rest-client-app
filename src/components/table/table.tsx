import { Children, isValidElement, ReactNode } from 'react';
import styles from './table.module.scss';
import clsx from 'clsx';

type TableProps<T extends { id: string }> = {
  data: T[];
  children: ReactNode;
  hasFooter?: boolean;
  hasStickySpace?: boolean;
};

type TableChild<T> = {
  title: string;
  type: string;
  body: (data: T) => JSX.Element;
  footer?: ReactNode;
};

export function Table<T extends { id: string }>({
  data,
  children,
  hasFooter = false,
  hasStickySpace = false,
}: TableProps<T>) {
  const columns = Children.toArray(children)
    .filter(isValidElement)
    .map((child) => {
      const element = child as React.ReactElement<TableChild<T>>;
      return {
        title: element.props.title,
        type: element.props.type,
        body: element.props.body,
        footer: element.props.footer,
      };
    });

  return (
    <table className={styles.table}>
      <thead
        className={clsx(
          styles.table__header,
          hasStickySpace && styles['table__header_sticky-space']
        )}
      >
        <tr className={styles.table__row}>
          {columns.map((column) => (
            <th
              key={column.title}
              className={styles[`table__row-${column.type}`]}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className={styles.table__row}>
            {columns.map((column, index) => (
              <td key={index} className={styles[`table__row-${column.type}`]}>
                {typeof column.body === 'function'
                  ? column.body(row)
                  : column.body}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {hasFooter && (
        <tfoot
          className={clsx(
            styles.table__footer,
            hasStickySpace && styles['table__footer_sticky-space']
          )}
        >
          <tr className={styles.table__row}>
            {columns.map((column, index) => (
              <td key={index} className={styles[`table__row-${column.type}`]}>
                {column.footer}
              </td>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  );
}
