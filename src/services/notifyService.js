import { BaseService } from "./baseService";

class NotifyService extends BaseService {
  createNotification = (data) => {
    return this.post(`/api/notification`, data);
  };

  getNotifyPartner = (paramString, data) => {
    return this.post(`/api/notification/fillter?${paramString}`, {
      ...data,
      userType: 0,
    });
  };
  getNotifyCustomer = (paramString, data) => {
    return this.post(`/api/notification/fillter?${paramString}`, {
      ...data,
      userType: 1,
    });
  };

  getNotifyPartnerDetail = (id) => {
    return this.get(`/api/notification/noti/${id}`);
  };
}

export const notifyService = new NotifyService();
