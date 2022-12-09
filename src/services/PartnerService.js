import { BaseService } from "./baseService";

class PartnerService extends BaseService {
  getPartnerDetail = (id) => {
    return this.get(`/api/register-partner/byTenant/${id}`);
  };
  getAllPartnersNotification = () => {
    return this.get(`/api/notification/user?option=0`);
  };
}

export const partnerService = new PartnerService();
