'use client';

import { Main } from '@/views';

export default function Error({ error }: { error: Error }) {
  return (
    <Main>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <h1>Unexpected error happened</h1>
        <code>{error.message}</code>
      </div>
    </Main>
  );
}
