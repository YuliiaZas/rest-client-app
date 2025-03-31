'use client';

import styles from './nav.module.scss';
import Link from 'next/link';
import { Icon, Translated } from '@/components';
import { useAuth } from '@/hooks';

export function Nav() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <ul>
        {isAuthenticated ? (
          <>
            <li onClick={logout}>
              <Icon iconName="sign-out" size="1rem" />
            </li>
          </>
        ) : (
          <>
            <Icon iconName="key" size="1rem" />
            <li>
              <Link href="/auth/login">
                <Translated scope="login" text="signIn" />
              </Link>
            </li>
            <li>
              <Link href="/auth/signup">
                <Translated scope="login" text="signUp" />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
