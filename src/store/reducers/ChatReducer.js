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
  notiMessage: [],
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
    case "ADD_NOTIFY_MESS":
      if (!state.notiMessage.includes(action.payload)) {
        console.log(
          !state.notiMessage.includes(action.payload) && [
            ...state.notiMessage,
            action.payload,
          ]
        );
        return {
          ...state,
          notiMessage: !state.notiMessage.includes(action.payload) && [
            ...state.notiMessage,
            action.payload,
          ],
        };
      } else {
        return { ...state };
      }
    case "REMOVE_NOTIFY_MESS":
      if (state.notiMessage.includes(action.payload)) {
        return {
          ...state,
          notiMessage: state.notiMessage.includes(action.payload) && [
            ...state.notiMessage.filter((val) => val !== action.payload),
          ],
        };
      } else {
        return {
          ...state,
        };
      }
    default:
      return state;
  }
};
