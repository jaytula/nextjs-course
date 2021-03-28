import { createContext, useState } from "react";

type NotificationData = {
  title: string;
  message: string;
  status: string;
};

export interface NotificationIface {
  notification: null | NotificationData;
  showNotification: (notification: NotificationData) => void;
  hideNotification: () => void;
}

const defaultContext = {
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
};

const NotificationContext = createContext<NotificationIface>(defaultContext);

export const NotificationContextProvider = ({ children }) => {
  const [
    activeNotification,
    setActiveNotification,
  ] = useState<null | NotificationData>(null);

  const showNotificationHandler = (notificationData: NotificationData) => {
    setActiveNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
