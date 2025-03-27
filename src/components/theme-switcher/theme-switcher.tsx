'use client';

import { Icon } from '@/components';
import { useTheme } from '@/hooks';
import { AppTheme } from '@/entites';
import styles from './theme-switcher.module.scss';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === AppTheme.light ? AppTheme.dark : AppTheme.light);
  }

  return (
    <button onClick={toggleTheme} className={styles.theme__button}>
      <Icon iconName="paint" size="1rem" />
    </button>
  );
}
