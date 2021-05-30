import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/profile/";

const getMyProfile = () => {
  return axios.get(API_URL + "me/", { headers: authHeader() });
};

const getAnyProfile = (username) => {
  return axios.get(API_URL, { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getMyProfile,
  getAnyProfile,
};
