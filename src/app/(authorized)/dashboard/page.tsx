import dynamic from 'next/dynamic';
import { Spinner } from '@/components';

const DynamicDashboard = dynamic(() => import('@/views/dashboard'), {
  loading: () => <Spinner />,
});
export default function Page() {
  return <DynamicDashboard />;
}
