import { AUTHING, SET_LOADING, SET_SOCKET, SET_USER } from "../types/authTypes";

const initialState = {
  loading: false,
  authing: true,
  currentUser: null,
  socket: null,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTHING:
      return {
        ...state,
        authing: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};
