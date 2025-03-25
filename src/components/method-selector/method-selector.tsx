'use client';

import { useState } from 'react';
import styles from './method-selector.module.scss';

const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export default function MethodSelector() {
  const [selected, setSelected] = useState('');

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
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
