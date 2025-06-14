export enum FORM_FIELD {
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

export type SignInForm = {
  [FORM_FIELD.EMAIL]: string;
  [FORM_FIELD.PASSWORD]: string;
};

export type SignUpForm = SignInForm & {
  [FORM_FIELD.PASSWORD_REPEAT]: string;
};

export type ILoginForm = SignInForm | SignUpForm;
