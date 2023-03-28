import { notification } from "antd";
export const openNotification = (type, message, description = null) => {
  notification[type]({
    message,
    description,
  });
};
export const openNotificationText = (message, description) => {
  notification.open({
    message,
    description,
    // onClick: () => {
    //   navigate(place);
    // },
  });
};
