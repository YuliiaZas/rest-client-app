import { Variables } from '@/types';
import { object, ObjectSchema, string } from 'yup';

export type VariableForm = {
  variableName: string;
  variableValue: string;
};

export const getFormScehma = (
  variables: Variables,
  editVariableName?: string
): ObjectSchema<VariableForm> => {
  return object({
    variableName: string()
      .trim()
      .required('variableNameRequired')
      .test('duplication', 'variableDuplicate', (name) => {
        return (
          !(name in variables) ||
          (!!editVariableName && name === editVariableName)
        );
      }),
    variableValue: string().trim().required('variableValueRequired'),
  });
};
