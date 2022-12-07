import { BaseService } from "./baseService";

class ReportService extends BaseService {
  createReportDetail = (data) => {
    return this.post(`/api/post-report/`, data);
  };
  createReportDao = (data) => {
    return this.post(`/api/dao-report/`, data);
  };
}

export const reportService = new ReportService();
