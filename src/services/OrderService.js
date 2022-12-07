import { BaseService } from "./baseService";

class OrderService extends BaseService {
  getAllOrder = () => {
    return this.post(``, {});
  };
  getAllOrderByUserId = (params) => {
    return this.get(`/api/booking/personal`, params);
  };
  getOrderById = (id, category) => {
    return this.get(`/api/booking/byid?id=${id}&category=${category}`);
  };
  addOrder = (data) => {
    return this.post("/api/booking", data);
  };
  updateOrder = (data, IdentifyCode) => {
    return this.put(`/api/booking/update/${IdentifyCode}`, data);
  };
}

export const orderService = new OrderService();
