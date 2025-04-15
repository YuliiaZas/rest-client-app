import { ClientProvider } from '@/context';
import { httpMethods, Method } from '@/data';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

type ClientWithParamsLayoutProps = {
  children: ReactNode;
  params: Promise<{ params: string[] }>;
};

export default async function ClientWithParamsLayout({
  children,
  params,
}: ClientWithParamsLayoutProps) {
  const method = (await params).params?.[0];
  const isMethodCorrect =
    method && httpMethods.includes(method.toUpperCase() as Method);

  if (!isMethodCorrect) {
    redirect('/client/GET');
  }

  return <ClientProvider params={await params}>{children}</ClientProvider>;
}
