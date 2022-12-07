import axios from "axios";
import { baseURL } from "../utils/baseURL";
export class BaseService {
  put = (url, model) => {
    return axios({
      url: `${baseURL}${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }, //JWT
    });
  };
  patch = (url, model) => {
    return axios({
      url: `${baseURL}${url}`,
      method: "PATCH",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }, //JWT
    });
  };

  post = (url, model) => {
    return axios({
      url: `${baseURL}${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }, //JWT
    });
  };

  get = (url, params) => {
    return axios({
      url: `${baseURL}${url}`,
      params: { ...params } || null,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  delete = (url, model = {}) => {
    return axios({
      url: `${baseURL}${url}`,
      method: "DELETE",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };
}
