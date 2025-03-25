'use client';

import styles from './Select.module.scss';
import { useState } from 'react';
import { Icon, PhosphorIcons } from '@/components/Icons';
import clsx from 'clsx';

type SelectButtonProps = {
  action: (value: string) => void;
  icon?: PhosphorIcons;
  options: { label: string; value: string }[];
  defaultValue?: string;
  disabled?: boolean;
};

export function Select({
  options,
  action,
  defaultValue,
  disabled,
  icon,
}: SelectButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    action(e.target.value);
  }

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <div
      className={clsx(styles.container, disabled && styles.container__disabled)}
    >
      {icon && <Icon iconName={icon} size="1.2rem" />}
      <select
        onMouseDown={setOpen.bind(null, true)}
        onClick={toggleOpen}
        onChange={handleSelect}
        defaultValue={defaultValue}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className={clsx(styles.handler, open && styles.handler__open)}></div>
    </div>
  );
}
