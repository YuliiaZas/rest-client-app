'use client';
import { object, ObjectSchema, ref, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input } from '@/views/input/input';

export enum FORM_FIELD {
  USERNAME = 'username',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export const formLabel = {
  [FORM_FIELD.USERNAME]: 'Username',
  [FORM_FIELD.PASSWORD]: 'Password',
  [FORM_FIELD.CONFIRM_PASSWORD]: 'Password confirmirmation',
};

export type LoginForm = {
  [FORM_FIELD.USERNAME]: string;
  [FORM_FIELD.PASSWORD]: string;
  [FORM_FIELD.CONFIRM_PASSWORD]: string;
};

export const getRequiredMessage = (field: FORM_FIELD) =>
  `${formLabel[field]} is required`;

export const characterSet = '!@#$%^&*(),.?:{}|<>/~';

export const formSchema: ObjectSchema<LoginForm> = object({
  [FORM_FIELD.USERNAME]: string()
    .required(getRequiredMessage(FORM_FIELD.USERNAME))
    .matches(/^[A-Z]/, 'First name must start with an uppercase letter'),
  [FORM_FIELD.PASSWORD]: string()
    .required(getRequiredMessage(FORM_FIELD.PASSWORD))
    .matches(
      new RegExp(
        `^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[${characterSet}]).*$`
      ),
      'Password is not strong enough. See info'
    )
    .matches(/^(?!.*\\).*$/, 'Password should not contain character "\\"'),
  [FORM_FIELD.CONFIRM_PASSWORD]: string()
    .required(getRequiredMessage(FORM_FIELD.CONFIRM_PASSWORD))
    .oneOf([ref(FORM_FIELD.PASSWORD), ''], 'Passwords must match'),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // formState: { errors, touchedFields, isValid },
    trigger,
    // setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const fields = Object.values(FORM_FIELD);

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => {
        const fieldName = field as keyof LoginForm;
        return (
          <Input
            id={fieldName}
            placeholder={formLabel[fieldName]}
            type={fieldName === FORM_FIELD.USERNAME ? 'text' : 'password'}
            withValidation={true}
            register={register}
            error={errors[fieldName]}
            touched={true}
            // touched={touchedFields[fieldName]}
            trigger={trigger}
            // setValue={setValue}
            key={fieldName}
          />
        );
      })}
      <div>
        <button disabled={!isValid}>Save</button>
      </div>
    </form>
  );
};
