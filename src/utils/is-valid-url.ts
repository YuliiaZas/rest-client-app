import { string } from 'yup';

export function isValidURL(url: string) {
  const schema = string().url().required();
  return schema.isValidSync(url);
}
