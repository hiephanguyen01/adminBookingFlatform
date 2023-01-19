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
