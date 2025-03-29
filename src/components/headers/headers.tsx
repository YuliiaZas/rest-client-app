'use client';

import { headerColumns } from '@/data';
import { IHeader } from '@/types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Table } from '../table';

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
    <Table
      columns={headerColumns}
      data={headers}
      deleteItem={deleteHeader}
      addItem={addHeader}
      newItem={newHeader}
      setNewItem={setNewHeader}
    />
  );
}
