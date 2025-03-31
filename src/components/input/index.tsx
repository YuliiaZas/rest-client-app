'use client';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Path, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { ErrorMessage, Icon } from '@/components';
import { PhosphorIcons } from '@/components/icons';
import styles from './input.module.scss';

type FormFieldProps<T extends Record<string, string> = Record<string, string>> =
  {
    id: Path<T>;
    defaultValue?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    withValidation?: boolean;
    register?: UseFormRegister<T>;
    trigger?: UseFormTrigger<T>;
    error?: { message?: string } | string;
    icon?: PhosphorIcons;
    iconPosition?: 'left' | 'right';
    onIconClick?: () => void;
  };

export const Input = <T extends Record<string, string>>({
  id,
  defaultValue = '',
  placeholder = 'Type value',
  type = 'text',
  withValidation = false,
  register,
  trigger,
  error,
  icon,
  iconPosition = 'right',
  onIconClick,
}: FormFieldProps<T>) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isPasswordInput = useMemo(() => type === 'password', [type]);
  const [currentType, setCurrentType] =
    useState<FormFieldProps<T>['type']>(type);
  const [currentIcon, setCurrentIcon] =
    useState<FormFieldProps<T>['icon']>(icon);

  useEffect(() => {
    const errorMessage = !error
      ? ''
      : typeof error === 'string'
        ? error
        : (error?.message as string);
    setErrorMessage(errorMessage);
  }, [error, id]);

  useEffect(() => {
    if (!isPasswordInput) return;
    setCurrentIcon(currentType === 'password' ? 'eye' : 'eye-slash');
  }, [currentType, isPasswordInput]);

  const switchInputType = useCallback(
    () => setCurrentType(currentType === 'text' ? type : 'text'),
    [currentType, type]
  );

  return (
    <div className={styles.input__container}>
      <div className={currentIcon ? styles['input_with-icons'] : undefined}>
        <input
          className={styles.input}
          {...(register ? register(id) : {})}
          type={currentType}
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete="nope"
          onBlur={() => trigger && trigger(id)}
        />
        {currentIcon && (
          <div
            className={clsx(
              styles.input__icon,
              styles[`input__icon_${iconPosition}`]
            )}
          >
            <Icon
              iconName={currentIcon}
              size="1rem"
              onClick={isPasswordInput ? switchInputType : onIconClick}
            />
          </div>
        )}
      </div>
      {withValidation && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};
