import { reportService } from "../../services/ReportService";

export const getReportedReasonDaoPostByPostId = async (postId) => {
  return async (dispatch) => {
    try {
      const { data } = await reportService.getAllReportedDaoByPostId(postId);
      dispatch({
        type: "GET_REASON_REPORTED",
        data: data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
