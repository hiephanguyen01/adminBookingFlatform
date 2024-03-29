import { io } from "socket.io-client";
import { baseURL } from "../../../utils/baseURL";
import { openNotification } from "../../../utils/Notification";
import { adminService } from "../../services/AdminService";
import { AUTHING, SET_LOADING, SET_SOCKET, SET_USER } from "../types/authTypes";
import { chatService } from "../../services/ChatService";

export const login = (value) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await adminService.login(value);
    localStorage.setItem("token", data.token);
    dispatch({ type: SET_USER, payload: data });
  } catch (error) {
    openNotification("error", "Đăng nhập thất bại!");
  }
  dispatch({ type: SET_LOADING, payload: false });
};
export const createAdmin = (value) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    await adminService.createAdmin(value);
    openNotification("success", "Tạo tài khoản thành công");
  } catch (error) {
    openNotification("error", "Tạo tài khoản thất bại!");
  }
  dispatch({ type: SET_LOADING, payload: false });
};
export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: AUTHING, payload: true });
    if (localStorage.getItem("token")) {
      const res = await adminService.me();
      dispatch({ type: SET_USER, payload: res.data });
    }
  } catch (error) {
    localStorage.removeItem("token");
  }
  dispatch({ type: AUTHING, payload: false });
};
export const logOut = (navigate, pathname) => async (dispatch) => {
  try {
    pathname.includes("affiliate") && navigate("/affiliate");
    !pathname.includes("affiliate") && navigate("/login");
    dispatch({ type: SET_USER, payload: null });
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};

export const setupSocket =
  (adminId = null) =>
  async (dispatch) => {
    // window.location.protocol + "//" + window.location.host,http://localhost:3003
    const newSocket = io(baseURL);
    if (newSocket) {
      newSocket.on("disconnect", () => {
        dispatch({ type: SET_SOCKET, payload: null });
        setTimeout(setupSocket, 3000);
      });
      newSocket.on("connect", (e) => {
        dispatch({ type: SET_SOCKET, payload: newSocket });
      });

      /**
       * Get all conversation
       * Make all users in that conversation to join into rooms
       */
      const { data } = await chatService.getAllConversationId(adminId, "admin");
      data?.payload.forEach((el) => {
        newSocket.emit("joinChatRoom", { roomId: el, memberId: adminId });
      });
    }
  };
