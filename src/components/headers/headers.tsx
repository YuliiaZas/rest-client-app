'use client';

import {
  Actions,
  Button,
  Column,
  Input,
  InputWithVariables,
  ScrollLayout,
  Table,
} from '@/components';
import {
  useNotificationsContext,
  useClientContext,
  useAppContext,
} from '@/context';
import { IHeader } from '@/types';
import { getSearchParams, updateUrl } from '@/utils';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslations } from 'next-intl';

export default function Headers() {
  const [newHeader, setNewHeader] = useState({
    id: uuidv4(),
    key: '',
    value: '',
  });
  const [editableHeader, setEditableHeader] = useState<IHeader | null>(null);
  const { variables } = useAppContext();
  const { addNotification } = useNotificationsContext();
  const { url, method, body, headers, setHeaders, setHeaderParams } =
    useClientContext();
  const t = useTranslations('headers');
  const tActions = useTranslations('actions');

  const changeHeaders = (headers: IHeader[]) => {
    const searchParams = getSearchParams(headers);

    updateUrl(method, url, body, searchParams);
    setHeaders(headers);
    setHeaderParams(searchParams);
  };

  const addHeader = () => {
    try {
      if (newHeader.key && newHeader.value) {
        changeHeaders([...headers, newHeader]);
        setNewHeader({ id: uuidv4(), key: '', value: '' });
        setEditableHeader(null);
      }
    } catch {
      addNotification({ message: 'addingHeader' });
    }
  };

  const editHeader = (key: string, value: string) => {
    try {
      if (editableHeader) {
        setEditableHeader({ ...editableHeader, [key]: value });
      }
    } catch {
      addNotification({ message: 'editingHeader' });
    }
  };

  const saveEditableHeader = () => {
    try {
      const editedHeaders = headers.map((header) =>
        header.id === editableHeader?.id ? editableHeader : header
      );
      changeHeaders(editedHeaders);
      setEditableHeader(null);
    } catch {
      addNotification({ message: 'savingHeader' });
    }
  };

  const deleteHeader = (id: string) => {
    try {
      const filteredHeaders = headers.filter((header) => header.id !== id);
      changeHeaders(filteredHeaders);
      setEditableHeader(null);
    } catch {
      addNotification({ message: 'deletingHeader' });
    }
  };

  return (
    <ScrollLayout>
      <Table data={headers} hasFooter={true}>
        <Column
          title={t('key')}
          type="data"
          body={(data: IHeader) =>
            editableHeader?.id === data.id ? (
              <Input
                id={`${newHeader.id}-key-body`}
                placeholder={t('key')}
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
              placeholder={t('key')}
              onValueChange={(key) => {
                setNewHeader((prevHeader) => ({ ...prevHeader, key }));
              }}
            />
          }
        />
        <Column
          title={t('value')}
          type="data"
          body={(data: IHeader) =>
            editableHeader?.id === data.id ? (
              <InputWithVariables
                placeholder={t('value')}
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
              placeholder={t('value')}
              value={newHeader.value}
              variables={variables}
              onValueChange={(value) =>
                setNewHeader((prevHeader) => ({ ...prevHeader, value }))
              }
            />
          }
        />
        <Column
          title={tActions('actions')}
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
