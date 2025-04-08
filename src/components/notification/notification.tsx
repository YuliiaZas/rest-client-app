'use client';

import styles from './notification.module.scss';
import { useContext } from 'react';
import { NotificationsContext } from '@/context';

export function Notification() {
  const { notifications } = useContext(NotificationsContext);
  const latestNotification = notifications[notifications.length - 1];

  if (!latestNotification) return null;
  return (
    <div className={styles.notification__container}>
      <span>{latestNotification?.message}</span>
      <span className={styles.notification__counter}>
        {notifications.length}
      </span>
    </div>
  );
}
