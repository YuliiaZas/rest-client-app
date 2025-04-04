export interface IVariable {
  id: string;
  name: string;
  value: string;
}
export type VariablesStore = Record<string, IVariable>;
export type Variables = Record<string, string>;
