import { ONLINE_USER,OFFLINE_USER,ONLINE_PARTNER ,OFFLINE_PARTNER} from "../types/OnlineTypes";
const initState = {
  userList: [],
  partnerList: [],
};
export const OnlineReducer = (state = initState, action) => {
  switch (action.type) {
    case ONLINE_USER:
      return {
        ...state,
        userList: action.payload,
      };
    case OFFLINE_USER:
      return {
        ...state,
        userList: action.payload,
      };
    case ONLINE_PARTNER:
      return {
        ...state,
        partnerList: action.payload,
      };
    case OFFLINE_PARTNER:
      return {
        ...state,
        partnerList: action.payload,
      };
    default:
      return state;
  }
};
