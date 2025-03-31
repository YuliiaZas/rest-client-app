'use client';

import { ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import { ColorsSchema } from '@/entites';
import styles from './dropdown.module.scss';
import { Icon } from '../icons';
import clsx from 'clsx';

export type DropdownItem = {
  value: string;
  label?: string;
  itemClass?: string;
};

interface DropdownProps {
  items: DropdownItem[];
  selectedItem: string;
  selectOption: (value: string) => void;
  buttonChildren?: ReactNode;
  colors?: ColorsSchema;
  showButtonBorder?: boolean;
  dropdownClass?: string;
  positionedRigth?: boolean;
}

export const Dropdown = ({
  items,
  selectedItem,
  selectOption,
  buttonChildren,
  colors = 'main',
  showButtonBorder = true,
  dropdownClass,
  positionedRigth = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectItem = useCallback(
    (value: string) => {
      selectOption(value);
      setIsOpen(false);
    },
    [selectOption]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className={clsx(styles.dropdown, `colors-${colors}`, dropdownClass)}
    >
      <button
        onClick={toggleDropdown}
        className={clsx(
          styles.dropdown__button,
          !showButtonBorder && styles.dropdown__button_borderless
        )}
      >
        {buttonChildren ||
          items.find((item) => item.value === selectedItem)?.label ||
          selectedItem}
        <Icon iconName={isOpen ? 'caret-up' : 'caret-down'} size="1rem" />
      </button>
      {isOpen && (
        <div className={clsx(styles.box, positionedRigth && styles.right)}>
          {items.map((item) => (
            <div
              key={item.value}
              className={clsx(
                item.itemClass,
                styles.dropdow__item,
                `colors-${colors}-state`,
                item.value === selectedItem && 'active'
              )}
              onClick={() => handleSelectItem(item.value)}
            >
              {item.label || item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
