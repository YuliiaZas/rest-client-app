import { Main } from '@/views';
import { Card } from '@/components';

export default function RootPage() {
  return (
    <Main>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Card>
          <h5>Card 1</h5>
          <p className="p3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            asperiores consequuntur maiores, officiis pariatur ratione velit?
            Aliquid aspernatur, autem cum id libero magnam modi quis! Culpa
            cumque ducimus facere in labore officiis possimus quisquam sit sunt.
            Distinctio dolorem dolorum et, eum, facilis impedit libero modi
            officiis perspiciatis quisquam tempore voluptatem.
          </p>
        </Card>
        <Card>
          <h5>Card 2</h5>
          <p className="p3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            asperiores consequuntur maiores, officiis pariatur ratione velit?
            Aliquid aspernatur, autem cum id libero magnam modi quis! Culpa
            cumque ducimus facere in labore officiis possimus quisquam sit sunt.
            Distinctio dolorem dolorum et, eum, facilis impedit libero modi
            officiis perspiciatis quisquam tempore voluptatem.
          </p>
        </Card>
      </div>
    </Main>
  );
}
