'use client';

import { ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { ColorsSchema } from '@/entites';
import { Icon } from '../icons';
import styles from './dropdown.module.scss';

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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleUpdate = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setBoxPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };

    handleUpdate();

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          setHighlightedIndex((prev) =>
            prev === null || prev === items.length - 1 ? 0 : prev + 1
          );
          break;
        case 'ArrowUp':
          setHighlightedIndex((prev) =>
            prev === null || prev === 0 ? items.length - 1 : prev - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex !== null) {
            handleSelectItem(items[highlightedIndex].value);
          } else {
            setIsOpen(false);
          }
          break;
        case 'Escape':
        case 'Tab':
          setIsOpen(false);
          break;
        default:
          break;
      }
    },
    [isOpen, items, highlightedIndex, handleSelectItem]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      setHighlightedIndex(null);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div
      ref={ref}
      className={clsx(styles.dropdown, `colors-${colors}`, dropdownClass)}
    >
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={clsx(
          styles.dropdown__button,
          !showButtonBorder && styles.dropdown__button_borderless
        )}
        type="button"
      >
        {buttonChildren ||
          items.find((item) => item.value === selectedItem)?.label ||
          selectedItem}
        <Icon iconName={isOpen ? 'caret-up' : 'caret-down'} size="1rem" />
      </button>
      {isOpen &&
        typeof window !== 'undefined' &&
        ReactDOM.createPortal(
          <ul
            className={clsx(styles.box, positionedRigth && styles.right)}
            style={{
              top: boxPosition.top,
              left: boxPosition.left,
            }}
          >
            {items.map((item, i) => (
              <li
                key={item.value}
                className={clsx(
                  item.itemClass,
                  styles.dropdow__item,
                  `colors-${colors}-state`,
                  item.value === selectedItem && 'active',
                  highlightedIndex === i && 'highlighted'
                )}
                onClick={() => handleSelectItem(item.value)}
              >
                {item.label || item.value}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};
