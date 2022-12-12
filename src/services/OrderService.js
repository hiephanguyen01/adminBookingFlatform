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
  updateOrderByid = (data, id, category) => {
    return this.patch(`/api/booking/byid?id=${id}&category=${category}`, data);
  };
  getAllBooking = (page, limit, data) => {
    return this.post(`/api/booking?page=${page}&limit=${limit}`, data);
  };
}

export const orderService = new OrderService();
