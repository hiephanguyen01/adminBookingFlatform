import { BaseService } from "./baseService";

class DashboardService extends BaseService {
  getTotal = (option, date = "") => {
    return this.get(
      `/api/statistic/get-total-all?option=${option}&date=${date}`
    );
  };
  getPartnerCustomer = (option, date = "") => {
    return this.get(
      `/api/statistic/get-partner-customer?option=${option}&date=${date}`
    );
  };
  getAccessCount = (option, date = "") => {
    return this.get(`/api/count-visitor/get?option=${option}&date=${date}`);
  };
}

export const dashboardService = new DashboardService();
