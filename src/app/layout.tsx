import { ReactNode, Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import '../styles/global.scss';
import { Notification, Spinner } from '@/components';
import { Providers } from '@/app/providers';

export async function generateMetadata() {
  const metadataTranslations: Record<string, Record<string, string>> = {
    en: {
      title: 'REST client app',
      description: 'RS School React course 2025 Q1 final task',
    },
    ru: {
      title: 'REST клиент приложение',
      description: 'Финальное задание курса React RS School 2025 Q1',
    },
  };

  const locale = await getLocale();
  const metadata = metadataTranslations[locale || 'en'];

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

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
            <Providers>
              <Notification />
              {children}
            </Providers>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
