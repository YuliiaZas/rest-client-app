import { ReactNode } from 'react';
import {
  Aside,
  Footer,
  Header,
  HeaderInteraction,
  Logo,
  Translated,
} from '@/components';
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
    redirect('/dashboard');
  }

  return (
    <div className={styles.root}>
      <Aside type="root">
        <Logo size="10rem" />
        <p className="p1 txt--center">
          <Translated scope="root" text="title" />
        </p>
        <p className="p2 txt--center">
          <Translated scope="root" text="description" />
        </p>
      </Aside>
      <div className={styles.content}>
        <HeaderInteraction />
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
