import { IColumn } from '@/types';
import { Button } from '../button';
import styles from './table.module.scss';

type TableProps<T extends { id: string }> = {
  columns: IColumn[];
  data: T[];
  deleteItem: (id: string) => void;
  addItem: () => void;
  setNewItem: (item: T) => void;
  newItem: T;
};

export function Table<T extends { id: string }>({
  columns,
  data,
  deleteItem,
  addItem,
  setNewItem,
  newItem,
}: TableProps<T>) {
  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr className={styles.row}>
          {columns.map((column) => (
            <th className={styles[column.type]} key={column.label}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: T) => {
          const cols = Object.keys(item).filter((i) => i !== 'id');

          return (
            <tr key={item.id} className={styles.row}>
              {cols.map((col) => (
                <td className={styles.data} key={col}>
                  {item[col as keyof T] as string}
                </td>
              ))}

              {deleteItem && (
                <td className={styles.actions}>
                  <Button onClick={() => deleteItem(item.id)} text="Delete" />
                </td>
              )}
            </tr>
          );
        })}
        {addItem && (
          <tr className={styles.row}>
            {columns
              .filter((column) => column.type !== 'actions')
              .map((column) => {
                return (
                  <td className={styles.data} key={column.name}>
                    <input
                      placeholder={column.label}
                      value={String(newItem[column.name as keyof T] ?? '')}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          [column.name]: e.target.value,
                        })
                      }
                      className={styles.input}
                    />
                  </td>
                );
              })}
            <td className={styles.actions}>
              <Button onClick={addItem} text="Add" />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
