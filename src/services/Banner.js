import { BaseService } from "./baseService";

export class BannerService extends BaseService {
  createBanner = (data) => {
    return this.post(`/api/banner`, data);
  };
  updateBanner = (id, data) => {
    return this.patch(`/api/banner/${id}`, data);
  };
  getAllBanner = () => {
    return this.get(`/api/banner`);
  };
  getDetailById = (id) => {
    return this.get(`/api/banner/${id}`);
  };
  deteleBanner = (id) => {
    return this.delete(`/api/banner/${id}`);
  };
}

export const bannerService = new BannerService();
