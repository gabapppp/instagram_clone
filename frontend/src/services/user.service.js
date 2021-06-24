import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/profile/";

const getMyProfile = () => {
  return axios.get(API_URL + "me/", { headers: authHeader() });
};

const getAnyProfile = (username) => {
  return axios.get(API_URL + username + "/", { headers: authHeader() });
};

const search = (query) => {
  return axios.get(API_URL, {
    headers: authHeader(),
    params: { search: query },
  });
};

const follow = (username) => {
  return axios.post(
    API_URL + username + "/follow/",
    {},
    {
      headers: authHeader(),
    }
  );
};

const unfollow = (username) => {
  return axios.delete(API_URL + username + "/unfollow/", {
    headers: authHeader(),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getMyProfile,
  getAnyProfile,
  search,
  follow,
  unfollow,
};
