import { BaseService } from "./baseService";

export class CityService extends BaseService {
  createCity = (data) => {
    return this.post(`/api/provinces`, data);
  };
  updateCity = (id, data) => {
    return this.put(`/api/provinces/${id}`, data);
  };
  getAllCity = () => {
    return this.get(`/api/provinces`);
  };
  getDetailById = (id) => {
    return this.get(`/api/provinces/${id}`);
  };
  deleteCity = (id) => {
    return this.delete(`/api/provinces/${id}`);
  };
}

export const cityService = new CityService();
