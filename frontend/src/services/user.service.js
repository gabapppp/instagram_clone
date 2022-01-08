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

const changepassword = (old, newP) => {
  return axios.post(
    API_URL + "changepassword/",
    {
      old_password: old,
      new_password: newP,
    },
    { headers: authHeader() }
  );
};

const changeBio = (username, bio) => {
  return axios.put(
    API_URL + username + "/",
    {
      user: {},
      bio: bio,
    },
    { headers: authHeader() }
  );
};

const changeAvt = (username, image) => {
  return axios.put(
    API_URL + username + "/",
    {
      user: {},
      image: image,
    },
    { headers: authHeader() }
  );
};

const changeNameEmail = (username, first_name, last_name, email) => {
  return axios.put(
    API_URL + username + "/",
    {
      user: {
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
    },
    { headers: authHeader() }
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getMyProfile,
  getAnyProfile,
  search,
  follow,
  unfollow,
  changepassword,
  changeBio,
  changeAvt,
  changeNameEmail,
};
