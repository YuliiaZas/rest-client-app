import { ReactNode } from 'react';
import {
  Aside,
  Footer,
  Header,
  HeaderInteraction,
  NavLink,
} from '@/components';
import { navigation } from '@/data';
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
    redirect('/');
  }

  return (
    <div className={styles.client}>
      <Aside type="client">
        {navigation.map(({ path, icon, title }) => (
          <NavLink key={path} path={path} icon={icon} title={title} />
        ))}
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
