'use client';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ErrorMessage, Input } from '@/components';
import {
  FORM_FIELD,
  LoginForm,
  SignUpForm,
  SignInForm,
} from './login.entities';
import {
  characterSet,
  signInFormSchema,
  signUpFormSchema,
} from './login.consts';

interface LoginProps {
  isSignUp?: boolean;
}

export const Login = ({ isSignUp = false }: LoginProps) => {
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
  } = useForm<LoginForm>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    setLoginError('loginError');
  };

  const getErrorMessages = useCallback(
    (field: keyof LoginForm) => {
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
        const fieldName = field as keyof LoginForm;
        return (
          <Input<LoginForm>
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
