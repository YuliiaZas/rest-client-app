'use client';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ErrorMessage, Input } from '@/components';
import {
  FORM_FIELD,
  ILoginForm,
  SignUpForm,
  SignInForm,
} from './login-form.entities';
import {
  characterSet,
  signInFormSchema,
  signUpFormSchema,
} from './login-form.consts';

interface LoginProps {
  isSignUp?: boolean;
}

export const LoginForm = ({ isSignUp = false }: LoginProps) => {
  const t = useTranslations('login');
  const [loginError, setLoginError] = useState<string>('');

  const fields = useMemo(
    () =>
      isSignUp
        ? (Object.values(FORM_FIELD) as Array<keyof SignUpForm>)
        : (Object.values(FORM_FIELD).slice(0, -1) as Array<keyof SignInForm>),
    [isSignUp]
  );

  const formSchema = useMemo(
    () => (isSignUp ? signUpFormSchema : signInFormSchema),
    [isSignUp]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<ILoginForm>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: ILoginForm) => {
    console.log(data);
    setLoginError('loginError');
  };

  const getErrorMessages = useCallback(
    (field: keyof ILoginForm) => {
      if (errors[field]?.message) {
        const isErrorRequired = errors[field].type === 'required';
        const key = isErrorRequired ? 'required' : errors[field].message;
        const parameters = {
          ...(isErrorRequired && { field: t(field) }),
          ...(field === FORM_FIELD.PASSWORD && { value: characterSet }),
        };
        return t(key, parameters);
      }
      return '';
    },
    [errors, t]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => {
        const fieldName = field as keyof ILoginForm;
        return (
          <Input<ILoginForm>
            id={fieldName}
            placeholder={t(fieldName)}
            type={fieldName === FORM_FIELD.USERNAME ? 'text' : 'password'}
            withValidation={true}
            register={register}
            error={getErrorMessages(fieldName)}
            trigger={trigger}
            key={fieldName}
          />
        );
      })}
      <div>
        <Button
          text={t(isSignUp ? 'signUp' : 'signIn')}
          isDisabled={!isValid}
        />
        {loginError && <ErrorMessage errorMessage={t(loginError)} />}
      </div>
    </form>
  );
};
