'use client';

import { useLocale } from 'next-intl';
import { Locale, locales } from '@/i18n';
import { setUserLocale } from '@/services/locale';

export function LocaleSwitcher() {
  const locale = useLocale();

  async function handleLocaleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    const locale = value as Locale;
    await setUserLocale(locale);
  }

  return (
    <select defaultValue={locale} onChange={handleLocaleChange}>
      {locales.map((l, i) => (
        <option key={i} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
