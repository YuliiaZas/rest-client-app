'use client';

import { useLocalStorage } from '@/hooks';
import { IHeader, IVariable } from '@/types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../button';
import { Column } from '../column';
import { Input } from '../input';
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
  const [editableHeader, setEditableHeader] = useState<IHeader | null>(null);
  const [variables] = useLocalStorage<IVariable[]>({
    key: 'variables',
    defaultValue: [],
  });

  const addHeader = () => {
    if (newHeader.key && newHeader.value) {
      setHeaders([...headers, newHeader]);
      setNewHeader({ id: uuidv4(), key: '', value: '' });
      setEditableHeader(null);
    }
  };

  const editHeader = (key: string, value: string) => {
    if (editableHeader) {
      setEditableHeader({ ...editableHeader, [key]: value });
    }
  };

  const saveEditableHeader = () => {
    const editedHeaders = headers.map((header) =>
      header.id === editableHeader?.id ? editableHeader : header
    );
    setHeaders(editedHeaders);
    setEditableHeader(null);
  };

  const deleteHeader = (id: string) => {
    const filteredHeaders = headers.filter((header) => header.id !== id);
    setHeaders(filteredHeaders);
    setEditableHeader(null);
  };

  return (
    <Table data={headers} hasFooter={true}>
      <Column
        title="Header Key"
        type="data"
        body={(data: IHeader) =>
          editableHeader?.id === data.id ? (
            <Input
              id={`${newHeader.id}-key-body`}
              placeholder="Header Key"
              defaultValue={data.key}
              onValueChange={(key) => {
                editHeader('key', key);
              }}
            />
          ) : (
            <span>{data.key}</span>
          )
        }
        footer={
          <Input
            id={`${newHeader.id}-key-footer`}
            defaultValue={newHeader.key}
            placeholder="Header Key"
            onValueChange={(key) => {
              setNewHeader((prevHeader) => ({ ...prevHeader, key }));
            }}
          />
        }
      />
      <Column
        title="Header Value"
        type="data"
        body={(data: IHeader) =>
          editableHeader?.id === data.id ? (
            <InputWithVariables
              placeholder="Header Value"
              value={data.value}
              variables={variables}
              onValueChange={(value) => {
                editHeader('value', value);
              }}
            />
          ) : (
            <span>{data.value}</span>
          )
        }
        footer={
          <InputWithVariables
            placeholder="Header Value"
            value={newHeader.value}
            variables={variables}
            onValueChange={(value) =>
              setNewHeader((prevHeader) => ({ ...prevHeader, value }))
            }
          />
        }
      />
      <Column
        title="Actions"
        type="actions"
        body={(data: IHeader) => (
          <div className={styles.actions}>
            {editableHeader?.id === data.id ? (
              <Button onClick={saveEditableHeader} icon="save" />
            ) : (
              <Button onClick={() => setEditableHeader(data)} icon="edit" />
            )}
            <Button onClick={() => deleteHeader(data.id)} icon="delete" />
          </div>
        )}
        footer={<Button onClick={addHeader} icon="add" />}
      />
    </Table>
  );
}
