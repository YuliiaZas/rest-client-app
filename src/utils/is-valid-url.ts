import { string, ValidationError } from 'yup';

export async function isValidURL(url: string) {
  try {
    const schema = string().url().required();
    await schema.validate(url);
    return true;
  } catch (e) {
    if (e instanceof ValidationError) {
      return false;
    }
    console.error(e);
  }
}
