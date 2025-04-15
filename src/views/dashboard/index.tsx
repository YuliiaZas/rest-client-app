'use client';

import { Main } from '@/views';
import { useSession } from 'next-auth/react';
import { Card, Icon, Translated } from '@/components';

import styles from './dasboard.module.scss';
import { PhosphorIcons } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data } = useSession();
  const router = useRouter();

  const cards: {
    title: string;
    description: string;
    icon: PhosphorIcons;
    path: string;
  }[] = [
    {
      title: 'client-title',
      description: 'client-description',
      icon: 'planet',
      path: '/client/GET',
    },
    {
      title: 'history-title',
      description: 'history-description',
      icon: 'history',
      path: '/history',
    },
    {
      title: 'variables-title',
      description: 'variables-description',
      icon: 'stack',
      path: '/variables',
    },
  ];

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
          <div
            className={styles.card}
            key={title}
            onClick={() => router.push(path)}
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
          </div>
        ))}
      </div>
    </Main>
  );
}
