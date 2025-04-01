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
    onValueChange?: (value: string) => void;
  };

export const Input = <T extends Record<string, string>>({
  id,
  defaultValue,
  placeholder = 'Type value',
  type = 'text',
  withValidation = false,
  register,
  trigger,
  error,
  icon,
  iconPosition = 'right',
  onIconClick,
  onValueChange,
}: FormFieldProps<T>) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const isPasswordInput = useMemo(() => type === 'password', [type]);
  const [currentType, setCurrentType] =
    useState<FormFieldProps<T>['type']>(type);
  const [currentIcon, setCurrentIcon] =
    useState<FormFieldProps<T>['icon']>(icon);

  // TODO: check if this may be removed with correct handling of `defaultValue` changes
  // Places where should be checked: Variables, Headers - after click on `Add` button
  useEffect(() => {
    setCurrentValue(defaultValue);
  }, [defaultValue]);

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

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCurrentValue(value);
      if (onValueChange) onValueChange(value);
    },
    [onValueChange]
  );

  return (
    <div className={styles.input__container}>
      <div className={currentIcon && styles['input_with-icons']}>
        {register ? (
          <input
            {...(register ? register(id) : {})}
            className={styles.input}
            type={currentType}
            id={id}
            defaultValue={defaultValue}
            placeholder={placeholder}
            autoComplete="nope"
            onBlur={() => trigger && trigger(id)}
          />
        ) : (
          <input
            className={styles.input}
            type={currentType}
            id={id}
            value={currentValue}
            placeholder={placeholder}
            autoComplete="nope"
            onChange={(e) => onChangeHandler(e)}
          />
        )}
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
