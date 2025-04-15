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
  console.log('ClientWithParamsLayout', await params);
  const method = (await params).params?.[0];
  const isMethodCorrect =
    method && httpMethods.includes(method.toUpperCase() as Method);

  if (!isMethodCorrect || !method) {
    redirect('/client/GET');
  }

  return <ClientProvider params={await params}>{children}</ClientProvider>;
}
