'use server';

import { cookies } from 'next/headers';
import { defaultLocale, Locale } from '@/i18n/config';
import { Logger } from '@/utils';

const COOKIE_NAME = 'RS_APP_LOCALE';

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  Logger.info(`Set user locale: ${locale}`);
  (await cookies()).set(COOKIE_NAME, locale);
}
