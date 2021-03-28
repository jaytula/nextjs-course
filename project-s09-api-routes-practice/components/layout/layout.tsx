import { Fragment, useContext } from "react";
import NotificationContext, {
  NotificationIface,
} from "../../store/notification-context";
import Notification from "../ui/notification";

import MainHeader from "./main-header";

function Layout(props) {
  const { notification } = useContext<NotificationIface>(NotificationContext);

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
