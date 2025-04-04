import { Variables } from '@/types/variable.type';

export const variableRegExp = /({{.*?}})/g;

export const getVariableName = (part: string): string => {
  const match = part.match(/{{\s*(.*?)\s*}}/);
  return match ? match[1] : '';
};

export const isVariableDefined = (
  part: string,
  variables: Variables
): boolean => {
  const name = getVariableName(part);
  return !!name && name in variables;
};

export const getParamWithVariableValues = (
  url: string,
  variables: Variables
): string => {
  return url.replace(variableRegExp, (part) => {
    const name = getVariableName(part);
    const variable = variables[name];

    return name && variable ? variable.value : part;
  });
};
