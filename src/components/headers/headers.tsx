'use client';

import { useLocalStorage } from '@/hooks';
import { IHeader, IVariable } from '@/types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../button';
import { Column } from '../column';
import { InputWithVariables } from '../input-with-variables';
import { Table } from '../table';
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

  const [variables] = useLocalStorage<IVariable[]>({
    key: 'variables',
    defaultValue: [],
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
    <Table data={headers} hasFooter={true}>
      <Column
        title="Header Key"
        type="data"
        body={(data: IHeader) => <span>{data.key}</span>}
        footer={
          <input
            placeholder="Header Key"
            value={newHeader.key}
            onChange={(e) =>
              setNewHeader((prev: IHeader) => ({
                ...prev,
                key: e.target.value,
              }))
            }
            className={styles.input}
          />
        }
      />
      <Column
        title="Header Value"
        type="data"
        body={(data: IHeader) => <span>{data.value}</span>}
        footer={
          <InputWithVariables
            placeholder="Header Value"
            value={newHeader.value}
            variables={variables}
            onValueChange={(value) =>
              setNewHeader((prev: IHeader) => ({
                ...prev,
                value,
              }))
            }
          />
        }
      />
      <Column
        title="Actions"
        type="actions"
        body={(data: IHeader) => (
          <Button onClick={() => deleteHeader(data.id)} text="Delete" />
        )}
        footer={<Button onClick={addHeader} text="Add" />}
      />
    </Table>
  );
}
