import { ReactNode } from 'react';
import ClientWithParamsWrapper from './wrapper';

type ClientWithParamsLayoutProps = {
  children: ReactNode;
};

export default async function ClientWithParamsLayout({
  children,
}: ClientWithParamsLayoutProps) {
  return <ClientWithParamsWrapper>{children}</ClientWithParamsWrapper>;
}
