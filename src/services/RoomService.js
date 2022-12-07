import { BaseService } from "./baseService";

class RoomService extends BaseService {
  getDetailRoom = (id) => {
    return this.get(`/api/room/${id}`);
  };
}

export const roomService = new RoomService();
