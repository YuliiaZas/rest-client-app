'use client';

import { ClientProvider } from '@/context';
import { httpMethods, Method } from '@/data';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientWithParamsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const rawPath = pathname.split('/client/')[1] || '';
  const params = rawPath.split('/').filter(Boolean);

  const method = params[0];
  const isMethodCorrect =
    method && httpMethods.includes(method.toUpperCase() as Method);

  useEffect(() => {
    if (!isMethodCorrect) {
      router.replace('/client/GET');
    }
  }, [isMethodCorrect, router]);

  return <ClientProvider params={params}>{children}</ClientProvider>;
}
