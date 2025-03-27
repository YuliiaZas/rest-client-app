'use client';

import { LoginForm, Modal } from '@/components';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const t = useTranslations('login');

  async function closeHandler() {
    router.back();
  }

  return (
    <Modal title={t('signIn')} action={closeHandler}>
      <p>Examples</p>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link href="/client/GET">GET</Link>
        <Link href="/client/POST">POST</Link>
        <Link href="/client/PUT">PUT</Link>
        <Link href="/client/PATCH">PATCH</Link>
        <Link href="/client/DELETE">DELETE</Link>
      </div>
      <LoginForm isSignUp={false} />
    </Modal>
  );
}
