import { BaseService } from "./baseService";

export class BankService extends BaseService {
  createBank = (data) => {
    return this.post(`/api/bank`, data);
  };
  updateBank = (id, data) => {
    return this.patch(`/api/bank/${id}`, data);
  };
  getAllBank = () => {
    return this.get(`/api/bank`);
  };
  getDetailById = (id) => {
    return this.get(`/api/bank/${id}`);
  };
  deleteBank = (id) => {
    return this.delete(`/api/bank/${id}`);
  };
}

export const bankService = new BankService();
