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
  const ref = useRef<HTMLDivElement>(null);

  const [currentValue, setCurrentValue] = useState(
    value || 'This is a {{ undefined variable }} {{ test }}'
  );

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
      onChange(value);
    },
    [onChange]
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
        className={styles.input__field}
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
                isVariableUndefined(part, variables) &&
                  styles.input__variable_undefined,
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
