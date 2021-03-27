import { createContext } from "react";

export interface Notification {
  notification: null | {
    title: string;
    message: string;
    status: string;
  };
  showNotification: () => void;
  hideNotification: () => void;
}

const defaultContext = {
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
};

const NotificationContext = createContext<Notification>(defaultContext);

export const NotificationContextProvider = ({ children }) => (
  <NotificationContext.Provider value={defaultContext}>
    {children}
  </NotificationContext.Provider>
);

export default NotificationContext;
