import { BaseService } from "./baseService";

class MailService extends BaseService {
  create = (data) => {
    return this.post("/api/mail-service", data);
  };
  all = () => {
    return this.get("/api/mail-service");
  };
  destoy = (id) => {
    return this.delete(`/api/mail-service/${id}`);
  };
  edit = (id, data) => {
    return this.patch(`/api/mail-service/${id}`, data);
  };
  activate = (id) => {
    return this.put(`/api/mail-service/${id}`);
  };
}

export const mailService = new MailService();
