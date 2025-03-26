import styles from './nav.module.scss';
import Link from 'next/link';
import { Icon } from '@/components';

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
              <Link href="/auth/login">Log In</Link>
            </li>
            <li>
              <Link href="/auth/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
