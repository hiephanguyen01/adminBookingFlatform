import { BaseService } from "./baseService";
import queryString from "query-string";

export class WebHookService extends BaseService {
  createWebHook = (data) => {
    return this.post(`/api/webhook/subcription`, data);
  };
  updateWebHook = (id, data) => {
    return this.patch(`/api/webhook/subcription/${id}`, data);
  };
  getAllWebHook = (params) => {
    return this.get(`/api/webhook?${queryString.stringify(params)}`);
  };
  getDetailById = (id) => {
    return this.get(`/api/webhook/subcription/${id}`);
  };
  deleteWebHook = (id) => {
    return this.delete(`/api/webhook/subcription/${id}`);
  };
}

export const webHookService = new WebHookService();
