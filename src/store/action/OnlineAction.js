import {
  ONLINE_USER,
  OFFLINE_USER,
  ONLINE_PARTNER,
  OFFLINE_PARTNER,
} from "../types/OnlineTypes";
export const getOnlineUser = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: ONLINE_USER,
    payload: data,
  });
};
export const getOfflineUser = (data) => {
  return {
    type: OFFLINE_USER,
    payload: data,
  };
};
export const getOnlinePartner = (data) => {
  return {
    type: ONLINE_PARTNER,
    payload: data,
  };
};
export const getOfflinePartner = (data) => {
  return {
    type: OFFLINE_PARTNER,
    payload: data,
  };
};
