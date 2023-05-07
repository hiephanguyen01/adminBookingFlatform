import md5 from "md5";
import moment from "moment";
export const IMG = (imageId) => {
  const secrect = md5(
    imageId +
      imageId +
      "92019201" +
      "vnplus" +
      "v1" +
      `${(1000 * 6080 * 11) / 699}` +
      imageId +
      moment().format("YYYY-MM-DD HH")
  );
  const secrect2 = md5(md5(md5(secrect)) + moment().format("YYYY-MM-DD HH"));
  const ts = Math.floor(Date.now() / 1000);
  return (
    import.meta.env.VITE_REACT_APP_DB_BASE_URL_IMG +
    `/${imageId}?ts=${ts}&token1=${secrect}&token2=${secrect2}`
  );
};
export const REACT_APP_DB_BASE_URL = import.meta.env.VITE_REACT_APP_DB_BASE_URL;
