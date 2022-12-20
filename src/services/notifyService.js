import { BaseService } from "./baseService";

class NotifyService extends BaseService {
  createNotification = (data) => {
    return this.post(`/api/notification`, data);
  };

  cancelNotification = (notifyId) => {
    return this.patch(`/api/notification/${notifyId}`);
  };

  getNotifyPartner = (paramString, data) => {
    console.log(data);
    return this.post(`/api/notification/filter?${paramString}`, data);
  };
  getNotifyCustomer = (paramString, data) => {
    return this.post(`/api/notification/filter?${paramString}`, {
      ...data,
    });
  };

  getNotifyDetail = (id) => {
    return this.get(`/api/notification/noti/${id}`);
  };
}

export const notifyService = new NotifyService();
