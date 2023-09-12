import { BaseService } from "./baseService";

class PartnerHubSupportService extends BaseService {
  getPartnerHubSupport = () => {
    return this.get(`/api/partner-hub-support`);
  };
  getPartnerHubSupportById = (id) => {
    return this.get(`/api/partner-hub-support/${id}`);
  };
  createPartnerHubSupport = (data) => {
    return this.post(`/api/partner-hub-support`, data);
  };
  updatePartnerHubSupport = (id, data) => {
    return this.patch(`/api/partner-hub-support/${id}`, data);
  };
  deletePartnerHubSupport = (data) => {
    return this.delete(`/api/partner-hub-support`, data);
  };
}

export const partnerHubSupportService = new PartnerHubSupportService();
