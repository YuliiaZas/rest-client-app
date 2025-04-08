import { ReactNode } from 'react';
import { Aside, Footer, Header, Icon } from '@/components';
import styles from './layout.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  const t = useTranslations();

  const fetchSession = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/');
    }
  };

  fetchSession();

  return (
    <div className={styles.client}>
      <Aside type="client">
        <Link href="/client/GET" title={t('client.title')}>
          <Icon iconName="planet" size="3rem" />
        </Link>
        <Link href="/history" title={t('history.title')}>
          <Icon iconName="history" size="3rem" />
        </Link>
        <Link href="/variables" title={t('variables.title')}>
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
