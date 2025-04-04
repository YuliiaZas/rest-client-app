'use client';

import { Actions, Button, Column, Input, Spinner, Table } from '@/components';
import type { IVariable, Variables } from '@/types';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './variables.module.scss';
import { useAppContext } from '@/context/app-context';
import { getFormScehma, VariableForm } from './variables.entities';

export default function Variables() {
  const { variables, variablesStore, setVariablesStore } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [editableVariable, setEditableVariable] = useState<IVariable | null>(
    null
  );
  const t = useTranslations('variables');
  const tActions = useTranslations('actions');

  useEffect(() => {
    setIsLoading(false);
  }, [variables]);

  const addFormSchema = getFormScehma(variables);
  const editFormSchema = getFormScehma(variables, editableVariable?.name);

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd, isValid: isValidAdd },
    trigger: triggerAdd,
  } = useForm<VariableForm>({
    resolver: yupResolver(addFormSchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
    trigger: triggerEdit,
  } = useForm<VariableForm>({
    resolver: yupResolver(editFormSchema),
  });

  const setVariable = (variableForm: VariableForm, id?: string) => {
    const variableId = id || uuidv4();

    setVariablesStore({
      ...variablesStore,
      [variableId]: {
        id: variableId,
        name: variableForm.variableName,
        value: variableForm.variableValue,
      },
    });

    setEditableVariable(null);
  };

  const deleteVariable = (variableId: string) => {
    const { [variableId]: _, ...updatedVariables } = variablesStore;
    setVariablesStore(updatedVariables);
  };

  const getErrorMessages = (
    field: keyof VariableForm,
    errorsObject: FieldErrors<VariableForm>
  ) => {
    return errorsObject[field]?.message ? t(errorsObject[field].message) : '';
  };

  if (isLoading) return <Spinner />;

  const getInput = (
    field: keyof VariableForm,
    type: 'edit' | 'add' = 'add'
  ) => {
    const defaultValue =
      editableVariable && type === 'edit'
        ? editableVariable[field === 'variableName' ? 'name' : 'value']
        : undefined;

    return (
      <Input
        id={field}
        placeholder={t(field)}
        withValidation={true}
        defaultValue={defaultValue}
        register={type === 'edit' ? registerEdit : registerAdd}
        error={getErrorMessages(
          field,
          type === 'edit' ? errorsEdit : errorsAdd
        )}
        trigger={type === 'edit' ? triggerEdit : triggerAdd}
      />
    );
  };

  return (
    <div className={styles.variables}>
      <h1 className={styles.variables__title}>{t('title')}</h1>
      {
        <Table data={Object.values(variablesStore)} hasFooter={true}>
          <Column
            title={t('variableName')}
            type="data"
            body={(data: IVariable) =>
              editableVariable?.id === data.id ? (
                getInput('variableName', 'edit')
              ) : (
                <span>{data.name}</span>
              )
            }
            footer={getInput('variableName', 'add')}
          />
          <Column
            title={t('variableValue')}
            type="data"
            body={(data: IVariable) =>
              editableVariable?.id === data.id ? (
                getInput('variableValue', 'edit')
              ) : (
                <span>{data.value}</span>
              )
            }
            footer={getInput('variableValue', 'add')}
          />
          <Column
            title={tActions('actions')}
            type="actions"
            body={(data: IVariable) => (
              <Actions
                isEdit={editableVariable?.id === data.id}
                delete={() => deleteVariable(data.id)}
                save={handleSubmitEdit((formValue: VariableForm) =>
                  setVariable(formValue, data.id)
                )}
                edit={() => setEditableVariable(data)}
                cancel={() => setEditableVariable(null)}
                isSaveDisabled={!isValidEdit}
              />
            )}
            footer={
              <Button
                onClick={handleSubmitAdd((formValue: VariableForm) =>
                  setVariable(formValue)
                )}
                icon="add"
                isDisabled={!isValidAdd}
              />
            }
          />
        </Table>
      }
    </div>
  );
}
