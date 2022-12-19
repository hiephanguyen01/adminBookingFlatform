import { reportService } from "../../services/ReportService";
import {
  GET_LIST_POST,
  GET_DETAIL_POST,
  GET_PAGINATE_POSIBILITY,
  GET_ALL_DEFAULT_CMT,
  SET_RELATED_SERVICE,
} from "../types/postDaoType";

export const getAllReportedDao = async (currentListPost = [], filter) => {
  return async (dispatch) => {
    try {
      const { data } = await reportService.getAllReportedDao(
        filter?.limit,
        filter?.page,
        filter?.tags.join(",")
      );

      let temp = [...currentListPost, ...data.data];
      dispatch({
        type: GET_LIST_POST,
        data: temp,
      });
      dispatch({
        type: GET_PAGINATE_POSIBILITY,
        data: data.pagination,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
