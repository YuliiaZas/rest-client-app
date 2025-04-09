import { ReactNode } from 'react';
import { Aside, Footer, Header, Icon } from '@/components';
import styles from './layout.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils';
import { redirect } from 'next/navigation';
import Link from 'next/link';

type ClientLayoutProps = {
  children: ReactNode;
};

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className={styles.client}>
      <Aside type="client">
        <Link href="/client/GET">
          <Icon iconName="planet" size="3rem" />
        </Link>
        <Link href="/history">
          <Icon iconName="history" size="3rem" />
        </Link>
        <Link href="/variables">
          <Icon iconName="stack" size="3rem" />
        </Link>
      </Aside>
      <div className={styles.content}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
