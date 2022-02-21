import React, { useEffect, useState, useRef, useCallback } from "react";
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/styles";
import PostCard from "../components/Home/postcard";
import useFetch from "../components/Home/useFetch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "80px",
    backgroundColor: "#fafafa",
  },
  card: {
    paddingTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [Next, setNext] = useState("");
  const { loading, error, feed, next } = useFetch(Next);
  const loader = useRef(null);
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (next) {
          setNext(next);
        }
      }
    },
    [next]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <div>
          {feed.map((index) => (
            <div className={classes.card} key={index.pk}>
              <PostCard {...index}></PostCard>
            </div>
          ))}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}
        <div ref={loader} />
      </Grid>
    </div>
  );
}
