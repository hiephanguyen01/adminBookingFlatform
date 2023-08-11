import { BaseService } from "./baseService";

class PartnerHubSolutionService extends BaseService {
  getPartnerHubSolution = () => {
    return this.get(`/api/partner-hub-solution`);
  };
  getPartnerHubSolutionById = (id) => {
    return this.get(`/api/partner-hub-solution/${id}`);
  };
  createPartnerHubSolution = (data) => {
    return this.post(`/api/partner-hub-solution`, data);
  };
  updatePartnerHubSolution = (id, data) => {
    return this.patch(`/api/partner-hub-solution/${id}`, data);
  };
  deletePartnerHubSolution = (data) => {
    return this.delete(`/api/partner-hub-solution`, data);
  };
}

export const partnerHubSolutionService = new PartnerHubSolutionService();
