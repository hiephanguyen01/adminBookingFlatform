import { BaseService } from "./baseService";

export class BannedWordService extends BaseService {
  createBannedWord = (data) => {
    return this.post(`/api/restricted-word`, data);
  };
  updateBannedWord = (id, data) => {
    return this.patch(`/api/restricted-word/${id}`, data);
  };
  getAllBannedWord = (textSearch) => {
    return this.get(`/api/restricted-word?textSearch=${textSearch}`);
  };
  getDetailById = (id) => {
    return this.get(`/api/restricted-word/${id}`);
  };
  deleteBannedWord = (id) => {
    return this.delete(`/api/restricted-word/${id}`);
  };
}

export const bannedWordService = new BannedWordService();
