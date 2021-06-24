import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/comments/";

const getcmt = (post_id) => {
  return axios.get(API_URL, { post: post_id });
};

const postcmt = (post_id, content) => {
  return axios.post(
    API_URL,
    { post: post_id, content: content },
    { headers: authHeader() }
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getcmt, postcmt };
