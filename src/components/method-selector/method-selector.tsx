'use client';

import { httpMethods } from '@/data';
import { ChangeEvent } from 'react';

type MethodSelectorProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function MethodSelector({
  value,
  onChange,
}: MethodSelectorProps) {
  return (
    <select value={value} onChange={onChange} className="select" name="method">
      {httpMethods.map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  );
}
