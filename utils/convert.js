import { BASEURL_IMG } from "./baseURL";
import Moment from "moment";

export const convertImage = (url = "") => {
  if (url !== "" && url !== undefined) {
    if (url?.includes("http")) {
      return url;
    } else if (url === null) {
      return image;
    } else {
      const img = `${BASEURL_IMG}/${url}`;
      return img;
    }
  }
  return url;
};
export const convertTime = (time) => {
  if (time) {
    const thisMoment = new Date(`${time.slice(0, 23)}-07:00`);
    const modify = thisMoment.toISOString();
    Moment.locale("en");
    const dateFormat = modify.slice(0, 23);
    const TimeFormat = Moment(dateFormat).format("DD/MM/YYYY  HH:mm");
    return TimeFormat;
  } else {
    const TimeFormat = "";
    return TimeFormat;
  }
};
export const convertPrice = (price) => {
  let format;
  if (price) {
    format = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return 0;
  }
  return format;
};
