import { BaseService } from "./baseService";

class AuthenticateService extends BaseService {
  verifyEmail = (token) => {
    return this.get(`/api/booking-user/verify/${token}`);
  };
  authenticate = (data) => {
    return this.post(`/api/booking-user`, data);
  };
  loginByPhoneNumber = (data) => {
    return this.post(`/api/booking-user/login`, data);
  };
  logout = () => {
    return this.get(`/api/booking-user/logout`);
  };
  socialAccountLink = (data) => {
    return this.post(`/api/booking-user/social-account-link`, data);
  };
  cancelSocialAccountLink = (data) => {
    return this.post(`/api/booking-user/cancel-social-account-link`, data);
  };
  zaloLink = (data) => {
    return this.post(`/api/booking-user/zalo-link`, data);
  };
  me = () => {
    return this.get(`/api/booking-user/me`);
  };
  updateData = (data) => {
    return this.patch(`/api/booking-user`, data);
  };
}

export const authenticateService = new AuthenticateService();
