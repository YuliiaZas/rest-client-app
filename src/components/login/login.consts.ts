import { object, ObjectSchema, ref, string } from 'yup';
import { FORM_FIELD, SignInForm, SignUpForm } from './login.entities';

export const characterSet = '!@#$%^&*(),.?:{}|<>/~';

export const signInFormSchema: ObjectSchema<SignInForm> = object({
  [FORM_FIELD.USERNAME]: string()
    .required()
    .matches(/^[A-Z]/, 'usernameUppercaseStart'),
  [FORM_FIELD.PASSWORD]: string()
    .required()
    .matches(
      new RegExp(
        `^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[${characterSet}]).*$`
      ),
      'passwordWeak'
    ),
});

export const signUpFormSchema: ObjectSchema<SignUpForm> =
  signInFormSchema.concat(
    object({
      [FORM_FIELD.PASSWORD_REPEAT]: string()
        .required()
        .oneOf([ref(FORM_FIELD.PASSWORD), ''], 'passwordMismatch'),
    })
  );
