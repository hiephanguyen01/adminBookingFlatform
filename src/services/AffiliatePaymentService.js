import { BaseService } from "./baseService";

class Affiliate extends BaseService {
  allAdmin = (option, keySearch) => {
    return this.get(
      `/api/affiliate-payment/admin?option=${option}&keySearch=${keySearch}`
    );
  };
  exportAll = (option) => {
    return this.get(`/api/affiliate-payment/admin-export?option=${option}`);
  };
  paid = (id) => {
    return this.get(`/api/affiliate-payment/paid?id=${id}`);
  };
}

export const affiliatePaymentService = new Affiliate();
