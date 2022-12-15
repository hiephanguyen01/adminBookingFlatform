import { BaseService } from "./baseService";

class AskedQuestions extends BaseService {
  getAllAskedQuestions = (likeText) => {
    return this.get(`/api/asked-question?likeText=${likeText}`);
  };
  createQuestion = (data) => {
    return this.post(`/api/asked-question`, data);
  };
  updateQuestion = (id, data) => {
    return this.patch(`/api/asked-question/${id}`, data);
  };
  getDetailById = (id) => {
    return this.get(`/api/asked-question/${id}`);
  };
  deleteQuestion = (id) => {
    return this.delete(`/api/asked-question/${id}`);
  };
}

export const askedQuestionsService = new AskedQuestions();
