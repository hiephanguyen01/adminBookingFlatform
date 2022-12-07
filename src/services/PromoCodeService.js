import { BaseService } from "./baseService";

class PromoCodeService extends BaseService {
  getAllPromoCode = (limit, page) => {
    return this.get(`/api/promoCode?limit=${limit}&page=${page}`);
  };
  getPromoCodeById = (id) => {
    return this.get(`/api/promoCode/${id}`);
  };
  getPromoCodeByStudioPost = (studioPostId) => {
    return this.get(`/api/promoCode/studio?StudioPostId=${studioPostId}`);
  };
  getPromoCodeUserSave = () => {
    return this.get(`/api/promo-code/me`);
  };
  savePromotion = (data) => {
    return this.post(`/api/promo-code/save-code`, data);
  };
  cancelSavePromotion = (PromoteCodeId) => {
    return this.delete(`/api/promo-code/cancel-save-code/${PromoteCodeId}`);
  };
}

export const promoCodeService = new PromoCodeService();
