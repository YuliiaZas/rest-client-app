import { Icon, LocaleSwitcher, Nav, ThemeSwitcher } from '@/components';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <Icon iconName="planet" size="2rem" />
      <div className={styles.buttons}>
        <ThemeSwitcher />
        <LocaleSwitcher />
        <Nav />
      </div>
    </header>
  );
}
