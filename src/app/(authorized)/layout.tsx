import { ReactNode } from 'react';
import { Aside, Footer, Header, Icon } from '@/components';
import styles from './layout.module.scss';

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className={styles.client}>
      <Aside type="client">
        <Icon iconName="user" size="3rem" />
        <Icon iconName="stack" size="3rem" />
        <Icon iconName="history" size="3rem" />
      </Aside>
      <div className={styles.content}>
        <Header isAuthenticated={true} />
        {children}
        <Footer />
      </div>
    </div>
  );
}
