'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components';
import { useTheme } from '@/hooks';
import { AppError, AppTheme } from '@/entites';
import { NotificationsContext } from '@/context';
import { useContext } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('root');
  const { addNotification } = useContext(NotificationsContext);

  function toggleTheme() {
    try {
      setTheme(theme === AppTheme.light ? AppTheme.dark : AppTheme.light);
    } catch {
      addNotification(new AppError('changeTheme'));
    }
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
