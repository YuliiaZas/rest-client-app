'use client';

import { LocaleSwitcher, Logo, Nav, ThemeSwitcher } from '@/components';
import styles from './header.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const interactionElement = document.getElementById('header-interaction');
    if (!interactionElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(interactionElement);

    return () => {
      observer.unobserve(interactionElement);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={clsx(styles.header, isScrolled && styles.header_scrolled)}
    >
      <Logo size="2rem" />
      <div className={styles.buttons}>
        <ThemeSwitcher />
        <LocaleSwitcher />
        <Nav />
      </div>
    </header>
  );
}
