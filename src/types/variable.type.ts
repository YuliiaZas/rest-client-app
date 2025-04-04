export interface IVariable {
  id: string;
  name: string;
  value: string;
}
export type Variables = Record<string, IVariable>;
