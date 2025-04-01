import { ReactNode } from 'react';
import { Aside, Footer, Header, Icon } from '@/components';
import styles from './layout.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils';
import { redirect } from 'next/navigation';

type ClientLayoutProps = {
  children: ReactNode;
};

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // TODO: correct URL for redirect
    redirect('/');
  }

  return (
    <div className={styles.client}>
      <Aside type="client">
        <Icon iconName="user" size="3rem" />
        <Icon iconName="stack" size="3rem" />
        <Icon iconName="history" size="3rem" />
      </Aside>
      <div className={styles.content}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
