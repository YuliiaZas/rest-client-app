'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components';
import { useTheme } from '@/hooks';
import { AppTheme } from '@/entites';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const t = useTranslations('root');

  function toggleTheme() {
    setTheme(theme === AppTheme.light ? AppTheme.dark : AppTheme.light);
  }

  return (
    <Button
      icon="paint"
      buttonType="transparent"
      title={t('theme')}
      onClick={toggleTheme}
    />
  );
}
