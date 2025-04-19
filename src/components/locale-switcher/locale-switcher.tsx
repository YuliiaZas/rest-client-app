'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Locale, locales } from '@/i18n';
import { setUserLocale } from '@/services/locale';
import { Dropdown, Icon } from '@/components';
import styles from './locale-switcher.module.scss';
import { AppError } from '@/entites';
import { useNotificationsContext } from '@/context';

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations('root');
  const { addNotification } = useNotificationsContext();

  async function onLocaleChange(value: string) {
    try {
      const locale = value as Locale;
      await setUserLocale(locale);
    } catch {
      addNotification(new AppError('changeLocale'));
    }
  }

  return (
    <div className={styles.container}>
      <Icon iconName="translate" size="1.2rem" />
      <Dropdown
        items={locales.map((el) => ({ label: el.toUpperCase(), value: el }))}
        selectedItem={locale}
        showButtonBorder={false}
        colors="dark"
        dropdownClass={styles.select}
        positionedRigth={true}
        selectOption={onLocaleChange}
        buttonChildren={
          <span title={t('language')}>{locale.toUpperCase()}</span>
        }
      />
    </div>
  );
}
