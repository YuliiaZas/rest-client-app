import Link from 'next/link';
import { Card, Icon, Translated } from '@/components';
import { Main } from '@/views';
import styles from './welcome.module.scss';
import { developers } from '@/views/welcome/welcome.data';

export function Welcome() {
  return (
    <Main>
      <div className={styles.page}>
        <h2>
          <Translated scope="welcome" text="title" />
        </h2>
        <div className={styles.auth}>
          <Link href="/auth/login">
            <Translated scope="login" text="signIn" />
          </Link>
          <Link href="/auth/signup">
            <Translated scope="login" text="signUp" />
          </Link>
        </div>
        <h4>
          <Translated scope="welcome" text="developers" />
        </h4>
        <div className={styles.developers}>
          {developers.map(({ name, github, lead, description }) => (
            <Card key={name}>
              <h5>
                {name} {lead && <Icon iconName="crown" size="1.5rem" />}
              </h5>
              <a href={github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <p className="p3">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </Main>
  );
}
