import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import profile from "./profile";
import notifications from "./notifications";

const rootReducer = combineReducers({
  auth,
  message,
  profile,
  notifications,
});

export default rootReducer;
