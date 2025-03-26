import { ReactNode } from 'react';
import { Aside, Footer, Header } from '@/components';
import styles from './layout.module.scss';

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className={styles.client}>
      <Aside type="client">
        <h2>A</h2>
      </Aside>
      <div className={styles.content}>
        <Header isAuthenticated={true} />
        {children}
        <Footer />
      </div>
    </div>
  );
}
