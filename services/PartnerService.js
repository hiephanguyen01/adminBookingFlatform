import { BaseService } from "./baseService";

class PartnerService extends BaseService {
  getPartnerDetail = (id) => {
    return this.get(`/api/register-partner/byTenant/${id}`);
  };
}

export const partnerService = new PartnerService();
