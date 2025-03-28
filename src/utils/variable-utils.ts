import { Variables } from '@/entites';

export const variableRegExp = /({{.*?}})/g;

export const getVariableKey = (part: string) => {
  const match = part.match(/{{\s*(.*?)\s*}}/);
  return match ? match[1] : null;
};

export const isVariableUndefined = (part: string, variables: Variables) => {
  const key = getVariableKey(part);
  console.log(key, key && variables[key]);
  return key && !variables[key];
};
