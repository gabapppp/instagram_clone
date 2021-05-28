import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/posts/";

class FeedService {
  getFeed() {
    return axios.get(API_URL + "", { headers: authHeader() });
  }
}

export default FeedService;
