'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

type Notification = { message: string };

interface INotificationsContext {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
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

  const addNotification = useCallback((notification: Notification) => {
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
