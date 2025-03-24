import { ReactNode } from 'react';
import '../styles/global.scss';

export const metadata = {
  title: 'REST client app',
  description: 'RS School React course 2025 Q1 final task',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
    <body className="light-theme">{children}</body>
    </html>
  );
}
