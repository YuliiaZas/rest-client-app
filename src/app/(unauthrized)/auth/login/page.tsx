'use client';

import { LoginForm, Modal } from '@/components';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Page() {
  const router = useRouter();
  const t = useTranslations('login');

  async function closeHandler() {
    router.back();
  }

  return (
    <Modal title={t('signIn')} action={closeHandler}>
      <LoginForm isSignUp={false} />
    </Modal>
  );
}
