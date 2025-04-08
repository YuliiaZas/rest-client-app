import { ReactNode } from 'react';
import { Aside, Footer, Header } from '@/components';
import '@/styles/global.scss';
import styles from './layout.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils';
import { redirect } from 'next/navigation';

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
