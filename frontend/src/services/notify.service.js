import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/notifications/";
const getNotifications = () => {
  return axios.get(API_URL + "all/", { headers: authHeader() });
};
const mark_all_as_read = () => {
  return axios.get(API_URL + "mark-all-as-read/", {
    headers: authHeader(),
  });
};
const get_unread_count = () => {
  return axios.get(API_URL + "api/unread_count/", { headers: authHeader() });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getNotifications, mark_all_as_read, get_unread_count };
