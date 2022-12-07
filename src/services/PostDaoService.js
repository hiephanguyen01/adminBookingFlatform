import { BaseService } from "./baseService";

class PostDaoService extends BaseService {
  getAllPost = (limit, page, tags) => {
    return this.get(`/api/post-post?limit=${limit}&page=${page}&tags=${tags}`);
  };
  getPostById = (id) => {
    return this.get(`/api/post-post/${id}`);
  };
  getImage = (url) => {
    return this.get(`/image/${url}`);
  };
  createPost = (userId, data) => {
    return this.post(`/api/post-post?userId=${userId}`, data);
  };
  updatePost = (id, data) => {
    return this.patch(`/api/post-post/${id}`, data);
  };
  deletePost = (id) => {
    return this.delete(`/api/post-post/${id}`);
  };
  getLike = (userId) => {
    return this.get(`/api/like?userId=${userId}`);
  };
  createLike = (data) => {
    return this.post("/api/like/", data);
  };
  getAllDefaultComments = () => {
    return this.get(`/api/user-comment`);
  };
  createComment = (data) => {
    return this.post("/api/comment", data);
  };
  createLikeComment = (data) => {
    return this.post("/api/comment/like", data);
  };
  getComments = (postId, page = 1, limit = 5) => {
    return this.get(`/api/comment/${postId}?page=${page}&limit=${limit}`);
  };
  filterRelatedService = (hasTags, search = "") => {
    return this.get(
      `/api/studio-post/filter-related-service?hasTags=${hasTags}&search=${search}`
    );
  };
  toggleNotificationDao = (data) => {
    return this.post(`/api/post-post/toggle-notification`, data);
  };
  getAllNotificationDao = () => {
    return this.get(`/api/post-post/notification-dao`);
  };
}

export const postDaoService = new PostDaoService();
