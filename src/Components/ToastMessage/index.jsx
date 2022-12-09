import { message } from "antd";

const toastMessage = (
  mess,
  type = "info",
  duration = 3,
  className = "",
  style = {}
) => {
  message[type](
    {
      content: mess,
      className: className,
      style: style,
    },
    duration
  );
};

export default toastMessage;
