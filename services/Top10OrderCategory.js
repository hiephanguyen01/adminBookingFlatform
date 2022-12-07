import { BaseService } from "./baseService";

class TopOrderCategory extends BaseService {
  getTop10OrderCategoryPost = (category = "") => {
    if (category.trim !== "") {
      return this.get(`/api/${category}/top-10-order`);
    }
  };
}

export const topOrderCategory = new TopOrderCategory();
