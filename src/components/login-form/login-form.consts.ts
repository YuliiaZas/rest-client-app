import { object, ObjectSchema, ref, string } from 'yup';
import { FORM_FIELD, SignInForm, SignUpForm } from './login-form.entities';

export const characterSet = '!@#$%^&*(),.?:{}|<>/~_+=-`';
export const passwordLength = 8;

export const signInFormSchema: ObjectSchema<SignInForm> = object({
  [FORM_FIELD.EMAIL]: string().trim().required().email('emailInvalid'),
  [FORM_FIELD.PASSWORD]: string()
    .required()
    .matches(
      new RegExp(
        `^(?=.*[0-9])(?=.*\\p{Lu})(?=.*\\p{Ll})(?=.*[${characterSet}]).*$`,
        'u'
      ),
      'passwordWeak'
    )
    .min(passwordLength, 'passwordLength'),
});

export const signUpFormSchema: ObjectSchema<SignUpForm> =
  signInFormSchema.concat(
    object({
      [FORM_FIELD.PASSWORD_REPEAT]: string()
        .required()
        .oneOf([ref(FORM_FIELD.PASSWORD), ''], 'passwordMismatch'),
    })
  );
