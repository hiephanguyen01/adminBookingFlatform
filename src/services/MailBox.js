import { BaseService } from "./baseService";
import queryString from "query-string";

export class MailBox extends BaseService {
  createMail = (data) => {
    return this.post(`/api/mail`, data);
  };
  updateMail = (id, data) => {
    return this.patch(`/api/mail/${id}`, data);
  };
  getAllMail = (page, limit, query) => {
    return this.get(
      `/api/mail?${queryString.stringify({ limit, page, ...query })}`
    );
  };
  getMailById = (id) => {
    return this.get(`/api/mail/${id}`);
  };
  deleteMail = (id) => {
    return this.delete(`/api/mail/${id}`);
  };
}

export const mailBox = new MailBox();
