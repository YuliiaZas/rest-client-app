'use client';

import { LocaleSwitcher, Logo, Nav, ThemeSwitcher } from '@/components';
import styles from './header.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const { offsetHeight } = headerRef.current;

      if (window.scrollY > offsetHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerRef]);

  return (
    <header
      className={clsx(styles.header, isScrolled && styles.header_scrolled)}
      ref={headerRef}
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
