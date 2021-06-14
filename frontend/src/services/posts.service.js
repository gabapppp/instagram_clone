import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/posts/";

const getFeed = () => {
  return axios.get(API_URL, { headers: authHeader(), params: { feed: true } });
};

const getPost = (post_id) => {
  return axios.get(API_URL, {
    headers: authHeader(),
    params: { post_id: post_id },
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getFeed, getPost, postPost };
