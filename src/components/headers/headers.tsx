'use client';

import { useAppContext } from '@/context/app-context';
import { IHeader } from '@/types';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Actions } from '..';
import { Button } from '../button';
import { Column } from '../column';
import { Input } from '../input';
import { InputWithVariables } from '@/components';
import { ScrollLayout } from '../scroll-layout';
import { Table } from '../table';
import { NotificationsContext } from '@/context';

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
  const { variables } = useAppContext();
  const { addNotification } = useContext(NotificationsContext);

  const addHeader = () => {
    try {
      if (newHeader.key && newHeader.value) {
        setHeaders([...headers, newHeader]);
        setNewHeader({ id: uuidv4(), key: '', value: '' });
        setEditableHeader(null);
      }
    } catch {
      addNotification({ message: 'Error adding header' });
    }
  };

  const editHeader = (key: string, value: string) => {
    try {
      if (editableHeader) {
        setEditableHeader({ ...editableHeader, [key]: value });
      }
    } catch {
      addNotification({ message: 'Error editing header' });
    }
  };

  const saveEditableHeader = () => {
    try {
      const editedHeaders = headers.map((header) =>
        header.id === editableHeader?.id ? editableHeader : header
      );
      setHeaders(editedHeaders);
      setEditableHeader(null);
    } catch {
      addNotification({ message: 'Error saving header' });
    }
  };

  const deleteHeader = (id: string) => {
    try {
      const filteredHeaders = headers.filter((header) => header.id !== id);
      setHeaders(filteredHeaders);
      setEditableHeader(null);
    } catch {
      addNotification({ message: 'Error deleting header' });
    }
  };

  return (
    <ScrollLayout>
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
            <Actions
              isEdit={editableHeader?.id === data.id}
              save={saveEditableHeader}
              cancel={() => setEditableHeader(null)}
              delete={() => deleteHeader(data.id)}
              edit={() => setEditableHeader(data)}
            />
          )}
          footer={<Button onClick={addHeader} icon="add" />}
        />
      </Table>
    </ScrollLayout>
  );
}
