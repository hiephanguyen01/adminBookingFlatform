import { BaseService } from "./baseService";

class PartnerHubTrendNewsService extends BaseService {
  getPartnerHubTrendNews = () => {
    return this.get(`/api/partner-hub-trend-news`);
  };
  getPartnerHubTrendNewsById = (id) => {
    return this.get(`/api/partner-hub-trend-news/${id}`);
  };
  createPartnerHubTrendNews = (data) => {
    return this.post(`/api/partner-hub-trend-news`, data);
  };
  updatePartnerHubTrendNews = (id, data) => {
    return this.patch(`/api/partner-hub-trend-news/${id}`, data);
  };
  deletePartnerHubTrendNews = (data) => {
    return this.delete(`/api/partner-hub-trend-news`, data);
  };
}

export const partnerHubTrendNewsService = new PartnerHubTrendNewsService();
