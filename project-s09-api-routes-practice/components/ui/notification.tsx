import React, { useContext } from "react";

import classes from "./notification.module.css";
import NotificationContext from "../../store/notification-context";

type Props = {
  title: string;
  message: string;
  status: string;
}
const Notification: React.FC<Props> = (props) => {
  const notificationCtx = useContext<{
    hideNotification: React.MouseEventHandler<HTMLDivElement>;
  }>(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
