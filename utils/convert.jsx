import { BASEURL_IMG } from "./baseURL";

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
