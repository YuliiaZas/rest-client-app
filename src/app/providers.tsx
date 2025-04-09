'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { NotificationsProvider } from '@/context';
import { AppProvider } from '@/context/app-context';

type Props = {
  children?: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <NotificationsProvider>
        <AppProvider>{children}</AppProvider>
      </NotificationsProvider>
    </SessionProvider>
  );
};
