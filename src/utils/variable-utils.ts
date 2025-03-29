import { IVariable } from '@/types';

export const variableRegExp = /({{.*?}})/g;

export const getVariableName = (part: string) => {
  const match = part.match(/{{\s*(.*?)\s*}}/);
  return match ? match[1] : null;
};

export const isVariableDefined = (part: string, variables: IVariable[]) => {
  const name = getVariableName(part);
  const variable = variables.find((variable) => variable.name === name);

  return name && variable;
};

export const getUrlWithVariableValues = (
  url: string,
  variables: IVariable[]
) => {
  return url.replace(variableRegExp, (part) => {
    const name = getVariableName(part);
    const variable = variables.find((variable) => variable.name === name);

    return name && variable ? variable.value : part;
  });
};
