import { Main } from '@/views';
import styles from './ufo.module.scss';
import { Translated } from '@/components';

interface UFOProps {
  redirectTo?: string;
}

export function UFO({ redirectTo }: UFOProps) {
  return (
    <Main customStyles={styles.ufo}>
      <h1>
        <Translated scope="ufo" text="title" />
      </h1>
      <a href={redirectTo}>
        <Translated scope="ufo" text="redirect" />
      </a>
    </Main>
  );
}
