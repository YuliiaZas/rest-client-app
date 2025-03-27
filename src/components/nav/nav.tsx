import styles from './nav.module.scss';
import Link from 'next/link';
import { Icon, Translated } from '@/components';

interface NavProps {
  isAuthenticated?: boolean;
}

export function Nav({ isAuthenticated }: NavProps) {
  return (
    <nav className={styles.nav}>
      <ul>
        {!isAuthenticated && (
          <>
            <Icon iconName="key" size="1rem" />
            <li>
              <Link href="/auth/login">
                <Translated scope="login" text="login" />
              </Link>
            </li>
            <li>
              <Link href="/auth/signup">
                <Translated scope="signup" text="signup" />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
