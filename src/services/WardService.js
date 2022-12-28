import { BaseService } from "./baseService";

export class WardService extends BaseService {
  createWard = (data) => {
    return this.post(`/api/wards`, data);
  };
  updateWard = (id, data) => {
    return this.put(`/api/wards/wardById/${id}`, data);
  };
  getAllWard = (districtId, provinceId) => {
    return this.get(
      `/api/wards?DistrictId=${districtId}&ProvinceId=${provinceId}`
    );
  };
  getDetailById = (id) => {
    return this.get(`/api/wards/${id}`);
  };
  deleteWard = (id) => {
    return this.delete(`/api/wards/wardById/${id}`);
  };
}

export const wardService = new WardService();
