import { BaseService } from "./baseService";

export class HotkeyService extends BaseService {
  createHotkey = (data) => {
    return this.post(`/api/hot-key`, data);
  };
  updateHotkey = (id, data) => {
    return this.put(`/api/hot-key/${id}`, data);
  };
  getAllHotkey = (search) => {
    return this.get(`/api/hot-key?name=${search}`);
  };
  getDetailById = (id) => {
    return this.get(`/api/hot-key/${id}`);
  };
  deleteHotkey = (id) => {
    return this.delete(`/api/hot-key/${id}`);
  };
  getAllprovinces = () => {
    return this.get(`/api/provinces`);
  };
}

export const hotkeyService = new HotkeyService();
