import moment from "moment";
import Moment from "moment";
import { IMG } from "./baseURL";

export const convertImage = (url = "") => {
  if (url !== "" && url !== undefined) {
    if (url?.includes("http")) {
      return url;
    } else {
      const img = IMG(url);
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

export const convertTimeUTC = (datetime, date) => {
  if (date) {
    return moment(datetime).subtract(7, "hours").format("DD-MM-YYYY  HH:mm");
  }
  return moment(datetime).subtract(7, "hours").format("DD-MM-YYYY");
};

export const converPriceVND = (price = 0) => {
  return Number(price).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};

export function commissionPercent(bl, value) {
  let percent;
  if (bl) {
    percent = value?.AffiliateCommissionByHour;
  } else {
    percent = value?.AffiliateCommissionByDate;
  }
  return percent * 100 || 5;
}