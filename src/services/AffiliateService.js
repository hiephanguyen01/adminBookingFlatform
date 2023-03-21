import { BaseService } from "./baseService";

class Affiliate extends BaseService {
  all = (key) => {
    return this.get(`/api/affiliate/all`, key);
  };
  activate = (id, option) => {
    return this.get(`/api/affiliate/activate/${id}?option=${option || true}`);
  };
  details = (usedId) => {
    return this.get(`/api/affiliate/details/${usedId}`);
  };
  me = () => {
    return this.get(`/api/affiliate/me`);
  };
  registerWithPhone = (data) => {
    return this.post(`/api/affiliate/phone/register`, data);
  };
  loginWithPhone = (data) => {
    return this.post(`/api/affiliate/phone/login`, data);
  };
  userWithGoogle = (data) => {
    return this.post(`/api/affiliate/google`, data);
  };
  userWithFacebook = (data) => {
    return this.post(`/api/affiliate/facebook`, data);
  };
  userWithGoogle = (data) => {
    return this.post(`/api/affiliate/google`, data);
  };
  updateUser = (data) => {
    return this.patch(`/api/affiliate`, data);
  };
  statisticDetail = (id, category) => {
    return this.get(`/api/affiliate/statistics/${id}?category=${category}`);
  };
  statisticData = (option, date = "") => {
    return this.get(
      `/api/statistic/get-affiliate-statistic?option=${option}&date=${date}`
    );
  };
  statisticDataAdmin = (option, date = "") => {
    return this.get(
      `/api/statistic/get-affiliate-statistic-admin?option=${option}&date=${date}`
    );
  };
  getAllStatisticByPublisher = (option, date = "") => {
    return this.get(`/api/affiliate/statistics?option=${option}&date=${date}`);
  };
  getAllOrdersPublisher = (
    afla = "",
    oid = "",
    pid = "",
    np = "",
    option,
    date
  ) => {
    return this.get(
      `/api/affiliate/orders?afla=${afla}&oid=${oid}&np=${np}&pid=${pid}&option=${option}&date=${date}`
    );
  };
  getAllCommistionsPublisher = (oid = "", pid = "", option, date) => {
    return this.get(
      `/api/affiliate/commissions?oid=${oid}&pid=${pid}&option=${option}&date=${date}`
    );
  };
  getDetailOrdersPublisher = (id) => {
    return this.get(`/api/affiliate/orders/${id}`);
  };
  getAdminPublisherProduct = (pid = "", option = "", date = "") => {
    return this.get(
      `/api/affiliate/admin/statistics-product?pid=${pid}&option=${option}&date=${date}`
    );
  };
  getAdminPublisher = (pid = "", option = "", date = "") => {
    return this.get(
      `/api/affiliate/admin/statistics-publisher?pid=${pid}&option=${option}&date=${date}`
    );
  };
}

export const affiliateService = new Affiliate();
