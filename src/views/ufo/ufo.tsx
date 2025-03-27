import { Main } from '@/views';
import styles from './ufo.module.scss';

interface UFOProps {
  redirectTo?: string;
}

export function UFO({ redirectTo }: UFOProps) {
  return (
    <Main customStyles={styles.ufo}>
      <h1>Page not found</h1>
      <a href={redirectTo}>Back to the start page</a>
    </Main>
  );
}
