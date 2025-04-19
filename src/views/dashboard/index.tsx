'use client';

import { Main } from '@/views';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import Link from 'next/link';
import { Card, Icon, Translated } from '@/components';
import { navigation } from '@/data';
import styles from './dasboard.module.scss';

export default function DashboardPage() {
  const { data } = useSession();
  const cards = navigation.slice(1);

  return (
    <Main>
      <div className={styles.greeting}>
        <h2>
          <Translated scope="dashboard" text="welcomeBack" />,
        </h2>
        <h3>{data?.user?.email}</h3>
      </div>
      <div className={styles.cards}>
        {cards.map(({ title, description, icon, path }) => (
          <Link
            href={path}
            key={title}
            className={clsx(styles.card, 'unstyled')}
          >
            <Card stratchedCard={true}>
              <Icon iconName={icon} size="5rem" />
              <h5>
                <Translated scope="dashboard" text={title} />
              </h5>
              <p className="p3">
                <Translated scope="dashboard" text={description} />
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </Main>
  );
}
