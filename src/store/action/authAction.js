import { openNotification } from "../../../utils/Notification";
import { adminService } from "../../services/AdminService";
import { AUTHING, SET_LOADING, SET_USER } from "../types/authTypes";

export const login = (value) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await adminService.login(value);
    localStorage.setItem("token", data.token);
    dispatch({ type: SET_USER, payload: data.user });
  } catch (error) {
    openNotification("error", "Login failed");
  }
  dispatch({ type: SET_LOADING, payload: false });
};
export const createAdmin = (value) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    await adminService.createAdmin(value);
    openNotification("success", "Create succeed");
  } catch (error) {
    openNotification("error", "Login failed");
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
export const logOut = (navigate) => async (dispatch) => {
  try {
    navigate("/login");
    dispatch({ type: SET_USER, payload: null });
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};
