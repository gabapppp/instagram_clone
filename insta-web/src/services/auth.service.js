import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "token/", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname, lastname, username, email, password) {
    return axios.post(API_URL + "resgister", {
      firstname,
      lastname,
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
