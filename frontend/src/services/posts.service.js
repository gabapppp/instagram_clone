import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/posts/";

const getFeed = (cursor) => {
  return axios.get(API_URL, {
    headers: authHeader(),
    params: { cursor: cursor, feed: true },
  });
};

const getPost = (username) => {
  return axios.get(API_URL, {
    headers: authHeader(),
    params: { username: username },
  });
};

const getPostDetails = (pk) => {
  return axios.get(API_URL + pk + "/", {
    headers: authHeader(),
  });
};

const postPost = (caption, image) => {
  return axios.post(
    API_URL,
    {
      caption: caption,
      images: image,
    },
    { headers: authHeader() }
  );
};
const delPost = (pk) => {
  return axios.delete(API_URL + pk + "/", { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getFeed, getPost, postPost, delPost, getPostDetails };
