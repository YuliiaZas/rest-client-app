'use client';

import { Actions, Button, Column, Input, Spinner, Table } from '@/components';
import { useLocalStorage } from '@/hooks';
import type { IVariable, Variables } from '@/types';
import { useEffect, useState } from 'react';
import { localStorageKeys } from '@/data';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import styles from './variables.module.scss';

//TODO: refactor ang check
type VariableForm = {
  variableName: string;
  variableValue: string;
};

export default function Variables() {
  const t = useTranslations('variables');
  const [variables, setVariables] = useLocalStorage<Variables>({
    key: localStorageKeys.variables,
    defaultValue: {},
  });

  const addFormSchema = object({
    variableName: string()
      .trim()
      .required('variableNameRequired')
      .test('duplication', 'variableDuplicate', (value) => {
        return !variables[value];
      }),
    variableValue: string().trim().required('variableValueRequired'),
  });

  //TODO: change validation for existing name
  const editFormSchema = object({
    variableName: string()
      .trim()
      .required('variableNameRequired')
      .test('duplication', 'variableDuplicate', (value) => {
        return !variables[value];
      }),
    variableValue: string().trim().required('variableValueRequired'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
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

  const [isLoading, setIsLoading] = useState(true);
  const [editableVariable, setEditableVariable] = useState<IVariable | null>(
    null
  );

  useEffect(() => {
    setIsLoading(false);
  }, [variables]);

  const setVariable = (variableForm: VariableForm) => {
    setVariables({
      ...variables,
      [variableForm.variableName]: getVariable(variableForm),
    });
    setEditableVariable(null);
  };

  const deleteVariable = (variableName: string) => {
    //TODO:change rule
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [variableName]: _, ...updatedVariables } = variables;
    setVariables(updatedVariables);
  };

  const getVariable = (variableForm: VariableForm): IVariable => {
    return {
      id: variableForm.variableName,
      name: variableForm.variableName,
      value: variableForm.variableValue,
    };
  };

  const getErrorMessages = (
    field: keyof VariableForm,
    errorsObject: FieldErrors<VariableForm>
  ) => {
    return errorsObject[field]?.message ? t(errorsObject[field].message) : '';
  };

  if (isLoading) return <Spinner />;

  //TODO: fix height
  return (
    <div className={styles.variables}>
      <h1 className={styles.variables__title}>{t('title')}</h1>
      {
        <Table data={variables} hasFooter={true}>
          <Column
            title={t('name')}
            type="data"
            body={(data: IVariable) =>
              editableVariable?.id === data.id ? (
                <Input
                  id={'variableName'}
                  placeholder={t('name')}
                  defaultValue={data.name}
                  withValidation={true}
                  register={registerEdit}
                  error={getErrorMessages('variableName', errorsEdit)}
                  trigger={triggerEdit}
                />
              ) : (
                <span>{data.name}</span>
              )
            }
            footer={
              <Input
                id={'variableName'}
                placeholder={t('name')}
                withValidation={true}
                register={register}
                error={getErrorMessages('variableName', errors)}
                trigger={trigger}
              />
            }
          />
          <Column
            title={t('value')}
            type="data"
            body={(data: IVariable) =>
              editableVariable?.id === data.id ? (
                <Input
                  id={'variableValue'}
                  placeholder={t('value')}
                  defaultValue={data.value}
                  withValidation={true}
                  register={registerEdit}
                  error={getErrorMessages('variableValue', errorsEdit)}
                  trigger={triggerEdit}
                />
              ) : (
                <span>{data.value}</span>
              )
            }
            footer={
              <Input
                id={'variableValue'}
                placeholder={t('value')}
                withValidation={true}
                register={register}
                error={getErrorMessages('variableValue', errors)}
                trigger={trigger}
              />
            }
          />
          {/* //TODO: translation */}
          <Column
            title="Actions"
            type="actions"
            body={(data: IVariable) => (
              <Actions
                isEdit={editableVariable?.id === data.id}
                delete={() => deleteVariable(data.id)}
                save={handleSubmitEdit(setVariable)}
                edit={() => setEditableVariable(data)}
                cancel={() => setEditableVariable(null)}
                isSaveDisabled={!isValidEdit}
              />
            )}
            footer={
              <Button
                onClick={handleSubmit(setVariable)}
                icon="add"
                isDisabled={!isValid}
              />
            }
          />
        </Table>
      }
    </div>
  );
}
