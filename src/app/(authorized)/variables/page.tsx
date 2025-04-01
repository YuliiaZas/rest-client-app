'use client';

import { Button, Column, Spinner, Table } from '@/components';
import { useLocalStorage } from '@/hooks';
import { IVariable } from '@/types';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './variables.module.scss';

export default function Variables() {
  const [newVariable, setNewVariable] = useState({
    id: uuidv4(),
    name: '',
    value: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [variables, setVariables] = useLocalStorage<IVariable[]>({
    key: 'variables',
    defaultValue: [],
  });

  useEffect(() => {
    setIsLoading(false);
  }, [variables]);

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
      {isLoading ? (
        <div className={styles.wrapper}>
          <Spinner />
        </div>
      ) : (
        <Table data={variables} hasFooter={true}>
          <Column
            title="Variable Name"
            type="data"
            body={(data: IVariable) => <span>{data.name}</span>}
            footer={
              <input
                placeholder="Variable Name"
                value={newVariable.name}
                onChange={(e) =>
                  setNewVariable((prev: IVariable) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className={styles.input}
              />
            }
          />
          <Column
            title="Variable Value"
            type="data"
            body={(data: IVariable) => <span>{data.value}</span>}
            footer={
              <input
                placeholder="Variable Value"
                value={newVariable.value}
                onChange={(e) =>
                  setNewVariable((prev: IVariable) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                className={styles.input}
              />
            }
          />
          <Column
            title="Actions"
            type="actions"
            body={(data: IVariable) => (
              <Button onClick={() => deleteVariable(data.id)} icon="delete" />
            )}
            footer={<Button onClick={addVariable} icon="add" />}
          />
        </Table>
      )}
    </div>
  );
}
