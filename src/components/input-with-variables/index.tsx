'use client';

import { useCallback, useRef, useState } from 'react';
import styles from './input-with-variables.module.scss';
import clsx from 'clsx';
import { isVariableUndefined, variableRegExp } from '@/utils';
import { Variables } from '@/entites';

type InputWithVariablesProps = {
  value: string;
  variables?: Variables;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const InputWithVariables = ({
  value,
  variables = {},
  placeholder,
  onChange,
}: InputWithVariablesProps) => {
  const [currentValue, setCurrentValue] = useState(
    value || 'This is a {{ undefined variable }} {{ test }}'
  );
  const ref = useRef<HTMLDivElement>(null);

  const syncScroll = useCallback((e: React.UIEvent<HTMLInputElement>) => {
    if (!ref.current) return;
    const target = e.currentTarget;
    ref.current.scrollTop = target.scrollTop;
    ref.current.scrollLeft = target.scrollLeft;
  }, []);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCurrentValue(value);
      onChange(value);
    },
    [onChange]
  );

  return (
    <div className={styles.input__wrapper}>
      <input
        className={styles.input__field}
        placeholder={placeholder}
        value={currentValue}
        onChange={onChangeHandler}
        onScroll={syncScroll}
      />
      <div ref={ref} className={styles.input__view}>
        {currentValue.split(variableRegExp).map((part, i) => {
          if (part.match(variableRegExp) === null) {
            return <span key={i}>{part}</span>;
          }
          return (
            <span
              key={i}
              className={clsx(
                styles.input__variable,
                isVariableUndefined(part, variables) &&
                  styles.input__variable_undefined
              )}
            >
              {part}
            </span>
          );
        })}
      </div>
    </div>
  );
};
