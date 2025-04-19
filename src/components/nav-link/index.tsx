'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './nav-link.module.scss';
import { Icon } from '../icons';
import { useTranslations } from 'next-intl';
import { NavigationItem } from '@/data';

type NavLinkProps = Omit<NavigationItem, 'description'> & {
  titleScope?: string;
};

export function NavLink({
  path,
  icon,
  title,
  titleScope = 'dashboard',
}: NavLinkProps) {
  const t = useTranslations(titleScope);
  const pathname = usePathname();
  const isActive = pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link
      href={path}
      className={clsx(styles.link, 'unstyled', isActive && styles.link_active)}
      title={t(title)}
    >
      <Icon iconName={icon} size="3rem" />
    </Link>
  );
}
