import { BaseService } from "./baseService";

export class DistrictService extends BaseService {
  createDistrict = (data) => {
    return this.post(`/api/districts`, data);
  };
  updateDistrict = (id, data) => {
    return this.put(`/api/districts/districtById/${id}`, data);
  };
  getAllDistrict = (provinceCode) => {
    return this.get(`/api/districts/${provinceCode}`);
  };
  getDetailById = (id) => {
    return this.get(`/api/districts/${id}`);
  };
  deleteDistrict = (id) => {
    return this.delete(`/api/districts/districtById/${id}`);
  };
  getAllprovinces = () => {
    return this.get(`/api/provinces`);
  };
}

export const districtService = new DistrictService();
