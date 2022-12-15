import { BaseService } from "./baseService";

class AdminService extends BaseService {
  login = (data) => {
    return this.post(`/api/admin/login`, data);
  };
  createAdmin = (data) => {
    return this.post(`/api/admin/create`, data);
  };
  me = () => {
    return this.get(`/api/admin/me`);
  };
  getAllAdmin = (filter) => {
    return this.get(`/api/admin?keySearch=${filter}`);
  };
  getAdminById = (id) => {
    return this.get(`/api/admin/${id}`);
  };
  updateAdmin = (id, data) => {
    return this.patch(`/api/admin/${id}`, data);
  };
  deleteAdmin = (id) => {
    return this.delete(`/api/admin/${id}`);
  };
}

export const adminService = new AdminService();
