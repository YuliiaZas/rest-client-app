'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { NotificationsProvider } from '@/context';

type Props = {
  children?: ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </SessionProvider>
  );
};
