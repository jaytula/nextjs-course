import React from "react";
import ReactDOM from "react-dom";

import classes from "./notification.module.css";

export type StatusType = "pending" | "success" | "error" | null;

interface Props {
  title: string;
  message: string;
  status: StatusType;
}
const Notification: React.FC<Props> = ({ title, message, status }) => {
  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
