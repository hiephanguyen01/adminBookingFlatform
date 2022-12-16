import { BaseService } from "./baseService";
import queryString from "query-string";

class PromoCodeService extends BaseService {
  createPromo = (data) => {
    return this.post(`/api/promo-code`, data);
  };
  getAllPromoCode = (params) => {
    return this.get(`/api/promo-code?${queryString.stringify(params)}`);
  };
  getPromoCodeById = (id) => {
    return this.get(`/api/promo-code/${id}`);
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
