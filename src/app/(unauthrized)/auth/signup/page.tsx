'use client';

import { Modal } from '@/components';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Page() {
  const router = useRouter();
  const t = useTranslations('signup');

  async function closeHandler() {
    router.back();
  }

  return (
    <Modal title={t('signup')} action={closeHandler}>
      <p>Modal Content</p>
    </Modal>
  );
}
