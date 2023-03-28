import { BaseService } from "./baseService";

class NotificationService extends BaseService {
  getAll = (q) => {
    return this.get(`/api/notification-key?q=${q}`);
  };
  updateReaded = (id) => {
    return this.patch(`/api/notification-key/${id}`);
  };
}

export const notificationService = new NotificationService();
