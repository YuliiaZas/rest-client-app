'use client';

import { INotification } from '@/types/notification.type';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface INotificationsContext {
  notifications: INotification[];
  addNotification: (notification: INotification) => void;
}

export const NotificationsContext = createContext<INotificationsContext>({
  notifications: [],
  addNotification: () => {},
});

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<
    INotificationsContext['notifications']
  >([]);

  const addNotification = useCallback((notification: INotification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNotifications((prevNotifications) => {
        return prevNotifications?.slice(0, -1);
      });
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [notifications]);

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = (): INotificationsContext => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotificationsContext must be used within an NotificationsContext'
    );
  }
  return context;
};
