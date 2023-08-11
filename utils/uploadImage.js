import axios from "axios";
import { baseURL } from "./baseURL";

export const uploadImage = async (fileData) => {
  console.log(fileData);
  const formData = new FormData();
  formData.append("image", fileData);

  const { data } = await axios.post(`${baseURL}/api/image-upload`, formData);
  return data;
};
