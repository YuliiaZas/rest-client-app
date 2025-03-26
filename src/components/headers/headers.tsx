'use client';

import { IHeader } from '@/types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './headers.module.scss';

type HeadersProps = {
  headers: IHeader[];
  setHeaders: (headers: IHeader[]) => void;
};

export default function Headers({ headers, setHeaders }: HeadersProps) {
  const [newHeader, setNewHeader] = useState({
    id: uuidv4(),
    key: '',
    value: '',
  });

  const addHeader = () => {
    if (newHeader.key && newHeader.value) {
      setHeaders([...headers, newHeader]);
      setNewHeader({ id: uuidv4(), key: '', value: '' });
    }
  };

  const deleteHeader = (id: string) => {
    const filteredHeaders = headers.filter((header) => header.id !== id);
    setHeaders(filteredHeaders);
  };

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr className={styles.row}>
            <th className={styles.data}>Header Key</th>
            <th className={styles.data}>Header Value</th>
            <th className={styles.actions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header) => (
            <tr key={header.id} className={styles.row}>
              <td className={styles.data}>{header.key}</td>
              <td className={styles.data}>{header.value}</td>
              <td className={styles.actions}>
                <button
                  type="button"
                  className={'btn ' + styles.actionBtn}
                  onClick={() => deleteHeader(header.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr className={styles.row}>
            <td className={styles.data}>
              <input
                placeholder="Header Key"
                value={newHeader.key}
                onChange={(e) =>
                  setNewHeader({ ...newHeader, key: e.target.value })
                }
                className={styles.input}
              />
            </td>
            <td className={styles.data}>
              <input
                placeholder="Header Value"
                value={newHeader.value}
                onChange={(e) =>
                  setNewHeader({ ...newHeader, value: e.target.value })
                }
                className={styles.input}
              />
            </td>
            <td className={styles.actions}>
              <button
                onClick={addHeader}
                type="button"
                className={'btn ' + styles.actionBtn}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
