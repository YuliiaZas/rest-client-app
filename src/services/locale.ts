'use server';

import { cookies } from 'next/headers';
import { defaultLocale, Locale } from '@/i18n/config';

const COOKIE_NAME = 'RS_APP_LOCALE';

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  console.log('setUserLocale', locale);
  (await cookies()).set(COOKIE_NAME, locale);
}
