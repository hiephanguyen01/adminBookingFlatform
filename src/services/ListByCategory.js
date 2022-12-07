import { BaseService } from "./baseService";

class ListByCategory extends BaseService {
  getListByCategory = (category) => {
    return this.post("");
  };
}

export const listByCategory = new ListByCategory();
