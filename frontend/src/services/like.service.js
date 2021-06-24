import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/likes/";

const getLike = (post_id, liker) => {
  return axios.get(API_URL, {
    headers: authHeader(),
    params: {
      post: post_id,
      liker: liker,
    },
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
