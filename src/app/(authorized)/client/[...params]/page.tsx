import dynamic from 'next/dynamic';
import { Spinner } from '@/components';

type RestClientProps = {
  params: Promise<{ params: string[] }>;
};

const DynamicClient = dynamic(() => import('@/views/client'), {
  loading: () => <Spinner />,
});

export default function Client({ params }: RestClientProps) {
  return <DynamicClient params={params} />;
}
