import { ReactNode, Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import '../styles/global.scss';
import { Spinner } from '@/components';
import { NextAuthProvider } from '@/app/providers';

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
          <Suspense fallback={<Spinner />}>
            <NextAuthProvider>{children}</NextAuthProvider>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
