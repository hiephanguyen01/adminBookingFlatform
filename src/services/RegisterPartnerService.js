import { BaseService } from "./baseService";

class RegisterPartnerService extends BaseService {
  getPartnerById = (id) => {
    return this.get(`/api/register-partner/${id}`);
  };
  getPartnerByTenantId = (tenantId) => {
    return this.get(`/api/register-partner/byTenant/${tenantId}`);
  };
  getAllPartner = (page, limit) => {
    return this.get(`/api/register-partner?page=${page}&limit=${limit}`);
  };
  updatePartner = (id, data) => {
    return this.patch(`/api/register-partner/update/${id}`, data);
  };
  getAllCustomer = (page, limit) => {
    return this.get(`/api/booking-user?page=${page}&limit=${limit}`);
  };
  getCustomerById = (id) => {
    return this.get(`/api/booking-user/${id}`);
  };
  updateCustomer = (id, data) => {
    return this.patch(`/api/booking-user/${id}`, data);
  };
}

export const registerPartnerService = new RegisterPartnerService();
