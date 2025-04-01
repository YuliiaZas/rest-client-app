import dynamic from 'next/dynamic';
import { Spinner } from '@/components';

const DynamicVariables = dynamic(() => import('@/views/variables'), {
  loading: () => <Spinner />,
});

export default function Variables() {
  return <DynamicVariables />;
}
