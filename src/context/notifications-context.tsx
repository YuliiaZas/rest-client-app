'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
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

export const useNotificationsContext = (): INotificationsContext => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotificationsContext must be used within an NotificationsContext'
    );
  }
  return context;
};
