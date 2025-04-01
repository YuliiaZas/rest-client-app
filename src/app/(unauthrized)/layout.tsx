import { ReactNode } from 'react';
import { Aside, Footer, Header } from '@/components';
import '@/styles/global.scss';
import styles from './layout.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'REST client app',
  description: 'RS School React course 2025 Q1 final task',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    // TODO: correct URL for redirect
    redirect('/client/GET');
  }

  return (
    <div className={styles.root}>
      <Aside type="root">
        <h2>Aside</h2>
      </Aside>
      <div className={styles.content}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
