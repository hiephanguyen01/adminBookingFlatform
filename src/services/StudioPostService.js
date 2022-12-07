import { BaseService } from "./baseService";

class StudioPostService extends BaseService {
  getFilterStudioPost = (limit, page, filter) => {
    return this.post(`/api/filter/advance?page=${page}&limit=${limit}`, filter);
  };
  getAllProvince = () => {
    return this.get(`/api/provinces`);
  };
  getPostByTenantId = (params) => {
    return this.get(`/api/studio-post/tenant-id`, { ...params });
  };
  getAllStudioPost = (limit, page, category) => {
    return this.get(
      `/api/studio-post?page=${page}&limit=${limit}&category=${category}`
    );
  };
  getDetailStudio = (id, category, currentUser = "") => {
    if (currentUser.trim !== "") {
      return this.get(
        `/api/studio-post/byid?id=${id}&category=${category}&userId=${currentUser}`
      );
    }
    return this.get(`/api/studio-post/byid?id=${id}&category=${category}`);
  };
  getStudioNear = (id, lat, lng) => {
    return this.get(`/api/studio-post/distance/${id}?lat=${lat}&lng=${lng}`);
  };
  getStudioSimilar = (id, cate) => {
    return this.get(`/api/studio-post/similar/${id}?category=${cate}`);
  };
  getLikeStudioPost = (data) => {
    return this.post(`/api/booking-user/like-studio-post`, data);
  };
  getAllStudioLiked = (data, _sort = "") => {
    if (_sort.trim() !== "") {
      return this.post(`/api/booking-user/liked-studio?_sort=${_sort}`, data);
    }
    return this.post(`/api/booking-user/liked-studio`, data);
  };
  updateView = (data) => {
    return this.patch(`/api/album/`, data);
  };
  getPromotionByTenantId = (tenantId) => {
    return this.get(`/api/promo-code/by-tenant-id?TenantId=${tenantId}`);
  };
  sendCodeEmail = (data) => {
    return this.post(`/api/booking-user/gen-code`, data);
  };
  verifyCodeEmail = (data) => {
    return this.post(`/api/booking-user/verify-code`, data);
  };
}

export const studioPostService = new StudioPostService();
