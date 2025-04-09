'use client';

import styles from './notification.module.scss';
import { useNotificationsContext } from '@/context';
import { Translated } from '../translated';

export function Notification() {
  const { notifications } = useNotificationsContext();
  const latestNotification = notifications[notifications.length - 1];

  if (!latestNotification) return null;
  return (
    <div className={styles.notification__container}>
      <span>
        <Translated
          scope="errors"
          text={latestNotification?.message}
          showRawTextByDefault={true}
        />
      </span>
      <span className={styles.notification__counter}>
        {notifications.length}
      </span>
    </div>
  );
}
