import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (username, firstname, lastname, email, password) => {
  return axios.post(API_URL + "register/", {
    username,
    firstname,
    lastname,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "token/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
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
