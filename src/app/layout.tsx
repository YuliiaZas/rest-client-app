import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import '../styles/global.scss';
import { LocaleSwitcher } from '@/components';

export const metadata = {
  title: 'REST client app',
  description: 'RS School React course 2025 Q1 final task',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className="light-theme">
        <NextIntlClientProvider>
          <LocaleSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
