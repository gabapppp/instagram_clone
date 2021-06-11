import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/like/";

const getLike = (post_id) => {
  return axios.get(API_URL, {
    params: { post: post_id },
  });
};

const postLike = (post) => {
  return axios.post(
    API_URL,
    { post: post },
    {
      headers: authHeader(),
    }
  );
};
const delLike = (like) => {
  return axios.delete(API_URL + like + "/", {
    headers: authHeader(),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getLike, postLike, delLike };
