import { Fragment, useContext, useEffect } from "react";
import NotificationContext, {
  NotificationIface,
} from "../../store/notification-context";
import Notification from "../ui/notification";

import MainHeader from "./main-header";

function Layout(props) {
  const { notification, hideNotification } = useContext<NotificationIface>(NotificationContext);

  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //   if(notification) {
  //     timeout = setTimeout(() => {
  //       hideNotification();
  //     }, 2000)
  //   } else {
  //     clearTimeout(timeout);
  //   }
  //   return () => {
  //     clearTimeout(timeout);
  //   }
  // }, [notification])

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification ? (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      ) : null}
    </Fragment>
  );
}

export default Layout;
