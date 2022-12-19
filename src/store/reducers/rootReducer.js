import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postDaoReducer } from "./postDaoReducer";
const rootReducer = combineReducers({
  userReducer,
  postDaoReducer,
});

export default rootReducer;
