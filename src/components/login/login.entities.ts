export enum FORM_FIELD {
  USERNAME = 'username',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

export type LoginForm = {
  [FORM_FIELD.USERNAME]: string;
  [FORM_FIELD.PASSWORD]: string;
  [FORM_FIELD.PASSWORD_REPEAT]: string;
};
