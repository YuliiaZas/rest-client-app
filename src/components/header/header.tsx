import { Icon, LocaleSwitcher, Nav, ThemeSwitcher } from '@/components';
import styles from './header.module.scss';

interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Icon iconName="planet" size="2rem" />
      <div className={styles.buttons}>
        <Nav isAuthenticated={isAuthenticated} />
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
