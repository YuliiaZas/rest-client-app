'use client';

import { ChangeEvent } from 'react';
import styles from './method-selector.module.scss';

const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

type MethodSelectorProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function MethodSelector({
  value,
  onChange,
}: MethodSelectorProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={styles.select}
      name="method"
    >
      {httpMethods.map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  );
}
