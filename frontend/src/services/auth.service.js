import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (
  username,
  first_name,
  last_name,
  email,
  password,
  confirm_password
) => {
  return axios.post(API_URL + "register/", {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "token/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
};
