import {
  GET_LIST_POST,
  GET_DETAIL_POST,
  GET_PAGINATE_POSIBILITY,
  GET_ALL_DEFAULT_CMT,
  SET_RELATED_SERVICE,
} from "../types/postDaoType";
import { postDaoService } from "../../services/PostDaoService";

export const getAllPostDaoAction = (currentListPost = [], filter) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getAllPost({ ...filter });

      let temp = [
        ...currentListPost,
        ...data.data.filter((item) => item.IsDeleted === false),
      ];
      dispatch({
        type: GET_LIST_POST,
        data: temp,
      });

      dispatch({
        type: GET_PAGINATE_POSIBILITY,
        data: data.pagination,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllReportedDaoAction = (currentListPost = [], filter) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getReported(
        filter.limit,
        filter.page
      );

      let temp = [
        ...currentListPost,
        ...data.data.filter((item) => item.IsDeleted === false),
      ];
      dispatch({
        type: "GET_REPORTED",
        data: temp,
      });

      dispatch({
        type: GET_PAGINATE_POSIBILITY,
        data: data.pagination,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// export const getPostDaoAction = (currentListPost = [], limit, page) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await postDaoService.getAllPost(limit, page);
//       let temp = [...currentListPost, ...data.data];
//       dispatch({
//         type: GET_LIST_POST,
//         data: temp,
//       });
//       dispatch({
//         type: GET_PAGINATE_POSIBILITY,
//         data: data.pagination,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
export const getPostDaoByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getPostById(id);
      dispatch({ type: GET_DETAIL_POST, data: data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const updatePostDaoAction = (id, form) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.updatePost(id, form);
      // dispatch({ type: GET_LIST_POST, data: data.data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const deletePostDaoAction = (id, message) => {
  return async (dispatch) => {
    try {
      await postDaoService.deletePost(id);
      message.success("Xóa bài viết thành công");
    } catch (error) {
      console.error(error);
      message.error("Xóa thất bại");
    }
  };
};

export const getLikePostList = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getLike(userId);
      dispatch({ type: "GET_LIKE_POST_LIST", data: data.data });
    } catch (err) {
      console.error(err);
    }
  };
};

export const likePost = (userId, postId) => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.createLike({
        PostId: postId,
        UserId: userId,
      });
      dispatch({ type: "GET_LIKE", data: data.data });
      const res = await postDaoService.getLike(userId);
      dispatch({ type: "GET_LIKE_POST_LIST", data: res.data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllDefaultComments = () => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getAllDefaultComments();
      dispatch({ type: GET_ALL_DEFAULT_CMT, data: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createLikeCommentDao = (data1, id, setComments, pagination) => {
  return async (dispatch) => {
    try {
      await postDaoService.createLikeComment(data1);
      const { data } = await postDaoService.getComments(
        id,
        1,
        5 * pagination?.currentPage
      );
      setComments(data.data);
      // getComments(1);
      // dispatch(getAllDefaultComments);
    } catch (error) {
      console.log(error);
    }
  };
};
export const setRelatedService = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_RELATED_SERVICE, data: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const toggleNotificationDaoAction = (data) => {
  return async (dispatch) => {
    try {
      await postDaoService.toggleNotificationDao(data);
      dispatch(getAllNotificationDaoAction());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllNotificationDaoAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await postDaoService.getAllNotificationDao();
      dispatch({ type: "SET_LIST_NOTIFICATION_USER", data: data.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filteringDaoPostAction = () => async (dispatch) => {};
