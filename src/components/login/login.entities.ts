export enum FORM_FIELD {
  USERNAME = 'username',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

export type SignInForm = {
  [FORM_FIELD.USERNAME]: string;
  [FORM_FIELD.PASSWORD]: string;
};

export type SignUpForm = SignInForm & {
  [FORM_FIELD.PASSWORD_REPEAT]: string;
};

export type LoginForm = SignInForm | SignUpForm;
