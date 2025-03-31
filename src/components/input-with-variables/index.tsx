'use client';

import { IVariable } from '@/types';
import { isVariableDefined, variableRegExp } from '@/utils';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import styles from './input-with-variables.module.scss';

type InputWithVariablesProps = {
  value: string;
  variables?: IVariable[];
  placeholder?: string;
  type?: 'primary' | 'secondary';
  onValueChange: (value: string) => void;
};

export const InputWithVariables = ({
  value,
  variables = [],
  placeholder = 'Type the URL here',
  type = 'secondary',
  onValueChange,
}: InputWithVariablesProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState(value);

  const [hoveredPartIndex, setHoveredPartIndex] = useState<number | null>(null);

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
      onValueChange(value);
    },
    [onValueChange]
  );

  const onMouseMoveHandler = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const spans = Array.from(ref.current.querySelectorAll('span'));
      const hoveredSpanIndex = spans.findIndex((span) => {
        const spanRect = span.getBoundingClientRect();
        return (
          x >= spanRect.left - rect.left &&
          x <= spanRect.right - rect.left &&
          y >= spanRect.top - rect.top &&
          y <= spanRect.bottom - rect.top
        );
      });

      setHoveredPartIndex(hoveredSpanIndex !== -1 ? hoveredSpanIndex : null);
    },
    []
  );

  return (
    <div className={styles.input__wrapper}>
      <input
        className={clsx(styles.input__field, styles[`input__field_${type}`])}
        placeholder={placeholder}
        value={currentValue}
        onChange={onChangeHandler}
        onScroll={syncScroll}
        onMouseMove={onMouseMoveHandler}
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
                styles[
                  `input__variable_${isVariableDefined(part, variables) ? 'defined' : 'undefined'}`
                ],
                hoveredPartIndex === i && styles.input__variable_hovered
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
