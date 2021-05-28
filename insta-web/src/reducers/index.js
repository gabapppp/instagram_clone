import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import feed from "./feed";

export default combineReducers({
  auth,
  message,
  feed,
});
