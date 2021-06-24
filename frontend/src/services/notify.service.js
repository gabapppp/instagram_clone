import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/notifications/";
const getNotifications = () => {
  return axios.get(API_URL + "all/", { headers: authHeader() });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getNotifications };
