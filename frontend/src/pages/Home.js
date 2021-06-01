import React, { useEffect, useState } from "react";
import PostList from "../components/Home/postlist";

import PostService from "../services/posts.service";

const Home = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await PostService.getFeed().then((response) => {
        setFeed(response.data.results);
      });
    }

    fetchData();
  }, []);
  return <PostList data={feed} />;
};

export default Home;
