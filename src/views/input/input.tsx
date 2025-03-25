'use client';
import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormTrigger } from 'react-hook-form';
import styles from './input.module.scss';

type FormFieldProps<T extends Record<string, string> = Record<string, string>> =
  {
    id: string;
    defaultValue?: T[keyof T];
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    withValidation?: boolean;
    register?: UseFormRegister<T>;
    trigger?: UseFormTrigger<T>;
    error?: { message?: string } | string;
    touched?: boolean;
  };

export const Input = ({
  id,
  defaultValue = '',
  placeholder = 'Type value',
  type = 'text',
  withValidation = false,
  register,
  trigger,
  error,
  touched,
}: FormFieldProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    console.log(
      'error',
      error,
      'touched',
      touched,
      id,
      typeof error === 'string' ? error : (error?.message as string)
    );
    if (error && touched) {
      setErrorMessage(
        typeof error === 'string' ? error : (error.message as string)
      );
    } else {
      setErrorMessage('');
    }
  }, [error, touched, id]);

  return (
    <div>
      <input
        {...(register ? register(id) : {})}
        type={type}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete="nope"
        onBlur={() => trigger && trigger(id)}
      />
      {withValidation && (
        <div
          className={`${styles.errorMessage} ${errorMessage ? '' : styles.empty}`}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};
