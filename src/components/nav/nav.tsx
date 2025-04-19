'use client';

import styles from './nav.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button, Icon, Translated } from '@/components';
import { signOut, useSession } from 'next-auth/react';

export function Nav() {
  const { status } = useSession();
  const t = useTranslations('root');

  return (
    <nav className={styles.nav}>
      <ul>
        {status === 'authenticated' ? (
          <>
            <li onClick={() => signOut()}>
              <Button
                icon="sign-out"
                buttonType="transparent"
                title={t('signout')}
              />
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
