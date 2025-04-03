'use client';

import { Actions, Button, Column, Input, Spinner, Table } from '@/components';
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
  const [editableVariable, setEditableVariable] = useState<IVariable | null>(
    null
  );
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
      setEditableVariable(null);
    }
  };

  const editVariable = (key: string, value: string) => {
    if (editableVariable) {
      setEditableVariable({ ...editableVariable, [key]: value });
    }
  };

  const saveEditableVariable = () => {
    const editedVariables = variables.map((variable) =>
      variable.id === editableVariable?.id ? editableVariable : variable
    );
    setVariables(editedVariables);
    setEditableVariable(null);
  };

  const deleteVariable = (id: string) => {
    const filteredVariables = variables.filter(
      (variable) => variable.id !== id
    );
    setVariables(filteredVariables);
    setEditableVariable(null);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.variables}>
      <h1 className={styles.variables__title}>Variables</h1>
      {
        <Table data={variables} hasFooter={true}>
          <Column
            title="Variable Name"
            type="data"
            body={(data: IVariable) =>
              editableVariable?.id === data.id ? (
                <Input
                  id={`${newVariable.id}-name`}
                  placeholder="Variable Name"
                  defaultValue={data.name}
                  onValueChange={(name) => {
                    editVariable('name', name);
                  }}
                />
              ) : (
                <span>{data.name}</span>
              )
            }
            footer={
              <Input
                id={`${newVariable.id}-name`}
                placeholder="Variable Name"
                defaultValue={newVariable.name}
                onValueChange={(name) => {
                  setNewVariable((prev: IVariable) => ({ ...prev, name }));
                }}
              />
            }
          />
          <Column
            title="Variable Value"
            type="data"
            body={(data: IVariable) =>
              editableVariable?.id === data.id ? (
                <Input
                  id={`${newVariable.id}-value`}
                  placeholder="Variable Value"
                  defaultValue={data.value}
                  onValueChange={(value) => {
                    editVariable('value', value);
                  }}
                />
              ) : (
                <span>{data.value}</span>
              )
            }
            footer={
              <Input
                id={`${newVariable.id}-value`}
                placeholder="Variable Value"
                defaultValue={newVariable.value}
                onValueChange={(value) => {
                  setNewVariable((prev: IVariable) => ({ ...prev, value }));
                }}
              />
            }
          />
          <Column
            title="Actions"
            type="actions"
            body={(data: IVariable) => (
              <Actions
                isEdit={editableVariable?.id === data.id}
                delete={() => deleteVariable(data.id)}
                save={saveEditableVariable}
                edit={() => setEditableVariable(data)}
                cancel={() => setEditableVariable(null)}
              />
            )}
            footer={<Button onClick={addVariable} icon="add" />}
          />
        </Table>
      }
    </div>
  );
}
