import dynamic from 'next/dynamic';
import { Spinner } from '@/components';

const DynamicHistoryPage = dynamic(() => import('@/views/history'), {
  loading: () => <Spinner />,
});

export default function History() {
  return <DynamicHistoryPage />;
}
