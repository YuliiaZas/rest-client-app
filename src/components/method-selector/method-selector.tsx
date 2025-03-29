'use client';

import { httpMethods } from '@/data';
import { Dropdown } from '../dropdown';
import styles from './method-selector.module.scss';

type MethodSelectorProps = {
  value: string;
  onChange: (e: string) => void;
};

export default function MethodSelector({
  value,
  onChange,
}: MethodSelectorProps) {
  return (
    <Dropdown
      items={httpMethods.map((method) => ({
        value: method,
        itemClass: method.toLowerCase(),
      }))}
      selectedItem={value}
      selectOption={onChange}
      dropdownClass={styles.select}
    />
  );
}
