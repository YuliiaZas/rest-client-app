import { ReactNode } from 'react';
import { Aside, Footer, Header } from '@/components';
import '@/styles/global.scss';
import styles from './layout.module.scss';

export const metadata = {
  title: 'REST client app',
  description: 'RS School React course 2025 Q1 final task',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
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
