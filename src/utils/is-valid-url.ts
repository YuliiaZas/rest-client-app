import { string } from 'yup';

export function isValidURL(url: string) {
  const schema = string().url();
  return schema.isValidSync(url);
}
