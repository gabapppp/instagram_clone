import { useState, useEffect, useCallback } from "react";
import postsService from "../../services/posts.service";

function useFetch(Next) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feed, setFeed] = useState([]);
  const [next, setNext] = useState("");

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await postsService.getFeed(Next).then((response) => {
        return response;
      });
      await setNext((next) => res.data.next);
      await setFeed((prev) => [...new Set([...prev, ...res.data.results])]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [Next]);

  useEffect(() => {
    sendQuery(Next);
  }, [sendQuery, Next]);

  return { loading, error, feed, next };
}

export default useFetch;
