import { notification } from "antd";
export const openNotification = (type, message, description = null) => {
  notification[type]({
    message,
    description,
  });
};
