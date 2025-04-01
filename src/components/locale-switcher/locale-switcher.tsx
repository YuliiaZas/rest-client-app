'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Locale, locales } from '@/i18n';
import { setUserLocale } from '@/services/locale';
import { Select } from '@/components';

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations('root');

  async function onLocaleChange(value: string) {
    const locale = value as Locale;
    await setUserLocale(locale);
  }

  return (
    <Select
      defaultValue={locale}
      action={onLocaleChange}
      options={locales.map((el) => ({ label: el.toUpperCase(), value: el }))}
      icon="translate"
      disabled={true}
      title={t('language')}
    />
  );
}
