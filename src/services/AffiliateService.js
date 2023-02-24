import { BaseService } from "./baseService";

class Affiliate extends BaseService {
  all = (key) => {
    return this.get(`/api/affiliate/all`, key);
  };
  activate = (id, option) => {
    return this.get(`/api/affiliate/activate/${id}?option=${option || true}`);
  };
  details = (usedId) => {
    return this.get(`/api/affiliate/details/${usedId}`);
  };
  me = () => {
    return this.get(`/api/affiliate/me`);
  };
  registerWithPhone = (data) => {
    return this.post(`/api/affiliate/phone/register`, data);
  };
  loginWithPhone = (data) => {
    return this.post(`/api/affiliate/phone/login`, data);
  };
  userWithGoogle = (data) => {
    return this.post(`/api/affiliate/google`, data);
  };
  userWithFacebook = (data) => {
    return this.post(`/api/affiliate/facebook`, data);
  };
  userWithGoogle = (data) => {
    return this.post(`/api/affiliate/google`, data);
  };
  updateUser = (data) => {
    return this.patch(`/api/affiliate`, data);
  };
  statisticDetail = (id, category) => {
    return this.get(`/api/affiliate/statistics/${id}?category=${category}`);
  };
  statisticData = (option, date = "") => {
    return this.get(
      `/api/statistic/get-affiliate-statistic?option=${option}&date=${date}`
    );
  };
  getAllStatisticByPublisher = (option, date = "") => {
    return this.get(`/api/affiliate/statistics?option=${option}&date=${date}`);
  };
}

export const affiliateService = new Affiliate();
