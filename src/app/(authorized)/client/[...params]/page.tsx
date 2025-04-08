import { Spinner } from '@/components';
import dynamic from 'next/dynamic';

const DynamicClient = dynamic(() => import('@/views/client'), {
  loading: () => <Spinner />,
});

export default function RestClient() {
  return <DynamicClient />;
}
