import { IHeader, IVariable } from '@/types';
import { getParamWithVariableValues } from './variable-utils';

export function replaceVariables(
  url: string,
  body: string,
  headers: IHeader[],
  variables: IVariable[]
) {
  return {
    updatedUrl: getParamWithVariableValues(url, variables),
    updatedBody: getParamWithVariableValues(body, variables),
    updatedHeaders: headers.map((header) =>
      JSON.parse(
        getParamWithVariableValues(JSON.stringify(header || {}), variables)
      )
    ) as IHeader[],
  };
}
