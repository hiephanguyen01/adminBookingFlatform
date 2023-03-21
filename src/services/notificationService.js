import { BaseService } from "./baseService";

class NotificationService extends BaseService {
  getAll = () => {
    return this.get(`/api/notification-key`);
  };
}

export const notificationService = new NotificationService();
