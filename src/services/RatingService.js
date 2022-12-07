import { BaseService } from "./baseService";

class RatingService extends BaseService {
  getAllRateStudioById = (id, numberRate = "") => {
    if (String(numberRate).trim !== " ") {
      return this.get(`/api/rating&report/rating/${id}?rate=${numberRate}`);
    }
    return this.get(`/api/rating&report/studioPost/rating/${id}`);
  };
  getNumberRatingStuido = (id) => {
    return this.get(`/api/room/number-rate/${id}`);
  };
  createRatingBookign = (id,cate,data)=>{
    return this.post(`/api/rating&report/rating/${id}?category=${cate}`,data)
  }
}

export const ratingService = new RatingService();
