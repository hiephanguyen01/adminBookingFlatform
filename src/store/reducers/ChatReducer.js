import {
  FIND_CONVERSATION,
  CREATE_CONVERSATION,
  UPDATE_SCROLL,
  FLAG_CLOSE_CONVERSATION,
  SHOW_CHAT,
  TOGGLE_STATE,
} from "../types/messType";
const initState = {
  showChat: false,
  findConversation: 0,
  flagCreate: 0,
  update: false,
  closeConversation: false,
  toggleState: 1,
};
export const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case FIND_CONVERSATION:
      return {
        ...state,
        findConversation: action.payload,
      };
    case CREATE_CONVERSATION:
      return {
        ...state,
        flagCreate: action.payload,
      };
    case UPDATE_SCROLL:
      return {
        ...state,
        update: !state.update,
      };
    case FLAG_CLOSE_CONVERSATION:
      return {
        ...state,
        closeConversation: !state.closeConversation,
      };
    case SHOW_CHAT:
      return {
        ...state,
        showChat: !state.showChat,
      };
    case TOGGLE_STATE:
      return {
        ...state,
        toggleState: action.payload,
      };
    default:
      return state;
  }
};
