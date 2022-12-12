import { BaseService } from "./baseService";

export class DistrictService extends BaseService {
  createDistrict = (data) => {
    return this.post(`/api/districts`, data);
  };
  updateDistrict = (id, data) => {
    return this.put(`/api/districts/districtById/${id}`, data);
  };
  getAllDistrict = (provinceId) => {
    return this.get(`/api/districts/${provinceId}`);
  };
  getDetailById = (id) => {
    return this.get(`/api/districts/${id}`);
  };
  deleteDistrict = (id) => {
    return this.delete(`/api/districts/districtById/${id}`);
  };
}

export const districtService = new DistrictService();
