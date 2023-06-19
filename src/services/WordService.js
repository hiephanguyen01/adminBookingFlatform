import { BaseService } from "./baseService";

export class WordService extends BaseService {
  createWordGroup = (data) => {
    return this.post(`/api/word`, data);
  };
  createWord = (data) => {
    return this.post(`/api/word/add`, data);
  };
  updateGrpWord = (id, data) => {
    return this.patch(`/api/word?id=${id}`, data);
  };
  updateWord = (id, data) => {
    return this.patch(`/api/word/update?id=${id}`, data);
  };
  deleteWordGroup = (id) => {
    return this.delete(`/api/word?id=${id}`);
  };
  deleteWord = (id) => {
    return this.delete(`/api/word/delete?id=${id}`);
  };
  getWordGroup = () => {
    return this.get(`/api/word`);
  };
}

export const wordService = new WordService();
