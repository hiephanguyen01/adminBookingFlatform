import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postDaoReducer } from "./postDaoReducer";
import { chatReducer } from "./ChatReducer";
import { OnlineReducer } from "./OnlineReducer";

const rootReducer = combineReducers({
  userReducer,
  postDaoReducer,
  chatReducer,
  OnlineReducer,
});

export default rootReducer;
