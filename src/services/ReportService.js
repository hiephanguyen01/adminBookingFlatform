import { BaseService } from "./baseService";

class ReportService extends BaseService {
  createReportDetail = (data) => {
    return this.post(`/api/post-report/`, data);
  };
  createReportDao = (data) => {
    return this.post(`/api/dao-report/`, data);
  };
  getAllReportedDao = (limit, page, tags) => {
    return this.get(`/api/dao-report?limit=${limit}&page=${page}&tags=${tags}`);
  };
  getAllReportedDaoByPostId = (id) => {
    return this.get(`/api/dao-report/${id}`);
  };
  getAllRateReport = (query) => {
    return this.get(`/api/rating&report/`, query);
  };
  getPostReportById = (id, category) => {
    return this.get(`/api/rating&report/${id}?category=${category}`);
  };
}

export const reportService = new ReportService();
