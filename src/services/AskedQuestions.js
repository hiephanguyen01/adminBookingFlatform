import { BaseService } from "./baseService";

class AskedQuestions extends BaseService {
  getAllAskedQuestions = () => {
    return this.get(`/api/asked-question`);
  };
}

export const askedQuestions = new AskedQuestions();
