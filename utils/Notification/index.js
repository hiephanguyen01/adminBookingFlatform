import { notification } from "antd";
export const openNotification = (type, message, description = null) => {
  notification[type]({
    message,
    description,
  });
};
export const openNotificationText = (message, description, navigate, place) => {
  notification.open({
    message,
    description,
    onClick: () => {
      navigate(place);
    },
  });
};
