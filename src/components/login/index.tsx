'use client';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components';
import { FORM_FIELD, LoginForm } from './login.entities';
import { characterSet, formSchema } from './login.consts';

export const Login = () => {
  const t = useTranslations('login');

  const fields = Object.values(FORM_FIELD);

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
        <button disabled={!isValid}>Save</button>
      </div>
    </form>
  );
};
