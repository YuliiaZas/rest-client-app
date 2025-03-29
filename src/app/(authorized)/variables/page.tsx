'use client';

import { Table } from '@/components';
import { variableColumns } from '@/data';
import { useLocalStorage } from '@/hooks';
import { IVariable } from '@/types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './variables.module.scss';

export default function Variables() {
  const [newVariable, setNewVariable] = useState({
    id: uuidv4(),
    name: '',
    value: '',
  });

  const [variables, setVariables] = useLocalStorage<IVariable[]>({
    key: 'variables',
    defaultValue: [],
  });

  const addVariable = () => {
    if (newVariable.name && newVariable.value) {
      setVariables([...variables, newVariable]);
      setNewVariable({ id: uuidv4(), name: '', value: '' });
    }
  };

  const deleteVariable = (id: string) => {
    const filteredVariables = variables.filter(
      (variable) => variable.id !== id
    );
    setVariables(filteredVariables);
  };

  return (
    <div className={styles.variables}>
      <h1 className={styles.variables__title}>Variables</h1>
      <Table
        columns={variableColumns}
        data={variables}
        addItem={addVariable}
        deleteItem={deleteVariable}
        newItem={newVariable}
        setNewItem={setNewVariable}
      />
    </div>
  );
}
