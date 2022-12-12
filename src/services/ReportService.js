import { BaseService } from "./baseService";

class ReportService extends BaseService {
  createReportDetail = (data) => {
    return this.post(`/api/post-report/`, data);
  };
  createReportDao = (data) => {
    return this.post(`/api/dao-report/`, data);
  };
  getAllRateReport = (query) => {
    return this.get(`/api/rating&report/`, query);
  };
  getPostReportById = (id, category) => {
    return this.get(`/api/rating&report/${id}?category=${category}`);
  };
}

export const reportService = new ReportService();
