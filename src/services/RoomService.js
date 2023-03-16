import { BaseService } from "./baseService";

class RoomService extends BaseService {
  getDetailRoom = (id) => {
    return this.get(`/api/room/${id}`);
  };
  getAllService = (page, limit, category, search) => {
    return this.get(
      `/api/room/all?page=${page}&limit=${limit}&category=${category}&search=${search}`
    );
  };
  getDetailService = (id, category) => {
    return this.get(`/api/room/detail?id=${id}&category=${category}`);
  };
  updateService = (id, category, data) => {
    return this.patch(`/api/room/detail?id=${id}&category=${category}`, data);
  };
}

export const roomService = new RoomService();
