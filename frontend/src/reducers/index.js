import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import profile from "./profile";

const rootReducer = combineReducers({
  auth,
  message,
  profile,
});

export default rootReducer;
